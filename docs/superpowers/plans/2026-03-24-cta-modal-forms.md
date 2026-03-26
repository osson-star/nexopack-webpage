# CTA Modal Forms Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two modal forms ("Email Us" and "Request a Quote") to the Nexopack website, wired to Vercel serverless functions that send email via Resend and notifications via Telegram Bot.

**Architecture:** Shared modal JS (`js/modals.js`) handles open/close/pill UI on both pages. Two Vercel serverless functions (`api/contact.js`, `api/quote.js`) handle validation, email delivery via Resend, Excel generation via ExcelJS, and Telegram notifications. Modal HTML is duplicated in `index.html` and `paper-material.html` (no templating engine available).

**Tech Stack:** Vanilla JS, Tailwind CSS v4, Vercel Serverless (Node.js CommonJS), Resend, ExcelJS, Telegram Bot API, Jest

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `vercel.json` | Create | Vercel deployment config |
| `.env.local` | Create | Local env vars (gitignored) |
| `css/styles.css` | Modify | Add modal animation CSS |
| `js/modals.js` | Create | Shared modal open/close/pill/submit logic |
| `index.html` | Modify | Add modal HTML, convert buttons to triggers |
| `paper-material.html` | Modify | Remove old form, add modal HTML, convert buttons |
| `js/script.js` | Modify | Remove old form validation, update `selectCupType` to open modal |
| `api/contact.js` | Create | Serverless handler: email + Telegram for contact form |
| `api/quote.js` | Create | Serverless handler: Excel + email + Telegram for quote form |
| `api/__tests__/contact.test.js` | Create | Jest tests for contact handler |
| `api/__tests__/quote.test.js` | Create | Jest tests for quote handler |

---

## Task 1: Project Setup

**Files:**
- Create: `vercel.json`
- Create: `.env.local`
- Modify: `package.json`

- [ ] **Step 1: Install production dependencies**

```bash
cd "/Users/ossonlau/Desktop/Project - Nexopack Webpage"
npm install resend exceljs form-data
```

Expected: `resend` and `exceljs` appear in `package.json` under `"dependencies"`.

- [ ] **Step 2: Install Jest as a dev dependency**

```bash
npm install --save-dev jest
```

- [ ] **Step 3: Add Jest test script to package.json**

In `package.json`, add `"test": "jest"` to the `"scripts"` block:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "jest"
}
```

- [ ] **Step 4: Create vercel.json**

```json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "framework": null
}
```

- [ ] **Step 5: Create .env.local (template — fill in real values before testing)**

```
RESEND_API_KEY=re_your_key_here
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

> `.env.local` is already gitignored by default in most setups. Verify it is in `.gitignore` — if not, add it.

- [ ] **Step 6: Commit**

```bash
git add vercel.json package.json package-lock.json
git commit -m "chore: add vercel config and install resend, exceljs, jest"
```

---

## Task 2: Modal CSS

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add modal animation keyframes and classes to the bottom of `css/styles.css`**

```css
/* ===== Modals ===== */
@keyframes modal-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes modal-slide-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.modal-overlay {
  animation: modal-fade-in 0.2s ease;
}

.modal-container {
  animation: modal-slide-up 0.25s ease;
}

.pill {
  cursor: pointer;
  border: 1px solid #d4ddd5;
  border-radius: 9999px;
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
  background: #F7F6F0;
  color: #243D2F;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  user-select: none;
}

.pill:hover {
  border-color: #4A6B58;
  background: #DFE8E1;
}

.pill-active {
  background: #4A6B58;
  border-color: #4A6B58;
  color: #F7F6F0;
}

.pill-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
```

- [ ] **Step 2: Commit**

```bash
git add css/styles.css
git commit -m "feat: add modal and pill selector CSS"
```

---

## Task 3: Shared Modal JS

**Files:**
- Create: `js/modals.js`

- [ ] **Step 1: Create `js/modals.js` with open/close/pill/submit logic**

