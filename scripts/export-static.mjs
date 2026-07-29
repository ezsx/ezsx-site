import { access, cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const siteOrigin = "https://ezsx.github.io";
const projectDirectory = fileURLToPath(new URL("../", import.meta.url));
const clientDirectory = join(projectDirectory, "dist", "client");
const outputDirectory = join(projectDirectory, "out");
const workerPath = join(projectDirectory, "dist", "server", "index.js");
const workerUrl = pathToFileURL(workerPath);

workerUrl.searchParams.set("static-export", `${process.pid}-${Date.now()}`);

const { default: worker } = await import(workerUrl.href);

const environment = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const executionContext = {
  waitUntil() {},
  passThroughOnException() {},
};

async function render(pathname) {
  const response = await worker.fetch(
    new Request(new URL(pathname, siteOrigin), {
      headers: {
        accept: "text/html",
        host: "ezsx.github.io",
      },
    }),
    environment,
    executionContext,
  );

  const html = await response.text();

  if (response.status !== 200) {
    throw new Error(
      `Static export expected ${pathname} to return 200, received ${response.status}.`,
    );
  }

  if (!/^text\/html\b/i.test(response.headers.get("content-type") ?? "")) {
    throw new Error(`Static export received a non-HTML response for ${pathname}.`);
  }

  return html;
}

function buildNotFoundPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>404 - ezsx</title>
    <link rel="icon" href="/favicon.svg">
    <style>
      :root { color-scheme: dark; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
      body { min-height: 100vh; margin: 0; display: grid; place-items: center; background: #0d1117; color: #f0f6fc; }
      main { width: min(36rem, calc(100% - 3rem)); border: 1px solid #30363d; padding: 2rem; }
      p { color: #a0a9b4; line-height: 1.6; }
      a { color: #58a6ff; text-underline-offset: 0.2em; }
    </style>
  </head>
  <body>
    <main>
      <p>404 / route not found</p>
      <h1>This page is not part of the portfolio.</h1>
      <p><a href="/">Return to ezsx</a></p>
    </main>
  </body>
</html>
`;
}

async function assertReferencedAssetsExist(html, pathname) {
  const references = [
    ...html.matchAll(/(?:href|src)="(\/assets\/[^"#?]+)(?:[?#][^"]*)?"/g),
  ].map((match) => match[1]);

  if (references.length === 0) {
    throw new Error(`Static export found no client assets in ${pathname}.`);
  }

  for (const reference of new Set(references)) {
    await access(join(outputDirectory, reference.slice(1)));
  }
}

await rm(outputDirectory, { force: true, recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });
await rm(join(outputDirectory, ".vite"), { force: true, recursive: true });
await rm(join(outputDirectory, "_headers"), { force: true });
await rm(join(outputDirectory, ".assetsignore"), { force: true });

const routes = [
  { pathname: "/", output: "index.html" },
  { pathname: "/ru", output: join("ru", "index.html") },
];

const renderedPages = [];

for (const route of routes) {
  const html = await render(route.pathname);
  const destination = join(outputDirectory, route.output);

  if (html.includes("ezsx.xx.kg")) {
    throw new Error(`Static export retained the retired hostname in ${route.pathname}.`);
  }

  if (!html.includes(siteOrigin)) {
    throw new Error(`Static export is missing the canonical origin in ${route.pathname}.`);
  }

  if (
    !html.includes('<script id="_R_">import("/assets/') ||
    !html.includes("__VINEXT_RSC_CHUNKS__") ||
    !html.includes("__VINEXT_RSC_DONE__=true")
  ) {
    throw new Error(
      `Static export is missing the hydration bootstrap in ${route.pathname}.`,
    );
  }

  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html, "utf8");
  renderedPages.push({ html, pathname: route.pathname });
}

for (const page of renderedPages) {
  await assertReferencedAssetsExist(page.html, page.pathname);
}

await writeFile(join(outputDirectory, "404.html"), buildNotFoundPage(), "utf8");
await writeFile(join(outputDirectory, ".nojekyll"), "", "utf8");

console.log(`Static export written to ${outputDirectory}`);
