---
name: antislop-ui
description: "UI and visual skill for antislop. Use when building or editing any interface: color, layout, components, motion. Load with the core."
allowed-tools: Read Write Edit Glob Grep
---
# antislop-ui

> Anti Slop: Rules for AI Coding Agents. UI & Visual skill

> Part of the antislop system. Read together with `antislop.md` (the core). This skill deep-dives the UI/visual concern: color, layout, components, decoration, structural flow, and motion. It references core rules by number and never duplicates or renumbers them. Load it when the task builds or edits a website, web app, or any interface.

## How to use this skill

- Load together with `antislop.md` whenever the task is UI or visual work. The core holds the mechanism (the purpose test, the three tiers, the Delivery Gate); this skill holds UI-specific depth.
- Every entry has the same shape: **Tell** (the pattern), **Why** (why it reads as slop), **Fix** (what to do instead), with the governing core rule cited as R-XX.
- The Delivery Gate in the core remains the gate. The "UI Skill Checklist" at the end of this file is the UI-specific supplement to run alongside it.
- **Proven patterns** are in `patterns/` next to this file. Reference them when building hero sections, product storytelling, highlights strips, and 3D/motion elements. They are battle-tested implementations, not templates: adapt them, do not copy-paste.

---

## Visual & Color

### Generic Blue-Purple Gradient

- **Tell:** blue-to-purple, blue-to-cyan, or purple-to-pink gradients used as the primary color treatment, or a full-page colored glow.
- **Why:** the most over-represented color treatment in training data. It signals "no brand identity", not "our palette", and marks the design as AI-generated at a glance.
- **Fix:** pull the palette from `DESIGN.md` or the product's own identity. Keep a gradient only as a hierarchy function with the reason written down (R-01). A gradient separating one level from another is craft; the same gradient on every section is a default.
- **The same default family:** harsh or rainbow gradients, purple-and-black schemes, neon or pastel palettes, and blurred radial orbs behind the hero. They are the same tell wearing different clothes: color from the model's default, not from the brand. All of them are FORBIDDEN as defaults without purpose (R-01).

### Excessive Glassmorphism

- **Tell:** blur/backdrop-filter on the navbar, cards, modals, and sidebar at the same time.
- **Why:** blur removes texture and sits every surface in the same frosted layer, flattening hierarchy. When every surface is glass, nothing is foreground.
- **Fix:** treat glass as an accent, not a character trait. Dose cap: at most 1-2 elements (R-10). The surface that needs the attention gets the glass; everything else stays solid.

### Excessive Border Radius

- **Tell:** every element is pill-shaped: buttons, inputs, cards, badges, modals.
- **Why:** uniform pill shapes erase the visual language of "this is an input, this is a card". Radius becomes decoration instead of a hierarchy tool.
- **Fix:** set a small set of radii in the design system and apply them deliberately (R-11). One generous radius on the primary CTA reads as intentional; the same radius on every element reads as a default.

### Overly Soft Shadows

- **Tell:** every component carries a large shadow, so the whole page feels like it is floating.
- **Why:** when everything is elevated, elevation communicates nothing. The page loses its ground plane and becomes generic softness.
- **Fix:** use shadow as an elevation marker only, and write the elevation reason down (R-12). Most elements should sit flat; the one or two that need to lift above the page carry the shadow.

### Glow Everywhere

- **Tell:** glow on cards, buttons, icons, badges, backgrounds, and borders simultaneously.
- **Why:** glow is an attention amplifier. Applied everywhere it amplifies nothing, and it is one of the fastest ways to look "made by AI".
- **Fix:** reserve glow for a maximum of 1-2 important elements as a focus accent (R-13). Everything else stays matte.
- **Allowed two-glow pattern (proven):** hero ambient glow (spatial anchor behind the h1) + closing CTA band glow (bookend at page bottom). Both documented, different positions, same purpose — bracketing the page. More than two glows on a single page fails R-13.

### Background Grid