```javascript
// js/modals.js — Shared modal logic for Email Us and Request a Quote

function openModal(modalId) {
  var modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// ESC closes any open modal
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(function(m) {
      closeModal(m.id);
    });
  }
});

// Clicking the backdrop closes the modal
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal(e.target.id);
  }
});

// Pill selector: clicking a pill selects it and writes to hidden input
function initPillSelectors() {
  document.querySelectorAll('.pill-group').forEach(function(group) {
    group.querySelectorAll('.pill').forEach(function(pill) {
      pill.addEventListener('click', function() {
        group.querySelectorAll('.pill').forEach(function(p) {
          p.classList.remove('pill-active');
        });
        pill.classList.add('pill-active');
        var hiddenInput = document.getElementById(group.dataset.target);
        if (hiddenInput) hiddenInput.value = pill.dataset.value;
      });
    });
  });
}

// Validate basic email format
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Show inline error on a field
function showFieldError(fieldId, message) {
  var el = document.getElementById(fieldId + '-error');
  if (el) { el.textContent = message; el.classList.remove('hidden'); }
}

// Hide inline error on a field
function clearFieldError(fieldId) {
  var el = document.getElementById(fieldId + '-error');
  if (el) el.classList.add('hidden');
}

// Handle contact form submit
function handleContactSubmit(e) {
  e.preventDefault();
  var form = document.getElementById('contact-form');
  var name    = document.getElementById('contact-name').value.trim();
  var company = document.getElementById('contact-company').value.trim();
  var email   = document.getElementById('contact-email').value.trim();
  var message = document.getElementById('contact-message').value.trim();

  var valid = true;
  ['contact-name','contact-company','contact-email','contact-message'].forEach(clearFieldError);

  if (!name)             { showFieldError('contact-name',    'Please enter your name.');         valid = false; }
  if (!company)          { showFieldError('contact-company', 'Please enter your company name.'); valid = false; }
  if (!isValidEmail(email)) { showFieldError('contact-email', 'Please enter a valid email.');    valid = false; }
  if (!message)          { showFieldError('contact-message', 'Please enter a message.');         valid = false; }
  if (!valid) return;

  var btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, company: company, email: email, message: message })
  })
  .then(function(res) { return res.json().then(function(data) { return { ok: res.ok, data: data }; }); })
  .then(function(result) {
    if (result.ok) {
      document.getElementById('contact-form-body').classList.add('hidden');
      document.getElementById('contact-success').classList.remove('hidden');
    } else {
      showContactError();
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  })
  .catch(function() {
    showContactError();
    btn.disabled = false;
    btn.textContent = 'Send Message';
  });
}

function showContactError() {
  var el = document.getElementById('contact-form-error');
  if (el) el.classList.remove('hidden');
}

// Handle quote form submit
function handleQuoteSubmit(e) {
  e.preventDefault();
  var form = document.getElementById('quote-modal-form');

  var productCategory  = document.getElementById('q-product-category').value;
  var material         = document.getElementById('q-material').value;
  var quantity         = document.getElementById('q-quantity').value;
  var deliveryLocation = document.getElementById('q-delivery').value;
  var customPrinting   = document.getElementById('q-custom-printing').value;
  var name             = document.getElementById('q-name').value.trim();
  var company          = document.getElementById('q-company').value.trim();
  var email            = document.getElementById('q-email').value.trim();

  var valid = true;
  ['q-product-category','q-material','q-quantity','q-delivery','q-custom-printing','q-name','q-company','q-email'].forEach(clearFieldError);

  if (!productCategory)      { showFieldError('q-product-category',  'Please select a product category.'); valid = false; }
  if (!material)             { showFieldError('q-material',          'Please select a material.');          valid = false; }
  if (!quantity)             { showFieldError('q-quantity',          'Please select a quantity range.');     valid = false; }
  if (!deliveryLocation)     { showFieldError('q-delivery',          'Please select a delivery location.');  valid = false; }
  if (!customPrinting)       { showFieldError('q-custom-printing',   'Please select a printing option.');    valid = false; }
  if (!name)                 { showFieldError('q-name',              'Please enter your name.');             valid = false; }
  if (!company)              { showFieldError('q-company',           'Please enter your company name.');     valid = false; }
  if (!isValidEmail(email))  { showFieldError('q-email',            'Please enter a valid email.');         valid = false; }
  if (!valid) return;

  var btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  fetch('/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productCategory: productCategory,
      material: material,
      quantity: quantity,
      deliveryLocation: deliveryLocation,
      customPrinting: customPrinting,
      name: name,
      company: company,
      email: email
    })
  })
  .then(function(res) { return res.json().then(function(data) { return { ok: res.ok, data: data }; }); })
  .then(function(result) {
    if (result.ok) {
      document.getElementById('quote-form-body').classList.add('hidden');
      document.getElementById('quote-success').classList.remove('hidden');
    } else {
      showQuoteError();
      btn.disabled = false;
      btn.textContent = 'Submit Request';
    }
  })
  .catch(function() {
    showQuoteError();
    btn.disabled = false;
    btn.textContent = 'Submit Request';
  });
}

function showQuoteError() {
  var el = document.getElementById('quote-form-error');
  if (el) el.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
  initPillSelectors();

  var contactForm = document.getElementById('contact-form');
  if (contactForm) contactForm.addEventListener('submit', handleContactSubmit);

  var quoteForm = document.getElementById('quote-modal-form');
  if (quoteForm) quoteForm.addEventListener('submit', handleQuoteSubmit);
});
```

