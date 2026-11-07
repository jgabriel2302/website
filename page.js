"use strict";

// UI strings are trusted, local copy. Feed content is always inserted as text.
const translations = {
  "pt-BR": {
    skip: "Ir para o conteúdo",
    navigation: "Navegação principal",
    home: "Início",
    books: "Livros",
    about: "Sobre",
    projects: "Laboratório",
    connect: "Conectar",
    language: "Idioma",
    heroEyebrow: "IA · INTELIGÊNCIA FINANCEIRA · INDÚSTRIA",
    heroStatement: "Dados viram decisões.<br>Tecnologia vira impacto.",
    heroDescription:
      "Conecto inteligência artificial, inteligência financeira e transformação digital em ambientes industriais. Compartilho essa visão em livros, ensino e experiências interativas.",
    discoverBooks: "Conheça os livros",
    myStory: "Minha trajetória",
    heroFootnote: "Curiosidade em movimento.",
    artCaption: "Além dos números.<br>Dentro das histórias.",
    booksEyebrow: "IDEIAS NO PAPEL",
    booksCount: "Duas perspectivas. Um universo de dados.",
    chooseBook: "Escolha um livro",
    storyTab: "Storytelling",
    analysisTab: "Análise de dados",
    learn: "O QUE VOCÊ VAI EXPLORAR",
    editionLanguage: "Idioma do livro",
    amazon: "Ver na Amazon",
    editionPT: "Edição em português",
    editionEN: "Edição em inglês",
    editionES:
      "Edição em inglês · livro não disponível em espanhol neste catálogo",
    aboutEyebrow: "POR TRÁS DOS DADOS",
    aboutHeading:
      'Entre a indústria,<br>as finanças e a IA<span class="yellow">.</span>',
    bio: "Sou João Gabriel, engenheiro, autor e profissional de dados e inteligência artificial. Minha atuação conecta performance industrial, inteligência financeira e transformação digital, traduzindo problemas de negócio em soluções com dados.",
    bioSecond:
      "Aqui compartilho estudos e experimentos públicos, além das ideias que desenvolvo em livros e no podcast Bytes Estratégicos.",
    quote:
      "“Apaixonado por resolver problemas com dados, tecnologia e propósito.”",
    expertiseData: "Inteligência financeira",
    expertiseAI: "Inteligência artificial",
    portraitAlt: "João Gabriel falando ao microfone",
    podcastEyebrow: "APERTE O PLAY. AMPLIE O OLHAR.",
    podcastIntro:
      "Conversas sobre dados, tecnologia e as ideias que movem o mundo dos negócios.",
    allEpisodes: "Todos os episódios",
    podcastLanguage: "Conteúdo original em português.",
    loadingPodcast: "Carregando episódios…",
    listen: "Ouvir episódio",
    episode: "Episódio",
    audioLabel: "Reproduzir episódio",
    projectsEyebrow: "EXPLORE. EXPERIMENTE. ENTENDA.",
    projectsHeading:
      'Ideias que você<br>pode testar<span class="yellow">.</span>',
    projectsIntro:
      "Oito experiências abertas para explorar algoritmos, decisões e criatividade. Use os exemplos públicos ou dados sintéticos.",
    allProjects: "Explorar o GitHub",
    loadingProjects: "Carregando projetos…",
    noDescription: "Explore o código e a documentação deste projeto.",
    stars: "estrelas",
    connectEyebrow: "A PRÓXIMA IDEIA COMEÇA COM UMA CONVERSA",
    connectHeading: 'Vamos criar<br>conexões<span class="yellow">?</span>',
    connectIntro:
      "Aberto a convites para palestras, workshops corporativos e participações acadêmicas. Vamos conversar sobre o tema, o público e o formato.",
    linkedin: "Convidar para uma conversa",
    rights: "Todos os direitos reservados.",
    backTop: "Voltar ao início ↑",
    scenes: "Cenas",
    previous: "Cena anterior",
    next: "Próxima cena",
    scrollHint: "Role para explorar",
    enableMotion: "Ativar movimento",
    disableMotion: "Desativar movimento",
    motionDenied: "Movimento indisponível",
    retry: "Tentar novamente",
    feedError: "Não foi possível atualizar este conteúdo agora.",
    feedEmpty: "Nenhum conteúdo disponível no momento.",
    cached: "Última atualização",
    metaTitle: "IA, inteligência financeira e transformação digital",
    metaDescription:
      "João Gabriel Corrêa da Silva: IA, inteligência financeira e transformação digital na indústria. Livros, podcast, palestras e demonstrações interativas.",
    expertiseIndustry: "Transformação digital",
    publicStudies: "ESTUDOS PUBLICADOS NO LINKEDIN",
    articleSimilarity: "Similaridade textual na prática",
    articleNeural: "Como uma rede neural aprende",
    tryDemo: "Experimentar",
    sourceCode: "Código",
    demoPage: "Página de demonstrações",
    previousDemos: "Experiências anteriores",
    nextDemos: "Próximas experiências",
    closeDemo: "Fechar demonstração",
    openDemo: "Abrir em outra aba",
    loadingDemo: "Carregando a experiência…",
    demoFallback: "A experiência não apareceu? Abra em outra aba.",
    demoLanguage: "Experiência original: ",
    demoEducational:
      "Experimento educacional · use dados públicos ou sintéticos.",
    teachingEyebrow: "PALESTRAS · WORKSHOPS · ENSINO",
    teachingHeading: "Conhecimento<br>em circulação.",
    teachingIntro:
      "Tenho experiência com palestras e workshops corporativos. Levo temas de dados e tecnologia para conversas práticas, conectadas aos desafios de quem aprende.",
    teachingTopics: "TEMAS PARA UMA CONVERSA",
    topicAI: "IA aplicada a negócios e finanças",
    topicData: "Análise e storytelling com dados",
    topicDigital: "Transformação digital na indústria",
    topicML: "Aprendizado de máquina na prática",
    teachingArticle: "Leia meu artigo sobre didática",
    audioPlay: "Reproduzir",
    audioPause: "Pausar",
    audioSeek: "Posição do áudio",
    audioMute: "Silenciar",
    audioUnmute: "Ativar som",
    audioSpeed: "Velocidade de reprodução",
    audioLoading: "Carregando áudio…",
    audioError: "Áudio indisponível. Tente novamente ou abra o episódio.",
    audioRetry: "Tentar reproduzir novamente",
    audioBack: "Voltar 15 segundos",
    audioForward: "Avançar 15 segundos",
  },
  en: {
    skip: "Skip to content",
    navigation: "Main navigation",
    home: "Home",
    books: "Books",
    about: "About",
    projects: "Lab",
    connect: "Connect",
    language: "Language",
    heroEyebrow: "AI · FINANCIAL INTELLIGENCE · INDUSTRY",
    heroStatement: "Turning data into decisions.<br>Technology into impact.",
    heroDescription:
      "I connect artificial intelligence, financial intelligence and digital transformation in industrial environments. I share this perspective through books, teaching and interactive experiences.",
    discoverBooks: "Explore the books",
    myStory: "My story",
    heroFootnote: "Curiosity in motion.",
    artCaption: "Beyond the numbers.<br>Inside the stories.",
    booksEyebrow: "IDEAS ON PAPER",
    booksCount: "Two perspectives. A world of data.",
    chooseBook: "Choose a book",
    storyTab: "Storytelling",
    analysisTab: "Data analysis",
    learn: "WHAT YOU WILL EXPLORE",
    editionLanguage: "Book language",
    amazon: "View on Amazon",
    editionPT: "Portuguese edition",
    editionEN: "English edition",
    editionES: "English edition · no Spanish edition in this catalog",
    aboutEyebrow: "BEHIND THE DATA",
    aboutHeading:
      'Where industry,<br>finance and AI meet<span class="yellow">.</span>',
    bio: "I’m João Gabriel, an engineer, author and data and AI professional. My work connects industrial performance, financial intelligence and digital transformation, turning business problems into data-driven solutions.",
    bioSecond:
      "Here I share public studies and experiments, along with the ideas I explore in books and the Bytes Estratégicos podcast.",
    quote:
      "“Passionate about solving problems with data, technology and purpose.”",
    expertiseData: "Financial intelligence",
    expertiseAI: "Artificial intelligence",
    portraitAlt: "João Gabriel speaking into a microphone",
    podcastEyebrow: "PRESS PLAY. EXPAND YOUR PERSPECTIVE.",
    podcastIntro:
      "Conversations about data, technology and the ideas shaping the business world.",
    allEpisodes: "All episodes",
    podcastLanguage: "Original content in Portuguese.",
    loadingPodcast: "Loading episodes…",
    listen: "Listen to episode",
    episode: "Episode",
    audioLabel: "Play episode",
    projectsEyebrow: "EXPLORE. EXPERIMENT. UNDERSTAND.",
    projectsHeading:
      'Ideas you can<br>try yourself<span class="yellow">.</span>',
    projectsIntro:
      "Eight open experiences exploring algorithms, decisions and creativity. Use the public examples or synthetic data.",
    allProjects: "Explore GitHub",
    loadingProjects: "Loading projects…",
    noDescription: "Explore the code and documentation for this project.",
    stars: "stars",
    connectEyebrow: "THE NEXT IDEA STARTS WITH A CONVERSATION",
    connectHeading: 'Let’s make<br>connections<span class="yellow">.</span>',
    connectIntro:
      "Open to invitations for talks, corporate workshops and academic guest sessions. Let’s discuss the topic, audience and format.",
    linkedin: "Invite me to a conversation",
    rights: "All rights reserved.",
    backTop: "Back to the beginning ↑",
    scenes: "Scenes",
    previous: "Previous scene",
    next: "Next scene",
    scrollHint: "Scroll to explore",
    enableMotion: "Enable motion",
    disableMotion: "Disable motion",
    motionDenied: "Motion unavailable",
    retry: "Try again",
    feedError: "This content could not be updated right now.",
    feedEmpty: "No content available at the moment.",
    cached: "Last updated",
    metaTitle: "AI, financial intelligence and digital transformation",
    metaDescription:
      "João Gabriel Corrêa da Silva: AI, financial intelligence and digital transformation in industry. Books, podcast, talks and interactive demos.",
    expertiseIndustry: "Digital transformation",
    publicStudies: "PUBLISHED STUDIES ON LINKEDIN",
    articleSimilarity: "Text similarity in practice",
    articleNeural: "How a neural network learns",
    tryDemo: "Try it",
    sourceCode: "Code",
    demoPage: "Demo page",
    previousDemos: "Previous experiences",
    nextDemos: "Next experiences",
    closeDemo: "Close demo",
    openDemo: "Open in a new tab",
    loadingDemo: "Loading the experience…",
    demoFallback: "Experience not showing? Open it in a new tab.",
    demoLanguage: "Original experience: ",
    demoEducational: "Educational experiment · use public or synthetic data.",
    teachingEyebrow: "TALKS · WORKSHOPS · TEACHING",
    teachingHeading: "Knowledge<br>in circulation.",
    teachingIntro:
      "I have experience delivering corporate talks and workshops. I bring data and technology into practical conversations, connected to the challenges learners face.",
    teachingTopics: "TOPICS TO EXPLORE TOGETHER",
    topicAI: "AI for business and finance",
    topicData: "Data analysis and storytelling",
    topicDigital: "Digital transformation in industry",
    topicML: "Machine learning in practice",
    teachingArticle: "Read my article on teaching",
    audioPlay: "Play",
    audioPause: "Pause",
    audioSeek: "Audio position",
    audioMute: "Mute",
    audioUnmute: "Unmute",
    audioSpeed: "Playback speed",
    audioLoading: "Loading audio…",
    audioError: "Audio unavailable. Try again or open the episode.",
    audioRetry: "Try playing again",
    audioBack: "Back 15 seconds",
    audioForward: "Forward 15 seconds",
  },
  es: {
    skip: "Ir al contenido",
    navigation: "Navegación principal",
    home: "Inicio",
    books: "Libros",
    about: "Sobre mí",
    projects: "Laboratorio",
    connect: "Conectar",
    language: "Idioma",
    heroEyebrow: "IA · INTELIGENCIA FINANCIERA · INDUSTRIA",
    heroStatement:
      "Datos que se vuelven decisiones.<br>Tecnología que genera impacto.",
    heroDescription:
      "Conecto inteligencia artificial, inteligencia financiera y transformación digital en entornos industriales. Comparto esta visión en libros, enseñanza y experiencias interactivas.",
    discoverBooks: "Descubre los libros",
    myStory: "Mi trayectoria",
    heroFootnote: "Curiosidad en movimiento.",
    artCaption: "Más allá de los números.<br>Dentro de las historias.",
    booksEyebrow: "IDEAS EN PAPEL",
    booksCount: "Dos perspectivas. Un universo de datos.",
    chooseBook: "Elige un libro",
    storyTab: "Storytelling",
    analysisTab: "Análisis de datos",
    learn: "LO QUE VAS A EXPLORAR",
    editionLanguage: "Idioma del libro",
    amazon: "Ver en Amazon",
    editionPT: "Edición en portugués",
    editionEN: "Edición en inglés",
    editionES: "Edición en inglés · sin edición en español en este catálogo",
    aboutEyebrow: "DETRÁS DE LOS DATOS",
    aboutHeading:
      'Entre la industria,<br>las finanzas y la IA<span class="yellow">.</span>',
    bio: "Soy João Gabriel, ingeniero, autor y profesional de datos e inteligencia artificial. Mi trabajo conecta el desempeño industrial, la inteligencia financiera y la transformación digital, convirtiendo problemas de negocio en soluciones con datos.",
    bioSecond:
      "Aquí comparto estudios y experimentos públicos, además de las ideas que exploro en libros y en el podcast Bytes Estratégicos.",
    quote:
      "«Apasionado por resolver problemas con datos, tecnología y propósito».",
    expertiseData: "Inteligencia financiera",
    expertiseAI: "Inteligencia artificial",
    portraitAlt: "João Gabriel hablando por un micrófono",
    podcastEyebrow: "DALE AL PLAY. AMPLÍA TU MIRADA.",
    podcastIntro:
      "Conversaciones sobre datos, tecnología y las ideas que mueven el mundo de los negocios.",
    allEpisodes: "Todos los episodios",
    podcastLanguage: "Contenido original en portugués.",
    loadingPodcast: "Cargando episodios…",
    listen: "Escuchar episodio",
    episode: "Episodio",
    audioLabel: "Reproducir episodio",
    projectsEyebrow: "EXPLORA. EXPERIMENTA. COMPRENDE.",
    projectsHeading:
      'Ideas que puedes<br>poner a prueba<span class="yellow">.</span>',
    projectsIntro:
      "Ocho experiencias abiertas sobre algoritmos, decisiones y creatividad. Utiliza los ejemplos públicos o datos sintéticos.",
    allProjects: "Explorar GitHub",
    loadingProjects: "Cargando proyectos…",
    noDescription: "Explora el código y la documentación de este proyecto.",
    stars: "estrellas",
    connectEyebrow: "LA PRÓXIMA IDEA EMPIEZA CON UNA CONVERSACIÓN",
    connectHeading: 'Creemos<br>conexiones<span class="yellow">.</span>',
    connectIntro:
      "Abierto a invitaciones para charlas, talleres corporativos y participaciones académicas. Conversemos sobre el tema, el público y el formato.",
    linkedin: "Invitarme a una conversación",
    rights: "Todos los derechos reservados.",
    backTop: "Volver al inicio ↑",
    scenes: "Escenas",
    previous: "Escena anterior",
    next: "Escena siguiente",
    scrollHint: "Desplázate para explorar",
    enableMotion: "Activar movimiento",
    disableMotion: "Desactivar movimiento",
    motionDenied: "Movimiento no disponible",
    retry: "Volver a intentar",
    feedError: "No se pudo actualizar este contenido ahora.",
    feedEmpty: "No hay contenido disponible en este momento.",
    cached: "Última actualización",
    metaTitle: "IA, inteligencia financiera y transformación digital",
    metaDescription:
      "João Gabriel Corrêa da Silva: IA, inteligencia financiera y transformación digital en la industria. Libros, podcast, charlas y demostraciones interactivas.",
    expertiseIndustry: "Transformación digital",
    publicStudies: "ESTUDIOS PUBLICADOS EN LINKEDIN",
    articleSimilarity: "Similitud textual en la práctica",
    articleNeural: "Cómo aprende una red neuronal",
    tryDemo: "Experimentar",
    sourceCode: "Código",
    demoPage: "Página de demostraciones",
    previousDemos: "Experiencias anteriores",
    nextDemos: "Próximas experiencias",
    closeDemo: "Cerrar demostración",
    openDemo: "Abrir en otra pestaña",
    loadingDemo: "Cargando la experiencia…",
    demoFallback: "¿No aparece la experiencia? Ábrela en otra pestaña.",
    demoLanguage: "Experiencia original: ",
    demoEducational:
      "Experimento educativo · utiliza datos públicos o sintéticos.",
    teachingEyebrow: "CHARLAS · TALLERES · ENSEÑANZA",
    teachingHeading: "Conocimiento<br>en circulación.",
    teachingIntro:
      "Tengo experiencia impartiendo charlas y talleres corporativos. Llevo los datos y la tecnología a conversaciones prácticas, conectadas con los desafíos de quienes aprenden.",
    teachingTopics: "TEMAS PARA EXPLORAR JUNTOS",
    topicAI: "IA aplicada a negocios y finanzas",
    topicData: "Análisis y storytelling con datos",
    topicDigital: "Transformación digital en la industria",
    topicML: "Aprendizaje automático en la práctica",
    teachingArticle: "Lee mi artículo sobre didáctica",
    audioPlay: "Reproducir",
    audioPause: "Pausar",
    audioSeek: "Posición del audio",
    audioMute: "Silenciar",
    audioUnmute: "Activar sonido",
    audioSpeed: "Velocidad de reproducción",
    audioLoading: "Cargando audio…",
    audioError: "Audio no disponible. Inténtalo de nuevo o abre el episodio.",
    audioRetry: "Intentar reproducir de nuevo",
    audioBack: "Retroceder 15 segundos",
    audioForward: "Avanzar 15 segundos",
  },
};

