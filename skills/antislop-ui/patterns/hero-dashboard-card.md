# Pattern: Hero Dashboard Card (CSS 3D Focal Point)

> Extracted from: SMMAI landing page (smma/index.html)
> Purpose: premium hero focal point for approval/workflow SaaS — no WebGL, no dependencies
> Antislop compliance: R-01, R-13 (one glow element), R-19, R-22, R-32

---

## When to use this pattern

Use when:
- The product is an approval workflow, CRM, analytics, or any tool with a review/status concept
- The stack is static HTML (no React, no build step)
- You want Zyno-level 3D depth without a 3D asset or heavy library
- The hero needs a focal point that IS the product, not a generic 3D shape

Do NOT use when:
- The product has real screenshots or a Spline asset (use those instead — more authentic)
- The product concept cannot map onto an approval/status row layout
- React Three Fiber is available (use it for real 3D)

---

## Antislop purpose statement (write this in the code comment)

```
/* 3D Dashboard card — hero focal point.
   Purpose: demonstrates the product's core approval workflow in real UI terms.
   The card IS the product — showing real approval states (approved/pending/draft)
   is the most honest hero visual for a workflow product. (R-22, C-5)
   CSS perspective + JS tilt delivers Zyno-level depth without WebGL. (R-19)
   aria-hidden: all information is in the text column to the left. (R-32) */
```

---

## HTML structure

```html
<!-- aria-hidden: decorative product illustration, all content in sibling text -->
<div class="hero-visual" id="heroVisual" aria-hidden="true">
  <div class="dash-float-wrap">   <!-- CSS @keyframes float lives here -->
    <div class="dashboard-card" id="dashCard">  <!-- JS tilt lives here -->

      <div class="dash-header">
        <div class="dash-header-brand">[YOUR BRAND]</div>
        <div class="dash-status-pill">3 pending review</div>
      </div>

      <div class="dash-items">

        <!-- Row 1: Completed / approved state -->
        <div class="dash-item dash-item--approved">
          <div class="dash-item-icon">&#10003;</div>
          <div class="dash-item-body">
            <div class="dash-item-title">[Platform] · [Content type]</div>
            <div class="dash-item-sub">Approved by [Name] · 2 min ago</div>
          </div>
          <div class="dash-item-right">
            <span class="dash-badge dash-badge--live">Live</span>
          </div>
        </div>

        <!-- Row 2: Active / needs action (gets left accent bar) -->
        <div class="dash-item dash-item--pending">
          <div class="dash-item-icon">&#9711;</div>
          <div class="dash-item-body">
            <div class="dash-item-title">[Platform] · [Content type]</div>
            <div class="dash-item-sub">Awaiting human approval</div>
          </div>
          <div class="dash-item-right">
            <!-- tabindex="-1": decorative buttons, inside aria-hidden parent -->
            <button class="dash-approve-btn" tabindex="-1">Approve</button>
            <button class="dash-reject-btn" tabindex="-1">&#215;</button>
          </div>
        </div>

        <!-- Row 3: Draft / upcoming state -->
        <div class="dash-item dash-item--draft">
          <div class="dash-item-icon">&#8727;</div>
          <div class="dash-item-body">
            <div class="dash-item-title">[Platform] · [Content type]</div>
            <div class="dash-item-sub">AI draft ready</div>
          </div>
          <div class="dash-item-right">
            <span class="dash-badge dash-badge--draft">Draft</span>
          </div>
        </div>

      </div>

      <!-- Stats footer: REAL metrics only, no invented deltas (R-17) -->
      <div class="dash-footer">
        <div class="dash-stat">
          <strong>[N]</strong>
          [metric]
        </div>
        <div class="dash-stat">
          <strong>[N]</strong>
          [metric]
        </div>
      </div>

    </div>
  </div>
</div>
```

---

## CSS

