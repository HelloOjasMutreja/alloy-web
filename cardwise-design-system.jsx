import { useState } from "react";

// ─── GOLDEN RATIO CONSTANT ──────────────────────────────────────────────────
const φ = 1.618033988749895;

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const tokens = {

  // COLOR SYSTEM
  // Ink palette — warm toned, three stops
  color: {
    // Page surfaces
    pageBg:       "#F9F8F5",  // warm parchment — not white
    cardSurface:  "#FFFFFF",  // card base
    selected:     "#EDECE7",  // pressed-in state
    elevated:     "#F4F3EF",  // subtle lift
    border:       "rgba(26,25,22,0.11)",   // resting
    borderHover:  "rgba(26,25,22,0.25)",   // hover
    borderActive: "rgba(26,25,22,0.36)",   // selected

    // Ink palette
    ink100: "#1A1916",  // warm near-black
    ink60:  "#7C7B73",  // secondary / sublabels
    ink40:  "#AEADA8",  // tertiary / meta

    // Accent pastels — ultra restrained, single hue family
    // Used only in result screens, never as interactive signals
    accentWarm:   "#E8DDD0",  // warm sand accent
    accentCool:   "#D8DFE8",  // slate cool accent
    accentMoss:   "#D4DDD4",  // sage green accent
    accentAmber:  "#E8E0CC",  // amber tint

    // Semantic (result screen only — never in the main flow)
    positive: "#C8D8C4",  // muted sage — "you're ahead"
    neutral:  "#E0DDD8",  // warm grey — "about right"
    signal:   "#DDD4C4",  // warm amber — "opportunity"

    // True white & black references
    white: "#FFFFFF",
    black: "#1A1916",
  },

  // TYPOGRAPHY SCALE — Golden Ratio from base 10px upward
  // 10 × φ = 16.18 × φ = 26.17 × φ = 42.33 × φ = 68.47
  // Rounded to practical values, honoring the spec
  type: {
    // Scale steps
    "3xs": "6.18px",   // 10 / φ / φ / φ — ornamental
    "2xs": "7.64px",   // 10 / φ / φ    — ornamental
    xs:    "10px",     // base-0      — meta text, uppercase labels
    sm:    "11.5px",   // ~between    — sublabels (spec: 11.5px)
    md:    "13.5px",   // ~between    — card labels (spec: 13.5px)
    base:  "16.18px",  // base-1 (10×φ) — body
    lg:    "21px",     // base-2 approx — body large
    xl:    "26.18px",  // base-2 (10×φ×φ) — section titles
    "2xl": "30px",     // question text (spec: 29–31px)
    "3xl": "42.33px",  // base-3 (10×φ³) — hero headline
    "4xl": "68.47px",  // base-4 (10×φ⁴) — display / result number
    "5xl": "110.7px",  // base-5 — ultra display

    // Line heights — φ based
    tight:   "1.21",   // hero / display
    snug:    "1.33",   // question text
    normal:  "1.5",    // body
    relaxed: "1.618",  // φ itself — reading text
    loose:   "2.0",    // spacious

    // Letter spacing
    tighter: "-0.025em",  // hero
    tight2:  "-0.015em",  // question
    normal2: "0em",
    wide:    "0.05em",
    wider:   "0.08em",
    widest:  "0.1em",     // meta uppercase

    // Font weights (DM Sans)
    regular: "400",
    medium:  "500",
    semibold: "600",

    // Families
    serif: "'Playfair Display', Georgia, serif",
    sans:  "'DM Sans', system-ui, sans-serif",
  },

  // SPACING SCALE — Fibonacci sequence (which converges to φ ratios)
  // 3, 5, 8, 13, 21, 34, 55, 89, 144 ...
  space: {
    "1":  "3px",   // micro gap
    "2":  "5px",   // tight gap
    "3":  "8px",   // base unit
    "4":  "13px",  // standard gap
    "5":  "21px",  // card padding
    "6":  "34px",  // section gap
    "7":  "55px",  // major section
    "8":  "89px",  // hero padding
    "9":  "144px", // full section
    // Named aliases
    micro:   "3px",
    tight:   "5px",
    base:    "8px",
    md:      "13px",
    lg:      "21px",
    xl:      "34px",
    "2xl":   "55px",
    "3xl":   "89px",
    "4xl":   "144px",
  },

  // BORDER RADIUS — φ scale
  radius: {
    none: "0px",
    xs:   "3px",   // subtle
    sm:   "5px",   // tight
    md:   "8px",   // default card
    lg:   "13px",  // larger card
    xl:   "21px",  // sheet / modal
    "2xl":"34px",  // pill-like
    full: "9999px",
  },

  // SHADOWS — warmth-tinted, no cold greys
  shadow: {
    none:  "none",
    xs:    "0 1px 2px rgba(26,25,22,0.04)",
    sm:    "0 1px 4px rgba(26,25,22,0.05), 0 1px 2px rgba(26,25,22,0.04)",
    md:    "0 4px 13px rgba(26,25,22,0.06), 0 1px 3px rgba(26,25,22,0.04)",
    lg:    "0 8px 21px rgba(26,25,22,0.07), 0 2px 6px rgba(26,25,22,0.04)",
    xl:    "0 16px 34px rgba(26,25,22,0.08), 0 4px 8px rgba(26,25,22,0.04)",
    "2xl": "0 24px 55px rgba(26,25,22,0.10), 0 8px 16px rgba(26,25,22,0.05)",
    inner: "inset 0 1px 3px rgba(26,25,22,0.06)",
  },

  // MOTION TOKENS
  motion: {
    // Durations
    instant:   "80ms",
    fast:      "160ms",
    normal:    "250ms",
    slow:      "480ms",
    enter:     "680ms",   // main enter
    settle:    "800ms",   // progress bar

    // Easings
    linear:    "linear",
    easeIn:    "cubic-bezier(0.4, 0, 1, 1)",
    easeOut:   "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    land:      "cubic-bezier(0.25, 0, 0, 1)",  // enter — lands, settles
    exit:      "ease-in",                        // exit — quick, clean

    // Stagger
    stagger: "80ms",
    yShift:  "12px",
  },

  // BORDER WIDTHS
  border: {
    thin:   "0.5px",
    base:   "1px",
    thick:  "1.5px",
    heavy:  "2px",
  },

  // OPACITY
  opacity: {
    ghost:    "0.04",
    faint:    "0.08",
    subtle:   "0.11",
    dim:      "0.28",
    moderate: "0.40",
    strong:   "0.60",
    high:     "0.80",
    full:     "1.0",
  },
};

