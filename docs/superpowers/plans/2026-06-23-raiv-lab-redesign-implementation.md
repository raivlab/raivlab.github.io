# RAIV Lab Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the RAIV Lab site as a multi-page, official university research lab website with strong RAIV logo identity and project-oriented robotics content.

**Architecture:** Keep a no-build GitHub Pages site with plain HTML, CSS, and JavaScript. Each page is a separate HTML file, while repeated content is rendered from `data/site.js` by `script.js`. Visual styling and responsive behavior live in `styles.css`.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, GitHub Pages, local Python HTTP server for preview.

---

## File Structure

- Modify: `index.html` - Home page with institutional bar, hero, recruiting, latest news, featured projects, research-area preview.
- Modify: `research.html` - Research theme page.
- Modify: `projects.html` - Project showcase page.
- Modify: `people.html` - Faculty and researcher page.
- Modify: `publications.html` - Dense publication page with year filters.
- Modify: `news.html` - Full news archive page.
- Rename/Replace: `contact.html` to `join.html` - Join/recruiting/contact page.
- Modify: `data/site.js` - Central editable content model.
- Modify: `script.js` - Common renderers and page navigation behavior.
- Modify: `styles.css` - Full visual redesign.
- Modify: `README.md` - Update page list and editing notes.
- Create/Copy: `assets/logo-wordmark.png` from the transparent 1467 x 123 logo source.
- Create/Copy: `assets/logo-lockup-wide.png` from the transparent 1759 x 552 logo source.
- Create/Copy: `assets/logo-symbol.png` from the transparent 605 x 554 symbol source.
- Create/Copy: `assets/logo-lockup-square.png` from the transparent 605 x 554 square lockup source.
- Keep: `.nojekyll`.

The workspace is currently not a git repository, so commit steps are replaced with explicit file-state checks.

---

### Task 1: Normalize Logo Assets

**Files:**
- Create: `assets/logo-wordmark.png`
- Create: `assets/logo-lockup-wide.png`
- Create: `assets/logo-symbol.png`
- Create: `assets/logo-lockup-square.png`
- Modify: `assets/favicon.svg`

- [ ] **Step 1: Copy logo files into ASCII asset paths**

Run:

```powershell
Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force -Path assets | Out-Null
$pngs = Get-ChildItem -Recurse -File -Filter *.png | Where-Object { $_.FullName -notmatch '\\assets\\' } | ForEach-Object {
  $img=[System.Drawing.Image]::FromFile($_.FullName)
  $item=[pscustomobject]@{Path=$_.FullName; Width=$img.Width; Height=$img.Height; Bytes=$_.Length}
  $img.Dispose()
  $item
}
Copy-Item -LiteralPath (($pngs | Where-Object { $_.Width -eq 1467 -and $_.Height -eq 123 } | Sort-Object Bytes | Select-Object -First 1).Path) -Destination 'assets\logo-wordmark.png' -Force
Copy-Item -LiteralPath (($pngs | Where-Object { $_.Width -eq 1759 -and $_.Height -eq 552 } | Sort-Object Bytes | Select-Object -First 1).Path) -Destination 'assets\logo-lockup-wide.png' -Force
Copy-Item -LiteralPath (($pngs | Where-Object { $_.Width -eq 605 -and $_.Height -eq 554 -and $_.Bytes -eq 17269 } | Select-Object -First 1).Path) -Destination 'assets\logo-symbol.png' -Force
Copy-Item -LiteralPath (($pngs | Where-Object { $_.Width -eq 605 -and $_.Height -eq 554 -and $_.Bytes -eq 19594 } | Select-Object -First 1).Path) -Destination 'assets\logo-lockup-square.png' -Force
```

Expected: four files exist under `assets/`.

- [ ] **Step 2: Verify logo dimensions**

Run:

```powershell
Add-Type -AssemblyName System.Drawing
Get-ChildItem assets -File -Include *.png | ForEach-Object {
  $img=[System.Drawing.Image]::FromFile($_.FullName)
  [pscustomobject]@{Name=$_.Name; Width=$img.Width; Height=$img.Height; Bytes=$_.Length}
  $img.Dispose()
} | Format-Table -AutoSize
```

Expected:

```text
logo-wordmark.png      1467 x 123
logo-lockup-wide.png   1759 x 552
logo-symbol.png         605 x 554
logo-lockup-square.png  605 x 554
```

- [ ] **Step 3: Replace favicon with logo-colored SVG**

Modify `assets/favicon.svg` to keep the current deep navy / teal palette:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#08284a"/>
  <path d="M18 46V18h16c7 0 12 4 12 10 0 4-2 7-6 9l8 9H36l-7-8h-2v8H18Zm9-16h7c3 0 5-1 5-3s-2-3-5-3h-7v6Z" fill="#2faaa3"/>
