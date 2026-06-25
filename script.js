(function () {
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

  if (window.raivSite?.initNavigation) return;

  const currentScript = document.currentScript;
  const cacheSuffix = currentScript?.src.includes("?")
    ? currentScript.src.slice(currentScript.src.indexOf("?"))
    : "";

  const loadNext = (index) => {
    if (index >= scriptFiles.length) return;
    const script = document.createElement("script");
    script.src = `${scriptFiles[index]}${cacheSuffix}`;
    script.onload = () => loadNext(index + 1);
    document.head.append(script);
  };

  loadNext(0);
})();
