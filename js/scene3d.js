import {
  bookPresence,
  secondaryPresence,
  follow,
  sceneAnchorX,
  smoothRange,
} from "./scene-motion.js";
// Progressive enhancement: readable HTML and CSS book covers work without WebGL.
const canvas = document.getElementById("scene-canvas");
const root = document.documentElement;
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
let cleanup = null,
  loading = false;
async function start() {
  if (reduced.matches || cleanup || loading) return;
  loading = true;
  try {
    const THREE = await import("./vendor/three.module.min.js");
    if (reduced.matches) return;
    const teardown = await createScene(THREE);
    if (reduced.matches) teardown();
    else cleanup = teardown;
  } catch {
    root.classList.remove("webgl-ready");
    canvas.style.filter = "";
  } finally {
    loading = false;
  }
}
async function createScene(THREE) {
  const mobile = matchMedia("(max-width: 760px)").matches;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !mobile,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mobile ? 1 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    35,
    innerWidth / innerHeight,
    0.1,
    60,
  );
  camera.position.set(0, 0, 12);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x36302a, 2.4));
  const key = new THREE.DirectionalLight(0xffffff, 3);
  key.position.set(-3, 5, 7);
  scene.add(key);
  const warm = new THREE.PointLight(0xffc002, 9, 24);
  warm.position.set(5, -1, 4);
  scene.add(warm);
  const textureLoader = new THREE.TextureLoader(),
    textures = new Map();
  let disposed = false,
    failed = false,
    raf = 0,
    last = 0,
    elapsed = 0,
    hovered = false,
    enabledMotion = false,
    demoOpen = false;
  let progress = window.SceneNavigation?.progress || 0;
  let horizontal = window.SceneNavigation?.horizontal || false;
  const pointer = new THREE.Vector2(),
    raycaster = new THREE.Raycaster();
  const removers = [];
  function listen(target, event, fn, options) {
    target.addEventListener(event, fn, options);
    removers.push(() => target.removeEventListener(event, fn, options));
  }
  async function texture(url) {
    if (!textures.has(url))
      textures.set(
        url,
        textureLoader
          .loadAsync(new URL("../" + url, import.meta.url).href)
          .then((map) => {
            map.colorSpace = THREE.SRGBColorSpace;
            map.anisotropy = Math.min(
              renderer.capabilities.getMaxAnisotropy(),
              4,
            );
            if (disposed) map.dispose();
            return map;
          }),
      );
    return textures.get(url);
  }
  let pt, en;
  try {
    [pt, en] = await Promise.all([
      texture("assets/book-story-pt.webp"),
      texture("assets/book-story-en-current.webp"),
    ]);
  } catch (error) {
    disposed = true;
    renderer.dispose();
    textures.forEach((promise) =>
      promise.then((map) => map.dispose()).catch(() => {}),
    );
    throw error;
  }
  const paperCanvas = document.createElement("canvas");
  paperCanvas.width = 8;
  paperCanvas.height = 256;
  const ctx = paperCanvas.getContext("2d");
  ctx.fillStyle = "#e8e2d4";
  ctx.fillRect(0, 0, 8, 256);
  ctx.fillStyle = "#bdb6a5";
  for (let y = 0; y < 256; y += 4) ctx.fillRect(0, y, 8, 1);
  const paperTexture = new THREE.CanvasTexture(paperCanvas);
  paperTexture.colorSpace = THREE.SRGBColorSpace;
  const bookGeometries = [
    new THREE.BoxGeometry(1.96, 2.94, 0.19),
    new THREE.BoxGeometry(2, 3, 0.035),
    new THREE.BoxGeometry(0.07, 3, 0.26),
    new THREE.PlaneGeometry(2, 3),
  ];
  function book(map) {
    const group = new THREE.Group();
    const paper = new THREE.MeshStandardMaterial({
      map: paperTexture,
      roughness: 1,
    });
    const black = new THREE.MeshStandardMaterial({
      color: 0x101010,
      roughness: 0.72,
    });
    const cover = new THREE.MeshBasicMaterial({ map });
    const pages = new THREE.Mesh(bookGeometries[0], paper);
    group.add(pages);
    for (const z of [-0.12, 0.12]) {
      const hardCover = new THREE.Mesh(bookGeometries[1], black);
      hardCover.position.z = z;
      group.add(hardCover);
    }
    const spine = new THREE.Mesh(bookGeometries[2], black);
    spine.position.x = -0.97;
    group.add(spine);
    const front = new THREE.Mesh(bookGeometries[3], cover);
    front.position.z = 0.139;
    group.add(front);
    group.userData.front = cover;
    group.userData.materials = [paper, black, cover];
    scene.add(group);
    return group;
  }
  const books = [book(pt), book(en)];
  if (!mobile) books.push(book(pt), book(en));
  // Two temporary physical volumes retain the old textures during a handoff.
  const outgoingBooks = [book(pt), book(en)];
  outgoingBooks.forEach((group) => {
    group.visible = false;
  });
  let pendingExchange = null,
    exchange = null,
    coverInitialized = false;
  function beginExchange() {
    if (!pendingExchange || exchange) return;
    const maps = pendingExchange;
    pendingExchange = null;
    const changed = maps.map((map, i) => books[i].userData.front.map !== map);
    if (!changed.some(Boolean)) return;
    maps.forEach((map, i) => {
      outgoingBooks[i].userData.front.map = books[i].userData.front.map;
      outgoingBooks[i].userData.front.needsUpdate = true;
      books[i].userData.front.map = map;
      books[i].userData.front.needsUpdate = true;
    });
    exchange = { start: elapsed, changed };
  }
  const hexGroup = new THREE.Group();
  scene.add(hexGroup);
  const hexMaterial = new THREE.LineBasicMaterial({
    color: 0xc4b984,
    transparent: true,
    opacity: 0.075,
    depthWrite: false,
  });
  const vertices = [];
  // Flat-top hexagons sharing edges, rather than an unrelated particle cloud.
  for (let col = 0; col < (mobile ? 7 : 14); col++)
    for (let row = 0; row < 9; row++) {
      if ((col * 7 + row * 3) % 5 === 0) continue;
      const r = 0.38,
        x = (col - 6.5) * r * 1.5,
        y = (row - 4) * r * Math.sqrt(3) + ((col % 2) * r * Math.sqrt(3)) / 2;
      for (let edge = 0; edge < 6; edge++) {
        const a = (edge * Math.PI) / 3,
          b = ((edge + 1) * Math.PI) / 3;
        vertices.push(
          x + r * Math.cos(a),
          y + r * Math.sin(a),
          0,
          x + r * Math.cos(b),
          y + r * Math.sin(b),
          0,
        );
      }
    }
  const hexGeometry = new THREE.BufferGeometry();
  hexGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3),
  );
  const hexLines = new THREE.LineSegments(hexGeometry, hexMaterial);
  hexGroup.add(hexLines);
  hexGroup.position.set(3, 0, -3);
  const bars = new THREE.Group();
  scene.add(bars);
  bars.position.set(3, -2, -2);
  const barGeometry = new THREE.BoxGeometry(0.22, 1, 0.22);
  const barMaterial = new THREE.MeshStandardMaterial({
    color: 0xffc002,
    transparent: true,
    opacity: 0,
    roughness: 0.5,
    depthWrite: false,
  });
  for (let i = 0; i < (mobile ? 7 : 14); i++) {
    const bar = new THREE.Mesh(barGeometry, barMaterial);
    bar.position.x = (i - 7) * 0.38;
    bar.userData.height = 0.35 + (i % 5) * 0.24 + i * 0.035;
    bars.add(bar);
  }
  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    renderer.setPixelRatio(
      Math.min(devicePixelRatio || 1, innerWidth < 760 ? 1 : 1.5),
    );
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  }
  resize();
  let activeCover = "";
  async function updateCover() {
    const url =
      progress < 0.5 ? window.Website?.heroCover : window.Website?.bookCover;
    const second = window.Website?.language === "pt-BR" ? en : pt;
    const key = url + ":" + second.uuid;
    if (!url || key === activeCover) return;
    activeCover = key;
    try {
      const map = await texture(url);
      if (disposed || activeCover !== key) return;
      if (!coverInitialized) {
        [map, second].forEach((value, i) => {
          books[i].userData.front.map = value;
          books[i].userData.front.needsUpdate = true;
        });
        coverInitialized = true;
      } else pendingExchange = [map, second]; // Latest requested edition wins, even while textures load.
    } catch {
      failed = true;
      root.classList.remove("webgl-ready");
      stop();
    }
  }
  function positionBook(group, x, y, pixelHeight, z, rotation, alpha) {
    const visibleHeight =
      2 *
      Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) *
      (camera.position.z - z);
    const unit = visibleHeight / innerHeight;
    group.position.set(
      (x - innerWidth / 2) * unit,
      (innerHeight / 2 - y) * unit,
      z,
    );
    group.scale.setScalar((pixelHeight * unit) / 3);
    const coverImage = group.userData.front.map.image;
    group.scale.x *= coverImage.width / coverImage.height / (2 / 3);
    group.rotation.set(
      0.05 + pointer.y * 0.035,
      rotation.y + pointer.x * 0.08,
      rotation.z,
    );
    group.visible = alpha > 0;
    group.userData.materials.forEach((material) => {
      material.transparent = true;
      material.opacity = alpha;
      material.depthWrite = false;
    });
  }
  function placeExchangingBook(index, bx, by, height, depth, turn, opacity) {
    if (!exchange?.changed[index]) {
      positionBook(books[index], bx, by, height, depth, turn, opacity);
      outgoingBooks[index].visible = false;
      return;
    }
    const t = Math.min(1, (elapsed - exchange.start) / 1.15);
    const out = smoothRange(t, 0, 1);
    const into = Math.max(0, (t - 0.12) / 0.88);
    const incoming = smoothRange(into, 0, 1);
    const distance = Math.max(110, height * 0.4);
    positionBook(
      outgoingBooks[index],
      bx - distance * out,
      by - 32 * out,
      height * (1 - out * 0.15),
      depth - out * 1.4,
      { y: turn.y - out * 0.65, z: turn.z - out * 0.14 },
      opacity * (1 - out),
    );
    positionBook(
      books[index],
      bx + distance * (1 - incoming),
      by + 32 * (1 - incoming),
      height * (0.85 + incoming * 0.15),
      depth - (1 - incoming) * 1.4,
      {
        y: turn.y + (1 - incoming) * 0.65,
        z: turn.z + (1 - incoming) * 0.14,
      },
      opacity * incoming,
    );
  }
  let sceneOpacity = bookPresence(progress) * (horizontal ? 1 : 0.15);
  const lerp = THREE.MathUtils.lerp;
  function render(timestamp) {
    raf = 0;
    if (disposed || failed || document.hidden || demoOpen || reduced.matches)
      return;
    raf = requestAnimationFrame(render);
    if (timestamp - last < 1000 / (mobile ? 24 : 30)) return;
    const delta = Math.min((timestamp - last) / 1000, 0.05);
    last = timestamp;
    elapsed += delta;
    if (exchange && elapsed - exchange.start >= 1.15) {
      exchange = null;
      outgoingBooks.forEach((group) => {
        group.visible = false;
      });
    }
    beginExchange();
    camera.position.z = 12 + Math.max(0, Math.min(1, progress - 1)) * 1.3;
    camera.position.x = pointer.x * 0.06;
    camera.position.y = pointer.y * 0.04;
    camera.lookAt(0, 0, 0);
    const hero = document
      .querySelector(".hero-book-stage")
      .getBoundingClientRect();
    const detail = document
      .querySelector(".detail-book-stage")
      .getBoundingClientRect();
    const panelWidth = document
      .querySelector(".scene")
      .getBoundingClientRect().width;
    const heroX = horizontal
      ? sceneAnchorX(hero.left + hero.width * 0.44, progress, 0, panelWidth)
      : hero.left + hero.width * 0.44;
    const detailX = horizontal
      ? sceneAnchorX(detail.left + detail.width * 0.5, progress, 1, panelWidth)
      : detail.left + detail.width * 0.5;
    const blend = THREE.MathUtils.smoothstep(progress, 0, 1);
    const heroHeight = Math.min(hero.height * 0.7, innerHeight * 0.48);
    let x = lerp(heroX, detailX, blend);
    let y = lerp(
      hero.top + hero.height * 0.45,
      detail.top + detail.height * 0.5,
      blend,
    );
    let size = lerp(
        heroHeight,
        Math.min(detail.height * 0.78, innerHeight * 0.49),
        blend,
      ),
      alpha;
    if (progress > 1) {
      const away = THREE.MathUtils.smoothstep(progress, 1, 2);
      x = lerp(detailX, innerWidth * 0.85, away);
      y = lerp(detail.top + detail.height * 0.5, innerHeight * 0.47, away);
      size = lerp(size, innerHeight * 0.22, away);
    }
    if (!horizontal) {
      x = innerWidth * 0.85;
      y = innerHeight * 0.38;
      size = innerHeight * 0.21;
    }
    const targetOpacity = bookPresence(progress) * (horizontal ? 1 : 0.15);
    sceneOpacity = follow(sceneOpacity, targetOpacity, delta);
    alpha = sceneOpacity;
    const float = Math.sin(elapsed * 0.5) * 4;
    const rotation = {
      y: -0.24 + Math.sin(elapsed * 0.22) * 0.08 + (hovered ? 0.08 : 0),
      z: lerp(-0.12, -0.05, blend),
    };
    placeExchangingBook(
      0,
      x,
      y + float,
      size * (hovered ? 1.035 : 1),
      0.2,
      rotation,
      alpha,
    );
    const spread = lerp(hero.width * 0.28, detail.width * 0.24, blend);
    placeExchangingBook(
      1,
      x + spread,
      y - size * 0.14 - float,
      size * 0.76,
      -0.35,
      { y: -0.34, z: 0.16 },
      alpha * secondaryPresence(progress),
    );
    if (books.length > 2) {
      positionBook(
        books[2],
        x - size * 0.65,
        y + size * 0.38,
        size * 0.27,
        -1.5,
        { y: 0.3, z: 0.16 },
        alpha * 0.1,
      );
      positionBook(
        books[3],
        x + size * 0.7,
        y + size * 0.53,
        size * 0.31,
        -1,
        { y: -0.4, z: -0.15 },
        alpha * 0.18,
      );
    }
    hexMaterial.opacity =
      0.045 + Math.max(0, 1 - Math.abs(progress - 4)) * 0.12;
    hexGroup.rotation.z = Math.sin(elapsed * 0.08) * 0.025;
    hexGroup.position.x = 3 - progress * 0.35 + pointer.x * 0.04;
    const barVisibility = Math.max(0, 1 - Math.abs(progress - 3));
    barMaterial.opacity = barVisibility * 0.18;
    bars.children.forEach((bar, i) => {
      bar.scale.y =
        bar.userData.height * (0.8 + Math.sin(elapsed * 0.8 + i * 0.8) * 0.2);
      bar.position.y = bar.scale.y / 2;
    });
    renderer.render(scene, camera);
  }
  function run() {
    if (!raf && !document.hidden && !demoOpen && !reduced.matches && !failed) {
      last = performance.now();
      raf = requestAnimationFrame(render);
    }
  }
  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }
  function onProgress(event) {
    progress = event.detail.progress;
    horizontal = event.detail.horizontal;
    const blur =
      2.5 *
      smoothRange(progress, 1.25, 1.9) *
      (1 - smoothRange(progress, 2.1, 2.8));
    canvas.style.filter = blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : "";
    updateCover();
  }
  listen(window, "sceneprogress", onProgress);
  listen(window, "demotoggle", (event) => {
    demoOpen = event.detail.open;
    demoOpen ? stop() : run();
  });
  listen(window, "bookchange", updateCover);
  listen(window, "languagechange", updateCover);
  listen(window, "resize", resize, { passive: true });
  listen(document, "visibilitychange", () =>
    document.hidden ? stop() : run(),
  );
  listen(
    window,
    "pointermove",
    (event) => {
      if (event.pointerType !== "mouse") return;
      pointer.set(
        (event.clientX / innerWidth - 0.5) * 2,
        (0.5 - event.clientY / innerHeight) * 2,
      );
      raycaster.setFromCamera(pointer, camera);
      hovered =
        Boolean(event.target.closest(".hero-book-stage")) &&
        raycaster.intersectObjects(books[0].children).length > 0;
    },
    { passive: true },
  );
  listen(document, "pointerleave", () => {
    pointer.set(0, 0);
    hovered = false;
  });
  const motionButton = document.getElementById("motion-control");
  const motionText = (key) =>
    window.Website?.translations[window.Website.language][key] || key;
  function onOrientation(event) {
    if (
      document.hidden ||
      !enabledMotion ||
      event.gamma == null ||
      event.beta == null
    )
      return;
    pointer.set(
      THREE.MathUtils.clamp(event.gamma / 35, -1, 1),
      THREE.MathUtils.clamp((event.beta - 45) / 45, -1, 1),
    );
  }
  function syncMotionLabel() {
    motionButton.textContent = motionText(
      enabledMotion ? "disableMotion" : "enableMotion",
    );
  }
  if (mobile && window.DeviceOrientationEvent && window.isSecureContext) {
    motionButton.hidden = false;
    listen(motionButton, "click", async () => {
      if (enabledMotion) {
        enabledMotion = false;
        pointer.set(0, 0);
        motionButton.setAttribute("aria-pressed", "false");
        syncMotionLabel();
        return;
      }
      try {
        const permission =
          typeof DeviceOrientationEvent.requestPermission === "function"
            ? await DeviceOrientationEvent.requestPermission()
            : "granted";
        if (permission !== "granted") throw new Error("Permission denied");
        enabledMotion = true;
        motionButton.setAttribute("aria-pressed", "true");
        syncMotionLabel();
      } catch {
        motionButton.textContent = motionText("motionDenied");
      }
    });
    listen(window, "deviceorientation", onOrientation, { passive: true });
    listen(window, "languagechange", syncMotionLabel);
  }
  listen(canvas, "webglcontextlost", (event) => {
    event.preventDefault();
    failed = true;
    stop();
    root.classList.remove("webgl-ready");
    motionButton.hidden = true;
  });
  // A page reload can safely recreate resources after context loss; never leave blank covers.
  root.classList.add("webgl-ready");
  await updateCover();
  run();
  return () => {
    disposed = true;
    stop();
    removers.forEach((remove) => remove());
    root.classList.remove("webgl-ready");
    motionButton.hidden = true;
    canvas.style.filter = "";
    for (const group of [...books, ...outgoingBooks])
      group.userData.materials.forEach((material) => material.dispose());
    bookGeometries.forEach((geometry) => geometry.dispose());
    hexGeometry.dispose();
    hexMaterial.dispose();
    barGeometry.dispose();
    barMaterial.dispose();
    paperTexture.dispose();
    textures.forEach((promise) =>
      promise.then((map) => map.dispose()).catch(() => {}),
    );
    renderer.dispose();
  };
}
reduced.addEventListener("change", () => {
  if (reduced.matches) {
    cleanup?.();
    cleanup = null;
  } else start();
});
window.addEventListener("pagehide", () => {
  cleanup?.();
  cleanup = null;
});
window.addEventListener("pageshow", () => {
  if (!reduced.matches) start();
});
if ("requestIdleCallback" in window)
  requestIdleCallback(start, { timeout: 1500 });
else setTimeout(start, 100);