</svg>
```

- [ ] **Step 4: Check file state**

Run:

```powershell
Get-ChildItem assets -File | Select-Object Name,Length | Sort-Object Name
```

Expected: the four logo PNG files and `favicon.svg` are present.

---

### Task 2: Update Content Model

**Files:**
- Modify: `data/site.js`

- [ ] **Step 1: Add Join and recruiting data**

Update `window.raivData` to include these top-level fields:

```js
institution: {
  university: "Kumoh National Institute of Technology",
  school: "School of Electronic Engineering",
},

recruiting: {
  title: "Open Positions",
  summary: "RAIV Lab is recruiting motivated undergraduate and graduate students interested in robot vision and embodied intelligence.",
  bullets: [
    "Undergraduate researchers and graduate students are welcome.",
    "Research interests include robot vision, embodied AI, calibration, reconstruction, and manipulation.",
    "Applicants should email a brief personal statement and CV.",
  ],
  ctaLabel: "Join RAIV Lab",
  ctaHref: "join.html",
},
```

- [ ] **Step 2: Keep existing data groups intact**

Keep these existing keys available:

```js
facts: [...],
links: [...],
themes: [...],
projects: [...],
faculty: {...},
people: [...],
publications: [...],
news: [...],
contact: {...},
```

Expected: existing renderers continue to have all data they need.

- [ ] **Step 3: Add optional video-ready project fields**

For each project object, ensure the shape supports future video/project links:

```js
{
  venue: "ICCV 2025",
  title: "TRAN-D: Transparent Object Depth Reconstruction",
  summary: "Sparse-view transparent object reconstruction with 2D Gaussian Splatting and physics simulation.",
  href: "https://arxiv.org/pdf/2507.11069",
  linkLabel: "Paper",
  links: [
    { label: "Paper", href: "https://arxiv.org/pdf/2507.11069" },
    { label: "GitHub", href: "https://github.com/jeongyun0609/TRAN-D" }
  ]
}
```

Expected: old `href` and `linkLabel` remain for backward compatibility; new `links` can power richer project cards.

- [ ] **Step 4: Run JavaScript syntax check**

Run:

```powershell
C:\Users\jeon\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check data\site.js
```

Expected: no output and exit code `0`.

---

### Task 3: Rebuild Common HTML Shell

**Files:**
- Modify: `index.html`
- Modify: `research.html`
- Modify: `projects.html`
- Modify: `people.html`
- Modify: `publications.html`
- Modify: `news.html`
- Create: `join.html`
- Delete: `contact.html`

- [ ] **Step 1: Use the shared header on every page**

Every page should include this header structure:

```html
<header class="site-header" data-header>
  <div class="institution-bar">
    <a href="https://eng.kumoh.ac.kr/eng/index.do?sso=ok" target="_blank" rel="noreferrer">Kumoh National Institute of Technology</a>
    <span>School of Electronic Engineering</span>
  </div>
  <div class="nav-shell">
    <a class="brand" href="index.html" aria-label="RAIV Lab home">
      <img src="assets/logo-wordmark.png" alt="Robotics and AI Vision Lab" />
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      <span></span>
      <span></span>
      <span></span>
      <span class="sr-only">Menu</span>
    </button>
    <nav id="site-nav" class="site-nav" aria-label="Primary navigation">
      <a href="index.html" data-nav="home">Home</a>
      <a href="research.html" data-nav="research">Research</a>
      <a href="projects.html" data-nav="projects">Projects</a>
      <a href="people.html" data-nav="people">People</a>
      <a href="publications.html" data-nav="publications">Publications</a>
      <a href="news.html" data-nav="news">News</a>
      <a href="join.html" data-nav="join">Join</a>
    </nav>
  </div>
</header>
```

Expected: no page links to `contact.html`.

- [ ] **Step 2: Rebuild `index.html` Home content**

Home should contain these sections in order:

```html
<main>
  <section class="home-hero" aria-labelledby="hero-title">...</section>
  <section class="section home-recruiting" data-render="recruiting"></section>
  <section class="section section-muted">
    <div class="section-inner split">
      <div>Latest News heading and all-news link</div>
      <ol class="timeline" data-render="news" data-limit="3"></ol>
    </div>
  </section>
  <section class="section">
    <div class="section-inner">
      <div class="section-heading spread">Featured Projects heading and all-projects link</div>
      <div class="project-grid project-grid-preview" data-render="projects" data-limit="3"></div>
    </div>
  </section>
  <section class="section section-muted">
    <div class="section-inner">
      <div class="section-heading">Research Areas heading</div>
      <div class="theme-grid" data-render="themes"></div>
    </div>
  </section>
