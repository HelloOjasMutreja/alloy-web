# Cardwise — Question System, Branching Logic & Engine Parameter Mapping

---

## Part 1 — What the Rule-Based Engine Actually Needs to Know

Before laying out the question sequence, it is important to define what the recommendation engine is solving for. Every user-facing question exists to populate one or more of these engine parameters. This is the complete parameter set.

---

### Engine Parameter Registry

| ID | Parameter | Type | Purpose |
|----|-----------|------|---------|
| E01 | User intent class | Enum: FIRST / AUDIT / OPTIMISE | Routes the result type and filters available cards |
| E02 | Current card(s) held | Array of card IDs | Enables audit diff, prevents recommending duplicates |
| E03 | Card tenure | Enum: <6m / 6–12m / 1–3y / 3y+ | Signals switching urgency, reward accumulation context |
| E04 | Primary spend category | Enum (8 options) | Highest weight input for reward rate matching |
| E05 | Secondary spend category | Enum (8 options) | Second weight input |
| E06 | Tertiary spend category | Enum (8 options) or NULL | Third weight input |
| E07 | Monthly spend bracket | Enum: 5 levels | Determines annual fee viability, absolute reward value |
| E08 | Annual income bracket | Enum: 5 levels | Eligibility filter — hard eliminates cards above income threshold |
| E09 | Priority ranking | Ordered array (up to 4 items) | Tiebreaker when two cards score similarly on spend match |
| E10 | Travel type | Enum: NONE / DOMESTIC / INTERNATIONAL | Unlocks or suppresses lounge, forex, miles category |
| E11 | Fee sensitivity class | Enum: LOW / MED / HIGH | Derived — not directly asked |
| E12 | Credit profile tier | Enum: THIN / STANDARD / PRIME | Derived — not directly asked |
| E13 | Existing stack coverage | Bitfield across categories | Derived from E02 — used in OPTIMISE path only |
| E14 | Spend-to-fee ratio | Float | Derived — monthly spend × 12 ÷ card annual fee |

Parameters E11, E12, E13, E14 are never asked directly. They are computed from other parameters. This is the core principle: ask the minimum, derive the maximum.

---

## Part 2 — Complete Question Sequence

Each question entry includes:
- The question as shown to the user
- Input type and full option set with values
- Which engine parameter(s) it populates
- Any derived parameters it enables
- Notes on logic and edge cases

---

### Screen 0 — Landing

Not a question. The landing screen sets the register. The only action is "Begin."

No engine parameters populated here.

---

### Screen 1 — Entry Gate (All Users)

**User-facing question:**
*Do you currently have a credit card?*

**Input type:** Tap cards (single select, full-width, one visible at a time on mobile — stacked vertically)

**Options:**

| Value | Display label | Sublabel |
|-------|--------------|---------|
| FIRST | No — looking for my first card | New to credit |
| AUDIT | Yes — not sure it's right for me | Want to review or switch |
| OPTIMISE | Yes — want to add another card | Optimising my stack |

**Engine parameters populated:**
- E01 (User intent class) — primary routing parameter

**Derived parameters enabled:**
- E11 partial (Fee sensitivity class) — FIRST users are assumed HIGH sensitivity until E07 overrides
- E12 partial (Credit profile tier) — FIRST users are assumed THIN until E08 provides income context

**Branching:** This is the only full branch point in the flow. After this screen, the three paths diverge before merging again at Screen 5.

---

### Screen 2A — Branch A (FIRST users only)

**User-facing question:**
*What are you hoping to get from a credit card?*

**Input type:** Icon tiles (single select, 2-column grid)

**Options:**

| Value | Display label | Sublabel | Icon shape |
|-------|--------------|---------|-----------|
| SAVINGS | Save money on everyday spending | Cashback and offers | Coin |
| REWARDS | Earn points and redeem for things | Flights, vouchers, shopping | Star |
| BUILD_CREDIT | Build my credit history | For better loans later | Chart rising |
| TRAVEL | Travel smarter and cheaper | Lounge access, forex, miles | Plane |
| NOT_SURE | Not sure yet | Help me figure it out | Question mark |

