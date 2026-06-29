(function () {
  const site = window.raivSite;
  const { data, make, renderEach, link, appendRichText } = site;

  const renderHeader = () => {
    renderEach('[data-render="site-header"]', (target) => {
      const institution = data.institution || {};
      const brand = data.brand || {};
      const isHomePage = document.body.dataset.page === "home";
      const institutionBar = make("div", "institution-bar");
      institutionBar.append(
        link(institution.universityLabel || institution.university || "", institution.universityHref || "#"),
        link(institution.school || "", institution.schoolHref || "#")
      );

      const navShell = make("div", "nav-shell");
      const brandLink = link("", brand.homeHref || "index.html", "brand");
      brandLink.setAttribute("aria-label", brand.ariaLabel || data.lab?.shortName || "Home");
      const logo = make("img");
      logo.className = isHomePage ? "brand-logo-symbol" : "brand-logo-wordmark";
      logo.src = isHomePage
        ? brand.logoSrc || "assets/logo-symbol.png"
        : brand.subpageLogoSrc || brand.logoSrc || "assets/logo-symbol.png";
      logo.alt = brand.logoAlt || data.lab?.shortName || "";
      brandLink.append(logo);

      const toggle = make("button", "nav-toggle");
      toggle.type = "button";
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-controls", "site-nav");
      toggle.append(make("span"), make("span"), make("span"), make("span", "sr-only", "Menu"));

      const nav = make("nav", "site-nav");
      nav.id = "site-nav";
      nav.setAttribute("aria-label", "Primary navigation");
      (data.navItems || []).forEach((item) => {
        const navLink = link(item.label, item.href, null);
        navLink.dataset.nav = item.key;
        nav.append(navLink);
      });

      navShell.append(brandLink, toggle, nav);
      target.append(institutionBar, navShell);
    });
  };

  const renderPageTitles = () => {
    renderEach('[data-render="page-title"]', (target) => {
      const page = target.dataset.page || document.body.dataset.page;
      const title = data.pages?.[page]?.title;
      if (title) target.textContent = title;
    });
  };

  const renderPageActions = () => {
    renderEach('[data-render="page-actions"]', (target) => {
      const page = target.dataset.page || document.body.dataset.page;
      const actions = data.pages?.[page]?.actions || [];
      if (!actions.length) {
        target.hidden = true;
        return;
      }

      actions.forEach((item) => {
        if (!item?.label || !item.href) return;
        const action = link("", item.href, "page-action-link");
        action.setAttribute("aria-label", item.label);
        action.title = item.label;
        if (item.iconSrc) {
          const icon = make("img");
          icon.src = item.iconSrc;
          icon.alt = "";
          icon.setAttribute("aria-hidden", "true");
          action.append(icon);
        }
        action.append(make("span", "sr-only", item.label));
        target.append(action);
      });
    });
  };

  const renderHomeHero = () => {
    renderEach('[data-render="home-hero"]', (target) => {
      const hero = data.pages?.home?.hero;
      if (!hero) return;

      const title = make("h1", "hero-title");
      title.id = "hero-title";
      title.append(make("span", "sr-only", hero.title || data.lab?.name || ""));
      const logo = make("img", "hero-brand-lockup");
      logo.src = hero.logoSrc;
      logo.alt = hero.logoAlt || "";
      if (!hero.logoAlt) logo.setAttribute("aria-hidden", "true");
      title.append(logo);

      const mission = make("p", "hero-mission");
      appendRichText(mission, hero.mission);
      target.append(title, mission);
    });
  };

  const renderSectionHeadings = () => {
    renderEach('[data-render="section-heading"]', (target) => {
      const section = data.pages?.home?.sections?.[target.dataset.section];
      if (!section) return;
      target.append(make("h2", null, section.title), link(section.linkLabel, section.href, "text-link"));
    });
  };

  const renderFacts = () => {
    renderEach('[data-render="facts"]', (target) => {
      (data.facts || []).forEach((fact) => {
        const item = make("div", "fact");
        item.append(make("strong", null, fact.value), make("span", null, fact.label));
        target.append(item);
      });
    });
  };

  const renderLinks = () => {
    renderEach('[data-render="links"]', (target) => {
      (data.links || []).forEach((item) => {
        target.append(link(item.label, item.href, "button button-secondary"));
      });
    });
  };

  const renderThemes = () => {
    renderEach('[data-render="themes"]', (target) => {
      (data.themes || []).forEach((theme) => {
        const card = make("article", "theme-card");
        card.append(
          make("p", "card-kicker", theme.kicker),
          make("h3", null, theme.title),
          make("p", null, theme.summary)
        );
        target.append(card);
      });
    });
  };

  Object.assign(site, {
    renderHeader,
    renderPageTitles,
    renderPageActions,
    renderHomeHero,
    renderSectionHeadings,
    renderFacts,
    renderLinks,
    renderThemes,
  });
})();
