# Cardwise — Complete Page Guide

## How to read this document

Every page is documented under five headers:

**Purpose** — why this page exists and what it must accomplish for the user and the product.
**Layout** — structural description of what is on screen, top to bottom, with spacing references from the design system.
**Components** — every element on the page, which design system component it maps to, and its precise specification.
**Motion** — what moves, when, and with which token values.
**Design notes** — decisions that are not obvious from the component spec alone, and constraints that must be honoured.

Design token references use the CSS variable names defined in the system: `--surface-page`, `--ink-100`, `--space-6`, `--text-3xl`, `--ease-land`, etc.

---

## Page Categories

```
A — Marketing (public-facing, pre-authentication)
B — Questionnaire Flow (the core product experience)
C — Result Screens (the payoff)
D — Account & Saved (post-result, returning users)
E — Supporting & Legal (low-hierarchy, always accessible)
```

---

# A — Marketing Pages

---

## A1 — Landing Page

### Purpose

The landing page has one job: earn the tap on "Begin." Not through persuasion or feature listing — through *register*. The quality of the typography, the restraint of the layout, and the patience of the animation sequence should communicate before any word is read that this product is different from every comparison site the user has encountered.

It must also briefly resolve the trust question: what is this, and why should I answer its questions? It does this not by explaining itself but by demonstrating competence. The social proof, the three-step summary, and the visual language together signal "this was made carefully."

Secondary purpose: light SEO surface. The page is crawlable, includes the product description and category keywords, but never at the expense of the visual experience.

---

### Layout

```
[Navigation Bar — fixed, 55px height]
[Hero Section — 89px top padding, ~520px tall]
[How It Works — 3 steps, 55px padding top/bottom]
[Social Proof Strip — single row, 34px padding top/bottom]
[Trust Callout — single statement, 55px padding top/bottom]
[Footer — 55px padding]
```

---

### Components

**Navigation Bar**
- Background: `--surface-page` at 92% opacity with `backdrop-filter: blur(12px)`
- Border bottom: `0.5px solid rgba(26,25,22,0.08)`
- Height: `--space-7` (55px), sticky
- Left: Logotype — Playfair Display italic, `--text-base` (16.18px), `--ink-100`
- Right: Two ghost buttons — "How it works" (scrolls to section) and "Sign in" (routes to A3)
- On mobile: "Sign in" collapses. Only logotype and one CTA remain.
- The logotype is not a link on the landing page — it does nothing. It simply is there.

**Hero Section**
- Max-width container: 1160px, centered, `--space-6` (34px) horizontal padding
- Eyebrow label: `--text-xs` (10px), DM Sans 500, `letter-spacing: 0.1em`, uppercase, `--ink-40`, margin-bottom `--space-4` (13px)
  - Content: "CARD RECOMMENDATIONS — INDIA"
- Headline: Playfair Display italic, `--text-3xl` (42.33px), `line-height: 1.21`, `letter-spacing: -0.025em`, `--ink-100`
  - Content: "There is a card / built for the way / you spend." (three lines, natural line breaks not forced on mobile)
  - Max-width: 520px — the headline should never span full width even on desktop. It should feel like it was placed, not stretched.
- Subline: DM Sans 400, `--text-base` (16.18px), `line-height: 1.618`, `--ink-60`, max-width 420px, margin-top `--space-4` (13px)
  - Content: "Five questions. No jargon. The right card for how you actually spend — expressed in rupees, not points."
- CTA Button: Primary button, `cw-btn-primary`, `cw-btn-lg` (16px, 34px × 16px padding)
  - Content: "Begin" with a right-arrow SVG icon (14×14, 1.2px stroke)
  - Margin-top: `--space-6` (34px)
  - On click: routes to B1 (questionnaire entry gate)
- Secondary link below the button: `cw-btn-text`, `--text-sm` (11.5px), `--ink-40`
  - Content: "Already have an account? Sign in"
  - Margin-top: `--space-4` (13px)

**How It Works — 3-Step Row**
- Section label: standard pattern — `--text-xs`, uppercase, `--ink-40`, "HOW IT WORKS"
- Section title: Playfair Display italic, `--text-xl` (26.18px), `--ink-100`
  - Content: "Five questions. Real answers."
- Three columns (desktop) / stacked (mobile), gap `--space-6` (34px)
- Each step:
  - Step number: `--text-xs`, DM Sans 500, `letter-spacing: 0.1em`, uppercase, `--ink-40` — "01", "02", "03"
  - Step title: DM Sans 500, `--text-md` (13.5px), `--ink-100`, margin-top `--space-3` (8px)
  - Step description: DM Sans 400, `--text-sm` (11.5px), `--ink-60`, `line-height: 1.618`
  - No icons. No illustrations. The numbers and the copy are sufficient.
  - Step 01: "Tell us how you spend" — "Select your top spending categories and your monthly card spend. Nothing more."
  - Step 02: "We do the maths" — "Every card's rewards are translated into rupees based on your exact spending pattern."
  - Step 03: "See your number" — "One clear recommendation with your net annual value — what you'd actually earn or save."
- Divider below: `0.5px solid rgba(26,25,22,0.08)`