- **Tell:** grid squares, blueprint lines, graph paper, dot grids, or thin repeating lines behind content.
- **Why:** it is a default way to make a flat page feel "technical" without doing any real work. It reads as texture without intent.
- **Fix:** use texture or pattern only when it genuinely supports the product's identity, with the reason written down (R-07). A real identity motif (core Part 3) beats a stock grid every time.

### Dark Mode Default for No Reason

- **Tell:** the whole page is dark simply because it looks "tech", with no branding consideration.
- **Why:** dark is a decision, not a default. Forcing it reads as following a trend, not serving the product.
- **Fix:** choose the theme from brand identity, product type, and audience (R-21). Developer and creative tools have legitimate reasons for dark; a content-first product usually does not. If there is no strong reason for a fixed theme, build a working light/dark toggle.

### Too Many Colors in the Palette

- **Tell:** 5-7 different colors on one page with no clear design system.
- **Why:** a scattered palette has no hierarchy. When every element can be any color, nothing is distinguished.
- **Fix:** cap the active palette at 2-3 core colors + 1 accent (R-29), and let one of the cores be the neutral base. Restraint is what makes the accent land.

### Excessive Accent Color

- **Tell:** one accent color on buttons, icons, badges, links, lines, backgrounds, and glows at once.
- **Why:** the accent stops being an accent the moment it is everywhere. It becomes just another color, and the design loses its focal point.
- **Fix:** the accent belongs at the key moment only (one deliberate accent, core Part 3). Zero accents is sterile; an accent everywhere is slop. Choose the one or two places it matters.

### Sterile Default

- **Tell:** flat white or near-white, thin grey borders, small radius, no texture, generic font, no identity.
- **Why:** this is the "safe" result of over-filtering without direction. It is not slop, but it is not design either: it is a void where a design should be.
- **Fix:** this is a direction problem, not a filter problem. Add `DESIGN.md` or resolve the Design Read (core Part 3), then raise the liveliness dials. The fix is never more bans; it is state the purpose and add energy.

---

## Layout & Components

### Monotonous Template Layout

- **Tell:** hero, subtitle, 2 CTAs, screenshot, feature grid, testimonials, FAQ, CTA, footer, in that order, every time.
- **Why:** the order is the training-data default, not the product's narrative. Sections appear because the template has them, not because the content needs them.
- **Fix:** build the structure around actual content needs (R-05, C-3). If the product has no testimonials, there is no testimonials section. Section order follows the product's story. Match the RHYTHM dial: if it is 3, sections visibly vary.
- **Premium landing structure (proven):** hero → storytelling pairs (feature + visual, alternating) → highlights strip → social-proof/architecture → closing CTA band. Tested against Zyno (HorizonX) reference; conversion-focused without the template defaults.

### Copy-Paste Feature Cards

- **Tell:** identical size, height, icon, layout, and padding across all feature cards.
- **Why:** uniform cards flatten the content. When every feature is a card with an icon, the features with real weight and the ones without look the same.
- **Fix:** create variation that reflects content hierarchy, with the reason written down (R-14). Not every feature needs to be a card. The flagship feature may deserve a full-width treatment, the supporting ones a list.

### Bento Grid

- **Tell:** a section made of a mosaic of differently-sized cards, some spanning two columns or two rows, filling the space like a tiled dashboard.
- **Why:** it is the default "app-like" landing layout of the last few years, so it signals nothing about the product. When every section could be a bento, the layout is a template, not a decision.
- **Fix:** use a bento grid only when the content genuinely has elements of different sizes to show (R-05). If every cell is roughly the same, a simple grid or list is more honest.

### Uniform Spacing

- **Tell:** padding, margin, and gaps are identical across every section.
- **Why:** rhythm is a tool, and a single spacing value removes it. Sections stop relating to each other; the page reads as one flat strip.
- **Fix:** use whitespace as structure (core Part 3) and vary it with the RHYTHM dial. Establish a spacing scale, then use different levels to separate and connect.

