"use strict";
(() => {
  const states = new WeakMap();
  const active = new Set();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  function clear(state) {
    state.animations?.forEach((a) => a.cancel());
    state.clone?.remove();
    state.clone = null;
    active.delete(state);
  }
  async function replace(image, source, alt) {
    let state = states.get(image);
    if (!state) {
      state = { version: 0 };
      states.set(image, state);
    }
    const version = ++state.version;
    if (image.getAttribute("src") === source) {
      image.alt = alt;
      clear(state);
      return;
    }
    const next = new Image();
    next.src = source;
    try {
      await next.decode();
    } catch {
      return;
    } // Keep the readable cover if a new asset fails.
    if (version !== state.version) return;
    clear(state);
    const book = image.closest(".css-book");
    const animate =
      book &&
      !reduced.matches &&
      typeof book.animate === "function" &&
      getComputedStyle(book).opacity !== "0";
    const base = book ? getComputedStyle(book).transform : "none";
    if (animate) {
      state.clone = book.cloneNode(true);
      state.clone.removeAttribute("id");
      state.clone
        .querySelectorAll("[id]")
        .forEach((el) => el.removeAttribute("id"));
      state.clone.setAttribute("aria-hidden", "true");
      state.clone.classList.add("departing-book");
      book.parentElement.append(state.clone);
    }
    image.src = source;
    image.alt = alt;
    if (!animate) return;
    const pose = base === "none" ? "" : base;
    const options = {
      duration: 1150,
      easing: "cubic-bezier(.4,0,.2,1)",
      fill: "both",
    };
    state.animations = [
      state.clone.animate(
        [
          { transform: pose, opacity: 1 },
          {
            transform: `translate3d(-120px, -24px, -100px) rotateY(-32deg) ${pose}`,
            opacity: 0,
          },
        ],
        options,
      ),
      book.animate(
        [
          {
            transform: `translate3d(120px, 24px, -100px) rotateY(28deg) ${pose}`,
            opacity: 0,
          },
          { transform: pose, opacity: 1 },
        ],
        { ...options, delay: 100 },
      ),
    ];
    active.add(state);
    Promise.all(state.animations.map((a) => a.finished))
      .then(() => {
        if (state.version === version) clear(state);
      })
      .catch(() => {});
  }
  reduced.addEventListener("change", () => {
    if (reduced.matches) [...active].forEach(clear);
  });
  window.addEventListener("pagehide", () => [...active].forEach(clear));
  window.BookMotion = { replace };
})();
