const test = require("node:test");
const assert = require("node:assert");
const PROJECTS = require("../projects.js");

test("has exactly 3 projects in spec order", () => {
  assert.deepStrictEqual(
    PROJECTS.map((p) => p.title),
    ["AI EvalOps", "Intelligent Invoice Processing System", "FinPilot"]
  );
});

test("urls match the spec", () => {
  assert.deepStrictEqual(
    PROJECTS.map((p) => p.url),
    [
      "https://github.com/abhishekharis/ai-evalops",
      "https://github.com/abhishekharis/document-ai-rpa",
      "https://finpilotus.netlify.app/",
    ]
  );
});

test("accents are violet, cyan, emerald", () => {
  assert.deepStrictEqual(
    PROJECTS.map((p) => p.accent),
    ["violet", "cyan", "emerald"]
  );
});

test("every project has non-empty id, title, description, url, highlight and at least 2 tags", () => {
  for (const p of PROJECTS) {
    for (const key of ["id", "title", "description", "url", "highlight"]) {
      assert.ok(typeof p[key] === "string" && p[key].trim() !== "", `${p.title}: ${key}`);
    }
    assert.ok(Array.isArray(p.tags) && p.tags.length >= 2, `${p.title}: tags`);
  }
});

test('only FinPilot has badge "HackUTD 2026" and flow ["Detect","Simulate","Recommend"]', () => {
  const [evalops, invoice, finpilot] = PROJECTS;
  assert.strictEqual(finpilot.badge, "HackUTD 2026");
  assert.deepStrictEqual(finpilot.flow, ["Detect", "Simulate", "Recommend"]);
  for (const p of [evalops, invoice]) {
    assert.strictEqual(p.badge, undefined, `${p.title}: badge`);
    assert.strictEqual(p.flow, undefined, `${p.title}: flow`);
  }
});

test("FinPilot copy makes no unsupported claims", () => {
  const finpilot = PROJECTS[2];
  assert.ok(finpilot.description.toLowerCase().includes("prototype"));
  // every visible string on the card: description, highlight, badge, tags, flow
  const everything = JSON.stringify(finpilot).toLowerCase();
  assert.ok(!everything.includes("live demo"));
  assert.ok(!everything.includes("production"));
  assert.ok(!/\d+(\.\d+)?\s*%/.test(everything), "no accuracy/percentage claims");
});
