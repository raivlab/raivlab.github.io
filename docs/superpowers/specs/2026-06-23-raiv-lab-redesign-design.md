# RAIV Lab Website Redesign Design

## Goal

Redesign the RAIV Lab website as a polished multi-page academic research lab site for GitHub Pages.
The site should feel like an official university laboratory, not a startup landing page, while still
showing that RAIV is a modern robotics and AI vision lab with concrete demos and project output.

The intended first impression is:

> A credible university robotics lab with strong robot vision projects, clear research direction,
> active recruiting, and a memorable RAIV visual identity.

## References

The redesign blends useful traits from four reference sites:

- APRL: official research-lab structure, recruiting block, news, research videos, broad navigation.
- DGIST Interactive Robot Lab: modern typography, simple research-interest cards, clear joining message.
- KNU RoMA Lab: official university tone, mission/open positions/news clarity.
- SPARO Lab: clean navigation, concise hero, GitHub/YouTube visibility, strong lab identity.

RAIV should borrow these traits without becoming too dark, overly promotional, or visually generic.

## Site Structure

Use a multi-page GitHub Pages structure:

- `Home`
- `Research`
- `Projects`
- `People`
- `Publications`
- `News`
- `Join`

`Contact` should be folded into `Join`, because the contact action is primarily about recruiting and
prospective students. Footer contact details can still appear site-wide.

## Home Page

Home should be short and directional, not a one-page site.

Top institutional strip:

- `Kumoh National Institute of Technology`
- `School of Electronic Engineering`

Main header:

- Left: RAIV wordmark logo.
- Right: Home, Research, Projects, People, Publications, News, Join.

Hero:

- H1: `RAIV Lab`
- Subtitle: `Robotics and AI Vision Lab`
- Supporting copy: `Vision-Based Embodied Intelligence for next-generation robots.`
- Primary actions: `Research` and `Join RAIV Lab`.
- Visual treatment: use a real lab, robot, equipment, or project image when available. Until then,
  use a restrained robotics visual. Avoid a purely dark, high-tech startup look.

Home sections:

- Recruiting / Open Positions: visible near the top.
- Latest News: latest 3 items only.
- Featured Research Videos / Projects: 2-3 cards with project, paper, GitHub, or YouTube links.
- Research Areas: 4 concise cards.

Home should link out to dedicated pages rather than containing full people/publication lists.

## Visual Identity

Use the provided RAIV logo files as the basis of the visual system. During implementation, copy the
selected source files into ASCII asset paths:

- `assets/logo-wordmark.png`: horizontal wordmark for header and footer.
- `assets/logo-lockup-wide.png`: full lockup for larger brand moments, such as a hero side panel or Join page.
- `assets/logo-symbol.png`: symbol mark for favicon, compact mobile header, and small identity accents.
- `assets/logo-lockup-square.png`: square-ish RAIV lockup for social previews or compact brand cards.

Logo usage should be restrained:

- The header logo should be compact, around 32-40px tall.
- The hero should still use text as the main hierarchy: `RAIV Lab` should remain the primary H1.
- Logo assets should support the academic identity, not overpower the content.

Color direction:

- White/off-white page background.
- Deep navy/graphite for text and header accents.
- Teal from the logo for links, buttons, tags, and active states.
- Pale blue-gray for section backgrounds.
- Avoid purple/blue gradient-heavy AI visuals and full dark-mode dominance.

Typography:

- Clear sans-serif for navigation and body copy.
- Strong but restrained headings.
- No viewport-based font scaling; use stable responsive breakpoints.

## Page Designs

### Research

Purpose: explain the lab's research directions clearly.

Use four main research cards:

- Embodied Manipulation
- Transparent Object Perception
- Multispectral Robot Vision
- Calibration and Odometry

Each card should include a concise description and can later include representative project links.

### Projects

Purpose: the most visual page.

Use project cards with:

- Venue/status tag.
- Project title.
- Short summary.
- Links to project page, paper, GitHub, or YouTube where available.

The page should feel more visual than Publications, but remain academic and factual.

### People

Purpose: show faculty and researchers.

Use:

- A featured faculty card with affiliation and external links.
- Researcher cards grouped by role when the list grows.
- A layout that can accept headshots later without redesign.

### Publications

Purpose: dense academic reference page.

Use:

- Year filters.
- Title links.
- Author line.
- Venue line.
- Recent-first ordering.

The style should be clean and compact, closer to APRL/KNU than a marketing page.

### News

Purpose: archive of lab updates.

Use a simple timeline/list:

- Date.
- Event text.
- Optional category later, such as `Paper`, `Member`, `Recruiting`, or `Award`.

### Join

Purpose: recruiting and contact.

Include:

- Who should apply: undergraduate researchers, graduate students.
- Research interest fit: robot vision, embodied AI, calibration, reconstruction, manipulation.
- What to email: brief personal statement and CV.
- Email subject: `[RAIV-LAB] Application`.
- Contact details: email, phone, room, address.

This page should feel welcoming but official.

## Content Model

Keep frequently edited content in a single data file, such as `data/site.js`, unless the site later
migrates to Jekyll collections.

Editable content groups:

- Lab facts.
- External links.
- Research themes.
- Projects.
- Faculty.
- People.
- Publications.
- News.
- Contact / Join information.

This keeps updates easy while avoiding a build step.

## Implementation Constraints

- Static GitHub Pages site with no build step.
- Plain HTML, CSS, and JavaScript are acceptable.
- Keep pages separate; do not return to a single-page long landing site.
- Use provided logo assets in project-local `assets/` paths.
- Preserve responsive behavior for desktop and mobile.
- Avoid text overflow on mobile.
- Keep visual tone academic, official, and robotics-focused.

## Verification Criteria

Before considering the redesign complete:

- Every page opens directly by URL.
- Header navigation works between pages.
- Active navigation state is correct.
- Logo assets load.
- Home is not overly long.
- Publications filtering works.
- Mobile menu works.
- Desktop and mobile layouts have no meaningful horizontal overflow.
- The site visually reads as a university research lab, not a startup landing page.
