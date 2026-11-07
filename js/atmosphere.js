import { clamp01, follow, smoothRange } from "./scene-motion.js";

// A lightweight shared layer keeps dust and shafts visible even without WebGL.
const layer = document.querySelector(".atmosphere");
const canvas = document.getElementById("atmosphere-canvas");
const ctx = canvas.getContext("2d", { alpha: true });
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const beam = document.querySelector(".light-beams");
const bookStages = [
  document.querySelector(".hero-book-stage"),
  document.querySelector(".detail-book-stage"),
];
let width = 0,
  height = 0,
  mobile = false,
  particles = [],
  raf = 0,
  last = 0,
  elapsed = 0;
let progress = window.SceneNavigation?.progress || 0,
  visualProgress = progress;
let horizontal = window.SceneNavigation?.horizontal || false,
  demoOpen = false;
const pointer = { x: 0, y: 0 },
  drift = { x: 0, y: 0 };
const seed = (n) => {
  const value = Math.sin(n * 127.1 + 31.7) * 43758.5453;
  return value - Math.floor(value);
};
const wrap = (n, size) => ((n % size) + size) % size;
const sprite = document.createElement("canvas");
sprite.width = sprite.height = 24;
const spriteContext = sprite.getContext("2d");
if (spriteContext) {
  const glow = spriteContext.createRadialGradient(12, 12, 0, 12, 12, 12);
  glow.addColorStop(0, "rgba(255,247,218,1)");
  glow.addColorStop(0.16, "rgba(255,234,166,.85)");
  glow.addColorStop(0.38, "rgba(255,205,82,.18)");
  glow.addColorStop(1, "rgba(255,192,2,0)");
  spriteContext.fillStyle = glow;
  spriteContext.fillRect(0, 0, 24, 24);
}
function fadeFallbackBooks() {
  bookStages.forEach((stage, index) => {
    let opacity = 1;
    if (!reduced.matches) {
      if (horizontal)
        opacity = 1 - smoothRange(Math.abs(progress - index), 0.12, 0.88);
      else {
        const rect = stage.getBoundingClientRect();
        const visible = Math.max(
          0,
          Math.min(rect.bottom, height - 55) -
            Math.max(rect.top, mobile ? 110 : 88),
        );
        opacity = smoothRange(
          visible / Math.max(1, Math.min(rect.height, height * 0.7)),
          0,
          0.45,
        );
      }
    }
    stage.style.setProperty("--stage-opacity", String(opacity));
  });
}
function draw(seconds) {
  visualProgress = follow(visualProgress, progress, seconds, 0.4);
  drift.x = follow(drift.x, pointer.x, seconds, 0.5);
  drift.y = follow(drift.y, pointer.y, seconds, 0.5);
  const movement = reduced.matches ? 0 : 1;
  const sway = Math.sin(elapsed * 0.09) * 1.3 * movement;
  beam.style.transform = `translate3d(${drift.x * 12 * movement}px,${drift.y * 7 * movement}px,0) rotate(${sway}deg)`;
  layer.style.setProperty(
    "--light-strength",
    String(
      0.8 -
        0.25 * smoothRange(visualProgress, 1.3, 2.3) +
        0.15 * smoothRange(visualProgress, 4, 5),
    ),
  );
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  for (const p of particles) {
    const x =
      wrap(
        p.x * width +
          elapsed * p.speed * 0.24 * movement -
          visualProgress * p.depth * 42 * movement +
          drift.x * p.depth * 18 * movement,
        width + 32,
      ) - 16;
    const y =
      wrap(
        p.y * height -
          elapsed * p.speed * movement +
          drift.y * p.depth * 14 * movement,
        height + 32,
      ) - 16;
    const shimmer = movement
      ? 0.84 + 0.16 * Math.sin(elapsed * 0.45 + p.phase)
      : 1;
    ctx.globalAlpha = p.alpha * shimmer;
    ctx.drawImage(sprite, x - p.size / 2, y - p.size / 2, p.size, p.size);
  }
  ctx.globalAlpha = 1;
}
function render(time) {
  raf = 0;
  if (document.hidden || demoOpen || reduced.matches) return;
  raf = requestAnimationFrame(render);
  if (time - last < 1000 / (mobile ? 20 : 30)) return;
  const seconds = Math.min((time - last) / 1000, 0.08);
  last = time;
  elapsed += seconds;
  draw(seconds);
}
function stop() {
  cancelAnimationFrame(raf);
  raf = 0;
}
function run() {
  if (document.hidden || demoOpen) return;
  if (reduced.matches) {
    draw(1);
    return;
  }
  if (!raf) {
    last = performance.now();
    raf = requestAnimationFrame(render);
  }
}
function resize() {
  width = innerWidth;
  height = innerHeight;
  mobile = width < 760;
  const ratio = Math.min(devicePixelRatio || 1, mobile ? 1 : 1.5);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
  const count = reduced.matches ? (mobile ? 14 : 28) : mobile ? 36 : 96;
  particles = Array.from({ length: count }, (_, i) => {
    const depth = 0.25 + (i % 3) * 0.375;
    return {
      x: seed(i + 1),
      y: seed(i + 501),
      depth,
      size: 3 + depth * 7,
      speed: 2 + depth * 4,
      alpha: 0.24 + depth * 0.44,
      phase: seed(i + 901) * Math.PI * 2,
    };
  });
  fadeFallbackBooks();
  draw(1);
}
window.addEventListener("sceneprogress", (event) => {
  progress = event.detail.progress;
  horizontal = event.detail.horizontal;
  fadeFallbackBooks();
  if (reduced.matches) draw(1);
});
window.addEventListener("resize", resize, { passive: true });
window.addEventListener(
  "pointermove",
  (event) => {
    if (event.pointerType !== "mouse" || reduced.matches) return;
    pointer.x = clamp01(event.clientX / width) * 2 - 1;
    pointer.y = clamp01(event.clientY / height) * 2 - 1;
  },
  { passive: true },
);
document.addEventListener("pointerleave", () => {
  pointer.x = pointer.y = 0;
});
document.addEventListener("visibilitychange", () =>
  document.hidden ? stop() : run(),
);
window.addEventListener("demotoggle", (event) => {
  demoOpen = event.detail.open;
  demoOpen ? stop() : run();
});
reduced.addEventListener("change", () => {
  stop();
  resize();
  run();
});
window.addEventListener("pagehide", stop);
window.addEventListener("pageshow", run);
resize();
run();
