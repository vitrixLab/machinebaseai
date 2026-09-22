# Pattern: Typography System (Tokens, Eyebrow, Wordmark, Hierarchy)

> Extracted from: SMMAI landing page (smma/index.html)
> Covers: type scale, weight tokens, spacing tokens, eyebrow label, spaced-letter wordmark
> Antislop compliance: R-06 (font is a decision), R-09 (no pill badge above h1)

---

## Full Token Set

```css
:root {
  /* ── Font ─────────────────────────────────────────── */
  /* Plus Jakarta Sans: warm geometric, 400–800.
     Reason: rounder terminals than Inter, more human feel for a B2B SaaS
     product that wants "professional and trustworthy" (not "cold and technical").
     Loaded at 400/500/600/700/800. Inter/Geist avoided (R-06 default roster). */
  --font: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif;

  /* ── Type scale ───────────────────────────────────── */
  --text-xs:   0.75rem;    /* 12px — eyebrows, badges, nav links, footer wordmark */
  --text-sm:   0.875rem;   /* 14px — card descriptions, captions, button labels */
  --text-base: 1rem;       /* 16px — body copy */
  --text-md:   1.125rem;   /* 18px — card titles, step titles */
  --text-lg:   1.25rem;    /* 20px — featured card titles */
  --text-xl:   1.5rem;     /* 24px — secondary headings */
  --text-2xl:  2rem;       /* 32px — section h2 floor */
  --text-3xl:  2.75rem;    /* 44px — section h2 cap */
  --text-hero: clamp(2.75rem, 6vw, 5rem); /* Hero h1: 44px → 80px fluid */

  /* ── Weights ──────────────────────────────────────── */
  --weight-normal:   400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;
  --weight-black:    800; /* Hero h1, section h2, wordmark, story h3 */

  /* ── Line heights ─────────────────────────────────── */
  --lh-tight:   1.2;   /* Hero h1, display text */
  --lh-snug:    1.35;  /* Section h2, story h3 */
  --lh-normal:  1.55;  /* Most UI text */
  --lh-relaxed: 1.65;  /* Default body */
  --lh-loose:   1.75;  /* Lead paragraphs, descriptions */

  /* ── Letter spacing ───────────────────────────────── */
  --ls-wordmark: 0.38em;   /* Brand wordmark ONLY — spaced-letter identity */
  --ls-label:    0.1em;    /* Eyebrows, nav links (uppercase context) */
  --ls-tight:   -0.03em;   /* Hero h1 */
  --ls-snug:    -0.02em;   /* Section h2 */
  --ls-normal:   0;         /* Body copy */
}
```

---

## Six Hierarchy Levels

```
Level 1 — Hero headline    (--text-hero, --weight-black, --lh-tight, --ls-tight)
Level 2 — Section h2       (clamp --text-2xl–3xl, --weight-black, --lh-snug, --ls-snug)
Level 3 — Storytelling h3  (clamp --text-xl–2xl, --weight-black, --lh-snug, --ls-snug)
Level 4 — Card title       (--text-md, --weight-bold, --lh-snug)
Level 5 — Eyebrow / label  (--text-xs, --weight-bold, uppercase, --ls-label)
Level 6 — Body / desc      (--text-base, --weight-normal, --lh-loose, color: var(--muted))
```

### CSS for each level

```css
/* ── Level 1: Hero h1 ── */
.hero-content h1 {
  font-size: var(--text-hero);
  font-weight: var(--weight-black);
  line-height: var(--lh-tight);
  letter-spacing: var(--ls-tight);
  margin: 0 0 1.5rem;
}
/* Accent portion — colour the differentiator, not the whole headline */
.headline-accent {
  color: var(--primary);
  font-style: normal; /* override if inside <em> */
}

/* ── Level 2: Section h2 ── */
.section-head h2 {
  font-size: clamp(var(--text-2xl), 3.5vw, var(--text-3xl));
  font-weight: var(--weight-black);
  line-height: var(--lh-snug);
  letter-spacing: var(--ls-snug);
  margin: 0 0 .875rem;
}

/* ── Level 3: Storytelling h3 ── */
.story-text h3 {
  font-size: clamp(var(--text-xl), 2.5vw, var(--text-2xl));
  font-weight: var(--weight-black);
  line-height: var(--lh-snug);
  letter-spacing: var(--ls-snug);
  margin: 0 0 1rem;
  color: var(--text);
}

/* ── Level 4: Card title ── */
.card .title {
  font-size: var(--text-md);
  font-weight: var(--weight-bold);
  color: var(--text);
  margin: 0 0 .5rem;
  line-height: var(--lh-snug);
}

/* ── Level 5: Eyebrow label ── */
/* Plain text span — NOT a pill badge. No border, no dot, no background.
   The colour and uppercase treatment do the work. (R-09) */
.eyebrow {
  color: var(--primary);
  font-weight: var(--weight-bold);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--ls-label);
  margin-bottom: .875rem;
  display: block;
  line-height: var(--lh-normal);
}

/* ── Level 6: Body / description ── */
.card .desc,
.section-head p,
.story-text p,
.hero-content .lead {
  font-size: var(--text-base);
  font-weight: var(--weight-normal);
  color: var(--muted);
  line-height: var(--lh-loose);
  margin: 0;
}
/* Inline emphasis in lead: bring text back to --text without bold */
.lead span { color: var(--text); font-weight: var(--weight-medium) }
.lead strong { color: var(--text); font-weight: var(--weight-semibold) }
```

