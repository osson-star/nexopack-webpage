# Tailwind CSS Standardization — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `index.html` from inline custom CSS to Tailwind CSS utility classes, matching the `products.html` approach.

**Architecture:** Replace the ~170-line inline `<style>` block with Tailwind CDN + utility classes on HTML elements. Complex effects (hero overlay gradient, glassmorphism button) go into a dedicated `css/home.css`. Inline `<script>` gets extracted to `js/home.js`. Both pages share an identical Tailwind config.

**Tech Stack:** HTML, Tailwind CSS (CDN), vanilla JavaScript

**Spec:** `docs/superpowers/specs/2026-03-18-tailwind-standardization-design.md`

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `css/home.css` | Hero overlay gradient, `.btn-light` glassmorphism, product card hover states, custom-design card hover states |
| Create | `js/home.js` | Homepage JS (product data, tab switching, grid rendering) |
| Modify | `index.html` | Full conversion: remove `<style>`, add Tailwind CDN + config, replace all classes with utilities |

**Files NOT modified:** `products.html`, `css/styles.css`, `js/script.js`

---

### Task 1: Create `css/home.css` — custom styles that can't be Tailwind utilities

**Files:**
- Create: `css/home.css`

- [ ] **Step 1: Create `css/home.css` with hero overlay, btn-light, and hover effects**

```css
/* css/home.css — Homepage styles that require custom CSS (not expressible as Tailwind utilities) */

/* Hero overlay — multi-stop gradient */
.hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, hsla(143,20%,28%,0.85), hsla(143,20%,28%,0.55), hsla(143,20%,28%,0.15));
}

/* Glassmorphism button */
.btn-light {
    color: hsl(150, 10%, 15%);
    border: 1.5px solid rgba(255, 255, 255, 0.45);
    background: linear-gradient(135deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 100%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px rgba(31,38,135,0.10), inset 0 4px 5px rgba(255,255,255,0.85), inset 0 -4px 5px rgba(0,0,0,0.04);
    transition: all 0.3s ease;
}

.btn-light:hover {
    background: linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.22) 100%);
    transform: translateY(-2px);
    box-shadow: 0 12px 36px rgba(31,38,135,0.15), inset 0 4px 5px rgba(255,255,255,1), inset 0 -4px 5px rgba(0,0,0,0.04);
}

/* Product card hover — changes bg/border/text colors; too many coordinated changes for pure utilities */
.product-card {
    transition: all 0.3s;
}

.product-card:hover {
    background: hsl(143, 20%, 28%);
    border-color: hsl(143, 20%, 28%);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.product-card:hover h3 {
    color: #F7F6F0;
}

.product-card:hover .arrow {
    color: hsla(60,20%,97%,0.6);
}

/* Custom design card hover — icon color inversion */
.custom-card {
    transition: all 0.3s;
}

.custom-card:hover {
    border-color: hsla(143,18%,42%,0.3);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.custom-icon {
    transition: all 0.3s;
}

.custom-card:hover .custom-icon {
    background: hsl(143, 18%, 42%);
    color: #F7F6F0;
}

/* Tab active state */
.tab.active {
    background: hsl(143, 18%, 42%);
    color: #F7F6F0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

- [ ] **Step 2: Commit**

```bash
git add css/home.css
git commit -m "feat: add css/home.css for homepage custom styles"
```

---

### Task 2: Create `js/home.js` — extract homepage JavaScript

**Files:**
- Create: `js/home.js`

- [ ] **Step 1: Create `js/home.js` with product data, tab switching, and grid rendering**

Extract the inline `<script>` from `index.html` (lines 375-442). Update the `showTab` function to use Tailwind classes instead of the old semantic classes. Remove the dead `.product-overlay` markup from the generated HTML.

```javascript
// js/home.js — Homepage product grid and tab switching

