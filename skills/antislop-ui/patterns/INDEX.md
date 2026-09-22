# Pattern Library Index

> Proven implementations extracted from the SMMAI landing page build.
> Each pattern is battle-tested, antislop-verified, and WCAG-checked.
> These are starting points, not copy-paste blocks — adapt them to the product.

---

## Patterns

| File | Replaces | Key rules |
|---|---|---|
| [`hero-dashboard-card.md`](hero-dashboard-card.md) | Generic 3D shapes, Spline embeds, fake terminal windows | R-22, R-19, R-13, R-32 |
| [`storytelling-pairs.md`](storytelling-pairs.md) | "How It Works" 3-step icon row, identical feature card grids | R-05, R-22 |
| [`css-visuals.md`](css-visuals.md) | Undraw/Storyset illustrations, generic 3D blobs, placeholder images | R-22, R-01 |
| [`highlights-strip.md`](highlights-strip.md) | "Trusted By" logo bars, invented stat card rows | R-17, R-38, R-09 |
| [`typography.md`](typography.md) | Default Inter/Geist fonts, pill badges above h1, inconsistent hierarchy | R-06, R-09 |
| [`border-glow.md`](border-glow.md) | Static card borders, generic hover fills, Glow Everywhere slop | R-13, R-19 |
| [`cta-band.md`](cta-band.md) | Scattered repeated CTAs, pages that end without a conversion moment | R-05, R-13 |
| [`scroll-reveal.md`](scroll-reveal.md) | AOS, GSAP ScrollTrigger, stacked entrance animations everywhere | R-19 |

---

## Full landing page section order (proven)

```
hero-section          ← split layout: text left, dashboard card right
story-section         ← 3 storytelling pairs (replaces step list)
highlights-strip      ← 4 real metrics (full-bleed band)
arch section          ← card grid with border glow
security section      ← 2×2 card grid (matte, no glow)
roadmap section       ← phase list with status badges
cta-band              ← full-bleed closing CTA with bookend glow
footer                ← wordmark + tagline
```

### Glow budget for this structure (R-13, max 2 elements)

| Element | Type | Position | Purpose |
|---|---|---|---|
| `.hero-section::before` | Radial ambient | Top-left behind h1 | Spatial anchor for the hero headline |
| `.cta-band::before` | Radial ambient | Bottom-center | Bookend: mirrors hero, signals page close |
| `.arch-grid .card` border | Conic pointer-tracking | On card hover | Interactive — signals card clickability |

The arch card border glow is interactive (not decorative), so it counts separately from the ambient glows. Both ambient glows have different positions and purposes — they do not duplicate each other. Total: 2 ambient + 1 interactive.

---

## Motion inventory (R-19 — all guarded by prefers-reduced-motion)

| Animation | Trigger | Element | Purpose |
|---|---|---|---|
| `[data-reveal]` fade+slide | IntersectionObserver | Body sections | Entrance: guides attention per section |
| Load reveal | `setTimeout 80ms` | Hero elements only | Hero content visible immediately (not scroll-gated) |
| `@keyframes dash-float` | Auto on page load | Dashboard card wrapper | Communicates the hero element is interactive |
| JS mouse tilt | `mousemove` (hover:hover only) | Dashboard card | 3D depth feedback to pointer position |
| Border glow rotation | `pointermove` | Arch card glow layer | Pointer lamp: signals card exploration |

---

## WCAG contrast reference (dark mode)

| Pair | Ratio | Use |
|---|---|---|
| `#f2f6f3` on `#070c09` | 18.07:1 | Primary text on background |
| `#718579` on `#070c09` | 5.01:1 | Muted text on background ← bumped from #637669 (4.06, FAIL) |
| `#059669` on `#070c09` | 5.23:1 | Primary colour on background (eyebrows) |
| `#059669` on `#0e1812` | 4.81:1 | Primary on panel (badges) |
| `#718579` on `#0e1812` | 4.61:1 | Muted on panel (card descriptions) |
| `#f2f6f3` on `#0e1812` | 16.62:1 | Text on panel (card titles) |
| `#718579` on `#0b1310` | 4.78:1 | Muted on surface (highlights strip) |
| `#f59e0b` on `#0e1812` | 8.44:1 | Amber accent on panel (roadmap badges) |
| `#60a5fa` on `#0e1812` | 7.13:1 | Blue on panel (upcoming badges) |

**Key lesson:** `#637669` (the "obvious" muted choice) fails at 4.06:1 on `#070c09`. Always test muted against the DEEPEST background, not the average dark.
