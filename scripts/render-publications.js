(function () {
  const site = window.raivSite;
  const { data, make, renderEach, link } = site;

  const publicationYears = () => {
    return [...new Set((data.publications || []).map((item) => item.year))].sort((a, b) => b - a);
  };

  const renderPublicationFilters = () => {
    renderEach('[data-render="publication-filters"]', (target) => {
      const allButton = make("button", "filter-button active", "All");
      allButton.type = "button";
      allButton.dataset.year = "all";
      allButton.setAttribute("aria-pressed", "true");
      target.append(allButton);

      publicationYears().forEach((year) => {
        const button = make("button", "filter-button", String(year));
        button.type = "button";
        button.dataset.year = String(year);
        button.setAttribute("aria-pressed", "false");
        target.append(button);
      });
    });
  };

  const renderPublications = () => {
    renderEach('[data-render="publications"]', (target) => {
      (data.publications || []).forEach((publication) => {
        const item = make("article", "publication-item");
        item.dataset.year = String(publication.year);
        const year = make("span", "publication-year", String(publication.year));
        const title = link(publication.title, publication.href || "publications.html", "publication-title");
        const details = make("div", "publication-details");
        details.append(title, make("p", null, publication.authors), make("p", null, publication.venue));
        item.append(year, details);
        target.append(item);
      });
    });
  };

  const updatePublicationFilter = (year) => {
    const filters = document.querySelector('[data-render="publication-filters"]');
    const list = document.querySelector('[data-render="publications"]');
    if (!filters || !list) return;

    filters.querySelectorAll("button[data-year]").forEach((item) => {
      const active = item.dataset.year === year;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    const items = [...list.querySelectorAll(".publication-item")];
    items.forEach((item) => {
      const visible = year === "all" || item.dataset.year === year;
      item.hidden = !visible;
    });
  };

  const initPublicationFilters = () => {
    const filters = document.querySelector('[data-render="publication-filters"]');
    const list = document.querySelector('[data-render="publications"]');
    if (!filters || !list) return;

    filters.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-year]");
      if (!button) return;
      updatePublicationFilter(button.dataset.year);
    });

    updatePublicationFilter("all");
  };

  Object.assign(site, {
    publicationYears,
    renderPublicationFilters,
    renderPublications,
    updatePublicationFilter,
    initPublicationFilters,
  });
})();
