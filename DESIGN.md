# DESIGN.md — Machine Base AI Brand Direction

> Written from the machinebaseai landing page build (index.html + styles.css).
> This file is the source of truth for all visual decisions on this project.
> antislop agents: read this before any UI change.

> **Pattern library:** `skills/antislop-ui/patterns/INDEX.md` — proven implementations
> of every major visual pattern used across both projects (storytelling pairs, highlights
> strip, border glow, typography system, CTA band, scroll reveal). Adapt them; do not
> copy-paste. The machinebaseai-specific patterns are documented below.

---

## Brand Identity

**Name:** Machine Base AI
**Wordmark:** `MACHINE BASE AI` — bold, uppercase, standard tracking. The `AI` portion is coloured in `--cyan`. No letter-spacing distortion; this is a name, not a lettermark.
**Tagline:** Intelligence Infrastructure
**Sub-tagline:** Build • Automate • Scale • Globally
**Domain:** machinebaseai.com
**Lead contact:** Keith Hopkins (keith@thekeithhopkins.com)

---

## Product

**Type:** B2B AI infrastructure **agency** — not SaaS, not a product. Keith and a team build and deploy production AI systems for real businesses.

**Conversion model:** Free AI Automation Audit form → Keith reviews → human follow-up. The form IS the primary CTA. There is no "sign up", no pricing page, no trial.

**Services (6 verticals):**
1. AI Agents — lead response, qualification, support, research, internal workflows
2. AI Voice & Calling — automated calling + human handoff
3. Lead & CRM Automation — capture, route, score, follow-up
4. Private AI Systems — local/private AI, data-control sensitive orgs
5. Custom Integrations — CRM, messaging, calendar, forms → one workflow
6. Scale Systems — reusable infrastructure, multi-team, multi-location

**Target audience:** SMBs and mid-market businesses losing leads or time to manual processes. Decision-maker is likely a founder or ops lead. They are not technical — they want outcomes ("close more leads") not features ("WebSocket API").

---

## Personality

**Primary:** Authoritative — "We build production systems."
**Secondary:** Direct — no hedging, no corporate softness. Keith will call you back.
**Tertiary:** Precise — "0 wasted leads from slow follow-up" not "maximize your lead potential"

**Avoid:** Startup cheerfulness. "Supercharge", "unlock", "revolutionize", "game-changer". Copy must name the problem and the outcome, not the feeling.

---

## Palette

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#020813` | Page background — near-black, navy cast |
| `--panel` | `#071526` | Card backgrounds, form, CTA band |
| `--surface` | `#04101f` | Section alternates (highlights strip, contact) |
| `--text` | `#f0f6ff` | Primary text — 18.47:1 on bg |
| `--muted` | `#8caabb` | Secondary text — 8.20:1 on bg (WCAG AA, wide margin) |
| `--line` | `#0c2d49` | Borders, dividers |
| `--cyan` | `#19d9ff` | Primary accent — CTAs, eyebrows, active states |
| `--blue` | `#087cff` | Gradient partner to cyan (CTA buttons) |
| `--primary-light` | `rgba(25,217,255,0.10)` | Chip backgrounds, subtle fills |
| `--primary-glow` | `rgba(25,217,255,0.18)` | Button shadow |

**Palette rule:** cyan is the single accent. It appears on: CTAs, eyebrow labels, active indicators, the "AI" in the wordmark, highlights numbers, and border glow. Blue (`--blue`) appears only as the gradient partner on primary buttons — never independently.

---

## Typography

**Font:** Plus Jakarta Sans — warm geometric, 400–800.
**Reason:** Rounder terminals than Inter/Geist; more human feel for an agency that talks directly to business owners. Not cold-technical. Loaded at 400/500/600/700/800.
**Avoid (R-06 defaults):** Inter, Geist, Space Grotesk — valid fonts with a brand reason; invalid as defaults.