- [ ] **Step 2: Commit**

```bash
git add js/modals.js
git commit -m "feat: add shared modal JS (open/close/pill/submit)"
```

---

## Task 4: Add Modal HTML to index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Convert the CTA buttons in index.html to modal triggers**

Find the two CTA buttons in the `#contact` section. Replace them with:

```html
<button onclick="openModal('modal-email')" class="inline-flex items-center gap-1.5 text-black/70 hover:text-black font-medium px-8 py-3 rounded-full text-sm transition-colors border border-black/20 hover:border-black/40">Email Us</button>
<button onclick="openModal('modal-quote')" class="inline-flex items-center gap-1.5 bg-sage-700 hover:bg-sage-900 text-cream font-medium px-8 py-3 rounded-full text-sm transition-colors shadow-lg">Request a Quote &rarr;</button>
```

- [ ] **Step 2: Add the `<script>` tag for modals.js to index.html**

Just before `</body>`, add:

```html
<script src="js/modals.js" defer></script>
```

- [ ] **Step 3: Add both modal HTML blocks just before `</body>` in index.html (after the script tag)**

```html
<!-- ===== Email Us Modal ===== -->
<div id="modal-email" class="modal-overlay hidden fixed inset-0 z-50 flex items-center justify-center p-4" style="background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);">
  <div class="modal-container bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
    <button onclick="closeModal('modal-email')" class="absolute top-4 right-4 text-black/40 hover:text-black text-xl leading-none">&times;</button>
    <div id="contact-form-body">
      <h3 class="font-display text-2xl font-bold text-black mb-1">Email Us</h3>
      <p class="text-sm text-black/50 mb-6">We'll get back to you within one business day.</p>
      <form id="contact-form" novalidate class="space-y-4">
        <div>
          <input id="contact-name" type="text" placeholder="Your Name" class="w-full border border-black/15 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 bg-cream" />
          <p id="contact-name-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>
        <div>
          <input id="contact-company" type="text" placeholder="Company Name" class="w-full border border-black/15 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 bg-cream" />
          <p id="contact-company-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>
        <div>
          <input id="contact-email" type="email" placeholder="Email Address" class="w-full border border-black/15 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 bg-cream" />
          <p id="contact-email-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>
        <div>
          <textarea id="contact-message" rows="4" placeholder="Your message…" class="w-full border border-black/15 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 bg-cream resize-none"></textarea>
          <p id="contact-message-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>
        <p id="contact-form-error" class="text-sm text-red-500 hidden">Something went wrong — please try again or email us directly at info@nexopack.io</p>
        <button type="submit" class="w-full bg-sage-700 hover:bg-sage-900 text-cream font-medium py-3 rounded-full text-sm transition-colors">Send Message</button>
      </form>
    </div>
    <div id="contact-success" class="hidden text-center py-8">
      <p class="text-3xl mb-4">✉️</p>
      <p class="font-display text-lg font-bold text-black mb-2">Message sent!</p>
      <p class="text-sm text-black/60">Thanks for reaching out! We'll get back to you shortly.</p>
    </div>
  </div>
</div>

<!-- ===== Request a Quote Modal ===== -->
<div id="modal-quote" class="modal-overlay hidden fixed inset-0 z-50 flex items-center justify-center p-4" style="background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);">
  <div class="modal-container bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative overflow-y-auto" style="max-height: 90vh;">
    <button onclick="closeModal('modal-quote')" class="absolute top-4 right-4 text-black/40 hover:text-black text-xl leading-none">&times;</button>
    <div id="quote-form-body">
      <h3 class="font-display text-2xl font-bold text-black mb-1">Request a Quote</h3>
      <p class="text-sm text-black/50 mb-6">Tell us what you need and we'll prepare a quotation.</p>
      <form id="quote-modal-form" novalidate class="space-y-6">

        <div>
          <p class="text-sm font-medium text-black mb-2">Product Category</p>
          <div class="pill-group" data-target="q-product-category">
            <button type="button" class="pill" data-value="Cups">Cups</button>
            <button type="button" class="pill" data-value="Containers">Containers</button>
            <button type="button" class="pill" data-value="Bags">Bags</button>
            <button type="button" class="pill" data-value="Lids">Lids</button>
            <button type="button" class="pill" data-value="Other">Other</button>
          </div>
          <input type="hidden" id="q-product-category" />
          <p id="q-product-category-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>

        <div>
          <p class="text-sm font-medium text-black mb-2">Material</p>
          <div class="pill-group" data-target="q-material">
            <button type="button" class="pill" data-value="Paper">Paper</button>
            <button type="button" class="pill" data-value="Plastic">Plastic</button>
            <button type="button" class="pill" data-value="Bamboo">Bamboo</button>
            <button type="button" class="pill" data-value="Pulp">Pulp</button>
            <button type="button" class="pill" data-value="No Preference">No Preference</button>
          </div>
          <input type="hidden" id="q-material" />
          <p id="q-material-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>

        <div>
          <p class="text-sm font-medium text-black mb-2">Estimated Quantity</p>
          <div class="pill-group" data-target="q-quantity">
            <button type="button" class="pill" data-value="&lt;1,000">&lt;1,000</button>
            <button type="button" class="pill" data-value="1,000–5,000">1,000–5,000</button>
            <button type="button" class="pill" data-value="5,000–10,000">5,000–10,000</button>
            <button type="button" class="pill" data-value="10,000+">10,000+</button>
          </div>
          <input type="hidden" id="q-quantity" />
          <p id="q-quantity-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>

        <div>
          <p class="text-sm font-medium text-black mb-2">Delivery Location</p>
          <div class="pill-group" data-target="q-delivery">
            <button type="button" class="pill" data-value="Local (Hong Kong)">Local (Hong Kong)</button>
            <button type="button" class="pill" data-value="Overseas">Overseas</button>
          </div>
          <input type="hidden" id="q-delivery" />
          <p id="q-delivery-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>

        <div>
          <p class="text-sm font-medium text-black mb-2">Custom Printing?</p>
          <div class="pill-group" data-target="q-custom-printing">
            <button type="button" class="pill" data-value="Yes">Yes</button>
            <button type="button" class="pill" data-value="No">No</button>
            <button type="button" class="pill" data-value="Not Sure">Not Sure</button>
          </div>
          <input type="hidden" id="q-custom-printing" />
          <p id="q-custom-printing-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>

        <hr class="border-black/10" />
        <p class="text-sm font-medium text-black">Your Contact Details</p>

        <div>
          <input id="q-name" type="text" placeholder="Your Name" class="w-full border border-black/15 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 bg-cream" />
          <p id="q-name-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>
        <div>
          <input id="q-company" type="text" placeholder="Company Name" class="w-full border border-black/15 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 bg-cream" />
          <p id="q-company-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>
        <div>
          <input id="q-email" type="email" placeholder="Email Address" class="w-full border border-black/15 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 bg-cream" />
          <p id="q-email-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>

        <p id="quote-form-error" class="text-sm text-red-500 hidden">Something went wrong — please try again or email us directly at info@nexopack.io</p>
        <button type="submit" class="w-full bg-sage-700 hover:bg-sage-900 text-cream font-medium py-3 rounded-full text-sm transition-colors">Submit Request</button>
      </form>
    </div>
    <div id="quote-success" class="hidden text-center py-8">
      <p class="text-3xl mb-4">📋</p>
      <p class="font-display text-lg font-bold text-black mb-2">Request received!</p>
      <p class="text-sm text-black/60">Your quote request has been received. We'll prepare a quotation and be in touch soon.</p>
    </div>
  </div>
</div>
```