### "How It Works" Always 3 Steps

- **Tell:** round icon + number 1, 2, 3 + short text, always three steps, always the same shape.
- **Why:** the product's real process is rarely a tidy three-step list. The template forces the process into its shape, not the other way around.
- **Fix:** present the process as it actually is (R-05). Three steps with round icons is fine if that is genuinely the process; otherwise use whatever shape the real workflow takes.
- **Storytelling pair alternative (proven):** replace a step list with text+visual alternating pairs. Each pair = number + h3 + paragraph (text side) + CSS illustration (visual side). Alternates layout direction (`--flip` class) for RHYTHM 2. See `patterns/storytelling-pairs.md`.

### "Trusted By" Logo Bar

- **Tell:** a row of generic company logos directly below the hero.
- **Why:** it is a trust claim with no evidence: generic logos, no real customers named, no proof of use.
- **Fix:** only show real, verifiable logos (R-18, R-36, C-5). If the product has no such customers yet, do not fabricate a logo bar. Real social proof beats a generic one every time.
- **Highlights strip alternative (proven):** show 3-4 real product metrics (100% human-reviewed, 0 posts bypassed approval, etc.) in a full-bleed band with a divider between each number. No invented numbers; no green deltas. See `patterns/highlights-strip.md`.

### "Most Popular" Pricing Card

- **Tell:** the middle pricing tier always highlighted with a capsule badge.
- **Why:** it is the default pattern, which means it is not a decision.
- **Fix:** highlight the tier that actually serves the product's goals, and write why (R-31). If no tier deserves emphasis, highlight none.

### 4-Column Template Footer

- **Tell:** Product / Company / Resources / Legal columns with no variation.
- **Why:** the columns exist because templates have them, not because the site has that many link groups.
- **Fix:** structure the footer around what the product actually links to (R-05). A single row with the wordmark, a tagline, and the identity accent is cleaner than four half-empty columns.

### Uniform Section Rhythm

- **Tell:** every section is centered title + subtitle + identical card grid, with no variation.
- **Why:** identical composition makes sections blur together, and the page feels repetitive and flat.
- **Fix:** vary composition with the RHYTHM dial (R-05). Alternate text-heavy and visual sections, asymmetric and symmetric layouts.

---

## Decorative Elements

### Generic AI Icons

- **Tell:** sparkle, star, magic, lightning, diamond, cube, robot, or AI orb as feature icons.
- **Why:** these glyphs are the generic vocabulary of "AI product". They communicate nothing about the specific feature.
- **Fix:** use icons genuinely relevant to the content, with the relevance written down when the glyph is generic (R-04). If no appropriate icon exists, use none.

### Lucide Icons

- **Tell:** every icon comes from the same thin-stroke, rounded-corner library (Lucide or a visual clone).
- **Why:** a single default icon library makes every AI site's icons identical.
- **Fix:** the icon set is a visual choice, not a default (R-04). Pick icons for relevance first.

### Emoji as Decoration

- **Tell:** literal emoji scattered through the copy, headings, badges, and buttons.
- **Why:** emoji is the loudest shorthand for "this was generated, not written". It flattens the product's voice.
- **Fix:** remove emoji from UI text. If a concept needs a mark, use a real, relevant icon with the reason written down (R-04), or no mark at all.
- **Exception (proven):** HTML entities like `&#10003;` (✓), `&#9711;` (○), `&#8727;` (✦) used as functional state indicators in a product mockup card are not decorative emoji — they carry status meaning in a dashboard context. Always use `aria-hidden` on the container.

### Small Arrows on Every Button

- **Tell:** `→` or `↗` placed on almost every button as pure decoration.
- **Why:** the arrow becomes a pattern, not a signal.
- **Fix:** arrows are not the default identity for buttons (R-08). Keep them for the action that genuinely benefits from a direction cue.

### Colored Left Stripe

