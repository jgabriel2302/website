"use strict";
(() => {
  // Curated public experiments. These describe the public demos, not company deployments.
  const catalog = [
    {
      repo: "data2music",
      path: "",
      language: "PT",
      category: "DATA × MUSIC",
      title: ["Data to Music", "Data to Music", "Data to Music"],
      copy: [
        "Transforme séries temporais em melodias. Explore o conjunto público de filmes ou um CSV sintético.",
        "Turn time series into melodies. Explore the public movie dataset or a synthetic CSV.",
        "Transforma series temporales en melodías. Explora el conjunto público de películas o un CSV sintético.",
      ],
    },
    {
      repo: "aco-a-star",
      path: "",
      language: "PT",
      category: "ACO / A*",
      title: [
        "Rotas & possibilidades",
        "Routes & possibilities",
        "Rutas y posibilidades",
      ],
      copy: [
        "Explore caminhos em um ambiente simulado com colônia de formigas e busca A*.",
        "Explore paths in a simulated environment with ant colony optimization and A* search.",
        "Explora rutas en un entorno simulado con colonia de hormigas y búsqueda A*.",
      ],
    },
    {
      repo: "decision-tree-for-projects",
      path: "",
      language: "PT",
      category: "DECISION TREE",
      title: [
        "Decisões em árvore",
        "Decisions in a tree",
        "Decisiones en árbol",
      ],
      copy: [
        "Explore a classificação de projetos estratégicos com exemplos gerados e visualize a árvore de decisão.",
        "Explore strategic project classification with generated examples and inspect the decision tree.",
        "Explora la clasificación de proyectos estratégicos con ejemplos generados y visualiza el árbol de decisión.",
      ],
    },
    {
      repo: "risk-means-nn",
      path: "",
      language: "PT",
      category: "K-MEANS / KNN",
      title: [
        "Risco em perspectiva",
        "Risk in perspective",
        "Riesgo en perspectiva",
      ],
      copy: [
        "Veja agrupamentos e classificação de riscos com probabilidades e impactos simulados.",
        "Explore risk clustering and classification with simulated probabilities and impacts.",
        "Explora agrupaciones y clasificación de riesgos con probabilidades e impactos simulados.",
      ],
    },
    {
      repo: "previsao-ebitda",
      path: "exemple/",
      language: "PT",
      category: "FINANCE × ML",
      title: [
        "Previsão de EBITDA",
        "EBITDA forecasting",
        "Previsión de EBITDA",
      ],
      copy: [
        "Experimente uma rede neural com dados públicos da Petrobras (2019–2024). Um estudo educacional de previsão.",
        "Try a neural network with public Petrobras data (2019–2024). An educational forecasting study.",
        "Prueba una red neuronal con datos públicos de Petrobras (2019–2024). Un estudio educativo de predicción.",
      ],
    },
    {
      repo: "machine-Inside-out",
      path: "exemple/",
      language: "EN",
      category: "NEURAL NETWORK",
      title: ["Machine Inside Out", "Machine Inside Out", "Machine Inside Out"],
      copy: [
        "Desenhe um dígito e veja a resposta de uma rede neural implementada em JavaScript.",
        "Draw a digit and inspect the response of a neural network implemented in JavaScript.",
        "Dibuja un dígito y observa la respuesta de una red neuronal implementada en JavaScript.",
      ],
    },
    {
      repo: "simply-similar",
      path: "exemple/",
      language: "PT / EN",
      category: "TEXT × NLP",
      title: ["Simply Similar", "Simply Similar", "Simply Similar"],
      copy: [
        "Edite os textos de exemplo e execute o CountVectorizer para explorar similaridade textual.",
        "Edit the sample texts and run CountVectorizer to explore text similarity.",
        "Edita los textos de ejemplo y ejecuta CountVectorizer para explorar la similitud textual.",
      ],
    },
    {
      repo: "carro-autonomo",
      path: "",
      language: "PT",
      category: "NEURAL NETWORK",
      title: ["Carro autônomo", "Self-driving car", "Coche autónomo"],
      copy: [
        "Inicie uma simulação de direção e explore sensores, tráfego e uma rede neural em ação.",
        "Start a driving simulation and explore sensors, traffic and a neural network in action.",
        "Inicia una simulación de conducción y explora sensores, tráfico y una red neuronal en acción.",
      ],
    },
  ];
  let page = 0,
    feed,
    opener = null,
    timeout,
    savedScroll = 0;
  const t = (key) => window.Website.translations[window.Website.language][key];
  const locale = () => ({ "pt-BR": 0, en: 1, es: 2 })[window.Website.language];
  const node = (tag, cls, text) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  function link(href, cls, text) {
    const a = node("a", cls, text);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }
  const demoURL = (item, language = window.Website.language) =>
    `https://jgabriel2302.github.io/${item.repo}/${item.path}${item.repo === "simply-similar" && language !== "pt-BR" ? "en/" : ""}`;
  function render(nextFeed) {
    if (nextFeed) feed = nextFeed;
    const container = document.getElementById("github-projects");
    if (!container) return;
    const focused = document.activeElement?.dataset.demo;
    container.replaceChildren();
    container.setAttribute("aria-busy", "false");
    for (const [offset, item] of catalog
      .slice(page * 4, page * 4 + 4)
      .entries()) {
      const index = page * 4 + offset;
      const card = node("article", "project-card demo-card");
      const heading = node("div", "demo-card-heading");
      heading.append(
        node("span", "demo-index", String(index + 1).padStart(2, "0")),
        node("span", "micro-label", item.category),
      );
      card.append(
        heading,
        node("h3", null, item.title[locale()]),
        node("p", null, item.copy[locale()]),
      );
      const actions = node("div", "demo-card-actions");
      const button = node("button", "text-link", t("tryDemo") + " →");
      button.type = "button";
      button.dataset.demo = item.repo;
      button.setAttribute(
        "aria-label",
        `${t("tryDemo")}: ${item.title[locale()]}`,
      );
      button.addEventListener("click", () => open(item, button));
      actions.append(
        button,
        link(
          `https://github.com/jgabriel2302/${item.repo}`,
          "demo-code",
          t("sourceCode") + " ↗",
        ),
      );
      const repo = feed?.items?.find((r) => r.name === item.repo);
      if (repo) {
        const stars = node("span", "demo-stars", "☆ " + repo.stars);
        stars.setAttribute("aria-label", `${repo.stars} ${t("stars")}`);
        actions.append(stars);
      }
      card.append(actions);
      container.append(card);
      if (focused === item.repo) button.focus({ preventScroll: true });
    }
    document.getElementById("demos-count").textContent =
      `${String(page * 4 + 1).padStart(2, "0")} — ${String(page * 4 + 4).padStart(2, "0")} / 08`;
    document.getElementById("demos-previous").disabled = page === 0;
    document.getElementById("demos-next").disabled = page === 1;
    const status = document.getElementById("catalog-status");
    status.textContent = feed?.updatedAt
      ? `${t("cached")}: ${new Date(feed.updatedAt).toLocaleDateString(window.Website.language)}`
      : "";
    window.dispatchEvent(new Event("contentresize"));
  }
  function open(item, button) {
    const dialog = document.getElementById("demo-dialog");
    savedScroll = scrollY;
    opener = button;
    window.ImmersiveAudio.pauseAll();
    document.getElementById("demo-title").textContent = item.title[locale()];
    document.getElementById("demo-category").textContent = item.category;
    document.getElementById("demo-note").textContent =
      `${t("demoLanguage")}${item.language}. ${t("demoEducational")}`;
    const url = demoURL(item);
    document.getElementById("demo-external").href = url;
    document.getElementById("demo-fallback").href = url;
    const wrap = document.getElementById("demo-frame-wrap");
    const loading = document.getElementById("demo-loading");
    loading.hidden = false;
    const iframe = node("iframe");
    iframe.title = item.title[locale()];
    iframe.setAttribute(
      "sandbox",
      "allow-scripts allow-same-origin allow-forms allow-downloads allow-popups allow-popups-to-escape-sandbox",
    );
    iframe.setAttribute(
      "allow",
      "autoplay 'none'; camera 'none'; microphone 'none'; geolocation 'none'",
    );
    iframe.referrerPolicy = "no-referrer";
    iframe.src = url;
    iframe.addEventListener(
      "load",
      () => {
        loading.hidden = true;
        clearTimeout(timeout);
      },
      { once: true },
    );
    wrap.append(iframe);
    timeout = setTimeout(() => {
      loading.hidden = true;
    }, 12000);
    document.documentElement.classList.add("demo-open");
    dialog.showModal();
    window.dispatchEvent(
      new CustomEvent("demotoggle", { detail: { open: true } }),
    );
  }
  function changePage(value) {
    page = Math.max(0, Math.min(1, value));
    render();
    const grid = document.getElementById("github-projects");
    grid.querySelector("button")?.focus({ preventScroll: true });
    if (!window.SceneNavigation?.horizontal)
      grid.scrollIntoView({
        block: "start",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("demos-previous").addEventListener("click", () => {
      changePage(page - 1);
    });
    document.getElementById("demos-next").addEventListener("click", () => {
      changePage(page + 1);
    });
    const dialog = document.getElementById("demo-dialog");
    document
      .getElementById("demo-close")
      .addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => {
      clearTimeout(timeout);
      document.querySelector("#demo-frame-wrap iframe")?.remove(); // Stop audio, animation and CPU work in the experiment.
      document.documentElement.classList.remove("demo-open");
      window.dispatchEvent(
        new CustomEvent("demotoggle", { detail: { open: false } }),
      );
      window.scrollTo({ top: savedScroll, behavior: "instant" });
      opener?.focus({ preventScroll: true });
    });
  });
  window.Portfolio = { catalog, render, demoURL };
})();