- [ ] **Step 4: Open `vite dev` and visually confirm both modals open, close, and that pills can be selected**

```bash
npm run dev
```

Open `http://localhost:5173`. Click "Email Us" — modal should open. Click X, backdrop, or press ESC — should close. Click "Request a Quote" — pill selector modal should open. Select pills and confirm they highlight.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add Email Us and Request a Quote modals to index.html"
```

---

## Task 5: Convert paper-material.html

**Files:**
- Modify: `paper-material.html`
- Modify: `js/script.js`

- [ ] **Step 1: Remove the old `#quote` form section from paper-material.html**

Find and delete the entire `<section id="quote" ...>` block (it contains the old `quoteForm`). Search for `<section id="quote"` to locate it — delete from that opening tag through to its closing `</section>` tag.

- [ ] **Step 2: Add "Request a Quote" CTA button in place of the old form section**

In the gap left by the removed section (just before the footer), add:

```html
<!-- ===== Request a Quote CTA ===== -->
<section class="py-24 bg-sage-900">
    <div class="max-w-2xl mx-auto px-6 text-center">
        <h2 class="font-display text-3xl sm:text-4xl font-semibold text-cream mb-4">Ready to Order?</h2>
        <p class="text-sage-300 text-base leading-relaxed mb-8">Tell us about your needs and we'll prepare a quotation within one business day.</p>
        <button onclick="openModal('modal-quote')" class="inline-flex items-center justify-center bg-cream text-sage-900 font-medium px-8 py-3.5 rounded-full text-sm transition-all hover:opacity-90 shadow-lg">
            Request a Quote &rarr;
        </button>
    </div>
</section>
```

