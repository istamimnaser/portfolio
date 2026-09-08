// Nav scroll state + mobile toggle, scroll-reveal, footer year, copy-to-clipboard.
(function () {
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  // The hero background photo animates out on the very first scroll input
  // (rather than fading gradually with scroll distance), revealing the
  // fixed checkered pattern right away. Scrolling back to the top brings it
  // back the same way.
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    const updateHeroFade = () => {
      heroBg.classList.toggle("is-hidden", window.scrollY > 4);
    };
    updateHeroFade();
    window.addEventListener("scroll", updateHeroFade, { passive: true });
  }

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const clockEl = document.getElementById("nav-clock-time");
  if (clockEl) {
    const updateClock = () => {
      clockEl.textContent = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour: "numeric",
        minute: "2-digit",
      });
    };
    updateClock();
    setInterval(updateClock, 15000);
  }

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  const navAnchors = navLinks ? Array.from(navLinks.querySelectorAll("a")) : [];
  const spySections = navAnchors
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);
  if ("IntersectionObserver" in window && spySections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const link = navAnchors.find((a) => a.getAttribute("href") === "#" + entry.target.id);
          if (!link) return;
          navAnchors.forEach((a) => a.classList.remove("active"));
          link.classList.add("active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    spySections.forEach((el) => spy.observe(el));
  }

  const toast = document.getElementById("toast");
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.innerHTML = `<svg><use href="#icon-check"/></svg>${message}`;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  document.querySelectorAll("[data-value]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-value");
      try {
        await navigator.clipboard.writeText(value);
        showToast("Copied " + value);
      } catch (e) {
        showToast(value);
      }
    });
  });
})();
