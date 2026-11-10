# Portfolio MVP — Design Spec

**Owner:** Abhishek Haris · **Date:** 2026-11-09 · **Status:** Draft, awaiting review

## Goal
A stylish, professional single-page portfolio. MVP content: a short professional summary, then a Projects section showing personal projects as cards.

## Decisions (agreed)
- **Approach:** plain static site — `index.html`, `styles.css`, `script.js`. No build step, no framework, no backend.
- **Visual direction:** dark & glassy.
- **Projects grid:** one row of **3 cards** (desktop): AI EvalOps, Intelligent Invoice Processing System, and FinPilot. (Changed from the earlier 3×3 idea; the "Coming soon" tile was dropped now that a third project exists. More cards can be added later as one data object each.)

## Links (supplied by owner)
- GitHub profile: https://github.com/abhishekharis
- AI EvalOps: https://github.com/abhishekharis/ai-evalops
- Intelligent Invoice Processing System: https://github.com/abhishekharis/document-ai-rpa
- FinPilot: https://github.com/mairesse24/FinPilot

## Assumptions (not explicitly confirmed)
- FinPilot is not on the resume. Its card content comes from the repo README (see below). The repo is owned by a different GitHub account (`mairesse24`) and the README describes a 3-member HackUTD 2026 team, so the card is labelled a team hackathon project. **Owner to confirm** their role and that this framing is accurate.
- Phone number is not shown (public page; privacy).

## Page structure
1. **Hero** — name, title "Full Stack Engineer", 2–3 sentence summary, email + LinkedIn + GitHub links.
2. **Projects** — section heading and the 3-card grid.
3. **Footer** — minimal: name and year.

## Summary copy (draft)
> Computer Science graduate from UT Dallas and Software Engineer Intern at Velocis Technology, building Python connectors for AWS Certificate Manager and HashiCorp Vault. I build full-stack applications with React, FastAPI and MongoDB.

## Project cards
| Card | Description | Tags | Highlight |
|---|---|---|---|
| **AI EvalOps** | Catches AI quality regressions before release by scoring endpoint responses against approved baselines across five suites, with an optional LLM judge. | Python, FastAPI, Playwright, Docker, GitHub Actions | 500+ tests · 97% coverage |
| **Intelligent Invoice Processing System** | End-to-end invoice workflow: document upload, OCR, validation, human approval and RPA, with audit logs and job tracking. | React, FastAPI, MongoDB, PaddleOCR, OpenCV | OCR → approval → RPA |
| **FinPilot** | AI-powered financial resilience platform built for HackUTD 2026 (PNC Financial Health Navigator): detects financial risk, simulates "what if" scenarios, and recommends actions. Uses synthetic data only. | Python, FastAPI, React, LightGBM, Gemini | Detect → Simulate → Recommend |

Each card: title, description, tag chips, highlight metric, "View project" link (opens the GitHub repo in a new tab with `rel="noopener noreferrer"`).

### FinPilot card — visual design
Same glass card as the other two, with a distinct identity so the row reads as three projects, not three copies:
- **Accent color per card:** AI EvalOps = violet, Invoice Processing = cyan, FinPilot = emerald/teal. The accent drives the hover glow, top-edge highlight line and highlight-metric color.
- **Badge:** a small mono pill in the card's top-right corner reading "HackUTD 2026" (the other cards carry no badge, or a neutral "Personal" one if the row looks unbalanced).
- **Highlight row:** the metric renders as a three-step mini flow, `Detect → Simulate → Recommend`, in mono type with arrows in the accent color, instead of a single stat.
- **Decorative motif:** a faint inline-SVG sparkline/forecast curve with a soft uncertainty band in the card's lower background (low opacity, `aria-hidden`), hinting at finance and forecasting. Pure SVG, no image assets.
- **Honesty guardrails:** no claims beyond the README (no accuracy numbers, no "live demo", no "production"). The card text says "prototype" in its description if space allows.

### FinPilot source notes (from repo README, 2026-11-09)
Detect (Guardian risk rules) → Simulate (Digital Twin scenarios) → Recommend (Copilot chat). Stack: FastAPI backend, React/Vite frontend, LightGBM spending forecasts, Gemini chatbot, Postgres/Supabase optional. Self-described as a prototype; no hosted demo.

## Visual design
- Background near-black (~`#0a0a0f`) with a soft violet→cyan radial glow behind the hero.
- Cards: translucent fill, 1px light border, `backdrop-filter` blur; slight lift on hover; cursor-following glow highlight.
- Fonts (Google Fonts): Space Grotesk (headings/body), JetBrains Mono (tags, metrics).
- Fade-up on load. All motion disabled under `prefers-reduced-motion`.
- Text contrast meets WCAG AA; visible focus states on links.

## Responsive
Grid: 3 columns ≥ 900px, 1 column below (2 columns on tablet would orphan the third card, so it is skipped). No horizontal scroll at any width.

## Data
Projects are defined in a JS array in `script.js` and rendered into the grid. Adding a project = adding one object (title, description, tags, highlight, url, accent, optional badge).

## Out of scope (MVP)
Experience, education and skills sections; contact form; blog; theme toggle; analytics.

## Verification
Open in a browser at desktop, tablet and mobile widths; confirm layout, no horizontal scroll, hover/focus states, reduced-motion behavior, and no console errors.
