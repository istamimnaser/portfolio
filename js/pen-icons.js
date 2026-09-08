// Toggles .in-view on a section whenever it's on screen, which drives the
// stroke-draw CSS animation on its .pen-icon (see css/style.css). Toggling
// both ways (not just once) means the icon draws in on entry and redraws
// every time you scroll back to it.
(function () {
  const ids = [
    "education", "experience", "stack", "software", "hardware",
    "racing", "achievements", "media", "events", "hobbies", "github", "connect",
  ];
  if (!("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("in-view", entry.isIntersecting);
      });
    },
    { threshold: 0.35 }
  );

  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
})();