const books = {
  story: {
    pt: {
      title: "O que os dados não dizem",
      subtitle: "E por que você precisa aprender a contar",
      cover: "assets/book-story-pt.webp",
      url: "https://www.amazon.com.br/dp/B0F3VKYWFN",
    },
    en: {
      title: "What the data doesn’t tell you",
      subtitle: "And why you need to learn to tell",
      cover: "assets/book-story-en-current.webp",
      url: "https://www.amazon.com.br/dp/B0H1T1PMW9",
    },
    "pt-BR": {
      category: "DADOS · NARRATIVA · INFLUÊNCIA",
      description:
        "Transforme análises em decisões, dashboards em narrativas e relatórios em impacto real. Um guia para comunicar o que os números, sozinhos, não conseguem dizer.",
      learn: [
        "Narrativas que engajam e convencem",
        "Visualização e comunicação com dados",
        "Persuasão para públicos estratégicos",
      ],
    },
    copyEN: {
      category: "DATA · NARRATIVE · INFLUENCE",
      description:
        "Turn analysis into decisions, dashboards into narratives and reports into real impact. A guide to communicating what numbers alone cannot say.",
      learn: [
        "Narratives that engage and persuade",
        "Data visualization and communication",
        "Persuasion for strategic audiences",
      ],
    },
    es: {
      category: "DATOS · NARRATIVA · INFLUENCIA",
      description:
        "Lo que los datos no te dicen: cómo transformar análisis en decisiones, dashboards en narrativas e informes en impacto real. Una guía para comunicar lo que los números, por sí solos, no pueden expresar.",
      learn: [
        "Narrativas que conectan y convencen",
        "Visualización y comunicación con datos",
        "Persuasión para públicos estratégicos",
      ],
    },
  },
  analysis: {
    pt: {
      title: "Análise de dados",
      subtitle: "Trilha de análise de dados voltada à prática",
      cover: "assets/book-analysis-pt.webp",
      url: "https://www.amazon.com.br/dp/B0DZNB1LM8",
    },
    en: {
      title: "Data analysis",
      subtitle: "Practice-oriented data analysis roadmap",
      cover: "assets/book-analysis-en.webp",
      url: "https://www.amazon.com/dp/B0F1DB4QBJ",
    },
    "pt-BR": {
      category: "FUNDAMENTOS · FERRAMENTAS · PRÁTICA",
      description:
        "Uma trilha para conectar fundamentos e aplicação na análise de dados. Explore ferramentas, linguagens e exercícios para transformar informações em conhecimento.",
      learn: [
        "SQL e consultas a bancos de dados",
        "Power Query e Power BI",
        "Python e JavaScript aplicados à análise",
      ],
    },
    copyEN: {
      category: "FOUNDATIONS · TOOLS · PRACTICE",
      description:
        "A roadmap connecting foundations with practical data analysis. Explore tools, languages and exercises to turn information into knowledge.",
      learn: [
        "SQL and database queries",
        "Power Query and Power BI",
        "Python and JavaScript for data analysis",
      ],
    },
    es: {
      category: "FUNDAMENTOS · HERRAMIENTAS · PRÁCTICA",
      description:
        "Un recorrido que conecta fundamentos y aplicación en el análisis de datos. Explora herramientas, lenguajes y ejercicios para transformar información en conocimiento.",
      learn: [
        "SQL y consultas a bases de datos",
        "Power Query y Power BI",
        "Python y JavaScript aplicados al análisis",
      ],
    },
  },
};
let language = "pt-BR";
let selectedBook = "story";
let selectedEdition = "pt";
const feeds = {
  podcast: { status: "loading", items: [] },
  github: { status: "loading", items: [] },
};
const feedURLs = {
  podcast:
    "https://api.rss2json.com/v1/api.json?rss_url=" +
    encodeURIComponent("https://anchor.fm/s/10464ff3c/podcast/rss"),
  github:
    "https://api.github.com/users/jgabriel2302/repos?sort=updated&per_page=100",
};
const profileURLs = {
  podcast: "https://creators.spotify.com/pod/profile/bytes-estrat-joao-gabriel",
  github: "https://github.com/jgabriel2302?tab=repositories",
};
const t = (key) => translations[language][key];
function normalizeLanguage(value) {
  const prefix = String(value || "")
    .toLowerCase()
    .split(/[-_]/)[0];
  return prefix === "pt"
    ? "pt-BR"
    : ["en", "es"].includes(prefix)
      ? prefix
      : "en";
}
function safeURL(value, hosts) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    if (
      hosts &&
      !hosts.some(
        (host) => url.hostname === host || url.hostname.endsWith("." + host),
      )
    )
      return null;
    return url.href;
  } catch {
    return null;
  }
}
function element(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}
function externalLink(url, className, label) {
  const link = element("a", className, label);
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}
function setLanguage(value, persist = true) {
  language = normalizeLanguage(value);
  document.documentElement.lang = language;
  document.getElementById("language-select").value = language;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const copy = t(el.dataset.i18n);
    if (copy) el.innerHTML = copy;
  });
  document
    .querySelectorAll("[data-i18n-aria]")
    .forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
  document
    .querySelectorAll("[data-i18n-alt]")
    .forEach((el) => (el.alt = t(el.dataset.i18nAlt)));
  document.title = "João Gabriel Corrêa da Silva | " + t("metaTitle");
  for (const selector of [
    'meta[name="description"]',
    'meta[property="og:description"]',
    'meta[name="twitter:description"]',
  ])
    document.querySelector(selector).content = t("metaDescription");
  for (const selector of [
    'meta[property="og:title"]',
    'meta[name="twitter:title"]',
  ])
    document.querySelector(selector).content = document.title;
  document
    .querySelector(".wordmark")
    .setAttribute("aria-label", "João Gabriel — " + t("home"));
  document.querySelector('meta[property="og:locale"]').content = {
    "pt-BR": "pt_BR",
    en: "en_US",
    es: "es_ES",
  }[language];
  document.getElementById("linkedin-link").href =
    "https://www.linkedin.com/in/jo%C3%A3o-gabriel-corr%C3%AAa-da-silva?locale=" +
    { "pt-BR": "pt_BR", en: "en_US", es: "es_ES" }[language];
  // Keep the supplied store and product URLs: changing a domain does not guarantee the same edition exists there.
  selectedEdition = language === "pt-BR" ? "pt" : "en";
  const hero = books.story[selectedEdition];
  window.BookMotion.replace(
    document.getElementById("hero-cover"),
    hero.cover,
    hero.title,
  );
  window.BookMotion.replace(
    document.getElementById("hero-secondary-cover"),
    books.story[selectedEdition === "pt" ? "en" : "pt"].cover,
    "",
  );
  updateBook();
  renderFeed("github");
  renderFeed("podcast");
  if (persist) {
    try {
      localStorage.setItem("website-language", language);
    } catch {
      /* Storage can be disabled. */
    }
    const url = new URL(location.href);
    url.searchParams.set("locale", language);
    history.replaceState(null, "", url);
  }
  window.dispatchEvent(
    new CustomEvent("languagechange", { detail: { language } }),
  );
}
function updateBook() {
  const book = books[selectedBook],
    edition = book[selectedEdition],
    copy = book[language === "en" ? "copyEN" : language];
  document.getElementById("book-title").textContent = edition.title;
  document.getElementById("book-title").append(element("span", "yellow", "."));
  document.getElementById("book-title").lang =
    selectedEdition === "pt" ? "pt-BR" : "en";
  document.getElementById("book-subtitle").textContent = edition.subtitle;
  document.getElementById("book-subtitle").lang =
    selectedEdition === "pt" ? "pt-BR" : "en";
  document.getElementById("book-category").textContent = copy.category;
  document.getElementById("book-description").textContent = copy.description;
  const image = document.getElementById("book-cover-img");
  window.BookMotion.replace(image, edition.cover, edition.title);
  document.getElementById("book-link").href = edition.url;
  document.getElementById("edition-note").textContent = t(
    selectedEdition === "pt"
      ? "editionPT"
      : language === "es"
        ? "editionES"
        : "editionEN",
  );
  document
    .getElementById("book-learnings")
    .replaceChildren(...copy.learn.map((text) => element("li", null, text)));
  document
    .querySelectorAll("[data-book]")
    .forEach((btn) =>
      btn.setAttribute(
        "aria-pressed",
        String(btn.dataset.book === selectedBook),
      ),
    );
  document
    .querySelectorAll("[data-edition]")
    .forEach((btn) =>
      btn.setAttribute(
        "aria-pressed",
        String(btn.dataset.edition === selectedEdition),
      ),
    );
  window.dispatchEvent(
    new CustomEvent("bookchange", {
      detail: {
        cover: edition.cover,
        book: selectedBook,
        edition: selectedEdition,
      },
    }),
  );
  window.dispatchEvent(new Event("contentresize"));
}
function formatDate(value) {
  if (!value) return "";
  const normalized = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)
    ? value.replace(" ", "T") + "Z"
    : value;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString(language, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}
