# Vite + Tailwind CSS Build Tool Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Tailwind CDN with a Vite + Tailwind CSS v4 build pipeline so that both pages use a single shared theme config and produce optimized, purged CSS for production.

**Architecture:** Vite serves as the dev server and build tool. Tailwind CSS v4 is integrated via the `@tailwindcss/vite` plugin. The shared theme (colors, fonts, letter-spacing) is defined once in `css/main.css` using the `@theme` directive. Both HTML pages link to this single CSS entry point.

**Tech Stack:** Vite 6, Tailwind CSS v4, `@tailwindcss/vite` plugin, Node.js v24

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | Create | Dependencies (vite, tailwindcss, @tailwindcss/vite) and scripts (dev, build, preview) |
| `vite.config.js` | Create | Multi-page Vite config with Tailwind plugin |
| `.gitignore` | Create | Exclude node_modules and dist from git |
| `css/main.css` | Create | Tailwind entry point with `@theme` config, imports home.css and styles.css |
| `index.html` | Modify (lines 13–45) | Remove CDN script + inline config + home.css link, add main.css link |
| `products.html` | Modify (lines 12–44) | Remove CDN script + inline config + styles.css link, add main.css link |

Files NOT modified: `css/home.css`, `css/styles.css`, `js/home.js`, `js/script.js`, `images/`, `Icons/`

---

### Task 1: Create .gitignore

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Create .gitignore**

```
node_modules
dist
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: add .gitignore for node_modules and dist"
```

---

### Task 2: Initialize package.json and install dependencies

**Files:**
- Create: `package.json`

- [ ] **Step 1: Initialize package.json**

```bash
npm init -y
```

This creates a basic `package.json`. The exact contents don't matter — we'll update the scripts in a later step.

- [ ] **Step 2: Install Vite, Tailwind CSS v4, and the Vite plugin**

```bash
npm install -D vite tailwindcss @tailwindcss/vite
```

Expected: `node_modules` created, `package.json` updated with devDependencies, `package-lock.json` created.

- [ ] **Step 3: Update package.json scripts**

Replace the `"scripts"` section in `package.json` with:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

- [ ] **Step 4: Verify installation**

```bash
npx vite --version
```

Expected: Prints the Vite version number (e.g., `vite/6.x.x`).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: initialize project with Vite and Tailwind CSS v4"
```

Note: `node_modules` should NOT be committed (excluded by `.gitignore` from Task 1).

---

### Task 3: Create Vite config

**Files:**
- Create: `vite.config.js`

- [ ] **Step 1: Create vite.config.js**

```javascript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        products: 'products.html'
      }
    }
  }
})
```

- [ ] **Step 2: Commit**

```bash
git add vite.config.js
git commit -m "chore: add Vite config for multi-page build with Tailwind"
```

---

### Task 4: Create css/main.css with @theme config

**Files:**
- Create: `css/main.css`

- [ ] **Step 1: Create css/main.css**

This is the single Tailwind entry point. The `@theme` directive defines the shared design tokens. The `@import` statements for `home.css` and `styles.css` come after `@import "tailwindcss"` so that custom CSS can override Tailwind utilities when needed.

```css
@import "tailwindcss";

@theme {
  --font-sans: 'DM Sans', sans-serif;
  --font-display: 'Playfair Display', serif;

  --color-sage-100: #DFE8E1;
  --color-sage-300: #98B69E;
  --color-sage-500: #6B8F78;
  --color-sage-700: #4A6B58;
  --color-sage-800: #395644;
  --color-sage-900: #243D2F;
  --color-cream: #F7F6F0;
  --color-cream-dark: #ECEAE3;
  --color-muted: #6D7873;
  --color-primary: #587E67;
  --color-divider: #d4ddd5;

  --tracking-spaced: 0.15em;
  --tracking-widest2: 0.25em;
}

