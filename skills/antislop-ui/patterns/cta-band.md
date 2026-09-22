# Pattern: Closing CTA Band (Full-Bleed Page Closer)

> Extracted from: SMMAI landing page (smma/index.html)
> Replaces: repeated CTA buttons scattered through the page, or no explicit closing CTA
> Antislop compliance: R-05 (purposeful structure), R-13 (second ambient glow — bookend role)

---

## When to use this pattern

Use when:
- The page has a primary conversion action (sign up, explore, install, try)
- The last content section before the footer is informational (roadmap, docs, architecture)
- You need a visual full stop after the informational content

Do NOT use when:
- The page already ends with a strong interactive section (pricing grid with CTAs, a contact form)
- The product has no clear single primary action
- The page is very short (<4 sections) — a footer CTA link is sufficient

---

## Relationship to the hero

The closing CTA band is the bookend to the hero:
- **Hero:** ambient glow top-left, conversion CTA in the text column
- **CTA band:** ambient glow bottom-center, single CTA centred

Same brand primary colour, different position. The two glows bracket the page. Together they are the two allowed ambient glows under R-13.

---

## HTML

```html
<!-- aria-label identifies this landmark as the conversion destination -->
<section class="cta-band" aria-label="Get started with [Product]">
  <div class="wrap cta-band-inner" data-reveal>
    <h2>[Bold, declarative call to action — 6-10 words]</h2>
    <p>[One sentence: the key reassurance or value reminder]</p>
    <a class="btn primary" href="[URL]" target="_blank" rel="noopener">
      [Single CTA label]
    </a>
  </div>
</section>
```

**Copy rules:**
- `h2`: declarative, not a question. "Start automating your social media" not "Ready to automate?" — questions invite hesitation. Exception: the question form works if the answer is unambiguously yes.
- `p`: one sentence maximum. Restate the single biggest objection you're addressing, or the single biggest value claim you want to leave them with.
- CTA label: 2–4 words. Specific action ("Explore the repository", "Start for free", "Book a demo") — not generic ("Get started", "Learn more").

---

## CSS

```css
/* ── Closing CTA band ────────────────────────────────────────── */
/* Full-bleed --panel background, top border line separates it
   from the roadmap above. The bottom-center ambient glow is the
   bookend glow: mirrors the hero's top-left glow to close the page.
   (R-13: two allowed ambient glows — hero top-left + cta bottom-center) */
.cta-band {
  background: var(--panel);
  border-top: 1px solid var(--line);
  padding: 7rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Bookend ambient glow — bottom-center, mirrors hero glow (R-13)
   Write the reason: different position, different spatial role.
   Hero glow = spatial anchor for the h1.
   CTA glow = visual weight under the single CTA, signals page close. */
.cta-band::before {
  content: '';
  position: absolute;
  bottom: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 70%;
  background: radial-gradient(
    ellipse at 50% 100%,
    rgba(5,150,105,0.08) 0%,   /* replace with your primary RGB at 8% */
    transparent 65%
  );
  pointer-events: none;
}

/* Content sits above the glow */
.cta-band-inner {
  position: relative;
  z-index: 1;
}

/* Heading: same weight as section h2, slightly larger */
.cta-band h2 {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.35;
  margin: 0 0 1rem;
  color: var(--text);
}

/* Subtext: de-emphasised, keeps focus on the CTA button */
.cta-band p {
  font-size: 1.125rem;
  color: var(--muted);
  margin: 0 0 2.5rem;
  line-height: 1.55;
}

/* ── Mobile ── */
@media (max-width: 540px) {
  .cta-band { padding: 5rem 0 }
  .cta-band h2 { font-size: clamp(1.75rem, 6vw, 2rem) }
}
```

---

## Page position

```
... (roadmap or last informational section)

[cta-band]   ← this pattern

[footer]     ← wordmark + tagline only, no CTA repeated
```

The footer does NOT repeat the CTA. The CTA band is the conversion moment; the footer is identification only (brand name, tagline, legal if needed).

---

## Light mode note

In light mode, `--panel` becomes `#ffffff` — the band will be white. If you want the band to stand out on a light page, set an explicit background:

```css
html.light .cta-band {
  background: var(--surface); /* #f0f4f2 — slight offset from white */
}
```

---

## Checklist before shipping

- [ ] `aria-label` names the conversion goal ("Get started with X", not "CTA section")
- [ ] `h2` is declarative (not a question unless the answer is obviously yes)
- [ ] `p` is one sentence — the key reassurance or value claim
- [ ] CTA label is specific (2–4 words, real action)
- [ ] Only one CTA button — no secondary button alongside it
- [ ] `data-reveal` on `.cta-band-inner` for scroll entrance
- [ ] `::before` glow is at a different position from the hero glow (bottom-center vs top-left) — documented in the code comment (R-13)
- [ ] Footer does NOT repeat the CTA button
- [ ] Light mode: band background is distinguishable from white page bg
