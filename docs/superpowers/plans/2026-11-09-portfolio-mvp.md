# Portfolio MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a stylish, dark-glass, single-page portfolio for Abhishek Haris: hero summary plus a 3-card projects row.

**Architecture:** Static site with no build step. Project content lives in `projects.js` (a plain array, also importable by Node for tests). `script.js` renders cards from that array and adds the cursor-glow effect. `styles.css` holds all styling via CSS custom properties, with a per-card `--accent`.

**Tech Stack:** HTML, CSS, vanilla JS, Google Fonts (Space Grotesk, JetBrains Mono), Node built-in `node:test` for the data test only.

**Spec:** `docs/superpowers/specs/2026-11-09-portfolio-mvp-design.md`

## Global Constraints

- Static site: `index.html`, `styles.css`, `script.js` (plus `projects.js` for data). No framework, no build step, no backend.
- Visual direction: dark and glassy; background near-black ~`#0a0a0f`; violet→cyan radial glow behind hero.
- Fonts: Space Grotesk (headings/body), JetBrains Mono (tags, metrics).
- Projects grid: one row of 3 cards, in order: AI EvalOps, Intelligent Invoice Processing System, FinPilot.
- Grid: 3 columns ≥ 900px, 1 column below. No horizontal scroll at any width.
- Accents: AI EvalOps violet, Invoice Processing cyan, FinPilot emerald/teal.
- Hero title: "Full Stack Engineer". Hero links: email (`harisabhishek957@gmail.com`), LinkedIn (`https://linkedin.com/in/abhishek-haris`), GitHub (`https://github.com/abhishekharis`). No phone number anywhere.
- Project URLs: `https://github.com/abhishekharis/ai-evalops`, `https://github.com/abhishekharis/document-ai-rpa`, `https://github.com/mairesse24/FinPilot`. Cards open them in a new tab with `rel="noopener noreferrer"`.
- FinPilot copy: no claims beyond the README (no accuracy numbers, no "live demo", no "production"); describe it as a prototype built for HackUTD 2026.
- All motion off under `prefers-reduced-motion`. Text contrast WCAG AA. Visible focus states on links.
- Footer: name and year.

## Review Focus

- JavaScript disabled: hero must still read fully; projects section should show a `<noscript>` message with a link to GitHub, not an empty gap.
- Very narrow viewport (320px) with long tag lists: tags wrap, no horizontal overflow.
- Project object missing an optional `badge`: card renders without an empty pill.
- Description text containing `<` or `&`: rendered as text, not HTML (render with `textContent`).
- Touch devices (no hover/mouse): cards fully readable; glow effect simply absent.

---

### Task 1: Project data and its test

**Files:**
- Create: `projects.js`
- Create: `tests/projects.test.js`

**Interfaces:**
- Produces: global `PROJECTS` (also `module.exports = PROJECTS` under Node), an array of 3 objects `{ id: string, title: string, description: string, tags: string[], highlight: string, url: string, accent: "violet"|"cyan"|"emerald", badge?: string, flow?: string[] }`. Task 3 renders these.

- [ ] **Step 1: Write the failing test** in `tests/projects.test.js` using `node:test` and `node:assert`, requiring `../projects.js`. Tests:
  - `has exactly 3 projects in spec order`: titles equal `["AI EvalOps", "Intelligent Invoice Processing System", "FinPilot"]`.
  - `urls match the spec`: the three URLs from Global Constraints, in order.
  - `accents are violet, cyan, emerald`, in order.
  - `every project has non-empty title, description, url, highlight and at least 2 tags`.
  - `only FinPilot has badge "HackUTD 2026" and flow ["Detect","Simulate","Recommend"]`.
  - `FinPilot copy makes no unsupported claims`: its description (lowercased) contains "prototype" and does not contain "live demo" or "production".
- [ ] **Step 2: Run** `node --test tests/` — Expected: FAIL (cannot find `../projects.js`).
- [ ] **Step 3: Implement `projects.js`** with the `PROJECTS` array. Use the descriptions, tags and highlights from the spec's Project cards table (AI EvalOps highlight "500+ tests · 97% coverage"; Invoice highlight "OCR → approval → RPA"; FinPilot highlight "Detect → Simulate → Recommend"). Guard the export: `if (typeof module !== "undefined") module.exports = PROJECTS;`.
- [ ] **Step 4: Run** `node --test tests/` — Expected: all PASS.
- [ ] **Step 5: Commit** (run `git init` first if the folder is not yet a repo): `git add projects.js tests && git commit -m "feat: add project data with tests"`

### Task 2: Page shell, hero, and base styling

**Files:**
- Create: `index.html`
- Create: `styles.css`

**Interfaces:**
- Consumes: nothing from Task 1 at runtime yet.
- Produces: `index.html` containing `<ul id="project-grid" class="grid"></ul>` inside `<section id="projects">`, loading `projects.js` then `script.js` (both `defer`, in that order). CSS custom properties on `:root`: `--bg`, `--text`, `--muted`, `--glass`, `--border`; per-card accent via `.card[data-accent="violet|cyan|emerald"] { --accent: … }`. Task 3 relies on the `#project-grid` id and the `data-accent` attribute.

