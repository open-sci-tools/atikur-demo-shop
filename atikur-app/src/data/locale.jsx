import { createContext, useContext, useEffect, useState } from "react";

/* ---------------------------------------------------------------- languages */
export const LANGS = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "bn", label: "বাংলা", flag: "🇧🇩" },
];

/* ---------------------------------------------------------------- currencies */
// Rates are EUR-based. Fallbacks measured 2026-08-26 and cross-checked against
// ECB (api.frankfurter.dev) and open.er-api.com; refreshed live at runtime when
// the exchange-rate API is reachable.
export const RATES_DATE = "2026-08-26";
export const FALLBACK_RATES = { EUR: 1, GBP: 0.8556, USD: 1.1669, BDT: 143.4 };

export const CURRENCIES = [
  { code: "EUR", sym: "€", label: "Euro" },
  { code: "GBP", sym: "£", label: "Pound" },
  { code: "USD", sym: "$", label: "US Dollar" },
  { code: "BDT", sym: "৳", label: "Taka" },
];

const CUR_LOCALE = { EUR: "fr-FR", GBP: "en-GB", USD: "en-US" };

export function format(amountEur, cur, rates) {
  const rate = (rates && rates[cur]) || FALLBACK_RATES[cur] || 1;
  const v = amountEur * rate;
  if (cur === "BDT") return "৳" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(v));
  return new Intl.NumberFormat(CUR_LOCALE[cur] || "en-US", { style: "currency", currency: cur }).format(v);
}

