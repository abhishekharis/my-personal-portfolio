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

document.addEventListener("DOMContentLoaded", () => {
  renderProjects(PROJECTS, document.getElementById("project-grid"));
});