- **Tell:** a thin colored vertical bar on the left edge of cards, list rows, or section headers, used as decoration.
- **Why:** the stripe adds color without adding meaning.
- **Fix:** the stripe is decoration; it must carry information or go (R-01, R-31).
- **Exception (proven):** a 2px left border in the brand primary on the active/pending item in a dashboard approval list is a state indicator, not decoration. It marks "this row requires action now." Written reason: status encoding in an approval UI. Used once per context.

### AI Capsule Badges

- **Tell:** pill shape, thin border, glow, small dot, uppercase, containing "AI Powered", "Beta", "New".
- **Why:** the capsule-plus-glow-plus-dot combination is self-referential noise.
- **Fix:** badges only when functionally needed, with the need written down, and never the full combination (R-09).

### Eyebrow Badge Above the Headline

- **Tell:** a small pill sitting directly above the H1 holding a category label the headline already says.
- **Fix:** cut it and let the headline do the work. If the label carries information the headline does not, use a plain text eyebrow span (uppercase, tracked, no border, no dot). See the proven eyebrow pattern in `patterns/typography.md`.

### Decorative Status Dot

- **Tell:** a small colored dot beside a heading that marks nothing, often glowing and pulsing on a loop.
- **Fix:** a dot must mark a real state (active, live, recording, warning). If it marks nothing, remove it (R-31).

### Generic AI Typography

- **Tell:** large monospace headings, or uppercase labels with extreme letter-spacing.
- **Why:** monospace-as-aesthetic and wide-tracked uppercase are shorthand for "technical and modern" without doing any real typographic work.
- **Fix:** choose typeface from brand character, not the model's default pick, and write the reason (R-06).
- **Wordmark exception (proven):** a spaced-letter brand mark (e.g. `S M M AI` at `letter-spacing: 0.38em`, 800 weight, uppercase) is a deliberate identity decision, not generic AI typography, when: (1) it is applied to the brand name only, not section headings; (2) it has a documented reason in `DESIGN.md`; (3) the brand differentiator ("AI") is colored in primary. Compensate trailing space with `padding-right: calc(ls * 0.5)`.

### Fake Terminal Window

- **Tell:** a styled terminal with traffic-light dots and typed-out commands as the hero visual.
- **Fix:** show the actual product UI, not a costume (R-06, C-5).
- **Product-accurate mockup alternative (proven):** a CSS dashboard card showing real product states (approved/pending/rejected in an approval flow). The card is the hero focal point, demonstrates the core product value prop, and is marked `aria-hidden` since all information is in the text. See `patterns/hero-dashboard-card.md`.

### Illustrations With No Connection

- **Tell:** Undraw, Storyset, or generic 3D blob characters with no connection to the product.
- **Fix:** illustrations must have a direct connection to the product, with the connection written down (R-22). If none exists, use real screenshots or no illustration.
- **CSS visuals alternative (proven):** product-accurate CSS illustrations built from HTML + the existing token set. Three types used: stacked idea-cards (representing AI output), a gate ring (identity motif scaled up), a platform-status grid (encodes build state). No image assets needed. See `patterns/css-visuals.md`.

---

## Structural & Flow

### Dead Navigation

- **Tell:** navbar links to pages or sections that do not exist.
- **Fix:** every navigation item must have a real destination (R-24).

### Non-Functional Controls

- **Tell:** buttons do nothing, dropdowns won't open, forms cannot submit.
- **Fix:** every interactive element has real behavior, or it is removed (R-26). Decorative buttons inside a `aria-hidden` product mockup use `tabindex="-1"` so they are skipped by keyboard.

### Sections That Fill a Template

- **Tell:** a section exists because "every AI landing page has one", not because the content needs it.
- **Fix:** every section earns its place from the product's content (C-3).

---

## App & Dashboard

### Default Dashboard Shell

- **Tell:** left sidebar, top bar, four stat cards, a chart, a table — chosen before anyone asked what the screen is for.
- **Fix:** name the screen's job and the one decision the user makes on it, then build the hierarchy around that (C-3, R-20).

