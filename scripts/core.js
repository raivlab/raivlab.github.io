(function () {
  const site = window.raivSite || (window.raivSite = {});
  const data = window.raivData || {};

  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = text;
    return element;
  };

  const renderEach = (selector, callback) => {
    document.querySelectorAll(selector).forEach((target) => callback(target));
  };

  const link = (label, href, className) => {
    const anchor = make("a", className, label);
    anchor.href = href;
    if (/^https?:\/\//.test(href)) {
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
    }
    return anchor;
  };

  const appendRichText = (target, parts = []) => {
    parts.forEach((part) => {
      if (!part || part.text === undefined) return;
      let node = document.createTextNode(part.text);
      if (part.accent) {
        const span = make("span");
        span.append(node);
        node = span;
      }
      if (part.strong) {
        const strong = make("strong");
        strong.append(node);
        node = strong;
      }
      target.append(node);
    });
  };

  const initials = (name) =>
    name
      .split(/\s|-/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  Object.assign(site, {
    data,
    make,
    renderEach,
    link,
    appendRichText,
    initials,
  });
})();
