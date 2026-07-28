import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://ezsx.xx.kg/", {
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
}

test("server-renders the ezsx index", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>ezsx — systems and tools<\/title>/i);
  assert.match(html, /Secure connectivity/);
  assert.match(html, /repo-semantic-mcp/);
  assert.match(html, /rag_app/);
  assert.match(html, /seedforge/);
  assert.match(html, /reliable two-GPU research system/);
  assert.match(html, /22 \/ 22/);
  assert.match(html, /135\.2k/);
  assert.match(html, /433 \/ 433/);
  assert.match(html, /P6 diagnostic snapshot/);
  assert.match(html, /3\.08 \/ 32/);
  assert.doesNotMatch(html, /20\.9k/);
  assert.match(html, /scdcor@gmail\.com/);
  assert.match(html, /rel="canonical" href="https:\/\/ezsx\.xx\.kg\/"/);
  assert.match(html, /https:\/\/ezsx\.xx\.kg\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
