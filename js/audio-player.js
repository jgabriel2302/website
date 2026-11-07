"use strict";
(() => {
  const players = new Set();
  const formatTime = (seconds) => {
    const n = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
    return n >= 3600
      ? `${Math.floor(n / 3600)}:${String(Math.floor(n / 60) % 60).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`
      : `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}`;
  };
  const seek = (audio, value) => {
    if (
      !Number.isFinite(audio.duration) ||
      audio.duration <= 0 ||
      !Number.isFinite(value)
    )
      return;
    audio.currentTime = Math.max(0, Math.min(audio.duration, value));
  };
  function node(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }
  function create(item, t) {
    const root = node("div", "audio-player");
    root.setAttribute("role", "group");
    const audio = node("audio");
    audio.preload = "none";
    audio.src = item.audio;
    audio.dataset.title = item.title;
    audio.hidden = true;
    const controls = node("div", "audio-controls");
    const button = (name, content) => {
      const b = node("button", name, content);
      b.type = "button";
      controls.append(b);
      return b;
    };
    const play = button("audio-play", "▶");
    const back = button("audio-skip", "−15");
    const forward = button("audio-skip", "+15");
    const speed = button("audio-speed", "1×");
    const mute = button("audio-mute", "♪");
    const timeline = node("div", "audio-timeline");
    const current = node("span", "audio-time", "0:00");
    const range = node("input", "audio-seek");
    range.type = "range";
    range.min = "0";
    range.max = "100";
    range.step = "0.1";
    range.value = "0";
    range.disabled = true;
    const duration = node("span", "audio-time", "—:—");
    timeline.append(current, range, duration);
    const status = node("p", "audio-status");
    status.setAttribute("role", "status");
    root.append(audio, controls, timeline, status);
    let waiting = false,
      failed = false,
      pending = false,
      request = 0,
      timer;
    function label(button, text) {
      button.setAttribute("aria-label", text);
      button.title = text;
    }
    function sync() {
      root.setAttribute("aria-label", item.title);
      const playing = pending || !audio.paused;
      label(
        play,
        `${t(failed ? "audioRetry" : playing ? "audioPause" : "audioPlay")}: ${item.title}`,
      );
      play.textContent = playing ? "Ⅱ" : failed ? "↻" : "▶";
      play.setAttribute("aria-pressed", String(playing));
      root.classList.toggle("is-playing", playing);
      root.classList.toggle("is-loading", waiting);
      label(back, t("audioBack"));
      label(forward, t("audioForward"));
      label(speed, `${t("audioSpeed")}: ${audio.playbackRate}×`);
      label(mute, t(audio.muted ? "audioUnmute" : "audioMute"));
      mute.setAttribute("aria-pressed", String(audio.muted));
      mute.textContent = audio.muted ? "♪̸" : "♪";
      range.setAttribute("aria-label", `${t("audioSeek")}: ${item.title}`);
      const valid = Number.isFinite(audio.duration) && audio.duration > 0;
      range.disabled = back.disabled = forward.disabled = !valid;
      range.max = valid ? String(audio.duration) : "100";
      range.value = String(
        valid ? Math.min(audio.currentTime, audio.duration) : 0,
      );
      range.style.setProperty(
        "--played",
        `${valid ? (audio.currentTime / audio.duration) * 100 : 0}%`,
      );
      range.setAttribute(
        "aria-valuetext",
        `${formatTime(audio.currentTime)} / ${valid ? formatTime(audio.duration) : "—:—"}`,
      );
      current.textContent = formatTime(audio.currentTime);
      duration.textContent = valid ? formatTime(audio.duration) : "—:—";
      const message = failed
        ? t("audioError")
        : waiting
          ? t("audioLoading")
          : "";
      if (status.textContent !== message) status.textContent = message;
    }
    function stopWaiting() {
      waiting = pending = false;
      clearTimeout(timer);
    }
    function fail() {
      request++;
      stopWaiting();
      failed = true;
      audio.pause();
      sync();
    }
    function pause() {
      request++;
      stopWaiting();
      audio.pause();
      sync();
    }
    const player = { pause, sync, root };
    players.add(player);
    play.addEventListener("click", async () => {
      if (pending || !audio.paused) {
        pause();
        return;
      }
      for (const other of players) if (other !== player) other.pause();
      const id = ++request;
      if (failed) audio.load();
      failed = false;
      waiting = pending = true;
      timer = setTimeout(fail, 20000);
      sync();
      try {
        await audio.play();
        if (id !== request) return;
        stopWaiting();
        sync();
      } catch (error) {
        if (id !== request) return;
        if (error.name === "AbortError") {
          stopWaiting();
          sync();
        } else fail();
      }
    });
    back.addEventListener("click", () => {
      seek(audio, audio.currentTime - 15);
      sync();
    });
    forward.addEventListener("click", () => {
      seek(audio, audio.currentTime + 15);
      sync();
    });
    range.addEventListener("input", () => {
      seek(audio, Number(range.value));
      sync();
    });
    mute.addEventListener("click", () => {
      audio.muted = !audio.muted;
      sync();
    });
    speed.addEventListener("click", () => {
      const rates = [1, 1.25, 1.5, 2];
      audio.playbackRate =
        rates[(rates.indexOf(audio.playbackRate) + 1) % rates.length];
      speed.textContent = audio.playbackRate + "×";
      sync();
    });
    for (const event of [
      "loadedmetadata",
      "durationchange",
      "timeupdate",
      "volumechange",
      "ratechange",
      "seeked",
    ])
      audio.addEventListener(event, sync);
    audio.addEventListener("play", () => {
      for (const other of players) if (other !== player) other.pause();
      sync();
    });
    audio.addEventListener("playing", () => {
      stopWaiting();
      failed = false;
      sync();
    });
    audio.addEventListener("waiting", () => {
      waiting = true;
      clearTimeout(timer);
      timer = setTimeout(fail, 20000);
      sync();
    });
    for (const event of ["pause", "ended"])
      audio.addEventListener(event, () => {
        stopWaiting();
        sync();
      });
    audio.addEventListener("error", fail);
    sync();
    return root;
  }
  window.addEventListener("languagechange", () =>
    players.forEach((p) => p.sync()),
  );
  window.addEventListener("pagehide", () => players.forEach((p) => p.pause()));
  window.ImmersiveAudio = {
    create,
    formatTime,
    seek,
    pauseAll: () => players.forEach((p) => p.pause()),
  };
})();
