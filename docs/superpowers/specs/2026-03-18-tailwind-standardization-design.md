# Tailwind CSS Standardization — Design Spec

**Date:** 2026-03-18
**Status:** Draft
**Goal:** Convert `index.html` from inline custom CSS to Tailwind CSS utility classes, matching the approach already used in `products.html`.

---

## Problem

The Nexopack website has two pages built with different CSS methodologies:

- `index.html` (homepage): ~170 lines of hand-written CSS in an inline `<style>` block, using CSS custom properties (`--primary`, `--bg`, etc.) and semantic class names (`.hero`, `.product-card`).
- `products.html` (product page): Tailwind CSS via CDN with a custom config (sage/cream palette), plus a small `css/styles.css` for effects that can't be expressed as utilities.

This split creates maintenance overhead, visual drift risk, and inconsistent file organization.

## Solution

Convert `index.html` to use Tailwind CSS utility classes with the same CDN and config as `products.html`. No build tool changes — CDN stays for now.

## Scope

### In Scope
- Remove the inline `<style>` block from `index.html`
- Replace all custom CSS classes with Tailwind utility classes on HTML elements
- Add the Tailwind CDN `<script>` tag and shared config to `index.html`
- Extract inline `<script>` from `index.html` into `js/home.js`
- Create `css/home.css` for homepage-specific effects that can't be expressed as Tailwind utilities (e.g., hero overlay gradient, `.btn-light` glassmorphism)
- Unify the navbar **styling** (visual treatment, spacing, fonts) across both pages — each page keeps its own navigation links appropriate to its content
- Fix duplicate `id="about"` bug (lines 205 and 297 both use `id="about"`) — rename the "Why Us" section to `id="why-us"`
- Add `class="scroll-smooth"` to `<html>` element (matches `products.html`)
- Remove dead `.product-overlay` markup (rendered but permanently hidden with `display: none`)

### Out of Scope
- Migrating from CDN to a build tool (Vite, PostCSS, etc.) — separate future task
- Extracting a shared Tailwind config file — requires build tooling
- Changing the visual design or content of either page
- Modifying `products.html` beyond ensuring config parity

## Shared Tailwind Config

Both pages will use an identical inline Tailwind config:

```javascript
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans:    ['DM Sans', 'sans-serif'],
                display: ['Playfair Display', 'serif']
            },
            colors: {
                sage: {
                    100: '#DFE8E1',
                    300: '#98B69E',
                    500: '#6B8F78',
                    700: '#4A6B58',
                    900: '#243D2F'
                },
                cream: { DEFAULT: '#F7F6F0', dark: '#ECEAE3' }
            },
            letterSpacing: {
                widest2: '0.25em'
            }
        }
    }
}
```

### Color Mapping

The homepage's CSS custom properties map to the Tailwind palette as follows. The "Actual Hex" column shows the true HSL-to-hex conversion; the "Tailwind Hex" column shows the Tailwind token value. Where the delta is significant, the approach column specifies the strategy.

| CSS Variable | HSL Value | Actual Hex | Tailwind Token | Tailwind Hex | Delta | Approach |
|---|---|---|---|---|---|---|
| `--bg` | `hsl(60, 20%, 97%)` | `#F8F7F2` | `cream` | `#F7F6F0` | Negligible | Use Tailwind token |
| `--fg` | `hsl(150, 10%, 15%)` | `#222A26` | `sage-900` | `#243D2F` | Minor | Use Tailwind token (both are very dark greens) |
| `--primary` | `hsl(143, 18%, 42%)` | `#587E67` | `sage-700` | `#4A6B58` | Moderate | Use inline style `color: hsl(143, 18%, 42%)` for key accents; sage-700 for hover states |
| `--primary-fg` | `hsl(60, 20%, 97%)` | `#F8F7F2` | `cream` | `#F7F6F0` | Negligible | Use Tailwind token |
| `--secondary` | `hsl(140, 12%, 88%)` | `#D8E2DA` | `sage-100` | `#DFE8E1` | Minor | Use Tailwind token |
| `--secondary-fg` | `hsl(150, 10%, 20%)` | `#2E3833` | — | — | — | Not visibly used in current CSS; dropping |
| `--muted` | `hsl(140, 10%, 92%)` | `#E6EBE7` | — | — | — | Use inline style where needed (`.btn-outline-dark:hover` bg) |
| `--muted-fg` | `hsl(150, 5%, 45%)` | `#6D7873` | `sage-500` | `#6B8F78` | Moderate | Use inline style `color: hsl(150, 5%, 45%)` for muted text to preserve the near-gray tone |
| `--border` | `hsl(140, 10%, 85%)` | `#D5DDD7` | — | — | — | Use inline style `border-color: #d4ddd5` (matches `products.html` approach) |
| `--sage-dark` | `hsl(143, 20%, 28%)` | `#395644` | `sage-900` | `#243D2F` | Large (17% lightness shift) | Use inline style `background: hsl(143, 20%, 28%)` for hero/footer backgrounds |
| `--cream` | `hsl(45, 30%, 96%)` | `#F8F6F0` | `cream` | `#F7F6F0` | Negligible | Use Tailwind token |