/* ---------------------------------------------------------------- UI strings */
const S = {
  en: {
    nav_shop: "Shop", nav_featured: "Featured", nav_deals: "Deals", nav_about: "About",
    free_ship: "🚚 Free shipping over {x}",
    hero_pill: "New arrivals every week",
    hero_h1a: "Everything you need,", hero_h1b: "one click away.",
    hero_p: "Home, beauty & wellness, phone accessories, DIY, garden and more — the full RockFR Bazar catalogue, delivered fast. Free shipping over {x}, easy returns, and a demo checkout you can try right now.",
    hero_cta1: "Shop the collection →", hero_cta2: "View today's deals",
    stat_products: "Products in stock", stat_cats: "Categories", stat_support: "Support",
    f1t: "Free fast shipping", f1s: "On all orders over {x}",
    f2t: "30-day returns", f2s: "No questions asked",
    f3t: "Secure checkout", f3s: "Encrypted demo payments",
    f4t: "2-year warranty", f4s: "On every product",
    sec_eyebrow: "Our collection", sec_h2: "Shop everything",
    sec_count: "{n} of {t} products · imported live from our eBay store",
    search_ph: "Search products…",
    sort_featured: "Sort: Featured", sort_low: "Price: Low to High", sort_high: "Price: High to Low", sort_name: "Name: A → Z",
    cat_all: "All", sub_all: "All {c}",
    load_more: "Load more · {n} left",
    no_result: "No product matches “{q}”. Try another search.",
    view_ebay: "View on eBay ↗",
    deals_eyebrow: "Limited time", deals_h2: "Small prices, big basket 🛒",
    deals_p: "Hundreds of everyday items under {x} — household, beauty, phone and DIY. Add to cart and check out with the demo payment.",
    deals_btn: "Shop the cheapest first →",
    foot_blurb: "The full RockFR Bazar catalogue — home, beauty, phone, DIY and garden. This is a demo storefront; every listing links back to eBay.",
    foot_shop: "Shop", foot_all: "All products", foot_ebay: "Our eBay store", foot_cats: "Categories",
    foot_support: "Support", foot_contact: "Contact us", foot_shipping: "Shipping", foot_returns: "Returns", foot_warranty: "Warranty",
    foot_company: "Company", foot_about: "About", foot_careers: "Careers", foot_press: "Press", foot_privacy: "Privacy",
    foot_rights: "© 2026 ClickFR. All rights reserved · Demo store.", foot_accept: "We accept:",
    cart_title: "Your Cart", cart_empty_t: "Your cart is empty", cart_empty_s: "Add some products to get started.",
    cart_continue: "Continue shopping", cart_remove: "Remove",
    subtotal: "Subtotal", shipping: "Shipping", free: "Free", vat: "VAT (20%)", total: "Total",
    checkout: "Checkout", added: "Added “{x}”", paid_toast: "Payment complete ✓",
    co_title: "Checkout",
    co_step1: "Delivery address", co_step2: "Payment", co_step3: "Done",
    co_addr_head: "Where should we deliver?",
    fl_name: "Full name", fl_email: "Email address", fl_phone: "Phone number",
    fl_addr1: "Street address", fl_addr2: "Apartment, suite, building (optional)",
    fl_city: "City / Town", fl_state: "State / Region (optional)", fl_zip: "Postcode / ZIP", fl_country: "Country",
    co_next: "Continue to payment →", co_back: "← Back to address",
    co_ship_to: "Delivering to", co_edit: "Edit",
    co_pay_head: "Payment method", pm_card: "Card", pm_paypal: "PayPal", pm_apple: "Apple Pay",
    fl_cardname: "Name on card", fl_card: "Card number", fl_exp: "Expiry (MM/YY)", fl_cvc: "CVC",
    card_tip: "💡 Tip: try card 4242 4242 4242 4242, any future date & CVC.",
    paypal_t: "Pay with PayPal", paypal_s: "You'll be redirected to PayPal to approve this (demo) payment.",
    paypal_acct: "PayPal account (email)",
    apple_t: "Pay with Apple Pay", apple_s: "Confirm the (demo) payment with Touch ID or Face ID.",
    pay_btn: "Pay {x}", processing: "Processing…",
    e_name: "Enter your full name", e_email: "Enter a valid email", e_phone: "Enter a valid phone number",
    e_addr: "Enter your street address", e_city: "Required", e_zip: "Required", e_country: "Required",
    e_cardname: "Name on card required", e_card: "Enter a valid card number", e_exp: "MM/YY", e_cvc: "CVC",
    e_paypal: "Enter your PayPal email",
    ok_title: "Payment successful 🎉",
    ok_p: "Thank you for your order! A confirmation has been sent to {x}.",
    ok_order: "Order number", ok_amount: "Amount paid", ok_pay: "Payment", ok_eta: "Estimated delivery", ok_ship: "Shipping to",
    eta_val: "3–5 business days",
    ok_btn: "Continue shopping",
    demo_note: "This is a demo store — no real payment was processed and no real order was placed.",
    secure: "Secured with 256-bit SSL encryption (demo)",
    demo_note2: "🔒 This is a demo checkout. No real card is charged and no data leaves your browser.",
    order_summary: "Order summary",
    rates_note: "Prices converted from EUR · rates of {d}",
  },
  fr: {
    nav_shop: "Boutique", nav_featured: "Sélection", nav_deals: "Promos", nav_about: "À propos",
    free_ship: "🚚 Livraison offerte dès {x}",
    hero_pill: "Nouveautés chaque semaine",
    hero_h1a: "Tout ce qu'il vous faut,", hero_h1b: "en un clic.",
    hero_p: "Maison, beauté et bien-être, accessoires téléphone, bricolage, jardin et plus — tout le catalogue RockFR Bazar, livré rapidement. Livraison offerte dès {x}, retours faciles et un paiement de démonstration à essayer tout de suite.",
    hero_cta1: "Découvrir la collection →", hero_cta2: "Voir les promos du jour",
    stat_products: "Produits en stock", stat_cats: "Catégories", stat_support: "Assistance",
    f1t: "Livraison rapide offerte", f1s: "Pour toute commande dès {x}",
    f2t: "Retours sous 30 jours", f2s: "Sans justification",
    f3t: "Paiement sécurisé", f3s: "Paiements de démonstration chiffrés",
    f4t: "Garantie 2 ans", f4s: "Sur chaque produit",
    sec_eyebrow: "Notre catalogue", sec_h2: "Tout acheter",
    sec_count: "{n} produits sur {t} · importés en direct de notre boutique eBay",
    search_ph: "Rechercher un produit…",
    sort_featured: "Tri : Sélection", sort_low: "Prix : croissant", sort_high: "Prix : décroissant", sort_name: "Nom : A → Z",
    cat_all: "Tout", sub_all: "Tout : {c}",
    load_more: "Voir plus · {n} restants",
    no_result: "Aucun produit ne correspond à « {q} ». Essayez une autre recherche.",
    view_ebay: "Voir sur eBay ↗",
    deals_eyebrow: "Durée limitée", deals_h2: "Petits prix, grand panier 🛒",
    deals_p: "Des centaines d'articles du quotidien à moins de {x} — maison, beauté, téléphone et bricolage. Ajoutez au panier et payez avec la démo.",
    deals_btn: "Voir les moins chers →",
    foot_blurb: "Tout le catalogue RockFR Bazar — maison, beauté, téléphone, bricolage et jardin. Boutique de démonstration ; chaque annonce renvoie vers eBay.",
    foot_shop: "Boutique", foot_all: "Tous les produits", foot_ebay: "Notre boutique eBay", foot_cats: "Catégories",
    foot_support: "Aide", foot_contact: "Nous contacter", foot_shipping: "Livraison", foot_returns: "Retours", foot_warranty: "Garantie",
    foot_company: "Société", foot_about: "À propos", foot_careers: "Carrières", foot_press: "Presse", foot_privacy: "Confidentialité",
    foot_rights: "© 2026 ClickFR. Tous droits réservés · Boutique de démonstration.", foot_accept: "Nous acceptons :",
    cart_title: "Votre panier", cart_empty_t: "Votre panier est vide", cart_empty_s: "Ajoutez des produits pour commencer.",
    cart_continue: "Continuer mes achats", cart_remove: "Retirer",
    subtotal: "Sous-total", shipping: "Livraison", free: "Offerte", vat: "TVA (20 %)", total: "Total",
    checkout: "Commander", added: "« {x} » ajouté", paid_toast: "Paiement effectué ✓",
    co_title: "Commande",
    co_step1: "Adresse de livraison", co_step2: "Paiement", co_step3: "Terminé",
    co_addr_head: "Où devons-nous livrer ?",
    fl_name: "Nom complet", fl_email: "Adresse e-mail", fl_phone: "Numéro de téléphone",
    fl_addr1: "Adresse", fl_addr2: "Appartement, bâtiment (facultatif)",
    fl_city: "Ville", fl_state: "Région (facultatif)", fl_zip: "Code postal", fl_country: "Pays",
    co_next: "Continuer vers le paiement →", co_back: "← Retour à l'adresse",
    co_ship_to: "Livraison à", co_edit: "Modifier",
    co_pay_head: "Moyen de paiement", pm_card: "Carte", pm_paypal: "PayPal", pm_apple: "Apple Pay",
    fl_cardname: "Nom sur la carte", fl_card: "Numéro de carte", fl_exp: "Expiration (MM/AA)", fl_cvc: "CVC",
    card_tip: "💡 Astuce : carte 4242 4242 4242 4242, date future et CVC au choix.",
    paypal_t: "Payer avec PayPal", paypal_s: "Vous serez redirigé vers PayPal pour approuver ce paiement (démo).",
    paypal_acct: "Compte PayPal (e-mail)",
    apple_t: "Payer avec Apple Pay", apple_s: "Confirmez le paiement (démo) avec Touch ID ou Face ID.",
    pay_btn: "Payer {x}", processing: "Traitement…",
    e_name: "Indiquez votre nom complet", e_email: "E-mail invalide", e_phone: "Numéro invalide",
    e_addr: "Indiquez votre adresse", e_city: "Obligatoire", e_zip: "Obligatoire", e_country: "Obligatoire",
    e_cardname: "Nom sur la carte requis", e_card: "Numéro de carte invalide", e_exp: "MM/AA", e_cvc: "CVC",
    e_paypal: "Indiquez votre e-mail PayPal",
    ok_title: "Paiement réussi 🎉",
    ok_p: "Merci pour votre commande ! Une confirmation a été envoyée à {x}.",
    ok_order: "Numéro de commande", ok_amount: "Montant payé", ok_pay: "Paiement", ok_eta: "Livraison estimée", ok_ship: "Livraison à",
    eta_val: "3 à 5 jours ouvrés",
    ok_btn: "Continuer mes achats",
    demo_note: "Boutique de démonstration — aucun paiement réel n'a été effectué et aucune commande n'a été passée.",
    secure: "Sécurisé par chiffrement SSL 256 bits (démo)",
    demo_note2: "🔒 Paiement de démonstration. Aucune carte n'est débitée et aucune donnée ne quitte votre navigateur.",
    order_summary: "Récapitulatif",
    rates_note: "Prix convertis depuis l'euro · taux du {d}",
  },
  bn: {
    nav_shop: "দোকান", nav_featured: "নির্বাচিত", nav_deals: "অফার", nav_about: "পরিচিতি",
    free_ship: "🚚 {x}-এর বেশি অর্ডারে ফ্রি ডেলিভারি",
    hero_pill: "প্রতি সপ্তাহে নতুন পণ্য",
    hero_h1a: "আপনার যা কিছু দরকার,", hero_h1b: "এক ক্লিকেই।",
    hero_p: "ঘরের জিনিস, রূপচর্চা ও স্বাস্থ্য, ফোনের এক্সেসরিজ, DIY, বাগান — সম্পূর্ণ RockFR Bazar ক্যাটালগ, দ্রুত ডেলিভারি। {x}-এর বেশি অর্ডারে ফ্রি ডেলিভারি, সহজ রিটার্ন এবং এখনই চেষ্টা করার মতো ডেমো চেকআউট।",
    hero_cta1: "কালেকশন দেখুন →", hero_cta2: "আজকের অফার দেখুন",
    stat_products: "স্টকে থাকা পণ্য", stat_cats: "ক্যাটাগরি", stat_support: "সহায়তা",
    f1t: "ফ্রি দ্রুত ডেলিভারি", f1s: "{x}-এর বেশি সব অর্ডারে",
    f2t: "৩০ দিনে রিটার্ন", f2s: "কোনো প্রশ্ন ছাড়াই",
    f3t: "নিরাপদ চেকআউট", f3s: "এনক্রিপ্টেড ডেমো পেমেন্ট",
    f4t: "২ বছরের ওয়ারেন্টি", f4s: "প্রতিটি পণ্যে",
    sec_eyebrow: "আমাদের কালেকশন", sec_h2: "সব পণ্য দেখুন",
    sec_count: "{t}টির মধ্যে {n}টি পণ্য · আমাদের eBay দোকান থেকে সরাসরি",
    search_ph: "পণ্য খুঁজুন…",
    sort_featured: "সাজান: নির্বাচিত", sort_low: "দাম: কম থেকে বেশি", sort_high: "দাম: বেশি থেকে কম", sort_name: "নাম: A → Z",
    cat_all: "সব", sub_all: "সব: {c}",
    load_more: "আরও দেখুন · আরও {n}টি",
    no_result: "“{q}” এর সাথে মেলে এমন পণ্য নেই। অন্য কিছু খুঁজুন।",
    view_ebay: "eBay-তে দেখুন ↗",
    deals_eyebrow: "সীমিত সময়", deals_h2: "কম দাম, ভরা ব্যাগ 🛒",
    deals_p: "{x}-এর কমে শত শত দৈনন্দিন পণ্য — ঘর, রূপচর্চা, ফোন ও DIY। কার্টে যোগ করে ডেমো পেমেন্টে চেকআউট করুন।",
    deals_btn: "সবচেয়ে সস্তা আগে →",
    foot_blurb: "সম্পূর্ণ RockFR Bazar ক্যাটালগ — ঘর, রূপচর্চা, ফোন, DIY ও বাগান। এটি একটি ডেমো দোকান; প্রতিটি পণ্য eBay-তে লিঙ্ক করা।",
    foot_shop: "দোকান", foot_all: "সব পণ্য", foot_ebay: "আমাদের eBay দোকান", foot_cats: "ক্যাটাগরি",
    foot_support: "সহায়তা", foot_contact: "যোগাযোগ", foot_shipping: "ডেলিভারি", foot_returns: "রিটার্ন", foot_warranty: "ওয়ারেন্টি",
    foot_company: "কোম্পানি", foot_about: "পরিচিতি", foot_careers: "ক্যারিয়ার", foot_press: "প্রেস", foot_privacy: "গোপনীয়তা",
    foot_rights: "© ২০২৬ ClickFR. সর্বস্বত্ব সংরক্ষিত · ডেমো দোকান।", foot_accept: "আমরা গ্রহণ করি:",
    cart_title: "আপনার কার্ট", cart_empty_t: "আপনার কার্ট খালি", cart_empty_s: "শুরু করতে কিছু পণ্য যোগ করুন।",
    cart_continue: "কেনাকাটা চালিয়ে যান", cart_remove: "সরান",
    subtotal: "সাবটোটাল", shipping: "ডেলিভারি", free: "ফ্রি", vat: "ভ্যাট (২০%)", total: "মোট",
    checkout: "চেকআউট", added: "“{x}” যোগ হয়েছে", paid_toast: "পেমেন্ট সম্পন্ন ✓",
    co_title: "চেকআউট",
    co_step1: "ডেলিভারি ঠিকানা", co_step2: "পেমেন্ট", co_step3: "সম্পন্ন",
    co_addr_head: "কোথায় ডেলিভারি করব?",
    fl_name: "পুরো নাম", fl_email: "ইমেইল ঠিকানা", fl_phone: "ফোন নম্বর",
    fl_addr1: "রাস্তার ঠিকানা", fl_addr2: "ফ্ল্যাট, বাড়ি, ভবন (ঐচ্ছিক)",
    fl_city: "শহর", fl_state: "বিভাগ / অঞ্চল (ঐচ্ছিক)", fl_zip: "পোস্ট কোড", fl_country: "দেশ",
    co_next: "পেমেন্টে যান →", co_back: "← ঠিকানায় ফিরুন",
    co_ship_to: "ডেলিভারি হবে", co_edit: "সম্পাদনা",
    co_pay_head: "পেমেন্ট পদ্ধতি", pm_card: "কার্ড", pm_paypal: "PayPal", pm_apple: "Apple Pay",
    fl_cardname: "কার্ডের নাম", fl_card: "কার্ড নম্বর", fl_exp: "মেয়াদ (MM/YY)", fl_cvc: "CVC",
    card_tip: "💡 টিপস: কার্ড 4242 4242 4242 4242, ভবিষ্যতের যেকোনো তারিখ ও CVC।",
    paypal_t: "PayPal দিয়ে পেমেন্ট", paypal_s: "এই (ডেমো) পেমেন্ট অনুমোদনের জন্য আপনাকে PayPal-এ নেওয়া হবে।",
    paypal_acct: "PayPal অ্যাকাউন্ট (ইমেইল)",
    apple_t: "Apple Pay দিয়ে পেমেন্ট", apple_s: "Touch ID বা Face ID দিয়ে (ডেমো) পেমেন্ট নিশ্চিত করুন।",
    pay_btn: "{x} পরিশোধ করুন", processing: "প্রসেস হচ্ছে…",
    e_name: "আপনার পুরো নাম লিখুন", e_email: "সঠিক ইমেইল লিখুন", e_phone: "সঠিক ফোন নম্বর লিখুন",
    e_addr: "আপনার ঠিকানা লিখুন", e_city: "আবশ্যক", e_zip: "আবশ্যক", e_country: "আবশ্যক",
    e_cardname: "কার্ডের নাম আবশ্যক", e_card: "সঠিক কার্ড নম্বর লিখুন", e_exp: "MM/YY", e_cvc: "CVC",
    e_paypal: "আপনার PayPal ইমেইল লিখুন",
    ok_title: "পেমেন্ট সফল 🎉",
    ok_p: "আপনার অর্ডারের জন্য ধন্যবাদ! {x} ঠিকানায় নিশ্চিতকরণ পাঠানো হয়েছে।",
    ok_order: "অর্ডার নম্বর", ok_amount: "পরিশোধিত পরিমাণ", ok_pay: "পেমেন্ট", ok_eta: "সম্ভাব্য ডেলিভারি", ok_ship: "ডেলিভারি ঠিকানা",
    eta_val: "৩–৫ কর্মদিবস",
    ok_btn: "কেনাকাটা চালিয়ে যান",
    demo_note: "এটি একটি ডেমো দোকান — কোনো প্রকৃত পেমেন্ট হয়নি এবং কোনো প্রকৃত অর্ডার হয়নি।",
    secure: "২৫৬-বিট SSL এনক্রিপশনে সুরক্ষিত (ডেমো)",
    demo_note2: "🔒 এটি একটি ডেমো চেকআউট। কোনো কার্ড থেকে টাকা কাটা হয় না এবং কোনো তথ্য ব্রাউজারের বাইরে যায় না।",
    order_summary: "অর্ডার সারাংশ",
    rates_note: "ইউরো থেকে রূপান্তরিত দাম · {d} তারিখের রেট",
  },
};

