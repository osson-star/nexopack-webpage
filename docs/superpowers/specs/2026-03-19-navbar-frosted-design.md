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
| Implementation | Custom CSS classes in `styles.css` + scroll listener in JS |

## Files Changed

- `css/styles.css` — add `.navbar-float` and `.navbar-float--scrolled`
- `index.html` — update `<nav>` classes
- `products.html` — update `<nav>` classes and remove inline styles
- `js/home.js` — add scroll listener
- `js/script.js` — add scroll listener

## CSS Spec

```css
/* Ghost state — default, over hero */
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
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  transition: background 0.4s ease,
              border-color 0.4s ease,
              box-shadow 0.4s ease,
              backdrop-filter 0.4s ease;
}

/* Frosted state — added by JS on scroll */
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

Remove: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-cream/85 backdrop-blur-md border-b border-divider`

Replace with: `navbar-float` (plus keep inner layout classes unchanged)

### products.html `<nav>`

Remove: `fixed top-0 left-0 right-0 z-50 transition-all duration-300` and all inline styles (`style="..."`)

Replace with: `navbar-float` (plus keep inner layout classes unchanged)

## JavaScript Spec

Add to both `js/home.js` and `js/script.js`:

```js
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.classList.toggle('navbar-float--scrolled', window.scrollY > 60);
});
```

## Behaviour Notes

- On pages with no hero (if added in future), the ghost state will briefly show before scrolling — acceptable since it transitions smoothly.
- The `transition-all duration-300` Tailwind class on both navbars should be removed; the transition is now owned entirely by `.navbar-float` to avoid conflicts.
- `z-index: 50` is retained in CSS (replacing the Tailwind `z-50` class).
