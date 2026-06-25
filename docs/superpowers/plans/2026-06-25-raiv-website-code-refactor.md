# RAIV Website Code Refactor Plan

## Goal

Keep the current visual design and content behavior intact while making the static GitHub Pages code easier to edit and verify.

## Constraints

- No build step.
- Must keep working from direct HTML preview, localhost preview, and GitHub Pages.
- All page content remains editable from `data/site.js`.
- Avoid changing user-facing copy or layout during the refactor unless required to fix broken references.

## Current Baseline

- `data/site.js` syntax check passes.
- `script.js` syntax check passes.
- `tests/site-structure.test.js` passes after replacing stale research fallback expectations with existing brand assets.

## Steps

1. Split `script.js` into classic browser scripts under `scripts/`.
   - `core.js`: shared data, DOM, link, rich text helpers.
   - `render-global.js`: header, titles, home hero, shared section headings.
   - `media.js`: YouTube parsing, thumbnails, embeds.
   - `render-projects.js`: research cards and inline video playback.
   - `render-people.js`: faculty and student cards.
   - `render-publications.js`: publication filters and lists.
   - `render-news.js`: home/news timelines.
   - `render-pages.js`: albums, calendar, recruiting, join, contact.
   - `main.js`: bootstraps all renderers and navigation behavior.

2. Update every HTML page to load the new scripts in dependency order after `data/site.js`.

3. Update tests so they read all `scripts/*.js` files in page load order.

4. Split `styles.css` by role after JS is stable.
   - Tokens/base/layout/components/page-specific/responsive.

5. Refresh `README.md` so future edits point to the right files.

6. Verify after each major step.
   - Node syntax checks.
   - Site structure tests.
   - Browser smoke test on the running local site.
