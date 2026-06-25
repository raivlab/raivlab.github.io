(function () {
  const site = window.raivSite;
  const { data, make, renderEach, link } = site;

  const profileIconSrc = (label) => {
    const value = String(label || "").toLowerCase();
    if (value.includes("scholar")) return "assets/icon/scholar_b.png";
    if (value.includes("github")) return "assets/icon/github_b.png";
    if (value.includes("linkedin")) return "assets/icon/linked_b.png";
    if (value.includes("calendar")) return "assets/icon/calender.png";
    if (value.includes("cv")) return "assets/icon/CV.png";
    if (value.includes("orcid")) return "assets/icon/orcid_b.png";
    if (value.includes("mail")) return "assets/icon/mail_b.png";
    return "assets/icon/website_b.png";
  };

  const memberDetail = (label, content, className) => {
    const item = make("li", className || null);
    if (label) item.append(make("strong", null, `${label}: `));
    if (Array.isArray(content)) {
      content.forEach((part) => item.append(part));
    } else if (content instanceof Node) {
      item.append(content);
    } else {
      item.append(document.createTextNode(content));
    }
    return item;
  };

  const memberPhoto = (member, isFaculty) => {
    const figure = make("figure", isFaculty ? "member-photo member-photo-faculty" : "member-photo");
    const image = make("img");
    image.src = member.imageSrc || "assets/logo-symbol.png";
    image.alt = member.imageAlt || member.name;
    image.loading = "lazy";
    image.decoding = "async";
    figure.append(image);
    return figure;
  };

  const memberIconLink = (item) => {
    const anchor = link("", item.href, "member-icon-link");
    anchor.setAttribute("aria-label", item.label);
    anchor.title = item.label;

    const icon = make("img");
    icon.src = profileIconSrc(item.label);
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");

    anchor.append(icon, make("span", "sr-only", item.label));
    return anchor;
  };

  const joinNodeGroups = (groups, separator) => {
    const nodes = [];
    groups.forEach((group, index) => {
      if (index) nodes.push(document.createTextNode(separator));
      nodes.push(...group);
    });
    return nodes;
  };

  const renderAffiliationParts = (member) => {
    const items = member.affiliationLinks || [];
    if (!items.length) return member.affiliation || "";
    return joinNodeGroups(
      items.map((item) => [link(item.label, item.href)]),
      ", "
    );
  };

  const renderEducationParts = (member) => {
    const items = member.educationItems || [];
    if (!items.length) return member.education || "";
    return joinNodeGroups(
      items.map((item) => [
        document.createTextNode(`${item.degree} (${item.year}, `),
        link(item.school, item.href),
        document.createTextNode(")"),
      ]),
      " / "
    );
  };

  const renderCareerParts = (member) => {
    const items = member.careerItems || [];
    if (!items.length) return member.career || "";
    return joinNodeGroups(
      items.map((item) => [
        document.createTextNode(`${item.role} (${item.years}, `),
        link(item.lab, item.labHref),
        document.createTextNode(" @"),
        link(item.institution, item.institutionHref),
        document.createTextNode(")"),
      ]),
      " / "
    );
  };

  const renderMemberProfile = (member, options = {}) => {
    const isFaculty = Boolean(options.faculty);
    const profile = make("article", isFaculty ? "faculty-panel member-profile member-profile-faculty" : "member-profile");
    const body = make("div", "member-profile-body");
    const details = make("ul", "member-detail-list");

    if (isFaculty) body.append(make("p", "faculty-label", "Faculty"));
    body.append(make("h2", null, member.name));

    if (isFaculty) {
      details.append(
        memberDetail(null, member.title),
        memberDetail(null, renderAffiliationParts(member)),
        memberDetail("Education", renderEducationParts(member)),
        memberDetail("Past", renderCareerParts(member), "member-detail-past"),
        memberDetail("Email", link(member.email, `mailto:${member.email}`))
      );
    } else {
      details.append(memberDetail(null, member.role), memberDetail(null, link(member.email, `mailto:${member.email}`)));
    }

    body.append(details);

    if ((member.links || []).length) {
      const links = make("div", "member-icon-links");
      member.links.forEach((item) => links.append(memberIconLink(item)));
      body.append(links);
    }

    profile.append(memberPhoto(member, isFaculty), body);
    return profile;
  };

  const renderStudentCard = (person) => {
    const card = make("article", "student-card");
    const body = make("div", "student-card-body");
    body.append(
      make("p", "student-role", person.role),
      make("h3", null, person.name),
      link(person.email, `mailto:${person.email}`, "student-email")
    );
    card.append(memberPhoto(person), body);
    return card;
  };

  const renderFaculty = () => {
    renderEach('[data-render="faculty"]', (target) => {
      if (data.faculty) {
        target.append(renderMemberProfile(data.faculty, { faculty: true }));
      }
    });
  };

  const renderPeople = () => {
    renderEach('[data-render="people"]', (target) => {
      (data.people || []).forEach((person) => {
        target.append(renderStudentCard(person));
      });
    });
  };

  Object.assign(site, {
    profileIconSrc,
    memberDetail,
    memberPhoto,
    memberIconLink,
    renderAffiliationParts,
    renderEducationParts,
    renderCareerParts,
    renderMemberProfile,
    renderStudentCard,
    renderFaculty,
    renderPeople,
  });
})();
