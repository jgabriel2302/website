# João Gabriel Corrêa da Silva — Be The Change

Official personal website: books, biography, Bytes Estratégicos, GitHub projects and social links. Static HTML, CSS and JavaScript, served directly by GitHub Pages. **No build, package install, API key or backend is required.**

## Experience

- Neutral black, yellow `#ffc002`, locally hosted Poppins and six scenes.
- On wide, fine-pointer screens (at least 1100 × 760), native vertical scrolling moves a horizontal track. Navigation links, URL fragments, previous/next buttons, arrow keys and history all address the same sections.
- Mobile, touch devices, shorter screens, oversized content and reduced-motion preferences use a normal vertical document. Browser zoom can trigger the same readable fallback.
- Local Three.js 0.169.0 adds textured books with covers, a spine and pages, a hexagon network and chart bars. The scene follows scroll progress, responds to the pointer, pauses in hidden tabs, and uses a capped pixel ratio and frame rate. Mobile orientation is opt-in on supported secure devices.
- CSS book covers remain available when WebGL is unavailable, initialization fails, a texture fails or the context is lost. Reduced motion skips Three.js initialization entirely.
- PT/EN/ES UI strings, persistent language choice and `?locale=pt-BR`, `?locale=en`, `?locale=es` links. Book edition is a separate choice. Spanish UI explicitly identifies the English edition; no Spanish book edition is implied.
- Podcast uses native accessible audio controls, no preloading or autoplay, and only one player at a time. GitHub cards include language and star count.
- The existing RSS2JSON and public GitHub endpoints refresh content. Timeouts, empty responses and API errors are handled. Real dated snapshots in `data/` provide a fallback; the snapshot date is displayed when used. External feed text is never injected as HTML, and links are validated before use.

## Files

| File                  | Responsibility                                                            |
| --------------------- | ------------------------------------------------------------------------- |
| `index.html`          | Semantic content, six scenes, metadata and no-JavaScript links            |
| `style.css`           | Responsive layout, typography and CSS book fallback                       |
| `page.js`             | i18n, book catalog, social links and feed loading/rendering               |
| `js/scroll.js`        | Scene navigation, anchors, keyboard, focus and layout fallback            |
| `js/scene3d.js`       | Optional Three.js background and lifecycle                                |
| `js/vendor/`          | Pinned Three.js module and its MIT license                                |
| `assets/`             | Local WOFF fonts, WebP images, favicon, Open Graph image and font license |
| `data/`               | Public feed snapshots captured on 7 November 2026                         |
| `tests/site.test.cjs` | Dependency-free Node regression checks                                    |

Original root images remain available to preserve existing external URLs. The site itself uses optimized local assets. The `CNAME` and existing GitHub Pages hosting configuration are preserved.

## Book catalog

| Book                           | Edition   | Supplied destination                    |
| ------------------------------ | --------- | --------------------------------------- |
| O que os dados não dizem       | Português | https://www.amazon.com.br/dp/B0F3VKYWFN |
| What the data doesn’t tell you | English   | https://www.amazon.com.br/dp/B0H1T1PMW9 |
| Análise de dados               | Português | https://www.amazon.com.br/dp/B0DZNB1LM8 |
| Data analysis                  | English   | https://www.amazon.com/dp/B0F1DB4QBJ    |

The current English storytelling cover comes from the supplied ASIN and is marked “Extended Edition.” Its title/subtitle follow that cover. Existing PT artwork comes from this repository. The other supplied ASIN covers were retrieved from Amazon’s public image service; the downloadable versions are 500 px high. Replace the matching WebP files with higher-resolution publisher artwork when available. No prices or availability claims are hardcoded.

An email link is intentionally absent: no public contact email was supplied or found in the original site. LinkedIn is the primary contact. Add a verified public address to the contact section when available.

## Local preview and checks

Serve the repository over HTTP (ES modules cannot load from `file://`):

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/?locale=pt-BR`. Test optional locale and fragment links such as `?locale=en#book`. Asset paths are relative, so GitHub Pages project subpaths are also supported.

```sh
node --check page.js
node --check js/scroll.js
node --check js/scene3d.js
node --test tests/site.test.cjs
```

The GitHub Actions check runs these commands on pull requests and pushes to `main`.

## Preview

![Homepage with CSS book fallback](docs/screenshots/home-20261107.jpg)

## Verification and limitations

Automated checks cover locale variants, complete translated UI labels, the four ASIN mappings, asset paths, unsafe URL rejection, external text handling, malformed API responses, bundled snapshots and third-party licenses. Browser QA covers desktop navigation, edition switching, mobile/tablet layouts and CSS fallback without WebGL.

The cloud QA browser disables WebGL. The actual GPU rendering, hardware frame rate and phone gyroscope therefore require a WebGL-enabled browser/device check; CSS fallback was directly observed. No Lighthouse score or real-device performance result is claimed. External audio playback also depends on the podcast hosting service and browser codec support.

## Rights

Site content and original artwork © João Gabriel Corrêa da Silva. All rights reserved. Copying, modification, redistribution or commercial use requires the author’s permission. Third-party dependencies retain their included licenses: Three.js (MIT), Poppins (SIL OFL).
