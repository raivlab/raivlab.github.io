(function () {
  const site = window.raivSite;
  const { make } = site;

  const youtubeVideoId = (href) => {
    if (!href) return "";

    try {
      const url = new URL(href);
      const host = url.hostname.replace(/^www\./, "");
      if (host === "youtu.be") return url.pathname.split("/").filter(Boolean)[0] || "";
      if (host.endsWith("youtube.com")) {
        const watchId = url.searchParams.get("v");
        if (watchId) return watchId;
        const parts = url.pathname.split("/").filter(Boolean);
        if (["embed", "shorts", "live"].includes(parts[0])) return parts[1] || "";
      }
    } catch (error) {
      const match = href.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/);
      return match ? match[1] : "";
    }

    return "";
  };

  const youtubeThumbnailSrc = (href) => {
    const videoId = youtubeVideoId(href);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
  };

  const youtubeEmbedSrc = (href) => {
    const videoId = youtubeVideoId(href);
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : "";
  };

  const renderProjectYoutube = (href, title) => {
    const embedSrc = youtubeEmbedSrc(href);
    if (!embedSrc) return null;

    const iframe = make("iframe");
    iframe.src = embedSrc;
    iframe.title = `YouTube video: ${title}`;
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    return iframe;
  };

  Object.assign(site, {
    youtubeVideoId,
    youtubeThumbnailSrc,
    youtubeEmbedSrc,
    renderProjectYoutube,
  });
})();
