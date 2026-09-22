# Pattern: Scroll Reveal (IntersectionObserver, Zero Dependencies)

> Extracted from: SMMAI landing page (smma/index.html)
> Stack: static HTML — no GSAP, no AOS, no ScrollMagic
> Antislop compliance: R-19 (motion serves purpose, documented), prefers-reduced-motion

---

## When to use this pattern

Use when:
- MOTION dial ≥ 1 and you want entrance animation on body sections
- The stack is static HTML or you don't want a motion library dependency
- You need staggered reveals on sibling cards within the same section

Do NOT use when:
- MOTION dial is 0 (no motion at all — remove all `data-reveal` attributes)
- React with Framer Motion is available (use `<motion.div>` variants instead — cleaner)
- Every single element on the page has `data-reveal` — motion becomes wallpaper (R-19)

---

## What it does

1. All `[data-reveal]` elements start at `opacity: 0; transform: translateY(28px)`
2. Hero elements reveal immediately on load (`setTimeout 80ms`) — not scroll-gated
3. Body section elements reveal when 12% visible via `IntersectionObserver`
4. `data-delay="1/2/3"` staggers siblings within the same section (0.12s per step)
5. Under `prefers-reduced-motion`, all elements are instantly `.revealed` — no motion

---

## CSS

```css
/* ── Scroll reveal ─────────────────────────────────────────────── */
/* Purpose: entrance animation that guides attention down the page
   one section at a time. Opacity + translateY ensures no layout shift.
   transform/opacity: GPU-composited, no layout work on every frame. (R-19) */
[data-reveal] {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .65s ease, transform .65s ease;
}
[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}

/* ── Stagger delays for sibling cards ── */
/* Use data-delay="1/2/3" on siblings within the same section.
   Each step = +0.12s. At MOTION dial 2, up to 3 steps is typical.
   More than 4 steps feels slow — consider reducing to 2. */
[data-reveal][data-delay="1"] { transition-delay: .12s }
[data-reveal][data-delay="2"] { transition-delay: .24s }
[data-reveal][data-delay="3"] { transition-delay: .36s }

/* ── prefers-reduced-motion: instant reveal, no translation ── */
/* Must be present. ~35% of users with vestibular disorders use this setting.
   Instant reveal (not hidden) because removing the element from the flow
   and then restoring it could cause layout jumps on screen readers. */
@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
    transition-delay: 0s;
  }
}
```

---

## JavaScript

```js
// ─── Scroll reveals — IntersectionObserver ─────────────────────────────────
// Purpose: entrance animation guides attention through the page section by
// section. Motion serves a UX role (attention guidance); it does not run
// on a loop, and it respects the user's prefers-reduced-motion setting. (R-19)
(function() {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('[data-reveal]');

  // Under prefers-reduced-motion: all elements instantly revealed
  if (reduceMotion) {
    els.forEach(function(el) { el.classList.add('revealed'); });
    return;
  }

  // Hero elements: reveal on load (not scroll-gated).
  // Reason: the hero is visible immediately — it should not wait for an
  // IntersectionObserver threshold that fires at 12% visibility. The hero
  // IS already visible; gating it creates a flash of invisible content.
  // Selector: adjust '.hero-inner' to match your hero wrapper class.
  document.querySelectorAll('.hero-inner [data-reveal]').forEach(function(el) {
    // 80ms delay: allows the page to paint first, avoids FOUC on slow connections
    setTimeout(function() { el.classList.add('revealed'); }, 80);
  });

  // Body section elements: IntersectionObserver at 12% threshold
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // unobserve after reveal: elements only animate once (R-19, no loops)
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,          // fires when 12% of element is visible
    rootMargin: '0px 0px -40px 0px'  // 40px bottom margin: fires slightly early
  });

  els.forEach(function(el) {
    // Skip hero elements already handled by setTimeout above
    if (!el.closest('.hero-inner')) {
      io.observe(el);
    }
  });
})();
```

---

## HTML usage

```html
<!-- Single element reveal -->
<div class="section-head" data-reveal>
  ...
</div>

<!-- Staggered siblings — same section, different delay classes -->
<article class="card" data-reveal>...</article>
<article class="card" data-reveal data-delay="1">...</article>
<article class="card" data-reveal data-delay="2">...</article>
<article class="card" data-reveal data-delay="3">...</article>

<!-- Hero elements: use data-reveal but NOT data-delay
     (they're handled by setTimeout, not IntersectionObserver) -->
<div class="hero-content" data-reveal>...</div>
<div class="hero-visual" data-reveal data-delay="2">...</div>
```

---

## Tuning guide

| Property | Current | Effect of change |
|---|---|---|
| `translateY(28px)` | 28px | Increase for dramatic entrance; reduce for subtle |
| `opacity + transform .65s` | 0.65s | Faster (0.4s) feels snappier; slower (0.9s) feels premium |
| `threshold: 0.12` | 12% visible | Higher threshold = fires later; lower = fires earlier |
| `rootMargin: -40px bottom` | 40px | Increase to fire earlier; remove for exact threshold |
| `transition-delay` step | 0.12s | Increase for more stagger; decrease for tighter groups |
| `setTimeout` delay | 80ms | Increase if FOUC occurs on slow connections |

---

## What NOT to reveal

Not every element needs `data-reveal`. Apply it to:
- Section heads (`div.section-head`)
- Story pairs (`div.story-pair`)
- Card grids — one `data-reveal` per card with stagger
- Highlights strip, CTA band inner

Do NOT apply it to:
- Navigation (always visible)
- Footer (below the fold, let it be static)
- Inline elements (`<strong>`, `<span>`, `<em>`)
- Any element that needs to be visible for layout purposes before scroll

---

## Checklist before shipping

- [ ] `@media (prefers-reduced-motion: reduce)` block sets `opacity: 1; transform: none; transition: none` (R-19)
- [ ] `reduceMotion` JS check instantly reveals all elements if true
- [ ] Hero elements use `setTimeout`, not `IntersectionObserver` (avoids scroll-gate on above-fold content)
- [ ] `.closest('.hero-inner')` (or your hero wrapper) correctly skips hero elements from IO
- [ ] `unobserve` called after reveal — elements animate once, not on every scroll pass
- [ ] No more than 3 stagger steps in a single section — beyond 3 the last card feels forgotten
- [ ] `data-reveal` is NOT on navigation, footer, or inline elements
- [ ] Total motion elements on the page pass the "choreographed, not wallpaper" test (R-19)