const products = [
  { name: "Paper Cups", description: "Single wall, double wall, and ripple wall — premium cups with PE or aqueous coating and custom branding.", material: "paper", link: "products.html" },
  { name: "Paper Straws", description: "Biodegradable straws in various colours and diameters.", material: "paper" },
  { name: "Napkins", description: "1-ply and 2-ply napkins. White, kraft, and custom print available.", material: "paper" },
  { name: "Pizza Boxes", description: "Corrugated kraft pizza boxes in 8\u2033 to 18\u2033 sizes.", material: "paper" },
  { name: "Burger Boxes", description: "Clamshell kraft burger containers with grease-resistant lining.", material: "paper" },
  { name: "Paper Bags", description: "Flat and SOS bags for takeaway. Multiple sizes and prints.", material: "paper" },
  { name: "Plastic Cups", description: "PET and PP cups for cold drinks. 12oz\u201324oz. Crystal clear.", material: "plastic" },
  { name: "Bamboo Straws", description: "", material: "bamboo" },
  { name: "", description: "", material: "bamboo" },
  { name: "", description: "", material: "bamboo" },
  { name: "", description: "", material: "bamboo" },
  { name: "", description: "", material: "bamboo" },
  { name: "", description: "", material: "bamboo" },
  { name: "", description: "", material: "cornstarch" },
  { name: "", description: "", material: "cornstarch" },
  { name: "", description: "", material: "cornstarch" },
  { name: "", description: "", material: "cornstarch" },
  { name: "", description: "", material: "cornstarch" },
  { name: "", description: "", material: "cornstarch" },
  { name: "", description: "", material: "husk" },
  { name: "", description: "", material: "husk" },
  { name: "", description: "", material: "husk" },
  { name: "", description: "", material: "husk" },
  { name: "", description: "", material: "husk" },
  { name: "", description: "", material: "husk" },
  { name: "Bagasse / Sugarcane Cup", description: "", material: "bagasse" },
  { name: "Bagasse / Sugarcane Lid", description: "", material: "bagasse" },
  { name: "", description: "", material: "bagasse" },
  { name: "", description: "", material: "bagasse" },
  { name: "", description: "", material: "bagasse" },
  { name: "", description: "", material: "bagasse" },
  { name: "Cup Lids", description: "Flat and dome lids compatible with standard cup sizes.", material: "plastic" },
  { name: "Plastic Straws", description: "Standard and jumbo straws. Individually wrapped options.", material: "plastic" },
  { name: "Cutlery Sets", description: "Forks, knives, spoons. Individual and combo packs.", material: "plastic" },
  { name: "Food Containers", description: "Hinged-lid containers for salads, deli, and hot food.", material: "plastic" },
  { name: "Sauce Cups", description: "Portion cups with lids. 1oz\u20134oz for dips and sauces.", material: "plastic" },
];

function showTab(material, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const grid = document.getElementById('product-grid');
  const filtered = products.filter(p => p.material === material);
  grid.innerHTML = filtered.map(p => {
    const tag = p.link ? 'a' : 'div';
    const href = p.link ? ` href="${p.link}"` : '';
    return `
    <${tag}${href} class="product-card relative bg-cream rounded-lg overflow-hidden cursor-pointer" style="border: 1px solid #d4ddd5;">
      <div class="p-6 flex items-center justify-between">
        <h3 class="font-display text-lg font-semibold transition-colors duration-300">${p.name}</h3>
        <span class="arrow transition-colors duration-300" style="color: hsl(150, 5%, 45%);">&rarr;</span>
      </div>
    </${tag}>
  `;
  }).join('');
}

// Initialize with paper tab active
document.addEventListener('DOMContentLoaded', () => {
  const firstTab = document.querySelector('.tab');
  if (firstTab) {
    firstTab.classList.add('active');
    showTab('paper', firstTab);
  }
});
```

Key changes from original:
- Product card HTML now uses Tailwind classes instead of `.product-card-inner`
- Removed dead `.product-overlay` markup
- Wrapped init code in `DOMContentLoaded` since `js/home.js` will use `defer`

- [ ] **Step 2: Commit**

```bash
git add js/home.js
git commit -m "feat: extract homepage JS to js/home.js"
```

---

### Task 3: Convert `index.html` `<head>` — replace `<style>` with Tailwind CDN + config

**Files:**
- Modify: `index.html:1-170`

- [ ] **Step 1: Replace the entire `<head>` section**

Replace lines 1-170 of `index.html` with:

```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexopack — Sustainable Packaging Solutions</title>
    <meta name="description" content="Premium sustainable packaging — from insulated paper cups to custom food containers. Reliable supply, competitive pricing, eco-friendly materials.">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">

    <script src="https://cdn.tailwindcss.com"></script>
    <script>
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
    </script>

    <link rel="stylesheet" href="css/home.css">
    <script src="js/home.js" defer></script>
