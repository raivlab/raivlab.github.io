const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const index = read("index.html");
const projects = read("projects.html");
const people = read("people.html");
const publications = read("publications.html");
const news = read("news.html");
const join = read("join.html");
const calendar = read("calendar.html");
const contact = fs.existsSync(path.join(root, "contact.html")) ? read("contact.html") : "";
const album = fs.existsSync(path.join(root, "album.html")) ? read("album.html") : "";
const scriptFiles = [
  "scripts/core.js",
  "scripts/media.js",
  "scripts/render-global.js",
  "scripts/render-projects.js",
  "scripts/render-people.js",
  "scripts/render-publications.js",
  "scripts/render-news.js",
  "scripts/render-pages.js",
  "scripts/main.js",
];
const script = scriptFiles.map(read).join("\n");
const styleFiles = [
  "styles/00-foundation.css",
  "styles/10-home.css",
  "styles/20-components.css",
  "styles/30-pages.css",
  "styles/90-responsive.css",
];
const styles = styleFiles.map(read).join("\n");
const siteDataScript = read("data/site.js");
const dataSandbox = { window: {} };
vm.runInNewContext(siteDataScript, dataSandbox);
const siteData = dataSandbox.window.raivData;
const htmlDocuments = [
  ["index.html", index],
  ["people.html", people],
  ["projects.html", projects],
  ["publications.html", publications],
  ["news.html", news],
  ["join.html", join],
  ["calendar.html", calendar],
  ["contact.html", contact],
  ["album.html", album],
];

const recruitingMarker = 'data-render="recruiting"';
const renderRecruiting = script.slice(
  script.indexOf("const renderRecruiting = () => {"),
  script.indexOf("const renderRecruitingDetail = () => {")
);
const renderRecruitingDetail = script.slice(
  script.indexOf("const renderRecruitingDetail = () => {"),
  script.indexOf("const renderContact = () => {")
);

scriptFiles.forEach((file) => {
  assert(fs.existsSync(path.join(root, file)), `${file} should exist as part of the split renderer bundle.`);
});
styleFiles.forEach((file) => {
  assert(fs.existsSync(path.join(root, file)), `${file} should exist as part of the split CSS bundle.`);
  assert(read("styles.css").includes(`@import url("${file}")`), `styles.css should import ${file}.`);
});
htmlDocuments.forEach(([file, html]) => {
  assert(!html.includes('src="script.js'), `${file} should load the split renderer files directly.`);
  scriptFiles.forEach((scriptFile) => {
    assert(html.includes(`src="${scriptFile}?v=`), `${file} should load ${scriptFile}.`);
  });
});

