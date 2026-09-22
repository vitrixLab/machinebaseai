# Pattern: CSS Visuals (Product-Accurate Illustrations, Zero Assets)

> Extracted from: SMMAI landing page (smma/index.html)
> Replaces: Undraw/Storyset illustrations, generic 3D blob characters, fake screenshots
> Antislop compliance: R-22 (connected to product), R-01 (no decoration without purpose)

---

## Principle

CSS visuals are built from HTML + the design token set. They are not "pretty decoration" — each one maps to a specific product concept. The connection between the visual and the concept is written in the code comment before the CSS.

Three visual types covered here:

| Type | Maps to | CSS technique |
|---|---|---|
| Stacked idea cards | AI generating multiple outputs | `position: absolute` + `rotate()` |
| Gate ring | Approval / validation step | `border-radius: 50%` + box-shadow layers |
| Platform grid | Multi-target / publish destinations | CSS grid + state-coded border colours |

All three: `aria-hidden="true"` on the container (content is in the sibling text column).

---

## Visual 1 — Stacked Idea Cards (AI Output)

**Maps to:** AI planning, content generation, drafts being created simultaneously.
**Why this works:** stacked + rotated cards read as "multiple things at once" — exactly what AI generation does. The middle card elevated (z-index + brighter border) shows the "best" result surfaced.

### HTML
```html
<!-- aria-hidden: concept explained in the sibling .story-text column -->
<div class="story-visual" aria-hidden="true">
  <div class="sv-ideas">
    <div class="sv-idea-card">
      <div class="sv-idea-dot">AI</div>
      <div class="sv-idea-body">
        <div class="sv-idea-title">[Content type] · [Platform]</div>
        <div class="sv-idea-meta">[Status label]</div>
      </div>
    </div>
    <div class="sv-idea-card">
      <div class="sv-idea-dot">AI</div>
      <div class="sv-idea-body">
        <div class="sv-idea-title">[Content type] · [Platform]</div>
        <div class="sv-idea-meta">[Status label]</div>
      </div>
    </div>
    <div class="sv-idea-card">
      <div class="sv-idea-dot">AI</div>
      <div class="sv-idea-body">
        <div class="sv-idea-title">[Content type] · [Platform]</div>
        <div class="sv-idea-meta">[Status label]</div>
      </div>
    </div>
  </div>
</div>
```

### CSS
```css
/* Stacked rotated cards — reads as "multiple AI outputs simultaneously" (R-22) */
.sv-ideas {
  position: relative;
  width: 100%;
  max-width: 360px;
  height: 270px;
}
.sv-idea-card {
  position: absolute;
  width: 88%;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--radius-medium, 8px);
  padding: .875rem 1rem;
  display: flex;
  align-items: center;
  gap: .75rem;
  box-shadow: 0 8px 24px rgba(0,0,0,.25);
}
/* Card 1: back-left, rotated slightly */
.sv-idea-card:nth-child(1) {
  top: 0; left: 6%;
  transform: rotate(-2.5deg);
  z-index: 1;
}
/* Card 2: middle, elevated — this is the "selected" output */
.sv-idea-card:nth-child(2) {
  top: 82px; left: 0;
  transform: rotate(.75deg);
  z-index: 3;
  border-color: rgba(5,150,105,.35); /* primary at 35% — signals selection */
  box-shadow: 0 8px 32px rgba(0,0,0,.3), 0 0 0 1px rgba(5,150,105,.12);
}
/* Card 3: front-right, slight tilt */
.sv-idea-card:nth-child(3) {
  top: 168px; left: 6%;
  transform: rotate(-1deg);
  z-index: 1;
}

/* Dot: "AI" label — abbreviation of the source, not decoration */
.sv-idea-dot {
  width: 30px; height: 30px;
  border-radius: 50%;
  background: var(--primary-light);
  color: var(--primary);
  display: grid;
  place-content: center;
  font-size: .6rem;
  font-weight: 800;
  flex-shrink: 0;
}
.sv-idea-body { min-width: 0 }
.sv-idea-title {
  font-size: .8rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.4;
}
.sv-idea-meta {
  font-size: .7rem;
  color: var(--muted);
  margin-top: .15rem;
}
```

### Adaptation guide
- Change the dot label to match your product ("AI", "→", "✦", or a product abbreviation)
- Rotate values: keep card 1 negative, card 2 near-zero, card 3 slightly negative — creates a natural "fanned" look
- Height of the container = (card height × 3) - (overlap × 2). For card height ~64px and overlap ~20px: 192 - 40 = 152px. Adjust `.sv-ideas { height }` to fit.
- On mobile, switch to a single card or reduce height: `@media (max-width: 540px) { .sv-ideas { height: 190px } }`

---

## Visual 2 — Gate Ring (Approval / Validation)

**Maps to:** human approval gate, validation checkpoint, "nothing passes without this".
**Why this works:** a circle with a ring is the universal "checkpoint" symbol. The layered box-shadow creates a glow that reads as "active" or "live" without using a pulsing animation (MOTION 1 compliance).

