(function () {
  const site = window.raivSite;
  const { data, make, renderEach } = site;

  const flattenNews = () => {
    if (Array.isArray(data.newsSections)) {
      return data.newsSections.flatMap((section) =>
        (section.items || []).map((item) => ({ ...item, section: section.title }))
      );
    }
    return data.news || [];
  };

  const sortNews = (items) =>
    [...items].sort((a, b) => String(b.sortDate || b.date).localeCompare(String(a.sortDate || a.date)));

  const renderNewsText = (item) => {
    const paragraph = make("p");
    const title = item.title || "";
    const names = [...(item.names || [])].filter(Boolean).sort((a, b) => b.length - a.length);
    let cursor = 0;

    while (cursor < title.length) {
      let match = null;
      names.forEach((name) => {
        const index = title.indexOf(name, cursor);
        if (index === -1) return;
        if (!match || index < match.index || (index === match.index && name.length > match.name.length)) {
          match = { index, name };
        }
      });

      if (!match) {
        paragraph.append(document.createTextNode(title.slice(cursor)));
        break;
      }
      if (match.index > cursor) {
        paragraph.append(document.createTextNode(title.slice(cursor, match.index)));
      }
      const strong = document.createElement("strong");
      strong.textContent = match.name;
      paragraph.append(strong);
      cursor = match.index + match.name.length;
    }

    return paragraph;
  };

  const renderNewsItem = (item) => {
    const row = make("li", "timeline-item");
    row.append(make("time", null, item.date), renderNewsText(item));
    return row;
  };

  const renderNews = () => {
    renderEach('[data-render="news"]', (target) => {
      const limit = Number.parseInt(target.dataset.limit || "", 10);
      if (target.classList.contains("news-sections") && Number.isNaN(limit) && Array.isArray(data.newsSections)) {
        data.newsSections.forEach((section) => {
          const sectionNode = make("section", "news-section");
          const list = make("ol", "timeline news-list-simple");
          sortNews(section.items || []).forEach((item) => list.append(renderNewsItem(item)));
          sectionNode.append(make("h2", null, section.title), list);
          target.append(sectionNode);
        });
        return;
      }

      sortNews(flattenNews())
        .slice(0, Number.isNaN(limit) ? undefined : limit)
        .forEach((item) => target.append(renderNewsItem(item)));
    });
  };

  Object.assign(site, {
    flattenNews,
    sortNews,
    renderNewsText,
    renderNewsItem,
    renderNews,
  });
})();
