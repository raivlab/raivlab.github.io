const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/\r\n?/g, "\n");

const dataContext = { window: {} };
vm.createContext(dataContext);
vm.runInContext(read("data/site.js"), dataContext);
const data = dataContext.window.raivData;

assert.deepStrictEqual(
  JSON.parse(JSON.stringify(data.navItems.map(({ key, label, href }) => [key, label, href]))),
  [
    ["home", "Home", "index.html"],
    ["people", "People", "people.html"],
    ["research", "Research", "research.html"],
    ["projects", "Projects", "projects.html"],
    ["publications", "Publications", "publications.html"],
    ["album", "Album", "album.html"],
    ["news", "News", "news.html"],
    ["contact", "Contact", "contact.html"],
  ],
  "Projects should appear between Research and Publications in shared navigation."
);

assert.equal(data.pages.home.sections.latestResearch.href, "research.html");
assert.equal(data.pages.research.title, "Research");
assert.equal(data.pages.projects.title, "Projects");

const researchHtml = read("research.html");
const projectsHtml = read("projects.html");
assert.match(researchHtml, /data-page="research"/);
assert.match(researchHtml, /data-render="projects" data-source="all-research"/);
assert.match(projectsHtml, /data-page="projects"/);
assert.match(projectsHtml, /data-render="funded-projects"/);

assert.equal(data.fundedProjects.length, 5, "All five funded projects should be editable in site.js.");
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(data.fundedProjects.map((project) => project.imageSrc))),
  [
    "assets/사진/프로젝트사진/기본연구.png",
    "assets/사진/프로젝트사진/RFM.jpg",
    "assets/사진/프로젝트사진/배터리.jpg",
    "assets/사진/프로젝트사진/금오공대.png",
    "assets/사진/프로젝트사진/kit-rise.png",
  ]
);
data.fundedProjects.forEach((project) => {
  assert.ok(project.korean?.heading && project.english?.heading, "Each project needs Korean and English headings.");
  assert.ok(project.imageAlt?.korean && project.imageAlt?.english, "Each project image needs bilingual alt text.");
  assert.ok(fs.existsSync(path.join(root, project.imageSrc)), `${project.imageSrc} should exist.`);
});
assert.equal(data.fundedProjects[3].korean.period, "2026.09 - 2032.08");
assert.equal(data.fundedProjects[3].english.period, "2026.09 - 2032.08");

class FakeClassList {
  constructor(owner) {
    this.owner = owner;
  }

  toggle(name, enabled) {
    const names = new Set((this.owner.className || "").split(/\s+/).filter(Boolean));
    if (enabled) names.add(name);
    else names.delete(name);
    this.owner.className = [...names].join(" ");
  }
}

class FakeElement {
  constructor(tagName) {
    this.tagName = tagName;
    this.children = [];
    this.dataset = {};
    this.attributes = {};
    this.className = "";
    this.classList = new FakeClassList(this);
    this.hidden = false;
    this.listeners = {};
    this.textContent = "";
  }

  append(...nodes) {
    this.children.push(...nodes);
  }

  replaceChildren(...nodes) {
    this.children = [...nodes];
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  addEventListener(type, listener) {
    this.listeners[type] = listener;
  }

  matches(selector) {
    if (selector === "[data-project-language]") return this.dataset.projectLanguage !== undefined;
    if (selector === "[data-project-language-panel]") return this.dataset.projectLanguagePanel !== undefined;
    return false;
  }

  closest(selector) {
    return this.matches(selector) ? this : null;
  }

  querySelectorAll(selector) {
    const matches = [];
    const visit = (node) => {
      if (!(node instanceof FakeElement)) return;
      if (node.matches(selector)) matches.push(node);
      node.children.forEach(visit);
    };
    this.children.forEach(visit);
    return matches;
  }
}

const projectTarget = new FakeElement("div");
const document = { createElement: (tagName) => new FakeElement(tagName) };
const rendererContext = {
  document,
  Node: FakeElement,
  window: {
    raivSite: {
      data,
      make(tagName, className, text) {
        const element = document.createElement(tagName);
        if (className) element.className = className;
        if (text !== undefined && text !== null) element.textContent = text;
        return element;
      },
      renderEach(selector, callback) {
        if (selector === '[data-render="funded-projects"]') callback(projectTarget);
      },
      link() {},
    },
  },
};
vm.createContext(rendererContext);
vm.runInContext(read("scripts/render-pages.js"), rendererContext);

assert.equal(typeof rendererContext.window.raivSite.renderFundedProjects, "function");
rendererContext.window.raivSite.renderFundedProjects();
assert.equal(projectTarget.dataset.activeLanguage, "ko", "Projects should open in Korean.");
assert.equal(projectTarget.querySelectorAll("[data-project-language-panel]").length, 2);
assert.deepStrictEqual(
  projectTarget.querySelectorAll("[data-project-language-panel]").map((panel) => panel.lang),
  ["ko", "en"],
  "Each language panel should declare its content language."
);
assert.equal(
  projectTarget.querySelectorAll("[data-project-language]")[0].attributes["aria-pressed"],
  "true",
  "KOR should expose its initial pressed state."
);
assert.equal(
  projectTarget.querySelectorAll("[data-project-language-panel]")[0].children[0].children[1].children[0].alt,
  "KIT-RISE 산학연 공동기술 개발과제 이미지",
  "The Korean panel should render the Korean image description."
);

const englishButton = projectTarget
  .querySelectorAll("[data-project-language]")
  .find((button) => button.dataset.projectLanguage === "en");
const toggle = projectTarget.children[0];
toggle.listeners.click({ target: englishButton });
assert.equal(projectTarget.dataset.activeLanguage, "en", "The ENG button should show English project data.");

const visiblePanel = projectTarget
  .querySelectorAll("[data-project-language-panel]")
  .find((panel) => !panel.hidden);
const visibleCards = visiblePanel.children;
assert.equal(visibleCards.length, 5, "Every data entry should render as a project card.");
assert.deepStrictEqual(
  visibleCards.map((card) => card.children[0].children[0].textContent),
  [
    "Industry-University-Institute Collaborative Technology Development Project",
    "Robot Industry Technology Development Program",
    "Robot Industry Technology Development Program",
    "Core Research Program (Basic Research Program B)",
    "AI Innovation Human Resource Development Program (AX Graduate School)",
  ],
  "Projects should automatically render from earliest to latest start period while preserving ties."
);
assert.equal(
  visibleCards[4].children[0].children.length,
  4,
  "Missing optional program and title fields should be omitted from the AX project."
);

console.log("projects page checks passed");