</head>
```

This removes the entire inline `<style>` block and replaces it with:
- Tailwind CDN script + identical config to `products.html`
- Link to `css/home.css` for custom effects
- Link to `js/home.js` with `defer`
- `scroll-smooth` class on `<html>` element

Also update the `<body>` tag from bare `<body>` to include Tailwind base classes matching `products.html`:

```html
<body class="font-sans bg-cream text-sage-900 antialiased selection:bg-sage-300 selection:text-white">
```

This ensures the default font family, background color, and text color are applied via Tailwind (previously handled by the inline `<style>` block's `body` rule).

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "refactor: replace inline styles with Tailwind CDN + config in index.html head"
```

---

### Task 4: Convert Navbar section

**Files:**
- Modify: `index.html` (navbar section, currently lines 173-187)

- [ ] **Step 1: Replace the navbar HTML**

Replace:
```html
<!-- Navbar -->
<header class="navbar">
  <div class="navbar-inner">
    <a href="index.html" class="logo">
      Nexopack
    </a>
    <nav class="nav-links">
      <a href="#about">About Us</a>
      <a href="#products">Products</a>
      <a href="#custom-design">Custom Design</a>
      <a href="#contact">Contact</a>
    </nav>
    <a href="#contact" class="nav-cta">Get a Quote &rarr;</a>
  </div>
</header>
```

With:
```html
<!-- Navbar -->
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
     style="background: hsla(60,20%,97%,0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid #d4ddd5;">
    <div class="max-w-6xl mx-auto px-6 flex items-center justify-between" style="height:64px;">
        <a href="index.html" class="font-display text-lg font-semibold text-sage-900 tracking-tight">Nexopack</a>
        <div class="flex items-center gap-8">
            <a href="#about" class="hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors" style="letter-spacing:0.05em;">About Us</a>
            <a href="#products" class="hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors" style="letter-spacing:0.05em;">Products</a>
            <a href="#custom-design" class="hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors" style="letter-spacing:0.05em;">Custom Design</a>
            <a href="#contact" class="hidden sm:block text-sage-500 hover:text-sage-900 text-sm font-medium transition-colors" style="letter-spacing:0.05em;">Contact</a>
            <a href="#contact" class="bg-sage-700 hover:bg-sage-900 text-cream text-sm font-medium px-5 py-2 rounded-full transition-colors">Get a Quote</a>
        </div>
    </div>
</nav>
```

Note: CTA is now a filled button matching `products.html` style. Nav links use `text-sage-500 hover:text-sage-900` — the same Tailwind pattern used in `products.html` — for consistent hover behavior across pages. All four original nav links are preserved, plus the CTA button.

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "refactor: convert navbar to Tailwind utilities"
```

---

### Task 5: Convert Hero section

**Files:**
- Modify: `index.html` (hero section)

- [ ] **Step 1: Replace the hero HTML**

Replace:
```html
<!-- Hero -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="section container hero-content" style="padding-top:6rem;">
    <p class="hero-tag">One Stop Packaging Solution</p>
    <h1>The Packaging Partner<br>Built for Food &amp; Beverage</h1>
    <p>Premium food &amp; beverage packaging solutions — from traditional to eco&#8209;friendly materials. Reliable supply, competitive pricing, and dedicated service you can trust.</p>
    <div class="hero-btns">
      <a href="#products" class="btn btn-primary">Browse Products &rarr;</a>
      <a href="#contact" class="btn btn-outline">Get a Quote</a>
    </div>
  </div>
</section>
```

With:
```html
<!-- Hero -->
<section class="relative flex items-center overflow-hidden" style="min-height: 90vh; background: hsl(143, 20%, 28%);">
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('images/Home%20Page_Hero%20Section_Image.jpg');"></div>
    <div class="hero-overlay"></div>
    <div class="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24 lg:px-20" style="padding-top:6rem;">
        <div class="max-w-xl">
            <p class="text-xs uppercase mb-4" style="letter-spacing: 0.25em; color: hsla(60,20%,97%,0.7);">One Stop Packaging Solution</p>
            <h1 class="font-display text-4xl md:text-5xl font-semibold text-cream leading-tight mb-6">The Packaging Partner<br>Built for Food &amp; Beverage</h1>
            <p class="text-base leading-relaxed mb-10 max-w-md" style="color: hsla(60,20%,97%,0.8);">Premium food &amp; beverage packaging solutions — from traditional to eco&#8209;friendly materials. Reliable supply, competitive pricing, and dedicated service you can trust.</p>
            <div class="flex flex-wrap gap-4">
                <a href="#products" class="inline-flex items-center gap-1.5 bg-cream text-sage-900 font-medium px-8 py-3 rounded-full text-sm transition-all hover:opacity-90">Browse Products &rarr;</a>
                <a href="#contact" class="inline-flex items-center gap-1.5 font-medium px-8 py-3 rounded-full text-sm text-cream transition-all hover:bg-white/10" style="border: 1px solid hsla(60,20%,97%,0.3);">Get a Quote</a>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "refactor: convert hero section to Tailwind utilities"