**Engine parameters populated:**
- E09 (Priority ranking) — the selected goal seeds the first item in the priority order
- E10 partial (Travel type) — if TRAVEL selected, follow-up logic activates at Screen 5

**Derived parameters enabled:**
- NOT_SURE selection triggers a conservative recommendation path: the engine defaults to a no-fee or low-fee cashback card until more signal exists

**Note:** This question is unique to Branch A because first-time users often do not know what they want from a card. The goal framing is more fundamental than feature preference. This is not asked on B or C because those users have already experienced a card and have revealed preferences.

---

### Screen 2B — Branch B (AUDIT users only)

**User-facing question:**
*Which card do you currently have?*

**Input type:** Search with autocomplete (type-ahead against card database, showing card name + issuer + card art thumbnail)

**Parameters:**
- Minimum 2 characters to trigger search
- If no match found: "I don't see my card" option appears, which routes to a simplified manual entry (issuer dropdown + card tier: basic / mid-tier / premium)
- Maximum 1 card selected on this screen (multi-card scenario is handled in Branch C)

**Engine parameters populated:**
- E02 (Current card held) — primary card ID stored
- E04, E05 partial (Spend categories) — the known reward structure of the selected card provides a weak prior on likely spend categories. This prior is overwritten by Screen 5.
- E03 activated — tenure question (Screen 3B) becomes contextually relevant

**Derived parameters enabled:**
- E13 partial (Existing stack coverage) — even with one card, the engine now knows what categories are currently being served
- E14 enabled — spend-to-fee ratio will be calculable once E07 is collected

---

### Screen 2C — Branch C (OPTIMISE users only)

**User-facing question:**
*What do you most want your next card to do for you?*

**Input type:** Ranked priority tiles (tap to add in order — first tap = rank 1, second tap on another tile = rank 2, etc. Tap a selected tile again to deselect and re-rank)

**Options:**

| Value | Display label | Sublabel |
|-------|--------------|---------|
| MAXIMISE_REWARDS | Maximise total rewards | Get the most back on all spending |
| FILL_GAPS | Fill gaps in my current stack | Cover what my other cards miss |
| TRAVEL_UPGRADE | Upgrade my travel benefits | Better lounges, miles, insurance |
| PREMIUM_ACCESS | Premium lifestyle access | Golf, concierge, dining privileges |
| LOWER_COST | Reduce what I spend on fees | Consolidate or downgrade |

**Minimum selection:** 1. Maximum: 3. The ranked order matters — rank 1 has 3× the weight of rank 3 in the engine.

**Engine parameters populated:**
- E09 (Priority ranking) — full ordered array
- E10 partial — if TRAVEL_UPGRADE is in top 2, travel type follow-up activates

**Note:** This is the only input in the entire flow that uses ranked ordering rather than simple multi-select. The reason: optimisers have genuine preference hierarchies. A user who ranks FILL_GAPS first and TRAVEL_UPGRADE second should get a very different recommendation than one who ranks these in reverse, even with identical spending data.

---

### Screen 3B — Branch B only (follows 2B)

**User-facing question:**
*How long have you had this card?*

**Input type:** Pill select (single select, horizontal row — 4 pills)

**Options:**

| Value | Display label |
|-------|--------------|
| UNDER_6M | Under 6 months |
| 6M_TO_1Y | 6 months to a year |
| 1Y_TO_3Y | 1 to 3 years |
| OVER_3Y | More than 3 years |

**Engine parameters populated:**
- E03 (Card tenure)

**Derived parameters enabled:**
- Switching urgency signal: UNDER_6M suppresses "switch now" language in results even if the audit shows a gap (too early to have meaningful reward history, and switching too fast harms credit score). The result copy adjusts accordingly.
- OVER_3Y elevates the gap calculation's emotional weight in result copy — more time spent on a suboptimal card means a larger cumulative opportunity cost.