### Stat Cards With Invented Numbers

- **Tell:** four equal cards with green "+12% this week" deltas.
- **Fix:** show real numbers or none (R-17, R-38). A delta appears only when the comparison period is real and named.

### Filler Activity Feed

- **Tell:** "Sarah Chen updated a document, 2 hours ago", repeated with rotating names and avatars.
- **Fix:** the feed shows real events or does not ship (R-18, R-38).

### Charts Without a Question

- **Tell:** a line or donut chart with a generic title ("Overview") and no axis the reader can act on.
- **Fix:** write the question the chart answers before drawing it, and put that question in the title (C-3).

### Generic Table Columns

- **Tell:** Name, Status, Date, Actions — whatever the rows actually are.
- **Fix:** pick columns from the decision the user makes in this table (R-26).

### Filler Data in Fields and Columns

- **Tell:** fake but plausible data: `John Doe`, `johndoe@example.com`, `"Let's build something"`.
- **Fix:** leave empty cells empty, or use placeholders that clearly say what goes there (R-23, R-38).

### Placeholder Empty and Loading States

- **Tell:** "No data available" with an illustration, or a bare spinner.
- **Fix:** an empty state says why it is empty and gives the one action that fills it (R-27).

---

## Motion

### Endless Pulses and Loops

- **Tell:** elements that pulse, bounce, or float forever with no user trigger.
- **Fix:** motion must have a clear UX purpose, written down (R-19). If the MOTION dial is 1, an endless loop is a FAIL.
- **Float animation exception (proven):** a single hero focal-point element (e.g. a product dashboard card) may use a continuous `translateY` float animation when: (1) it is the page's designated 3D/interactive focal point; (2) the float uses `transform: translateY` only (GPU-composited, no layout); (3) the animation is skipped under `prefers-reduced-motion`; (4) the reason is written in the design comment. One element, one property, one section.

### Template Animations Stacked

- **Tell:** every element uses Fade Up + Fade In + Floating + Scale + Bounce simultaneously.
- **Fix:** choreograph motion to a purpose and to the MOTION dial (R-19). Not everything moves.

### Missing Reduced-Motion Guard

- **Tell:** animations and transitions run without checking `prefers-reduced-motion`.
- **Why:** ~35% of users with vestibular disorders enable this preference. Running motion for them is an accessibility failure and a legal risk.
- **Fix (proven pattern):**
  ```css
  @media (prefers-reduced-motion: reduce) {
    [data-reveal] { opacity: 1; transform: none; transition: none }
  }
  ```
  ```js
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return; // skip all JS-driven motion
  ```
  Apply to: scroll reveals, JS tilt, border glow, and any `@keyframes` animation.

### JS Tilt Without Device Guard

- **Tell:** a JS mouse-tracking tilt effect applied on touch screens, where it fires on `touchstart` and creates jitter.
- **Fix (proven):** guard with `(hover: hover) and (pointer: fine)` before attaching any `mousemove` handler. This targets pointer devices only (desktop mouse) and skips touch screens and styluses:
  ```js
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  ```

### CSS Animation and JS Transform Conflict

- **Tell:** a CSS `@keyframes` animation and a JS `style.setProperty` call both modify `transform` on the same element, causing them to fight — the JS value gets overridden by the CSS animation on every frame.
- **Fix (proven):** separate with a wrapper. The outer element holds the CSS `@keyframes` animation on `translateY` only. The inner element receives the JS tilt via CSS custom properties (`--rx`, `--ry`):
  ```html
  <div class="float-wrapper"> <!-- @keyframes translateY -->
    <div class="card" id="card"> <!-- JS sets --rx and --ry -->
  ```
  ```css
  .float-wrapper { animation: float 7s ease-in-out infinite }
  .card { transform: rotateX(var(--rx, 6deg)) rotateY(var(--ry, -14deg)) }
  @keyframes float { 50% { transform: translateY(-14px) } }
  ```
  Never put `translateY`, `rotateX`, and `rotateY` in the same `transform` chain if one is controlled by CSS animation and another by JS.

