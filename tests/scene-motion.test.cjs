const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const source = fs.readFileSync(
  path.join(__dirname, "../js/scene-motion.js"),
  "utf8",
);
const math = import(
  "data:text/javascript;base64," + Buffer.from(source).toString("base64")
);

test("book and secondary opacity stay continuous across former hard-cut boundaries", async () => {
  const { bookPresence, secondaryPresence } = await math;
  for (const fn of [bookPresence, secondaryPresence]) {
    for (const point of [0.45, 0.8, 1.05, 1.12, 2, 2.1, 4, 4.05, 5])
      assert.ok(Math.abs(fn(point - 1e-6) - fn(point + 1e-6)) < 0.00001);
    for (let i = 0; i <= 500; i++)
      assert.ok(fn(i / 100) >= 0 && fn(i / 100) <= 1);
  }
});
test("leaving the book fades fully out and connecting fades back in", async () => {
  const { bookPresence } = await math;
  assert.equal(bookPresence(1), 1);
  assert.ok(bookPresence(1.5) > 0 && bookPresence(1.5) < 1);
  assert.equal(bookPresence(2.1), 0);
  assert.equal(bookPresence(3), 0);
  assert.ok(bookPresence(4.5) > 0 && bookPresence(4.5) < bookPresence(5));
  assert.equal(bookPresence(5), 0.18);
  for (let p = 1.12; p < 2.1; p += 0.01)
    assert.ok(bookPresence(p + 0.01) <= bookPresence(p));
});
test("fast scene jumps still fade over time without frame-rate-dependent overshoot", async () => {
  const { follow } = await math;
  let opacity = 1;
  const first = follow(opacity, 0, 1 / 30);
  assert.ok(first > 0.8 && first < 1);
  for (let i = 0; i < 60; i++) {
    const next = follow(opacity, 0, 1 / 30);
    assert.ok(next <= opacity && next >= 0);
    opacity = next;
  }
  assert.equal(opacity, 0);
  const run = (rate) => {
    let value = 1;
    for (let i = 0; i < rate / 2; i++) value = follow(value, 0, 1 / rate);
    return value;
  };
  assert.ok(Math.abs(run(30) - run(60)) < 1e-10);
  assert.equal(follow(0.6, 0, 0), 0.6);
});
test("book anchors do not leave the viewport with the translated HTML panel", async () => {
  const { sceneAnchorX } = await math;
  for (const panelWidth of [1265, 1348, 1905]) {
    for (const sceneIndex of [0, 1]) {
      const localX = panelWidth * 0.28;
      for (let progress = 0; progress <= 5; progress += 0.1) {
        const screenX = localX + (sceneIndex - progress) * panelWidth;
        assert.ok(
          Math.abs(
            sceneAnchorX(screenX, progress, sceneIndex, panelWidth) - localX,
          ) < 1e-9,
        );
      }
    }
  }
});
