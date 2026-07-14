# ATIKUR — Demo E-commerce Store

**🔗 Live demo: https://open-sci-tools.github.io/atikur-demo-shop/**

A modern, sleek demo e-commerce website built with **React 18 + JSX**. This repo contains
both a full **Vite + React** app (`atikur-app/`) and a single self-contained `index.html`
you can open with no build step.

## How to open
- **Double-click `index.html`** (opens in your default browser), or
- Right-click → Open With → your browser.

> Needs an internet connection the first time, because React/Babel load from a CDN.

## What's inside
- Sticky glass navbar, animated gradient hero, stats.
- 12-product catalog with **category filters** + **sort** (price / rating).
- **Add to cart**, favorites (❤️), toast notifications.
- Slide-out **cart drawer** with quantity controls and live totals (subtotal, shipping, tax).
  - Free shipping over $200, otherwise $12.99. Tax estimated at 8%.
- Full **demo checkout** modal:
  - Shipping form with validation.
  - Payment methods: **Card / PayPal / Apple Pay**.
  - Live animated credit-card preview with brand detection (Visa/Mastercard/Amex/Discover)
    and auto-formatting for card number & expiry.
  - "Processing…" state → animated **success screen** with generated order number.
- Fully **responsive** (desktop / tablet / mobile).

## ⚠️ Demo payment — important
This is a **fake / demo** payment flow for showcase purposes only:
- **No real card is charged.** No data is sent anywhere — everything stays in your browser.
- Try card number `4242 4242 4242 4242`, any future expiry, any CVC.

## Want the real Vite + React project?
This machine has no Node.js installed, so a runnable Vite build couldn't be created here.
If you install Node (from https://nodejs.org), I can scaffold the full `Vite + React`
project (components, `package.json`, `npm run dev`) on request.