- [ ] **Step 3: Also convert the two existing "Request a Quote" `<a href="#quote">` buttons in paper-material.html to modal triggers**

Find these two anchor tags (in the navbar and hero section):
```html
<a href="#quote" class="bg-sage-700 ...">Request a Quote</a>
<a href="#quote" class="inline-flex ...">Request a Quote &rarr;</a>
```
Change each `<a href="#quote"` to `<button onclick="openModal('modal-quote')"` and close with `</button>`. Keep the same classes.

- [ ] **Step 4: Add modals.js script tag to paper-material.html**

Just before `</body>`:
```html
<script src="js/modals.js" defer></script>
```

- [ ] **Step 5: Add both modal HTML blocks to paper-material.html**

Copy the exact same two modal blocks from `index.html` (the `modal-email` and `modal-quote` divs) and paste them just before `</body>` in `paper-material.html`.

- [ ] **Step 6: Remove dead form validation code from js/script.js**

Delete the following by searching for them by name:
- `function showError(fieldId, show)` — search for `function showError`
- `function validateQuoteForm()` — search for `function validateQuoteForm`
- The `document.addEventListener('DOMContentLoaded', ...)` block that references `quoteForm` — search for `quoteForm` to find it

- [ ] **Step 7: Update `selectCupType` in js/script.js to open the quote modal instead of scrolling to `#quote`**

Find the last few lines of `selectCupType` that scroll to the old form:
```javascript
const select = document.getElementById('cupType');
if (select) {
    select.value = type;
    document.getElementById('cupTypeError').classList.add('hidden');
}
document.getElementById('quote').scrollIntoView({ behavior: 'smooth' });
```
Replace with:
```javascript
openModal('modal-quote');
```

- [ ] **Step 8: Verify paper-material.html locally**

With `npm run dev` still running, open `http://localhost:5173/paper-material.html`. Confirm:
- No old quote form visible
- New CTA section appears before the footer
- All "Request a Quote" buttons open the modal
- Spec panels still work (click a product card)

- [ ] **Step 9: Commit**

```bash
git add paper-material.html js/script.js
git commit -m "feat: convert paper-material.html to modal-based quote, remove old form"
```

---

## Task 6: Build and Test /api/contact.js

**Files:**
- Create: `api/contact.js`
- Create: `api/__tests__/contact.test.js`

- [ ] **Step 1: Create the test file first**

Create `api/__tests__/contact.test.js`:

