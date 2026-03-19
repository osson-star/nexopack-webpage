# Navbar: Frosted Floating Bar

**Date:** 2026-03-19
**Status:** Approved

## Summary

Replace the current solid-colour, edge-to-edge navbar with a frosted floating bar that sits above the page with a gap on all sides. Over the hero image it renders as a subtle ghost outline; once the user scrolls past ~60px it transitions into a full frosted glass bar.

## Design Decisions

| Decision | Choice |
|---|---|
| Shape | Floating bar — gap on all sides, softly rounded corners (12px radius) |
| Glass tint | Pure white (`rgba(255,255,255,0.84)`) |
| Blur | `backdrop-filter: blur(16px) saturate(1.4)` |
| Scroll behaviour | Ghost outline on hero → frosted bar on scroll (threshold: 60px) |
| Implementation | Custom CSS classes in `css/styles.css` + scroll listener in JS |

## Files Changed

- `css/styles.css` — add `.navbar-float` and `.navbar-float--scrolled`
- `index.html` — update `<nav>` classes
- `products.html` — update `<nav>` classes, remove inline styles, replace inline `height:64px` with `h-16`
- `js/home.js` — add scroll listener
- `js/script.js` — add scroll listener

## CSS Spec

Add to `css/styles.css`. Note: `styles.css` is already imported by `css/main.css` (`@import "./styles.css"`), so these classes are included in the Tailwind build automatically.

```css
/* Ghost state — default, visible over dark hero */
.navbar-float {
  position: fixed;
  top: 12px;
  left: 12px;
  right: 12px;
  z-index: 50;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.10);
  border: 1px solid rgba(255, 255, 255, 0.28);
  box-shadow: none;
  /* backdrop-filter intentionally omitted from transition — not interpolatable
     in most browsers; blur snaps while other properties animate smoothly */
  transition: background 0.4s ease,
              border-color 0.4s ease,
              box-shadow 0.4s ease;
}

/* Frosted state — toggled by JS on scroll */
.navbar-float--scrolled {
  background: rgba(255, 255, 255, 0.84);
  border-color: rgba(255, 255, 255, 0.55);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
}
```

## HTML Spec

### index.html `<nav>`

**Remove** these Tailwind classes: `transition-all duration-300 bg-cream/85 backdrop-blur-md border-b border-divider`
(keep `fixed top-0 left-0 right-0 z-50` — these are overridden by `.navbar-float` but harmless, or remove them too since `.navbar-float` owns positioning)

**Preferred**: replace the entire class string with just `navbar-float`. The inner layout div keeps `h-16` for its 64px height.

**Nav link text colour in ghost state:** Links use `text-sage-500` (dark green) which will be illegible over the dark hero in ghost state. Change ghost-state nav links to `text-cream/80` and toggle back to `text-sage-500` via the `--scrolled` class. See JS spec for colour toggle approach, or handle with a CSS sibling selector:

```css
/* Link colours in ghost state */
.navbar-float:not(.navbar-float--scrolled) .nav-link-item {
  color: rgba(247, 246, 240, 0.8);
}
```

Add class `nav-link-item` to each `<a>` link in the nav (excluding the CTA button, which keeps its own background).

### products.html `<nav>`

**Remove**: `id="navbar"` attribute (safe to remove — `js/script.js` does not reference it), all `class` attributes, and the entire `style="..."` inline style block.
**Add**: `class="navbar-float"`

**Inner layout div**: Replace `style="height:64px;"` with Tailwind class `h-16`.

**Ghost-state link colours**: The products.html nav links (`#features`, `#products`) also use `text-sage-500` and will be illegible over the dark hero in ghost state. Add class `nav-link-item` to each of those `<a>` links (same as index.html). The CTA button is excluded.

**Hero confirmation**: products.html has a dark hero (`bg-sage-900/55` overlay on a full-bleed image), so the ghost state is appropriate as the default.

## JavaScript Spec

Add to **both** `js/home.js` and `js/script.js`. Both files are confirmed loaded by their respective pages (`home.js` via index.html, `script.js` via products.html). Use `.navbar-float` as the selector (unambiguous, works on both pages):

```js
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar-float');
  if (nav) nav.classList.toggle('navbar-float--scrolled', window.scrollY > 60);
});
```

The `if (nav)` guard prevents errors on any future page that may not have the floating navbar.

## Known Limitations

- **`backdrop-filter` transition**: Blur does not animate smoothly in most browsers — it snaps from 0 to 16px. The background, border, and shadow still animate, so the transition remains visually acceptable.
- **Ghost state on non-dark backgrounds**: The ghost state (`rgba(255,255,255,0.10)`) is nearly invisible against light/cream backgrounds. This is acceptable for current pages (both heroes are dark), but any future page without a dark hero should start with `.navbar-float--scrolled` pre-applied.
