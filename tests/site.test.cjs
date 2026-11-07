const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const sandbox = { window: { addEventListener() {} }, URL, console };
vm.createContext(sandbox);
vm.runInContext(read("page.js"), sandbox);
const site = sandbox.window.Website;

test("supported locale variants resolve correctly, including pt-BR URLs", () => {
  for (const [input, expected] of [
    ["pt-BR", "pt-BR"],
    ["PT_br", "pt-BR"],
    ["en-US", "en"],
    ["es-ES", "es"],
    ["fr", "en"],
    [null, "en"],
  ])
    assert.equal(site.normalizeLanguage(input), expected);
});
test("only safe HTTPS links are accepted, with exact GitHub hostname boundaries", () => {
  for (const value of [
    "javascript:alert(1)",
    "data:text/html,hi",
    "http://example.com",
    "https://user:pass@example.com",
    "//example.com",
    "invalid",
  ])
    assert.equal(site.safeURL(value), null);
  assert.equal(
    site.safeURL("https://github.com/a/b", ["github.com"]),
    "https://github.com/a/b",
  );
  assert.equal(
    site.safeURL("https://github.com.attacker.test/a/b", ["github.com"]),
    null,
  );
  assert.equal(site.safeURL("https://notgithub.com/a/b", ["github.com"]), null);
});
test("all four user-provided editions point to their exact ASIN and a local cover", () => {
  const expected = {
    story: {
      pt: "https://www.amazon.com.br/dp/B0F3VKYWFN",
      en: "https://www.amazon.com.br/dp/B0H1T1PMW9",
    },
    analysis: {
      pt: "https://www.amazon.com.br/dp/B0DZNB1LM8",
      en: "https://www.amazon.com/dp/B0F1DB4QBJ",
    },
  };
  for (const [key, editions] of Object.entries(expected))
    for (const [language, url] of Object.entries(editions)) {
      assert.equal(site.books[key][language].url, url);
      assert.ok(
        fs.existsSync(path.join(root, site.books[key][language].cover)),
      );
    }
  assert.match(site.books.story.en.subtitle, /learn to tell/i);
  assert.match(site.books.story.es.description, /Lo que los datos/);
});
test("every UI translation and accessibility key exists in PT, EN and ES", () => {
  const keys = Object.keys(site.translations["pt-BR"]).sort();
  for (const locale of ["en", "es"])
    assert.deepEqual(Object.keys(site.translations[locale]).sort(), keys);
  for (const [, key] of read("index.html").matchAll(
    /data-i18n(?:-aria|-alt)?="([^"]+)"/g,
  ))
    for (const locale of ["pt-BR", "en", "es"])
      assert.ok(site.translations[locale][key], `${locale}: ${key}`);
});
test("feed parsing rejects error payloads, unsafe URLs and non-public projects", () => {
  assert.throws(() =>
    site.normalizeFeed("github", { message: "API rate limit exceeded" }),
  );
  assert.throws(() =>
    site.normalizeFeed("podcast", { status: "error", items: [] }),
  );
  const base = {
    name: "safe",
    html_url: "https://github.com/owner/safe",
    stargazers_count: 2,
  };
  const items = site.normalizeFeed("github", [
    base,
    { ...base, name: "private", private: true },
    { ...base, name: "fork", fork: true },
    { ...base, html_url: "javascript:alert(1)" },
    { ...base, name: "website" },
  ]);
  assert.equal(items.length, 1);
  assert.equal(items[0].stars, 2);
  const episodes = site.normalizeFeed("podcast", {
    status: "ok",
    items: [
      {
        title: "<img onerror=alert(1)>",
        link: "https://example.com/episode",
        enclosure: { link: "javascript:alert(1)" },
      },
    ],
  });
  assert.equal(episodes[0].audio, null);
  assert.equal(episodes[0].title, "<img onerror=alert(1)>");
  // The feed renderer uses textContent through element(), never an HTML template.
  const renderer = read("page.js")
    .split("function renderFeed(kind)")[1]
    .split("function normalizeFeed")[0];
  assert.ok(!renderer.includes("innerHTML"));
});
test("bundled fallback snapshots contain real usable data for both feeds", () => {
  for (const kind of ["github", "podcast"]) {
    const snapshot = JSON.parse(read(`data/${kind}.json`));
    assert.ok(Date.parse(snapshot.updatedAt));
    const data = site.normalizeFeed(kind, snapshot.data);
    assert.ok(data.length > 0);
    assert.ok(data.every((item) => site.safeURL(item.url)));
  }
});
test("all static HTML and stylesheet assets exist; links remain subpath-safe", () => {
  const html = read("index.html");
  for (const [, url] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(https?:|#|mailto:)/.test(url)) continue;
    assert.ok(!url.startsWith("/"), `root-relative asset: ${url}`);
    assert.ok(fs.existsSync(path.join(root, url)), url);
  }
  for (const [, url] of read("style.css").matchAll(
    /url\(['"]?([^'")]+)['"]?\)/g,
  ))
    assert.ok(fs.existsSync(path.join(root, url)), url);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length, "duplicate IDs");
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g))
    assert.ok(ids.includes(id), `unknown anchor ${id}`);
});
test("local Three.js and font licenses accompany the vendored dependencies", () => {
  assert.match(read("js/vendor/THREE-LICENSE.txt"), /MIT License/);
  assert.match(read("assets/Poppins-OFL.txt"), /SIL OPEN FONT LICENSE/);
  assert.ok(
    fs.statSync(path.join(root, "js/vendor/three.module.min.js")).size > 500000,
  );
});