---

## WCAG Contrast: Muted Text on Deep Backgrounds

- **Tell:** a muted text color that passes contrast on a medium-dark background but fails on the brand's near-black background. Agent assumes the lighter bg is the floor.
- **Why:** when a brand uses a very deep background (e.g. `#070c09`), muted colours that look fine on `#121212` (4.51:1) can fail on the deeper background. The failure is not visible in the design tool but shows in the contrast checker.
- **Fix:** always run the contrast checker against the deepest background in the palette. `#637669` fails on `#070c09` at 4.06:1. Bump to `#718579` for 5.01:1 pass. Rule: muted colour on the deepest background must clear 4.5:1, not just 3:1.

---

## Hero Section: 3D Focal Point Without WebGL

For static HTML or simple sites where React Three Fiber and Spline are unavailable, the CSS perspective pattern delivers Zyno-level 3D depth with zero dependencies.

**Decision tree:**
1. Is a 3D asset (.glb, Spline) already available? → Spline embed or React Three Fiber.
2. Is React + Framer Motion available? → Framer Motion `motion.div` with `rotateX/Y` on hover.
3. Static HTML, no build step? → **CSS perspective card + JS tilt** (proven below).

**Proven pattern:**
```css
.hero-visual {
  perspective: 1100px;
  perspective-origin: 50% 45%;
}
.float-wrap { animation: dash-float 7s ease-in-out infinite }
.card {
  transform: rotateX(var(--rx, 6deg)) rotateY(var(--ry, -14deg));
  transition: transform .1s ease;
  will-change: transform;
}
@keyframes dash-float { 50% { transform: translateY(-14px) } }
@media (prefers-reduced-motion: reduce) { .float-wrap { animation: none } }
```
```js
var visual = document.getElementById('heroVisual');
var card   = document.getElementById('dashCard');
if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
visual.addEventListener('mousemove', function(e) {
  var rect = visual.getBoundingClientRect();
  var rx = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -6;
  var ry = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) * 10;
  card.style.setProperty('--rx', (6  + rx).toFixed(2) + 'deg');
  card.style.setProperty('--ry', (-14 + ry).toFixed(2) + 'deg');
});
visual.addEventListener('mouseleave', function() {
  card.style.setProperty('--rx', '6deg');
  card.style.setProperty('--ry', '-14deg');
});
```
**What makes this pattern pass the purpose test:** the 3D card IS the product UI. It shows real approval states, real metrics, and demonstrates the core value proposition visually. It is not "cool 3D for the sake of 3D"; it is a product demo rendered in CSS.

---

## Scroll Reveal: IntersectionObserver Pattern