</main>
```

Expected: Home does not render full People or Publications.

- [ ] **Step 3: Convert Contact to Join**

Create `join.html` with:

```html
<body class="subpage" data-page="join">
...
<section class="page-hero join-hero">
  <div class="section-inner page-hero-grid">
    <div>
      <p class="eyebrow">Join RAIV Lab</p>
      <h1>Prospective students are welcome.</h1>
      <p>We are looking for motivated undergraduate and graduate students interested in robot vision, embodied AI, calibration, reconstruction, and manipulation.</p>
    </div>
    <img class="page-hero-logo" src="assets/logo-lockup-square.png" alt="RAIV logo" />
  </div>
</section>
<section class="section contact-section">
  <div class="section-inner contact-layout">
    <div data-render="recruiting-detail"></div>
    <aside class="contact-panel" aria-label="Contact information" data-render="contact"></aside>
  </div>
</section>
...
</body>
```

Expected: Join is both recruiting and contact.

- [ ] **Step 4: Delete old contact page**

Run:

```powershell
Remove-Item -LiteralPath contact.html
```

Expected: `contact.html` no longer exists and no HTML file links to it.

- [ ] **Step 5: Check page references**

Run:

```powershell
rg "contact\.html|href=\"#|data-nav=\" -g "*.html"
```

Expected: no `contact.html`; all `data-nav` values match page names.

---

### Task 4: Update Common Renderers

**Files:**
- Modify: `script.js`

- [ ] **Step 1: Add safe target helpers**

Ensure `script.js` contains:

```js
const renderEach = (selector, callback) => {
  document.querySelectorAll(selector).forEach((target) => callback(target));
};
```

Expected: renderers can safely skip pages without a target.

- [ ] **Step 2: Add recruiting renderers**

Add:

```js
const renderRecruiting = () => {
  renderEach('[data-render="recruiting"]', (target) => {
    const panel = make("div", "section-inner recruiting-panel");
    const copy = make("div");
    copy.append(make("p", "eyebrow", "Recruiting"), make("h2", null, data.recruiting.title), make("p", null, data.recruiting.summary));
    panel.append(copy, link(data.recruiting.ctaLabel, data.recruiting.ctaHref, "button button-primary"));
    target.append(panel);
  });
};

const renderRecruitingDetail = () => {
  renderEach('[data-render="recruiting-detail"]', (target) => {
    target.append(make("p", "eyebrow", "Open Positions"), make("h2", null, data.recruiting.title), make("p", null, data.recruiting.summary));
    const list = make("ul", "clean-list");
    data.recruiting.bullets.forEach((item) => list.append(make("li", null, item)));
    target.append(list);
  });
};
```

Expected: Home recruiting panel and Join detail render from the same data.

- [ ] **Step 3: Update project renderer to support multiple links**

Inside `renderProjects`, append a `.project-links` container:

```js
const links = make("div", "project-links");
(project.links || [{ label: project.linkLabel, href: project.href }]).forEach((item) => {
  links.append(link(item.label, item.href));
});
card.append(body, links);
```

Expected: cards can show Paper, Project, GitHub, or YouTube links.

- [ ] **Step 4: Update active nav and mobile nav**

Keep:

```js
const page = document.body.dataset.page;
document.querySelectorAll("[data-nav]").forEach((item) => {
  const active = item.dataset.nav === page;
  item.classList.toggle("active", active);
  if (active) item.setAttribute("aria-current", "page");
});
```

Expected: `Join` nav becomes active on `join.html`.

- [ ] **Step 5: Call new renderers**

At the bottom of `script.js`, call:

```js
renderRecruiting();
renderRecruitingDetail();
```

before `initNavigation()`.

- [ ] **Step 6: Run JavaScript syntax check**

Run:

```powershell
C:\Users\jeon\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check script.js
```

Expected: no output and exit code `0`.

---

### Task 5: Full Visual Redesign CSS

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Set logo-derived design tokens**

Use these variables:

```css
:root {
  --ink: #08284a;
  --ink-soft: #42576a;
  --paper: #f7f9fb;
  --surface: #ffffff;
  --surface-2: #eef4f6;
  --line: #d9e4e8;
  --teal: #2faaa3;
  --teal-dark: #147c78;
  --navy: #061b36;
  --gold: #d6a74f;
  --shadow: 0 18px 48px rgba(8, 40, 74, 0.12);
  --max: 1180px;
}
```

Expected: colors match the RAIV logo palette.

- [ ] **Step 2: Style institutional header**

Implement:

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(18px);
}

.institution-bar {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 7px clamp(18px, 4vw, 52px);
  background: var(--navy);
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.78rem;
}

.nav-shell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 14px clamp(18px, 4vw, 52px);
}

.brand img {
  width: auto;
  height: 38px;
}
```