**Note:** This question is Branch B only. Branch C users imply tenure by the fact they are adding a card. Branch A users have no card to ask about.

---

### Screen 3C — Branch C only (follows 2C)

**User-facing question:**
*Which cards do you already hold?*

**Input type:** Multi-search (same autocomplete as 2B, but allows multiple selections — each selected card appears as a removable chip above the search bar)

**Parameters:**
- Minimum 0 (user can skip with "I'll add these later" — routes to a limited result)
- Maximum 5
- Same "I don't see my card" fallback as 2B

**Engine parameters populated:**
- E02 (Current cards held) — full array
- E13 (Existing stack coverage) — computed immediately from the card IDs. Each card has known strong/weak category coverage in the database. The engine builds a coverage bitfield across all 8 spend categories showing what is already well-served.

**Derived parameters enabled:**
- Gap analysis becomes possible: the engine now knows exactly which categories are underserved by the current stack
- E14 per card — spend-to-fee ratio will be calculable per card once E07 is known

---

## Part 3 — Shared Question Block (All Branches Merge Here)

All three branches converge at Screen 4. The user experience of merging is invisible — there is no "now for everyone" signal. The questions simply continue with the same visual language.

---

### Screen 4 — Shared Question 1 (All Users)

**User-facing question:**
*What does most of your money actually go toward?*

**Input type:** Icon tiles, pick up to 3, 2-column grid (mobile) / 4-column grid (desktop). Selection order matters — first selected tile is treated as primary, second as secondary, third as tertiary.

**Options:**

| Value | Display label | Sublabel | Icon |
|-------|--------------|---------|------|
| ONLINE_SHOPPING | Online shopping | Amazon, Flipkart, Myntra | Bag |
| DINING | Food and dining | Restaurants, Zomato, Swiggy | Fork |
| TRAVEL | Travel and flights | Hotels, flights, cabs | Plane |
| FUEL | Fuel | Petrol and diesel | Fuel pump |
| GROCERIES | Groceries | Supermarkets, BigBasket | Basket |
| UTILITIES | Bills and utilities | Electricity, rent, subscriptions | Bolt |
| ENTERTAINMENT | Entertainment | OTT, movies, events | Play |
| GENERAL | General spending | Everything a bit evenly | Grid |

**Selection constraint:** Maximum 3. If user selects GENERAL as one of their three, it is treated as a residual catch-all and given lower individual weight. If GENERAL is the only selection, the engine treats the user as a uniform spender and optimises purely for flat cashback rate.

**Engine parameters populated:**
- E04 (Primary spend category) — first tile selected
- E05 (Secondary spend category) — second tile selected
- E06 (Tertiary spend category) — third tile selected, or NULL

**Derived parameters enabled:**
- E10 partial — if TRAVEL is in E04 or E05, travel type follow-up logic activates (handled within Screen 5 as a conditional branch within the shared block, not a full separate screen — see Screen 4.1 below)
- E11 partial — UTILITIES heavy spend suggests bill payment behaviour, which affects which card features are relevant

**Note:** This is the highest signal question in the entire flow. It has more weight in the recommendation engine than any other single input. The forced cap of 3 selections is intentional and critical — it produces prioritised signal, not a uniform list. A user who selects "everything" is telling us nothing useful.

---

### Screen 4.1 — Conditional Sub-Question (Activates if TRAVEL selected in Screen 4, or TRAVEL-related goal in 2A/2C)

This is not a full screen transition. It is an inline expansion within Screen 4 — after the tile grid settles, an additional small question fades in below the tiles.

**User-facing question:**
*When you travel, is it mostly...*

**Input type:** Pill select (2 options only, horizontal)

**Options:**

