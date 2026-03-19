# Navbar Frosted Floating Bar — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the solid-colour edge-to-edge navbar on both pages with a frosted floating bar that shows as a ghost outline over the hero and transitions to a full frosted glass bar on scroll.

**Architecture:** Two new CSS classes (`.navbar-float` / `.navbar-float--scrolled`) go in `css/styles.css`. Both HTML navbars are updated to use the new class. A small scroll listener in each page's JS file toggles the scrolled modifier.

**Tech Stack:** HTML, Tailwind CSS (Vite build), vanilla JS, `backdrop-filter` CSS

---

## File Map

| File | Change |
|---|---|
| `css/styles.css` | Add `.navbar-float` and `.navbar-float--scrolled` |
| `index.html` | Replace nav classes; add `nav-link-item` to nav links |
| `products.html` | Replace nav classes + inline styles; add `nav-link-item` to nav links; replace inline height with `h-16` |
| `js/home.js` | Append scroll listener |
| `js/script.js` | Append scroll listener |

---

## Task 1: Add CSS classes

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add the two classes at the bottom of `css/styles.css`**

```css
/* ===== Navbar — frosted floating bar ===== */
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
  /* backdrop-filter excluded from transition — not interpolatable in most browsers */
  transition: background 0.4s ease,
              border-color 0.4s ease,
              box-shadow 0.4s ease;
}

.navbar-float--scrolled {
  background: rgba(255, 255, 255, 0.84);
  border-color: rgba(255, 255, 255, 0.55);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
}

/* Nav link colour in ghost state (over dark hero) */
.navbar-float:not(.navbar-float--scrolled) .nav-link-item {
  color: rgba(247, 246, 240, 0.8);
}
```

- [ ] **Step 2: Verify the build compiles without errors**

Run: `npm run build`
Expected: build completes with no errors (CSS output includes the new classes)

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: add navbar-float CSS classes for frosted floating bar"
```

---

## Task 2: Update index.html navbar

**Files:**
- Modify: `index.html` (line 19 — the `<nav>` opening tag and its link children)

- [ ] **Step 1: Replace the `<nav>` class string**

Current line 19:
```html
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-cream/85 backdrop-blur-md border-b border-divider">
```

Replace with:
```html
<nav class="navbar-float">
```

- [ ] **Step 2: Add `nav-link-item` to each nav link (not the CTA button)**

Current links (lines 23–26):
```html
<a href="#about" class="hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors tracking-wider">About Us</a>
<a href="#products" class="hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors tracking-wider">Products</a>
<a href="#custom-design" class="hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors tracking-wider">Custom Design</a>
<a href="#contact" class="hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors tracking-wider">Contact</a>
```

Add `nav-link-item` to each (leave `text-sage-500` in place — the CSS override applies only in ghost state):
```html
<a href="#about" class="nav-link-item hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors tracking-wider">About Us</a>
<a href="#products" class="nav-link-item hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors tracking-wider">Products</a>
<a href="#custom-design" class="nav-link-item hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors tracking-wider">Custom Design</a>
<a href="#contact" class="nav-link-item hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors tracking-wider">Contact</a>
```

- [ ] **Step 3: Verify in browser**

Open `index.html`. At the top of the page (over the dark hero):
- Navbar should show as a faint floating bar with white outline text
- No frosted glass yet

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: update index.html navbar to frosted floating bar"
```

---

## Task 3: Update products.html navbar

**Files:**
- Modify: `products.html` (lines 17–28 — the `<nav>` block)

- [ ] **Step 1: Replace the entire `<nav>` opening tag and remove inline styles**

Current (lines 18–19):
```html
<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
     style="background: hsla(60,20%,97%,0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid #d4ddd5;">
```

Replace with:
```html
<nav class="navbar-float">
```

Note: `id="navbar"` is intentionally removed — no JS file references it.

- [ ] **Step 2: Fix the inner layout div height**

Current (line 20):
```html
<div class="max-w-6xl mx-auto px-6 flex items-center justify-between" style="height:64px;">
```

Replace with:
```html
<div class="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
```

- [ ] **Step 3: Add `nav-link-item` to the nav links**

Current links (lines 23–24):
```html
<a href="#features"  class="hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors" style="letter-spacing:0.05em;">Features</a>
<a href="#products"  class="hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors" style="letter-spacing:0.05em;">Products</a>
```

Replace with:
```html
<a href="#features" class="nav-link-item hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors tracking-wider">Features</a>
<a href="#products" class="nav-link-item hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors tracking-wider">Products</a>
```

Note: the inline `letter-spacing` style is replaced by Tailwind's `tracking-wider` class, consistent with index.html.

- [ ] **Step 4: Verify in browser**

Open `products.html`. At the top of the page (over the dark hero):
- Navbar should show as a faint floating bar with white outline text
- Consistent appearance with index.html
- Check hero top spacing: the hero section has `pt-20` which was sized for the old flush navbar. With the floating bar the hero content may sit lower than intended — if it looks like too much gap, remove `pt-20` or reduce to `pt-16`.

- [ ] **Step 5: Commit**

```bash
git add products.html
git commit -m "feat: update products.html navbar to frosted floating bar"
```

---

## Task 4: Add scroll listeners

**Files:**
- Modify: `js/home.js` (append)
- Modify: `js/script.js` (append)

- [ ] **Step 1: Append scroll listener to `js/home.js`**

Add at the bottom of the file:
```js
// ─── Navbar — ghost → frosted on scroll ──────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar-float');
  if (nav) nav.classList.toggle('navbar-float--scrolled', window.scrollY > 60);
});
```

- [ ] **Step 2: Append scroll listener to `js/script.js`**

Add at the bottom of the file:
```js
// ─── Navbar — ghost → frosted on scroll ──────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar-float');
  if (nav) nav.classList.toggle('navbar-float--scrolled', window.scrollY > 60);
});
```

- [ ] **Step 3: Verify scroll behaviour on both pages**

**index.html:**
1. Open page — navbar should be ghost (white outline, light text)
2. Scroll down past the hero — navbar should transition to frosted white bar
3. Scroll back to top — navbar should return to ghost state

**products.html:**
1. Same checks as above

- [ ] **Step 4: Commit**

```bash
git add js/home.js js/script.js
git commit -m "feat: add scroll listener for navbar ghost-to-frosted transition"
```

---

## Final Check

- [ ] Run `npm run build` — no errors
- [ ] Both pages load without console errors
- [ ] Navbar floating gap is visible on both pages (bar does not touch screen edges)
- [ ] Ghost state: nav links are legible (light colour) over dark hero
- [ ] Frosted state: nav links are legible (dark colour) over light page content
- [ ] Transition is smooth (background, border, shadow animate; blur snaps — expected)
- [ ] CTA button ("Get a Quote" / "Request a Quote") is unaffected in both states
