// ClickFR catalog — grouped by the store's real categories & subcategories.
export const PRODUCTS = [
  // ---- Phone Accessories ----
  { id:1,  name:"Braided USB-C Charging Cable (2m)", cat:"Phone Accessories", sub:"Charging Cables", emoji:"🔌", price:8.99,  old:12.99, rating:4.7, reviews:1284, tag:"Sale",       grad:"linear-gradient(135deg,#7c5cff,#22d3ee)" },
  { id:2,  name:"30W Fast Wall Charger",              cat:"Phone Accessories", sub:"Chargers",        emoji:"⚡", price:19.99, old:null,  rating:4.8, reviews:876,  tag:"Bestseller", grad:"linear-gradient(135deg,#f97316,#f5b544)" },
  { id:3,  name:"Shockproof Clear Phone Case",        cat:"Phone Accessories", sub:"Phone Cases",     emoji:"📱", price:11.99, old:null,  rating:4.6, reviews:2103, tag:null,         grad:"linear-gradient(135deg,#22d3ee,#34d399)" },
  { id:4,  name:"Tempered Glass Protector (2-pack)",  cat:"Phone Accessories", sub:"Screen Protectors", emoji:"🛡️", price:7.99, old:11.99, rating:4.5, reviews:1590, tag:"Sale",     grad:"linear-gradient(135deg,#6366f1,#22d3ee)" },
  { id:5,  name:"20 000mAh Power Bank",               cat:"Phone Accessories", sub:"Power Banks",     emoji:"🔋", price:29.99, old:39.99, rating:4.8, reviews:754,  tag:"Sale",       grad:"linear-gradient(135deg,#34d399,#7c5cff)" },
  { id:6,  name:"Wireless Bluetooth Earphones",       cat:"Phone Accessories", sub:"Earphones",       emoji:"🎧", price:24.99, old:null,  rating:4.7, reviews:1876, tag:"Bestseller", grad:"linear-gradient(135deg,#7c5cff,#ff5c8a)" },
  { id:7,  name:"Car Vent Phone Mount",               cat:"Phone Accessories", sub:"Car Accessories", emoji:"🚗", price:14.99, old:null,  rating:4.6, reviews:398,  tag:null,         grad:"linear-gradient(135deg,#f5b544,#ff5c8a)" },
  { id:8,  name:"USB-C to HDMI Adapter",              cat:"Phone Accessories", sub:"Adapters",        emoji:"🔀", price:17.99, old:22.99, rating:4.5, reviews:531,  tag:null,         grad:"linear-gradient(135deg,#22d3ee,#7c5cff)" },

  // ---- Forever Living Products ----
  { id:9,  name:"Forever Aloe Vera Gel Drink (1L)",   cat:"Forever Living", sub:"Aloe Drinks",   emoji:"🥤", price:22.99, old:null,  rating:4.9, reviews:642, tag:"Bestseller", grad:"linear-gradient(135deg,#34d399,#22d3ee)" },
  { id:10, name:"Aloe Hydrating Face Cream",          cat:"Forever Living", sub:"Skincare",      emoji:"🧴", price:18.99, old:24.99, rating:4.7, reviews:456, tag:"Sale",       grad:"linear-gradient(135deg,#ff5c8a,#7c5cff)" },
  { id:11, name:"Aloe Moisturizing Body Wash",        cat:"Forever Living", sub:"Personal Care", emoji:"🧼", price:12.99, old:null,  rating:4.6, reviews:287, tag:null,         grad:"linear-gradient(135deg,#22d3ee,#34d399)" },
  { id:12, name:"Forever Daily Multivitamins",        cat:"Forever Living", sub:"Supplements",   emoji:"💊", price:26.99, old:null,  rating:4.8, reviews:341, tag:"New",        grad:"linear-gradient(135deg,#7c5cff,#22d3ee)" },

  // ---- Clothing ----
  { id:13, name:"Cotton Crew-Neck T-Shirt",           cat:"Clothing", sub:"T-Shirts",   emoji:"👕", price:14.99, old:19.99, rating:4.6, reviews:1120, tag:"Sale",       grad:"linear-gradient(135deg,#6366f1,#22d3ee)" },
  { id:14, name:"Classic Piqué Polo Shirt",           cat:"Clothing", sub:"Polo Shirts", emoji:"👔", price:22.99, old:null,  rating:4.7, reviews:634,  tag:null,         grad:"linear-gradient(135deg,#f5b544,#34d399)" },
  { id:15, name:"Casual Chino Shorts",                cat:"Clothing", sub:"Shorts",      emoji:"🩳", price:18.99, old:null,  rating:4.5, reviews:412,  tag:null,         grad:"linear-gradient(135deg,#ff5c8a,#6366f1)" },
  { id:16, name:"Lightweight Bomber Jacket",          cat:"Clothing", sub:"Jackets",     emoji:"🧥", price:44.99, old:59.99, rating:4.8, reviews:287,  tag:"Sale",       grad:"linear-gradient(135deg,#7c5cff,#ff5c8a)" },

  // ---- Body Care ----
  { id:17, name:"Shea Butter Body Cream",             cat:"Body Care", sub:"Body Care", emoji:"🧴", price:13.99, old:null,  rating:4.7, reviews:754,  tag:null,         grad:"linear-gradient(135deg,#f5b544,#ff5c8a)" },
  { id:18, name:"Natural Soap Bar Set (4×)",          cat:"Body Care", sub:"Body Care", emoji:"🧼", price:9.99,  old:13.99, rating:4.6, reviews:1590, tag:"Bestseller", grad:"linear-gradient(135deg,#34d399,#22d3ee)" },

  // ---- Article de bazar ----
  { id:19, name:"Kitchen Utensil Set (6 pcs)",        cat:"Article de bazar", sub:"Bazar", emoji:"🍴", price:16.99, old:null,  rating:4.5, reviews:398, tag:null,   grad:"linear-gradient(135deg,#22d3ee,#7c5cff)" },
  { id:20, name:"Stainless Steel Water Bottle",       cat:"Article de bazar", sub:"Bazar", emoji:"🍶", price:12.99, old:null,  rating:4.6, reviews:531, tag:null,   grad:"linear-gradient(135deg,#6366f1,#22d3ee)" },
  { id:21, name:"Home Storage Basket Set (3×)",       cat:"Article de bazar", sub:"Bazar", emoji:"🧺", price:19.99, old:26.99, rating:4.7, reviews:287, tag:"Sale", grad:"linear-gradient(135deg,#f97316,#f5b544)" },
];

export const CATEGORIES = ["All", "Phone Accessories", "Forever Living", "Clothing", "Body Care", "Article de bazar"];

// Prices in euros, French formatting (e.g. "8,99 €").
export const money = (n) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