### HTML
```html
<div class="story-visual" aria-hidden="true">
  <div class="sv-gate">
    <div class="sv-gate-ring">
      <span class="sv-gate-check">&#10003;</span>  <!-- ✓ checkmark -->
    </div>
    <div class="sv-gate-label">[Gate label — e.g. "Human approval gate"]</div>
  </div>
</div>
```

### CSS
```css
/* Gate ring — the product's core approval metaphor, scaled to visual prominence.
   Layered box-shadow creates depth without animation (MOTION 1, R-19). (R-22) */
.sv-gate {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}
.sv-gate-ring {
  width: 152px; height: 152px;
  border-radius: 50%;
  border: 2px solid var(--primary);
  /* Three shadow layers: tight ring, soft ring, ambient glow */
  box-shadow:
    0 0 0 10px rgba(5,150,105,.08),
    0 0 0 20px rgba(5,150,105,.04),
    0 0 48px rgba(5,150,105,.18);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  position: relative;
}
.sv-gate-check {
  font-size: 2.75rem;
  line-height: 1;
  color: var(--primary);
  font-weight: 800;
}
.sv-gate-label {
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--primary);
}
```

### Adaptation guide
- Use `&#10003;` (✓) for approval, `&#8853;` (⊕) for addition/merge, `&#9711;` (○) for "pending", `&#9654;` (▶) for "trigger/run"
- Ring size: 120–180px. Below 120px the glow looks cheap; above 180px it dominates the text column.
- Glow intensity: multiply the third shadow's opacity by 1.5 for brighter brand colours, by 0.5 for softer palettes
- Remove the glow entirely for MOTION 0 / minimal energy builds: `box-shadow: 0 0 0 1px var(--primary)`

---

## Visual 3 — Platform Status Grid (Multi-Target Destinations)

**Maps to:** multi-platform publishing, integration targets, adapter status.
**Why this works:** a grid of named chips with colour-coded state (live/in-progress/upcoming) communicates both "where you can publish" and "what's built" simultaneously — eliminating the need for a separate status table.

### HTML
```html
<div class="story-visual" aria-hidden="true">
  <div class="sv-platforms">
    <!-- live = completed/active, wip = in progress, no class = planned -->
    <div class="sv-platform live">
      <div class="sv-platform-dot"></div>
      [Platform name]
    </div>
    <div class="sv-platform live">
      <div class="sv-platform-dot"></div>
      [Platform name]
    </div>
    <div class="sv-platform wip">
      <div class="sv-platform-dot"></div>
      [Platform name]
    </div>
    <div class="sv-platform wip">
      <div class="sv-platform-dot"></div>
      [Platform name]
    </div>
    <div class="sv-platform">
      <div class="sv-platform-dot"></div>
      [Platform name]
    </div>
    <div class="sv-platform">
      <div class="sv-platform-dot"></div>
      [Platform name]
    </div>
  </div>
</div>
```

### CSS
```css
/* Platform chips — state-coded border colours communicate build progress.
   live = brand primary (done), wip = secondary blue (in progress),
   no modifier = muted (planned). No invented metrics — real build state. (R-17, R-22) */
.sv-platforms {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: .625rem;
  width: 100%;
  max-width: 320px;
}
.sv-platform {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .625rem .875rem;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--radius-medium, 8px);
  font-size: .875rem;
  font-weight: 600;
  color: var(--muted);
}
/* State: live — completed adapter */
.sv-platform.live {
  border-color: rgba(5,150,105,.38); /* primary at 38% */
  color: var(--text);
}
/* State: wip — in progress */
.sv-platform.wip {
  border-color: rgba(37,99,235,.30); /* secondary blue at 30% */
  color: var(--text);
}
/* State indicator dot */
.sv-platform-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--line);
  flex-shrink: 0;
}
.sv-platform.live .sv-platform-dot { background: var(--primary) }
.sv-platform.wip  .sv-platform-dot { background: #60a5fa } /* or your secondary */
```

### Adaptation guide
- Grid columns: `repeat(2, 1fr)` for 6 items; `repeat(3, 1fr)` for 3 or 9 items
- States: add more by creating additional modifier classes with different `border-color` values
- Keep `color: var(--muted)` on planned items — lower contrast signals "not yet"
- Never add invented "coming soon" dates — state is enough (R-17)
- On mobile, switch to `repeat(2, 1fr)` even if you used 3 columns on desktop

---

## Shared: Mobile behaviour

All three visuals live inside `.story-visual`. On mobile (≤860px), the `.story-pair` stacks to single column and the visual appears below the text. No extra mobile CSS is needed for the visuals themselves — they are already `width: 100%` or `max-width`-constrained.

If a visual looks too large on small screens, add:
```css
@media (max-width: 540px) {
  .sv-ideas    { transform: scale(0.85); transform-origin: left center }
  .sv-gate-ring { width: 120px; height: 120px }
  .sv-platforms { max-width: 100% }
}
```