@import "./home.css";
@import "./styles.css";
```

- [ ] **Step 2: Commit**

```bash
git add css/main.css
git commit -m "feat: add Tailwind CSS entry point with shared @theme config"
```

---

### Task 5: Update index.html — remove CDN, add main.css

**Files:**
- Modify: `index.html` (lines 13–45)

- [ ] **Step 1: Remove the CDN script, inline config, and home.css link**

In `index.html`, find and remove these lines (lines 13–45):

```html
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
                            800: '#395644',
                            900: '#243D2F'
                        },
                        cream: { DEFAULT: '#F7F6F0', dark: '#ECEAE3' },
                        muted: '#6D7873',
                        primary: '#587E67',
                        divider: '#d4ddd5'
                    },
                    letterSpacing: {
                        spaced: '0.15em',
                        widest2: '0.25em'
                    }
                }
            }
        }
    </script>

    <link rel="stylesheet" href="css/home.css">
```

Replace with:

```html
    <link rel="stylesheet" href="/css/main.css">
```

- [ ] **Step 2: Verify the head section looks correct**

The `<head>` of `index.html` should now be:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexopack — Sustainable Packaging Solutions</title>
    <meta name="description" content="...">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="/css/main.css">
    <script src="js/home.js" defer></script>
</head>
```

Google Fonts links and the JS script tag remain unchanged.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "refactor: replace Tailwind CDN with main.css in index.html"
```

---

### Task 6: Update products.html — remove CDN, add main.css

**Files:**
- Modify: `products.html` (lines 12–44)

- [ ] **Step 1: Remove the CDN script, inline config, and styles.css link**

In `products.html`, find and remove these lines (lines 12–44):

```html
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
                            800: '#395644',
                            900: '#243D2F'
                        },
                        cream: { DEFAULT: '#F7F6F0', dark: '#ECEAE3' },
                        muted: '#6D7873',
                        primary: '#587E67',
                        divider: '#d4ddd5'
                    },
                    letterSpacing: {
                        spaced: '0.15em',
                        widest2: '0.25em'
                    }
                }
            }
        }
    </script>

    <link rel="stylesheet" href="css/styles.css">
```

Replace with:

```html
    <link rel="stylesheet" href="/css/main.css">
```

- [ ] **Step 2: Verify the head section looks correct**

The `<head>` of `products.html` should now be:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexopack — Insulated Paper Cups</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="/css/main.css">
    <script src="js/script.js" defer></script>
</head>
```

- [ ] **Step 3: Commit**

```bash
git add products.html
git commit -m "refactor: replace Tailwind CDN with main.css in products.html"
```

---

### Task 7: Verify dev server works

**Files:** None (verification only)

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Expected: Vite starts and prints a local URL (e.g., `http://localhost:5173`).

- [ ] **Step 2: Check index.html in browser at three viewports**

Open `http://localhost:5173/` in a browser. Test at 375px (mobile), 768px (tablet), and 1280px (desktop) using browser DevTools responsive mode. Verify at each viewport:
- Page renders with correct colors (sage green, cream backgrounds)
- Fonts load (DM Sans for body, Playfair Display for headings)
- Navbar is fixed with blur backdrop
- Hero section has background image and gradient overlay
- Tab switching works in Products section
- All hover states work (product cards, custom design cards, buttons)
- Smooth scrolling works when clicking nav links
- Layout is responsive (grids collapse on mobile, expand on desktop)

- [ ] **Step 3: Check products.html in browser at three viewports**

Open `http://localhost:5173/products.html`. Test at 375px, 768px, and 1280px. Verify:
- Page renders correctly with same color palette
- All interactive features work
- Layout is responsive at all three viewports

- [ ] **Step 4: Stop the dev server**

Press `Ctrl+C` in the terminal.

---

### Task 8: Verify production build

**Files:** None (verification only)

- [ ] **Step 1: Run the production build**

```bash
npm run build
```

Expected: Vite outputs files to `dist/` directory. No errors.

- [ ] **Step 2: Check the dist directory**

```bash
ls dist/
```

Expected: Contains `index.html`, `products.html`, and `assets/` directory with CSS and copied static files.

- [ ] **Step 3: Check CSS file size**

```bash
ls -lh dist/assets/*.css
```

Expected: The CSS file should be significantly smaller than the CDN's ~300KB (typically 5–15KB for a small site).

- [ ] **Step 4: Preview the production build**

```bash
npm run preview
```

Open the preview URL in a browser. Verify both pages render identically to the dev server.

- [ ] **Step 5: Stop the preview server and commit**

Press `Ctrl+C`. No files to commit (dist is gitignored), but confirm everything works.

```bash
git status
```

Expected: Clean working tree (dist/ is excluded by .gitignore).