/* --------------------------------------------- eBay category labels (fr → en/bn) */
// Keys are the French labels that come from the eBay store; `fr` is therefore the
// identity mapping and is not repeated here.
const CAT = {
  "Maison": ["Home", "ঘর ও গৃহস্থালি"],
  "Décoration d'intérieur": ["Interior decoration", "ঘর সাজানো"],
  "Cuisine, arts de la table": ["Kitchen & tableware", "রান্নাঘর ও টেবিলওয়্যার"],
  "Entretien, nettoyage": ["Cleaning & housekeeping", "পরিষ্কার-পরিচ্ছন্নতা"],
  "Éclairage intérieur": ["Indoor lighting", "ঘরের আলো"],
  "Salle de bain": ["Bathroom", "বাথরুম"],
  "Solutions de rangement": ["Storage solutions", "স্টোরেজ সমাধান"],
  "Beauté, bien-être, parfums": ["Beauty, wellness & fragrance", "রূপচর্চা, স্বাস্থ্য ও সুগন্ধি"],
  "Bain, savons et soins du corps": ["Bath, soap & body care", "গোসল, সাবান ও ত্বকের যত্ন"],
  "Massage": ["Massage", "ম্যাসাজ"],
  "Soins de la peau": ["Skincare", "ত্বকের যত্ন"],
  "Santé et hygiène": ["Health & hygiene", "স্বাস্থ্য ও পরিচ্ছন্নতা"],
  "Remèdes naturels et alternatifs": ["Natural & alternative remedies", "প্রাকৃতিক ও বিকল্প চিকিৎসা"],
  "Épilation et rasage": ["Hair removal & shaving", "শেভিং ও লোম অপসারণ"],
  "Autres": ["Other", "অন্যান্য"],
  "Hygiène bucco-dentaire": ["Oral care", "দাঁত ও মুখের যত্ন"],
  "Soins des yeux": ["Eye care", "চোখের যত্ন"],
  "Vitamines et compléments alimentaires": ["Vitamins & supplements", "ভিটামিন ও সাপ্লিমেন্ট"],
  "Soins cheveux et coiffure": ["Hair care & styling", "চুলের যত্ন ও সাজ"],
  "Équipements professionnels": ["Business & industrial", "ব্যবসায়িক সরঞ্জাম"],
  "Matériels de manipulation": ["Packing & handling", "প্যাকিং ও হ্যান্ডলিং"],
  "Equipement pour commerces": ["Retail & shop equipment", "দোকানের সরঞ্জাম"],
  "Outillage professionnel": ["Professional tools", "পেশাদার যন্ত্রপাতি"],
  "Hôtellerie, restauration": ["Hotel & catering", "হোটেল ও রেস্তোরাঁ"],
  "Equipement électrique, fournitures": ["Electrical equipment & supplies", "বৈদ্যুতিক সরঞ্জাম"],
  "Téléphonie, mobilité": ["Phones & mobility", "মোবাইল ও ফোন"],
  "Tél. mobiles: accessoires": ["Mobile phone accessories", "মোবাইল এক্সেসরিজ"],
  "Cartes téléphoniques, cartes SIM": ["Phone cards & SIM cards", "ফোন কার্ড ও সিম"],
  "Téléphones mobiles": ["Mobile phones", "মোবাইল ফোন"],
  "Collections": ["Collectables", "সংগ্রহযোগ্য"],
  "Briquets, objets du fumeur": ["Lighters & smoking items", "লাইটার ও ধূমপান সামগ্রী"],
  "Objets publicitaires": ["Advertising items", "বিজ্ঞাপন সামগ্রী"],
  "Religion, ésotérisme": ["Religion & esoteric", "ধর্মীয় সামগ্রী"],
  "Serrures, cadenas, clés": ["Locks, padlocks & keys", "তালা ও চাবি"],
  "Image, son": ["Audio & video", "অডিও ও ভিডিও"],
  "Piles, alimentation": ["Batteries & power", "ব্যাটারি ও পাওয়ার"],
  "Accessoires image, son": ["Audio & video accessories", "অডিও-ভিডিও এক্সেসরিজ"],
  "Enceintes portables, écouteurs": ["Portable speakers & headphones", "স্পিকার ও হেডফোন"],
  "Informatique, réseaux": ["Computing & networking", "কম্পিউটার ও নেটওয়ার্ক"],
  "Supports vierges, disques durs": ["Blank media & hard drives", "স্টোরেজ ও হার্ড ড্রাইভ"],
  "Imprimantes, scanners, access.": ["Printers, scanners & supplies", "প্রিন্টার ও স্ক্যানার"],
  "Accessoires ordinateur": ["Computer accessories", "কম্পিউটার এক্সেসরিজ"],
  "Bureautique": ["Office supplies", "অফিস সামগ্রী"],
  "Auto, moto - pièces, accessoires": ["Car & motorbike parts", "গাড়ি ও মোটরবাইক যন্ত্রাংশ"],
  "Équipements, outils de garage": ["Garage equipment & tools", "গ্যারেজ সরঞ্জাম"],
  "Automobile : pièces et accessoires": ["Car parts & accessories", "গাড়ির যন্ত্রাংশ"],
  "Tuning, styling": ["Tuning & styling", "টিউনিং ও স্টাইলিং"],
  "Sécurité, signalisation": ["Safety & signalling", "নিরাপত্তা ও সংকেত"],
  "Huiles, lubrifiants, liquides": ["Oils, lubricants & fluids", "তেল ও লুব্রিকেন্ট"],
  "Vêtements, accessoires": ["Clothing & accessories", "পোশাক ও এক্সেসরিজ"],
  "Homme : vêtements, accessoires": ["Men's clothing & accessories", "পুরুষের পোশাক"],
  "Femme : vêtements, accessoires": ["Women's clothing & accessories", "নারীর পোশাক"],
  "Bricolage": ["DIY", "DIY ও নির্মাণ"],
  "Électricité": ["Electrical", "বৈদ্যুতিক"],
  "Matériel d'atelier et de bricolage": ["Workshop & DIY equipment", "ওয়ার্কশপ সরঞ্জাম"],
  "Cuisine": ["Kitchen", "রান্নাঘর"],
  "Plomberie et équipements sanitaires": ["Plumbing & sanitary", "প্লাম্বিং ও স্যানিটারি"],
  "Sécurité du domicile": ["Home security", "বাড়ির নিরাপত্তা"],
  "Sports, vacances": ["Sport & holidays", "খেলাধুলা ও ছুটি"],
  "Camping, randonnée": ["Camping & hiking", "ক্যাম্পিং ও হাইকিং"],
  "Cyclisme, vélos": ["Cycling & bikes", "সাইকেল"],
  "Tennis": ["Tennis", "টেনিস"],
  "Football": ["Football", "ফুটবল"],
  "Jardin, terrasse": ["Garden & patio", "বাগান ও ছাদ"],
  "Désherbage et contrôle de nuisibles": ["Weeding & pest control", "আগাছা ও কীট নিয়ন্ত্রণ"],
  "Barbecues et chauffage extérieur": ["Barbecues & outdoor heating", "বারবিকিউ ও আউটডোর হিটার"],
  "Plantes et sols : soins et accessoires": ["Plant & soil care", "গাছ ও মাটির যত্ন"],
  "Électroménager": ["Home appliances", "গৃহস্থালি যন্ত্র"],
  "Appareils de cuisson": ["Cooking appliances", "রান্নার যন্ত্র"],
  "Petit électroménager: cuisine": ["Small kitchen appliances", "ছোট রান্নাঘর যন্ত্র"],
  "Loisirs créatifs": ["Crafts", "সৃজনশীল কারুকাজ"],
  "Scrapbooking, arts du papier": ["Scrapbooking & paper crafts", "কাগজের কারুকাজ"],
  "Arts graphiques, décoratives": ["Graphic & decorative arts", "চিত্রকলা ও সাজসজ্জা"],
  "Matériel divers": ["Other supplies", "বিবিধ সরঞ্জাম"],
  "Jouets et jeux": ["Toys & games", "খেলনা ও গেম"],
  "Jeux de société": ["Board games", "বোর্ড গেম"],
  "Gastronomie, boissons": ["Food & drink", "খাবার ও পানীয়"],
  "Boissons non alcoolisées": ["Soft drinks", "কোমল পানীয়"],
  "Épicerie": ["Groceries", "মুদি পণ্য"],
  "Livres, BD, revues": ["Books & magazines", "বই ও ম্যাগাজিন"],
  "Papeterie": ["Stationery", "স্টেশনারি"],
};