| Value | Display label |
|-------|--------------|
| DOMESTIC | Within India |
| INTERNATIONAL | International |

**Engine parameters populated:**
- E10 (Travel type) — fully resolved

**Note:** If INTERNATIONAL is selected, the engine activates forex markup as a filter parameter. Cards with high forex markup fees are downweighted. If DOMESTIC, domestic lounge access and railway lounge access become relevant; international lounges are deprioritised. This one question significantly forks the travel card recommendation — the Axis Atlas and the Niyo Global are good answers to very different versions of "I travel."

---

### Screen 5 — Shared Question 2 (All Users)

**User-facing question:**
*Roughly how much do you spend on your card each month?*

**Input type:** Labelled slider with 5 snap points. The slider does not show a continuous range — it snaps to five clearly labelled positions. This is the key UX decision: it reduces the anxiety of disclosing financial information by making it approximate and categorical.

**Snap points:**

| Value | Display label | Internal value used for calculation |
|-------|--------------|-------------------------------------|
| S1 | Under ₹10,000 | ₹7,000 (midpoint) |
| S2 | ₹10,000 – ₹25,000 | ₹17,500 |
| S3 | ₹25,000 – ₹50,000 | ₹37,500 |
| S4 | ₹50,000 – ₹1,00,000 | ₹75,000 |
| S5 | Over ₹1,00,000 | ₹1,25,000 |

**Engine parameters populated:**
- E07 (Monthly spend bracket)

**Derived parameters enabled:**
- E11 (Fee sensitivity class) — fully resolved:
  - S1 → HIGH (annual fees above ₹500 need strong justification)
  - S2 → MED (fees up to ₹1,500 are viable if rewards exceed 2×)
  - S3 → MED-LOW (fees up to ₹3,000 are viable)
  - S4 → LOW (premium cards with ₹5,000–10,000 fees become viable)
  - S5 → LOW (super-premium cards viable)
- E14 (Spend-to-fee ratio) — computed for every card in the recommendation shortlist. Cards where annual fee > 15% of annual rewards earned at this spend level are filtered out.

**Note:** This question is doing more work than it appears. It is simultaneously:
1. The primary input to the fee viability filter
2. The multiplier that converts reward rates into absolute rupee values
3. The input that determines whether premium welcome bonuses are "worth it" relative to ongoing value

A user at S1 spending ₹7,000/month should never be recommended the HDFC Infinia (₹12,500 fee) regardless of reward fit. A user at S4 spending ₹75,000/month should almost never be recommended a no-fee cashback card — they are leaving disproportionate value unclaimed.

---

### Screen 6 — Branch A Only (After Shared Questions)

**User-facing question:**
*What is your approximate annual income?*

**Input type:** Bracket selector (vertical card stack, single select — styled like the tap cards on Screen 1 but without icons, purely typographic)

**Options:**

| Value | Display label | Internal threshold |
|-------|--------------|-------------------|
| I1 | Under ₹3 lakhs | ₹3,00,000 |
| I2 | ₹3 – ₹6 lakhs | ₹6,00,000 |
| I3 | ₹6 – ₹12 lakhs | ₹12,00,000 |
| I4 | ₹12 – ₹25 lakhs | ₹25,00,000 |
| I5 | Above ₹25 lakhs | ₹25,00,000+ |

**Engine parameters populated:**
- E08 (Annual income bracket) — hard eligibility filter

**Derived parameters enabled:**
- E12 (Credit profile tier) — fully resolved for Branch A:
  - I1 + FIRST → THIN profile. Only basic and entry-level cards shown.
  - I2 → THIN to STANDARD. Entry and mid-tier cards.
  - I3 → STANDARD. Mid-tier and some premium cards.
  - I4 → PRIME. All cards available.
  - I5 → PRIME. Super-premium cards (Infinia, Magnus, Centurion) available.

**Why this question appears only for Branch A:**

