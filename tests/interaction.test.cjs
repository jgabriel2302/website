const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");
const path = require("node:path");
const read = (file) =>
  fs.readFileSync(path.join(__dirname, "..", file), "utf8");
class Element {
  constructor(tag) {
    this.tagName = tag;
    this.children = [];
    this.listeners = {};
    this.attributes = {};
    this.dataset = {};
    this.style = { setProperty() {} };
    this.classList = { toggle() {} };
    this.textContent = "";
    this.paused = true;
    this.currentTime = 0;
    this.duration = NaN;
    this.playbackRate = 1;
    this.muted = false;
  }
  setAttribute(key, value) {
    this.attributes[key] = value;
  }
  getAttribute(key) {
    return key === "src" ? this.src : this.attributes[key];
  }
  append(...nodes) {
    this.children.push(...nodes);
  }
  addEventListener(name, fn) {
    (this.listeners[name] ||= []).push(fn);
  }
  async emit(name) {
    for (const fn of this.listeners[name] || []) await fn({ target: this });
  }
  play() {
    this.paused = false;
    this.emit("play");
    this.emit("playing");
    return Promise.resolve();
  }
  pause() {
    const changed = !this.paused;
    this.paused = true;
    if (changed) this.emit("pause");
  }
  load() {}
  closest() {
    return null;
  }
}
function setup(file, extra = {}) {
  const events = {};
  const timers = new Map();
  let id = 0;
  const context = {
    window: {
      addEventListener(name, fn) {
        (events[name] ||= []).push(fn);
      },
    },
    document: { createElement: (tag) => new Element(tag) },
    setTimeout(fn) {
      timers.set(++id, fn);
      return id;
    },
    clearTimeout(id) {
      timers.delete(id);
    },
    URL,
    console,
    ...extra,
  };
  vm.createContext(context);
  vm.runInContext(read(file), context);
  return { context, events, timers };
}
function player(env, title = "Episode") {
  const root = env.context.window.ImmersiveAudio.create(
    { audio: "https://example.com/audio.mp3", title },
    (key) => key,
  );
  const [audio, controls, timeline, status] = root.children;
  return {
    root,
    audio,
    play: controls.children[0],
    back: controls.children[1],
    forward: controls.children[2],
    speed: controls.children[3],
    mute: controls.children[4],
    range: timeline.children[1],
    status,
  };
}
test("custom audio starts on demand and only one episode plays", async () => {
  const env = setup("js/audio-player.js"),
    a = player(env, "A"),
    b = player(env, "B");
  assert.equal(a.audio.preload, "none");
  assert.equal(a.audio.paused, true);
  assert.equal(a.range.disabled, true);
  await a.play.emit("click");
  assert.equal(a.audio.paused, false);
  await b.play.emit("click");
  assert.equal(a.audio.paused, true);
  assert.equal(b.audio.paused, false);
  env.context.window.ImmersiveAudio.pauseAll();
  assert.equal(b.audio.paused, true);
  assert.equal(env.timers.size, 0);
});
test("seek handles unknown, infinite and finite media durations; controls keep their labels", async () => {
  const env = setup("js/audio-player.js"),
    p = player(env),
    api = env.context.window.ImmersiveAudio;
  api.seek(p.audio, 42);
  assert.equal(p.audio.currentTime, 0);
  p.audio.duration = Infinity;
  api.seek(p.audio, 42);
  assert.equal(p.audio.currentTime, 0);
  p.audio.duration = 85;
  await p.audio.emit("loadedmetadata");
  assert.equal(p.range.disabled, false);
  api.seek(p.audio, 900);
  assert.equal(p.audio.currentTime, 85);
  await p.back.emit("click");
  assert.equal(p.audio.currentTime, 70);
  api.seek(p.audio, -4);
  assert.equal(p.audio.currentTime, 0);
  api.seek(p.audio, NaN);
  assert.equal(p.audio.currentTime, 0);
  await p.speed.emit("click");
  assert.equal(p.audio.playbackRate, 1.25);
  await p.mute.emit("click");
  assert.equal(p.mute.attributes["aria-pressed"], "true");
  assert.match(p.mute.attributes["aria-label"], /audioUnmute/);
  assert.equal(api.formatTime(3665), "1:01:05");
  assert.equal(api.formatTime(NaN), "0:00");
});
test("play rejection is recoverable and translated without losing the player", async () => {
  const env = setup("js/audio-player.js"),
    p = player(env);
  p.audio.play = () => Promise.reject(new Error("Network unavailable"));
  await p.play.emit("click");
  assert.equal(p.audio.paused, true);
  assert.equal(p.status.textContent, "audioError");
  assert.match(p.play.attributes["aria-label"], /audioRetry/);
  p.audio.play = Element.prototype.play;
  await p.play.emit("click");
  assert.equal(p.audio.paused, false);
  assert.equal(p.status.textContent, "");
  await env.events.languagechange[0]();
  assert.equal(p.audio.paused, false);
  env.context.window.ImmersiveAudio.pauseAll();
});
test("pausing during a pending play request does not report a false playback error", async () => {
  const env = setup("js/audio-player.js"),
    p = player(env);
  let reject;
  p.audio.play = () =>
    new Promise((_, r) => {
      reject = r;
    });
  const first = p.play.emit("click");
  await p.play.emit("click");
  reject(new Error("AbortError"));
  await first;
  assert.equal(p.status.textContent, "");
  assert.equal(p.play.attributes["aria-pressed"], "false");
  assert.equal(env.timers.size, 0);
});
test("a stalled audio request returns to a retryable state", async () => {
  const env = setup("js/audio-player.js"),
    p = player(env);
  await p.play.emit("click");
  await p.audio.emit("waiting");
  assert.equal(p.status.textContent, "audioLoading");
  for (const fn of [...env.timers.values()]) fn();
  assert.equal(p.audio.paused, true);
  assert.equal(p.status.textContent, "audioError");
});
test("rapid cover selections ignore late image loads and preserve the last requested cover", async () => {
  const loads = [];
  class Image {
    decode() {
      return new Promise((resolve, reject) =>
        loads.push({ resolve, reject, src: this.src }),
      );
    }
  }
  const env = setup("js/book-motion.js", {
    Image,
    matchMedia: () => ({ matches: true, addEventListener() {} }),
  });
  const cover = new Element("img");
  cover.src = "pt.webp";
  const change = env.context.window.BookMotion.replace;
  const first = change(cover, "en.webp", "English");
  const second = change(cover, "analysis.webp", "Analysis");
  loads[1].resolve();
  await second;
  loads[0].resolve();
  await first;
  assert.equal(cover.src, "analysis.webp");
  assert.equal(cover.alt, "Analysis");
  const failed = change(cover, "missing.webp", "Missing");
  loads[2].reject(new Error());
  await failed;
  assert.equal(cover.src, "analysis.webp");
  assert.equal(cover.alt, "Analysis");
});
test("all eight curated demos have localized copy, source mappings and exact live entry paths", () => {
  const env = setup("js/portfolio.js");
  const portfolio = env.context.window.Portfolio;
  assert.equal(portfolio.catalog.length, 8);
  assert.equal(new Set(portfolio.catalog.map((x) => x.repo)).size, 8);
  for (const item of portfolio.catalog) {
    assert.equal(item.title.length, 3);
    assert.equal(item.copy.length, 3);
    const url = new URL(portfolio.demoURL(item, "pt-BR"));
    assert.equal(url.origin, "https://jgabriel2302.github.io");
    assert.ok(url.pathname.startsWith("/" + item.repo + "/"));
  }
  const text = portfolio.catalog.find((x) => x.repo === "simply-similar");
  assert.equal(
    portfolio.demoURL(text, "en"),
    "https://jgabriel2302.github.io/simply-similar/exemple/en/",
  );
  for (const repo of ["previsao-ebitda", "machine-Inside-out"])
    assert.match(
      portfolio.demoURL(
        portfolio.catalog.find((x) => x.repo === repo),
        "en",
      ),
      /\/exemple\/$/,
    );
});
