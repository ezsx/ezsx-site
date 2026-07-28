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
  const projectTargets = [
    "#seedforge-core",
    "#vpn-control-plane",
    "#rag-evidence-system",
    "#repo-semantic-context",
  ];

  assert.match(html, /repo-semantic-mcp/);
  assert.match(html, /rag_app/);
  assert.match(html, /seedforge/);
  assert.match(html, /PixelBattle/);
  assert.match(
    html,
    /https:\/\/github\.com\/ezsx\/PixelBattle/,
  );
  assert.match(
    html,
    /https:\/\/github\.com\/ezsx\/NoitaSeedSearcherCUDA/,
  );
  for (const target of projectTargets) {
    assert.match(html, new RegExp(`href="${target}"`));
  }
  for (let index = 1; index < projectTargets.length; index += 1) {
    assert.ok(
      html.indexOf(`href="${projectTargets[index - 1]}"`) <
        html.indexOf(`href="${projectTargets[index]}"`),
    );
  }
  assert.ok(
    html.indexOf('href="#repo-semantic-context"') <
      html.indexOf(
        'href="https://github.com/ezsx/PixelBattle"',
      ),
  );
  assert.match(html, /aria-controls="seedforge-system-story"/);
  assert.match(html, /aria-controls="vpn-system-story"/);
  assert.match(html, /aria-controls="rag-system-story"/);
  assert.match(html, /aria-controls="repo-semantic-system-story"/);
  assert.match(html, /id="seedforge-core"/);
  assert.match(html, /id="vpn-control-plane"/);
  assert.match(html, /id="rag-evidence-system"/);
  assert.match(html, /id="repo-semantic-context"/);
  assert.doesNotMatch(html, /id="pixel-battle[^"]*"/);
  assert.doesNotMatch(html, /aria-controls="pixel-battle/);
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
  assert.match(html, /99 \/ 105/);
  assert.match(html, /0\.886/);
  assert.match(html, /RRF · 3 : 1/);
  assert.match(html, /ColBERT · 128-d/);
  assert.match(html, /RRF k = 60/);
  assert.match(html, /19 \/ 24/);
  assert.match(html, /class="repo-runtime-pool"/);
  assert.match(html, /class="repo-signal-stack"/);
  assert.match(
    html,
    /rg --fixed-strings --line-number start_watcher \./,
  );
  assert.match(html, /scdcor@gmail\.com/);
  assert.match(html, /https:\/\/ezsx\.xx\.kg\/og\.png/);
  assert.doesNotMatch(html, /20\.9k/);
  assert.doesNotMatch(html, /POST \/config/);
  assert.doesNotMatch(html, /[\u2013\u2014]/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
}

test("server-renders localized English and Russian portfolio routes", async () => {
  const routes = [
    {
      pathname: "/",
      lang: "en",
      title: /<title>ezsx - systems and tools<\/title>/i,
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
        /Run a reliable exhaustive seed search across two GPUs/,
        /collapse story/,
        /P6 diagnostic snapshot/,
        /collapse profiler/,
        /One warp through the search/,
        /pause trace/,
        /optional precheck/,
        /Issue secure connections without losing control of the node fleet/,
        /Why the queue lives in PostgreSQL/,
        /Fleet cards are representative architecture/,
        /Answer questions over Telegram with evidence you can inspect/,
        /Inspect one question through retrieval/,
        /four different jobs/,
        /120 reviewed questions/,
        /Find the files that matter before the first edit/,
        /Inspect one repository-context request/,
        /two-level ranking path/,
        /retrieval substrate, not a hidden planner/,
        /May 7 dogfood snapshot/,
        /Backend for a real-time collaborative canvas at a live event/,
      ],
      absent: [
        /Перейти к содержимому/,
        /свернуть историю/,
        /Запустить надёжный полный поиск seed на двух GPU/,
        /Почему очередь живёт в PostgreSQL/,
        /Отвечать по Telegram-корпусу с проверяемыми источниками/,
        /Найти нужные файлы до первой правки/,
        /Посмотреть путь одного repository-context запроса/,
        /Backend совместного холста в реальном времени для live-эвента/,
      ],
    },
    {
      pathname: "/ru",
      lang: "ru",
      title: /<title>ezsx - системы и инструменты<\/title>/i,
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
        /Запустить надёжный полный поиск seed на двух GPU/,
        /свернуть историю/,
        /Посмотреть устройство CUDA-воркера/,
        /свернуть профилировщик/,
        /Один warp проходит весь поиск/,
        /остановить трассу/,
        /Выдавать защищённые подключения и сохранять парк нод управляемым/,
        /Почему очередь живёт в PostgreSQL/,
        /Карточки парка показывают репрезентативную архитектуру/,
        /Отвечать по Telegram-корпусу с проверяемыми источниками/,
        /Посмотреть, как один вопрос проходит retrieval/,
        /четыре разные задачи/,
        /120 проверенных вопросов/,
        /Найти нужные файлы до первой правки/,
        /Посмотреть путь одного repository-context запроса/,
        /двухуровневое ранжирование/,
        /retrieval substrate, а не скрытый planner/,
        /dogfood snapshot · 7 мая/,
        /Backend совместного холста в реальном времени для live-эвента/,
      ],
      absent: [
        /Skip to content/,
        /Primary navigation/,
        /collapse story/,
        /Run a reliable exhaustive seed search across two GPUs/,
        /Why the queue lives in PostgreSQL/,
        /Answer questions over Telegram with evidence you can inspect/,
        /Find the files that matter before the first edit/,
        /Inspect one repository-context request/,
        /Backend for a real-time collaborative canvas at a live event/,
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

  assert.doesNotMatch(
    source,
    /Run a reliable exhaustive seed search across two GPUs/,
  );
  assert.doesNotMatch(
    source,
    /Запустить надёжный полный поиск seed на двух GPU/,
  );
  assert.doesNotMatch(source, /Inspect the CUDA worker/);
  assert.doesNotMatch(source, /Посмотреть устройство CUDA-воркера/);
  assert.doesNotMatch(source, /no enqueue before identity is verified/);
  assert.doesNotMatch(source, /никаких задач до подтверждения личности/);
  assert.doesNotMatch(source, /Why the queue lives in PostgreSQL/);
  assert.doesNotMatch(source, /Почему очередь живёт в PostgreSQL/);
  assert.doesNotMatch(
    source,
    /Answer questions over Telegram with evidence you can inspect/,
  );
  assert.doesNotMatch(
    source,
    /Отвечать по Telegram-корпусу с проверяемыми источниками/,
  );
  assert.doesNotMatch(source, /Inspect one question through retrieval/);
  assert.doesNotMatch(source, /Посмотреть, как один вопрос проходит retrieval/);
  assert.doesNotMatch(
    source,
    /Find the files that matter before the first edit/,
  );
  assert.doesNotMatch(source, /Найти нужные файлы до первой правки/);
  assert.doesNotMatch(
    source,
    /Inspect one repository-context request/,
  );
  assert.doesNotMatch(
    source,
    /Посмотреть путь одного repository-context запроса/,
  );
});