// ─── STYLES ─────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #F9F8F5;
    color: #1A1916;
    font-family: 'DM Sans', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .ds-root {
    background: #F9F8F5;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Thin scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(26,25,22,0.15); border-radius: 9999px; }

  /* SECTION LAYOUT */
  .ds-section {
    padding: 55px 0;
    border-bottom: 0.5px solid rgba(26,25,22,0.08);
  }
  .ds-container {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 34px;
  }

  /* SECTION HEADER */
  .ds-section-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #AEADA8;
    margin-bottom: 8px;
  }
  .ds-section-title {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 26.18px;
    font-weight: 400;
    color: #1A1916;
    line-height: 1.33;
    letter-spacing: -0.015em;
    margin-bottom: 5px;
  }
  .ds-section-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    color: #7C7B73;
    line-height: 1.618;
    max-width: 480px;
    margin-bottom: 34px;
  }

  /* GRID HELPERS */
  .ds-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 13px; }
  .ds-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 13px; }
  .ds-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 13px; }
  .ds-grid-5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 13px; }
  .ds-grid-auto { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 13px; }
  @media (max-width: 768px) {
    .ds-grid-4, .ds-grid-5 { grid-template-columns: repeat(2, 1fr); }
    .ds-grid-3 { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 480px) {
    .ds-grid-2, .ds-grid-3, .ds-grid-4, .ds-grid-5 { grid-template-columns: 1fr; }
    .ds-container { padding: 0 21px; }
  }

  /* COLOR CHIP */
  .ds-color-chip {
    border-radius: 8px;
    overflow: hidden;
    border: 0.5px solid rgba(26,25,22,0.08);
  }
  .ds-color-swatch {
    height: 55px;
    width: 100%;
  }
  .ds-color-info {
    background: #FFFFFF;
    padding: 8px 10px;
  }
  .ds-color-name {
    font-size: 11.5px;
    font-weight: 500;
    color: #1A1916;
    margin-bottom: 2px;
  }
  .ds-color-hex {
    font-size: 10px;
    font-weight: 400;
    color: #7C7B73;
    letter-spacing: 0.04em;
    font-family: 'DM Sans', monospace;
  }
  .ds-color-role {
    font-size: 10px;
    color: #AEADA8;
    letter-spacing: 0.02em;
    margin-top: 2px;
  }

  /* TYPOGRAPHY SPECIMEN */
  .ds-type-row {
    display: flex;
    align-items: baseline;
    gap: 21px;
    padding: 13px 0;
    border-bottom: 0.5px solid rgba(26,25,22,0.07);
  }
  .ds-type-meta {
    width: 120px;
    flex-shrink: 0;
  }
  .ds-type-token {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #AEADA8;
  }
  .ds-type-value {
    font-size: 10px;
    color: #7C7B73;
    margin-top: 2px;
  }

  /* SPACING SCALE */
  .ds-space-row {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 8px 0;
    border-bottom: 0.5px solid rgba(26,25,22,0.06);
  }
  .ds-space-bar-wrap {
    flex: 1;
  }
  .ds-space-bar {
    height: 8px;
    background: #1A1916;
    border-radius: 2px;
    opacity: 0.12;
    transition: opacity 0.24s ease;
  }
  .ds-space-row:hover .ds-space-bar { opacity: 0.24; }
  .ds-space-label {
    width: 80px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #AEADA8;
  }
  .ds-space-val {
    width: 50px;
    font-size: 11.5px;
    color: #7C7B73;
    text-align: right;
  }

  /* COMPONENT DEMOS */
  /* Tile/Card component */
  .cw-tile {
    background: #FFFFFF;
    border: 0.5px solid rgba(26,25,22,0.11);
    border-radius: 13px;
    padding: 16px;
    cursor: pointer;
    transition:
      border-color 0.16s ease,
      background 0.16s ease,
      transform 0.16s ease,
      box-shadow 0.16s ease;
    user-select: none;
  }
  .cw-tile:hover {
    border-color: rgba(26,25,22,0.25);
    transform: translateY(-1px);
    box-shadow: 0 4px 13px rgba(26,25,22,0.06);
  }
  .cw-tile.selected {
    background: #EDECE7;
    border-color: rgba(26,25,22,0.36);
    transform: none;
    box-shadow: none;
  }
  .cw-tile-icon {
    font-size: 21px;
    margin-bottom: 8px;
    display: block;
  }
  .cw-tile-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    color: #1A1916;
    line-height: 1.3;
  }
  .cw-tile-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 11.5px;
    font-weight: 400;
    color: #7C7B73;
    margin-top: 3px;
    line-height: 1.4;
  }

  /* Button */
  .cw-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    letter-spacing: 0.01em;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border-radius: 8px;
    transition: all 0.16s ease;
  }
  .cw-btn-primary {
    background: #1A1916;
    color: #F9F8F5;
    padding: 13px 21px;
  }
  .cw-btn-primary:hover {
    background: #2E2D29;
    transform: translateY(-1px);
    box-shadow: 0 4px 13px rgba(26,25,22,0.18);
  }
  .cw-btn-ghost {
    background: transparent;
    color: #1A1916;
    border: 0.5px solid rgba(26,25,22,0.25);
    padding: 11px 21px;
  }
  .cw-btn-ghost:hover {
    border-color: rgba(26,25,22,0.5);
    background: rgba(26,25,22,0.04);
  }
  .cw-btn-text {
    background: transparent;
    color: #7C7B73;
    padding: 8px 5px;
  }
  .cw-btn-text:hover { color: #1A1916; }
  .cw-btn-sm { font-size: 11.5px; padding: 8px 13px; }
  .cw-btn-lg { font-size: 16px; padding: 16px 34px; }

  /* Pill select */
  .cw-pill {
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    color: #7C7B73;
    background: #FFFFFF;
    border: 0.5px solid rgba(26,25,22,0.11);
    border-radius: 9999px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 0.16s ease;
    user-select: none;
  }
  .cw-pill:hover {
    border-color: rgba(26,25,22,0.25);
    color: #1A1916;
  }
  .cw-pill.selected {
    background: #EDECE7;
    border-color: rgba(26,25,22,0.36);
    color: #1A1916;
    font-weight: 500;
  }

  /* Card surface */
  .cw-card {
    background: #FFFFFF;
    border: 0.5px solid rgba(26,25,22,0.11);
    border-radius: 13px;
    box-shadow: 0 1px 4px rgba(26,25,22,0.05);
    overflow: hidden;
  }

  /* Progress bar */
  .cw-progress-track {
    width: 100%;
    height: 1.5px;
    background: rgba(26,25,22,0.08);
    border-radius: 9999px;
    overflow: hidden;
  }
  .cw-progress-fill {
    height: 100%;
    background: rgba(26,25,22,0.3);
    border-radius: 9999px;
    transition: width 0.8s cubic-bezier(0.0, 0, 0.2, 1);
  }

  /* Input */
  .cw-input {
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    color: #1A1916;
    background: #FFFFFF;
    border: 0.5px solid rgba(26,25,22,0.16);
    border-radius: 8px;
    padding: 13px 16px;
    width: 100%;
    outline: none;
    transition: border-color 0.16s ease;
    -webkit-appearance: none;
  }
  .cw-input::placeholder { color: #AEADA8; }
  .cw-input:focus { border-color: rgba(26,25,22,0.4); }

  /* Slider */
  .cw-slider-wrap { position: relative; padding: 8px 0; }
  .cw-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 1.5px;
    background: rgba(26,25,22,0.15);
    border-radius: 9999px;
    outline: none;
  }
  .cw-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background: #1A1916;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(26,25,22,0.2);
    transition: transform 0.16s ease;
  }
  .cw-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
  .cw-slider-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }
  .cw-slider-label {
    font-size: 10px;
    font-weight: 500;
    color: #AEADA8;
    letter-spacing: 0.04em;
  }

  /* Divider */
  .ds-divider {
    height: 0.5px;
    background: rgba(26,25,22,0.08);
    margin: 34px 0;
  }

  /* Token badge */
  .ds-badge {
    display: inline-flex;
    align-items: center;
    background: rgba(26,25,22,0.05);
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 10px;
    font-weight: 500;
    color: #7C7B73;
    letter-spacing: 0.04em;
    font-family: 'DM Sans', monospace;
  }

  /* Result number — the reveal */
  .cw-reveal-number {
    font-family: 'DM Sans', sans-serif;
    font-size: 68.47px;
    font-weight: 500;
    color: #1A1916;
    letter-spacing: -0.025em;
    line-height: 1;
  }

  /* Tabs */
  .ds-tabs {
    display: flex;
    gap: 3px;
    margin-bottom: 34px;
    background: rgba(26,25,22,0.05);
    border-radius: 8px;
    padding: 3px;
    width: fit-content;
  }
  .ds-tab {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: #7C7B73;
    background: transparent;
    border: none;
    border-radius: 6px;
    padding: 7px 14px;
    cursor: pointer;
    transition: all 0.16s ease;
  }
  .ds-tab.active {
    background: #FFFFFF;
    color: #1A1916;
    box-shadow: 0 1px 3px rgba(26,25,22,0.1);
  }

  /* Elevation demo */
  .ds-elevation-demo {
    padding: 21px;
    background: #FFFFFF;
    border-radius: 13px;
    text-align: center;
    font-size: 11.5px;
    font-weight: 500;
    color: #7C7B73;
    transition: box-shadow 0.24s ease;
    cursor: default;
  }

  /* Radius demo */
  .ds-radius-demo {
    background: rgba(26,25,22,0.07);
    padding: 21px 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #7C7B73;
  }

  /* Motion demo */
  .ds-motion-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    background: rgba(26,25,22,0.06);
    border: 0.5px solid rgba(26,25,22,0.11);
    border-radius: 6px;
    padding: 8px 13px;
    cursor: pointer;
    color: #1A1916;
    transition: all 0.16s ease;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .ds-motion-btn:hover {
    background: rgba(26,25,22,0.1);
  }

  .ds-animate-target {
    width: 55px;
    height: 55px;
    background: #1A1916;
    border-radius: 8px;
    opacity: 0;
    transform: translateY(12px);
    transition: none;
  }
  .ds-animate-target.playing {
    opacity: 1;
    transform: translateY(0);
  }

  /* Header hero */
  .ds-hero {
    padding: 89px 0 55px;
    border-bottom: 0.5px solid rgba(26,25,22,0.08);
    position: relative;
    overflow: hidden;
  }
  .ds-hero::before {
    content: '';
    position: absolute;
    top: -89px;
    right: -55px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(232,221,208,0.4) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  .ds-hero-eyebrow {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #AEADA8;
    margin-bottom: 13px;
  }
  .ds-hero-title {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 42.33px;
    font-weight: 400;
    color: #1A1916;
    line-height: 1.21;
    letter-spacing: -0.025em;
    margin-bottom: 13px;
  }
  .ds-hero-sub {
    font-size: 16.18px;
    color: #7C7B73;
    line-height: 1.618;
    max-width: 500px;
    font-weight: 300;
  }

  /* Nav */
  .ds-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(249,248,245,0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 0.5px solid rgba(26,25,22,0.08);
    padding: 0 34px;
  }
  .ds-nav-inner {
    max-width: 1160px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 55px;
    gap: 34px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .ds-nav-inner::-webkit-scrollbar { display: none; }
  .ds-nav-logo {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 16.18px;
    font-weight: 400;
    color: #1A1916;
    letter-spacing: -0.01em;
    flex-shrink: 0;
    margin-right: 8px;
  }
  .ds-nav-link {
    font-size: 12px;
    font-weight: 500;
    color: #AEADA8;
    letter-spacing: 0.03em;
    text-decoration: none;
    cursor: pointer;
    flex-shrink: 0;
    transition: color 0.16s ease;
    border: none;
    background: none;
    padding: 0;
  }
  .ds-nav-link:hover, .ds-nav-link.active { color: #1A1916; }

  /* Icon tile demo */
  .demo-tiles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 8px;
  }

  /* Annotation */
  .ds-annotation {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 13px 16px;
    background: rgba(26,25,22,0.03);
    border-left: 1.5px solid rgba(26,25,22,0.15);
    border-radius: 0 5px 5px 0;
    margin: 13px 0;
  }
  .ds-annotation-text {
    font-size: 12px;
    color: #7C7B73;
    line-height: 1.6;
  }
  .ds-annotation-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #AEADA8;
    flex-shrink: 0;
    padding-top: 1px;
  }

  /* φ chip decoration */
  .ds-phi {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: #AEADA8;
    background: rgba(26,25,22,0.04);
    border: 0.5px solid rgba(26,25,22,0.1);
    border-radius: 4px;
    padding: 2px 7px;
    font-family: 'Playfair Display', serif;
    font-style: italic;
  }
`;

// ─── SECTION COMPONENTS ───────────────────────────────────────────────────────

function SectionHeader({ label, title, desc }) {
  return (
    <div style={{ marginBottom: 34 }}>
      <div className="ds-section-label">{label}</div>
      <div className="ds-section-title">{title}</div>
      {desc && <div className="ds-section-desc">{desc}</div>}
    </div>
  );
}

function PhiBadge({ from, to, ratio }) {
  return (
    <span className="ds-phi">
      φ {ratio || "÷ 1.618"}
    </span>
  );
}

// ─── COLOR SECTION ───────────────────────────────────────────────────────────

const colorGroups = [
  {
    name: "Surface",
    label: "PAGE SURFACES",
    desc: "The three-stop surface system. Warmth is the signal, not colour.",
    colors: [
      { name: "Page BG",       hex: "#F9F8F5", role: "Page background",     var: "--surface-page" },
      { name: "Card Surface",  hex: "#FFFFFF", role: "Cards & tiles",        var: "--surface-card" },
      { name: "Selected",      hex: "#EDECE7", role: "Selected state",       var: "--surface-selected" },
      { name: "Elevated",      hex: "#F4F3EF", role: "Subtle hover lift",    var: "--surface-elevated" },
    ],
  },
  {
    name: "Ink",
    label: "INK PALETTE",
    desc: "Three stops. All warm-toned. No cool greys anywhere in the system.",
    colors: [
      { name: "Ink 100",  hex: "#1A1916", role: "Primary / headings",   var: "--ink-100" },
      { name: "Ink 60",   hex: "#7C7B73", role: "Secondary / sublabels", var: "--ink-60" },
      { name: "Ink 40",   hex: "#AEADA8", role: "Tertiary / meta text",  var: "--ink-40" },
    ],
  },
  {
    name: "Border",
    label: "BORDER SYSTEM",
    desc: "Barely-there borders that communicate through opacity, not colour.",
    colors: [
      { name: "Border Rest",   hex: "rgba(26,25,22,0.11)", role: "Resting state",  var: "--border-rest",   swatch: "rgba(26,25,22,0.11)" },
      { name: "Border Hover",  hex: "rgba(26,25,22,0.25)", role: "Hover state",    var: "--border-hover",  swatch: "rgba(26,25,22,0.25)" },
      { name: "Border Active", hex: "rgba(26,25,22,0.36)", role: "Selected state", var: "--border-active", swatch: "rgba(26,25,22,0.36)" },
    ],
  },
  {
    name: "Accent",
    label: "PASTEL ACCENTS",
    desc: "Reserved exclusively for result screens. Never as interactive state indicators in the main flow.",
    colors: [
      { name: "Warm Sand",  hex: "#E8DDD0", role: "Warm accent — spending",   var: "--accent-warm" },
      { name: "Slate Cool", hex: "#D8DFE8", role: "Cool accent — savings",    var: "--accent-cool" },
      { name: "Sage Moss",  hex: "#D4DDD4", role: "Positive — opportunity",   var: "--accent-moss" },
      { name: "Amber Tint", hex: "#E8E0CC", role: "Signal — attention",       var: "--accent-amber" },
    ],
  },
  {
    name: "Semantic",
    label: "SEMANTIC — RESULT SCREENS ONLY",
    desc: "These three tones appear only in result screens. They communicate without using the primary signal colours.",
    colors: [
      { name: "Positive", hex: "#C8D8C4", role: "Ahead / good fit",      var: "--semantic-positive" },
      { name: "Neutral",  hex: "#E0DDD8", role: "About right / ok",       var: "--semantic-neutral" },
      { name: "Signal",   hex: "#DDD4C4", role: "Opportunity / gap",      var: "--semantic-signal" },
    ],
  },
];

function ColorSection() {
  return (
    <section className="ds-section" id="color">
      <div className="ds-container">
        <SectionHeader
          label="01 — COLOUR"
          title="Warmth and restraint."
          desc="No colour anywhere as an interactive signal. The entire product communicates through surface warmth, border opacity, and type weight alone."
        />
        {colorGroups.map((group) => (
          <div key={group.name} style={{ marginBottom: 34 }}>
            <div style={{ marginBottom: 13, display: "flex", alignItems: "center", gap: 10 }}>
              <div className="ds-section-label" style={{ margin: 0 }}>{group.label}</div>
            </div>
            <div className="ds-grid-auto">
              {group.colors.map((c) => (
                <div className="ds-color-chip" key={c.name}>
                  <div
                    className="ds-color-swatch"
                    style={{ background: c.swatch || c.hex }}
                  />
                  <div className="ds-color-info">
                    <div className="ds-color-name">{c.name}</div>
                    <div className="ds-color-hex">{c.hex}</div>
                    <div className="ds-color-role">{c.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── TYPOGRAPHY SECTION ───────────────────────────────────────────────────────

const typeScale = [
  { token: "5XL",  size: "110.7px", lh: "1.1",   ls: "-0.03em",  use: "Ultra display — future use", serif: true,  italic: true  },
  { token: "4XL",  size: "68.47px", lh: "1.0",   ls: "-0.025em", use: "Result reveal number",        serif: false, italic: false },
  { token: "3XL",  size: "42.33px", lh: "1.21",  ls: "-0.025em", use: "Hero / landing headline",     serif: true,  italic: true  },
  { token: "2XL",  size: "30px",    lh: "1.33",  ls: "-0.015em", use: "Question text",               serif: true,  italic: true  },
  { token: "XL",   size: "26.18px", lh: "1.33",  ls: "-0.015em", use: "Section titles",              serif: true,  italic: true  },
  { token: "LG",   size: "21px",    lh: "1.5",   ls: "0em",      use: "Large body / card headings",  serif: false, italic: false },
  { token: "BASE", size: "16.18px", lh: "1.618", ls: "0em",      use: "Body text — φ-aligned",       serif: false, italic: false },
  { token: "MD",   size: "13.5px",  lh: "1.5",   ls: "0em",      use: "Card labels",                 serif: false, italic: false },
  { token: "SM",   size: "11.5px",  lh: "1.4",   ls: "0em",      use: "Card sublabels",              serif: false, italic: false },
  { token: "XS",   size: "10px",    lh: "1.3",   ls: "0.1em",    use: "Meta text — uppercase",       serif: false, italic: false },
];

const specimenText = {
  "5XL": "There is a card",
  "4XL": "₹12,400",
  "3XL": "There is a card\nbuilt for the way\nyou spend.",
  "2XL": "Do you currently\nhave a credit card?",
  "XL": "The right answer.",
  "LG": "Net annual value, based on how you spend.",
  "BASE": "Cardwise translates every card's value into plain rupees — not points, not reward rates.",
  "MD": "HDFC Regalia Gold",
  "SM": "Earn 4 reward points per ₹150",
  "XS": "ANNUAL VALUE",
};

function TypeSection() {
  const [active, setActive] = useState("specimen");
  return (
    <section className="ds-section" id="typography">
      <div className="ds-container">
        <SectionHeader
          label="02 — TYPOGRAPHY"
          title="The question breathes."
          desc="Playfair Display italic for everything that speaks. DM Sans for everything that responds. The contrast between them is what makes every screen feel alive."
        />

        <div className="ds-tabs">
          {["specimen","scale","pairings"].map(t => (
            <button key={t} className={`ds-tab ${active===t?"active":""}`} onClick={()=>setActive(t)}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>

        {active === "specimen" && (
          <div>
            {typeScale.map((t, i) => (
              <div key={t.token} className="ds-type-row">
                <div className="ds-type-meta">
                  <div className="ds-type-token">{t.token}</div>
                  <div className="ds-type-value">{t.size}</div>
                  <div className="ds-type-value" style={{ color: "#AEADA8", fontSize: 9, marginTop: 2 }}>{t.use}</div>
                </div>
                <div
                  style={{
                    fontFamily: t.serif ? "'Playfair Display', serif" : "'DM Sans', sans-serif",
                    fontStyle: t.italic ? "italic" : "normal",
                    fontSize: t.size,
                    lineHeight: t.lh,
                    letterSpacing: t.ls,
                    color: "#1A1916",
                    fontWeight: t.serif ? 400 : (t.token === "4XL" ? 500 : 400),
                    flex: 1,
                    overflow: "hidden",
                    whiteSpace: parseFloat(t.size) > 30 ? "pre-line" : "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {specimenText[t.token]}
                </div>
              </div>
            ))}
          </div>
        )}

        {active === "scale" && (
          <div>
            <div className="ds-annotation">
              <span className="ds-annotation-label">φ note</span>
              <span className="ds-annotation-text">
                The scale is built on 10px × φⁿ, producing: <strong>10 → 16.18 → 26.18 → 42.33 → 68.47 → 110.7px</strong>. 
                Intermediate values (13.5, 11.5, 21, 30) are interpolations within this scale to satisfy the product specification.
              </span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ borderBottom: "0.5px solid rgba(26,25,22,0.12)" }}>
                    {["Token","Size","Line Height","Letter-spacing","Family","Usage"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#AEADA8" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {typeScale.map(t => (
                    <tr key={t.token} style={{ borderBottom: "0.5px solid rgba(26,25,22,0.06)" }}>
                      <td style={{ padding: "10px 10px" }}><span className="ds-badge">{t.token}</span></td>
                      <td style={{ padding: "10px 10px", fontWeight: 500, color: "#1A1916" }}>{t.size}</td>
                      <td style={{ padding: "10px 10px", color: "#7C7B73" }}>{t.lh}</td>
                      <td style={{ padding: "10px 10px", color: "#7C7B73" }}>{t.ls}</td>
                      <td style={{ padding: "10px 10px", color: "#7C7B73", fontSize: 11 }}>{t.serif ? "Playfair Display" : "DM Sans"}</td>
                      <td style={{ padding: "10px 10px", color: "#AEADA8", fontSize: 11 }}>{t.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {active === "pairings" && (
          <div style={{ display: "grid", gap: 21 }}>
            {/* Pairing 1 — Question */}
            <div className="cw-card" style={{ padding: "34px 34px" }}>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#AEADA8", marginBottom: 16 }}>QUESTION SCREEN</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 30, lineHeight: 1.33, letterSpacing: "-0.015em", color: "#1A1916", marginBottom: 21 }}>
                What do you spend<br />most on?
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["🍽️ Food & dining","⛽ Fuel","✈️ Travel","🛒 Groceries"].map(l => (
                  <div key={l} className="cw-tile" style={{ padding: "10px 14px", borderRadius: 9999, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: "#1A1916" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Pairing 2 — Result */}
            <div className="cw-card" style={{ padding: "34px 34px", background: "#F9F8F5" }}>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#AEADA8", marginBottom: 13 }}>RESULT SCREEN</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 21, lineHeight: 1.4, color: "#7C7B73", marginBottom: 8 }}>
                You're leaving this much on the table every year.
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 68, fontWeight: 500, color: "#1A1916", letterSpacing: "-0.025em", lineHeight: 1 }}>
                ₹4,200
              </div>
              <div style={{ marginTop: 13, fontSize: 13.5, color: "#7C7B73" }}>
                Your HDFC Millennia earns <strong style={{ color: "#1A1916" }}>₹1,800/yr</strong>. HDFC Regalia would earn <strong style={{ color: "#1A1916" }}>₹6,000/yr</strong> on the same spend.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── SPACING SECTION ─────────────────────────────────────────────────────────

const spaceScale = [
  { token: "space-1", name: "Micro",   value: "3px",   px: 3,   fib: "F1+F2", use: "Icon gaps, tiny nudges" },
  { token: "space-2", name: "Tight",   value: "5px",   px: 5,   fib: "F4",    use: "Inline padding, sublabel gaps" },
  { token: "space-3", name: "Base",    value: "8px",   px: 8,   fib: "F5",    use: "Base unit, icon padding" },
  { token: "space-4", name: "MD",      value: "13px",  px: 13,  fib: "F6",    use: "Card inner gap, list items" },
  { token: "space-5", name: "LG",      value: "21px",  px: 21,  fib: "F7",    use: "Card padding, section labels" },
  { token: "space-6", name: "XL",      value: "34px",  px: 34,  fib: "F8",    use: "Section gaps, screen padding" },
  { token: "space-7", name: "2XL",     value: "55px",  px: 55,  fib: "F9",    use: "Major section dividers" },
  { token: "space-8", name: "3XL",     value: "89px",  px: 89,  fib: "F10",   use: "Hero padding, screen margins" },
  { token: "space-9", name: "4XL",     value: "144px", px: 144, fib: "F11",   use: "Full-section height rhythm" },
];

function SpacingSection() {
  const max = 144;
  return (
    <section className="ds-section" id="spacing">
      <div className="ds-container">
        <SectionHeader
          label="03 — SPACING"
          title="Fibonacci rhythm."
          desc="3, 5, 8, 13, 21, 34, 55, 89, 144 — the Fibonacci sequence, whose adjacent ratios converge to φ. The eye reads this as natural, inevitable proportion."
        />
        <div className="ds-annotation">
          <span className="ds-annotation-label">φ note</span>
          <span className="ds-annotation-text">
            Adjacent Fibonacci numbers approach φ: 5÷3=1.667, 8÷5=1.6, 13÷8=1.625, 21÷13=1.615, 34÷21=1.619, 55÷34=1.617... converging to 1.61803...
          </span>
        </div>
        <div style={{ marginTop: 21 }}>
          {spaceScale.map((s) => (
            <div key={s.token} className="ds-space-row">
              <div className="ds-space-label">{s.name}</div>
              <div className="ds-space-bar-wrap">
                <div className="ds-space-bar" style={{ width: `${(s.px / max) * 100}%`, maxWidth: "100%" }} />
              </div>
              <div style={{ width: 36, textAlign: "center" }}>
                <span className="ds-badge">{s.fib}</span>
              </div>
              <div className="ds-space-val">{s.value}</div>
              <div style={{ width: 200, fontSize: 10.5, color: "#AEADA8" }}>{s.use}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RADIUS + SHADOW ─────────────────────────────────────────────────────────

const radii = [
  { token: "none",  value: "0px",    use: "Rules, dividers" },
  { token: "xs",    value: "3px",    use: "Badges, chips" },
  { token: "sm",    value: "5px",    use: "Small buttons, inline" },
  { token: "md",    value: "8px",    use: "Default — buttons, inputs" },
  { token: "lg",    value: "13px",   use: "Cards, tiles — primary" },
  { token: "xl",    value: "21px",   use: "Sheet, modal, large card" },
  { token: "2xl",   value: "34px",   use: "Large pill" },
  { token: "full",  value: "9999px", use: "Pill — select options" },
];

const shadows = [
  { token: "none",  value: "none",                                                     use: "Flat / inline" },
  { token: "xs",    value: "0 1px 2px rgba(26,25,22,0.04)",                           use: "Subtle separation" },
  { token: "sm",    value: "0 1px 4px rgba(26,25,22,0.05), 0 1px 2px rgba(26,25,22,0.04)", use: "Cards resting" },
  { token: "md",    value: "0 4px 13px rgba(26,25,22,0.06), 0 1px 3px rgba(26,25,22,0.04)", use: "Card hover / lifted" },
  { token: "lg",    value: "0 8px 21px rgba(26,25,22,0.07), 0 2px 6px rgba(26,25,22,0.04)", use: "Floating elements" },
  { token: "xl",    value: "0 16px 34px rgba(26,25,22,0.08), 0 4px 8px rgba(26,25,22,0.04)", use: "Modal / sheet" },
  { token: "inner", value: "inset 0 1px 3px rgba(26,25,22,0.06)",                    use: "Pressed state" },
];

function RadiusShadowSection() {
  return (
    <section className="ds-section" id="shape">
      <div className="ds-container">
        <SectionHeader
          label="04 — SHAPE & ELEVATION"
          title="Corners and depth."
          desc="Radii follow the φ progression. Shadows use warm-tinted opacity — never cool grey — to maintain the paper-like quality across elevation levels."
        />

        <div className="ds-grid-2" style={{ gap: 34, alignItems: "start" }}>
          {/* Radii */}
          <div>
            <div className="ds-section-label" style={{ marginBottom: 13 }}>BORDER RADIUS</div>
            <div style={{ display: "grid", gap: 8 }}>
              {radii.map(r => (
                <div key={r.token} style={{ display: "flex", alignItems: "center", gap: 13 }}>
                  <div style={{ width: 80, fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#AEADA8" }}>{r.token}</div>
                  <div
                    className="ds-radius-demo"
                    style={{ flex: 1, borderRadius: r.value, minHeight: 34 }}
                  >
                    <span>{r.value}</span>
                  </div>
                  <div style={{ width: 140, fontSize: 10.5, color: "#AEADA8" }}>{r.use}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Shadows */}
          <div>
            <div className="ds-section-label" style={{ marginBottom: 13 }}>ELEVATION / SHADOW</div>
            <div style={{ display: "grid", gap: 13 }}>
              {shadows.map(s => (
                <div key={s.token} style={{ display: "flex", alignItems: "center", gap: 13 }}>
                  <div style={{ width: 50, fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#AEADA8" }}>{s.token}</div>
                  <div
                    className="ds-elevation-demo"
                    style={{ flex: 1, boxShadow: s.value, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#AEADA8" }}
                  >
                    {s.token}
                  </div>
                  <div style={{ width: 130, fontSize: 10.5, color: "#AEADA8" }}>{s.use}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MOTION SECTION ───────────────────────────────────────────────────────────

function MotionSection() {
  const [animKey, setAnimKey] = useState(null);
  const [playing, setPlaying] = useState({});

  const play = (id, dur, ease, yFrom) => {
    setPlaying(p => ({ ...p, [id]: false }));
    setTimeout(() => {
      setPlaying(p => ({ ...p, [id]: { dur, ease, yFrom } }));
    }, 30);
    setTimeout(() => {
      setPlaying(p => ({ ...p, [id]: false }));
    }, dur + 500);
  };

  const motionTokens = [
    { id: "enter",   label: "Enter",        dur: 680,  ease: "cubic-bezier(0.25,0,0,1)", note: "Primary enter — lands and settles" },
    { id: "exit",    label: "Exit",         dur: 250,  ease: "ease-in",                   note: "Quick and clean — never lingers" },
    { id: "hover",   label: "Hover lift",   dur: 160,  ease: "ease",                      note: "Card breathes toward the user" },
    { id: "settle",  label: "Progress",     dur: 800,  ease: "cubic-bezier(0,0,0.2,1)",  note: "Progress bar — ease out to rest" },
  ];

  return (
    <section className="ds-section" id="motion">
      <div className="ds-container">
        <SectionHeader
          label="05 — MOTION"
          title="Patience in movement."
          desc="Enter: 640–720ms, starts fast, settles gently. Exit: 240–255ms, immediate and clean. Stagger: 80ms per element. Every animation is a consequence of the user's action — not decoration."
        />

        <div className="ds-annotation">
          <span className="ds-annotation-label">Rule</span>
          <span className="ds-annotation-text">
            The continue button enters at <code style={{fontSize:11}}>opacity:0, translateY:7px</code> — it appears as a consequence of the user's choice, not a pre-existing affordance. Tiles stagger at 80ms per element.
          </span>
        </div>

        <div style={{ display: "grid", gap: 13, marginTop: 21 }}>
          {motionTokens.map((m) => {
            const isPlaying = playing[m.id];
            return (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 21, padding: "16px 21px", background: "#FFFFFF", border: "0.5px solid rgba(26,25,22,0.08)", borderRadius: 13 }}>
                <div style={{ width: 70 }}>
                  <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#AEADA8" }}>{m.label}</div>
                  <div style={{ fontSize: 11.5, color: "#1A1916", marginTop: 3, fontWeight: 500 }}>{m.dur}ms</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "#7C7B73", marginBottom: 4 }}>{m.note}</div>
                  <span className="ds-badge">{m.ease}</span>
                </div>
                <div style={{ width: 55, display: "flex", justifyContent: "center" }}>
                  <div
                    className={`ds-animate-target ${isPlaying ? "playing" : ""}`}
                    style={isPlaying ? { transition: `opacity ${m.dur}ms ${m.ease}, transform ${m.dur}ms ${m.ease}` } : {}}
                  />
                </div>
                <button
                  className="ds-motion-btn"
                  onClick={() => play(m.id, m.dur, m.ease)}
                >
                  ▶ Play
                </button>
              </div>
            );
          })}
        </div>

        {/* Stagger demo */}
        <div style={{ marginTop: 34 }}>
          <div className="ds-section-label" style={{ marginBottom: 13 }}>TILE STAGGER — 80ms per element</div>
          <StaggerDemo />
        </div>
      </div>
    </section>
  );
}

function StaggerDemo() {
  const [run, setRun] = useState(false);
  const items = ["🍽️ Food", "⛽ Fuel", "✈️ Travel", "🛒 Groceries", "🎬 Entertainment"];

  const trigger = () => {
    setRun(false);
    setTimeout(() => setRun(true), 30);
  };

  return (
    <div>
      <button className="ds-motion-btn" onClick={trigger} style={{ marginBottom: 16 }}>▶ Run stagger</button>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {items.map((item, i) => (
          <div
            key={item}
            className="cw-tile"
            style={{
              padding: "10px 16px",
              opacity: run ? 1 : 0,
              transform: run ? "translateY(0)" : "translateY(12px)",
              transition: run
                ? `opacity 680ms cubic-bezier(0.25,0,0,1) ${i * 80}ms, transform 680ms cubic-bezier(0.25,0,0,1) ${i * 80}ms`
                : "none",
            }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 500 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── COMPONENTS SECTION ───────────────────────────────────────────────────────

function TileDemo() {
  const [sel, setSel] = useState(null);
  const tiles = [
    { id: "food",   icon: "🍽️", label: "Food & dining",  sub: "Restaurants, delivery" },
    { id: "fuel",   icon: "⛽", label: "Fuel",           sub: "Petrol, toll" },
    { id: "travel", icon: "✈️", label: "Travel",         sub: "Flights, hotels" },
    { id: "shop",   icon: "🛒", label: "Groceries",      sub: "Supermarkets" },
  ];
  return (
    <div>
      <div className="ds-section-label" style={{ marginBottom: 10 }}>ICON TILE — SINGLE / MULTI SELECT</div>
      <div className="ds-grid-4" style={{ marginBottom: 8 }}>
        {tiles.map(t => (
          <div
            key={t.id}
            className={`cw-tile ${sel === t.id ? "selected" : ""}`}
            onClick={() => setSel(sel === t.id ? null : t.id)}
          >
            <span className="cw-tile-icon">{t.icon}</span>
            <div className="cw-tile-label">{t.label}</div>
            <div className="cw-tile-sub">{t.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 10, color: "#AEADA8", letterSpacing: "0.04em" }}>Click to toggle selected state. No colour — only surface shift.</div>
    </div>
  );
}

function PillDemo() {
  const [sel, setSel] = useState("1y");
  const opts = [
    { id: "6m", label: "Under 6 months" },
    { id: "1y", label: "6–12 months" },
    { id: "2y", label: "1–2 years" },
    { id: "2y+",label: "Over 2 years" },
  ];
  return (
    <div>
      <div className="ds-section-label" style={{ marginBottom: 10 }}>PILL SELECT — CATEGORICAL</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {opts.map(o => (
          <div key={o.id} className={`cw-pill ${sel===o.id?"selected":""}`} onClick={()=>setSel(o.id)}>
            {o.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function SliderDemo() {
  const [val, setVal] = useState(2);
  const labels = ["₹5K–15K", "₹15K–30K", "₹30K–60K", "₹60K–1L", "₹1L+"];
  return (
    <div>
      <div className="ds-section-label" style={{ marginBottom: 10 }}>LABELLED SLIDER — 5 BREAKPOINTS</div>
      <div style={{ background: "#FFFFFF", border: "0.5px solid rgba(26,25,22,0.11)", borderRadius: 13, padding: 21 }}>
        <div style={{ fontSize: 13.5, color: "#7C7B73", marginBottom: 13 }}>Monthly card spend</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 26, fontWeight: 500, color: "#1A1916", marginBottom: 16, letterSpacing: "-0.01em" }}>
          {labels[val]}
        </div>
        <div className="cw-slider-wrap">
          <input
            type="range"
            className="cw-slider"
            min={0}
            max={4}
            step={1}
            value={val}
            onChange={e => setVal(Number(e.target.value))}
          />
          <div className="cw-slider-labels">
            {labels.map((l,i) => (
              <span key={i} className="cw-slider-label" style={{ color: val===i?"#1A1916":"#AEADA8", fontWeight: val===i?500:400 }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonsDemo() {
  return (
    <div>
      <div className="ds-section-label" style={{ marginBottom: 10 }}>BUTTONS</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <button className="cw-btn cw-btn-primary cw-btn-lg">Begin →</button>
        <button className="cw-btn cw-btn-primary">Continue →</button>
        <button className="cw-btn cw-btn-ghost">Save result</button>
        <button className="cw-btn cw-btn-ghost cw-btn-sm">Re-run</button>
        <button className="cw-btn cw-btn-text">← Back</button>
      </div>
      <div style={{ marginTop: 8, fontSize: 10, color: "#AEADA8" }}>Primary uses warm near-black. Ghost uses opacity border. Text is muted until hovered.</div>
    </div>
  );
}

function ProgressDemo() {
  const [prog, setProg] = useState(40);
  return (
    <div>
      <div className="ds-section-label" style={{ marginBottom: 10 }}>PROGRESS INDICATOR — 1.5px THIN LINE</div>
      <div style={{ background: "#FFFFFF", border: "0.5px solid rgba(26,25,22,0.11)", borderRadius: 13, overflow: "hidden" }}>
        <div style={{ padding: "0" }}>
          <div className="cw-progress-track" style={{ borderRadius: 0 }}>
            <div className="cw-progress-fill" style={{ width: `${prog}%` }} />
          </div>
        </div>
        <div style={{ padding: "21px 21px" }}>
          <div style={{ fontSize: 13.5, color: "#7C7B73", marginBottom: 13 }}>No step numbers. No "Question 2 of 5". The thin line is all the progress the user needs.</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[20,40,60,80,100].map(p => (
              <button key={p} className="ds-motion-btn" onClick={()=>setProg(p)}>{p}%</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputDemo() {
  return (
    <div>
      <div className="ds-section-label" style={{ marginBottom: 10 }}>SEARCH INPUT — AUTOCOMPLETE</div>
      <div style={{ position: "relative", maxWidth: 360 }}>
        <input className="cw-input" placeholder="Search for your card — e.g. HDFC Regalia" />
        <div style={{ marginTop: 4 }}>
          {["HDFC Regalia Gold", "HDFC Millennia", "HDFC Diners Club Black"].map(s => (
            <div key={s} style={{ padding: "10px 16px", background: "#FFFFFF", border: "0.5px solid rgba(26,25,22,0.1)", borderTop: "none", fontSize: 13.5, color: "#1A1916", cursor: "pointer" }}>
              {s}
              <div style={{ fontSize: 10.5, color: "#AEADA8", marginTop: 2 }}>HDFC Bank</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ComponentsSection() {
  return (
    <section className="ds-section" id="components">
      <div className="ds-container">
        <SectionHeader
          label="06 — COMPONENTS"
          title="Every piece in its right place."
          desc="All components are built from the same token set. Three states only: resting, hover, selected. No colour as signal."
        />
        <div style={{ display: "grid", gap: 34 }}>
          <TileDemo />
          <div className="ds-divider" style={{ margin: "8px 0" }} />
          <PillDemo />
          <div className="ds-divider" style={{ margin: "8px 0" }} />
          <SliderDemo />
          <div className="ds-divider" style={{ margin: "8px 0" }} />
          <ButtonsDemo />
          <div className="ds-divider" style={{ margin: "8px 0" }} />
          <ProgressDemo />
          <div className="ds-divider" style={{ margin: "8px 0" }} />
          <InputDemo />
        </div>
      </div>
    </section>
  );
}

// ─── RESULT REVEAL SECTION ────────────────────────────────────────────────────

function ResultSection() {
  const [revealed, setRevealed] = useState(false);
  return (
    <section className="ds-section" id="result">
      <div className="ds-container">
        <SectionHeader
          label="07 — THE RESULT REVEAL"
          title="The number does the work."
          desc="Framing sentence in Playfair italic above. The number itself large in DM Sans 500. Then the recommended card below. The gap, in plain rupees."
        />

        <div style={{ maxWidth: 480 }}>
          <button className="ds-motion-btn" style={{ marginBottom: 21 }} onClick={() => { setRevealed(false); setTimeout(() => setRevealed(true), 30); }}>
            ▶ Animate reveal
          </button>

          <div className="cw-card" style={{ padding: 34, background: "#F9F8F5" }}>
            {/* Framing sentence */}
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: 21,
                lineHeight: 1.4,
                color: "#7C7B73",
                marginBottom: 13,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(12px)",
                transition: revealed ? "opacity 680ms cubic-bezier(0.25,0,0,1), transform 680ms cubic-bezier(0.25,0,0,1)" : "none",
              }}
            >
              You're leaving this much on the table, every year.
            </div>

            {/* The number */}
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 68,
                fontWeight: 500,
                color: "#1A1916",
                letterSpacing: "-0.025em",
                lineHeight: 1,
                marginBottom: 21,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(12px)",
                transition: revealed ? "opacity 680ms cubic-bezier(0.25,0,0,1) 80ms, transform 680ms cubic-bezier(0.25,0,0,1) 80ms" : "none",
              }}
            >
              ₹4,200
            </div>

            {/* Context */}
            <div
              style={{
                fontSize: 13.5,
                color: "#7C7B73",
                lineHeight: 1.618,
                marginBottom: 21,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(12px)",
                transition: revealed ? "opacity 680ms cubic-bezier(0.25,0,0,1) 160ms, transform 680ms cubic-bezier(0.25,0,0,1) 160ms" : "none",
              }}
            >
              Your <strong style={{ color: "#1A1916" }}>HDFC Millennia</strong> earns ₹1,800/yr on your spend pattern.
              The <strong style={{ color: "#1A1916" }}>HDFC Regalia Gold</strong> would earn ₹6,000/yr on the same spend.
            </div>

            {/* Card recommendation */}
            <div
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(12px)",
                transition: revealed ? "opacity 680ms cubic-bezier(0.25,0,0,1) 240ms, transform 680ms cubic-bezier(0.25,0,0,1) 240ms" : "none",
              }}
            >
              <div style={{ background: "#FFFFFF", border: "0.5px solid rgba(26,25,22,0.11)", borderRadius: 13, padding: "16px 21px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#AEADA8", marginBottom: 4 }}>RECOMMENDED</div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1A1916" }}>HDFC Regalia Gold</div>
                  <div style={{ fontSize: 11.5, color: "#7C7B73", marginTop: 2 }}>₹2,500 annual fee · pays for itself at ₹15K/mo</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#AEADA8", marginBottom: 2 }}>NET VALUE</div>
                  <div style={{ fontSize: 21, fontWeight: 500, color: "#1A1916" }}>₹6,000</div>
                  <div style={{ fontSize: 10, color: "#AEADA8" }}>per year</div>
                </div>
              </div>
            </div>

            {/* Action bar */}
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 21,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(7px)",
                transition: revealed ? "opacity 280ms ease-out 480ms, transform 280ms ease-out 480ms" : "none",
              }}
            >
              <button className="cw-btn cw-btn-primary" style={{ flex: 1, justifyContent: "center" }}>Apply</button>
              <button className="cw-btn cw-btn-ghost">Save</button>
              <button className="cw-btn cw-btn-ghost">Re-run</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TOKEN REFERENCE SECTION ──────────────────────────────────────────────────

function TokensSection() {
  const [copied, setCopied] = useState(null);
  const cssVars = `
:root {
  /* ─ SURFACES ─ */
  --surface-page:     #F9F8F5;
  --surface-card:     #FFFFFF;
  --surface-selected: #EDECE7;
  --surface-elevated: #F4F3EF;

  /* ─ INK ─ */
  --ink-100: #1A1916;
  --ink-60:  #7C7B73;
  --ink-40:  #AEADA8;

  /* ─ BORDERS ─ */
  --border-rest:   rgba(26,25,22,0.11);
  --border-hover:  rgba(26,25,22,0.25);
  --border-active: rgba(26,25,22,0.36);

  /* ─ ACCENTS ─ */
  --accent-warm:   #E8DDD0;
  --accent-cool:   #D8DFE8;
  --accent-moss:   #D4DDD4;
  --accent-amber:  #E8E0CC;

  /* ─ SEMANTIC ─ */
  --semantic-positive: #C8D8C4;
  --semantic-neutral:  #E0DDD8;
  --semantic-signal:   #DDD4C4;

  /* ─ SPACING (Fibonacci) ─ */
  --space-1:  3px;
  --space-2:  5px;
  --space-3:  8px;
  --space-4:  13px;
  --space-5:  21px;
  --space-6:  34px;
  --space-7:  55px;
  --space-8:  89px;
  --space-9:  144px;

  /* ─ TYPOGRAPHY ─ */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans:  'DM Sans', system-ui, sans-serif;

  --text-xs:   10px;
  --text-sm:   11.5px;
  --text-md:   13.5px;
  --text-base: 16.18px;
  --text-lg:   21px;
  --text-xl:   26.18px;
  --text-2xl:  30px;
  --text-3xl:  42.33px;
  --text-4xl:  68.47px;
  --text-5xl:  110.7px;

  /* ─ RADIUS ─ */
  --radius-xs:   3px;
  --radius-sm:   5px;
  --radius-md:   8px;
  --radius-lg:   13px;
  --radius-xl:   21px;
  --radius-2xl:  34px;
  --radius-full: 9999px;

  /* ─ MOTION ─ */
  --ease-land:    cubic-bezier(0.25, 0, 0, 1);
  --ease-exit:    ease-in;
  --dur-fast:     160ms;
  --dur-normal:   250ms;
  --dur-enter:    680ms;
  --dur-settle:   800ms;
  --stagger:      80ms;
}`.trim();

  const copy = () => {
    navigator.clipboard?.writeText(cssVars);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="ds-section" id="tokens">
      <div className="ds-container">
        <SectionHeader
          label="08 — CSS TOKEN REFERENCE"
          title="Copy and use."
          desc="All design tokens as CSS custom properties. Import this root block into your project."
        />
        <div style={{ position: "relative" }}>
          <pre style={{
            background: "#FFFFFF",
            border: "0.5px solid rgba(26,25,22,0.11)",
            borderRadius: 13,
            padding: "21px 24px",
            fontSize: 11.5,
            lineHeight: 1.8,
            color: "#1A1916",
            overflow: "auto",
            fontFamily: "'DM Sans', monospace",
          }}>
            {cssVars}
          </pre>
          <button
            onClick={copy}
            className="cw-btn cw-btn-ghost cw-btn-sm"
            style={{ position: "absolute", top: 13, right: 13 }}
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ padding: "55px 34px", borderTop: "0.5px solid rgba(26,25,22,0.08)" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 21 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16.18, color: "#1A1916", marginBottom: 5 }}>cardwise</div>
          <div style={{ fontSize: 11.5, color: "#AEADA8" }}>Design System v1.0 — Golden Ratio Edition</div>
        </div>
        <div style={{ display: "flex", gap: 21 }}>
          {["φ = 1.618033…", "Playfair Display + DM Sans", "#F9F8F5 — the right white"].map(t => (
            <span key={t} className="ds-badge" style={{ fontSize: 10.5 }}>{t}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

const navItems = [
  { id: "color",      label: "Colour" },
  { id: "typography", label: "Typography" },
  { id: "spacing",    label: "Spacing" },
  { id: "shape",      label: "Shape" },
  { id: "motion",     label: "Motion" },
  { id: "components", label: "Components" },
  { id: "result",     label: "Result" },
  { id: "tokens",     label: "Tokens" },
];

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function CardwiseDesignSystem() {
  const [activeNav, setActiveNav] = useState(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ds-root">
        {/* NAV */}
        <nav className="ds-nav">
          <div className="ds-nav-inner">
            <span className="ds-nav-logo">cardwise</span>
            <div style={{ width: "0.5px", height: 24, background: "rgba(26,25,22,0.12)", flexShrink: 0 }} />
            {navItems.map(n => (
              <button key={n.id} className={`ds-nav-link ${activeNav===n.id?"active":""}`} onClick={() => scrollTo(n.id)}>
                {n.label}
              </button>
            ))}
          </div>
        </nav>

        {/* HERO */}
        <div className="ds-hero">
          <div className="ds-container">
            <div className="ds-hero-eyebrow">CARDWISE — DESIGN SYSTEM</div>
            <h1 className="ds-hero-title">
              Considered in<br />every proportion.
            </h1>
            <p className="ds-hero-sub">
              A complete token system built on the Golden Ratio — φ = 1.618. 
              Typography, spacing, radii, and motion all derive from the same proportional logic. 
              Nothing arbitrary. Everything intentional.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 21 }}>
              <span className="ds-phi">φ Golden Ratio — 1.618033…</span>
              <span className="ds-badge">Fibonacci Spacing</span>
              <span className="ds-badge">Playfair Display × DM Sans</span>
              <span className="ds-badge">Mobile-first · 375px</span>
              <span className="ds-badge">Warm neutrals only</span>
            </div>
          </div>
        </div>

        {/* SECTIONS */}
        <ColorSection />
        <TypeSection />
        <SpacingSection />
        <RadiusShadowSection />
        <MotionSection />
        <ComponentsSection />
        <ResultSection />
        <TokensSection />
        <Footer />
      </div>
    </>
  );
}
