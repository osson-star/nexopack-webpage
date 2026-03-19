# Nexopack Webpage — Project Setup

## Tech Stack

- **Vite 8** — dev server and build tool
- **Tailwind CSS v4** — utility-first CSS, compiled at build time via `@tailwindcss/vite` plugin
- **Vanilla HTML / CSS / JS** — no framework

## Prerequisites

- Node.js v24+
- npm

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (hot reload at http://localhost:5173)
npm run dev

# Production build (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
├── index.html              # Home page
├── products.html           # Products page
├── css/
│   ├── main.css            # Tailwind entry point — shared theme config
│   ├── home.css            # Styles specific to home page
│   └── styles.css          # Styles specific to products page
├── js/
│   ├── home.js             # JavaScript for home page
│   └── script.js           # JavaScript for products page
├── images/                 # Image assets
├── Icons/                  # Icon assets
├── vite.config.js          # Vite config (Tailwind plugin + multi-page build)
├── package.json            # Dependencies and npm scripts
├── dist/                   # Production build output (gitignored)
└── node_modules/           # Dependencies (gitignored)
```

## How the CSS Works

Both HTML pages link to a single stylesheet: `/css/main.css`.

`main.css` does three things in order:

1. **Imports Tailwind CSS** — provides all utility classes
2. **Defines the shared theme** via `@theme` — colors (sage, cream, muted, primary, divider), fonts (DM Sans, Playfair Display), and letter-spacing tokens
3. **Imports page-specific stylesheets** — `home.css` and `styles.css` for custom styles that extend or override Tailwind utilities

The `@theme` directive is Tailwind CSS v4's way of defining design tokens. These tokens generate utility classes automatically (e.g., `--color-sage-500` becomes `bg-sage-500`, `text-sage-500`, etc.).

## Fonts

Google Fonts are loaded via `<link>` tags in each HTML file:

- **DM Sans** (300, 400, 500, 600) — body text
- **Playfair Display** (400, 500, 600, 700) — headings
