# Project photos

Drop screenshots/photos here, one per project, then point that project's
card at it in `index.html` (and `projects.html` if it's shown there too).

Suggested filenames (matching the projects already on the site):
- autonomous-driving-stack.jpg
- cockpit-telemetry-display.jpg

## How to wire a photo in

Each project's clickable card in `index.html` looks like this:

```html
<button type="button" class="proj-row-visual"
  data-title="Autonomous Driving Stack"
  data-category="Embedded · FSAE"
  data-desc="..."
  data-tags="C++,Python,CAN bus">
  <div class="proj-row-teaser">...</div>
  <div class="proj-row-media">
    <div class="photo-card photo-card--wide">
      <svg><use href="#icon-image"/></svg>
      <span>Add project photo</span>
    </div>
  </div>
</button>
```

To swap in a real photo:

1. Add `data-image="assets/projects/autonomous-driving-stack.jpg"` to the
   `<button class="proj-row-visual">` — this is what the modal (the bigger
   popup view) uses.
2. Replace the placeholder `<div class="photo-card ...">` inside
   `.proj-row-media` with:
   ```html
   <div class="photo-card photo-card--wide photo-card--filled">
     <img src="assets/projects/autonomous-driving-stack.jpg" alt="Autonomous Driving Stack" loading="lazy" />
   </div>
   ```

Do the same in `projects.html` for any project shown there too.