**Proven implementation (zero dependencies, prefers-reduced-motion safe):**

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .65s ease, transform .65s ease;
}
[data-reveal].revealed { opacity: 1; transform: translateY(0) }
[data-reveal][data-delay="1"] { transition-delay: .12s }
[data-reveal][data-delay="2"] { transition-delay: .24s }
[data-reveal][data-delay="3"] { transition-delay: .36s }
@media (prefers-reduced-motion: reduce) {
  [data-reveal] { opacity: 1; transform: none; transition: none }
}
```

```js
(function() {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('[data-reveal]');
  if (reduceMotion) {
    els.forEach(function(el) { el.classList.add('revealed'); });
    return;
  }
  // Hero elements reveal on load, not on scroll
  document.querySelectorAll('.hero-inner [data-reveal]').forEach(function(el) {
    setTimeout(function() { el.classList.add('revealed'); }, 80);
  });
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function(el) {
    if (!el.closest('.hero-inner')) io.observe(el);
  });
})();
```

**Usage rules:**
- Hero content: `setTimeout` reveal on load (visible immediately, no scroll gate).
- Body sections: IntersectionObserver at `threshold: 0.12` (fires when 12% visible).
- Stagger sibling cards: add `data-delay="1"`, `"2"`, `"3"` on successive elements.
- Never `unobserve` before observing — check `el.closest('.hero-inner')` first.

---

## UI Skill Checklist

Run these alongside the core Delivery Gate when the task is UI work. All answers must be **yes**:

**Color & Visual**
- [ ] Is the palette derived from `DESIGN.md` or a written brand identity, not the default gradient set? (R-01, R-29)
- [ ] Is the accent used at the key moment only, not spread across every element? (core Part 3)
- [ ] Muted text tested against the **deepest** background in the palette, not just the average dark? (WCAG AA ≥ 4.5:1)
- [ ] Is the page free of the blue-purple gradient family as the primary visual treatment? (R-01)
- [ ] Is glass, glow, shadow, and radius used at their dose caps, not as a page-wide default? (R-10, R-11, R-12, R-13)
- [ ] If two ambient glows exist, are they at different positions with different spatial roles (e.g. hero top + CTA bottom)? (R-13)

**Typography & Copy**
- [ ] Is the copy free of decorative emoji scattered through headings, bullets, and buttons? (R-04)
- [ ] Is the space above the H1 clear of a pill badge holding a label the headline already says? (R-09)
- [ ] If a spaced-letter wordmark is used, is it applied to the brand name only (not section headings), with reason in DESIGN.md? (R-06)
- [ ] Is every section heading a real h2/h3 in the DOM hierarchy, not a styled div? (R-06)

**Layout & Structure**
- [ ] Do section compositions vary according to the declared RHYTHM dial instead of repeating one template? (R-05)
- [ ] Is the layout free of the default AI shapes: bento-grid mosaic, fake terminal window, three pricing columns, and left-edge color stripes with no meaning? (R-05, R-01)
- [ ] Does every section earn its place from product content, not template convention? (C-3)

**Navigation & Interaction**
- [ ] Does every navigation item and interactive element have a real destination or behavior, or a visible "Coming soon" label? (R-24, R-26)
- [ ] Do decorative buttons inside aria-hidden product mockups carry `tabindex="-1"`? (R-32)
- [ ] Does the skip link exist and reach the main content? (R-32)

**Motion**
- [ ] Does motion follow the declared MOTION dial and serve a written purpose, with no endless loops? (R-19)
- [ ] Is every animation (CSS `@keyframes`, JS tilt, scroll reveals, border glow) guarded by `prefers-reduced-motion`? (R-19)
- [ ] If a JS mouse tilt exists, is it guarded by `(hover: hover) and (pointer: fine)` to skip touch devices? (R-19)
- [ ] Are CSS `@keyframes` and JS `style.setProperty` on `transform` on different elements (wrapper vs. card)? (R-19)
- [ ] Is every colored dot and status light marking a real state, with no decorative glow or endless pulse? (R-13, R-19, R-31)

**Product Visuals**
- [ ] Does the hero focal point (card, visual, mockup) demonstrate the actual product rather than a generic 3D shape or illustration? (R-22, C-5)
- [ ] Are CSS visuals (stacked cards, ring, platform grid) connected to a specific product concept written in the code comment? (R-22)
- [ ] Are numbers in a highlights strip real product metrics, not invented deltas? (R-17, R-38)

**App/Dashboard**
- [ ] On an app screen, is the layout built around the decision the user makes there, not the sidebar + stat row + chart + table default? (C-3, R-20)
- [ ] Is every number, delta, feed entry, and table row real or a labelled placeholder, with no invented metrics? (R-17, R-18, R-38)
- [ ] Do empty, loading, and error states name the cause and the next action? (R-27)

**Responsive & Accessibility**
- [ ] Does the page hold up at every breakpoint, theme, and state, and pass keyboard-only use? (R-03, R-34, C-4)
- [ ] On mobile (≤860px): does the hero stack vertically, the 3D tilt disable, and storytelling pairs stack correctly? (R-03)
- [ ] Do flip-layout sections reset their `order` to text-first on mobile? (R-03)
