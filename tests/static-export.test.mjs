import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import {
  getProjectJumpTargetId,
  isPlainPrimaryClick,
  performProjectJump,
} from "../app/components/site/project-jump.ts";

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

test("project links scroll once without starting fragment navigation", async () => {
  const storyHrefs = [
    "#seedforge-core",
    "#vpn-control-plane",
    "#rag-evidence-system",
    "#repo-semantic-context",
    "#pixel-battle-realtime",
  ];
  const [
    english,
    russian,
    jumpLink,
    jumpHelper,
    workOverview,
  ] = await Promise.all([
    readOutput("index.html"),
    readOutput("ru/index.html"),
    readFile(
      new URL(
        "components/site/project-jump-link.tsx",
        sourceDirectory,
      ),
      "utf8",
    ),
    readFile(
      new URL("components/site/project-jump.ts", sourceDirectory),
      "utf8",
    ),
    readFile(
      new URL("components/site/work-overview.tsx", sourceDirectory),
      "utf8",
    ),
  ]);

  assert.equal(getProjectJumpTargetId("#vpn-control-plane"), "vpn-control-plane");
  assert.equal(getProjectJumpTargetId("#repo%2Dsemantic"), "repo-semantic");
  assert.equal(getProjectJumpTargetId("https://example.com/#story"), null);

  assert.equal(
    isPlainPrimaryClick({
      altKey: false,
      button: 0,
      ctrlKey: false,
      defaultPrevented: false,
      metaKey: false,
      shiftKey: false,
    }),
    true,
  );

  for (const modifiedClick of [
    { button: 1 },
    { altKey: true },
    { ctrlKey: true },
    { defaultPrevented: true },
    { metaKey: true },
    { shiftKey: true },
  ]) {
    assert.equal(
      isPlainPrimaryClick({
        altKey: false,
        button: 0,
        ctrlKey: false,
        defaultPrevented: false,
        metaKey: false,
        shiftKey: false,
        ...modifiedClick,
      }),
      false,
    );
  }

  const requestedTargetIds = [];
  const scrollCalls = [];
  let preventDefaultCalls = 0;
  let locationHash = "#unchanged";
  let locationHashWrites = 0;
  const historyCalls = [];
  const fakeLocation = {};

  Object.defineProperty(fakeLocation, "hash", {
    configurable: true,
    get: () => locationHash,
    set: (value) => {
      locationHash = value;
      locationHashWrites += 1;
    },
  });
  Object.defineProperty(globalThis, "location", {
    configurable: true,
    value: fakeLocation,
  });
  Object.defineProperty(globalThis, "history", {
    configurable: true,
    value: {
      pushState: (...args) => historyCalls.push(["pushState", ...args]),
      replaceState: (...args) => historyCalls.push(["replaceState", ...args]),
    },
  });

  let handled;

  try {
    handled = performProjectJump("#seedforge-core", {
      findTarget: (id) => {
        requestedTargetIds.push(id);
        return {
          getBoundingClientRect: () => ({ top: 525 }),
        };
      },
      getScrollY: () => 100,
      preventDefault: () => {
        preventDefaultCalls += 1;
      },
      scrollTo: (options) => {
        scrollCalls.push(options);
      },
    });
  } finally {
    delete globalThis.location;
    delete globalThis.history;
  }

  assert.equal(handled, true);
  assert.deepEqual(requestedTargetIds, ["seedforge-core"]);
  assert.equal(preventDefaultCalls, 1);
  assert.deepEqual(scrollCalls, [
    { behavior: "instant", left: 0, top: 577 },
  ]);
  assert.equal(locationHash, "#unchanged");
  assert.equal(locationHashWrites, 0);
  assert.deepEqual(historyCalls, []);

  await Promise.resolve();
  assert.equal(scrollCalls.length, 1);

  assert.match(workOverview, /<ProjectJumpLink href=\{storyHref\}>/);
  assert.match(jumpLink, /<a href=\{href\} onClick=\{handleClick\}>/);
  assert.doesNotMatch(
    `${jumpLink}\n${jumpHelper}`,
    /addEventListener|requestAnimationFrame|setInterval|setTimeout|history\.|location\.hash/,
  );

  for (const href of storyHrefs) {
    assert.ok(english.includes(`href="${href}"`));
    assert.ok(russian.includes(`href="${href}"`));
  }
});