assert(
  index.includes(recruitingMarker),
  "Home should still include recruiting after simplifying the top page."
);
assert(
  index.indexOf(recruitingMarker) < index.indexOf('class="home-hero"'),
  "Home recruiting should sit above the hero as a slim announcement strip."
);
assert(
  siteData.recruiting &&
    ["open", "closed"].includes(siteData.recruiting.status) &&
    siteData.recruiting.states.open.summary ===
      "We are looking for motivated undergraduate and graduate students to join our research team." &&
    siteData.recruiting.states.open.ctaLabel === "Join RAIV Lab" &&
    siteData.recruiting.states.open.ctaHref === "join.html" &&
    siteData.recruiting.states.closed.hidden === true &&
    !siteData.recruiting.states.closed.summary &&
    !siteData.recruiting.states.closed.ctaLabel &&
    !siteData.recruiting.states.closed.ctaHref,
  "Home recruiting should be configurable from site.js and hide entirely when recruiting is closed."
);
assert(
  !index.includes("Core Research Areas"),
  "Home should not include the Core Research Areas section."
);
assert(
  !index.includes("Robots that see, reason, and adapt."),
  "Home should not include the research intro block."
);
assert(
  !index.includes("Featured Projects"),
  "Home should not include a Featured Projects section."
);
assert(
  !index.includes('<p class="eyebrow">Robotics and AI Vision Lab</p>'),
  "Home hero should not show the small lab-name eyebrow."
);
assert(
  !index.includes("hero-actions"),
  "Home hero should not show hero action buttons."
);
assert(
  !index.includes('data-render="facts"'),
  "Home hero should not show fact cards."
);
assert(
  !index.includes("hero-logo-panel"),
  "Home hero should not show the right-side logo panel."
);
assert(
  index.includes('data-render="home-hero"') &&
    !index.includes('class="hero-brand-lockup"') &&
    !index.includes("hero-title-word") &&
    siteData.pages.home.hero.logoSrc === "assets/logo-lockup-wide.png" &&
    siteData.pages.home.hero.title === "Robotics and AI Vision Lab",
  "Home hero content should be rendered from site.js rather than hardcoded HTML."
);
assert(
  !index.includes('class="hero-affiliation"'),
  "Home hero should not duplicate school and university links below the logo."
);
assert(
  !index.includes("At <strong><span>RAIV</span> Lab</strong>, we aim to pioneer") &&
    JSON.stringify(siteData.pages.home.hero.mission).includes("Vision-Based Embodied Intelligence") &&
    JSON.stringify(siteData.pages.home.hero.mission).includes("seamlessly adapt to complex and dynamic human environments"),
  "Home hero description should live in site.js with the requested mission sentence."
);
assert(
  index.includes("news-list-simple"),
  "Home Latest News should use a simple list presentation."
);
assert(
  news.includes('class="news-sections" data-render="news"'),
  "News page should render categorized news sections."
);
assert.deepStrictEqual(
  JSON.parse(JSON.stringify((siteData.newsSections || []).map((section) => section.title))),
  ["Papers", "Projects", "New Members"],
  "News data should be organized into Papers, Projects, and New Members sections while Awards is empty."
);
const newsSections = JSON.parse(JSON.stringify(siteData.newsSections || []));
const projectNews = newsSections.find((section) => section.title === "Projects");
const newMemberNews = newsSections.find((section) => section.title === "New Members");
const paperNews = newsSections.find((section) => section.title === "Papers");
const awardNews = newsSections.find((section) => section.title === "Awards");
assert.strictEqual(awardNews, undefined, "Awards news section should be omitted until it has items.");
assert.deepStrictEqual(
  projectNews.items.map((item) => `${item.date} ${item.title}`),
  [
    "May 2026 RAIV Lab won a grant (KIT-RISE)",
    "Dec 2025 RAIV Lab won a grant (KIT-RISE)",
  ],
  "Projects news should include the requested KIT-RISE grant items."
);
assert(
  newMemberNews.items.every((item) => item.title.includes("joined @RAIV Lab")) &&
    !JSON.stringify(siteData).includes("integrated B.S.-M.S.") &&
    !JSON.stringify(siteData).includes("undergraduate researcher"),
  "New member news should use short join sentences and remove the integrated B.S.-M.S. item."
);
assert.deepStrictEqual(
  paperNews.items.map((item) => item.title),
  ["TRAN-D accepted @ICCV 2025"],
  "Papers news should contain only the short TRAN-D ICCV 2025 item for now."
);
assert(
    script.includes("renderNewsText") &&
    script.includes('document.createElement("strong")') &&
    script.includes("item.names") &&
    script.includes('make("ol", "timeline news-list-simple")') &&
    styles.includes(".news-section") &&
    styles.includes(".news-section h2") &&
    styles.includes(".news-sections {\n  display: grid;\n  width: 100%;\n  gap: 50px;") &&
    styles.includes(".news-list-simple .timeline-item {\n  padding: 12px 0;") &&
    styles.includes(".news-list-simple .timeline-item p {\n  line-height: 1.32;") &&
    styles.includes(".timeline time {\n  color: var(--teal);") &&
    styles.includes(".news-section {\n  display: grid;\n  gap: 14px;\n  width: 100%;\n  padding-top: 0;") &&
    styles.includes(".news-section h2 {\n  color: var(--ink);\n  font-size: 1.2rem;\n  font-weight: 900;\n  line-height: 1;\n  text-transform: uppercase;\n  white-space: nowrap;") &&
    styles.includes(".news-section .news-list-simple {\n  border-top: 0;") &&
    styles.includes(".news-section .timeline-item:last-child {\n  border-bottom: 0;"),
  "News renderer should support sectioned news and bold person names."
);
assert(
  index.includes('data-render="news" data-limit="5"'),
  "Home Latest News should render up to five items."
);
assert(
  index.includes('class="section home-research-latest"') &&
    index.includes('class="home-section-rule home-research-panel"') &&
    index.includes('data-render="section-heading" data-section="latestResearch"') &&
    siteData.pages.home.sections.latestResearch.title === "Latest Research" &&
    siteData.pages.home.sections.latestResearch.linkLabel === "All research" &&
    siteData.pages.home.sections.latestResearch.href === "projects.html" &&
    index.includes('class="project-grid home-research-grid"') &&
    index.includes('data-render="projects"') &&
    index.includes('data-source="video-research"') &&
    index.includes('data-limit="3"'),
  "Home should add a Latest Research section that requests three video-backed Research cards."
);
assert(
  index.indexOf('class="section home-research-latest"') < index.indexOf('class="section home-news"'),
  "Home Latest Research should appear above Latest News."
);
const homeLatestResearch = siteData.projects.filter((project) => project.youtubeHref).slice(0, 3);
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(homeLatestResearch.map((project) => project.title))),
  [
    "Kitchen Robotic Manipulation utilizing Foundation Models",
    "TRAN-D: 2D Gaussian Splatting-based Sparse-view Transparent Object Depth Reconstruction via Physics Simulation for Scene Update",
    "Fieldscale: Locality-Aware Field-based Adaptive Rescaling for Thermal Infrared Image",
  ],
  "Home Latest Research should skip image-only Research cards and keep the first three cards with YouTube videos."
);
assert(
  script.includes("videoResearchCatalog") &&
    script.includes("project.youtubeHref") &&
    script.includes('target.dataset.source === "video-research"') &&
    styles.includes(".home-research-latest") &&
    styles.includes(".home-research-grid"),
  "Project renderer should support a video-only source and Home should style the Latest Research grid."
);
assert(
  styles.includes(".home-hero {\n  display: grid;\n  min-height: 430px;") &&
    styles.includes("  background: #ffffff;") &&
    !styles.includes(".home-hero {\n  display: grid;\n  min-height: 430px;\n  align-items: center;\n  border-bottom: 1px solid var(--line);") &&
    styles.includes(".hero-copy {\n  display: grid;\n  max-width: none;\n  gap: 22px;") &&
    styles.includes(".hero-brand-lockup {\n  display: block;\n  width: min(100%, 900px);") &&
    /\.hero-mission \{\n  max-width: 1120px;\n  width: 100%;\n  color: var\(--ink\);\n  font-size: 1\.05rem;\n  font-weight: 500;\n  line-height: 1\.65;\n  text-align: left;\n\}/.test(styles) &&
    !styles.includes(".hero-rule") &&
    !index.includes("hero-rule"),
  "Home hero should remove divider lines and keep only the logo plus left-aligned mission sentence."
);
assert(
  index.indexOf('data-render="home-hero"') < index.indexOf('class="section home-research-latest"') &&
    script.includes("renderHomeHero") &&
    script.indexOf("hero-brand-lockup") < script.indexOf("hero-mission"),
  "Home hero should render logo and mission from site.js before Latest Research."
);
assert(
  styles.includes(".home-research-latest {\n  padding: 40px 0 34px;") &&
    styles.includes(".home-news {\n  padding: 34px 0 76px;"),
  "Home boxed sections should sit close enough to the hero while keeping balanced spacing."
);
assert(
  index.includes('class="home-section-rule home-research-panel"') &&
    index.includes('class="home-section-rule home-news-layout"') &&
    /\.home-section-rule \{\n  border-top: 1px solid var\(--line\);\n  padding: 32px 32px 0;\n  background: transparent;\n\}/.test(styles) &&
    styles.includes(".home-news .home-section-rule {\n  border-top: 0;\n}") &&
    !styles.includes(".home-section-box") &&
    !/\.home-section-rule \{[^}]*border: 1px solid var\(--line\)/.test(styles) &&
    !/\.home-section-rule \{[^}]*border-radius/.test(styles),
  "Home Latest Research should keep a top divider while Latest News removes the divider between sections."
);
assert(
  styles.includes(".project-grid.home-research-grid {\n  grid-template-columns: repeat(3, minmax(0, 1fr));") &&
    styles.includes("grid-template-rows: none;") &&
    !styles.includes(".home-research-grid .project-card:first-child {\n  grid-row: 1 / span 2;") &&
    !styles.includes(".home-research-grid .project-card:not(:first-child) {\n  display: grid;\n  grid-template-columns: minmax(150px, 0.9fr) minmax(0, 1fr);") &&
    styles.includes(".home-research-grid .card-kicker,\n.home-research-grid .project-authors {\n  display: none;"),
  "Home Latest Research should use three equal video cards and show only titles plus icon links."
);
assert(
  styles.includes(".home-news h2 {\n  font-size: 1.85rem;") &&
    styles.includes(".home-research-latest h2 {\n  font-size: 1.85rem;"),
  "Home Latest Research and Latest News headings should match at a slightly smaller size."
);
assert(
  index.includes('class="section home-news"') &&
    index.includes('class="home-section-rule home-news-layout"'),
  "Home Latest News should use a dedicated compact layout."
);
assert(
  !index.includes('<p class="eyebrow">Updates</p>') &&
    !index.includes("Recent lab milestones, recruiting updates, and member news."),
  "Home Latest News should not show the Updates eyebrow or descriptive helper text."
);
assert(
  !index.includes('<footer class="site-footer">'),
  "Home should not show the footer below Latest News."
);
assert(
  !index.includes("section-muted"),
  "Home should not use muted section backgrounds."
);
assert(
  styles.includes("html {\n  color: var(--ink);\n  background: #ffffff;") &&
    styles.includes("scrollbar-gutter: stable;") &&
    styles.includes("body {\n  margin: 0;\n  min-width: 320px;\n  background: #ffffff;") &&
    !styles.includes('body[data-page="home"]') &&
    !styles.includes(".page-hero {") &&
    !styles.includes(".compact-hero") &&
    !styles.includes(".section-muted") &&
    !styles.includes(".site-footer"),
  "All pages should use white backgrounds without legacy page hero or footer styles."
);
assert(
  styles.includes("--max: 1216px;") &&
    styles.includes("--page-gutter: 52px;") &&
    styles.includes("--page-gutter-pair: 104px;") &&
    styles.includes(".section-inner {\n  width: min(var(--max), calc(100% - var(--page-gutter-pair)));") &&
    styles.includes(".nav-shell {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 24px;\n  width: min(1320px, 100%);") &&
    styles.includes(".brand {\n  display: flex;\n  height: 40px;\n  align-items: center;") &&
    styles.includes("@media (max-width: 1040px) {\n  :root {\n    --page-gutter: 28px;\n    --page-gutter-pair: 56px;") &&
    styles.includes("@media (max-width: 680px) {\n  :root {\n    --page-gutter: 20px;\n    --page-gutter-pair: 40px;"),
  "Shared page containers should align to the same left edge as the header logo across pages and breakpoints."
);
assert(
  styles.includes("--ink: #08284a") && styles.includes("--teal: #2faaa3"),
  "Site palette should keep the logo navy and teal colors."
);
assert(
  styles.includes(".hero-brand-lockup") && styles.includes("max-width: none;"),
  "Home mission copy should use the available section width below the logo."
);
assert(
  !styles.includes(".hero-affiliation"),
  "Removed hero affiliation block should not leave unused CSS."
);
assert(
  renderRecruiting.includes('"section-inner recruiting-panel recruiting-strip"') &&
    renderRecruiting.includes("recruitingState") &&
    renderRecruiting.includes("data.recruiting.states") &&
    renderRecruiting.includes("state.hidden") &&
    renderRecruiting.includes("target.hidden = true") &&
    renderRecruiting.includes("state.ctaLabel && state.ctaHref") &&
    !renderRecruiting.includes('"eyebrow", "Recruiting"') &&
    !renderRecruiting.includes('make("h2", null, data.recruiting.title)'),
  "Home recruiting should render as a slim state-driven strip without an eyebrow or title."
);
assert(
  join.includes('data-render="join-page"') &&
    join.includes('class="section-inner join-layout"') &&
    !join.includes('data-render="contact"') &&
    !join.includes("contact-panel") &&
    !join.includes("contact-layout") &&
    siteData.pages.join.title === "Join Us" &&
    siteData.joinPage.title === "Join RAIV Lab" &&
    siteData.joinPage.korean.title === "RAIV Lab 학생 모집" &&
    siteData.joinPage.sections.map((section) => section.title).join("|") ===
      "Research Areas|Research Environment|What We Expect|What You Will Gain|Open Positions|How to Apply" &&
    siteData.joinPage.korean.sections.map((section) => section.title).join("|") ===
      "연구 분야|연구 환경|지원자에게 기대하는 점|연구를 통해 얻을 수 있는 경험|모집 대상|지원 방법" &&
    siteData.joinPage.korean.sections.find((section) => section.title === "지원 방법").ctaHref ===
      "https://forms.gle/qLLWLFpNrqJfrPF9A" &&
    !siteData.joinPage.korean.sections.find((section) => section.title === "지원 방법").ctaHref.startsWith("mailto:") &&
    script.includes("renderJoinPage") &&
    script.includes("join-page-block") &&
    script.includes("join-section") &&
    script.includes("join-area-grid") &&
    script.includes("join-position-list") &&
    styles.includes(".join-layout") &&
    styles.includes(".join-page-block") &&
    !renderRecruitingDetail.includes('make("p", "eyebrow"'),
  "Join page should render English and Korean prospective-student guides from site.js without the contact panel."
);
assert(
  script.includes("renderJoinLanguageToggle") &&
    script.includes("setJoinLanguage") &&
    script.includes("data-join-lang") &&
    script.includes("data-join-lang-panel") &&
    script.indexOf('renderJoinPageBlock(joinPage.korean, "join-page-block-ko")') <
      script.indexOf('renderJoinPageBlock(joinPage, "join-page-block-en")') &&
    script.includes('setJoinLanguage(target, "ko")') &&
    styles.includes(".join-language-toggle") &&
    styles.includes(".join-language-toggle button.active") &&
    styles.includes(".join-page-block[hidden]"),
  "Join page should provide a KOR-first segmented language toggle."
);
assert(
  styles.includes(".home-recruiting") &&
    styles.includes(".recruiting-strip") &&
    styles.includes("padding: 14px 0;") &&
    styles.includes("box-shadow: none;"),
  "Home recruiting strip should be thinner than the old card."
);
assert(
  styles.includes(".home-news-layout") &&
    styles.includes("grid-template-columns: 260px minmax(0, 1fr);") &&
    styles.includes(".home-news h2") &&
    styles.includes("font-size: 1.85rem;"),
  "Home Latest News heading and columns should be more compact."
);

