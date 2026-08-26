import { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES, SUBCATEGORIES } from "./data/products";
import { useLocale, LANGS, CURRENCIES } from "./data/locale.jsx";
import { Cart } from "./components/Icons";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./components/Checkout";
import { useToasts } from "./hooks/useToasts";

export default function App() {
  const [cat, setCat] = useState("All");
  const [sub, setSub] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [favs, setFavs] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const { toasts, push } = useToasts();
  const { t, money, tc, lang, setLang, cur, setCur, ratesDate } = useLocale();

  const PER_PAGE = 48;

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = PRODUCTS.filter(
      (p) =>
        (cat === "All" || p.cat === cat) &&
        (sub === "All" || p.sub === sub) &&
        (!needle || p.name.toLowerCase().includes(needle))
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return list;
  }, [cat, sub, q, sort]);

  const visible = shown.slice(0, page * PER_PAGE);

  const pickCat = (c) => { setCat(c); setSub("All"); setPage(1); };
  const pickSub = (s) => { setSub(s); setPage(1); };
  const search = (v) => { setQ(v); setPage(1); };

  const add = (p) => {
    setCart((c) => {
      const ex = c.find((x) => x.id === p.id);
      if (ex) return c.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
      return [...c, { ...p, qty: 1 }];
    });
    push(t("added", { x: p.name }));
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
  const onPaid = () => { setCart([]); push(t("paid_toast")); };

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <div className="logo"><span className="mark">C</span> ClickFR</div>
          <nav className="nav-links">
            <a href="#shop">{t("nav_shop")}</a>
            <a href="#featured">{t("nav_featured")}</a>
            <a href="#deals">{t("nav_deals")}</a>
            <a href="#about">{t("nav_about")}</a>
          </nav>
          <div className="nav-right">
            <span className="pill hide-sm" style={{ color: "var(--muted)" }}>{t("free_ship", { x: money(50) })}</span>
            <select className="picker" value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language">
              {LANGS.map((l) => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
            </select>
            <select className="picker" value={cur} onChange={(e) => setCur(e.target.value)} aria-label="Currency">
              {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.sym} {c.code}</option>)}
            </select>
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
            <span className="pill"><span style={{ color: "var(--brand-2)" }}>✦</span> {t("hero_pill")}</span>
            <h1>{t("hero_h1a")}<br /><span className="g">{t("hero_h1b")}</span></h1>
            <p>{t("hero_p", { x: money(50) })}</p>
            <div className="hero-cta">
              <a href="#shop" className="btn btn-primary">{t("hero_cta1")}</a>
              <a href="#deals" className="btn btn-ghost">{t("hero_cta2")}</a>
            </div>
            <div className="hero-stats">
              <div className="s"><b>{PRODUCTS.length.toLocaleString("fr-FR")}</b><span>{t("stat_products")}</span></div>
              <div className="s"><b>{CATEGORIES.length - 1}</b><span>{t("stat_cats")}</span></div>
              <div className="s"><b>24/7</b><span>{t("stat_support")}</span></div>
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
          <div className="f"><span className="ic">🚚</span><div><b>{t("f1t")}</b><span>{t("f1s", { x: money(50) })}</span></div></div>
          <div className="f"><span className="ic">↩️</span><div><b>{t("f2t")}</b><span>{t("f2s")}</span></div></div>
          <div className="f"><span className="ic">🔒</span><div><b>{t("f3t")}</b><span>{t("f3s")}</span></div></div>
          <div className="f"><span className="ic">🎁</span><div><b>{t("f4t")}</b><span>{t("f4s")}</span></div></div>
        </div>
      </section>

      <section className="wrap sec" id="shop">
        <div className="sec-head">
          <div>
            <span className="eyebrow">{t("sec_eyebrow")}</span>
            <h2>{t("sec_h2")}</h2>
            <p>{t("sec_count", { n: shown.length, t: PRODUCTS.length })}<br /><span className="rates">{t("rates_note", { d: ratesDate })}</span></p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <div className="search-wrap">
              <span className="si">🔍</span>
              <input className="inp search" placeholder={t("search_ph")} value={q} onChange={(e) => search(e.target.value)} />
            </div>
            {cat !== "All" && SUBCATEGORIES[cat] && SUBCATEGORIES[cat].length > 1 && (
              <select className="inp" style={{ width: "auto", padding: "9px 12px", cursor: "pointer" }} value={sub} onChange={(e) => pickSub(e.target.value)}>
                <option value="All">{t("sub_all", { c: tc(cat) })}</option>
                {SUBCATEGORIES[cat].map((sc) => <option key={sc} value={sc}>{tc(sc)}</option>)}
              </select>
            )}
            <select className="inp" style={{ width: "auto", padding: "9px 12px", cursor: "pointer" }} value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">{t("sort_featured")}</option>
              <option value="low">{t("sort_low")}</option>
              <option value="high">{t("sort_high")}</option>
              <option value="name">{t("sort_name")}</option>
            </select>
            </div>
          </div>
        </div>
        <div className="filters chip-row">
          {CATEGORIES.map((c) => (
            <button key={c} className={"chip" + (cat === c ? " active" : "")} onClick={() => pickCat(c)}>{c === "All" ? t("cat_all") : tc(c)}</button>
          ))}
        </div>
        <div className="grid" id="featured">
          {visible.map((p) => (
            <ProductCard key={p.id} p={p} onAdd={add} fav={favs.includes(p.id)} onFav={toggleFav} />
          ))}
        </div>
        {visible.length < shown.length && (
          <div className="more-wrap">
            <button className="btn btn-ghost" onClick={() => setPage((n) => n + 1)}>
              {t("load_more", { n: shown.length - visible.length })}
            </button>
          </div>
        )}
        {shown.length === 0 && (
          <p style={{ color: "var(--muted)", textAlign: "center", padding: "40px 0" }}>
            {t("no_result", { q })}
          </p>
        )}
      </section>

      <section className="wrap sec" id="deals">
        <div className="deals-banner">
          <div>
            <span className="eyebrow">{t("deals_eyebrow")}</span>
            <h2 style={{ fontSize: 28, margin: "8px 0 6px", fontWeight: 800 }}>{t("deals_h2")}</h2>
            <p style={{ color: "var(--muted)", margin: 0, maxWidth: 440 }}>{t("deals_p", { x: money(10) })}</p>
          </div>
          <button className="btn btn-primary" onClick={() => { pickCat("All"); setSort("low"); document.getElementById("shop").scrollIntoView({ behavior: "smooth" }); }}>{t("deals_btn")}</button>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="logo" style={{ marginBottom: 12 }}><span className="mark">C</span> ClickFR</div>
              <p style={{ fontSize: 13.5, maxWidth: 300, margin: 0 }}>{t("foot_blurb")}</p>
              <div style={{ display: "flex", gap: 10, marginTop: 16, fontSize: 20 }}>
                <span>📸</span><span>🐦</span><span>▶️</span><span>💼</span>
              </div>
            </div>
            <div><h4>{t("foot_shop")}</h4><ul><li><a href="#shop">{t("foot_all")}</a></li><li><a href="#deals">{t("nav_deals")}</a></li><li><a href="https://www.ebay.fr/str/rockfr" target="_blank" rel="noreferrer">{t("foot_ebay")}</a></li><li><a href="#shop">{t("foot_cats")}</a></li></ul></div>
            <div><h4>{t("foot_support")}</h4><ul><li><a href="#about">{t("foot_contact")}</a></li><li><a href="#about">{t("foot_shipping")}</a></li><li><a href="#about">{t("foot_returns")}</a></li><li><a href="#about">{t("foot_warranty")}</a></li></ul></div>
            <div><h4>{t("foot_company")}</h4><ul><li><a href="#about">{t("foot_about")}</a></li><li><a href="#about">{t("foot_careers")}</a></li><li><a href="#about">{t("foot_press")}</a></li><li><a href="#about">{t("foot_privacy")}</a></li></ul></div>
          </div>
          <div className="foot-bottom">
            <span>{t("foot_rights")}</span>
            <span style={{ display: "flex", gap: 10, alignItems: "center" }}>{t("foot_accept")} 💳 VISA · Mastercard · 🅿️ PayPal ·  Pay</span>
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
