(function () {
  const site = window.raivSite;
  const { data, make, renderEach, link, youtubeThumbnailSrc, renderProjectYoutube } = site;

  const defaultResearchImage = () => ({
    src: data.brand?.subpageLogoSrc || data.brand?.logoSrc || "assets/logo-lockup-wide.png",
    alt: data.brand?.logoAlt || data.lab?.shortName || "RAIV Lab",
  });

  const renderProjectMedia = (project) => {
    const youtubeThumbnail = youtubeThumbnailSrc(project.youtubeHref);
    const imageFallback = defaultResearchImage(project);
    const imageSrc = project.imageSrc || imageFallback.src;
    const imageAlt = project.imageAlt || imageFallback.alt;
    const image = make("img");

    image.src = youtubeThumbnail || imageSrc;
    image.alt = youtubeThumbnail ? `YouTube preview for ${project.title}` : imageAlt;
    image.loading = "lazy";
    image.decoding = "async";

    if (youtubeThumbnail) {
      const media = make("button", "project-media project-media-video");
      media.type = "button";
      media.dataset.youtubeHref = project.youtubeHref;
      media.dataset.youtubeTitle = project.title;
      media.setAttribute("aria-label", `Watch video: ${project.title}`);
      media.append(image, make("span", "project-media-label", "YouTube"));
      return media;
    }

    const media = make("figure", "project-media project-media-image");
    media.append(image);
    return media;
  };

  const projectKey = (item) => item.title.toLowerCase().replace(/\s+/g, " ").trim();

  const fullResearchCatalog = () => {
    const seen = new Set();
    const catalog = [];
    (data.projects || []).forEach((item) => {
      const key = projectKey(item);
      if (seen.has(key)) return;
      seen.add(key);
      catalog.push(item);
    });
    return catalog;
  };

  const videoResearchCatalog = () => fullResearchCatalog().filter((project) => project.youtubeHref);

  const projectLinks = (project) => {
    const items = [...(project.links || [{ label: project.linkLabel || "Link", href: project.href }])];
    if (project.youtubeHref) items.push({ label: "YouTube", href: project.youtubeHref });
    return items.filter((item) => item.href);
  };

  const projectLinkIconSrc = (label) => {
    const value = String(label || "").toLowerCase();
    if (value.includes("paper") || value.includes("pdf")) return "assets/icon/pdf_b.png";
    if (value.includes("youtube") || value.includes("video")) return "assets/icon/youtube.png";
    if (value.includes("github") || value.includes("code")) return "assets/icon/github_b.png";
    return "assets/icon/website_b.png";
  };

  const projectIconLink = (item) => {
    const anchor = link("", item.href, "project-link-icon");
    anchor.setAttribute("aria-label", item.label);
    anchor.title = item.label;

    const icon = make("img");
    icon.src = projectLinkIconSrc(item.label);
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");

    anchor.append(icon, make("span", "sr-only", item.label));
    return anchor;
  };

  const renderProjects = () => {
    renderEach('[data-render="projects"]', (target) => {
      const limit = Number.parseInt(target.dataset.limit || "", 10);
      let source = data.projects || [];
      if (target.dataset.source === "all-research") source = fullResearchCatalog();
      if (target.dataset.source === "video-research") source = videoResearchCatalog();
      const projects = source.slice(0, Number.isNaN(limit) ? undefined : limit);
      projects.forEach((project) => {
        const card = make("article", "project-card");
        const media = renderProjectMedia(project);
        const meta = make("p", "card-kicker", project.venue);
        const title = make("h3", null, project.title);
        const body = make("div", "project-body");
        body.append(meta, title, make("p", "project-authors", project.authors));

        const links = make("div", "project-links");
        projectLinks(project).forEach((item) => {
          links.append(projectIconLink({ ...item, title: project.title }));
        });

        card.append(media, body, links);
        target.append(card);
      });
    });
  };

  const initProjectVideos = () => {
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-youtube-href]");
      if (!trigger) return;

      const card = trigger.closest(".project-card");
      const media = card ? card.querySelector(".project-media") : trigger;
      const iframe = renderProjectYoutube(trigger.dataset.youtubeHref, trigger.dataset.youtubeTitle || "RAIV Lab video");
      if (!media || !iframe) return;

      const player = make("div", "project-media project-media-player");
      player.append(iframe);
      media.replaceWith(player);
    });
  };

  Object.assign(site, {
    defaultResearchImage,
    renderProjectMedia,
    fullResearchCatalog,
    videoResearchCatalog,
    projectLinks,
    projectLinkIconSrc,
    projectIconLink,
    renderProjects,
    initProjectVideos,
  });
})();
