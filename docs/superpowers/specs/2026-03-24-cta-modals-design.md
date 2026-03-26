# CTA Modal Forms — Design Spec
**Date:** 2026-03-24
**Project:** Nexopack Webpage
**Status:** Approved

---

## Overview

Two modal forms triggered by CTA buttons on both `index.html` and `paper-material.html`:

- The existing "Request a Quote" button on `index.html` (currently links to `paper-material.html#quote`) will be converted to a modal trigger.
- The existing inline quote form on `paper-material.html` will be removed and replaced with a modal trigger button.
- The "Email Us" button on `index.html` (currently `mailto:`) will be converted to a modal trigger.

On submission, both forms notify Nexopack via email (to `info@nexopack.io`) and Telegram (owner's personal chat).

---

## 1. Modal UI

### Shared behaviour
- Frosted glass overlay backdrop (consistent with site's navbar style)
- Subtle fade + slide-up entrance animation
- Close via: X button, clicking backdrop, or ESC key
- Submit button shows a loading/spinner state while the API call is in-flight; disabled to prevent double-submission
- **On success:** fields replaced with thank-you message — modal stays open displaying confirmation:
  - Email Us: *"Thanks for reaching out! We'll get back to you shortly."*
  - Request a Quote: *"Your quote request has been received. We'll prepare a quotation and be in touch soon."*
- **On error:** fields preserved; inline error banner above submit button: *"Something went wrong — please try again or email us directly at info@nexopack.io"*

### "Email Us" Modal
Fields (all required):
1. Name (text input)
2. Company (text input)
3. Email (email input — basic regex format validation)
4. Message (textarea)

### "Request a Quote" Modal
Single scrollable form. Pill/chip selectors are **single-select**. All fields required.

1. **Product Category** — Cups / Containers / Bags / Lids / Other
2. **Material** — Paper / Plastic / Bamboo / Pulp / No Preference
3. **Estimated Quantity** — <1,000 / 1,000–5,000 / 5,000–10,000 / 10,000+
4. **Delivery Location** — Local (Hong Kong) / Overseas
5. **Custom Printing** — Yes / No / Not Sure
6. **Contact Details** — Name (text), Company (text), Email (email, regex validated) — all required

---

## 2. Serverless Functions

**Platform: Vercel**
- Functions in `/api` directory, Node.js runtime
- **Module syntax: CommonJS** (`require`/`module.exports`) — consistent with the project's existing `"type": "commonjs"` in `package.json` (no changes needed)
- A `vercel.json` must be added to the project root:

```json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "framework": null
}
```

> `"framework": null` is required so Vercel picks up the `/api` functions correctly alongside the Vite static build.

- **CORS:** `vercel dev` handles cross-origin automatically during local development — no extra headers needed

### `/api/contact`
- **Input:** name, company, email, message
- **Server-side validation:** all fields required, email regex → HTTP 400 `{ error: "Invalid input" }` on failure
- **Actions:**
  1. Send email to `info@nexopack.io` via Resend (`from: "Nexopack <noreply@nexopack.io>"`)
  2. Send Telegram text message via Telegram Bot API (`parse_mode` unset — plain text)
- **Partial failure policy:** email is the primary channel. If email succeeds but Telegram fails → return HTTP 200. If email fails → return HTTP 500.

### `/api/quote`
- **Input:** productCategory, material, quantity, deliveryLocation, customPrinting, name, company, email
- **Server-side validation:** all fields required, email regex → HTTP 400 `{ error: "Invalid input" }` on failure
- **Actions:**
  1. Generate Excel buffer using ExcelJS (see Section 4)
  2. Send email to `info@nexopack.io` via Resend with Excel attached (`from: "Nexopack <noreply@nexopack.io>"`)
  3. If Resend fails: discard Excel buffer, return HTTP 500. No retry.
  4. Send Telegram text summary (`parse_mode` unset — plain text)
  5. Send Excel buffer as Telegram document attachment
- **Partial failure policy:** email + Excel is the primary deliverable. If Telegram fails after email succeeds → return HTTP 200. If email/Excel fails → return HTTP 500.

### Third-party services
| Service | Purpose | Cost |
|---------|---------|------|
| Resend | Email sending | Free (100/day) |
| Telegram Bot API | Notifications + file delivery | Free |
| ExcelJS | Excel file generation | Free (open-source) |

> **Resend setup:** Domain `nexopack.io` must be verified in Resend (one-time DNS step) before emails will send.
> **Telegram setup:** Owner must message the bot first to generate their personal chat ID.

### Environment variables
```
RESEND_API_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

---

## 3. Telegram Message Format

Both endpoints use `parse_mode` unset (plain text). Emoji renders correctly in plain text mode.

**Email Us (`/api/contact`):**
```
📩 New Message — Nexopack

Name: [name]
Company: [company]
Email: [email]

Message:
[message]
```

**Request a Quote (`/api/quote`):**
```
📋 New Quote Request — Nexopack

Name: [name]
Company: [company]
Email: [email]

Product: [productCategory]
Material: [material]
Quantity: [quantity]
Location: [deliveryLocation]
Custom Printing: [customPrinting]

📎 Quote sheet attached.
```
Excel file sent as a separate Telegram document message immediately after.

---

## 4. Excel Quotation Template

**Filename:** `Nexopack-Quote-[sanitised-company]-[YYYY-MM-DD].xlsx`
- `sanitised-company` = customer's **company name**, non-alphanumeric stripped, spaces → hyphens, truncated to 30 chars
- Quote reference: `NXP-[YYYYMMDD]-[Date.now()]` — millisecond timestamp, sufficient for low-traffic uniqueness

**Sheet layout (columns A–E):**

| Rows | Content |
|------|---------|
| 1–2 | Header — "Nexopack" (large bold, col A), `info@nexopack.io` (col A row 2) |
| 3 | Quote Reference (label col A, value col B) |
| 4 | Date: auto-generated (label col A, value col B) |
| 6–8 | Customer block — Name, Company, Email (label col A, value col B) |
| 10–14 | Order Details — Product Category, Material, Quantity, Delivery Location, Custom Printing (label col A, value col B) |
| 16 | Quotation table header row (bold): Item / Description / Unit Price / Quantity / Total |
| 17–21 | 5 blank quotation rows |
| 23 | Subtotal (label col D, blank value col E) |
| 24 | Shipping (label col D, blank value col E) |
| 25 | Total (label col D, bold blank value col E) |
| 27 | Notes: (blank field spanning cols A–E) |
| 29 | "This quotation is valid for 30 days." |

---

## 5. Scope of Changes

**`index.html`**
- "Request a Quote" button: remove `href`, add modal trigger
- "Email Us" button: remove `mailto:` href, add modal trigger
- Add modal HTML for both modals
- Add modal JS (open/close/submit logic)

**`paper-material.html`**
- Remove existing inline quote form section (`#quote`)
- Add a "Request a Quote" button that triggers the same modal
- Add modal HTML + JS (shared logic, can be extracted to a shared file)

**New files**
- `api/contact.js` — serverless function
- `api/quote.js` — serverless function
- `vercel.json` — deployment config

---

## 6. Out of Scope (deferred)
- Excel logo/branding (colours, logo image)
- Rate limiting / spam protection
- Modal accessibility attributes (aria-modal, focus trapping)
- Multi-language support
- Admin dashboard
