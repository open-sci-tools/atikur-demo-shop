export const PRODUCTS = [
  { id:1, name:"Aurora Wireless Headphones", cat:"Audio", emoji:"🎧", price:249, old:329, rating:4.9, reviews:1284, tag:"Bestseller", grad:"linear-gradient(135deg,#7c5cff,#22d3ee)" },
  { id:2, name:"Pulse Pro Smartwatch", cat:"Wearables", emoji:"⌚", price:329, old:null, rating:4.8, reviews:876, tag:"New", grad:"linear-gradient(135deg,#ff5c8a,#7c5cff)" },
  { id:3, name:"Nebula Bluetooth Speaker", cat:"Audio", emoji:"🔊", price:129, old:159, rating:4.7, reviews:642, tag:"Sale", grad:"linear-gradient(135deg,#22d3ee,#34d399)" },
  { id:4, name:"Vision 4K Action Camera", cat:"Camera", emoji:"📷", price:399, old:null, rating:4.9, reviews:531, tag:null, grad:"linear-gradient(135deg,#f5b544,#ff5c8a)" },
  { id:5, name:"Halo Smart Home Hub", cat:"Home", emoji:"🏠", price:179, old:219, rating:4.6, reviews:398, tag:"Sale", grad:"linear-gradient(135deg,#34d399,#22d3ee)" },
  { id:6, name:"Ember Wireless Earbuds", cat:"Audio", emoji:"🎵", price:149, old:null, rating:4.8, reviews:2103, tag:"Bestseller", grad:"linear-gradient(135deg,#7c5cff,#ff5c8a)" },
  { id:7, name:"Quantum Mechanical Keyboard", cat:"Accessories", emoji:"⌨️", price:189, old:229, rating:4.9, reviews:754, tag:"Sale", grad:"linear-gradient(135deg,#6366f1,#22d3ee)" },
  { id:8, name:"Flux Fast Wireless Charger", cat:"Accessories", emoji:"🔋", price:59, old:79, rating:4.5, reviews:1590, tag:null, grad:"linear-gradient(135deg,#f97316,#f5b544)" },
  { id:9, name:"Orbit VR Headset", cat:"Wearables", emoji:"🥽", price:449, old:null, rating:4.7, reviews:287, tag:"New", grad:"linear-gradient(135deg,#22d3ee,#7c5cff)" },
  { id:10, name:"Lumen Smart Desk Lamp", cat:"Home", emoji:"💡", price:89, old:109, rating:4.6, reviews:456, tag:null, grad:"linear-gradient(135deg,#f5b544,#34d399)" },
  { id:11, name:"Cinema Portable Projector", cat:"Home", emoji:"📽️", price:279, old:349, rating:4.7, reviews:341, tag:"Sale", grad:"linear-gradient(135deg,#ff5c8a,#6366f1)" },
  { id:12, name:"Terra Rugged Power Bank", cat:"Accessories", emoji:"⚡", price:69, old:null, rating:4.8, reviews:1876, tag:"Bestseller", grad:"linear-gradient(135deg,#34d399,#7c5cff)" },
];

export const CATEGORIES = ["All","Audio","Wearables","Home","Camera","Accessories"];

export const money = (n) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