const pages = {
  "index.html": index,
  "projects.html": projects,
  "people.html": people,
  "publications.html": publications,
  "album.html": album,
  "news.html": news,
  "contact.html": contact,
  "join.html": join,
  "calendar.html": calendar,
};

assert(
  projects.includes('data-source="all-research"'),
  "Projects page should request the full research catalog."
);
const researchPageTitles = [
  "Kitchen Robotic Manipulation utilizing Foundation Models",
  "TRAN-D: 2D Gaussian Splatting-based Sparse-view Transparent Object Depth Reconstruction via Physics Simulation for Scene Update",
  "Imaging radar and LiDAR Image Translation for 3-DOF Extrinsic Calibration",
  "Fieldscale: Locality-Aware Field-based Adaptive Rescaling for Thermal Infrared Image",
  "DiscoCal: Unbiased Estimator for Distorted Conics in Camera Calibration",
  "LodeStar: Maritime Radar Descriptor for Semi-Direct Radar Odometry",
  "TRansPose: Large-Scale Multispectral Dataset for Transparent Object",
  "Edge-guided Multi-domain RGB-to-TIR image Translation for Training Vision Tasks with Challenging Labels",
  "PrimA6D++: Ambiguity-Aware Multi-Object Pose Optimization for Visually-Assisted Robot Manipulation",
  "STheReO: Stereo Thermal Dataset for Research in Odometry and Mapping",
  "Measuring Prediction Reliabilty on 6D Object Pose Estimation",
  "PrimA6D: Rotational Primitive Reconstruction for Enhanced and Robust 6D Pose Estimation",
  "Dark Synthetic Vision: Lightweight Active Vision to Navigate in the Dark",
];
assert.deepStrictEqual(
  Array.from(siteData.projects, (item) => String(item.title)),
  researchPageTitles,
  "Research cards should match the Google Sites Research page only."
);
const researchPageAuthors = [
  "Myung-Hwan Jeon, Sankalp Yamsani, and Joohyung Kim",
  "Hyeonjae Gil, Myung-Hwan Jeon, and Ayoung Kim",
  "Sangwoo Jung, Hyesu Jang, Minwoo Jung, Ayoung Kim, and Myung-Hwan Jeon",
  "Hyeonjae Gil, Myung-Hwan Jeon, and Ayoung Kim",
  "Chaehyeon Song, Jaeho Shin, Myung-Hwan Jeon, Jongwoo Lim, and Ayoung Kim",
  "Hyesu Jang, Minwoo Jung, Myung-Hwan Jeon, and Ayoung Kim",
  "Myung-Hwan Jeon, Jeongyun Kim, Sangwoo Jung, Wooseong Yang, Minwoo Jung, Jaeho Shin, and Ayoung Kim",
  "Dong-Guw Lee, Myung-Hwan Jeon, Younggun Cho, and Ayoung Kim",
  "Myung-Hwan Jeon, Jeongyun Kim, Jee-Hwan Ryu, and Ayoung Kim",
  "Joowan Kim, Myung-Hwan Jeon, Younggun Cho, and Ayoung Kim",
  "Myung-Hwan Jeon and Ayoung Kim",
  "Myung-Hwan Jeon and Ayoung Kim",
  "Joowan Kim, Myung-Hwan Jeon, Younggun Cho, and Ayoung Kim",
];
assert.deepStrictEqual(
  Array.from(siteData.projects, (item) => String(item.authors)),
  researchPageAuthors,
  "Research card authors should match the Google Sites Research page exactly."
);
const youtubeByTitle = new Map(
  siteData.projects
    .filter((item) => item.youtubeHref)
    .map((item) => [item.title, item.youtubeHref])
);
[
  ["Kitchen Robotic Manipulation utilizing Foundation Models", "tYHywdV1Nvs"],
  [
    "TRAN-D: 2D Gaussian Splatting-based Sparse-view Transparent Object Depth Reconstruction via Physics Simulation for Scene Update",
    "R_Ixk3i_09g",
  ],
  ["Fieldscale: Locality-Aware Field-based Adaptive Rescaling for Thermal Infrared Image", "xe7sFsw655c"],
  ["DiscoCal: Unbiased Estimator for Distorted Conics in Camera Calibration", "87_R7Qkpczo"],
  ["LodeStar: Maritime Radar Descriptor for Semi-Direct Radar Odometry", "YRMNGUgaGSI"],
  [
    "Edge-guided Multi-domain RGB-to-TIR image Translation for Training Vision Tasks with Challenging Labels",
    "zq8Qh9ygm6w",
  ],
  [
    "PrimA6D++: Ambiguity-Aware Multi-Object Pose Optimization for Visually-Assisted Robot Manipulation",
    "akbI61jUJgY",
  ],
  ["Measuring Prediction Reliabilty on 6D Object Pose Estimation", "qSHd3oweD34"],
  ["PrimA6D: Rotational Primitive Reconstruction for Enhanced and Robust 6D Pose Estimation", "HbNmsmTLRmk"],
  ["Dark Synthetic Vision: Lightweight Active Vision to Navigate in the Dark", "XmmJBgy5PbQ"],
].forEach(([title, videoId]) => {
  assert(
    youtubeByTitle.get(title)?.includes(videoId),
    `${title} should use the YouTube video from the Google Sites Research page.`
  );
});
[
  ["Imaging radar and LiDAR Image Translation for 3-DOF Extrinsic Calibration", "assets/%EC%82%AC%EC%A7%84/isr.jpg"],
  ["TRansPose: Large-Scale Multispectral Dataset for Transparent Object", "assets/%EC%82%AC%EC%A7%84/transpose.jpg"],
  ["STheReO: Stereo Thermal Dataset for Research in Odometry and Mapping", "assets/%EC%82%AC%EC%A7%84/sthereo.jpg"],
].forEach(([title, imageSrc]) => {
  const project = siteData.projects.find((item) => item.title === title);
  assert.strictEqual(project?.imageSrc, imageSrc, `${title} should use its provided local teaser image.`);
  assert(
    fs.existsSync(path.join(root, decodeURIComponent(imageSrc))),
    `${imageSrc} should exist for the Research card.`
  );
});
assert(
  !script.includes("publicationToProject") &&
    !script.includes("project.tags") &&
    !script.includes('"tag-list"') &&
    !styles.includes(".tag-list"),
  "Research page should not add publication-derived cards or keyword chips."
);
assert(
  !script.includes('make("p", null, project.summary)'),
  "Research cards should not render descriptive summary paragraphs."
);
assert(
  script.includes('make("p", "card-kicker", project.venue)') &&
    script.includes("body.append(meta, title") &&
    !script.includes("make(\"p\", null, project.summary)"),
  "Research cards should restore short venue/year labels without showing long summaries."
);
assert(
  script.includes("projectLinkIconSrc") &&
    script.includes("assets/icon/pdf_b.png") &&
    script.includes("assets/icon/website_b.png") &&
    script.includes("assets/icon/youtube.png") &&
    script.includes("project-link-icon") &&
    styles.includes(".project-link-icon") &&
    fs.existsSync(path.join(root, "assets/icon/pdf_b.png")) &&
    fs.existsSync(path.join(root, "assets/icon/website_b.png")) &&
    fs.existsSync(path.join(root, "assets/icon/youtube.png")),
  "Research card links should render with icon assets instead of visible text labels."
);
assert(
  script.includes('link("", item.href, "project-link-icon")') &&
    script.includes('"project-media project-media-video"') &&
    script.includes("data-youtube-href") &&
    !script.includes("if (/youtube|video/i.test(item.label || \"\"))"),
  "Research card YouTube icons should open YouTube externally while media thumbnails play inline."
);
siteData.projects.forEach((item) => {
  assert(!("tags" in item), `${item.title} should not define keyword tags for cards.`);
});
assert(
  projects.includes("<title>Research | RAIV Lab</title>"),
  "The research portfolio page should be titled Research."
);
assert(
  !projects.includes("Research portfolio.") &&
    !projects.includes("Project cards collect lab research"),
  "Research page should not show the old top portfolio hero."
);
assert(
  projects.includes('data-render="page-title"') &&
    siteData.pages.projects.title === "Research" &&
    !projects.includes("<h2>Mission</h2>"),
  "Research page should render its page title from site.js instead of a hardcoded Mission heading."
);
assert(
  !projects.includes(
    "We aim to pioneer Vision-Based Embodied Intelligence, enabling next-generation robots to seamlessly adapt to complex and dynamic human environments."
  ) &&
    !projects.includes("Vision-Based Embodied Intelligence. We aim to pioneer vision-based embodied"),
  "Research page should not show the removed mission sentence."
);
assert(
  !projects.includes('<p class="eyebrow">Mission</p>'),
  "Research Mission section should not show the small Mission eyebrow."
);
[
  ["projects.html", "Research"],
  ["people.html", "Current Members"],
  ["publications.html", "Publications"],
  ["album.html", "Gallery"],
  ["news.html", "News"],
  ["contact.html", "Contact"],
  ["join.html", "Join Us"],
].forEach(([file, title]) => {
  const html = pages[file];
  assert(html.includes('class="section page-title-section"'), `${file} should use the shared simple page title template.`);
  const pageKey = path.basename(file, ".html");
  assert(html.includes('data-render="page-title"'), `${file} should render its page title from site.js.`);
  assert.strictEqual(siteData.pages[pageKey].title, title, `${file} should define a concise page title in site.js.`);
  assert(!html.includes("page-hero"), `${file} should not use the old hero template.`);
  assert(!html.includes("compact-hero"), `${file} should not use the old compact hero template.`);
  assert(!html.includes("section-muted"), `${file} should not use muted background sections.`);
  assert(!html.includes('<footer class="site-footer">'), `${file} should not show the footer.`);
  assert(!html.includes('class="eyebrow"'), `${file} should not show eyebrow labels in the basic page template.`);
});
assert(
  styles.includes(".page-title-section") &&
    styles.includes(".page-title-section {\n  padding: 34px 0;\n  border-bottom: 1px solid var(--line);") &&
    !styles.includes(".page-title-section .section-inner {\n  padding-bottom:") &&
    styles.includes(".page-title-section h1") &&
    styles.includes("background: #ffffff;"),
  "Subpage titles should sit vertically centered between the header line and full-width divider."
);
assert(
  people.includes('data-render="page-title"') &&
    siteData.pages.people.title === "Current Members" &&
    people.includes('class="faculty-box" data-render="faculty"') &&
    people.includes('class="member-divider"') &&
    people.includes('class="student-grid" data-render="people"') &&
    !people.includes("Lab Members") &&
    !people.includes('data-render="members"') &&
    !people.includes("member-list"),
  "People page should show a Faculty box, divider, and student card grid."
);
assert(
  script.includes("renderFaculty") &&
    script.includes("renderPeople") &&
    script.includes("renderMemberProfile") &&
    script.includes("renderStudentCard") &&
    script.includes("member-detail-list") &&
    script.includes("member-icon-link") &&
    script.includes("student-card") &&
    script.includes("imageSrc") &&
    styles.includes(".faculty-panel") &&
    styles.includes(".member-divider") &&
    styles.includes(".student-grid") &&
    styles.includes("grid-template-columns: repeat(5, minmax(0, 1fr));") &&
    styles.includes(".student-card") &&
    styles.includes(".member-photo img"),
  "People renderer should build a boxed faculty profile and boxed student cards."
);
assert(
  styles.includes(".student-card .member-photo img {\n  aspect-ratio: 1 / 1;\n  object-fit: contain;") &&
    styles.includes(".student-card .member-photo img") &&
    styles.includes("background: #ffffff;"),
  "Student card photos should fit inside their frame without cropping."
);
assert(
  script.includes('make("p", "student-role", person.role),\n      make("h3", null, person.name)') &&
    styles.includes(".student-card .member-photo {\n  width: 100%;\n  max-width: none;") &&
    styles.includes(".student-card .member-photo img {\n  aspect-ratio: 1 / 1;\n  object-fit: contain;") &&
    styles.includes(".student-role {\n  color: var(--teal);") &&
    styles.includes("font-size: 0.78rem;") &&
    styles.includes(".student-card h3 {\n  color: var(--ink);\n  font-size: 1.28rem;") &&
    styles.includes(".student-email {\n  margin-top: 4px;\n  overflow-wrap: anywhere;\n  color: var(--ink);") &&
    !styles.includes("min-height: 150px;"),
  "Student cards should use full-width square photos, prominent names, blue email text, and content-fit body height."
);
assert(
  script.includes('make("p", "faculty-label", "Faculty")') &&
    styles.includes(".faculty-label") &&
    styles.includes("color: var(--teal);") &&
    styles.includes("font-size: 1.05rem;") &&
    styles.includes(".member-profile-faculty h2") &&
    styles.includes("font-size: clamp(1.65rem, 2.5vw, 2.25rem);") &&
    !styles.includes(".faculty-panel .member-profile h2") &&
    styles.includes(".faculty-panel {\n  display: grid;\n  grid-template-columns: minmax(220px, 320px) minmax(0, 1fr);\n  gap: 36px;\n  align-items: stretch;\n  padding: 0;\n  overflow: hidden;") &&
    styles.includes(".faculty-panel .member-profile-body {\n  padding: 28px 30px 26px 0;") &&
    styles.includes(".faculty-panel .member-detail-list") &&
    styles.includes("font-size: 1.02rem;") &&
    styles.includes(".member-icon-link {\n  display: inline-flex;\n  width: 48px;\n  height: 48px;") &&
    styles.includes("border: 0;") &&
    styles.includes(".member-icon-link:hover {\n  background: var(--surface-2);"),
  "Faculty profile should show a teal Faculty label, smaller text, and borderless icon links."
);
assert(siteData.faculty.imageSrc, "Faculty should define a profile image.");
assert(fs.existsSync(path.join(root, siteData.faculty.imageSrc)), "Faculty profile image should exist.");
assert.strictEqual(
  JSON.stringify(siteData.faculty.links.map((item) => [item.label, item.href])),
  JSON.stringify([
    ["Scholar", "https://scholar.google.com/citations?user=ivOqySYAAAAJ&hl=en"],
    ["GitHub", "https://github.com/MyungHwanJeon"],
    ["LinkedIn", "https://www.linkedin.com/in/myung-hwan-jeon-544613219/"],
    ["CV", "https://drive.google.com/file/d/1L7OpdVD1cdZDKbX8sfDh40tDzGsJs8z3/view?usp=drive_link"],
    ["Calendar", "calendar.html"],
  ]),
  "Faculty icon links should match the approved profile links."
);
assert(
  calendar.includes("<title>Calendar | RAIV Lab</title>") &&
    calendar.includes('data-render="page-title"') &&
    calendar.includes('data-render="calendar"') &&
    siteData.pages.calendar.title === "Calendar" &&
    siteData.calendar.embedSrc === "https://calendar.google.com/calendar/embed?src=jmong1994%40gmail.com&ctz=Asia%2FSeoul" &&
    siteData.calendar.title === "RAIV Lab Google Calendar" &&
    script.includes("renderCalendar") &&
    script.includes("calendar-frame") &&
    !calendar.includes("Open Google Calendar") &&
    !calendar.includes("calendar-open-link") &&
    !calendar.includes('data-nav="calendar"') &&
    !calendar.includes(">Calendar</a>"),
  "Calendar page should be an internal hidden page with only an embedded Google Calendar."
);
assert(
  contact.includes("<title>Contact | RAIV Lab</title>") &&
    contact.includes('data-page="contact"') &&
    contact.includes('data-render="page-title"') &&
    contact.includes('class="section contact-section"') &&
    contact.includes('class="section-inner contact-layout" data-render="contact"') &&
    siteData.pages.contact.title === "Contact" &&
    siteData.contactPage.title === "Contact Information" &&
    siteData.contactPage.email === "mhjeon@kumoh.ac.kr" &&
    siteData.contactPage.phone === "+82-54-478-7454" &&
    typeof siteData.contactPage.addressKr === "string" &&
    siteData.contactPage.addressKr.includes("39177") &&
    siteData.contactPage.addressKr.includes("204") &&
    siteData.contactPage.addressEn ===
      "Room 204, Digital Hall, Kumoh National Institute of Technology, 61 Daehak-ro, Gumi, Gyeongbuk 39177, Korea" &&
    siteData.contactPage.mapEmbedSrc.includes("google.com/maps") &&
    siteData.contactPage.mapEmbedSrc.includes("output=embed") &&
    script.includes("const renderContact = () => {") &&
    script.includes("data.contactPage") &&
    script.includes('"contact-item"') &&
    script.includes("contact-map-frame") &&
    script.includes('["Email", contact.email]') &&
    !script.includes("mailto:mhjeon@kumoh.ac.kr") &&
    script.includes('["Phone", contact.phone]') &&
    !script.includes("tel:+82544787454") &&
    !script.includes("contact.phoneHref") &&
    styles.includes(".contact-layout {\n  display: grid;\n  grid-template-columns: 1fr;") &&
    /\.contact-info-panel \{\n  display: grid;\n  width: 100%;\n  gap: 20px;\n  padding: 0;\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n\}/.test(styles) &&
    /\.contact-info-panel \.contact-list \{\n  gap: 0;\n\}/.test(styles) &&
    styles.includes(".contact-item {\n  display: grid;\n  grid-template-columns: 160px minmax(0, 1fr);") &&
    styles.includes("border-bottom: 1px solid var(--line);") &&
    styles.includes(".contact-item:last-child {\n  border-bottom: 0;\n}") &&
    styles.includes(".contact-info-panel .contact-item dt {\n  color: var(--teal);") &&
    styles.includes(".contact-info-panel .contact-item dd {\n  margin: 0;") &&
    styles.includes(".contact-map-panel {\n  width: 100%;") &&
    styles.includes(".contact-map-frame") &&
    styles.includes("min-height: 430px;"),
  "Contact page should render a News-style contact information list above a full-width Google map from site.js."
);
assert(
  script.includes("renderEducationParts") &&
    script.includes("renderCareerParts") &&
    script.includes("affiliationLinks") &&
    script.includes("educationItems") &&
    script.includes("careerItems"),
  "Faculty profile renderer should preserve linked affiliation, education, and career text."
);
assert(
  script.includes('memberDetail("Past", renderCareerParts(member), "member-detail-past")') &&
    !script.includes('memberDetail("Past Career", renderCareerParts(member))'),
  "Faculty career label should read Past."
);
assert(
  script.includes('memberDetail("Past", renderCareerParts(member), "member-detail-past")') &&
    styles.includes(".member-detail-past {\n  white-space: nowrap;") &&
    styles.includes("@media (max-width: 820px)") &&
    styles.includes(".member-detail-past {\n    white-space: normal;"),
  "Faculty Past line should stay on one line on desktop and wrap normally on smaller screens."
);
assert(
  !siteData.people.some((person) => ["Jae-Min Park", "Sehun Park"].includes(person.name)),
  "Jae-Min Park and Sehun Park should be removed from current members."
);
assert(
  siteData.people.length >= 6,
  "People page should show the current student members after removals."
);
siteData.people.forEach((person) => {
  assert(person.imageSrc, `${person.name} should define a profile image.`);
  assert(fs.existsSync(path.join(root, person.imageSrc)), `${person.name} profile image should exist.`);
});
assert(
  script.includes("youtubeHref"),
  "Project renderer should support optional YouTube links."
);
assert(
  script.includes("renderProjectMedia") &&
    script.includes("renderProjectYoutube") &&
    script.includes("initProjectVideos") &&
    script.includes("youtubeEmbedSrc") &&
    script.includes("youtubeThumbnailSrc") &&
    script.includes("defaultResearchImage") &&
    script.includes('"button"') &&
    script.includes('"iframe"') &&
    script.includes("data-youtube-href") &&
    script.includes('"project-media project-media-video"') &&
    script.includes('"project-media project-media-image"'),
  "Research cards should play YouTube videos inline when present and render image media otherwise."
);
assert(
  styles.includes(".project-media") &&
    styles.includes("aspect-ratio: 16 / 9;") &&
    styles.includes(".project-media img") &&
    styles.includes(".project-media-video::after"),
  "Research card media should have a stable 16:9 visual area."
);
assert(
  script.includes("defaultResearchImage") &&
    script.includes("data.brand?.subpageLogoSrc") &&
    !script.includes("assets/research/"),
  "Research card fallback media should use an existing brand asset instead of missing generated SVGs."
);
assert(
  fs.existsSync(path.join(root, siteData.brand.subpageLogoSrc)),
  `${siteData.brand.subpageLogoSrc} should exist for Research card image fallbacks.`
);