```css
/* ── Hero visual container — sets up the perspective space ── */
.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1100px;
  perspective-origin: 50% 45%;
}

/* ── Float wrapper — translateY animation ONLY (never mix with JS tilt below) ── */
/* Separation is required: CSS @keyframes and JS style.setProperty on the same
   transform will fight. The float wrapper holds the vertical oscillation;
   the card holds the JS-driven rotateX/rotateY. */
.dash-float-wrap {
  animation: dash-float 7s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .dash-float-wrap { animation: none }
}
@keyframes dash-float {
  0%, 100% { transform: translateY(0) }
  50%       { transform: translateY(-14px) }
}

/* ── Dashboard card — receives JS --rx / --ry tilt custom properties ── */
.dashboard-card {
  width: 380px;               /* adjust to your layout */
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--radius-large, 16px);
  overflow: hidden;
  transform: rotateX(var(--rx, 6deg)) rotateY(var(--ry, -14deg));
  transform-style: preserve-3d;
  transition: transform .1s ease;
  box-shadow:
    0 48px 96px rgba(0,0,0,0.55),
    0 0 0 1px rgba(5,150,105,0.14),   /* replace with your primary color */
    inset 0 1px 0 rgba(255,255,255,0.04);
  will-change: transform;
  position: relative;
}
/* Gloss stripe — simulates top-light source for physical depth */
.dashboard-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(255,255,255,0.03) 0%, transparent 40%);
  pointer-events: none;
  z-index: 10;
  border-radius: inherit;
}

/* ── Header ── */
.dash-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .875rem 1rem;
  border-bottom: 1px solid var(--line);
  background: var(--surface);
}
.dash-status-pill {
  font-size: .6rem;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--primary);
  background: var(--primary-light);
  padding: .2em .6em;
  border-radius: 999px;
}

/* ── Row base ── */
.dash-items { padding: .5rem 0 }
.dash-item {
  display: flex;
  align-items: flex-start;
  gap: .75rem;
  padding: .625rem 1rem;
  position: relative;
}
.dash-item + .dash-item { border-top: 1px solid var(--line) }

/* Active row: left accent bar (state indicator, not decoration — R-01, R-31) */
.dash-item--pending {
  background: rgba(5,150,105,0.05); /* your primary at low opacity */
}
.dash-item--pending::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: var(--primary); /* brand primary — marks "requires action" */
}

/* ── State icons ── */
.dash-item-icon {
  width: 28px; height: 28px;
  border-radius: 50%;
  flex-shrink: 0;
  display: grid;
  place-content: center;
  font-size: .7rem;
}
.dash-item--approved .dash-item-icon { background: var(--primary-light); color: var(--primary) }
.dash-item--pending  .dash-item-icon { background: rgba(5,150,105,.15); color: var(--primary) }
.dash-item--draft    .dash-item-icon { background: rgba(107,127,115,.12); color: var(--muted) }

/* ── Row body ── */
.dash-item-body { flex: 1; min-width: 0 }
.dash-item-title {
  font-size: .7rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: .15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dash-item-sub { font-size: .625rem; color: var(--muted) }
.dash-item-right { flex-shrink: 0; display: flex; align-items: center; gap: .375rem }

/* ── Badges ── */
.dash-badge {
  font-size: .575rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  padding: .2em .55em;
  border-radius: 3px;
}
.dash-badge--live  { background: var(--primary-light); color: var(--primary) }
.dash-badge--draft { background: rgba(107,118,105,.12); color: var(--muted) }

/* ── Action buttons (decorative — inside aria-hidden, tabindex -1) ── */
.dash-approve-btn, .dash-reject-btn {
  font-size: .575rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: .25em .6em;
  border-radius: 3px;
  border: 1px solid;
  cursor: default;
  letter-spacing: .04em;
}
.dash-approve-btn { background: var(--primary); color: var(--bg); border-color: var(--primary) }
.dash-reject-btn  { background: transparent; color: var(--muted); border-color: var(--line) }

/* ── Footer stats ── */
.dash-footer {
  display: flex;
  gap: 1rem;
  padding: .625rem 1rem;
  border-top: 1px solid var(--line);
  background: var(--surface);
}
.dash-stat { font-size: .625rem; color: var(--muted) }
.dash-stat strong { font-size: .75rem; font-weight: 800; color: var(--primary); display: block }

/* ── Mobile: disable 3D, show flat card ── */
@media (max-width: 860px) {
  .hero-visual { perspective: none }
  .dashboard-card {
    width: 100%;
    max-width: 400px;
    transform: none;
    box-shadow: 0 24px 48px rgba(0,0,0,.4), 0 0 0 1px rgba(5,150,105,.12);
  }
}
```

---

## JavaScript

```js
// ─── Hero 3D mouse tilt ─────────────────────────────────────────────────────
(function() {
  // Guard 1: prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Guard 2: hover:hover + pointer:fine — skips touch screens and styluses
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var visual = document.getElementById('heroVisual');
  var card   = document.getElementById('dashCard');
  if (!visual || !card) return;

  visual.addEventListener('mousemove', function(e) {
    var rect = visual.getBoundingClientRect();
    // Normalise pointer to -1…+1 relative to container center
    var nx = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
    var ny = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);
    // ±10deg on Y-axis, ±6deg on X-axis, from resting position
    card.style.setProperty('--rx', (6  + ny * -6 ).toFixed(2) + 'deg');
    card.style.setProperty('--ry', (-14 + nx *  10).toFixed(2) + 'deg');
  });

  visual.addEventListener('mouseleave', function() {
    // Return to resting rotation
    card.style.setProperty('--rx', '6deg');
    card.style.setProperty('--ry', '-14deg');
  });
})();
```

---

## Customisation guide

| Property | What to change |
|---|---|
| Card width | `.dashboard-card { width: Npx }` (360–440px works well) |
| Resting rotation | `var(--rx, 6deg)` and `var(--ry, -14deg)` — tilt away from text column |
| Tilt range | `ny * -6` and `nx * 10` — keep under ±12deg or it looks unstable |
| Float height | `translateY(-14px)` — reduce on small cards |
| Float speed | `7s` — slow is premium; fast is anxious |
| Glow colour | Replace `rgba(5,150,105,...)` with your primary RGB |
| Number of rows | 2–4 rows; 3 is the sweet spot for showing variety without crowding |
| Row states | Approved / Pending / Draft covers the most common workflow triad |