function renderFeed(kind) {
  if (kind === "github") {
    window.Portfolio?.render(feeds.github);
    return;
  }
  const container = document.getElementById(
    kind === "podcast" ? "podcast-carousel" : "github-projects",
  );
  const feed = feeds[kind];
  // Preserve custom player playback and keyboard focus when only UI language changes.
  if (
    kind === "podcast" &&
    feed.status === "ready" &&
    container.dataset.rendered === "ready"
  ) {
    container
      .querySelectorAll(".episode-link")
      .forEach((a) => (a.textContent = t("listen") + " ↗"));
    container
      .querySelectorAll("audio")
      .forEach((a) =>
        a.setAttribute("aria-label", t("audioLabel") + ": " + a.dataset.title),
      );
    container
      .querySelectorAll(".episode-date")
      .forEach((el) => (el.textContent = formatDate(el.dataset.date)));
    const notice = container.querySelector(".cached-notice");
    if (notice)
      notice.textContent = t("cached") + ": " + formatDate(feed.updatedAt);
    return;
  }
  container.replaceChildren();
  container.setAttribute("aria-busy", String(feed.status === "loading"));
  container.dataset.rendered = feed.status;
  if (feed.status !== "ready") {
    const state = element("div", "feed-state");
    state.setAttribute("role", "status");
    state.append(
      element(
        "p",
        null,
        t(
          feed.status === "loading"
            ? kind === "podcast"
              ? "loadingPodcast"
              : "loadingProjects"
            : feed.status === "empty"
              ? "feedEmpty"
              : "feedError",
        ),
      ),
    );
    if (feed.status !== "loading") {
      state.append(
        externalLink(
          profileURLs[kind],
          "text-link",
          t(kind === "podcast" ? "allEpisodes" : "allProjects") + " ↗",
        ),
      );
      const retry = element("button", "retry-button", t("retry"));
      retry.type = "button";
      retry.addEventListener("click", () => loadFeed(kind));
      state.append(retry);
    }
    container.append(state);
    return;
  }
  for (const [index, item] of feed.items.entries()) {
    const card = element("article", "podcast-card"),
      top = element("div", "episode-top");
    if (item.image) {
      const img = element("img");
      img.src = item.image;
      img.alt = "";
      img.loading = "lazy";
      img.width = 68;
      img.height = 68;
      img.addEventListener("error", () => img.remove(), { once: true });
      top.append(img);
    }
    top.append(
      element(
        "span",
        "episode-number",
        String(index + 1).padStart(2, "0") + " / BYTES",
      ),
    );
    const title = element("h3", null, item.title);
    card.append(top, title);
    const date = element("p", "episode-date", formatDate(item.date));
    date.dataset.date = item.date;
    card.append(date);
    if (item.audio) {
      card.append(window.ImmersiveAudio.create(item, t));
    }
    card.append(externalLink(item.url, "episode-link", t("listen") + " ↗"));
    container.append(card);
  }
  if (feed.updatedAt) {
    const notice = element(
      "p",
      "feed-caption cached-notice",
      t("cached") + ": " + formatDate(feed.updatedAt),
    );
    notice.style.gridColumn = "1 / -1";
    container.append(notice);
  }
  window.dispatchEvent(new Event("contentresize"));
}
function normalizeFeed(kind, data) {
  if (kind === "github") {
    if (!Array.isArray(data)) throw new Error("Invalid GitHub response");
    return data
      .filter(
        (repo) =>
          repo &&
          !repo.fork &&
          !repo.archived &&
          repo.name !== "website" &&
          !repo.private &&
          safeURL(repo.html_url, ["github.com"]),
      )
      .slice(0, 100)
      .map((repo) => ({
        name: String(repo.name || ""),
        description: String(repo.description || ""),
        language: String(repo.language || ""),
        stars: Number.isFinite(repo.stargazers_count)
          ? Math.max(0, repo.stargazers_count)
          : 0,
        url: safeURL(repo.html_url, ["github.com"]),
      }));
  }
  if (data.status !== "ok" || !Array.isArray(data.items))
    throw new Error("Invalid podcast response");
  return data.items
    .filter((item) => item && safeURL(item.link))
    .slice(0, 3)
    .map((item) => ({
      title: String(item.title || "Bytes Estratégicos"),
      date: String(item.pubDate || ""),
      url: safeURL(item.link),
      audio: safeURL(item.enclosure?.link),
      image: safeURL(
        item.thumbnail || item.enclosure?.image || data.feed?.image,
      ),
    }));
}
async function fetchJSON(url) {
  const controller = new AbortController(),
    timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      credentials: "omit",
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}
async function loadFeed(kind) {
  if (feeds[kind].pending) return;
  feeds[kind] = { status: "loading", items: [], pending: true };
  renderFeed(kind);
  try {
    const data = await fetchJSON(feedURLs[kind]);
    const items = normalizeFeed(kind, data);
    feeds[kind] = { status: items.length ? "ready" : "empty", items };
  } catch {
    try {
      const snapshot = await fetchJSON("data/" + kind + ".json");
      const items = normalizeFeed(kind, snapshot.data);
      feeds[kind] = {
        status: items.length ? "ready" : "empty",
        items,
        updatedAt: snapshot.updatedAt,
      };
    } catch {
      feeds[kind] = { status: "error", items: [] };
    }
  }
  renderFeed(kind);
}
function loadGitHubProjects() {
  return loadFeed("github");
}
function loadPodcast() {
  return loadFeed("podcast");
}
window.addEventListener("DOMContentLoaded", () => {
  const params = new URL(location.href).searchParams;
  let saved;
  try {
    saved = localStorage.getItem("website-language");
  } catch {
    /* Private browsing. */
  }
  setLanguage(
    params.get("locale") || saved || navigator.language || "pt-BR",
    false,
  );
  document.getElementById("year").textContent = String(
    new Date().getFullYear(),
  );
  document
    .getElementById("language-select")
    .addEventListener("change", (event) => setLanguage(event.target.value));
  document.querySelectorAll("[data-book]").forEach((button) =>
    button.addEventListener("click", () => {
      selectedBook = button.dataset.book;
      updateBook();
    }),
  );
  document.querySelectorAll("[data-edition]").forEach((button) =>
    button.addEventListener("click", () => {
      selectedEdition = button.dataset.edition;
      updateBook();
    }),
  );
  loadPodcast();
  loadGitHubProjects();
});
window.Website = {
  translations,
  books,
  normalizeLanguage,
  safeURL,
  normalizeFeed,
  setLanguage,
  get language() {
    return language;
  },
  get bookCover() {
    return books[selectedBook][selectedEdition].cover;
  },
  get heroCover() {
    return books.story[language === "pt-BR" ? "pt" : "en"].cover;
  },
};