assert(
  !publications.includes("card-kicker") &&
    !publications.includes('data-render="publication-status"') &&
    !script.includes("Showing all") &&
    !script.includes("Showing ${visibleItems.length}"),
  "Publications page should not show the filter label or publication count text."
);
const expectedPublications = [
  {
    year: 2025,
    title:
      "TRAN-D: 2D Gaussian Splatting-based Sparse-view Transparent Object Depth Reconstruction via Physics Simulation for Scene Update",
    authors:
      "Jeongyun Kim, Seunghoon Jeong, Giseop Kim, Myung-Hwan Jeon, Eunji Jun, and Ayoung Kim",
    venue: "IEEE/CVF International Conference on Computer Vision (ICCV), 2025",
    href: "https://arxiv.org/pdf/2507.11069",
  },
  {
    year: 2024,
    title: "Unbiased Estimator for Distorted Conic in Camera Calibration",
    authors: "Chaehyeon Song, Jaeho Shin, Myung-Hwan Jeon, Jongwoo Lim, and Ayoung Kim",
    venue: "IEEE/CVF Conference on Computer Vision and Pattern (CVPR) - Highlight, 2024",
    href: "https://arxiv.org/abs/2403.04583",
  },
  {
    year: 2024,
    title: "Imaging radar and LiDAR Image Translation for 3-DOF Extrinsic Calibration",
    authors: "Sangwoo Jung, Hyesu Jang, Minwoo Jung, Ayoung Kim, and Myung-Hwan Jeon",
    venue: "Intelligent Service Robotics (ISR), 2024",
    href:
      "https://link.springer.com/article/10.1007/s11370-023-00498-y?utm_source=rct_congratemailt&utm_medium=email&utm_campaign=oa_20240103&utm_content=10.1007%2Fs11370-023-00498-y",
  },
  {
    year: 2024,
    title: "LodeStar: Maritime Radar Descriptor for Semi-Direct Radar Odometry",
    authors: "Hyesu Jang, Minwoo Jung, Myung-Hwan Jeon, and Ayoung Kim",
    venue: "IEEE Robotics and Automation Letters (RA-Letters), 2024",
    href: "https://ieeexplore.ieee.org/document/10380692",
  },
  {
    year: 2024,
    title: "Fieldscale: Locality-Aware Field-based Adaptive Rescaling for Thermal Infrared Image",
    authors: "Hyeonjae Gil, Myung-Hwan Jeon, and Ayoung Kim",
    venue: "IEEE Robotics and Automation Letters (RA-Letters), 2024",
    href: "https://arxiv.org/pdf/2405.15395",
  },
  {
    year: 2024,
    title: "자율 주행에서 단일 센서 성능 향상을 위한 FMCW 스캐닝 레이더 노이즈 제거",
    authors: "양우성, 전명환, 김아영",
    venue: "로봇학회 논문지, 2024",
    href: "https://jkros.org/xml//37542/37542.pdf",
  },
  {
    year: 2024,
    title: "열화상 이미지 히스토그램의 가우시안 혼합 모델 근사를 통한 열화상-관성 센서 오도메트리",
    authors: "신재호, 전명환, 김아영",
    venue: "로봇학회 논문지, 2024",
    href: "https://jkros.org/xml//37541/37541.pdf",
  },
  {
    year: 2023,
    title: "Edge-guided multi-domain rgb-to-tir image translation for training vision tasks with challenging labels",
    authors: "Dong–Guw Lee, Myung-Hwan Jeon, Younggun Cho, and Ayoung Kim",
    venue: "IEEE International Conference on Robotics and Automation (ICRA), 2023",
    href: "https://arxiv.org/abs/2301.12689",
  },
  {
    year: 2023,
    title: "TRansPose: Large-scale multispectral dataset for transparent object",
    authors:
      "Myung-Hwan Jeon, Jeongyun Kim, Sangwoo Jung, Wooseong Yang, Minwoo Jung, Jaeho Shin, and Ayoung Kim",
    venue: "The International Journal of Robotics Research (IJRR), 2023",
    href: "https://journals.sagepub.com/doi/10.1177/02783649231213117",
  },
  {
    year: 2022,
    title: "Sthereo: Stereo thermal dataset for research in odometry and mapping",
    authors:
      "Seungsang Yun, Minwoo Jung, Jeongyun Kim, Sangwoo Jung, Younghun Cho, Myung-Hwan Jeon, Giseop Kim, and Ayoung Kim",
    venue: "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2022",
    href: "https://ieeexplore.ieee.org/document/9981857",
  },
  {
    year: 2022,
    title: "Data augmentation using image translation for underwater sonar image segmentation",
    authors: "Eon-ho Lee, Byungjae Park, Myung-Hwan Jeon, Hyesu Jang, Ayoung Kim, and Sejin Lee",
    venue: "Plos one, 2022",
    href: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0272602",
  },
  {
    year: 2022,
    title: "Ambiguity-Aware Multi-Object Pose Optimization for Visually-Assisted Robot Manipulation",
    authors: "Myung-Hwan Jeon, Jeongyun Kim, Jee-Hwan Ryu, and Ayoung Kim",
    venue: "IEEE Robotics and Automation Letters (RA-Letters), 2022",
    href: "https://arxiv.org/abs/2211.00960",
  },
  {
    year: 2022,
    title: "열화상 이미지 다중 채널 재매핑을 통한 단일 열화상 이미지 깊이 추정 향상",
    authors: "김정윤, 전명환, 김아영",
    venue: "로봇학회 논문지, 2022",
    href: "https://jkros.org/xml/33768/33768.pdf",
  },
  {
    year: 2020,
    title: "PrimA6D: Rotational Primitive Reconstruction for Enhanced and Robust 6D Pose Estimation",
    authors: "Myung-Hwan Jeon, and Ayoung Kim",
    venue: "IEEE Robotics and Automation Letters (RA-Letters), 2020",
    href: "https://arxiv.org/abs/2006.07789",
  },
  {
    year: 2020,
    title: "Dark Synthetic Vision: Lightweight Active Vision to Navigate in the Dark",
    authors: "Joowan Kim, Myung-Hwan Jeon, Younggun Cho, and Ayoung Kim",
    venue: "IEEE Robotics and Automation Letters (RA-Letters), 2020",
    href: "https://ieeexplore.ieee.org/document/9246220?denied=",
  },
  {
    year: 2019,
    title: "Underwater object detection and pose estimation using deep learning",
    authors: "Myung-Hwan Jeon, Yeongjun Lee, Young-Sik Shin, Hyesu Jang, and Ayoung Kim",
    venue: "IFAC-PapersOnLine, 2019",
    href: "https://www.sciencedirect.com/science/article/pii/S2405896319321718",
  },
  {
    year: 2019,
    title: "Multi-hand direct manipulation of complex constrained virtual objects",
    authors: "Jun-Sik Kim, Myung-Hwan Jeon, and Jung-Min Park",
    venue: "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2019",
    href: "https://ieeexplore.ieee.org/document/8968088",
  },
  {
    year: 2019,
    title: "강건한 CNN기반 수중 물체 인식을 위한 이미지 합성과 자동화된 Annotation Tool",
    authors: "전명환, 이영준, 신영식, 장혜수, 여태경, 김아영",
    venue: "로봇학회 논문지, 2019",
    href: "https://jkros.org/xml/26130/26130.pdf",
  },
];
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(siteData.publications)),
  expectedPublications,
  "Publication data should exactly match the current Google Sites source page."
);
assert(
  styles.includes(".publication-year") &&
    styles.includes("color: var(--teal);") &&
    !styles.includes(".publication-year {\n  color: var(--gold);"),
  "Publication years should use the RAIV teal accent instead of gold."
);
assert(
  script.includes("updatePublicationFilter"),
  "Publication filters should use a single state update function."
);
assert(
  script.includes("aria-pressed"),
  "Publication filter buttons should expose pressed state."
);

