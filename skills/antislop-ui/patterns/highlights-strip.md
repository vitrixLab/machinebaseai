# Pattern: Highlights Strip (Real Metrics, No Invented Deltas)

> Extracted from: SMMAI landing page (smma/index.html)
> Replaces: "Trusted By" logo bars, invented stat card rows, generic social proof sections
> Antislop compliance: R-17 (real numbers only), R-38 (no fake data), R-09 (no badge noise)

---

## When to use this pattern

Use when:
- The product has 3–4 real metrics that can be stated as facts
- You need a social-proof anchor between storytelling and a technical section
- The "Trusted By" logo bar is not applicable (no real enterprise logos yet)
- You want a full-bleed visual break that does not interrupt the reading flow

Do NOT use when:
- The metrics are invented or estimated (leave the section out entirely — R-17, R-38)
- The product has real customer testimonials (use those instead — more credible)
- More than 4 metrics exist (split into two groups or use a different format)

---

## What counts as a real metric

**Valid:**
- Hard constraints in the system: "0 posts published without approval"
- Technical facts: "100% human-reviewed", "DRY_RUN mode always available"
- Real platform counts: "6 platforms supported"
- Actual usage data if you have it: "28 posts/week per account"

**Invalid (do not use):**
- Invented deltas: "+12% engagement" with no data source
- Round-number estimates dressed as facts: "10,000+ posts generated"
- Competitor comparisons with no citation
- Customer counts you do not have

---

## HTML

```html
<section class="highlights-strip" aria-label="Key figures" data-reveal>
  <div class="wrap highlights-inner">

    <div class="highlight">
      <div class="highlight-num">[NUMBER or SHORT WORD]</div>
      <div class="highlight-label">[Two-line label<br>for context]</div>
    </div>

    <div class="highlight-divider" aria-hidden="true"></div>

    <div class="highlight">
      <div class="highlight-num">[NUMBER]</div>
      <div class="highlight-label">[Label line 1<br>line 2]</div>
    </div>

    <div class="highlight-divider" aria-hidden="true"></div>

    <div class="highlight">
      <div class="highlight-num">[NUMBER]</div>
      <div class="highlight-label">[Label line 1<br>line 2]</div>
    </div>

    <div class="highlight-divider" aria-hidden="true"></div>

    <div class="highlight">
      <div class="highlight-num">[NUMBER or WORD]</div>
      <div class="highlight-label">[Label line 1<br>line 2]</div>
    </div>

  </div>
</section>
```

**Note on `aria-label="Key figures"`:** the section landmark label tells screen readers this is a summary block of key numbers, not decorative content. The individual numbers are read as plain text — no `aria-label` needed on individual cells.

---

## CSS

```css
/* ── Highlights strip ─────────────────────────────────────────────── */
/* Full-bleed band using --surface (one step above --bg).
   Sits between storytelling and architecture — a visual palette cleanser.
   border-top/bottom anchors it to the surrounding sections. */
.highlights-strip {
  background: var(--surface);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 4rem 0;
}

/* 7-column grid: 4 content + 3 dividers, centred */
.highlights-inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  align-items: center;
  gap: 2rem;
}

/* ── Number ── */
.highlight { text-align: center }
.highlight-num {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text);
  line-height: 1;
  margin-bottom: .5rem;
}

/* ── Label ── */
.highlight-label {
  font-size: .875rem;
  color: var(--muted);
  line-height: 1.55;
}

/* ── Divider ── */
.highlight-divider {
  width: 1px;
  height: 48px;
  background: var(--line);
  align-self: center;
}

/* ── Mobile: 2-column, hide dividers ── */
@media (max-width: 860px) {
  .highlights-inner {
    grid-template-columns: 1fr 1fr;
    gap: 2rem 1rem;
  }
  .highlight-divider { display: none }
}
@media (max-width: 400px) {
  .highlights-inner { grid-template-columns: 1fr }
}
```

---

## Content guidance

**Number format:**
- Use `%`, plain integers, or short words (`DRY`, `0`, `100%`)
- Do not add fake decimals ("94.2%") or fake thousand-separators ("12,483") unless the number is genuinely that precise
- Short words (like `DRY` for "DRY_RUN mode") are acceptable when the label below clarifies — they signal precision rather than estimation

**Label format:**
- Two lines max, `<br>` after line 1
- Label = context for the number, not a repeat of it
- "Human-reviewed / before publish" not "100% of posts are reviewed by a human before publishing"

**Number count:** 3–4 cells. Three is cleaner if your metrics are strong. Four works when all four are equally credible. Never pad to four with a weak metric.

---

## Checklist before shipping

- [ ] Every number is a real, verifiable product fact (R-17)
- [ ] No green delta arrows or "+X% this week" claims without a real data source (R-17)
- [ ] Section has `aria-label="Key figures"` or equivalent landmark label (R-32)
- [ ] Dividers are `aria-hidden="true"` (decorative separators)
- [ ] Mobile: grid collapses to 2-column, dividers hidden (R-03)
- [ ] `data-reveal` present for scroll entrance
- [ ] Label uses `<br>` for controlled two-line break, not truncation
