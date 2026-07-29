import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputDirectory = new URL("../out/", import.meta.url);
const sourceDirectory = new URL("../app/", import.meta.url);

async function readOutput(pathname) {
  return readFile(new URL(pathname, outputDirectory), "utf8");
}

async function assertAssetReferencesExist(html) {
  const references = [
    ...html.matchAll(/(?:href|src)="(\/assets\/[^"#?]+)(?:[?#][^"]*)?"/g),
  ].map((match) => match[1]);

  assert.ok(references.length > 0);

  for (const reference of new Set(references)) {
    await access(new URL(`.${reference}`, outputDirectory));
  }
}

test("static export contains localized, hydrated portfolio pages", async () => {
  const english = await readOutput("index.html");
  const russian = await readOutput("ru/index.html");

  assert.match(english, /<html lang="en">/i);
  assert.match(russian, /<html lang="ru">/i);
  assert.match(
    english,
    /rel="canonical" href="https:\/\/ezsx\.github\.io\/"/,
  );
  assert.match(
    russian,
    /rel="canonical" href="https:\/\/ezsx\.github\.io\/ru\/"/,
  );
  assert.match(english, /href="\/ru\/" hrefLang="ru" lang="ru"/);
  assert.match(russian, /aria-current="page" href="\/ru\/"/);
  assert.match(english, /<script id="_R_">import\("\/assets\//);
  assert.match(russian, /<script id="_R_">import\("\/assets\//);
  assert.match(english, /self\.__VINEXT_RSC_CHUNKS__/);
  assert.match(russian, /self\.__VINEXT_RSC_CHUNKS__/);
  assert.match(english, /self\.__VINEXT_RSC_DONE__=true/);
  assert.match(russian, /self\.__VINEXT_RSC_DONE__=true/);
  assert.doesNotMatch(english, /ezsx\.xx\.kg/);
  assert.doesNotMatch(russian, /ezsx\.xx\.kg/);

  await assertAssetReferencesExist(english);
  await assertAssetReferencesExist(russian);
});

test("static export includes GitHub Pages support files", async () => {
  const notFound = await readOutput("404.html");
  const noJekyll = await readOutput(".nojekyll");

  assert.match(notFound, /404 \/ route not found/);
  assert.match(notFound, /href="\/"/);
  assert.equal(noJekyll, "");
  await assert.rejects(access(new URL(".vite/", outputDirectory)));
  await assert.rejects(access(new URL("server/", outputDirectory)));
  await assert.rejects(access(new URL(".openai/", outputDirectory)));
});

test("project fragment links do not start a long-distance smooth scroll", async () => {
  const [baseStyles, workOverview] = await Promise.all([
    readFile(new URL("styles/01-base.css", sourceDirectory), "utf8"),
    readFile(
      new URL("components/site/work-overview.tsx", sourceDirectory),
      "utf8",
    ),
  ]);

  assert.match(workOverview, /<a href=\{storyHref\}>/);
  assert.doesNotMatch(workOverview, /\bonClick\s*=/);
  assert.doesNotMatch(baseStyles, /scroll-behavior\s*:\s*smooth/i);
});
