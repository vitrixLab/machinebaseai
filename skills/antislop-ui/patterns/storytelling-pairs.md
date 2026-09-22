# Pattern: Storytelling Pairs (Feature + Visual, Alternating)

> Extracted from: SMMAI landing page (smma/index.html)
> Replaces: monotonous "How It Works" step-list and identical feature-card grids
> Antislop compliance: R-05 (RHYTHM 2), R-22 (visuals connected to product)

---

## When to use this pattern

Use when:
- The product has a 2–4 stage workflow to explain
- RHYTHM dial is 2 or higher (sections visibly vary)
- The current section is "How It Works" with a step-list or 3-card icon row
- You want product storytelling rather than feature marketing

Do NOT use when:
- RHYTHM dial is 1 (uniform grid is intentional)
- The product has more than 5 workflow stages (split into two sections instead)
- Each stage is equal in importance (a numbered list is more honest)

---

## Structure

```
section.story-section
  div.wrap
    div.section-head        ← eyebrow + h2 + intro paragraph

    div.story-pair          ← [text left] [visual right]
    div.story-pair.story-pair--flip  ← [visual left] [text right]
    div.story-pair          ← [text left] [visual right]
```

Alternate `story-pair` and `story-pair--flip` for RHYTHM 2. Always start and end with the same orientation (text left) so the page feels balanced.

---

## HTML

```html
<section class="story-section" id="workflow" aria-label="How [product] works">
  <div class="wrap">

    <div class="section-head" data-reveal>
      <span class="eyebrow">[Section label]</span>
      <h2>[Short, bold statement about the workflow]</h2>
      <p>[One sentence supporting the h2 — max 20 words]</p>
    </div>

    <!-- Pair 1: text left, visual right -->
    <div class="story-pair" data-reveal>
      <div class="story-text">
        <div class="story-num">01 &mdash; [Stage name]</div>
        <h3>[Bold claim about what happens in this stage]</h3>
        <p>[2–4 sentences of clear, specific copy. No buzzwords. (R-16)]</p>
      </div>
      <div class="story-visual" aria-hidden="true">
        <!-- See css-visuals.md for visual options -->
      </div>
    </div>

    <!-- Pair 2: flipped — visual left, text right -->
    <div class="story-pair story-pair--flip" data-reveal>
      <div class="story-visual" aria-hidden="true">
        <!-- Visual goes here; order reversal is CSS-only (see below) -->
      </div>
      <div class="story-text">
        <div class="story-num">02 &mdash; [Stage name]</div>
        <h3>[Bold claim for stage 2]</h3>
        <p>[Copy for stage 2]</p>
      </div>
    </div>

    <!-- Pair 3: text left, visual right (mirrors pair 1) -->
    <div class="story-pair" data-reveal>
      <div class="story-text">
        <div class="story-num">03 &mdash; [Stage name]</div>
        <h3>[Bold claim for stage 3]</h3>
        <p>[Copy for stage 3]</p>
      </div>
      <div class="story-visual" aria-hidden="true">
        <!-- Visual goes here -->
      </div>
    </div>

  </div>
</section>
```

---

## CSS

```css
/* ── Story section wrapper ── */
.story-section { padding: 0 }

/* Section head: sits inside the wrap, top-bordered from content above */
.story-section .section-head {
  padding: 6rem 0 4rem;
  border-bottom: 1px solid var(--line);
}
.story-section .section-head h2 {
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  line-height: 1.35;
  letter-spacing: -0.02em;
  margin: 0 0 .875rem;
  font-weight: 800;
}
.story-section .section-head p {
  font-size: 1rem;
  color: var(--muted);
  max-width: 52ch;
  margin: 0;
  line-height: 1.75;
}

/* ── Pair layout ── */
.story-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  padding: 5rem 0;
  border-bottom: 1px solid var(--line);
}
.story-pair:last-child { border-bottom: none }

/* Flip: reorder visually without changing DOM order.
   DOM order stays text-first for screen readers. (R-32) */
.story-pair--flip .story-text   { order: 2 }
.story-pair--flip .story-visual { order: 1 }

/* ── Text column ── */
.story-num {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--primary);
  text-transform: uppercase;
  margin-bottom: .75rem;
}
.story-text h3 {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -0.02em;
  margin: 0 0 1rem;
  color: var(--text);
}
.story-text p {
  font-size: 1rem;
  color: var(--muted);
  line-height: 1.75;
  margin: 0;
  max-width: 44ch;
}

/* ── Visual column ── */
.story-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
}

/* ── Mobile: always stack, always text first ── */
@media (max-width: 860px) {
  .story-pair {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 3.5rem 0;
  }
  /* Critical: reset flip order so text stays first on mobile */
  .story-pair--flip .story-text   { order: 1 }
  .story-pair--flip .story-visual { order: 2 }
}
@media (max-width: 540px) {
  .story-pair { padding: 2.5rem 0 }
  .story-section .section-head { padding: 4rem 0 2.5rem }
}
```

---

## Checklist before shipping

- [ ] DOM order is always text before visual (screen reader reads text first)
- [ ] `story-pair--flip` resets `order` to text-first at ≤860px (R-03)
- [ ] Every `story-visual` has `aria-hidden="true"` (R-32)
- [ ] `.story-num` numbers are real stage labels, not decorative counts
- [ ] `.story-text p` copy is specific — no buzzwords (R-16)
- [ ] `border-bottom` on pairs creates visual separation; last pair has none
- [ ] `data-reveal` on each pair for scroll entrance
- [ ] Section has a real `id` for nav anchor links (R-24)

---

## Content guidance

**story-num format:** `NN — Stage Name` (number + em dash + label). The number is the sequence; the name is the owner.

**h3 voice:** bold claim, not feature title. "A human approves before anything goes live" not "Human Approval". The claim sells; the title names.

**p length:** 2–4 sentences max. If it's longer, cut — the visual does half the work.

**Visual selection:** see `css-visuals.md` for three ready-made CSS illustrations that map to common workflow stages.