```javascript
'use strict';

// Mock resend
jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn().mockResolvedValue({ id: 'test-id' })
      }
    }))
  };
});

// Mock global fetch for Telegram
global.fetch = jest.fn().mockResolvedValue({ ok: true });

const handler = require('../contact');

function makeReqRes(body, method = 'POST') {
  const req = { method, body };
  const res = {
    _status: 200,
    _json: null,
    status(code) { this._status = code; return this; },
    json(data)   { this._json = data; return this; }
  };
  return { req, res };
}

describe('/api/contact', () => {
  beforeEach(() => jest.clearAllMocks());

  test('returns 405 for non-POST requests', async () => {
    const { req, res } = makeReqRes({}, 'GET');
    await handler(req, res);
    expect(res._status).toBe(405);
  });

  test('returns 400 if name is missing', async () => {
    const { req, res } = makeReqRes({ company: 'Acme', email: 'a@b.com', message: 'Hi' });
    await handler(req, res);
    expect(res._status).toBe(400);
  });

  test('returns 400 if email is invalid', async () => {
    const { req, res } = makeReqRes({ name: 'Jane', company: 'Acme', email: 'not-an-email', message: 'Hi' });
    await handler(req, res);
    expect(res._status).toBe(400);
  });

  test('returns 200 and calls Resend on valid input', async () => {
    const { req, res } = makeReqRes({ name: 'Jane', company: 'Acme', email: 'jane@acme.com', message: 'Hello' });
    await handler(req, res);
    expect(res._status).toBe(200);
    expect(res._json).toEqual({ ok: true });
  });

  test('returns 500 if Resend throws', async () => {
    const { Resend } = require('resend');
    Resend.mockImplementation(() => ({
      emails: { send: jest.fn().mockRejectedValue(new Error('Resend down')) }
    }));
    const { req, res } = makeReqRes({ name: 'Jane', company: 'Acme', email: 'jane@acme.com', message: 'Hello' });
    await handler(req, res);
    expect(res._status).toBe(500);
  });

  test('returns 200 even if Telegram fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Telegram down'));
    const { req, res } = makeReqRes({ name: 'Jane', company: 'Acme', email: 'jane@acme.com', message: 'Hello' });
    await handler(req, res);
    expect(res._status).toBe(200);
  });
});
```