```

---

### Task 6: Convert About Us section

**Files:**
- Modify: `index.html` (about us section)

- [ ] **Step 1: Replace the About Us HTML**

Replace:
```html
<!-- About Us -->
<section id="about" class="section about-us">
  <div class="container">
    <div class="about-us-content">
      <p class="about-tag">ABOUT US</p>
      <h2>One Partner. Every Packaging Need.</h2>
      <p class="about-lead">Nexopack is a Hong Kong-based food packaging company with over two decades of experience, backed by our own manufacturing base in China.</p>
    </div>
    <div class="about-stats">
      <div class="about-stat">
        <strong>20+ Years</strong>
        <span>Industry Experience</span>
      </div>
      <div class="about-stat-divider"></div>
      <div class="about-stat">
        <strong>Full Range</strong>
        <span>Cups, Containers, Bags &amp; More</span>
      </div>
      <div class="about-stat-divider"></div>
      <div class="about-stat">
        <strong>4 Continents</strong>
        <span>Asia, Europe, Africa &amp; North America</span>
      </div>
    </div>
    <div class="about-us-content">
      <p class="about-description">From cafés and restaurants to hotels and branded chain stores, we provide off-the-shelf stock, custom ODM solutions, and consolidated logistics — all under one roof. Across paper, plastic, bamboo, and pulp, we keep packaging sourcing straightforward.</p>
      <p class="about-description"><em>Discover the full story of who we are and what drives us — click below to learn more.</em></p>
      <a href="#" class="btn btn-light">Know us more</a>
    </div>
  </div>
</section>
```

With:
```html
<!-- About Us -->
<section id="about" class="py-16 md:py-24 bg-white">
    <div class="max-w-6xl mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto">
            <p class="text-xs uppercase mb-3" style="letter-spacing: 0.15em; color: hsl(150, 5%, 45%);">ABOUT US</p>
            <h2 class="font-display text-3xl font-semibold text-sage-900 mb-5">One Partner. Every Packaging Need.</h2>
            <p class="text-lg leading-relaxed text-sage-900 mb-10" style="line-height: 1.8;">Nexopack is a Hong Kong-based food packaging company with over two decades of experience, backed by our own manufacturing base in China.</p>
        </div>
        <div class="flex justify-center items-center py-7 mb-10" style="border-top: 1px solid #d4ddd5; border-bottom: 1px solid #d4ddd5;">
            <div class="flex-1 px-6 whitespace-nowrap text-center">
                <strong class="block font-display text-xl font-semibold text-sage-900 mb-1">20+ Years</strong>
                <span class="text-sm" style="color: hsl(150, 5%, 45%); line-height: 1.5;">Industry Experience</span>
            </div>
            <div class="w-px h-10 shrink-0" style="background: #d4ddd5;"></div>
            <div class="flex-1 px-6 whitespace-nowrap text-center">
                <strong class="block font-display text-xl font-semibold text-sage-900 mb-1">Full Range</strong>
                <span class="text-sm" style="color: hsl(150, 5%, 45%); line-height: 1.5;">Cups, Containers, Bags &amp; More</span>
            </div>
            <div class="w-px h-10 shrink-0" style="background: #d4ddd5;"></div>
            <div class="flex-1 px-6 whitespace-nowrap text-center">
                <strong class="block font-display text-xl font-semibold text-sage-900 mb-1">4 Continents</strong>
                <span class="text-sm" style="color: hsl(150, 5%, 45%); line-height: 1.5;">Asia, Europe, Africa &amp; North America</span>
            </div>
        </div>
        <div class="text-center max-w-3xl mx-auto">
            <p class="text-base leading-relaxed mb-5" style="color: hsl(150, 5%, 45%); line-height: 1.75;">From cafés and restaurants to hotels and branded chain stores, we provide off-the-shelf stock, custom ODM solutions, and consolidated logistics — all under one roof. Across paper, plastic, bamboo, and pulp, we keep packaging sourcing straightforward.</p>
            <p class="text-base leading-relaxed mb-8" style="color: hsl(150, 5%, 45%); line-height: 1.75;"><em class="text-sage-900 italic">Discover the full story of who we are and what drives us — click below to learn more.</em></p>
            <a href="#" class="btn-light inline-flex items-center gap-1.5 px-8 py-3 rounded-full text-sm font-medium cursor-pointer">Know us more</a>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "refactor: convert About Us section to Tailwind utilities"
