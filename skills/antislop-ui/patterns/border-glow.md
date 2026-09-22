# Pattern: Border Glow (Pointer-Tracking Conic Gradient on Cards)

> Extracted from: SMMAI landing page — technique from horizonx.so/tools/border-glow
> Antislop compliance: R-13 (one section only), R-19 (interactive purpose)

---

## When to use this pattern

Use when:
- Cards are the primary discovery surface (architecture, pricing, features)
- You need to reward hover exploration without adding static decoration
- MOTION dial ≥ 1

Do NOT use when:
- Cards are secondary (security cards, roadmap items) — keep them matte
- The card already has other hover state (colour fill, scale) — don't stack effects
- R-13 dose cap is already used by a different glow element on the page

**Dose cap (R-13):** border glow is allowed on one section's cards only. On a page with a hero ambient glow + border glow, no other glow elements exist.

---

## HTML structure

```html
<!-- Apply to the card section that is the primary discovery surface -->
<div class="arch-grid">
  <article class="card" tabindex="0" role="article" aria-label="[Card label]">
    <!-- Two mandatory glow children — always first inside the card -->
    <div class="border-glow-layer" aria-hidden="true"></div>
    <div class="border-glow-inner" aria-hidden="true"></div>
    <!-- Card content sits above both -->
    <div class="title">[Title]</div>
    <p class="desc">[Description]</p>
  </article>
</div>
```

The glow layer (`border-glow-layer`) and mask layer (`border-glow-inner`) must be the first two children. All card content must sit above them via `z-index: 1`.

---

## CSS

```css
/* ── Cards in glow section: transparent border + background-clip ── */
/* border-color: transparent makes the real border invisible — the glow
   layer behind it becomes the visible border on hover. */
.arch-grid .card {
  border-color: transparent;
  background-clip: padding-box;
}

/* ── Glow layer: conic gradient rotated to pointer angle ── */
/* Sits at inset: -1px to bleed outside the card's padding-box,
   creating a 1px glowing border effect. */
.card .border-glow-layer {
  position: absolute;
  inset: -1px;
  border-radius: calc(var(--radius-medium, 8px) + 1px); /* match card + 1px overflow */
  pointer-events: none;
  background: conic-gradient(
    from calc(var(--bg-angle, 0deg) - 30deg) at 50% 50%,
    transparent 0deg,
    var(--primary) 60deg,      /* bright arc: 60deg wide */
    transparent 120deg
  );
  opacity: 0;
  transition: opacity .3s ease;
  z-index: 0;
}

/* ── Inner mask: covers the glow except the border ring ── */
/* Sits at inset: +1px to leave exactly 1px of glow visible as the border. */
.card .border-glow-inner {
  position: absolute;
  inset: 1px;
  border-radius: var(--radius-medium, 8px);
  background: var(--panel);
  transition: background .2s ease;
  z-index: 0;
}

/* ── Card content: above both glow layers ── */
.arch-grid .card > :not(.border-glow-layer):not(.border-glow-inner) {
  position: relative;
  z-index: 1;
}

/* ── Show glow on hover/focus ── */
.arch-grid .card:hover .border-glow-layer,
.arch-grid .card:focus-visible .border-glow-layer { opacity: 1 }
.arch-grid .card:hover .border-glow-inner { background: var(--surface) }
.arch-grid .card:focus-visible .border-glow-layer { opacity: 0.7 }
```

---

## JavaScript

```js
// ─── Border Glow — pointer-tracking conic gradient ─────────────────────────
(function() {
  // prefers-reduced-motion: skip all motion (glow stays at opacity 0, CSS handles)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.arch-grid .card').forEach(function(card) {
    var layer = card.querySelector('.border-glow-layer');
    if (!layer) return;

    card.addEventListener('pointermove', function(e) {
      var rect = card.getBoundingClientRect();
      // atan2: angle from card center to pointer, converted to degrees
      // +90 rotates so 0deg = top (12 o'clock), matching CSS conic-gradient convention
      var dx = e.clientX - (rect.left + rect.width  / 2);
      var dy = e.clientY - (rect.top  + rect.height / 2);
      var angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      layer.style.setProperty('--bg-angle', angle.toFixed(1) + 'deg');
    });

    card.addEventListener('pointerleave', function() {
      // Remove --bg-angle: CSS var falls back to 0deg (default in conic-gradient)
      layer.style.removeProperty('--bg-angle');
    });
  });
})();
```

---

## How the technique works

1. The card has `border-color: transparent` — no visible border at rest.
2. `.border-glow-layer` sits at `inset: -1px` behind the card content, filled with a `conic-gradient`. The gradient has a 60° bright arc (`var(--primary)`) and is otherwise transparent.
3. `--bg-angle` is updated via JS on `pointermove` to rotate the bright arc toward the pointer.
4. `.border-glow-inner` sits at `inset: +1px`, filled with `var(--panel)`. It masks everything except the 2px ring between `-1px` and `+1px` — that ring is the glowing border.
5. On hover, `.border-glow-layer` opacity transitions from 0 → 1. On leave, back to 0.

**Result:** a 1px glowing border arc that tracks the pointer around the card edge.

---

## Customisation

| Property | Effect |
|---|---|
| `60deg` arc width | Wider = broader glow; 40–90° is the usable range |
| `var(--primary)` | Glow colour — replace with any brand colour |
| `inset: -1px` / `+1px` | Border thickness — use `-2px`/`+2px` for a heavier border |
| `opacity: 0.7` on focus | Keyboard users see a dimmer glow (not zero — accessible) |
| `transition: opacity .3s ease` | Fade speed — `.2s` is snappier, `.4s` is softer |

---

## Checklist before shipping

- [ ] `border-glow-layer` and `border-glow-inner` are the first two children of the card
- [ ] Card content has `position: relative; z-index: 1` (via the `>:not(...)` selector)
- [ ] `.arch-grid .card` has `border-color: transparent; background-clip: padding-box`
- [ ] JS is guarded by `prefers-reduced-motion` check (R-19)
- [ ] Border glow is applied to one section only — not security cards, footer, nav (R-13)
- [ ] `aria-hidden="true"` on both glow divs
- [ ] Focus-visible state exists with reduced opacity (keyboard accessibility — R-32)
