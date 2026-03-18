# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Nexopack** — a static two-page marketing website for a Hong Kong-based food packaging company. No build step, no package manager, no framework.

## Running Locally

```bash
npx serve -p 3000 .
```

Open `http://localhost:3000`. The site is fully static; changes to HTML/CSS/JS are reflected on reload with no compilation needed.

## File Structure

- `index.html` — Home page (hero, about, product category browser, custom design, contact)
- `products.html` — Paper cups product page (features, cup variants, spec table, quote form)
- `css/styles.css` — Shared custom CSS loaded only by `products.html`
- `js/script.js` — JavaScript loaded only by `products.html`

## Architecture: Two Distinct Styling Systems

The two pages use **different** styling approaches and must not be mixed:

- **`index.html`** — Self-contained. All styles are written as hand-crafted utility classes inside a `<style>` block in `<head>`, using CSS custom properties (`--primary`, `--fg`, `--bg`, etc.). No external stylesheet.
- **`products.html`** — Uses Tailwind CSS loaded from CDN (`https://cdn.tailwindcss.com`) with a custom theme (sage/cream color palette) configured inline via `tailwind.config`. Supplemented by `css/styles.css` for hero gradient, scrollbar styling, and `.cup-card` hover effects.

## JavaScript Architecture (`js/script.js` — products.html only)

All logic is in plain vanilla JS, no modules or bundler:

- **`specData`** — Hardcoded object containing dimensional specs (size, diameters, heights, carton dimensions) for `single`, `ripple`, and `double` wall cups.
- **`showSpecPanel(type)` / `closeSpecPanel()`** — Dynamically renders a spec table into `#specPanel` by reading `specData[type]`.
- **`selectCupType(type)`** — Called by "Specification" buttons on cup cards. If spec data exists, shows the panel; otherwise falls through to pre-fill the quote form and scroll to it.
- **Quote form** — Entirely client-side. `validateQuoteForm()` checks name, email (regex), cup type, and quantity. On valid submit, the form fields are hidden and `#formSuccess` is revealed. No backend/API call is made.

## Homepage Product Tab System (inline in `index.html`)

The `products` array and `showTab(material, btn)` function are defined inside a `<script>` block at the bottom of `index.html`, not in `script.js`. Products are filtered by a `material` field (`paper`, `plastic`, `bamboo`, `cornstarch`, `husk`, `bagasse`) and rendered into `#product-grid`. Many product entries are currently stubs with empty `name` and `description` fields.

## Color Tokens

`products.html` / Tailwind theme:
- `sage-100/300/500/700/900` — muted greens (UI elements, text, backgrounds)
- `cream` (`#F7F6F0`) / `cream-dark` (`#ECEAE3`) — off-white backgrounds

`index.html` CSS variables mirror these with slightly different names (`--primary`, `--sage-dark`, `--cream`, `--secondary`, etc.).

## Images

All images live in `images/`. Referenced in HTML as relative paths. Filenames contain spaces (e.g., `Product Page Hero Image 4K.jpg`) — use `%20` encoding in `src`/`url()` attributes, or rename files to avoid spaces.
