"use strict";
(() => {
  const root = document.documentElement;
  const scenes = Array.from(document.querySelectorAll(".scene"));
  const track = document.getElementById("scene-track");
  const journey = document.getElementById("journey");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const wide = matchMedia(
    "(min-width: 1100px) and (min-height: 760px) and (pointer: fine)",
  );
  let horizontal = false,
    current = 0,
    progress = 0,
    frame = 0,
    layoutFrame = 0,
    initialized = false;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const sceneLabel = (i) =>
    window.Website?.translations[window.Website.language][
      ["home", "books", "about", "podcast", "projects", "connect"][i]
    ] || ["Início", "Livros", "Sobre", "Podcast", "Projetos", "Conectar"][i];
  function activate(index) {
    const changed = index !== current;
    current = index;
    scenes.forEach((scene, i) => {
      scene.inert = horizontal && i !== index;
      if (horizontal && i !== index) scene.setAttribute("aria-hidden", "true");
      else scene.removeAttribute("aria-hidden");
    });
    document
      .querySelectorAll(".main-nav [data-scene],.scene-dots [data-scene]")
      .forEach((a) => {
        if (Number(a.dataset.scene) === index)
          a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      });
    document.getElementById("scene-number").textContent = String(
      index + 1,
    ).padStart(2, "0");
    document.getElementById("scene-label").textContent = sceneLabel(index);
    document.getElementById("previous-scene").disabled = index === 0;
    document.getElementById("next-scene").disabled =
      index === scenes.length - 1;
    if (changed)
      document.getElementById("scene-announcement").textContent =
        sceneLabel(index);
  }
  function update() {
    frame = 0;
    if (horizontal) {
      progress = clamp(
        (scrollY - journey.offsetTop) / innerHeight,
        0,
        scenes.length - 1,
      );
      track.style.transform = `translate3d(${-progress * innerWidth}px,0,0)`;
    } else {
      const anchor = scrollY + innerHeight * 0.4;
      let index = 0;
      for (let i = 0; i < scenes.length; i++)
        if (scenes[i].offsetTop <= anchor) index = i;
      progress = index;
      track.style.transform = "";
    }
    const previous = current;
    activate(Math.round(progress));
    // Move focus away from a panel that has just become inert, without scrolling.
    if (
      horizontal &&
      previous !== current &&
      scenes[previous].contains(document.activeElement)
    )
      scenes[current].focus({ preventScroll: true });
    document.getElementById("journey-progress").style.width =
      ((progress + 1) / scenes.length) * 100 + "%";
    window.dispatchEvent(
      new CustomEvent("sceneprogress", {
        detail: { progress, index: current, horizontal },
      }),
    );
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  function goTo(
    index,
    { smooth = true, focus = false, historyEntry = false } = {},
  ) {
    index = clamp(index, 0, scenes.length - 1);
    if (historyEntry && location.hash !== "#" + scenes[index].id)
      history.pushState(null, "", "#" + scenes[index].id);
    // Activate immediately for keyboard focus; the scroll update keeps it synchronized.
    if (focus) {
      activate(index);
      scenes[index].focus({ preventScroll: true });
    }
    window.scrollTo({
      top: horizontal
        ? journey.offsetTop + index * innerHeight
        : scenes[index].offsetTop,
      behavior: smooth && !reduceMotion.matches ? "smooth" : "instant",
    });
    schedule();
  }
  function setLayout() {
    layoutFrame = 0;
    const oldMode = horizontal,
      keep = current;
    horizontal = wide.matches && !reduceMotion.matches;
    root.classList.toggle("horizontal", horizontal);
    root.classList.toggle("vertical", !horizontal);
    // At large text sizes or shorter viewports, let the document grow instead of clipping content.
    if (
      horizontal &&
      scenes.some((scene) => {
        const style = getComputedStyle(scene);
        const available =
          innerHeight -
          parseFloat(style.paddingTop) -
          parseFloat(style.paddingBottom);
        return (
          scene.querySelector(".scene-content").getBoundingClientRect().height >
          available + 1
        );
      })
    ) {
      horizontal = false;
      root.classList.remove("horizontal");
      root.classList.add("vertical");
    }
    if (!horizontal) track.style.transform = "";
    if (initialized && oldMode !== horizontal) goTo(keep, { smooth: false });
    initialized = true;
    update();
  }
  function scheduleLayout() {
    if (!layoutFrame) layoutFrame = requestAnimationFrame(setLayout);
  }
  function followHash() {
    const index = scenes.findIndex((scene) => "#" + scene.id === location.hash);
    if (index >= 0) goTo(index, { smooth: false });
  }
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-scene]");
    if (
      !link ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    goTo(Number(link.dataset.scene), { focus: true, historyEntry: true });
  });
  document
    .getElementById("previous-scene")
    .addEventListener("click", () => goTo(current - 1, { historyEntry: true }));
  document
    .getElementById("next-scene")
    .addEventListener("click", () => goTo(current + 1, { historyEntry: true }));
  document.addEventListener("keydown", (event) => {
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.target.closest(
        'input,select,textarea,button,audio,video,[contenteditable="true"],[role="slider"]',
      )
    )
      return;
    if (
      !horizontal ||
      !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
    )
      return;
    event.preventDefault();
    goTo(
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? scenes.length - 1
          : current + (event.key === "ArrowRight" ? 1 : -1),
      { focus: true, historyEntry: true },
    );
  });
  // Native vertical wheel/trackpad/keyboard scrolling is never intercepted.
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", scheduleLayout, { passive: true });
  window.addEventListener("hashchange", followHash);
  window.addEventListener("popstate", followHash);
  window.addEventListener("languagechange", () => {
    activate(current);
    scheduleLayout();
  });
  window.addEventListener("contentresize", scheduleLayout);
  reduceMotion.addEventListener("change", scheduleLayout);
  wide.addEventListener("change", scheduleLayout);
  window.addEventListener("load", () => {
    setLayout();
    followHash();
  });
  document.fonts?.ready.then(() => {
    setLayout();
    followHash();
  });
  window.SceneNavigation = {
    goTo,
    get current() {
      return current;
    },
    get horizontal() {
      return horizontal;
    },
    get progress() {
      return progress;
    },
  };
  setLayout();
})();
