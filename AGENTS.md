# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Nexopack** — a static multi-page marketing website for a Hong Kong-based food packaging company. No build step, no package manager, no framework.

## Running Locally

```bash
npx serve -p 3000 .
```

Open `http://localhost:3000`. The site is fully static; changes to HTML/CSS/JS are reflected on reload with no compilation needed.

## File Structure

- `index.html` — Home page (hero, about, product category browser, custom design, contact)
- `paper-material.html` — Paper material product page (features, cup variants: single/double/ripple wall + kraft soup cup, spec tables, quote form)
- `pulp-material.html` — Pulp material product page (sugarcane/bamboo pulp cups, lids, trays & accessories, spec tables, quote form)
- `css/styles.css` — Shared custom CSS loaded by `paper-material.html` and `pulp-material.html`
- `js/script.js` — JavaScript loaded by `paper-material.html` and `pulp-material.html`

## Architecture: Two Distinct Styling Systems

The pages use **different** styling approaches and must not be mixed:

- **`index.html`** — Self-contained. All styles are written as hand-crafted utility classes inside a `<style>` block in `<head>`, using CSS custom properties (`--primary`, `--fg`, `--bg`, etc.). No external stylesheet.
- **`paper-material.html` / `pulp-material.html`** — Use Tailwind CSS via the build pipeline with a custom theme (sage/cream color palette) defined in `css/main.css`. Supplemented by `css/styles.css` for hero gradient, scrollbar styling, and `.cup-card` hover effects.

## JavaScript Architecture (`js/script.js` — paper-material.html and pulp-material.html)

All logic is in plain vanilla JS, no modules or bundler:

- **`specData`** — Hardcoded object containing dimensional specs for `single`, `ripple`, `double` wall cups, and `soupCup`.
- **`pulpSpecData`** — Hardcoded object containing specs for pulp `cups`, `lids`, and `trays`.
- **`showSpecPanel(type)` / `closeSpecPanel()`** — Renders a spec table into `#specPanel` (below the top row of paper cup cards).
- **`showSoupCupSpecPanel()` / `closeSoupCupSpecPanel()`** — Renders the soup cup spec into `#soupCupSpecPanel` (below the kraft soup cup card).
- **`showPulpSpecPanel(type)` / `closePulpSpecPanel()`** — Renders a spec table into `#pulpSpecPanel` on the pulp material page.
- **`selectCupType(type)`** — Called by "Specification" buttons. Routes to the correct panel based on type.
- **Quote form** — Entirely client-side. `validateQuoteForm()` checks name, email (regex), product type, and quantity. On valid submit, form fields are hidden and `#formSuccess` is revealed. No backend/API call is made.

## Homepage Product Tab System (inline in `index.html`)

The `products` array and `showTab(material, btn)` function are defined inside a `<script>` block at the bottom of `index.html`, not in `script.js`. Products are filtered by a `material` field (`paper`, `plastic`, `bamboo`, `cornstarch`, `husk`, `bagasse`) and rendered into `#product-grid`. Many product entries are currently stubs with empty `name` and `description` fields.

## Color Tokens

`paper-material.html` / `pulp-material.html` / Tailwind theme:
- `sage-100/300/500/700/900` — muted greens (UI elements, text, backgrounds)
- `cream` (`#F7F6F0`) / `cream-dark` (`#ECEAE3`) — off-white backgrounds

`index.html` CSS variables mirror these with slightly different names (`--primary`, `--sage-dark`, `--cream`, `--secondary`, etc.).

## Images

All images live in `images/`. Referenced in HTML as relative paths. Filenames contain spaces (e.g., `Product Page Hero Image 4K.jpg`) — use `%20` encoding in `src`/`url()` attributes, or rename files to avoid spaces.