[
  "index.html",
  "projects.html",
  "people.html",
  "publications.html",
  "album.html",
  "news.html",
  "join.html",
  "calendar.html",
  "contact.html",
].forEach((file) => {
  const html = pages[file];
  assert(!html.includes('href="research.html"'), `${file} should not link to removed research.html.`);
  assert(!html.includes('data-nav="research"'), `${file} should not include the old research nav item.`);
  assert(html.includes('data-render="site-header"'), `${file} should render the shared header from site.js.`);
  assert(!html.includes('<nav id="site-nav"'), `${file} should not hardcode the navigation links.`);
  assert(!html.includes('src="assets/logo-symbol.png"'), `${file} should not hardcode the header logo image.`);
  assert(!html.includes(">Kumoh National Institute of Technology (KIT)</a>"), `${file} should not hardcode the top institution link.`);
});
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(siteData.navItems.map((item) => [item.key, item.label, item.href]))),
  [
    ["home", "Home", "index.html"],
    ["people", "People", "people.html"],
    ["projects", "Research", "projects.html"],
    ["publications", "Publications", "publications.html"],
    ["album", "Album", "album.html"],
    ["news", "News", "news.html"],
    ["contact", "Contact", "contact.html"],
  ],
  "Shared nav data should be Home, People, Research, Publications, Album, News, Contact, with Join hidden from nav."
);
assert(
  siteData.brand.logoSrc === "assets/logo-symbol.png" &&
    siteData.brand.subpageLogoSrc === "assets/logo-wordmark.png" &&
    siteData.brand.homeHref === "index.html" &&
    siteData.institution.universityLabel === "Kumoh National Institute of Technology (KIT)" &&
    siteData.institution.school === "School of Electronic Engineering" &&
    script.includes("renderHeader") &&
    script.includes('document.body.dataset.page === "home"') &&
    script.includes("brand.subpageLogoSrc") &&
    script.includes("brand-logo-wordmark") &&
    styles.includes(".brand-logo-wordmark") &&
    styles.includes("width: min(210px, 34vw);") &&
    styles.includes("width: min(1320px, 100%);") &&
    styles.includes("align-items: center;") &&
    styles.includes("height: 40px;") &&
    script.includes('data-render="site-header"'),
  "Header logo should use the symbol on Home and the wordmark on subpages from site.js."
);

