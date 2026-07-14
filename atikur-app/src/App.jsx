import { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES, money } from "./data/products";
import { Cart } from "./components/Icons";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./components/Checkout";
import { useToasts } from "./hooks/useToasts";

export default function App() {
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState([]);
  const [favs, setFavs] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const { toasts, push } = useToasts();

  const shown = useMemo(() => {
    let list = PRODUCTS.filter((p) => cat === "All" || p.cat === cat);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, sort]);

  const add = (p) => {
    setCart((c) => {
      const ex = c.find((x) => x.id === p.id);
      if (ex) return c.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
      return [...c, { ...p, qty: 1 }];
    });
    push(`Added “${p.name}”`);
  };
  const setQty = (id, q) => setCart((c) => (q <= 0 ? c.filter((x) => x.id !== id) : c.map((x) => (x.id === id ? { ...x, qty: q } : x))));
  const remove = (id) => setCart((c) => c.filter((x) => x.id !== id));
  const toggleFav = (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const count = cart.reduce((a, b) => a + b.qty, 0);
  const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const tax = +(subtotal * 0.20).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  const openCheckout = () => { setDrawer(false); setCheckout(true); };
  const onPaid = () => { setCart([]); push("Payment complete ✓"); };

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <div className="logo"><span className="mark">C</span> ClickFR</div>
          <nav className="nav-links">
            <a href="#shop">Shop</a>
            <a href="#featured">Featured</a>
            <a href="#deals">Deals</a>
            <a href="#about">About</a>
          </nav>
          <div className="nav-right">
            <span className="pill" style={{ color: "var(--muted)" }}>🚚 Free shipping over €50</span>
            <button className="cart-btn" onClick={() => setDrawer(true)} title="Cart">
              <Cart />
              {count > 0 && <span className="cart-count">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="pill"><span style={{ color: "var(--brand-2)" }}>✦</span> New arrivals every week</span>
            <h1>Everything you need,<br /><span className="g">one click away.</span></h1>
            <p>Phone accessories, Forever Living wellness, clothing and home essentials — curated and delivered fast. Free shipping over €50, easy returns, and a demo checkout you can try right now.</p>
            <div className="hero-cta">
              <a href="#shop" className="btn btn-primary">Shop the collection →</a>
              <a href="#deals" className="btn btn-ghost">View today's deals</a>
            </div>
            <div className="hero-stats">
              <div className="s"><b>50k+</b><span>Happy customers</span></div>
              <div className="s"><b>4.9★</b><span>Average rating</span></div>
              <div className="s"><b>24/7</b><span>Support</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <span className="float">🛍️</span>
            <div className="badge b1"><span className="dot"></span> In stock · ships today</div>
            <div className="badge b2">⭐ 4.9 · 12,480 reviews</div>
          </div>
        </div>
      </section>

      <section className="wrap sec" id="about">
        <div className="feat">
          <div className="f"><span className="ic">🚚</span><div><b>Free fast shipping</b><span>On all orders over €50</span></div></div>
          <div className="f"><span className="ic">↩️</span><div><b>30-day returns</b><span>No questions asked</span></div></div>
          <div className="f"><span className="ic">🔒</span><div><b>Secure checkout</b><span>Encrypted demo payments</span></div></div>
          <div className="f"><span className="ic">🎁</span><div><b>2-year warranty</b><span>On every product</span></div></div>
        </div>
      </section>

      <section className="wrap sec" id="shop">
        <div className="sec-head">
          <div>
            <span className="eyebrow">Our collection</span>
            <h2>Shop everything</h2>
            <p>{shown.length} products · curated for the way you live</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
            <div className="filters">
              {CATEGORIES.map((c) => (
                <button key={c} className={"chip" + (cat === c ? " active" : "")} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
            <select className="inp" style={{ width: "auto", padding: "9px 12px", cursor: "pointer" }} value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Sort: Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
        </div>
        <div className="grid" id="featured">
          {shown.map((p) => (
            <ProductCard key={p.id} p={p} onAdd={add} fav={favs.includes(p.id)} onFav={toggleFav} />
          ))}
        </div>
      </section>

      <section className="wrap sec" id="deals">
        <div className="deals-banner">
          <div>
            <span className="eyebrow">Limited time</span>
            <h2 style={{ fontSize: 28, margin: "8px 0 6px", fontWeight: 800 }}>Up to 30% off phone accessories 📱</h2>
            <p style={{ color: "var(--muted)", margin: 0, maxWidth: 440 }}>Save on cables, chargers, power banks and cases. Deals end soon — add to cart and check out with the demo payment.</p>
          </div>
          <button className="btn btn-primary" onClick={() => { setCat("Phone Accessories"); document.getElementById("shop").scrollIntoView({ behavior: "smooth" }); }}>Shop accessory deals →</button>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="logo" style={{ marginBottom: 12 }}><span className="mark">C</span> ClickFR</div>
              <p style={{ fontSize: 13.5, maxWidth: 300, margin: 0 }}>Phone accessories, wellness, clothing &amp; home essentials — all in one place. This is a demo store built for showcase purposes.</p>
              <div style={{ display: "flex", gap: 10, marginTop: 16, fontSize: 20 }}>
                <span>📸</span><span>🐦</span><span>▶️</span><span>💼</span>
              </div>
            </div>
            <div><h4>Shop</h4><ul><li><a href="#shop">All products</a></li><li><a href="#deals">Deals</a></li><li><a href="#shop">Phone Accessories</a></li><li><a href="#shop">Clothing</a></li></ul></div>
            <div><h4>Support</h4><ul><li><a href="#">Contact us</a></li><li><a href="#">Shipping</a></li><li><a href="#">Returns</a></li><li><a href="#">Warranty</a></li></ul></div>
            <div><h4>Company</h4><ul><li><a href="#">About</a></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li><li><a href="#">Privacy</a></li></ul></div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 ClickFR. All rights reserved · Demo store.</span>
            <span style={{ display: "flex", gap: 10, alignItems: "center" }}>We accept: 💳 VISA · Mastercard · 🅿️ PayPal ·  Pay</span>
          </div>
        </div>
      </footer>

      <CartDrawer open={drawer} onClose={() => setDrawer(false)} items={cart} setQty={setQty} remove={remove}
        subtotal={subtotal} shipping={shipping} tax={tax} total={total} onCheckout={openCheckout} />
      <Checkout open={checkout} onClose={() => setCheckout(false)} items={cart}
        subtotal={subtotal} shipping={shipping} tax={tax} total={total} onSuccess={onPaid} />
      <div className="toasts">
        {toasts.map((t) => (
          <div className="toast" key={t.id}><span className="ti">✓</span>{t.msg}</div>
        ))}
      </div>
    </>
  );
}