For Branch B and C users, income is proxied by the card(s) they already hold. A user who holds the HDFC Diners Black or the Amex Platinum has already passed a ₹15–18 lakh income threshold for those cards. Asking them their income is redundant and mildly insulting. For first-time users, there is no proxy — the question is necessary for eligibility filtering.

**Placement note:** This question is placed last in Branch A's flow, not first. By the time it is asked, the user has already answered three other questions and invested in the experience. The question feels less intrusive at the end than it would at the start. The framing of the bracket options (approximate, not exact) further reduces anxiety.

---

## Part 4 — Full Branching Map

```
Screen 1: Entry Gate
│
├── FIRST ──► Screen 2A (Goal tiles)
│               │
│               └──► Screen 4 (Spend categories) ──► 4.1? ──► Screen 5 (Spend slider) ──► Screen 6 (Income) ──► RESULT A
│
├── AUDIT ──► Screen 2B (Card search)
│               │
│               └──► Screen 3B (Tenure pills)
│                       │
│                       └──► Screen 4 (Spend categories) ──► 4.1? ──► Screen 5 (Spend slider) ──► RESULT B
│
└── OPTIMISE ──► Screen 2C (Priority ranked tiles)
                    │
                    └──► Screen 3C (Multi-card search)
                            │
                            └──► Screen 4 (Spend categories) ──► 4.1? ──► Screen 5 (Spend slider) ──► RESULT C
```

Screen 4.1 is a conditional inline expansion — not a full screen. It activates if and only if TRAVEL is selected in Screen 4, or if a travel-related goal was selected in 2A or 2C.

Screen 6 is Branch A only and does not exist in Branches B or C.

**Question counts by branch:**

| Branch | Screens | Total questions faced by user |
|--------|---------|-------------------------------|
| A (First card) | 1 → 2A → 4 → (4.1) → 5 → 6 | 5 questions, 6 if travel |
| B (Audit) | 1 → 2B → 3B → 4 → (4.1) → 5 | 5 questions, 6 if travel |
| C (Optimise) | 1 → 2C → 3C → 4 → (4.1) → 5 | 5 questions, 6 if travel |

All three branches have the same depth. No user is penalised with extra questions based on their path.

---

## Part 5 — Engine Parameter Population by Question

This is the key mapping: which user-facing question populates which engine parameters. One question can populate multiple parameters — this is where the efficiency of the system lies.

| Screen | User question | Engine parameters populated | Derived parameters enabled |
|--------|--------------|----------------------------|---------------------------|
| 1 | Do you have a card? | E01 | E11 partial, E12 partial |
| 2A | What is your goal? | E09 (seeded) | E10 partial |
| 2B | Which card do you hold? | E02, E04/E05 (prior) | E13 partial, E14 enabled |
| 2C | What do you want to optimise for? | E09 (full ranked) | E10 partial |
| 3B | How long held? | E03 | Switching urgency signal |
| 3C | Which cards do you hold? | E02 (full), E13 | E14 per card |
| 4 | What do you spend on? | E04, E05, E06 | E10 partial, E11 partial |
| 4.1 | Domestic or international? | E10 (resolved) | Forex filter, lounge filter |
| 5 | Monthly spend? | E07 | E11 (resolved), E14 (computed) |
| 6 | Annual income? | E08 | E12 (resolved) |

### Parameters never directly asked — fully derived:

**E11 (Fee sensitivity class):**
Derived from E07 (monthly spend bracket) with a correction if E08 is available.
- S1 spend → HIGH sensitivity regardless of income
- S2–S3 spend + I1–I2 income → HIGH-MED
- S3–S4 spend + I3–I4 income → LOW-MED
- S4–S5 spend + I4–I5 income → LOW

**E12 (Credit profile tier):**
For Branch A: derived from E08 (income bracket).
For Branches B and C: derived from E02 (cards held). Each card in the database has a known minimum income requirement. The highest such requirement among the user's current cards becomes their implied minimum tier.