assert(
  album.includes("<title>Album | RAIV Lab</title>") &&
    album.includes('data-page="album"') &&
    album.includes('data-render="page-title"') &&
    album.includes('class="album-grid" data-render="albums"') &&
    (album.match(/class="album-card"/g) || []).length === 0 &&
    siteData.pages.album.title === "Gallery" &&
    siteData.albums.length === 3 &&
    script.includes("renderAlbums"),
  "Album page should render its Gallery title and cards from site.js."
);
assert(
  siteData.albums[0].date === "2026.02.04-2026.02.06" &&
    siteData.albums[1].date === "2026.01.08-2026.01.27" &&
    siteData.albums[2].date === "2025.11.28",
  "Album data should be ordered newest first from left to right."
);
[
  ["assets/사진/앨범/전자공학회_추계학술대회_2025.jpg", "2025년 전자공학회 추계학술대회 참석", "2025.11.28"],
  ["assets/사진/앨범/구미고.jpg", "2026년 구미고등학교 프로그래밍 수업", "2026.01.08-2026.01.27"],
  ["assets/사진/앨범/KROC2026.jpg", "2026년 한국로봇종합학술대회 참석", "2026.02.04-2026.02.06"],
].forEach(([image, title, date]) => {
  const item = siteData.albums.find((albumItem) => albumItem.date === date);
  assert.strictEqual(item?.imageSrc, image, `Album data should use ${image}.`);
  assert.strictEqual(item?.title, title, `Album data should include ${title}.`);
});
assert(
  styles.includes(".album-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));") &&
    /\.album-card img \{\n  display: block;\n  width: 100%;\n  aspect-ratio: 4 \/ 3;\n  object-fit: contain;\n  background: #ffffff;\n\}/.test(styles) &&
    styles.includes(".album-date"),
  "Album page should use a three-card image grid with uncropped 4:3 photos and date styling."
);
assert(
  /@media \(max-width: 1040px\) \{[\s\S]*\.album-grid[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/.test(styles) &&
    /@media \(max-width: 680px\) \{[\s\S]*\.album-grid[\s\S]*grid-template-columns: 1fr;/.test(styles),
  "Album grid should collapse to two columns on tablet and one column on mobile."
);

assert(
  !fs.existsSync(path.join(root, "research.html")),
  "research.html should be removed."
);

console.log("site structure checks passed");
