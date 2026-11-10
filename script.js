// Renders PROJECTS (projects.js) into the grid. All strings go through textContent, never innerHTML.

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderHighlight(project) {
  const row = el("div", "highlight");
  if (project.flow) {
    project.flow.forEach((step, i) => {
      if (i > 0) row.appendChild(el("span", "arrow", "→"));
      row.appendChild(el("span", "", step));
    });
  } else {
    row.textContent = project.highlight;
  }
  return row;
}

function renderProjects(projects, container) {
  container.replaceChildren();
  for (const project of projects) {
    const card = el("li", "card");
    card.dataset.accent = project.accent;

    if (project.badge) card.appendChild(el("span", "badge", project.badge));
    card.appendChild(el("h3", "", project.title));
    card.appendChild(el("p", "", project.description));

    const tags = el("ul", "tags");
    for (const tag of project.tags) tags.appendChild(el("li", "", tag));
    card.appendChild(tags);

    card.appendChild(renderHighlight(project));

    const link = el("a", "card-link", "View project →");
    link.href = project.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `View project: ${project.title}`);
    card.appendChild(link);

    container.appendChild(card);
  }
}

// Cursor-following glow: sets --mx/--my (px, relative to the hovered card); CSS paints the highlight.
// No-op under reduced motion; ignores touch/pen pointers.
function initCardGlow(container) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  container.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    const card = event.target.closest(".card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("project-grid");
  renderProjects(PROJECTS, grid);
  initCardGlow(grid);
});