- [ ] **Step 1: Write `index.html`:** `<title>Abhishek Haris — Full Stack Engineer</title>`, meta description and viewport, Google Fonts links, hero (name `h1`, title line, summary paragraph using the spec's summary copy, three links: Email / LinkedIn / GitHub), Projects `h2` + the empty `#project-grid` + `<noscript>` fallback link to GitHub, footer "© <year> Abhishek Haris" (year hard-coded 2026).
- [ ] **Step 2: Write `styles.css`:** tokens, near-black background with fixed violet→cyan radial glow, hero typography (large Space Grotesk name, muted summary), link pills with `:focus-visible` outline, `.grid` as 3 columns ≥ 900px else 1 column with a 16px+ side gutter, `overflow-x: hidden` guard avoided in favor of correct sizing (`min-width: 0`, `flex-wrap`), fade-up `@keyframes` wrapped so that `@media (prefers-reduced-motion: reduce)` disables animation and transitions.
- [ ] **Step 3: Verify in browser** — open `index.html`: hero renders on the dark background, links work, empty grid causes no layout break, no console errors. Expected: matches description.
- [ ] **Step 4: Commit:** `git add index.html styles.css && git commit -m "feat: add page shell, hero and base styles"`

### Task 3: Card rendering and card visuals

**Files:**
- Create: `script.js`
- Modify: `styles.css` (append card styles)

**Interfaces:**
- Consumes: global `PROJECTS` (Task 1); `#project-grid` and `.card[data-accent]` conventions (Task 2).
- Produces: `renderProjects(projects, container): void` in `script.js`, called on `DOMContentLoaded`. Each project becomes `<li class="card" data-accent="…">` containing: optional `.badge` pill, `h3`, description `p`, `ul.tags` chips, `.highlight` row, and an `a.card-link` "View project →" (`target="_blank" rel="noopener noreferrer"`, accessible name includes the project title). Use `textContent` for all strings.

- [ ] **Step 1: Implement `renderProjects`** per the Interfaces block. If `project.flow` exists, render the highlight as three `<span>` steps with `→` separators in accent color; otherwise render `project.highlight` as text. Omit `.badge` when `badge` is absent.
- [ ] **Step 2: Style cards:** translucent `--glass` fill, 1px `--border`, `backdrop-filter: blur(14px)`, top-edge 2px accent line, accent-colored highlight text in JetBrains Mono, tag chips in mono, hover lift (`translateY(-4px)`) with accent-tinted shadow, badge pill top-right, equal card heights in the row. Add FinPilot's decorative SVG forecast curve with uncertainty band as a CSS background (`data:` SVG) at ≤ 0.15 opacity, applied via `.card[data-accent="emerald"]::after` with `pointer-events: none`.
- [ ] **Step 3: Verify in browser** at 1280px, 800px, 375px, and 320px: three cards in one row ≥ 900px, single column below, no horizontal scroll (check `document.documentElement.scrollWidth <= innerWidth` in the console), each accent color correct, FinPilot shows badge, flow row and curve, other two show neither badge nor curve. Expected: all true.
- [ ] **Step 4: Review Focus checks:** temporarily add a project with `description: "a < b & c"` and no badge via the console; confirm it renders as literal text with no empty pill. Disable JS and confirm the `<noscript>` message shows. Expected: both pass.
- [ ] **Step 5: Commit:** `git add script.js styles.css && git commit -m "feat: render project cards with per-project accents"`

### Task 4: Polish: cursor glow, load animation, accessibility pass

**Files:**
- Modify: `script.js` (add `initCardGlow(container): void`)
- Modify: `styles.css`

**Interfaces:**
- Consumes: `.card` elements created by `renderProjects` (Task 3).
- Produces: `initCardGlow(container)` sets `--mx` / `--my` (px, relative to the hovered card) on `pointermove`; CSS paints a radial highlight from them. It does nothing when `matchMedia("(prefers-reduced-motion: reduce)")` matches or the pointer is not a mouse.

- [ ] **Step 1: Implement `initCardGlow`** and the CSS `radial-gradient` at `var(--mx) var(--my)` in the accent color at low alpha, shown only on `.card:hover`. Call it after `renderProjects`.
- [ ] **Step 2: Add staggered fade-up** for hero and cards (CSS `animation-delay` via `:nth-child`), disabled under reduced motion.
- [ ] **Step 3: Accessibility check:** tab through the page (every link shows a visible focus ring, order is hero links then cards); verify body text and muted text contrast ≥ 4.5:1 against the card/background colors (adjust `--muted` if not); emulate `prefers-reduced-motion: reduce` in devtools and confirm no animation or glow. Expected: all pass.
- [ ] **Step 4: Final verification:** `node --test tests/` passes; load the page with the console open and confirm zero errors or warnings; confirm each of the 3 project links and the 3 hero links point to the URLs in Global Constraints.
- [ ] **Step 5: Commit:** `git add script.js styles.css && git commit -m "feat: add card glow, load animation and accessibility polish"`

---

## Self-Review

- **Spec coverage:** hero + summary + 3 links (T2), 3-card grid and responsiveness (T2/T3), three cards' content and URLs (T1), FinPilot visual design: accent, badge, flow row, SVG motif, honesty guardrails (T1 copy test, T3 styling), fonts/glow/reduced motion/contrast (T2/T4), data-array extensibility (T1/T3), footer (T2), verification section (T3/T4). No gaps.
- **Types:** `PROJECTS` shape and `renderProjects` / `initCardGlow` signatures are consistent across tasks.
- **Open item:** the owner has not yet confirmed their role on FinPilot (spec's flagged assumption). The plan keeps the card neutral ("team hackathon project" via the badge only) so no change is needed either way.
