(function () {
  const site = window.raivSite;
  const {
    renderHeader,
    renderPageTitles,
    renderHomeHero,
    renderSectionHeadings,
    renderFacts,
    renderLinks,
    renderThemes,
    renderProjects,
    renderFaculty,
    renderPeople,
    renderPublicationFilters,
    renderPublications,
    renderNews,
    renderAlbums,
    renderCalendar,
    renderRecruiting,
    renderRecruitingDetail,
    renderJoinPage,
    renderContact,
    initProjectVideos,
    initPublicationFilters,
  } = site;

  const initNavigation = () => {
    const page = document.body.dataset.page;
    document.querySelectorAll("[data-nav]").forEach((item) => {
      const active = item.dataset.nav === page;
      item.classList.toggle("active", active);
      if (active) item.setAttribute("aria-current", "page");
    });

    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("#site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      document.body.classList.toggle("nav-open", !expanded);
    });
  };

  site.initNavigation = initNavigation;

  renderHeader();
  renderPageTitles();
  renderHomeHero();
  renderSectionHeadings();
  renderFacts();
  renderLinks();
  renderThemes();
  renderProjects();
  renderFaculty();
  renderPeople();
  renderPublicationFilters();
  renderPublications();
  renderNews();
  renderAlbums();
  renderCalendar();
  renderRecruiting();
  renderRecruitingDetail();
  renderJoinPage();
  renderContact();
  initProjectVideos();
  initPublicationFilters();
  initNavigation();
})();
