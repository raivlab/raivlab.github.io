# RAIV Lab Website

Static GitHub Pages site for Robotics and AI Vision Lab at Kumoh National Institute of Technology.

## Pages

- `index.html`
- `people.html`
- `projects.html` - shown as the Research page in navigation
- `publications.html`
- `album.html`
- `news.html`
- `contact.html`
- `join.html`
- `calendar.html` - internal page linked from the faculty calendar icon

## Editing Content

Editable lab content lives in `data/site.js`:

- institution, lab, navigation, and page titles
- recruiting status and messages
- research cards, links, images, and YouTube URLs
- people
- publications
- news
- albums
- Join page Korean/English copy
- contact information and map URL

The HTML files provide page structure. The renderer files in `scripts/` read `data/site.js` and fill repeated content into elements marked with `data-render`.

Project cards support `links`, optional `imageSrc`, and optional `youtubeHref` fields. Add a real YouTube URL to `youtubeHref` and the Research page will show an inline player preview plus a YouTube icon link.

## Code Structure

- `data/site.js` - single source of editable site content
- `scripts/core.js` - shared DOM helpers
- `scripts/media.js` - YouTube URL, thumbnail, and embed helpers
- `scripts/render-global.js` - header, page titles, home hero, shared headings
- `scripts/render-projects.js` - Research cards and video playback
- `scripts/render-people.js` - faculty and student cards
- `scripts/render-publications.js` - publication list and year filters
- `scripts/render-news.js` - home/news timelines
- `scripts/render-pages.js` - albums, calendar, recruiting, Join, Contact
- `scripts/main.js` - renderer bootstrap and navigation behavior
- `styles.css` - CSS import manifest
- `styles/` - split CSS by foundation, home, components, pages, and responsive rules
- `tests/site-structure.test.js` - structural regression checks for content, renderers, and layout selectors

`script.js` remains as a thin compatibility loader for older cached pages. New pages load the split files directly.

## Logo Assets

Logo source assets are normalized into:

- `assets/logo-wordmark.png`
- `assets/logo-lockup-wide.png`
- `assets/logo-symbol.png`
- `assets/logo-lockup-square.png`

The original Korean-named folders can be kept as source files. The `assets/` filenames are ASCII so GitHub Pages paths stay simple.

## Local Preview

Run a local server from this folder:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8000/
```

Opening `index.html` directly can work for this no-build site, but the local server matches GitHub Pages behavior more closely.

## Verification

Use the bundled Node runtime or any local Node install:

```powershell
node --check data\site.js
node --check scripts\core.js
node --check scripts\media.js
node --check scripts\render-global.js
node --check scripts\render-projects.js
node --check scripts\render-people.js
node --check scripts\render-publications.js
node --check scripts\render-news.js
node --check scripts\render-pages.js
node --check scripts\main.js
node --check script.js
node tests\site-structure.test.js
```

## Deployment

Commit these files to a GitHub repository named like `username.github.io` or enable GitHub Pages for this folder. Keep `.nojekyll` in the root so GitHub Pages serves the static files directly.