/* ---------------------------------------------------------------- countries */
export const COUNTRIES = [
  "France", "United Kingdom", "United States", "Bangladesh", "Belgium", "Germany",
  "Spain", "Italy", "Netherlands", "Switzerland", "Canada", "India", "Other",
];

/* ---------------------------------------------------------------- provider */
const Ctx = createContext(null);
const read = (k, d) => { try { return localStorage.getItem(k) || d; } catch { return d; } };

export function LocaleProvider({ children }) {
  const [lang, setLangState] = useState(() => (S[read("clickfr_lang", "")] ? read("clickfr_lang", "en") : "en"));
  const [cur, setCurState] = useState(() => (FALLBACK_RATES[read("clickfr_cur", "")] ? read("clickfr_cur", "EUR") : "EUR"));
  const [rates, setRates] = useState(FALLBACK_RATES);
  const [ratesDate, setRatesDate] = useState(RATES_DATE);

  const setLang = (v) => { setLangState(v); try { localStorage.setItem("clickfr_lang", v); } catch { /* ignore */ } };
  const setCur = (v) => { setCurState(v); try { localStorage.setItem("clickfr_cur", v); } catch { /* ignore */ } };

  // Live rates when the API is reachable; the page works unchanged without it.
  useEffect(() => {
    let alive = true;
    fetch("https://open.er-api.com/v6/latest/EUR")
      .then((r) => r.json())
      .then((d) => {
        if (!alive || !d || d.result !== "success" || !d.rates) return;
        const r = d.rates;
        if (!r.USD || !r.GBP || !r.BDT) return;
        setRates({ EUR: 1, GBP: r.GBP, USD: r.USD, BDT: r.BDT });
        if (d.time_last_update_utc) setRatesDate(new Date(d.time_last_update_utc).toISOString().slice(0, 10));
      })
      .catch(() => { /* offline: keep the measured fallbacks */ });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key, vars) => {
    let s = (S[lang] && S[lang][key]) || S.en[key] || key;
    if (vars) for (const k of Object.keys(vars)) s = s.split("{" + k + "}").join(vars[k]);
    return s;
  };
  const money = (eur) => format(eur, cur, rates);
  const tc = (label) => {
    if (lang === "fr" || !CAT[label]) return label;
    return CAT[label][lang === "bn" ? 1 : 0];
  };

  return (
    <Ctx.Provider value={{ lang, setLang, cur, setCur, rates, ratesDate, t, money, tc }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLocale() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLocale must be used inside <LocaleProvider>");
  return v;
}