Expected: site reads as a university lab before anything else.

- [ ] **Step 3: Style Home hero**

Implement:

```css
.home-hero {
  display: grid;
  min-height: 560px;
  align-items: center;
  background: linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.88) 52%, rgba(238,244,246,0.72) 100%);
}

.home-hero .section-inner {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(320px, 0.9fr);
  gap: clamp(36px, 6vw, 82px);
  align-items: center;
}

.hero-logo-panel {
  padding: 28px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: var(--shadow);
}
```

Expected: Home hero is bright, official, and logo-aware, not a full dark startup hero.

- [ ] **Step 4: Style recruiting and cards**

Implement:

```css
.recruiting-panel,
.theme-card,
.project-card,
.person-card,
.faculty-panel,
.publication-item,
.contact-panel {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
}

.recruiting-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
  padding: 28px;
  box-shadow: var(--shadow);
}
```

Expected: cards feel academic and clean, not decorative.

- [ ] **Step 5: Keep responsive font sizing stable**

Use fixed `rem` sizes with breakpoint overrides only:

```css
h1 { font-size: 4.8rem; line-height: 0.95; }
h2 { font-size: 2.8rem; line-height: 1.02; }

@media (max-width: 680px) {
  h1 { font-size: 3.1rem; }
  h2 { font-size: 2rem; }
}
```

Expected: no `font-size: clamp(...)` and no `vw` font sizing.

- [ ] **Step 6: Run CSS checks**

Run:

```powershell
rg "font-size: clamp|font-size: .*vw|gradient orb|bokeh" styles.css
```

Expected: no matches.

---

### Task 6: Update README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update page list**

Ensure README lists:

```markdown
- `index.html`
- `research.html`
- `projects.html`
- `people.html`
- `publications.html`
- `news.html`
- `join.html`
```

- [ ] **Step 2: Update editable assets section**

Ensure README says:

```markdown
Logo source assets are normalized into:

- `assets/logo-wordmark.png`
- `assets/logo-lockup-wide.png`
- `assets/logo-symbol.png`
- `assets/logo-lockup-square.png`
```

- [ ] **Step 3: Check stale contact references**

Run:

```powershell
rg "contact.html|Contact page" README.md
```

Expected: no matches.

---

### Task 7: Verify Site

**Files:**
- All HTML/CSS/JS files.

- [ ] **Step 1: Start local server**

Run:

```powershell
C:\Users\jeon\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m http.server 8000 --bind 127.0.0.1
```

Expected:

```text
Serving HTTP on 127.0.0.1 port 8000
```

- [ ] **Step 2: Verify pages manually or with browser automation**

Open each URL:

```text
http://127.0.0.1:8000/index.html
http://127.0.0.1:8000/research.html
http://127.0.0.1:8000/projects.html
http://127.0.0.1:8000/people.html
http://127.0.0.1:8000/publications.html
http://127.0.0.1:8000/news.html
http://127.0.0.1:8000/join.html
```

Expected: every page loads with the correct active nav item and no empty rendered content.

- [ ] **Step 3: Verify publications filter**

On `publications.html`, click `2024`.

Expected: only 2024 publication cards remain visible.

- [ ] **Step 4: Verify mobile menu**

Use a mobile viewport around `390 x 844`, click the menu button.

Expected: nav opens, all seven links are visible, and no meaningful horizontal overflow appears.

- [ ] **Step 5: Verify no stale files**

Run:

```powershell
Test-Path contact.html
rg "contact\.html|href=\"#|font-size: clamp|font-size: .*vw" -g "*.html" -g "*.css" -g "*.js"
```

Expected:

```text
False
```

and no stale matches except intentional hash-free local anchors if any are added later.

- [ ] **Step 6: Stop local server**

If running on port 8000:

```powershell
$conn = Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue
if ($conn) { $conn | Select-Object -ExpandProperty OwningProcess | Sort-Object -Unique | ForEach-Object { Stop-Process -Id $_ -Force } }
```

Expected: no `LISTENING` process remains on port 8000.

---

## Self-Review

- Spec coverage: tasks cover structure, logo usage, Home design, page designs, data model, static GitHub Pages constraints, and verification criteria.
- Placeholder scan: no unfinished placeholder markers are used.
- Type consistency: data keys referenced by renderer tasks match `data.site.js` planned keys: `institution`, `recruiting`, `facts`, `links`, `themes`, `projects`, `faculty`, `people`, `publications`, `news`, and `contact`.
- Scope: the plan covers one coherent redesign pass and does not include unrelated deployment automation.
