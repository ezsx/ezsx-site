import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

let workerPromise;

async function loadWorker() {
  if (!workerPromise) {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
    workerPromise = import(workerUrl.href).then(({ default: worker }) => worker);
  }

  return workerPromise;
}

async function render(pathname) {
  const worker = await loadWorker();
  const url = new URL(pathname, "https://ezsx.xx.kg");

  const response = await worker.fetch(
    new Request(url, {
      headers: {
        accept: "text/html",
        host: "ezsx.xx.kg",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  return {
    response,
    html: await response.text(),
  };
}

function assertSharedPortfolio(html) {
  assert.match(html, /repo-semantic-mcp/);
  assert.match(html, /rag_app/);
  assert.match(html, /seedforge/);
  assert.match(html, /aria-controls="seedforge-system-story"/);
  assert.match(html, /aria-controls="vpn-system-story"/);
  assert.match(html, /id="seedforge-core"/);
  assert.match(html, /id="vpn-control-plane"/);
  assert.match(html, /22 \/ 22/);
  assert.match(html, /135\.2k/);
  assert.match(html, /433 \/ 433/);
  assert.match(html, /3\.08 \/ 32/);
  assert.match(html, /class="profile-sm-panel"/);
  assert.ok(
    html.indexOf('class="profile-sm-panel"') <
      html.indexOf('class="cuda-trace'),
  );
  assert.match(html, /ALU \/ INT/);
  assert.match(html, /0\.14%/);
  assert.match(html, /SKIP LOCKED/);
  assert.match(html, /RabbitMQ/);
  assert.match(html, /Kafka/);
  assert.match(html, /POST \/v1\/connect-flow\/connect/);
  assert.match(html, /scdcor@gmail\.com/);
  assert.match(html, /https:\/\/ezsx\.xx\.kg\/og\.png/);
  assert.doesNotMatch(html, /20\.9k/);
  assert.doesNotMatch(html, /POST \/config/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
}

test("server-renders localized English and Russian portfolio routes", async () => {
  const routes = [
    {
      pathname: "/",
      lang: "en",
      title: /<title>ezsx — systems and tools<\/title>/i,
      canonical:
        /rel="canonical" href="https:\/\/ezsx\.xx\.kg\/"/,
      activeLocale:
        /<a aria-current="page" href="\/" hrefLang="en" lang="en">EN<\/a>/,
      inactiveLocale:
        /<a href="\/ru" hrefLang="ru" lang="ru">RU<\/a>/,
      ogLocale: "en_US",
      alternateOgLocale: "ru_RU",
      phrases: [
        /Secure connectivity/,
        /Selected work/,
        /reliable two-GPU research system/,
        /collapse story/,
        /P6 diagnostic snapshot/,
        /collapse profiler/,
        /One warp through the search/,
        /pause trace/,
        /optional precheck/,
        /healthy node fleet/,
        /Why the queue lives in PostgreSQL/,
        /Fleet cards are representative architecture/,
      ],
      absent: [
        /Перейти к содержимому/,
        /свернуть историю/,
        /От исходного CUDA-движка/,
        /Почему очередь живёт в PostgreSQL/,
      ],
    },
    {
      pathname: "/ru",
      lang: "ru",
      title: /<title>ezsx — системы и инструменты<\/title>/i,
      canonical:
        /rel="canonical" href="https:\/\/ezsx\.xx\.kg\/ru"/,
      activeLocale:
        /<a aria-current="page" href="\/ru" hrefLang="ru" lang="ru">RU<\/a>/,
      inactiveLocale:
        /<a href="\/" hrefLang="en" lang="en">EN<\/a>/,
      ogLocale: "ru_RU",
      alternateOgLocale: "en_US",
      phrases: [
        /Защищённое подключение/,
        /Выбранные проекты/,
        /От исходного CUDA-движка/,
        /свернуть историю/,
        /Посмотреть устройство CUDA-воркера/,
        /свернуть профилировщик/,
        /Один warp проходит весь поиск/,
        /остановить трассу/,
        /От одного запроса на подключение/,
        /Почему очередь живёт в PostgreSQL/,
        /Карточки парка показывают репрезентативную архитектуру/,
      ],
      absent: [
        /Skip to content/,
        /Primary navigation/,
        /collapse story/,
        /From an upstream CUDA engine/,
        /Why the queue lives in PostgreSQL/,
      ],
    },
  ];

  for (const route of routes) {
    const { response, html } = await render(route.pathname);

    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    assert.match(html, new RegExp(`<html lang="${route.lang}">`, "i"));
    assert.match(html, route.title);
    assert.match(html, route.canonical);
    assert.match(
      html,
      new RegExp(
        `<meta property="og:locale" content="${route.ogLocale}"\\s*/?>`,
      ),
    );
    assert.match(
      html,
      new RegExp(
        `<meta (?=[^>]*property="og:locale:alternate")(?=[^>]*content="${route.alternateOgLocale}")[^>]*>`,
      ),
    );
    assert.match(
      html,
      new RegExp(
        `property="og:url" content="https://ezsx\\.xx\\.kg${route.pathname === "/" ? "/" : "/ru"}"`,
      ),
    );
    assert.match(
      html,
      /rel="alternate" hrefLang="en" href="https:\/\/ezsx\.xx\.kg\/"/,
    );
    assert.match(
      html,
      /rel="alternate" hrefLang="ru" href="https:\/\/ezsx\.xx\.kg\/ru"/,
    );
    assert.match(
      html,
      /rel="alternate" hrefLang="x-default" href="https:\/\/ezsx\.xx\.kg\/"/,
    );
    assert.match(html, /class="locale-picker"/);
    assert.match(html, route.activeLocale);
    assert.match(html, route.inactiveLocale);

    for (const phrase of route.phrases) {
      assert.match(html, phrase);
    }

    for (const phrase of route.absent) {
      assert.doesNotMatch(html, phrase);
    }

    assertSharedPortfolio(html);
  }
});

test("unknown locale routes return 404", async () => {
  for (const pathname of ["/en", "/fr"]) {
    const { response } = await render(pathname);
    assert.equal(response.status, 404);
  }
});

test("client bundles do not embed both locale dictionaries", async () => {
  const assetsDirectory = new URL("../dist/client/assets/", import.meta.url);
  const files = await readdir(assetsDirectory);
  const scripts = files.filter((file) => file.endsWith(".js"));
  const source = (
    await Promise.all(
      scripts.map((file) => readFile(new URL(file, assetsDirectory), "utf8")),
    )
  ).join("\n");

  assert.doesNotMatch(source, /From an upstream CUDA engine/);
  assert.doesNotMatch(source, /От исходного CUDA-движка/);
  assert.doesNotMatch(source, /Inspect the CUDA worker/);
  assert.doesNotMatch(source, /Посмотреть устройство CUDA-воркера/);
  assert.doesNotMatch(source, /no enqueue before identity is verified/);
  assert.doesNotMatch(source, /никаких задач до подтверждения личности/);
  assert.doesNotMatch(source, /Why the queue lives in PostgreSQL/);
  assert.doesNotMatch(source, /Почему очередь живёт в PostgreSQL/);
});
