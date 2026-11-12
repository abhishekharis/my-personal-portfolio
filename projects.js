// Project content for the portfolio. Add a project = add one object.
// `url` = GitHub repo (bottom link). `liveUrl` (optional) = deployed site; when present the project name links to it.
// Plain script (global PROJECTS in the browser) that is also require()-able from Node tests.
const PROJECTS = [
  {
    id: "ai-evalops",
    title: "AI EvalOps",
    description:
      "Catches AI quality regressions before release by scoring endpoint responses against approved baselines across five suites, with an optional LLM judge.",
    tags: ["Python", "FastAPI", "Playwright", "Docker", "GitHub Actions"],
    highlight: "500+ tests · 97% coverage",
    url: "https://github.com/abhishekharis/ai-evalops",
    liveUrl: "https://ai-evalops.onrender.com/",
    accent: "violet",
  },
  {
    id: "invoice-processing",
    title: "Intelligent Invoice Processing System",
    description:
      "End-to-end invoice workflow: document upload, OCR, validation, human approval and RPA, with audit logs and job tracking.",
    tags: ["React", "FastAPI", "MongoDB", "PaddleOCR", "OpenCV"],
    highlight: "OCR → approval → RPA",
    url: "https://github.com/abhishekharis/document-ai-rpa",
    accent: "cyan",
  },
  {
    id: "finpilot",
    title: "FinPilot",
    description:
      'A prototype AI-powered financial resilience platform built for HackUTD 2026 (PNC Financial Health Navigator): detects financial risk, simulates "what if" scenarios, and recommends actions. Uses synthetic data only.',
    tags: ["Python", "FastAPI", "React", "LightGBM", "Gemini"],
    highlight: "Detect → Simulate → Recommend",
    url: "https://github.com/mairesse24/FinPilot",
    liveUrl: "https://finpilotus.netlify.app/",
    accent: "emerald",
    badge: "HackUTD 2026",
    flow: ["Detect", "Simulate", "Recommend"],
  },
];

if (typeof module !== "undefined") module.exports = PROJECTS;
