// Each numbered project row's screenshot/teaser (.proj-row-visual) opens a
// lightbox with the full project details instead of navigating away. Plain
// <a> tags (the "Show More Projects" button, GitHub links) are left alone.
(function () {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  const media = document.getElementById("pm-media");
  const img = document.getElementById("pm-image");
  const num = document.getElementById("pm-num");
  const tag = document.getElementById("pm-tag");
  const title = document.getElementById("pm-title");
  const desc = document.getElementById("pm-desc");
  const tagsWrap = document.getElementById("pm-tags");
  const live = document.getElementById("pm-live");
  const soon = document.getElementById("pm-soon");
  const github = document.getElementById("pm-github");

  const GITHUB_PROFILE = "https://github.com/istamimnaser";
  let lastFocused = null;

  function openModal(card, index) {
    const d = card.dataset;

    if (d.image) {
      img.src = d.image;
      img.alt = d.title || "";
      media.hidden = false;
    } else {
      media.hidden = true;
    }

    num.textContent = String(index + 1).padStart(2, "0");
    tag.textContent = d.category || "";
    tag.hidden = !d.category;
    title.textContent = d.title || "";
    desc.textContent = d.desc || "";

    tagsWrap.innerHTML = "";
    (d.tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((t) => {
        const span = document.createElement("span");
        span.className = "tech-tag-pill";
        span.textContent = t;
        tagsWrap.appendChild(span);
      });

    if (d.live) {
      live.href = d.live;
      live.hidden = false;
      soon.hidden = true;
    } else {
      live.hidden = true;
      soon.hidden = false;
    }
    if (d.hideGithub === "true") {
      github.hidden = true;
    } else {
      github.hidden = false;
      github.href = d.github || GITHUB_PROFILE;
    }

    lastFocused = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".project-modal-close").focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  const cards = Array.from(document.querySelectorAll(".proj-row-visual[data-title]"));
  cards.forEach((card, index) => {
    card.addEventListener("click", () => openModal(card, index));
  });

  modal.querySelectorAll("[data-close]").forEach((el) =>
    el.addEventListener("click", closeModal)
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
})();
