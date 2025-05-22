
function updateAdaptiveLinks(lang) {
    const amazonBase = {
        'pt-BR': 'https://amazon.com.br',
        'en': 'https://amazon.com',
        'es': 'https://amazon.es'
    };

    const localeParam = {
        'pt-BR': 'pt_BR',
        'en': 'en_US',
        'es': 'es_ES'
    };

    document.getElementById('linkedin-link').href = `https://linkedin.com/in/joão-gabriel-corrêa-da-silva?locale=${localeParam[lang]}`;
    document.getElementById('amazon-link').href = `${amazonBase[lang]}/stores/author/B0F221J937`;
}

const translations = {
    'pt-BR': {
        subtitle: 'Da engenharia à criatividade: dados viram decisões, tecnologia vira impacto',
        about: 'Sobre mim',
        links: 'Links Principais',
        book: 'O Que Os Dados Não Dizem: E Por que Você Precisa Aprender A Contar',
        bookDescription: '<b>Os dados não falam por si — eles precisam de um tradutor. E esse tradutor é você.</b><br><i>O que os Dados Não Dizem</i> é um guia moderno e direto ao ponto sobre como transformar análises em decisões, dashboards em narrativas e relatórios em impacto real.<br>Escrito para profissionais que vivem cercados por números — mas sabem que números sozinhos não convencem ninguém — este livro reúne técnicas de storytelling, estrutura narrativa, visualização de dados e persuasão para quem quer influenciar com inteligência.<br>Com uma linguagem acessível e exemplos inspirados no mundo real, você vai aprender a:<ul><li>Construir narrativas com dados que engajam e convencem</li><li>Adaptar sua mensagem para públicos estratégicos</li><li>Utilizar técnicas visuais e templates prontos para o dia a dia</li><li>Medir o impacto da sua comunicação com dados</li><li>Desenvolver uma cultura de storytelling no seu time ou empresa</li></ul>Se você já sabe analisar, agora é hora de aprender a comunicar com poder.<br>Este livro é o ponto de virada para transformar você de analista em protagonista da decisão',
        podcast: 'Últimos Episódios do Podcast',
        github: 'Projetos no GitHub',
        bio: 'Sou engenheiro com experiência em análise de custos e performance industrial, atuando como Analista de Custos & Performance na ArcelorMittal. Passei por empresas como AtBrainTools (Consultor) e Grupo Voitto (Gerente de TI). Sou formado em Engenharia de Produção e pós-graduado em Engenharia de Processos e Projetos. Acredito no aprendizado contínuo, com certificações em áreas como Análise Financeira, Estratégia Digital e Lean Six Sigma. Participo de projetos de inovação, como o SimPI — software para apuração de custos industriais — e tenho habilidades em IA, React, Power BI e mais. Também atuo como voluntário em causas sociais. Busco aplicar meus conhecimentos em projetos desafiadores e estou aberto a conexões e parcerias. Vamos conversar!',
        quote1: 'Apaixonado por resolver problemas com dados, tecnologia e propósito',
        quote2: 'Onde a curiosidade encontra os dados — e nascem ideias transformadoras.',
        linkLabels: [
            'LinkedIn',
            'Podcast',
            'Instagram',
            'TikTok',
            'Amazon',
            'YouTube',
            'GitHub'
        ],
        linkIcons: [
            'work',
            'mic',
            'photo_camera',
            'music_note',
            'shopping_bag',
            'smart_display',
            'code'
        ]
    },
    'en': {
        "subtitle": "From engineering to creativity: turning data into decisions, and technology into impact",
        "about": "About Me",
        "links": "Main Links",
        "book": "What Data Don't Tell You: And Why You Need to Learn to Count",
        "bookDescription": "<b>Data doesn't speak for itself — it needs a translator. And that translator is you.</b><br><i>What Data Doesn't Say</i> is a modern, straight-to-the-point guide on how to turn analysis into decisions, dashboards into narratives, and reports into real impact.<br>Written for professionals surrounded by numbers — but who know that numbers alone don’t convince anyone — this book brings together storytelling techniques, narrative structure, data visualization, and persuasion strategies for those who want to influence with intelligence.<br>With accessible language and real-world examples, you’ll learn how to:<ul><li>Build data-driven narratives that engage and persuade</li><li>Adapt your message for strategic audiences</li><li>Use visual techniques and ready-to-use templates for your daily work</li><li>Measure the impact of your data communication</li><li>Foster a storytelling culture within your team or organization</li></ul>If you already know how to analyze, now it’s time to learn how to communicate with power.<br>This book is your turning point to go from analyst to decision-maker.",
        "podcast": "Latest Podcast Episodes",
        "github": "Projects on GitHub",
        "bio": "I am an engineer with experience in cost analysis and industrial performance, currently working as a Cost & Performance Analyst at ArcelorMittal. I have worked at companies such as AtBrainTools (Consultant) and Grupo Voitto (IT Manager). I hold a degree in Production Engineering and a postgraduate degree in Process and Project Engineering. I believe in continuous learning, with certifications in areas such as Financial Analysis, Digital Strategy, and Lean Six Sigma. I participate in innovation projects, such as SimPI — software for industrial cost calculation — and I have skills in AI, React, Power BI, and more. I also volunteer for social causes. I aim to apply my knowledge to challenging projects and am open to new connections and collaborations. Let’s talk!",
        "quote1": "Passionate about solving problems with data, technology, and purpose",
        "quote2": "Where curiosity meets data — and transformative ideas are born.",
        "linkLabels": [
            "LinkedIn",
            "Podcast",
            "Instagram",
            "TikTok",
            "Amazon",
            "YouTube",
            "GitHub"
        ],
        "linkIcons": [
            "work",
            "mic",
            "photo_camera",
            "music_note",
            "shopping_bag",
            "smart_display",
            "code"
        ]
    },
    'es': {
        "subtitle": "De la ingeniería a la creatividad: convirtiendo datos en decisiones y tecnología en impacto",
        "about": "Sobre mí",
        "links": "Enlaces Principales",
        "book": "Lo que los dados no te dicen: y por qué necesitas aprender a contar",
        "bookDescription": "<b>Los datos no hablan por sí solos — necesitan un traductor. Y ese traductor eres tú.</b><br><i>Lo Que los Datos No Dicen</i> es una guía moderna y directa sobre cómo transformar análisis en decisiones, dashboards en narrativas y reportes en impacto real.<br>Escrito para profesionales rodeados de números — pero que saben que los números por sí solos no convencen a nadie — este libro reúne técnicas de storytelling, estructura narrativa, visualización de datos y persuasión para quienes quieren influir con inteligencia.<br>Con un lenguaje accesible y ejemplos inspirados en la vida real, aprenderás a:<ul>  <li>Construir narrativas con datos que enganchen y persuadan</li>  <li>Adaptar tu mensaje a audiencias estratégicas</li>  <li>Utilizar técnicas visuales y plantillas listas para el día a día</li>  <li>Medir el impacto de tu comunicación con datos</li>  <li>Fomentar una cultura de storytelling en tu equipo o empresa</li></ul>Si ya sabes analizar, ahora es momento de aprender a comunicar con poder.<br>Este libro es el punto de inflexión para transformarte de analista en protagonista de la decisión.",
        "podcast": "Últimos Episodios del Podcast",
        "github": "Proyectos en GitHub",
        "bio": "Soy ingeniero con experiencia en análisis de costos y desempeño industrial, actualmente actúo como Analista de Costos y Desempeño en ArcelorMittal. He trabajado en empresas como AtBrainTools (Consultor) y Grupo Voitto (Gerente de TI). Me gradué en Ingeniería de Producción y tengo una especialización en Ingeniería de Procesos y Proyectos. Creo en el aprendizaje continuo, con certificaciones en áreas como Análisis Financiero, Estrategia Digital y Lean Six Sigma. Participo en proyectos de innovación, como SimPI — software para el cálculo de costos industriales — y tengo habilidades en IA, React, Power BI y más. También soy voluntario en causas sociales. Busco aplicar mis conocimientos en proyectos desafiantes y estoy abierto a nuevas conexiones y colaboraciones. ¡Hablemos!",
        "quote1": "Apasionado por resolver problemas con datos, tecnología y propósito",
        "quote2": "Donde la curiosidad se encuentra con los datos — y nacen ideas transformadoras.",
        "linkLabels": [
            "LinkedIn",
            "Podcast",
            "Instagram",
            "TikTok",
            "Amazon",
            "YouTube",
            "GitHub"
        ],
        "linkIcons": [
            "work",
            "mic",
            "photo_camera",
            "music_note",
            "shopping_bag",
            "smart_display",
            "code"
        ]
    }
};