- [ ] **Step 2: Run tests — expect them to FAIL (file doesn't exist yet)**

```bash
npm test -- api/__tests__/contact.test.js
```

Expected: `Cannot find module '../contact'`

- [ ] **Step 3: Create `api/contact.js`**

```javascript
'use strict';

const { Resend } = require('resend');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, email, message } = req.body || {};

  if (!name || !company || !message || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Send email (primary)
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    await resend.emails.send({
      from: 'Nexopack <noreply@nexopack.io>',
      to: 'info@nexopack.io',
      subject: `New Message from ${name} (${company})`,
      text: [
        `Name: ${name}`,
        `Company: ${company}`,
        `Email: ${email}`,
        '',
        'Message:',
        message
      ].join('\n')
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send email' });
  }

  // Send Telegram (best-effort — failure does not affect response)
  try {
    const text = [
      '📩 New Message — Nexopack',
      '',
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      '',
      'Message:',
      message
    ].join('\n');

    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text })
      }
    );
  } catch (_) {
    // Non-fatal
  }

  return res.status(200).json({ ok: true });
};
```

- [ ] **Step 4: Run tests — expect them to PASS**

```bash
npm test -- api/__tests__/contact.test.js
```

Expected: All 6 tests pass.

- [ ] **Step 5: Commit**

```bash
git add api/contact.js api/__tests__/contact.test.js
git commit -m "feat: add /api/contact serverless function with tests"
```

---

## Task 7: Build and Test /api/quote.js

**Files:**
- Create: `api/quote.js`
- Create: `api/__tests__/quote.test.js`

- [ ] **Step 1: Create the test file first**

Create `api/__tests__/quote.test.js`:

```javascript
'use strict';

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: jest.fn().mockResolvedValue({ id: 'test-id' }) }
  }))
}));

jest.mock('exceljs', () => {
  const mockWriteBuffer = jest.fn().mockResolvedValue(Buffer.from('fake-excel'));
  const mockWorksheet = {
    columns: [],
    getCell: jest.fn().mockReturnValue({ value: null, font: {}, fill: {}, alignment: {} }),
    mergeCells: jest.fn()
  };
  return {
    Workbook: jest.fn().mockImplementation(() => ({
      addWorksheet: jest.fn().mockReturnValue(mockWorksheet),
      xlsx: { writeBuffer: mockWriteBuffer }
    }))
  };
});

global.fetch = jest.fn().mockResolvedValue({ ok: true });

const handler = require('../quote');

function validBody() {
  return {
    productCategory: 'Cups',
    material: 'Paper',
    quantity: '1,000–5,000',
    deliveryLocation: 'Local (Hong Kong)',
    customPrinting: 'Yes',
    name: 'Jane',
    company: 'Cafe Bloom',
    email: 'jane@cafebloom.com'
  };
}

function makeReqRes(body, method = 'POST') {
  const req = { method, body };
  const res = {
    _status: 200,
    _json: null,
    status(code) { this._status = code; return this; },
    json(data)   { this._json = data; return this; }
  };
  return { req, res };
}

describe('/api/quote', () => {
  beforeEach(() => jest.clearAllMocks());

  test('returns 405 for non-POST', async () => {
    const { req, res } = makeReqRes(validBody(), 'GET');
    await handler(req, res);
    expect(res._status).toBe(405);
  });

  test('returns 400 if a required field is missing', async () => {
    const body = validBody();
    delete body.productCategory;
    const { req, res } = makeReqRes(body);
    await handler(req, res);
    expect(res._status).toBe(400);
  });

  test('returns 400 if email is invalid', async () => {
    const { req, res } = makeReqRes({ ...validBody(), email: 'not-valid' });
    await handler(req, res);
    expect(res._status).toBe(400);
  });

  test('returns 200 with valid input', async () => {
    const { req, res } = makeReqRes(validBody());
    await handler(req, res);
    expect(res._status).toBe(200);
    expect(res._json).toEqual({ ok: true });
  });

  test('returns 500 if Resend fails', async () => {
    const { Resend } = require('resend');
    Resend.mockImplementation(() => ({
      emails: { send: jest.fn().mockRejectedValue(new Error('fail')) }
    }));
    const { req, res } = makeReqRes(validBody());
    await handler(req, res);
    expect(res._status).toBe(500);
  });

  test('returns 200 even if Telegram fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Telegram down'));
    const { req, res } = makeReqRes(validBody());
    await handler(req, res);
    expect(res._status).toBe(200);
  });
});
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test -- api/__tests__/quote.test.js
```

Expected: `Cannot find module '../quote'`

- [ ] **Step 3: Create `api/quote.js`**

```javascript
'use strict';

const { Resend } = require('resend');
const ExcelJS = require('exceljs');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitiseFilename(str) {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 30)
    || 'Client';
}

async function generateQuoteExcel(data) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Quotation');

  sheet.columns = [
    { width: 22 },
    { width: 30 },
    { width: 15 },
    { width: 15 },
    { width: 15 }
  ];

  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10);
  const quoteRef = `NXP-${dateStr.replace(/-/g, '')}-${Date.now()}`;

  // Header
  const titleCell = sheet.getCell('A1');
  titleCell.value = 'Nexopack';
  titleCell.font = { bold: true, size: 18 };

  sheet.getCell('A2').value = 'info@nexopack.io';
  sheet.getCell('A2').font = { size: 11, color: { argb: 'FF888888' } };

  sheet.getCell('A3').value = 'Quote Reference:';
  sheet.getCell('B3').value = quoteRef;

  sheet.getCell('A4').value = 'Date:';
  sheet.getCell('B4').value = dateStr;

  // Customer block
  sheet.getCell('A6').value = 'Name:';        sheet.getCell('B6').value = data.name;
  sheet.getCell('A7').value = 'Company:';     sheet.getCell('B7').value = data.company;
  sheet.getCell('A8').value = 'Email:';       sheet.getCell('B8').value = data.email;

  // Order details
  sheet.getCell('A10').value = 'Product Category:';  sheet.getCell('B10').value = data.productCategory;
  sheet.getCell('A11').value = 'Material:';          sheet.getCell('B11').value = data.material;
  sheet.getCell('A12').value = 'Est. Quantity:';     sheet.getCell('B12').value = data.quantity;
  sheet.getCell('A13').value = 'Delivery Location:'; sheet.getCell('B13').value = data.deliveryLocation;
  sheet.getCell('A14').value = 'Custom Printing:';   sheet.getCell('B14').value = data.customPrinting;

  // Quotation table headers
  const headers = ['Item', 'Description', 'Unit Price', 'Quantity', 'Total'];
  headers.forEach(function(header, i) {
    var cell = sheet.getCell(16, i + 1);
    cell.value = header;
    cell.font = { bold: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9E4DC' } };
  });

  // 5 blank quote rows (17–21) — empty cells already blank, no action needed

  // Totals
  sheet.getCell('D23').value = 'Subtotal:';
  sheet.getCell('D24').value = 'Shipping:';
  const totalCell = sheet.getCell('D25');
  totalCell.value = 'Total:';
  totalCell.font = { bold: true };

  // Notes
  sheet.getCell('A27').value = 'Notes:';
  sheet.mergeCells('B27:E27');

  // Disclaimer
  const disclaimer = sheet.getCell('A29');
  disclaimer.value = 'This quotation is valid for 30 days.';
  disclaimer.font = { italic: true, color: { argb: 'FF888888' } };

  return workbook.xlsx.writeBuffer();
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    productCategory, material, quantity, deliveryLocation,
    customPrinting, name, company, email
  } = req.body || {};

  if (
    !productCategory || !material || !quantity || !deliveryLocation ||
    !customPrinting || !name || !company || !EMAIL_REGEX.test(email)
  ) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Generate Excel
  let excelBuffer;
  try {
    excelBuffer = await generateQuoteExcel({ productCategory, material, quantity, deliveryLocation, customPrinting, name, company, email });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate quote' });
  }

  // Send email with attachment (primary)
  const resend = new Resend(process.env.RESEND_API_KEY);
  const today = new Date().toISOString().slice(0, 10);
  const filename = `Nexopack-Quote-${sanitiseFilename(company)}-${today}.xlsx`;

  try {
    await resend.emails.send({
      from: 'Nexopack <noreply@nexopack.io>',
      to: 'info@nexopack.io',
      subject: `New Quote Request from ${name} (${company})`,
      text: `New quote request received. See attached Excel file.\n\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nProduct: ${productCategory}\nMaterial: ${material}\nQuantity: ${quantity}\nLocation: ${deliveryLocation}\nCustom Printing: ${customPrinting}`,
      attachments: [
        {
          filename: filename,
          content: excelBuffer
        }
      ]
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send email' });
  }

  // Telegram (best-effort)
  try {
    const text = [
      '📋 New Quote Request — Nexopack',
      '',
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      '',
      `Product: ${productCategory}`,
      `Material: ${material}`,
      `Quantity: ${quantity}`,
      `Location: ${deliveryLocation}`,
      `Custom Printing: ${customPrinting}`,
      '',
      '📎 Quote sheet attached.'
    ].join('\n');

    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text })
      }
    );

    // Send the Excel as a Telegram document
    const FormData = require('form-data');
    const form = new FormData();
    form.append('chat_id', process.env.TELEGRAM_CHAT_ID);
    form.append('document', Buffer.from(excelBuffer), { filename: filename });

    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`,
      { method: 'POST', body: form, headers: form.getHeaders() }
    );
  } catch (_) {
    // Non-fatal
  }

  return res.status(200).json({ ok: true });
};
```

> **Note:** `form-data` is a dependency of Resend and will be available in `node_modules`. No extra install needed.

- [ ] **Step 4: Run all tests — expect PASS**

```bash
npm test
```

Expected: All tests pass (contact + quote).

- [ ] **Step 5: Commit**

```bash
git add api/quote.js api/__tests__/quote.test.js
git commit -m "feat: add /api/quote serverless function with Excel generation and tests"
```

---

## Task 8: End-to-End Smoke Test with Vercel Dev

**Prerequisites:** Fill in real values in `.env.local` — you need a Resend API key, a Telegram bot token, and your Telegram chat ID before this step.

> **How to get a Telegram chat ID:**
> 1. Create a bot via [@BotFather](https://t.me/BotFather) — it gives you a token.
> 2. Send any message to your new bot.
> 3. Visit `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` in a browser.
> 4. Your chat ID is in `result[0].message.chat.id`.

- [ ] **Step 1: Install Vercel CLI if not already installed**

```bash
npm install -g vercel
```

- [ ] **Step 2: Run the local dev server with Vercel**

```bash
vercel dev
```

On first run, it will ask you to link to a Vercel project. Follow the prompts. Select "new project" if you don't have one yet.

- [ ] **Step 3: Test the Email Us modal**

Open the local URL in a browser. Click "Email Us", fill in all fields, submit. Confirm:
- Button shows "Sending…" then success message appears
- Email arrives at info@nexopack.io
- Telegram message arrives in your chat

- [ ] **Step 4: Test the Request a Quote modal**

Click "Request a Quote", select a pill in each category, fill in contact details, submit. Confirm:
- Success message appears
- Email with `.xlsx` attachment arrives at info@nexopack.io
- Telegram text summary arrives
- Telegram Excel document arrives

- [ ] **Step 5: Test on paper-material.html**

Open `http://localhost:3000/paper-material.html`. Confirm all three "Request a Quote" buttons (navbar, hero, new CTA section) open the same modal correctly.

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "feat: complete CTA modal forms with email, Telegram, and Excel quote delivery"
```

---

## Setup Checklist (One-time steps before going live)

- [ ] Verify `nexopack.io` domain in [Resend dashboard](https://resend.com) (DNS TXT record)
- [ ] Add environment variables in Vercel dashboard → Project → Settings → Environment Variables:
  - `RESEND_API_KEY`
  - `TELEGRAM_BOT_TOKEN`
  - `TELEGRAM_CHAT_ID`
- [ ] Run `vercel --prod` to deploy
