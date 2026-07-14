import { useState, useEffect } from "react";
import { money } from "../data/products";
import { Lock } from "./Icons";

function detectBrand(num) {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n)) return "VISA";
  if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return "MASTERCARD";
  if (/^3[47]/.test(n)) return "AMEX";
  if (/^6/.test(n)) return "DISCOVER";
  return "CARD";
}

export default function Checkout({ open, onClose, items, subtotal, shipping, tax, total, onSuccess }) {
  const [stage, setStage] = useState("form"); // form | processing | done
  const [method, setMethod] = useState("card");
  const [order, setOrder] = useState(null);
  const [f, setF] = useState({ name: "", email: "", address: "", city: "", zip: "", country: "United States", cardName: "", card: "", exp: "", cvc: "" });
  const [errs, setErrs] = useState({});

  useEffect(() => { if (open) { setStage("form"); setErrs({}); } }, [open]);

  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const onCard = (v) => set("card", v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim());
  const onExp = (v) => {
    let d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length >= 3) d = d.slice(0, 2) + "/" + d.slice(2);
    set("exp", d);
  };
  const onCvc = (v) => set("cvc", v.replace(/\D/g, "").slice(0, 4));
  const brand = detectBrand(f.card);

  const validate = () => {
    const e = {};
    if (!f.name.trim()) e.name = "Enter your full name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) e.email = "Enter a valid email";
    if (!f.address.trim()) e.address = "Enter your address";
    if (!f.city.trim()) e.city = "Required";
    if (!f.zip.trim()) e.zip = "Required";
    if (method === "card") {
      if (!f.cardName.trim()) e.cardName = "Name on card required";
      if (f.card.replace(/\s/g, "").length < 15) e.card = "Enter a valid card number";
      if (!/^\d{2}\/\d{2}$/.test(f.exp)) e.exp = "MM/YY";
      if (f.cvc.length < 3) e.cvc = "CVC";
    }
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const pay = () => {
    if (!validate()) return;
    setStage("processing");
    setTimeout(() => {
      const id = "ATK-" + Math.floor(100000 + ((subtotal * 7 + total * 13 + items.length * 4099) % 900000));
      const ord = { id, total, email: f.email, method, last4: method === "card" ? f.card.replace(/\s/g, "").slice(-4) : "----", eta: "3–5 business days" };
      setOrder(ord);
      setStage("done");
      onSuccess(ord);
    }, 2400);
  };

  const stepIndex = stage === "form" ? 1 : stage === "processing" ? 2 : 3;

  return (
    <div className={"modal" + (open ? " show" : "")}>
      <div className={"overlay" + (open ? " show" : "")} onClick={stage !== "processing" ? onClose : undefined} style={{ position: "absolute" }}></div>
      <div className="sheet" style={{ position: "relative" }}>
        {stage === "done" ? (
          <div className="success">
            <div className="check"><div className="ring">✓</div></div>
            <h3>Payment successful 🎉</h3>
            <p>Thank you for your order! A confirmation has been sent to <b style={{ color: "var(--txt)" }}>{order.email}</b>.</p>
            <div className="order-box">
              <div className="ci"><span>Order number</span><b>{order.id}</b></div>
              <div className="ci"><span>Amount paid</span><b>{money(order.total)}</b></div>
              <div className="ci"><span>Payment</span><b>{order.method === "card" ? `Card •••• ${order.last4}` : order.method === "paypal" ? "PayPal" : "Apple Pay"}</b></div>
              <div className="ci"><span>Estimated delivery</span><b>{order.eta}</b></div>
            </div>
            <button className="btn btn-primary" onClick={onClose} style={{ minWidth: 200 }}>Continue shopping</button>
            <div className="demo-note">This is a demo store — no real payment was processed and no real order was placed.</div>
          </div>
        ) : (
          <>
            <div className="co-form">
              <div className="co-head">
                <h3>Checkout</h3>
                <button className="x" onClick={onClose} disabled={stage === "processing"}>✕</button>
              </div>
              <div className="steps">
                <div className={"st" + (stepIndex >= 1 ? " on" : "")}></div>
                <div className={"st" + (stepIndex >= 2 ? " on" : "")}></div>
                <div className={"st" + (stepIndex >= 3 ? " on" : "")}></div>
              </div>

              <div style={{ fontSize: 15, fontWeight: 800, margin: "4px 0 2px" }}>Shipping details</div>
              <label className="fl">Full name</label>
              <input className={"inp" + (errs.name ? " err" : "")} placeholder="Atikur Rahman" value={f.name} onChange={(e) => set("name", e.target.value)} />
              {errs.name && <div className="errline">{errs.name}</div>}

              <label className="fl">Email address</label>
              <input className={"inp" + (errs.email ? " err" : "")} placeholder="you@example.com" value={f.email} onChange={(e) => set("email", e.target.value)} />
              {errs.email && <div className="errline">{errs.email}</div>}

              <label className="fl">Street address</label>
              <input className={"inp" + (errs.address ? " err" : "")} placeholder="123 Market Street" value={f.address} onChange={(e) => set("address", e.target.value)} />
              {errs.address && <div className="errline">{errs.address}</div>}

              <div className="fg3">
                <div>
                  <label className="fl">City</label>
                  <input className={"inp" + (errs.city ? " err" : "")} placeholder="Dhaka" value={f.city} onChange={(e) => set("city", e.target.value)} />
                  {errs.city && <div className="errline">{errs.city}</div>}
                </div>
                <div>
                  <label className="fl">ZIP</label>
                  <input className={"inp" + (errs.zip ? " err" : "")} placeholder="1207" value={f.zip} onChange={(e) => set("zip", e.target.value)} />
                  {errs.zip && <div className="errline">{errs.zip}</div>}
                </div>
                <div>
                  <label className="fl">Country</label>
                  <input className="inp" value={f.country} onChange={(e) => set("country", e.target.value)} />
                </div>
              </div>

              <div style={{ fontSize: 15, fontWeight: 800, margin: "24px 0 12px" }}>Payment method</div>
              <div className="pay-methods">
                <button className={"pm" + (method === "card" ? " on" : "")} onClick={() => setMethod("card")}><span className="pmi">💳</span>Card</button>
                <button className={"pm" + (method === "paypal" ? " on" : "")} onClick={() => setMethod("paypal")}><span className="pmi">🅿️</span>PayPal</button>
                <button className={"pm" + (method === "apple" ? " on" : "")} onClick={() => setMethod("apple")}><span className="pmi"></span>Apple Pay</button>
              </div>

              {method === "card" ? (
                <>
                  <div className="card-visual">
                    <div className="cv-top">
                      <span className="brand">ATIKUR PAY</span>
                      <span className="netw">{brand}</span>
                    </div>
                    <div className="chip-ic"></div>
                    <div className="num">{f.card || "•••• •••• •••• ••••"}</div>
                    <div className="cv-bot">
                      <div><span className="lbl">CARD HOLDER</span><span className="val">{f.cardName || "YOUR NAME"}</span></div>
                      <div><span className="lbl">EXPIRES</span><span className="val">{f.exp || "MM/YY"}</span></div>
                    </div>
                  </div>
                  <label className="fl">Name on card</label>
                  <input className={"inp" + (errs.cardName ? " err" : "")} placeholder="ATIKUR RAHMAN" value={f.cardName} onChange={(e) => set("cardName", e.target.value.toUpperCase())} />
                  {errs.cardName && <div className="errline">{errs.cardName}</div>}
                  <label className="fl">Card number</label>
                  <input className={"inp" + (errs.card ? " err" : "")} placeholder="4242 4242 4242 4242" inputMode="numeric" value={f.card} onChange={(e) => onCard(e.target.value)} />
                  {errs.card && <div className="errline">{errs.card}</div>}
                  <div className="fg2">
                    <div>
                      <label className="fl">Expiry (MM/YY)</label>
                      <input className={"inp" + (errs.exp ? " err" : "")} placeholder="12/28" inputMode="numeric" value={f.exp} onChange={(e) => onExp(e.target.value)} />
                      {errs.exp && <div className="errline">{errs.exp}</div>}
                    </div>
                    <div>
                      <label className="fl">CVC</label>
                      <input className={"inp" + (errs.cvc ? " err" : "")} placeholder="123" inputMode="numeric" value={f.cvc} onChange={(e) => onCvc(e.target.value)} />
                      {errs.cvc && <div className="errline">{errs.cvc}</div>}
                    </div>
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--muted-2)", marginTop: 10 }}>💡 Tip: try card <b style={{ color: "var(--muted)" }}>4242 4242 4242 4242</b>, any future date &amp; CVC.</div>
                </>
              ) : (
                <div style={{ padding: "22px", textAlign: "center", background: "var(--panel)", border: "1px solid var(--line-2)", borderRadius: 14, marginTop: 6 }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>{method === "paypal" ? "🅿️" : ""}</div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{method === "paypal" ? "Pay with PayPal" : "Pay with Apple Pay"}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>You'll confirm the (demo) payment on the next step.</div>
                </div>
              )}
            </div>

            <div className="co-side">
              <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 14 }}>Order summary</div>
              <div className="co-summary">
                {items.map((it) => (
                  <div className="ci" key={it.id}>
                    <span style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ fontSize: 18 }}>{it.emoji}</span>{it.name} × {it.qty}</span>
                    <b>{money(it.price * it.qty)}</b>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid var(--line)", margin: "14px 0", paddingTop: 14 }}>
                <div className="ci"><span>Subtotal</span><b>{money(subtotal)}</b></div>
                <div className="ci"><span>Shipping</span><b>{shipping === 0 ? "Free" : money(shipping)}</b></div>
                <div className="ci"><span>Tax</span><b>{money(tax)}</b></div>
              </div>
              <div className="ci" style={{ fontSize: 20, fontWeight: 800, borderTop: "1px solid var(--line)", paddingTop: 14 }}>
                <span style={{ color: "var(--txt)" }}>Total</span><b>{money(total)}</b>
              </div>

              <button className="btn btn-primary btn-block" style={{ marginTop: 18 }} onClick={pay} disabled={stage === "processing"}>
                {stage === "processing" ? <><span className="spin"></span> Processing…</> : <><Lock /> Pay {money(total)}</>}
              </button>

              <div className="secure"><Lock s={14} /> <span>Secured with 256-bit SSL encryption (demo)</span></div>
              <div className="demo-note">🔒 This is a <b style={{ color: "var(--muted)" }}>demo checkout</b>. No real card is charged and no data leaves your browser.</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
