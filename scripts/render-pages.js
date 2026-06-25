(function () {
  const site = window.raivSite;
  const { data, make, renderEach, link } = site;

  const renderAlbums = () => {
    renderEach('[data-render="albums"]', (target) => {
      (data.albums || []).forEach((album) => {
        const card = make("article", "album-card");
        const image = make("img");
        image.src = album.imageSrc;
        image.alt = album.imageAlt || album.title;
        image.loading = "lazy";
        image.decoding = "async";

        const body = make("div", "album-card-body");
        body.append(make("h2", null, album.title), make("p", "album-date", album.date));
        card.append(image, body);
        target.append(card);
      });
    });
  };

  const renderCalendar = () => {
    renderEach('[data-render="calendar"]', (target) => {
      if (!data.calendar?.embedSrc) return;
      const iframe = make("iframe", "calendar-frame");
      iframe.src = data.calendar.embedSrc;
      iframe.title = data.calendar.title || "Calendar";
      iframe.loading = "lazy";
      target.append(iframe);
    });
  };

  const renderRecruiting = () => {
    renderEach('[data-render="recruiting"]', (target) => {
      if (!data.recruiting) return;
      const status = data.recruiting.status || "open";
      const recruitingState = data.recruiting.states?.[status] || {};
      const state = { ...data.recruiting, ...recruitingState };
      if (state.hidden) {
        target.hidden = true;
        return;
      }
      const panel = make("div", "section-inner recruiting-panel recruiting-strip");
      const copy = make("p", "recruiting-copy", state.summary);
      panel.append(copy);
      if (state.ctaLabel && state.ctaHref) {
        panel.append(link(state.ctaLabel, state.ctaHref, "button button-primary"));
      }
      target.append(panel);
    });
  };

  const renderRecruitingDetail = () => {
    renderEach('[data-render="recruiting-detail"]', (target) => {
      if (!data.recruiting) return;
      const status = data.recruiting.status || "open";
      const state = { ...data.recruiting, ...(data.recruiting.states?.[status] || {}) };
      if (state.hidden) {
        target.hidden = true;
        return;
      }
      target.append(
        make("h2", null, data.recruiting.title),
        make("p", null, state.summary)
      );
      const list = make("ul", "clean-list");
      (data.recruiting.bullets || []).forEach((item) => list.append(make("li", null, item)));
      target.append(list);
      if (state.ctaLabel && state.ctaHref) {
        target.append(link(state.ctaLabel, state.ctaHref, "button button-primary"));
      }
    });
  };

  const renderJoinItems = (section) => {
    if (section.layout === "areas") {
      const grid = make("div", "join-area-grid");
      (section.items || []).forEach((item) => {
        const card = make("article", "join-area-card");
        card.append(make("h3", null, item.title));
        const list = make("ul", "clean-list join-mini-list");
        (item.bullets || []).forEach((bullet) => list.append(make("li", null, bullet)));
        card.append(list);
        grid.append(card);
      });
      return grid;
    }

    const listClass = section.layout === "positions" ? "join-position-list" : "clean-list";
    const list = make("ul", listClass);
    (section.items || []).forEach((item) => list.append(make("li", null, item)));
    return list;
  };

  const renderJoinPageBlock = (joinPage, className) => {
    const block = make("div", ["join-page-block", className].filter(Boolean).join(" "));
    block.append(make("h2", null, joinPage.title));
    (joinPage.intro || []).forEach((paragraph) => block.append(make("p", "join-lead", paragraph)));

    (joinPage.sections || []).forEach((section) => {
      const sectionNode = make("section", "join-section");
      sectionNode.append(make("h3", null, section.title));
      (section.paragraphs || []).forEach((paragraph) => sectionNode.append(make("p", null, paragraph)));
      if ((section.items || []).length) sectionNode.append(renderJoinItems(section));
      if (section.ctaHref && section.ctaLabel) {
        sectionNode.append(link(section.ctaLabel, section.ctaHref, "button button-primary"));
      }
      block.append(sectionNode);
    });

    return block;
  };

  const renderJoinLanguageToggle = () => {
    const toggle = make("div", "join-language-toggle");
    toggle.setAttribute("role", "group");
    toggle.setAttribute("aria-label", "Join page language");

    [
      ["ko", "KOR"],
      ["en", "ENG"],
    ].forEach(([lang, label]) => {
      const button = make("button", null, label);
      button.type = "button";
      button.dataset.joinLang = lang;
      toggle.append(button);
    });

    return toggle;
  };

  const setJoinLanguage = (target, lang) => {
    target.dataset.activeLanguage = lang;

    target.querySelectorAll("[data-join-lang]").forEach((button) => {
      const active = button.dataset.joinLang === lang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    target.querySelectorAll("[data-join-lang-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.joinLangPanel !== lang;
    });
  };

  const renderJoinPage = () => {
    renderEach('[data-render="join-page"]', (target) => {
      const joinPage = data.joinPage;
      if (!joinPage) return;

      const toggle = renderJoinLanguageToggle();
      const koreanBlock = joinPage.korean
        ? renderJoinPageBlock(joinPage.korean, "join-page-block-ko")
        : renderJoinPageBlock(joinPage, "join-page-block-en");
      koreanBlock.dataset.joinLangPanel = joinPage.korean ? "ko" : "en";

      target.replaceChildren();
      target.append(toggle, koreanBlock);

      if (joinPage.korean) {
        const englishBlock = renderJoinPageBlock(joinPage, "join-page-block-en");
        englishBlock.dataset.joinLangPanel = "en";
        target.append(englishBlock);
      }

      toggle.addEventListener("click", (event) => {
        const button = event.target.closest("[data-join-lang]");
        if (!button) return;
        setJoinLanguage(target, button.dataset.joinLang);
      });

      setJoinLanguage(target, "ko");
    });
  };

  const renderContact = () => {
    renderEach('[data-render="contact"]', (target) => {
      const contact = data.contactPage || data.contact;
      if (!contact) return;

      const panel = make("article", "contact-panel contact-info-panel");
      panel.append(make("h2", null, contact.title || "Contact Information"));

      const list = make("dl", "contact-list");
      [
        ["Email", contact.email],
        ["Phone", contact.phone],
        ["Address", contact.addressKr],
        ["Address", contact.addressEn],
      ].forEach(([term, description]) => {
        const item = make("div", "contact-item");
        const detail = make("dd");
        if (description instanceof Node) {
          detail.append(description);
        } else {
          detail.textContent = description;
        }
        item.append(make("dt", null, term), detail);
        list.append(item);
      });

      panel.append(list);
      target.append(panel);

      if (contact.mapEmbedSrc) {
        const mapPanel = make("div", "contact-map-panel");
        const iframe = make("iframe", "contact-map-frame");
        iframe.src = contact.mapEmbedSrc;
        iframe.title = contact.mapTitle || "RAIV Lab location";
        iframe.loading = "lazy";
        mapPanel.append(iframe);
        target.append(mapPanel);
      }
    });
  };

  Object.assign(site, {
    renderAlbums,
    renderCalendar,
    renderRecruiting,
    renderRecruitingDetail,
    renderJoinItems,
    renderJoinPageBlock,
    renderJoinLanguageToggle,
    setJoinLanguage,
    renderJoinPage,
    renderContact,
  });
})();