| Token | Value | Role |
|---|---|---|
| `--text-hero` | `clamp(2.875rem, 7vw, 5.75rem)` | Hero h1 |
| `--text-3xl` | `2.75rem` | Section h2 cap |
| `--text-2xl` | `2rem` | Section h2 floor |
| `--text-xl` | `1.5rem` | Story h3 floor |
| `--text-lg` | `1.25rem` | Featured card title |
| `--text-md` | `1.125rem` | Card titles, story h3 |
| `--text-base` | `1rem` | Body |
| `--text-sm` | `0.875rem` | Labels, nav, form |
| `--text-xs` | `0.75rem` | Eyebrows, badges, footer |
| `--weight-black` | `800` | h1, h2, h3, wordmark, story-num |
| `--ls-hero` | `-0.04em` | Hero h1 (tight) |
| `--ls-tight` | `-0.02em` | Section h2, story h3 |
| `--ls-label` | `0.1em` | Eyebrows, nav (uppercase) |

---

## Three.js Canvas — Hero Focal Point

**File:** `tier3.js` — Three.js 0.185.0, no build step, loaded from CDN.
**Scene:** Cinematic 3D workflow universe — floating workflow cards (Lead Discovery, AI Research, etc.), animated intelligence signals, mouse parallax, hover + click-to-scroll.
**Role:** The canvas IS the product concept made visible. It demonstrates the AI workflow infrastructure in 3D terms before a word is read.
**Rule:** Do not remove, resize, or replace the canvas. Do not add another 3D element alongside it. The CSS Intelligence Field (ring + signals) is the graceful fallback when the canvas is unavailable.
**prefers-reduced-motion:** `tier3.js` already guards with `matchMedia` on line 9. The CSS Intelligence Field animation is separately guarded in styles.css.

---

## Antislop Decisions Active

| Rule | Decision |
|---|---|
| R-01 | Gradient on primary CTA button only (cyan→blue). No section gradients. |
| R-05 | Section order: hero → highlights → solutions → storytelling pairs → contact → CTA band |
| R-06 | Plus Jakarta Sans, documented above. Not Inter/Geist. |
| R-09 | Eyebrow is plain `<p class="eyebrow">` — no pill, no dot, no border |
| R-13 | Glow budget: border glow on solutions cards (interactive) + CTA band bookend glow (ambient). Two total. |
| R-17 | Highlights strip uses real service facts only — 6 verticals, AI voice/agent, 0 wasted leads, 1 free audit |
| R-19 | Motion: scroll reveals (IO) + hero load reveal + Intelligence Field CSS + border glow. All motion guarded. |
| R-22 | tier3.js canvas = real product concept. CSS visuals (channels, agent ring, handoff, scale bars) = workflow stages. No decorative illustrations. |
| R-32 | Skip link, nav aria-label, form aria-label, canvas aria-hidden, story-visual aria-hidden, honeypot tabindex=-1 |
| R-38 | No invented numbers. No fake customer names. Form has real send.php handler. |

---

## Antislop Dials

| Dial | Setting | Reason |
|---|---|---|
| ENERGY | 2 | Authoritative agency — confident, not flashy |
| RHYTHM | 2 | Storytelling pairs alternate layout; solutions grid is uniform (deliberate) |
| MOTION | 2 | Scroll reveals + Intelligence Field + border glow; no JS tilt (Three.js canvas provides the 3D depth) |
| COLOUR | 1 | Single accent (cyan). Blue only as gradient partner. No palette expansion. |

---

## What This Project Is Not

- **Not smma:** No approval workflow. No dashboard card. No SMMAI wordmark. No green palette.
- **Not SaaS:** No pricing page, no free tier, no product demo, no sign-up CTA.
- **Not a startup landing page:** No "Trusted By" logos, no testimonials, no FAQ, no "Join 10,000+ businesses" claims.
- **Not a portfolio:** Keith does not show past clients by name without permission.

---

## Contact / Conversion

- **Primary CTA:** "Get a Free AI Audit" → `#contact` (form)
- **Direct CTAs:** "Call Keith" (`tel:+12546440645`) and "WhatsApp Keith" (prefilled message)
- **Form handler:** `send.php` → `leads@machinebaseai.com`, redirects to `thank-you.html`
- **Honeypot:** `name="website"` field, hidden, `tabindex="-1"` — catches bots without CAPTCHA friction