```

---

### Task 7: Convert Products section

**Files:**
- Modify: `index.html` (products section)

- [ ] **Step 1: Replace the Products HTML**

Replace:
```html
<!-- Products -->
<section id="products" class="section products">
  <div class="container">
    <div class="section-header">
      <p class="section-tag">Our Range</p>
      <h2 class="section-title">Products by Category</h2>
    </div>
    <div class="tabs">
      <button class="tab" onclick="showTab('paper', this)">Paper</button>
      <button class="tab" onclick="showTab('plastic', this)">Plastic</button>
      <button class="tab" onclick="showTab('bamboo', this)">Bamboo</button>
      <button class="tab" onclick="showTab('cornstarch', this)">Cornstarch</button>
      <button class="tab" onclick="showTab('husk', this)">Husk</button>
      <button class="tab" onclick="showTab('bagasse', this)">Bagasse / Sugarcane Pulp</button>
    </div>
    <div class="product-grid" id="product-grid"></div>
  </div>
</section>
```

With:
```html
<!-- Products -->
<section id="products" class="py-16 md:py-24 bg-sage-100">
    <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12">
            <p class="text-xs uppercase font-semibold mb-3" style="letter-spacing: 0.15em; color: hsl(150, 5%, 45%);">Our Range</p>
            <h2 class="font-display text-3xl sm:text-4xl font-semibold text-sage-900">Products by Category</h2>
        </div>
        <div class="flex justify-center gap-2 mb-12 flex-wrap">
            <button class="tab py-2.5 px-6 rounded-full text-sm font-medium border-none cursor-pointer font-sans transition-all bg-cream" style="color: hsl(150, 5%, 45%);" onclick="showTab('paper', this)">Paper</button>
            <button class="tab py-2.5 px-6 rounded-full text-sm font-medium border-none cursor-pointer font-sans transition-all bg-cream" style="color: hsl(150, 5%, 45%);" onclick="showTab('plastic', this)">Plastic</button>
            <button class="tab py-2.5 px-6 rounded-full text-sm font-medium border-none cursor-pointer font-sans transition-all bg-cream" style="color: hsl(150, 5%, 45%);" onclick="showTab('bamboo', this)">Bamboo</button>
            <button class="tab py-2.5 px-6 rounded-full text-sm font-medium border-none cursor-pointer font-sans transition-all bg-cream" style="color: hsl(150, 5%, 45%);" onclick="showTab('cornstarch', this)">Cornstarch</button>
            <button class="tab py-2.5 px-6 rounded-full text-sm font-medium border-none cursor-pointer font-sans transition-all bg-cream" style="color: hsl(150, 5%, 45%);" onclick="showTab('husk', this)">Husk</button>
            <button class="tab py-2.5 px-6 rounded-full text-sm font-medium border-none cursor-pointer font-sans transition-all bg-cream" style="color: hsl(150, 5%, 45%);" onclick="showTab('bagasse', this)">Bagasse / Sugarcane Pulp</button>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" id="product-grid"></div>
    </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "refactor: convert Products section to Tailwind utilities"
```

---

### Task 8: Convert Custom Design section

**Files:**
- Modify: `index.html` (custom design section)

- [ ] **Step 1: Replace the Custom Design HTML**

Replace:
```html
<!-- Custom Design -->
<section id="custom-design" class="section">
  <div class="container">
    <div class="section-header">
      <p class="section-tag">Customisation</p>
      <h2 class="section-title">Your Brand, Our Craft</h2>
      <p style="margin-top:1rem;color:var(--muted-fg);max-width:36rem;margin-left:auto;margin-right:auto;line-height:1.7;">Your colours, your logo, your story — printed with precision on sustainable materials that reflect what your brand stands for.</p>
    </div>
    <div class="custom-grid">
```

With:
```html
<!-- Custom Design -->
<section id="custom-design" class="py-16 md:py-24 bg-cream">
    <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12">
            <p class="text-xs uppercase font-semibold mb-3" style="letter-spacing: 0.15em; color: hsl(150, 5%, 45%);">Customisation</p>
            <h2 class="font-display text-3xl sm:text-4xl font-semibold text-sage-900">Your Brand, Our Craft</h2>
            <p class="mt-4 max-w-xl mx-auto leading-relaxed" style="color: hsl(150, 5%, 45%);">Your colours, your logo, your story — printed with precision on sustainable materials that reflect what your brand stands for.</p>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