function setLanguage(lang) {
    const t = translations[lang] || translations['pt-BR'];
    document.getElementById('subtitle').innerText = t.subtitle;
    document.getElementById('title-about').innerText = t.about;
    document.getElementById('title-book').innerText = t.book;
    document.getElementById('title-book-description').innerHTML = t.bookDescription;
    document.getElementById('title-podcast').innerText = t.podcast;
    document.getElementById('title-github').innerText = t.github;
    document.getElementById('bio-text').innerText = t.bio;
    document.getElementById('quote1-text').innerHTML = `<span class="quote-content">${t.quote1}</span>`;
    document.getElementById('quote2-text').innerHTML = `<span class="quote-content">${t.quote2}</span>`;

    const linkEls = document.querySelectorAll('header .links a');
    linkEls.forEach((el, idx) => {
        el.innerHTML = `<span class="material-symbols-outlined">${t.linkIcons[idx]}</span> ${t.linkLabels[idx]}`;
    });
    updateAdaptiveLinks(lang);

    const i18ns = Array(...document.querySelectorAll('[i18n]'));
    for (const i18n of i18ns) {
        try {
            const data = JSON.parse( i18n.getAttribute('i18n') );
            i18n.innerText = data[lang] ?? data['pt-BR']
        } catch (error) {
            
        }
    }
}

