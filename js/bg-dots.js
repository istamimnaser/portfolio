// Interactive checkered-flag background for the whole page. A fixed canvas
// tiling small squares in a checkerboard (the classic racing finish-line
// pattern) instead of a plain dot grid. The pattern sits almost invisible
// in the page's dark tones by default and only brightens — toward a plain
// black-and-white flag tone, not the site's accent colour — in a soft
// patch around the cursor.
(function () {
  const canvas = document.querySelector(".bg-flags");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = matchMedia("(hover: hover)").matches;

  const CELL = 30;
  const SQUARE = CELL * 0.6;
  const ALPHA_BASE = 0.035;
  const ALPHA_MAX = 0.38;
  const GLOW_RADIUS = 210;
  const EASE = 0.1;
  const COLOR_BASE = [0, 0, 0]; // full black flag square at rest
  const COLOR_HOT = [235, 235, 232]; // near-white flag square near the cursor

  let cells = [];
  let w = 0, h = 0, dpr = Math.min(devicePixelRatio || 1, 2);
  let mouse = { x: -9999, y: -9999, active: false };

  function buildGrid() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cols = Math.ceil(w / CELL) + 1;
    const rows = Math.ceil(h / CELL) + 1;
    cells = [];
    for (let iy = 0; iy < rows; iy++) {
      for (let ix = 0; ix < cols; ix++) {
        if ((ix + iy) % 2 !== 0) continue; // checkerboard: keep only alternating cells
        cells.push({ x: ix * CELL + CELL / 2, y: iy * CELL + CELL / 2, a: ALPHA_BASE, t: 0 });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i];
      let targetA = ALPHA_BASE;
      let targetT = 0;

      if (mouse.active) {
        const dx = c.x - mouse.x;
        const dy = c.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < GLOW_RADIUS) {
          const t = 1 - dist / GLOW_RADIUS;
          targetA = ALPHA_BASE + (ALPHA_MAX - ALPHA_BASE) * t;
          targetT = t;
        }
      }

      c.a += (targetA - c.a) * EASE;
      c.t += (targetT - c.t) * EASE;

      const cr = COLOR_BASE[0] + (COLOR_HOT[0] - COLOR_BASE[0]) * c.t;
      const cg = COLOR_BASE[1] + (COLOR_HOT[1] - COLOR_BASE[1]) * c.t;
      const cb = COLOR_BASE[2] + (COLOR_HOT[2] - COLOR_BASE[2]) * c.t;
      const size = SQUARE + c.t * 3;

      ctx.fillStyle = `rgba(${cr | 0}, ${cg | 0}, ${cb | 0}, ${c.a})`;
      ctx.fillRect(c.x - size / 2, c.y - size / 2, size, size);
    }
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  buildGrid();

  if (reduceMotion) {
    draw();
    window.addEventListener("resize", () => { buildGrid(); draw(); }, { passive: true });
    return;
  }

  if (canHover) {
    window.addEventListener("pointermove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });
    document.addEventListener("mouseout", (e) => {
      if (!e.relatedTarget) mouse.active = false;
    });
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildGrid, 150);
  }, { passive: true });

  requestAnimationFrame(loop);
})();