```

Replace the entire section (from `<!-- Custom Design -->` through its closing `</section>`) with the complete HTML below:

```html
<!-- Custom Design -->
<section id="custom-design" class="py-16 md:py-24 bg-cream">
    <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12">
            <p class="text-xs uppercase font-semibold mb-3" style="letter-spacing: 0.15em; color: hsl(150, 5%, 45%);">Customisation</p>
            <h2 class="font-display text-3xl sm:text-4xl font-semibold text-sage-900">Your Brand, Our Craft</h2>
            <p class="mt-4 max-w-xl mx-auto leading-relaxed" style="color: hsl(150, 5%, 45%);">Your colours, your logo, your story — printed with precision on sustainable materials that reflect what your brand stands for.</p>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div class="custom-card text-center p-6 rounded-lg" style="border: 1px solid #d4ddd5;">
                <div class="custom-icon mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center" style="background: hsla(143,18%,42%,0.1); color: hsl(143, 18%, 42%);">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.1-.7-.4-1-.3-.3-.4-.7-.4-1.1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-5.5-4.5-9-10-9Z"/></svg>
                </div>
                <h3 class="font-display text-base font-semibold mb-2">Brand Consistency</h3>
                <p class="text-sm leading-relaxed" style="color: hsl(150, 5%, 45%);">Match your brand palette across custom cups, bags, and containers.</p>
            </div>
            <div class="custom-card text-center p-6 rounded-lg" style="border: 1px solid #d4ddd5;">
                <div class="custom-icon mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center" style="background: hsla(143,18%,42%,0.1); color: hsl(143, 18%, 42%);">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
                </div>
                <h3 class="font-display text-base font-semibold mb-2">Custom Printing</h3>
                <p class="text-sm leading-relaxed" style="color: hsl(150, 5%, 45%);">High-quality flexo and offset printing deliver sharp, consistent brand impact.</p>
            </div>
            <div class="custom-card text-center p-6 rounded-lg" style="border: 1px solid #d4ddd5;">
                <div class="custom-icon mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center" style="background: hsla(143,18%,42%,0.1); color: hsl(143, 18%, 42%);">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
                </div>
                <h3 class="font-display text-base font-semibold mb-2">Material Choice</h3>
                <p class="text-sm leading-relaxed" style="color: hsl(150, 5%, 45%);">Pick from traditional to eco-friendly materials, with PE or Aqueous coating.</p>
            </div>
            <div class="custom-card text-center p-6 rounded-lg" style="border: 1px solid #d4ddd5;">
                <div class="custom-icon mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center" style="background: hsla(143,18%,42%,0.1); color: hsl(143, 18%, 42%);">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
                </div>
                <h3 class="font-display text-base font-semibold mb-2">Low MOQ Runs</h3>
                <p class="text-sm leading-relaxed" style="color: hsl(150, 5%, 45%);">Short-run custom orders for growing businesses—minimums as low as 5,000 cups.</p>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "refactor: convert Custom Design section to Tailwind utilities"
```

---

### Task 9: Convert Why Us section (fix duplicate id)

**Files:**
- Modify: `index.html` (why us / about section)

- [ ] **Step 1: Replace the Why Us HTML — change `id="about"` to `id="why-us"`**

Replace:
```html
<!-- About -->
<section id="about" class="section">
  <div class="container">
    <div class="section-header">
      <p class="section-tag">Why Us</p>
      <h2 class="section-title">Built on Range, Reliability &amp; Real Partnership</h2>
    </div>
    <div class="about-grid">
```

With:
```html
<!-- Why Us -->
<section id="why-us" class="py-16 md:py-24 bg-cream">
    <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12">
            <p class="text-xs uppercase font-semibold mb-3" style="letter-spacing: 0.15em; color: hsl(150, 5%, 45%);">Why Us</p>
            <h2 class="font-display text-3xl sm:text-4xl font-semibold text-sage-900">Built on Range, Reliability &amp; Real Partnership</h2>
        </div>
        <div class="grid gap-8 md:grid-cols-3">