**Social Proof Strip**
- Background: `--surface-elevated` (#F4F3EF)
- Padding: `--space-5` (21px) vertical, `--space-6` (34px) horizontal
- Single horizontal row of three or four proof points, separated by a thin vertical rule `0.5px, rgba(26,25,22,0.12)`
- Each proof point: number in DM Sans 500 `--text-md`, label below in DM Sans 400 `--text-xs` `--ink-40`
  - Examples: "14,000+ cards evaluated" / "₹4,800 average annual uplift" / "3 mins average completion"
- These numbers should be real or conservatively estimated at launch. Do not fabricate.
- No background variation, no colour, no icons. Pure typography.

**Trust Callout**
- Full-width, `--surface-page` background
- Single centred statement in Playfair Display italic, `--text-xl` (26.18px), `--ink-60`, max-width 560px
  - Content: "We'll tell you if your current card is already the right one."
- This line is the most important trust signal on the page. It signals that the product is not just trying to sell cards — it is genuinely trying to help. It should sit alone with significant breathing room above and below (`--space-7`, 55px each).
- No CTA attached to this section. It is a statement, not a sales pitch.

**Footer**
- Logotype left: Playfair Display italic, `--text-base`, `--ink-100`
- Navigation links (small, DM Sans 400, `--text-xs`, `--ink-40`): How it works / About / Privacy / Terms / Advertise with us
- Right: Legal disclaimer — "Cardwise is an independent recommendation service. We may earn a referral fee when you apply for a card through our platform. This does not influence our recommendations." — `--text-xs`, `--ink-40`, max-width 320px, right-aligned
- Border top: `0.5px solid rgba(26,25,22,0.08)`
- Padding: `--space-7` (55px) vertical

---

### Motion

- **Eyebrow label:** enters at 0ms delay, 580ms, `--ease-land`, translateY from `--motion-yShift` (12px), opacity 0→1
- **Headline:** enters at 130ms delay, 720ms, `--ease-land`, same Y shift
- **Subline:** enters at 580ms delay, 580ms, `--ease-land`
- **CTA Button:** enters at 920ms delay, 560ms, `--ease-land`
- **Secondary link:** enters at 1100ms delay, 480ms, `--ease-land`
- **How It Works steps:** stagger from left to right. Step 01 at 0ms, Step 02 at 80ms (`--stagger`), Step 03 at 160ms. Each 520ms, `--ease-land`. Trigger: enters viewport (Intersection Observer).
- **Social Proof Strip:** whole strip fades in as a unit when scrolled into view. 480ms, opacity only, no Y shift.
- **Trust Callout:** 680ms, `--ease-land`, Y shift 8px, triggers on viewport entry.

---

### Design Notes

The page must never feel like it is trying to impress. Every section should feel like it arrived because it was necessary, not because something had to fill the space. If in doubt about adding an element, remove it.

No illustrations. No card mock-ups or product screenshots in the hero. The typography is the visual.

The "We'll tell you if your current card is already the right one" line should sit far enough from any CTA that it cannot be read as a sales pressure mechanism. It is an honest statement and must be treated as one spatially.

Mobile: the hero headline drops to `--text-2xl` (30px) on viewports below 480px. The subline drops to `--text-sm` (11.5px). The three-step row stacks vertically with `--space-5` (21px) between items.

---

## A2 — About Page

### Purpose

Explains the product, the team's motivation, and — critically — the business model. The trust problem in this category is structural: every comparison site is secretly a lead-gen business. Cardwise must address this directly. The about page is where we do that, plainly and without defensiveness.

Secondary purpose: the about page is read disproportionately by users who are close to trusting the product but not quite there yet. It is a conversion page in disguise.

---

### Layout

```
[Navigation Bar — same as A1]
[Hero — editorial, left-aligned, not centred]
[Our Approach — 3 short paragraphs]
[The Business Model — honest, direct]
[The Team — minimal, 1–3 people, no headshots required]
[Footer — same as A1]
```

---

### Components

**Hero**
- Eyebrow: "ABOUT CARDWISE"
- Headline: Playfair Display italic, `--text-3xl`, left-aligned (not centred — this page is editorial, not promotional)
  - Content: "Built for the person who just wants to know."
- Opening paragraph: DM Sans 400, `--text-base` (16.18px), `line-height: 1.618 (φ)`, `--ink-60`, max-width 560px
  - This paragraph should be written with the same restraint as the product itself. No adjectives that the product has not earned.

**Our Approach**
- Three short paragraphs with left-border annotation style: `1.5px solid rgba(26,25,22,0.15)`, padding-left `--space-5` (21px)
- Each paragraph: DM Sans 400, `--text-base`, `--ink-60`, `line-height: 1.618`
- Paragraph labels above each (optional): `--text-xs`, uppercase, `--ink-40`

**The Business Model — a dedicated block**
- Background: `--surface-elevated` (#F4F3EF), `border-radius: --radius-lg` (13px), padding `--space-6` (34px)
- This block is visually distinguished because the content is important and must not be buried
- Headline for the block: DM Sans 500, `--text-md`, `--ink-100` — "How we make money"
- Body: DM Sans 400, `--text-sm`, `--ink-60`, `line-height: 1.618`
  - Content: plain description of referral model, that referral revenue does not influence rankings, and that Cardwise will recommend that you keep your current card if that is the right answer.
- No attempt to soften or prettify this section. The directness is the trust signal.

**The Team**
- Minimal. Name, role, one sentence. No headshots — an initials circle using `--surface-selected` background, `--ink-100` text, same pattern as the data record component in the design system.
- If the team is one person, present it as one person. No inflation.

---

### Motion

- Page enters with the same hero animation sequence as A1.
- Annotation blocks stagger in 80ms apart when scrolled into view.
- The business model block enters as a unit with a 6px Y shift, 480ms, `--ease-land`, on viewport entry.

---

### Design Notes

This page should be written as carefully as it is designed. The copy and the design system are doing equal work here. A poorly written about page rendered in a beautiful design system is worse than no about page — the contrast makes the writing's inadequacy more visible.

---

## A3 — Sign In / Sign Up Page

### Purpose

Lightweight authentication. The product works without an account — but an account enables saved results, return visits, and the "how am I doing now" audit feature for returning users. Sign-up should be positioned as optional and as a way to save your result, not as a gate.

The page must match the register of the rest of the product. No blue "Sign up with Google" buttons. No confetti on completion.

---

### Layout

```
[Full-height centered layout — single column, no nav chrome]
[Logotype — top left, links to A1]
[Form card — centered, 400px max-width]
[Footer legal line — bottom of page]
```

---

### Components

**Logotype**
- Top-left, absolute positioned, `--space-6` (34px) from edges
- Playfair Display italic, `--text-base`, `--ink-100`
- Links back to A1

**Form Card**
- Background: `--surface-card` (#FFFFFF)
- Border: `0.5px solid --border-rest`
- Border-radius: `--radius-xl` (21px)
- Padding: `--space-6` (34px)
- Shadow: `--shadow-lg`
- Max-width: 400px, centered in viewport

**Inside the Form Card:**
- Headline: Playfair Display italic, `--text-xl` (26.18px), `--ink-100`
  - Sign-in state: "Welcome back."
  - Sign-up state: "Save your result."
- Subline: DM Sans 400, `--text-sm`, `--ink-60`
  - Sign-up: "Create an account to revisit your recommendation and track whether it's still right for you."
  - Sign-in: "Your saved cards and results will be right where you left them."
- Email input: `cw-input` class, label above in `--text-xs` uppercase `--ink-40`, placeholder "you@example.com"
- Password input: `cw-input`, type password, same label pattern
- Primary button: full-width, `cw-btn-primary`, content "Continue →"
- Divider: `--text-xs` `--ink-40` "or", with `0.5px` horizontal rules on either side
- Google OAuth button: ghost style (`cw-btn-ghost`), full-width, Google 'G' SVG icon left-aligned
  - Note: This is the *only* place the Google button appears and it must match the ghost style — not the standard Google blue button. The icon is monochrome `--ink-60`.
- Toggle link at bottom: `cw-btn-text`, `--text-sm`, `--ink-60` — "Don't have an account? Sign up" / "Already have an account? Sign in"

**Footer Legal Line**
- `--text-xs`, `--ink-40`, centered
- Content: "By continuing, you agree to our Terms of Service and Privacy Policy."

---

### Motion

- Form card enters from slight Y offset (10px) at page load, 480ms, `--ease-land`
- Input fields do not animate independently — they are already visible within the card
- Button hover: translateY(-1px), `box-shadow: --shadow-md`, 160ms `ease`

---

### Design Notes

No "remember me" checkbox — modern auth should handle this via persistent tokens. No "forgot password" on the initial view — it appears as a text link below the password input only after the password field has been focused at least once (prevents clutter on first impression).

The sign-up flow should not ask for name, phone, date of birth, or any information beyond email and password at this stage. That information can be collected if ever needed, much later and with clear reason.

---

# B — Questionnaire Flow Pages

The questionnaire flow is a single continuous experience that the user perceives as one unified thing, not a series of separate pages. Under the hood, each "screen" may be a distinct route — but the transitions must make the experience feel like one surface evolving.

Every screen in this section shares:
- Background: `--surface-page` (#F9F8F5), full height
- Progress bar: `1.5px` tall, `rgba(26,25,22,0.3)` fill, tracks across top of viewport, width animated with `--dur-settle` (800ms) `ease-out`
- Navigation: logotype centred, back-chevron top-left (hidden on B1, visible from B2 onward), no other chrome
- Back-chevron: SVG, 17×17px, `--ink-100` at `opacity: 0.28`, rises to `0.60` on hover, `--dur-fast` (160ms)
- No step counters, no "Question X of Y" labels, no percentage indicators. The progress bar is the only orientation signal.
- The logotype does not link anywhere during the flow — it is identity, not navigation. Tapping it on mobile does nothing. This is intentional.

Screen transitions:
- Exiting screen: `opacity 0`, `translateY(-8px)`, 240ms `ease-in`
- Entering screen: `opacity 1`, `translateY(0)` from `translateY(12px)`, 360ms `--ease-land`
- Gap between exit and enter: 0ms (they overlap slightly)

---

## B1 — Entry Gate

### Purpose

The first question. Segments all three user personas without ever labelling them. The user answers from lived experience, not financial knowledge. The answer routing every subsequent screen — it is the highest-consequence tap in the entire product.

---

### Layout

```
[Nav — 72px, logotype only]
[Progress bar — 0% width]
[Centred content block — vertically centred in remaining viewport]
  [Question text]
  [Three tap cards — stacked vertically]
[No continue button — selection auto-advances]
```

---

### Components

**Question Text**
- Playfair Display italic, `--text-2xl` (30px), `line-height: 1.33`, `letter-spacing: -0.015em`, `--ink-100`
- Centred, max-width 420px
- Content: "Do you currently have / a credit card?" (natural break at "have")
- Margin-bottom: `--space-6` (34px)

**Tap Cards — Three Options**
- Max-width: 380px, centred
- Gap between cards: `--space-3` (8px)
- Each card uses the `cw-tile` component spec
- Border-radius: `--radius-lg` (13px)
- Padding: `--space-4` (13px) vertical, `--space-5` (21px) horizontal (slightly wider padding than standard tile — these are more important choices)
- Internal layout: icon container left, text right (two-column internal flex)
  - Icon container: 33×33px, `border-radius: --radius-md` (8px), `background: rgba(26,25,22,0.05)`, SVG icon 14×14px `--ink-100` at `opacity: 0.45`
  - Label: DM Sans 500, `--text-md` (13.5px), `--ink-100`
  - Sublabel: DM Sans 400, `--text-sm` (11.5px), `--ink-60`, margin-top `--space-1` (3px)
- On selection: card enters selected state (`--surface-selected` bg, `--border-active` border, no translateY), holds for 275ms, then screen transition begins
- Icons:
  - No card: a simple credit card outline SVG
  - Have one, unsure: a clock/timer circle SVG
  - Want to add: a plus/addition SVG

---

### Motion

- Question text: enters at 160ms delay, 640ms, `--ease-land`, from 10px Y offset
- Card 1: enters at 310ms delay, 490ms, `--ease-land`, from 12px Y offset
- Card 2: enters at 390ms delay, 490ms, `--ease-land`
- Card 3: enters at 470ms delay, 490ms, `--ease-land`
- On selection: selected state transition at 160ms (`--dur-fast`), then screen begins exit after 275ms hold

---

### Design Notes

There is no continue button on this screen. The selection itself is the confirmation. This is possible because the choice is clear and irreversible enough to auto-advance — the back button provides an escape if needed.

The three cards should be identical in size and weight. No card should look more or less desirable than the others visually. The design should be neutral. The copy does the differentiation.

---

## B2-A — Goal Selection (Branch A — First Card)

### Purpose

Helps first-time card seekers orient themselves. Most people in this state do not know what they should want from a credit card — this screen gives them a vocabulary and a starting orientation that the engine uses to seed the recommendation.

---

### Layout

```
[Nav — back chevron + logotype]
[Progress bar — ~8%]
[Centred content block]
  [Question text]
  [2×2 icon tile grid + 1 full-width tile below]
[No auto-advance — user must select and tap Continue]
[Continue button — appears after first selection]
```

---

### Components

**Question Text**
- Same spec as B1: Playfair Display italic, `--text-2xl`, centred, max-width 420px
- Content: "What are you hoping to / get from a credit card?"

**Icon Tile Grid**
- Max-width: 380px, centred
- 2-column grid, `--space-3` (8px) gap
- Each tile: `cw-tile` component
  - Padding: `--space-4` (13px) all sides
  - Border-radius: `--radius-lg` (13px)
  - Icon: displayed as a simple SVG (not emoji) — `24×24px`, drawn to match the warm ink palette at `opacity: 0.5`
  - Label: DM Sans 500, `--text-md`, `--ink-100`, margin-top `--space-3` (8px)
  - Sublabel: DM Sans 400, `--text-sm`, `--ink-60`, margin-top `--space-1` (3px)
- Fifth tile (NOT SURE): full-width, single row, same component but without an icon — just the text centred
- Selection: single-select only. Previously selected tile deselects when a new one is chosen.

**Continue Button**
- Hidden on page load. Appears after first tile is selected.
- `cw-btn-primary`, full-width up to max 380px, centred
- Content: "Continue →"
- Enters: `opacity 0 → 1`, `translateY(7px → 0)`, 280ms, `--ease-land`
- Margin-top: `--space-5` (21px)

---

### Motion

- Stagger pattern: Question text 160ms, Tile 1 at 310ms, Tile 2 at 390ms, Tile 3 at 470ms, Tile 4 at 550ms, Tile 5 (full-width) at 630ms. Each 490ms, `--ease-land`.
- Continue button appears 280ms after first selection, with Y-enter animation.

---

## B2-B — Card Search (Branch B — Reviewing)

### Purpose

Identifies the user's current card so the audit engine has a baseline to work from. This is technically challenging because users often do not know the exact name of their card — they describe it loosely. The search interface must handle ambiguity gracefully.

---

### Layout

```
[Nav + progress bar ~8%]
[Centred content block]
  [Question text]
  [Search input with autocomplete dropdown]
  [Selected chip area — appears after selection]
[Continue button — appears after selection]
```

---

### Components

**Question Text**
- Content: "Which card do you / currently have?"

**Search Input**
- `cw-input` class with additional left-padding for a search icon (SVG, 16×16, `--ink-40`)
- Placeholder: "Search by card name or bank…"
- Min 2 characters to trigger search
- Max-width: 380px, centred

**Autocomplete Dropdown**
- Appears below the input, `border-radius: --radius-lg`, `background: --surface-card`, `border: 0.5px solid --border-hover`, `box-shadow: --shadow-lg`
- Each result row:
  - Left: card art thumbnail — a small rounded rectangle (34×22px) with a flat colour representing the card's primary colour (stored in database). No actual card photography.
  - Middle: Card name in DM Sans 500 `--text-md` `--ink-100` / Bank name in DM Sans 400 `--text-sm` `--ink-60`
  - Right: Category chip — `--text-xs`, `border-radius: --radius-full`, `background: --surface-elevated`, `--ink-60` — e.g. "Cashback" / "Travel" / "Fuel"
- Max 6 results shown. Below 6 results, a "I don't see my card →" link appears: `cw-btn-text`, `--text-sm`, `--ink-40`
- Hover state on row: `background: --surface-elevated`

**Selected State (after picking a card)**
- The search input is replaced by a selection chip — `background: --surface-selected`, `border: 0.5px solid --border-active`, `border-radius: --radius-full`, padding `--space-2 --space-4` (5px 13px)
- Chip content: card name left, a small ✕ icon right (clears selection, returns to search)
- The chip enters with opacity fade, 200ms

**"I don't see my card" Fallback**
- Routes to a simplified sub-screen (within the same page, no route change) with:
  - Bank dropdown: `cw-input` styled as a select — 12 major Indian issuers
  - Tier pill select below (4 options): Basic / Mid-tier / Premium / Super-premium
  - A helper note in `--text-xs` `--ink-40`: "This helps us estimate your card's reward structure."
- Back link to return to search

---

## B2-C — Priority Ranking (Branch C — Optimiser)

### Purpose

The only screen in the flow where the user ranks, not just selects. Optimisers have genuine preference hierarchies — the order in which they rank their priorities materially changes the recommendation.

---

### Layout

```
[Nav + progress bar ~8%]
[Centred content block]
  [Question text]
  [Subinstruction line — how to use this input]
  [5 rankable tiles — tap-to-rank interface]
[Continue button — appears after at least 1 ranking]
```

---

### Components

**Question Text**
- Content: "What do you most want / your next card to do?"

**Sub-instruction Line**
- DM Sans 400, `--text-xs`, `--ink-40`, centred
- Content: "Tap to rank in order of importance. Tap again to remove."
- Margin-bottom: `--space-4` (13px)

**Rankable Tiles**
- Max-width: 380px, stacked vertically, `--space-3` (8px) gap
- Each tile: `cw-tile` component, full-width
- Left side of tile: Rank number indicator — a `24×24px` circle. Unranked: `border: 0.5px solid --border-rest`, `--ink-40`. Ranked: `background: --surface-selected`, `border: 0.5px solid --border-active`, DM Sans 500 `--text-xs` `--ink-100` showing the rank number (1, 2, 3…)
- Right side of tile: label + sublabel (standard tile pattern)
- On first tap: rank 1 assigned. On second tile tap: rank 2 assigned. And so on up to rank 3 (maximum).
- Tapping a ranked tile removes its rank and re-sequences all tiles below it (rank 2 becomes rank 1 if rank 1 is removed)
- Maximum 3 rankings accepted. Fourth tap on an unranked tile while 3 are ranked: does nothing. A subtle shake animation on the tile communicates the limit (translateX ±4px, 3 cycles, 80ms each).

---

## B3-B — Tenure (Branch B — follows B2-B)

### Purpose

Determines how long the user has held their current card. Duration changes the emotional and practical framing of the result — specifically, whether we recommend switching now, saving the recommendation for later, or investigating before switching.

---

### Layout

```
[Nav + progress bar ~15%]
[Centred content block]
  [Question text]
  [4 pill options — horizontal row]
[Auto-advances after selection]
```

---

### Components

**Question Text**
- Content: "How long have you / had this card?"

**Pill Select Row**
- `cw-pill` component
- 4 pills in a horizontal row, `flex-wrap: wrap`, centred, `--space-3` (8px) gap
- Options: "Under 6 months" / "6–12 months" / "1–3 years" / "Over 3 years"
- On selection: selected state, 275ms hold, then auto-advance

---

## B3-C — Multi-Card Search (Branch C — follows B2-C)

### Purpose

Identifies all cards the user currently holds so the engine can map existing stack coverage and identify genuine gaps. This is the input that makes the stack recommendation fundamentally different from a first-card recommendation.

---

### Layout

```
[Nav + progress bar ~15%]
[Centred content block]
  [Question text]
  [Selected chips row — grows as cards are added]
  [Search input]
  [Skip link]
[Continue button — appears immediately (skip is always valid)]
```

---

### Components

**Question Text**
- Content: "Which cards do you / already hold?"

**Selected Chips Row**
- Appears above the search input once at least one card is selected
- Chips: same spec as B2-B selected state, but multiple side-by-side, `flex-wrap: wrap`, `--space-2` (5px) gap
- Each chip has a ✕ to remove

**Search Input**
- Same spec as B2-B, with the same autocomplete behaviour
- Placeholder changes dynamically: "Add another card…" once first card is selected

**Skip Link**
- `cw-btn-text`, `--text-sm`, `--ink-40`, centred below continue button
- Content: "Skip — I'll add these later"
- Routes to B4 with E02 empty. Results will be limited.

---

## B4 — Spend Categories (All Branches — Shared)

### Purpose

The highest-signal question in the entire flow. First selection order produces the primary, secondary, and tertiary spend categories that the recommendation engine weights most heavily. The cap of three forces genuine prioritisation.

---

### Layout

```
[Nav + progress bar: A ~25%, B ~35%, C ~35%]
[Centred content block]
  [Question text]
  [Subinstruction]
  [2-column icon tile grid — 8 tiles]
  [Conditional: travel type inline expansion — appears if TRAVEL selected]
[Continue button — appears after first selection]
```

---

### Components

**Question Text**
- Content: "What does most of your / money actually go toward?"

**Subinstruction**
- DM Sans 400, `--text-xs`, `--ink-40`, centred
- Content: "Pick up to three. Your first choice carries the most weight."
- This line is important. It tells users that order matters — which means the most engaged users will think carefully about which to tap first.

**Icon Tile Grid**
- 2-column grid (mobile and desktop), max-width 380px, centred, `--space-3` (8px) gap
- Each tile: same `cw-tile` spec
  - Icon: SVG, 24×24px, drawn in `--ink-100` at `opacity: 0.45`
  - Label: DM Sans 500, `--text-md`, `--ink-100`
  - Sublabel: DM Sans 400, `--text-sm`, `--ink-60`
- First selected tile gets a "1" rank indicator (small pill, `--text-xs`, top-right corner of tile, `background: --ink-100`, `color: --surface-page`, `border-radius: --radius-full`, 18×18px)
- Second selection gets "2", third gets "3"
- Fourth tap on an unranked tile while 3 are selected: tile shakes (same spec as B2-C shake animation), does not select
- Tapping a selected tile: deselects and removes its rank number; lower-ranked tiles do not re-rank (order is preserved for those remaining)

**Travel Type Inline Expansion (Screen 4.1)**
- Triggers only if TRAVEL tile is selected
- Slides in below the grid — the grid does not move; the new element expands beneath it with a smooth height transition (200ms, `ease-out`)
- Content:
  - Label: DM Sans 500, `--text-xs`, uppercase, `--ink-40` — "WHEN YOU TRAVEL, IT'S MOSTLY…"
  - Two pills side by side: "Within India" / "International"
  - Selection auto-resolves E10 without advancing the screen
- If TRAVEL is deselected, this expansion collapses with the same 200ms transition

---

## B5 — Monthly Spend (All Branches — Shared)

### Purpose

Translates every card's reward rate into an absolute rupee value. Determines annual fee viability. The most mechanically important input for the recommendation engine, experienced by the user as the simplest interaction in the flow.

---

### Layout

```
[Nav + progress bar: A ~55%, B ~60%, C ~60%]
[Centred content block]
  [Question text]
  [Subline — reassurance about approximation]
  [Slider with snap labels]
  [Live preview line — updates as slider moves]
[Continue button — always visible, slider has a default position]
```

---

### Components

**Question Text**
- Content: "Roughly how much do you / spend on your card each month?"

**Subline**
- DM Sans 400, `--text-xs`, `--ink-40`, centred
- Content: "Approximate is fine. This helps us calculate real rupee values."
- This line reduces the anxiety of disclosing a number. It explicitly gives the user permission to be imprecise.

**Slider**
- `cw-slider` component
- Track: 1.5px, `rgba(26,25,22,0.15)`, `border-radius: --radius-full`
- Thumb: 21×21px circle, `background: --ink-100`, `box-shadow: 0 2px 8px rgba(26,25,22,0.20)`, scales to `1.15×` on hover
- Default position: S2 (₹10,000–₹25,000) — the most common bracket; not S1, which would undersell the product's scope
- 5 snap points at equal intervals (20%, 40%, 60%, 80%, 100% of track width)
- The slider uses `step` divisions — it is not a smooth continuous input. Snapping is built via JavaScript closest-snap on `input` event.

**Snap Labels Below Slider**
- `cw-slider-labels` class, `--text-xs`, `--ink-40`, letter-spacing 0.04em
- 5 labels: "< ₹10K" / "₹10K–25K" / "₹25K–50K" / "₹50K–1L" / "> ₹1L"
- Currently active label: `--ink-100`, DM Sans 500 (bold weight switch — no colour change)

**Live Preview Line**
- DM Sans 400, `--text-sm`, `--ink-60`, centred, margin-top `--space-4` (13px)
- Updates in real-time as the slider moves
- Content template: "At this spend level, annual fees up to [threshold] are worth considering."
  - S1: "₹500"
  - S2: "₹1,500"
  - S3: "₹3,000"
  - S4: "₹8,000"
  - S5: "₹15,000"
- The number transitions with a brief opacity pulse (80ms out, 80ms in) on change, so users notice the value is live.

**Continue Button**
- `cw-btn-primary`, full-width, max 380px, centred
- Visible immediately (unlike other screens) because there is always a valid default value
- Margin-top: `--space-5` (21px)

---

## B6-A — Income Bracket (Branch A Only — after B5)

### Purpose

The eligibility filter. Without it, a first-time user might receive recommendations for cards they cannot qualify for — a trust-destroying outcome. This question is asked last in Branch A because it is the most sensitive input, and by this point the user has invested enough in the flow to answer it.

---

### Layout

```
[Nav + progress bar ~80%]
[Centred content block]
  [Question text]
  [Subline — reassurance framing]
  [5 bracket tap cards — stacked vertically]
[Auto-advances after selection]
```

---

### Components

**Question Text**
- Content: "What is your approximate / annual income?"

**Subline**
- DM Sans 400, `--text-xs`, `--ink-40`, centred
- Content: "We use this only to filter out cards you're unlikely to qualify for."
- This is the most important subline in the flow. It explains the purpose of the question plainly. Users who understand why they are being asked something are far more likely to answer honestly.

**Bracket Tap Cards**
- Same `cw-tile` component, full-width, stacked
- No icon — purely typographic
- Label centred inside card, DM Sans 500, `--text-md`, `--ink-100`
- Sublabel: not required on these options — the bracket is self-explanatory
- Options:
  - "Under ₹3 lakhs per year"
  - "₹3 – ₹6 lakhs per year"
  - "₹6 – ₹12 lakhs per year"
  - "₹12 – ₹25 lakhs per year"
  - "Above ₹25 lakhs per year"
- On selection: 275ms hold, then auto-advance to result

---

# C — Result Screens

The result screens are where the product makes its case. The design must make the key number feel like a *reveal*, not a readout. These screens use the accent and semantic colour palette for the first time. They are the only screens in the product where colour appears meaningfully.

All result screens share:
- Background: `--surface-page`
- Progress bar: 100% width, held at full
- Navigation: back-chevron only, no logotype (this is the terminal state — the user has arrived)
- Action bar: always fixed at the bottom of the screen on mobile — Apply / Save / Share / Re-run

---

## C1 — Card Audit Result (Branch B)

### Purpose

The emotional core of the product. Shows the user what their current card earns, what the best alternative would earn, and the gap in plain rupees per year. If the gap is zero or minimal, the product says so honestly. If the gap is significant, the number does the work.

The result must feel like a discovery, not a verdict.

---

### Layout

```
[Nav — back chevron only, no logotype]
[Progress bar — 100%]
[Reveal Section — the gap number, centred, with framing text]
[Current card summary strip]
[Recommended card card]
[Supporting detail — expandable]
[Action bar — Apply / Save / Share / Re-run]
```

---

### Components

**Framing Line (above the number)**
- Playfair Display italic, `--text-lg` (21px), `line-height: 1.4`, `--ink-60`
- Centred, max-width 480px
- Content (positive gap): "You're leaving this much / on the table every year."
- Content (no gap / small gap): "Your current card is / already working well for you."
- Content (small gap — under ₹1,000): "There's a modest improvement available, / but your current card is a reasonable fit."
- This line enters first in the animation sequence — before the number. The delay makes the number feel awaited.

**The Gap Number — The Reveal**
- DM Sans 500, `--text-4xl` (68.47px), `line-height: 1`, `letter-spacing: -0.025em`, `--ink-100`
- Centred
- For zero/small gap: display the current card's net annual value instead of a gap. The framing line adjusts.
- The number does not appear immediately. It enters after the framing line has settled. This is the most choreographed moment in the entire product.
- Below the number: DM Sans 400, `--text-xs`, uppercase, `--ink-40`, letter-spacing 0.1em — "PER YEAR"

**Current vs Best — Two-Row Comparison Strip**
- Background: `--surface-card`, `border-radius: --radius-lg`, `border: 0.5px solid --border-rest`, padding `--space-5` (21px)
- Two rows inside, separated by a `0.5px` divider

Row 1 (current card):
- Left: Small card art thumbnail (34×22px flat-colour representation) + card name DM Sans 500 `--text-md` + bank DM Sans 400 `--text-sm` `--ink-60`
- Right: Annual return figure, DM Sans 500 `--text-lg` (21px), `--ink-60` (intentionally muted — this is the losing number)
- Below right: "per year" in `--text-xs` `--ink-40`

Row 2 (recommended card):
- Background: `--surface-selected`, to distinguish from row 1
- Left: Small eyebrow label above card name — `--text-xs`, uppercase, `--ink-40` — "RECOMMENDED"
- Left: Card name DM Sans 500 `--text-md` `--ink-100` + annual fee note DM Sans 400 `--text-sm` `--ink-60` (e.g. "₹2,500 annual fee · pays for itself at ₹15K/mo")
- Right: Annual return figure, DM Sans 500 `--text-lg` (21px), `--ink-100` (full weight — this is the winning number)
- Below right: "per year" in `--text-xs` `--ink-40`

Semantic colour application (first and only use of semantic palette in the flow):
- Row 1 right border: `3px solid --semantic-neutral` on left edge
- Row 2 right border: `3px solid --semantic-positive` on left edge
- These are the *only* colour signals in the result — subtle, warm, non-alarming.

**Supporting Detail — Expandable Section**
- Collapsed by default
- Trigger: `cw-btn-text` — "See how this is calculated →"
- Expands to show:
  - The spend categories the user selected
  - The reward rates applied for each category for both cards
  - The arithmetic: category spend × reward rate × 12 months = category contribution
  - Total earnings both cards, annual fee deducted, net value shown
- Typography: all `--text-sm`, `--ink-60` for the body, `--text-xs` `--ink-40` for the labels
- This section exists for users who distrust the result and want to verify the maths. It builds trust by being transparent.

**Honest Result Variant — When Current Card Wins**
- If the audit shows the current card is already the right fit (gap under ₹500):
  - The framing line changes to: "Your current card is already working well for you."
  - The gap number is replaced by the current card's net annual value (displayed as a positive)
  - Below the number: "No immediate switch recommended."
  - A contextual note below the comparison strip: "Here's how to get even more from your current card." — followed by 2–3 actionable tips specific to that card (waiver thresholds, reward categories, linked benefits)
  - There is no recommended card card in this state. The space where it would be is empty.
  - This is the most trust-building result the product can produce.

**Action Bar**
- Fixed at bottom of viewport on mobile; inline below the cards on desktop
- Four elements: Primary button ("Apply →") / Ghost button ("Save") / Ghost button ("Share") / Text button ("Re-run")
- Apply button: routes to the card's official application page (external link), opens in new tab
- Save button: if signed in, saves result to D1. If not, prompts with a modal to sign up / sign in.
- Share button: generates a shareable link (no personal data in the URL — only the anonymised recommendation result)
- Re-run: returns to B1 (entry gate), preserving no prior state

---

### Motion

The reveal sequence is the most carefully choreographed animation in the product:

1. (0ms) Framing line enters — `opacity 0 → 1`, `translateY(10px → 0)`, 680ms, `--ease-land`
2. (480ms from framing line start) Comparison strip enters — 520ms, `--ease-land`, `translateY(8px → 0)`
3. (800ms from framing line start) The gap number enters — this is the longest delay. The user has been reading the framing line and looking at the comparison. The number arrives when they are ready for it, not before. 680ms, `--ease-land`.
4. The number counts up from 0 to its value over 800ms using a custom easing that starts fast and decelerates. This is the only data animation in the product.
5. (after number settles, 300ms) Action bar rises into place — `translateY(100% → 0)` on mobile, opacity 0→1 on desktop, 280ms `--ease-land`

---

## C2 — Top 3 Recommendations (Branch A)

### Purpose

Shows three ranked cards to a first-time card seeker. The top card is the clear recommendation. The other two are visible alternatives in case the top card is unavailable or doesn't resonate. Each card shows its net annual value in rupees, a single reason it fits this user, and an honest weakness.

---

### Layout

```
[Nav — back chevron only]
[Progress bar — 100%]
[Intro line — contextual, not generic]
[Top card — featured, full-width]
[Alternatives — two cards, side-by-side or stacked]
[Action bar]
```

---

### Components

**Intro Line**
- Playfair Display italic, `--text-xl` (26.18px), `--ink-100`, left-aligned (this screen is not centred — it reads more like a recommendation letter)
- Content: personalised to spend categories — "For someone who spends mostly on [category], one card stands out."
- Margin-bottom: `--space-6` (34px)

**Top Card — Featured**
- Background: `--surface-card`, `border-radius: --radius-lg`, `border: 0.5px solid --border-rest`, `box-shadow: --shadow-md`
- Padding: `--space-6` (34px)
- Internal layout, top to bottom:
  - Eyebrow: `--text-xs`, uppercase, `--ink-40` — "BEST MATCH"
  - Card art: flat-colour 68×44px rounded rectangle (`border-radius: --radius-sm`) representing the card. No actual photography.
  - Card name: DM Sans 500, `--text-md`, `--ink-100`, margin-top `--space-3` (8px)
  - Issuer: DM Sans 400, `--text-sm`, `--ink-60`
  - Divider: `0.5px solid --border-rest`, margin `--space-4` (13px) vertical
  - Net value row: "₹X,XXX / year" — ₹ symbol DM Sans 400 `--text-lg`, number DM Sans 500 `--text-2xl` (30px) — this is the most prominent number on the card
  - Net value label: `--text-xs`, `--ink-40` — "net annual value on your spend"
  - Why it fits: DM Sans 400, `--text-sm`, `--ink-60`, `line-height: 1.618` — one sentence. Begins with "Because you spend heavily on [category]…"
  - Annual fee note: `--text-xs`, `--ink-40` — "₹X,XXX annual fee · waived in first year" or "No annual fee"
  - Weak point: DM Sans 400, `--text-xs`, `--ink-40` — "Weaker on: [category]" — honest signal. Never suppressed.
- Accent bar: `3px` left border in `--accent-warm` (#E8DDD0). This is the first non-neutral colour in the Branch A flow.

**Alternative Cards — Two Smaller Cards**
- Max-width: matched to top card, side-by-side on desktop, stacked on mobile
- Same structure as top card but condensed:
  - No card art (space is at a premium)
  - Net value: `--text-xl` (26.18px) — smaller than top card
  - One-line fit reason
  - Annual fee note
  - No left accent bar — these are clearly secondary

**Action Bar**
- Same as C1 but Apply is labelled "Apply for [card name] →" — personalised

---

## C3 — Stack Analysis (Branch C)

### Purpose

Shows optimisers what their current card stack covers well, where it is genuinely weak, and which single card would fill the most gaps. This is the most complex result screen.

---

### Layout

```
[Nav — back chevron only]
[Progress bar — 100%]
[Stack Coverage Map — visual coverage grid]
[Gap callout — the single most important gap]
[Recommended addition — one card]
[Synergy note — how this card works with the existing stack]
[Action bar]
```

---

### Components

**Stack Coverage Map**
- A grid showing all 8 spend categories
- Each category cell: 2-column layout — category name left, coverage indicator right
- Coverage indicator: a small pill — `border-radius: --radius-full`, `--text-xs`, padding `--space-2 --space-3` (5px 8px)
  - Well covered: `background: --semantic-positive`, `--ink-100` text — "Strong"
  - Adequately covered: `background: --semantic-neutral`, `--ink-100` text — "OK"
  - Gap: `background: --semantic-signal`, `--ink-100` text — "Gap"
  - Not applicable: `--ink-40` text — "Not in your spend"
- Heading: DM Sans 500, `--text-xs`, uppercase, `--ink-40` — "YOUR CURRENT STACK COVERS"
- Note: these are the first uses of all three semantic colours

**Gap Callout**
- A single prominent block, `background: --surface-elevated`, `border-radius: --radius-lg`, padding `--space-5`
- Headline: Playfair Display italic, `--text-xl`, `--ink-100` — "Your biggest gap is [category]."
- Subtext: DM Sans 400, `--text-sm`, `--ink-60` — quantified: "Your current cards return approximately ₹X on [category] annually. The right card here returns ₹Y."

**Recommended Addition — One Card**
- Same spec as the top card in C2 but with an added "Synergy" row below the weak point
- Synergy note: DM Sans 400, `--text-sm`, `--ink-60` — "Pairs well with your [existing card] because…"

---

# D — Account & Saved Pages

---

## D1 — Saved Results Dashboard

### Purpose

A returning user's home. Shows all saved recommendations with the date they were generated. Allows re-running any result with fresh inputs. Enables the "are you still on the right card?" audit flow for users who return after several months.

---

### Layout

```
[Navigation — full nav, signed-in state]
[Page header]
[Saved result cards — chronological, most recent first]
[Empty state — if nothing saved]
```

---

### Components

**Navigation — Signed In State**
- Left: logotype (Playfair Display italic, links to A1)
- Right: "New recommendation" primary button (small, `cw-btn-primary cw-btn-sm`) + Account avatar (initials circle, 32×32, `--surface-selected`, `--ink-100`)

**Page Header**
- Playfair Display italic, `--text-2xl`, `--ink-100`, left-aligned
- Content: "Your recommendations."
- Subline: DM Sans 400, `--text-sm`, `--ink-60` — "Saved results from your past sessions."

**Saved Result Card**
- `cw-card` component
- Padding: `--space-5` (21px)
- Top row: date label (`--text-xs`, `--ink-40`) left / result type label right (`--text-xs`, uppercase, `--ink-40` — "CARD AUDIT" / "FIRST CARD" / "STACK ANALYSIS")
- Card name or result headline: DM Sans 500, `--text-md`, `--ink-100`
- Net value or gap number: DM Sans 500, `--text-lg`, `--ink-100`
- Row of ghost buttons: "View result" / "Re-run" / "Delete"
- If the saved result is more than 6 months old, a contextual banner appears below: `background: --semantic-signal`, `border-radius: --radius-sm`, padding `--space-3`, `--text-xs`, `--ink-100` — "This result is 7 months old. Your spending may have changed. Re-run for a fresh recommendation."

**Empty State**
- Centred, generous vertical padding (`--space-8`, 89px)
- Playfair Display italic, `--text-xl`, `--ink-60` — "No saved results yet."
- Subline: DM Sans 400, `--text-sm`, `--ink-60` — "Complete a recommendation to save it here."
- Primary button: "Start a recommendation →"

---

## D2 — Account Settings

### Purpose

Email, password, notification preferences, connected data, and account deletion. Minimal. Everything the user needs to manage their relationship with the product — nothing more.

---

### Layout

```
[Navigation — same signed-in state]
[Page header]
[Settings sections — email / password / notifications / data / danger zone]
```

---

### Components

**Page Header**
- Playfair Display italic, `--text-2xl`, left-aligned
- Content: "Account."

**Settings Sections**
- Each section: a `cw-card` with a section label (`--text-xs`, uppercase, `--ink-40`) and the relevant inputs/controls
- Email section: current email displayed, "Change email" ghost button
- Password section: "Change password" ghost button only — never show password fields by default
- Notifications section: two toggle switches (a custom-built toggle using `--surface-selected` and `--ink-100`, not a browser default) — "Email me when cards I've saved change in rewards or fees" / "Monthly re-run reminder"
- Data section: "Download my data" ghost button / "What data do we store?" text link (routes to a modal with plain-language explanation)
- Danger zone section: separated by extra margin, `border: 0.5px solid rgba(220,60,60,0.2)` (the only red-adjacent element in the product), "Delete my account and all data" — a text button that triggers a confirmation modal before executing

---

# E — Supporting Pages

---

## E1 — Privacy Policy

Plain language first. Legal language in a collapsible section for those who need it. DM Sans 400, `--text-base`, `--ink-60`, `line-height: 1.618`. Max-width 640px, centred. No design system decorations — this is a reading document. The navigation and footer are present.

## E2 — Terms of Service

Same layout as E1.

## E3 — Advertise With Us / Partnerships

A separate minimal page for card issuers and banks who want to understand how Cardwise's recommendation model works and what the referral relationship looks like. This page is not linked from the main navigation — only from the footer. It is not styled to sell. It is styled to inform, in the same register as the about page.

## E4 — How We Make Money

A dedicated short-form page expanding on the business model section in A2. Exists separately so it can be linked directly. Same editorial layout as the About page. Plain language. Direct.

## E5 — Card Not Found / 404

- Centred layout, full viewport height
- Playfair Display italic, `--text-3xl`, `--ink-60` — "This page doesn't exist."
- Subline: DM Sans 400, `--text-sm`, `--ink-60` — "But the right card for you does."
- Primary button: "Start a recommendation →"
- The 404 page maintains the product's voice. It is never apologetic or panicked.

---

## Component Usage Across Pages — Quick Reference

| Component | Pages Used |
|-----------|-----------|
| `cw-tile` (icon tile) | B2-A, B4 |
| `cw-tile` (tap card) | B1, B6-A |
| `cw-tile` (ranked) | B2-C |
| `cw-pill` | B3-B, B4.1 |
| `cw-input` (text) | A3, B2-B, B3-C |
| `cw-input` (autocomplete) | B2-B, B3-C |
| `cw-slider` | B5 |
| `cw-btn-primary` | A1, A2, A3, B (continue), C (apply) |
| `cw-btn-ghost` | A3, C (save/share), D1, D2 |
| `cw-btn-text` | A1, B (skip), C (re-run, expand) |
| `cw-card` | C1, C2, C3, D1, D2 |
| `cw-reveal-number` | C1, C2, C3 |
| `cw-progress-track` | B1 through B6 |
| Semantic colours (positive/neutral/signal) | C1, C3 only |
| Accent colours (warm/cool/moss/amber) | C1, C2 only |

---

## Notes on What This Document Does Not Cover

**The recommendation engine itself** — the scoring formula, the card database schema, the reward-to-rupee valuation model — is documented separately in the question system and engine parameter document.

**Animation implementation detail** — the motion tokens are defined in the design system. The sequencing logic per page is described here. The actual CSS/JS implementation is the frontend engineer's domain.

**Error and loading states** — every interactive screen should have a loading state (for the autocomplete search: a spinner inside the input field, `--ink-40`, 16px, spins at 1 rotation/800ms) and an error state (for failed searches or API errors: an inline note in `--text-xs` `--ink-60` below the relevant input — never a modal, never a toast, never a blocking overlay).

**Responsive breakpoints** — the design system specifies 480px and 768px as breakpoints. All layout descriptions above are mobile-first (375px base). Desktop variations for each page follow naturally from the grid and max-width constraints described.

---

*End of document.*