**Strategy summary:** Use Tailwind tokens where the delta is negligible or minor. Use inline `style` attributes for `--primary`, `--muted-fg`, `--sage-dark`, `--border`, and `--muted` where exact color reproduction matters. This matches the pattern already established in `products.html` (which uses inline styles for border colors and backgrounds).

## Section-by-Section Conversion

### Navbar
- Fixed positioning, blur backdrop, border-bottom — Tailwind utilities + inline style for border color
- Logo: `font-display text-lg font-semibold`
- Nav links: hidden on mobile, visible at `sm:` breakpoint (matching `products.html` behavior at 640px, a minor change from the current 768px breakpoint)
- Each page keeps its own nav links (homepage: About Us, Products, Custom Design, Contact; product page: Features, Products)
- CTA: adopt `products.html` filled-button style (`bg-sage-700 hover:bg-sage-900 text-cream rounded-full`) for consistency across pages

### Hero
- Relative container, min-height screen, flex center
- Background image via inline `style`
- Overlay gradient via `css/home.css` (too complex for utility class)
- Content: tag line, h1, paragraph, two buttons
- `.btn-primary` → Tailwind utilities (`bg-cream text-sage-900 rounded-full`)
- `.btn-outline` → Tailwind utilities (`border border-white/30 text-cream rounded-full`)

### About Us Section
- White background, centered text, stats row with dividers
- Stats use a flex layout with `border-t` / `border-b`
- `.btn-light` glassmorphism effect stays in `css/home.css`

### Products Section
- `bg-sage-100` background
- Tab buttons: `rounded-full`, active state via JS class toggle
- Product grid: responsive grid (`sm:grid-cols-2 lg:grid-cols-3`)
- Product cards: border, hover state changes bg to sage-900

### Custom Design Section
- 4-column grid (`sm:grid-cols-2 lg:grid-cols-4`)
- Icon circles with hover color inversion
- Cards with border and hover shadow

### Why Us Section
- 3-column grid with icon cards
- Similar structure to product page features section

### Contact Section
- `bg-sage-100`, centered layout
- `.btn-hero` → Tailwind utilities (`bg-sage-700 hover:bg-sage-900 text-cream rounded-full`) — matches the product page CTA style
- `.btn-outline-white` → Tailwind utilities (`border border-white/70 text-white hover:bg-white/10 rounded-full`)
- Contact info links with icon + text

### Footer
- `bg-sage-900` with cream text
- Grid layout, bottom copyright bar

## File Structure After Conversion

```
index.html          — Tailwind CDN + config, utility classes, links to css/home.css and js/home.js
products.html       — unchanged
css/styles.css      — product page custom styles (unchanged)
css/home.css        — homepage custom styles (hero overlay, btn-light glassmorphism)
js/script.js        — product page JS (unchanged)
js/home.js          — homepage JS (extracted from inline script, tab switching + product grid)
```

## Constraints

- **Visual parity:** The converted homepage must be visually identical to the current version. No design changes.
- **No build tools:** Tailwind loaded via CDN only. No `package.json`, no `node_modules`.
- **No changes to products.html:** Beyond verifying that its Tailwind config matches the shared one.
- **Browser support:** Same as current (modern browsers).

## Testing

- Side-by-side visual comparison of current vs. converted homepage at three viewports: 375px (mobile), 768px (tablet), 1280px (desktop)
- Verify interactive elements: tab switching, product grid rendering, anchor link scrolling (including smooth scroll), hover states on product cards, custom-design cards, and buttons
- Verify navbar and footer visual consistency between both pages
- Verify color palette: spot-check hero background, footer background, muted text, and primary accent colors against current page
- Check that `products.html` still renders correctly (no regressions)
- Confirm duplicate `id="about"` is resolved and `#about` anchor navigates to the About Us section