```

Replace the entire section (from `<!-- About -->` through its closing `</section>`) with the complete HTML below:

```html
<!-- Why Us -->
<section id="why-us" class="py-16 md:py-24 bg-cream">
    <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12">
            <p class="text-xs uppercase font-semibold mb-3" style="letter-spacing: 0.15em; color: hsl(150, 5%, 45%);">Why Us</p>
            <h2 class="font-display text-3xl sm:text-4xl font-semibold text-sage-900">Built on Range, Reliability &amp; Real Partnership</h2>
        </div>
        <div class="grid gap-8 md:grid-cols-3">
            <div class="text-center p-8">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-100 mb-6">
                    <svg class="w-5 h-5" style="color: hsl(143, 18%, 42%);" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><path d="M116,176a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h28A8,8,0,0,1,116,176Zm60-8H148a8,8,0,0,0,0,16h28a8,8,0,0,0,0-16Zm64,48a8,8,0,0,1-8,8H24a8,8,0,0,1,0-16h8V88a8,8,0,0,1,12.8-6.4L96,120V88a8,8,0,0,1,12.8-6.4l38.74,29.05L159.1,29.74A16.08,16.08,0,0,1,174.94,16h18.12A16.08,16.08,0,0,1,208.9,29.74l15,105.13s.08.78.08,1.13v72h8A8,8,0,0,1,240,216Zm-77.86-94.4,8.53,6.4h36.11L193.06,32H174.94ZM48,208H208V144H168a8,8,0,0,1-4.8-1.6l-14.4-10.8,0,0L112,104v32a8,8,0,0,1-12.8,6.4L48,104Z"/></svg>
                </div>
                <h3 class="font-display text-lg font-semibold mb-3">Sourced &amp; Vetted</h3>
                <p class="text-sm leading-relaxed" style="color: hsl(150, 5%, 45%);">Direct factory relationships mean consistent quality, honest pricing, and no middleman markups.</p>
            </div>
            <div class="text-center p-8">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-100 mb-6">
                    <svg class="w-5 h-5" style="color: hsl(143, 18%, 42%);" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z"/></svg>
                </div>
                <h3 class="font-display text-lg font-semibold mb-3">Stock When You Need It</h3>
                <p class="text-sm leading-relaxed" style="color: hsl(150, 5%, 45%);">We hold inventory so you don't have to. Fast fulfilment, no minimum order surprises.</p>
            </div>
            <div class="text-center p-8">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-100 mb-6">
                    <svg class="w-5 h-5" style="color: hsl(143, 18%, 42%);" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128ZM128,72h88a8,8,0,0,0,0-16H128a8,8,0,0,0,0,16Zm88,112H128a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16ZM82.34,42.34,56,68.69,45.66,58.34A8,8,0,0,0,34.34,69.66l16,16a8,8,0,0,0,11.32,0l32-32A8,8,0,0,0,82.34,42.34Zm0,64L56,132.69,45.66,122.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm0,64L56,196.69,45.66,186.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Z"/></svg>
                </div>
                <h3 class="font-display text-lg font-semibold mb-3">Your Call, Our Range</h3>
                <p class="text-sm leading-relaxed" style="color: hsl(150, 5%, 45%);">From cost-effective resin to premium eco options — we supply what fits your business, not what's trending.</p>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "refactor: convert Why Us section to Tailwind, fix duplicate id='about'"
```

---

### Task 10: Convert Contact section

**Files:**
- Modify: `index.html` (contact section)

- [ ] **Step 1: Replace the Contact HTML**

Replace:
```html
<!-- Contact -->
<section id="contact" class="section contact">
  <div class="container">
    <h2 class="section-title">Let's Work Together</h2>
    <p>Whether you need bulk orders, low volumes, or custom packaging solutions, our team is ready to help. Contact us for competitive pricing and fast delivery.</p>
    <div class="contact-btns">
      <a href="products.html#quote" class="btn btn-hero">Request a Quote &rarr;</a>
      <a href="mailto:info@nexopack.io" class="btn btn-outline-white">Email Us</a>
    </div>
    <div class="contact-info">
      <a href="mailto:info@nexopack.io">
        <svg class="icon-sm" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        info@nexopack.io
      </a>
      <a href="tel:+15551234567">
        <svg class="icon-sm" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        +1 (555) 123-4567
      </a>
    </div>
  </div>