---

## Eyebrow Label

**The eyebrow is a plain text `<span>`, not a pill badge.**

```html
<!-- Correct -->
<span class="eyebrow">Social media AI &mdash; built for control</span>
<h2>Scale content. Keep the human gate.</h2>

<!-- Wrong: pill badge above h1 (R-09) -->
<div class="badge pill">Social media AI</div>
<h1>Scale content. Keep the human gate.</h1>
```

**Rules:**
- Single level above the heading it labels
- Colour = `var(--primary)`, no background, no border, no dot
- `text-transform: uppercase` only — no other decoration
- Content: the section's category or product claim. Never duplicate the heading below it.
- `display: block` with `margin-bottom` between it and the heading

---

## Spaced-Letter Wordmark

**When a brand name is a lettermark (spaced capitals), use these rules:**

```css
/* S M M AI wordmark — spaced-letter identity mark.
   Applied to: nav logo + footer wordmark ONLY.
   Never applied to section headings or body text.
   Reason: lettermark treatment signals precision and authority distinct from a
   regular word. (R-06, documented in DESIGN.md) */
.logo {
  font-weight: var(--weight-black);     /* 800 */
  letter-spacing: var(--ls-wordmark);   /* 0.38em */
  font-size: 1.05rem;                   /* slightly above --text-base */
  text-transform: uppercase;
  flex-shrink: 0;
  line-height: 1;
  /* Trailing letter-spacing creates visual gap — compensate with padding */
  padding-right: calc(var(--ls-wordmark) * 0.5);
}
/* Brand differentiator in accent colour — e.g. "AI" in "S M M AI" */
.logo .ai { color: var(--primary) }
```

```html
<!-- Nav wordmark -->
<a class="logo" href="#" aria-label="[BRAND] home">
  S M M <span class="ai">AI</span>
</a>

<!-- Footer wordmark — smaller size via inline override -->
<strong class="logo" style="font-size: var(--text-xs)">
  S M M <span class="ai">AI</span>
</strong>
```

**Rules for spaced-letter wordmarks:**
1. Applied to the brand name only — never to section headings, card titles, or eyebrows
2. Reason documented in `DESIGN.md` — not just "it looks cool"
3. The brand differentiator (the product type shorthand, e.g. "AI") coloured in `--primary`
4. `padding-right: calc(ls * 0.5)` to compensate trailing letter-spacing visual gap
5. `aria-label` on the `<a>` element with the brand name as a natural word (e.g. "SMMAI home"), not the spaced form

---

## Font Loading (Google Fonts)

```html
<!-- Preconnect before the link tag -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- Only load the weights you actually use (400/500/600/700/800) -->
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

**Swap font candidates:**
| Product personality | Font | Reason |
|---|---|---|
| Warm, modern, B2B | Plus Jakarta Sans | Rounder terminals, human feel |
| Clean, neutral, SaaS | DM Sans | Readable at small sizes, professional |
| Premium, editorial | General Sans | Confident, distinct |
| Technical, developer | IBM Plex Sans | System-adjacent, deliberate |
| Avoid (R-06 defaults) | Inter, Geist, Space Grotesk | Appear because they are defaults, not because they fit |

---

## Checklist before shipping

- [ ] Heading hierarchy is semantic: `h1` → `h2` → `h3` (no skipped levels, no div-headings)
- [ ] `--text-hero` uses `clamp()` for fluid scaling on every viewport
- [ ] `--weight-black` (800) is used for h1, h2, h3 and wordmark only — not body copy
- [ ] All `letter-spacing` values come from the token set, not bare `em` literals
- [ ] All `line-height` values come from the token set, not bare literals
- [ ] Eyebrow is a plain `<span class="eyebrow">`, not a pill badge (R-09)
- [ ] Wordmark letter-spacing is applied to the brand name only (R-06)
- [ ] `padding-right: calc(--ls-wordmark * 0.5)` compensates trailing gap on wordmark
- [ ] Font loaded with `display=swap` and only the weights used (performance)
- [ ] Muted text tested at ≥ 4.5:1 contrast against the deepest background in the palette
