# ATIKUR — Vite + React E-commerce Store

The full **React project** version of the ATIKUR demo store (Vite + React 18), with a
modern sleek design and a complete **demo payment / checkout** flow.

## Run it

```bash
npm install      # first time only
npm run dev      # start dev server → http://localhost:5173
```

Other commands:

```bash
npm run build    # production build into dist/
npm run preview  # preview the production build
```

> **Node is required.** It's already installed on this machine via nvm
> (`node -v` → v24). If a new terminal can't find `node`, run:
> `export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"` (nvm was added to your `~/.zshrc`,
> so new terminals should pick it up automatically).

## Project structure

```
src/
├─ main.jsx                 # React entry
├─ App.jsx                  # page layout: nav, hero, shop, deals, footer
├─ index.css                # full design system / styles
├─ data/products.js         # product catalog + helpers
├─ hooks/useToasts.js       # toast notifications hook
└─ components/
   ├─ Icons.jsx             # inline SVG icons
   ├─ ProductCard.jsx       # product grid card
   ├─ CartDrawer.jsx        # slide-out cart
   └─ Checkout.jsx          # demo checkout + payment + success
```

## Features
- Animated hero, 12 products, category filters + sorting.
- Add to cart, favorites, toast notifications, slide-out cart with live totals
  (free shipping over $200, 8% tax).
- Full demo checkout: shipping form + validation, Card / PayPal / Apple Pay,
  live animated card preview with brand detection & auto-formatting, processing
  state, and an animated success screen with a generated order number.
- Fully responsive.

## ⚠️ Demo payment
This is a **fake / demo** payment for showcase only — **no real card is charged** and
no data is sent anywhere. Try card `4242 4242 4242 4242`, any future expiry, any CVC.