async function loadGitHubProjects() {
    const username = "jgabriel2302";
    const url = `https://api.github.com/users/${username}/repos?sort=updated`;

    try {
        const response = await fetch(url);
        const repos = await response.json();
        const container = document.getElementById("github-projects");
        container.innerHTML = "";

        repos.filter(repo=>repo.name!=="website").slice(0, 6).forEach(repo => {
            const project = document.createElement("div");
            project.style.marginBottom = "1.5rem";
            project.innerHTML = `
                <h3 style="margin-bottom: 0.3rem;">
                    <a href="${repo.html_url}" target="_blank" style="text-decoration: none; color: #0073e6;">
                    ${repo.name}
                    </a>
                </h3>
                <p style="margin: 0.3rem 0;">${repo.description || "Sem descrição."}</p>
                <p style="font-size: 0.8rem; color: #555;">
                    ${repo.language ? `🛠 ${repo.language}` : ""} · ⭐ ${repo.stargazers_count}
                </p>
                `;
            container.appendChild(project);
        });
    } catch (err) {
        document.getElementById("github-projects").innerHTML =
            "<p>Erro ao carregar projetos do GitHub.</p>";
        console.error(err);
    }
}

async function loadPodcast() {
    const feedUrl = encodeURIComponent("https://anchor.fm/s/10464ff3c/podcast/rss");
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const container = document.getElementById("podcast-carousel");
        container.innerHTML = "";

        if (data.items && data.items.length > 0) {
            const episodes = data.items.slice(0, 5);
            episodes.forEach(item => {
                const card = document.createElement("div");
                card.className = "podcast-card";
                card.innerHTML = `
                    <span class="play-button paused"></span>
                    <h3>${item.title}</h3>
                    <audio>
                        <source src="${item.enclosure.link}" type="${item.enclosure.type}">
                        Seu navegador não suporta áudio embutido.
                    </audio>
                    <a href="${item.link}" target="_blank" i18n="{'pt-BR':'Ouvir Completo', 'en': 'Listen to Full Episode', 'es': 'Escuchar completo'}">Ouvir Completo</a>
                    <div class="player"><div class="player-progress"></div></div>
                `;
                card.style.backgroundImage = `url(${item.enclosure.image})`

                const audio = card.querySelector('audio');
                const playBtn = card.querySelector('.play-button');
                const player = card.querySelector('.player');
                const progress = card.querySelector('.player-progress');

                audio.addEventListener('timeupdate', e => {
                    progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
                    if (playBtn.classList.contains('paused') && !audio.paused) playBtn.classList.remove('paused');
                });

                player.addEventListener('click', e => {
                    const rect = player.getBoundingClientRect();
                    const p = (e.pageX - rect.x) / rect.width;
                    audio.currentTime = p * audio.duration;
                });

                playBtn.addEventListener('click', e => {
                    if (audio.paused) {
                        audio.play();
                        playBtn.classList.remove('paused');
                    } else {
                        audio.pause();
                        playBtn.classList.add('paused');
                    }
                });

                container.appendChild(card);
            });
        } else {
            container.innerHTML = "<p>Nenhum episódio encontrado.</p>";
        }
    } catch (error) {
        console.error("Erro ao carregar o podcast:", error);
        document.getElementById("podcast-carousel").innerHTML = "<p>Erro ao carregar episódios.</p>";
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const lang = (navigator.language || 'pt-BR').substring(0, 2);
    const supported = ['pt', 'en', 'es'];
    const selectedLang = supported.includes(lang) ? lang === 'pt' ? 'pt-BR' : lang : 'pt-BR';
    document.getElementById('language-select').value = selectedLang;
    setLanguage(selectedLang);

    loadPodcast();
    loadGitHubProjects();
});

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const parallax = header.querySelector('#parallax');
    const subtitle = header.querySelector('#subtitle');
    const minH = 10, maxH = 30, triggerY = 200;
    if (window.scrollY > triggerY) {
        header.style.height = `${minH}vh`
        header.classList.add('shrink');
        subtitle.style.display = 'none';
    } else {
        header.classList.remove('shrink');
        header.style.height = `${maxH}vh`
        subtitle.style.display = 'block';
    }
    header.style.height = `${(1 - Math.max(0, Math.min(1, window.scrollY / triggerY))) * maxH + minH}vh`;
    parallax.style.top = `-${Math.max(0, Math.min(1, window.scrollY / triggerY)) * 100 + 10}px`;
    parallax.style.opacity = `${1 - Math.max(0, Math.min(1, window.scrollY / triggerY))}`;
    subtitle.style.opacity = `${1 - Math.max(0, Math.min(1, window.scrollY / triggerY))}`;

    const quotes = Array(...document.querySelectorAll('.quote:not(.readed)'));
    for (const quote of quotes) {
        const rq = quote.getBoundingClientRect();
        if (rq.y < (window.scrollY - window.innerHeight / 2)) quote.classList.add('readed');
    }

});