</section>
```

With:
```html
<!-- Contact -->
<section id="contact" class="py-16 md:py-24 bg-sage-100 text-center">
    <div class="max-w-6xl mx-auto px-6">
        <h2 class="font-display text-3xl sm:text-4xl font-semibold text-sage-900 mb-4">Let's Work Together</h2>
        <p class="max-w-lg mx-auto mb-10 leading-relaxed" style="color: hsl(150, 5%, 45%);">Whether you need bulk orders, low volumes, or custom packaging solutions, our team is ready to help. Contact us for competitive pricing and fast delivery.</p>
        <div class="flex flex-wrap justify-center gap-4 mb-12">
            <a href="products.html#quote" class="inline-flex items-center gap-1.5 bg-sage-700 hover:bg-sage-900 text-cream font-medium px-8 py-3 rounded-full text-sm transition-colors">Request a Quote &rarr;</a>
            <a href="mailto:info@nexopack.io" class="inline-flex items-center gap-1.5 text-white font-medium px-8 py-3 rounded-full text-sm transition-all hover:bg-white/10" style="border: 1.5px solid rgba(255,255,255,0.7);">Email Us</a>
        </div>
        <div class="flex flex-wrap justify-center gap-8 text-sm" style="color: hsl(150, 5%, 45%);">
            <a href="mailto:info@nexopack.io" class="flex items-center gap-2 transition-colors hover:text-sage-900">
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                info@nexopack.io
            </a>
            <a href="tel:+15551234567" class="flex items-center gap-2 transition-colors hover:text-sage-900">
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +1 (555) 123-4567
            </a>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "refactor: convert Contact section to Tailwind utilities"
```

---

### Task 11: Convert Footer and remove inline script

**Files:**
- Modify: `index.html` (footer section + remove `<script>` block)

- [ ] **Step 1: Replace the Footer HTML and remove the inline `<script>` block**

Replace everything from `<!-- Footer -->` through the closing `</html>` tag (this includes the footer, the inline `<script>` block with product data and `showTab` function, and the closing `</body></html>` tags) with:

With:
```html
<!-- Footer -->
<footer class="py-16" style="background: hsl(143,20%,28%); color: hsl(60,20%,97%);">
    <div class="max-w-6xl mx-auto px-6">
        <div class="grid gap-12 md:grid-cols-3">
            <div>
                <div class="flex items-center gap-2 font-display text-lg font-semibold mb-4">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 17 3.5s1.5 2 1.5 6.5c0 4-3.5 7-7.5 10Z"/><path d="M11.5 10c-2 1.5-3 3.2-3 5.5a7 7 0 0 0 .3 2"/></svg>
                    Nexopack
                </div>
                <p class="text-sm leading-relaxed" style="opacity: 0.8;">Your trusted partner in food &amp; beverage packaging. Premium quality, competitive pricing, and a range that fits every business need.</p>
            </div>
            <div>
                <h4 class="text-xs font-semibold uppercase mb-4" style="letter-spacing: 0.1em; opacity: 0.7;">Contact</h4>
                <ul class="list-none text-sm space-y-2" style="opacity: 0.8;">
                    <li>info@nexopack.io</li>
                    <li>+1 (555) 123-4567</li>
                    <li>Mon &ndash; Sun, 9am &ndash; 6pm</li>
                </ul>
            </div>
        </div>
        <div class="mt-16 pt-8 text-center text-xs" style="border-top: 1px solid hsla(60,20%,97%,0.2); opacity: 0.6;">&copy; 2026 Nexopack. All rights reserved.</div>
    </div>
</footer>

</body>
</html>
```

This removes the entire inline `<script>` block (product data array, `showTab` function, tab init code) — all of that is now in `js/home.js` which is loaded via `<script defer>` in the `<head>`.

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "refactor: convert Footer to Tailwind, remove inline script"
```

---

### Task 12: Final verification

**Files:**
- Verify: `index.html`, `products.html`, `css/home.css`, `js/home.js`

- [ ] **Step 1: Open both pages in a browser and verify at 375px, 768px, 1280px**

Check:
- Navbar: fixed, blur backdrop, correct links, filled CTA button
- Hero: background image visible, gradient overlay, buttons work
- About Us: white background, stats row with dividers, glassmorphism button
- Products: tabs switch correctly, product grid renders, cards have hover effect
- Custom Design: 4-column grid on desktop, icon hover color inversion
- Why Us: 3-column grid, icon cards
- Contact: two buttons, contact links
- Footer: dark green background, grid layout, copyright
- Anchor links scroll smoothly
- `#about` navigates to About Us (not Why Us)
- `products.html` still works correctly

- [ ] **Step 2: Commit all remaining changes (if any)**

```bash
git add -A
git commit -m "chore: final cleanup after Tailwind standardization"
```