**E13 (Existing stack coverage):**
Derived from E02. Each card in the database has a known reward category map (which categories it serves well, adequately, or poorly). The union of all held cards' category maps produces a coverage bitfield. The complement of this bitfield is the gap map — this is the primary input to RESULT C.

**E14 (Spend-to-fee ratio):**
Derived from E02 + E07. For each card being considered: (annual fee) ÷ (estimated annual rewards at the user's spend level and category mix). If this ratio exceeds 0.5 (fee is more than 50% of rewards), the card is suppressed unless the user's E09 priority explicitly includes PREMIUM_ACCESS (indicating willingness to pay for non-reward benefits).

---

## Part 6 — Edge Cases and Resolution Rules

**User selects GENERAL as their only spend category (Screen 4):**
E04 = GENERAL, E05 = NULL, E06 = NULL. Engine routes to flat cashback optimisation. The top card at each spend tier for flat cashback is surfaced. No category-specific weighting applied.

**User cannot find their card in Screen 2B or 3C:**
Fallback to manual entry: issuer (dropdown of 12 major issuers) + tier (Basic / Mid-tier / Premium / Super-premium). Engine uses the issuer + tier to infer an approximate income threshold for E12, and a generic reward category map for E13. Results are marked with a "based on approximate card details" qualifier.

**User selects UNDER_6M for tenure in Screen 3B:**
Result B is modified: the rupee gap is shown, but the primary recommendation is framed as "when you are ready to switch" (after 12 months of history, to avoid credit score impact from a new account too soon). The apply button is replaced with a "save for later" option.

**User on Branch A selects NOT_SURE as their goal (Screen 2A):**
E09 is seeded with a default priority order: SAVINGS first, then BUILD_CREDIT. This reflects the statistically most common need for first-time card seekers. The user can override this in the result screen via a "change priorities" option.

**User on Branch C skips the card search (Screen 3C — "I'll add these later"):**
E02 is empty. E13 cannot be computed. Engine falls back to a fresh recommendation based purely on E09 and E04–E07. The result is labelled as a "standalone recommendation" rather than a stack analysis. A prompt to add their current cards for a proper stack analysis appears below the results.

**Monthly spend S5 (over ₹1,00,000) selected but income bracket I1 or I2:**
Logical inconsistency. The engine does not alert the user — it resolves silently by using the income bracket as the binding constraint for eligibility filtering, and uses S4 (₹75,000) as the effective spend level for reward calculations. This prevents recommending cards the user cannot qualify for simply because of an overstated spend figure.

**No card passes the eligibility filter after all parameters are collected:**
This should never happen — there are always entry-level cards available at any income level. But if the engine returns zero results above a quality threshold, the result screen shows one qualifying card and a clear message: "Based on your profile, this is the strongest card available to you right now. Here is what to do to qualify for better options in 12 months." This is followed by 2–3 concrete actions (increase spend utilisation, pay on time, etc.).

---

## Part 7 — Input Type Rationale Summary

| Input type | Used for | Why |
|------------|---------|-----|
| Tap cards (full-width, stacked) | Entry gate, income bracket | High-stakes single choice. Full width signals weight and commitment. |
| Icon tiles, single select | Goal (2A) | First-timers need visual anchors. Icons reduce reading load. |
| Search + autocomplete | Card lookup (2B, 3C) | Users cannot remember card names reliably. Search is the only honest interface. |
| Ranked priority tiles | Optimise priority (2C) | Order is the signal. Multi-select without ordering loses critical information. |
| Pill select | Tenure (3B), travel type (4.1) | Small set of mutually exclusive options. Pills are faster than cards at this scale. |
| Icon tiles, multi-select up to 3 | Spend categories (4) | Visual, fast, and the selection order becomes the priority ranking. |
| Snapping slider | Monthly spend (5) | Approximation is the goal. Snap points reduce precision anxiety. Continuous input is wrong here. |

---

*End of document.*
