import { useState, useEffect } from "react";
import { Lock } from "./Icons";
import { useLocale, COUNTRIES } from "../data/locale.jsx";

function detectBrand(num) {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n)) return "VISA";
  if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return "MASTERCARD";
  if (/^3[47]/.test(n)) return "AMEX";
  if (/^6/.test(n)) return "DISCOVER";
  return "CARD";
}

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function Checkout({ open, onClose, items, subtotal, shipping, tax, total, onSuccess }) {
  const { t, money } = useLocale();
  // address -> payment -> processing -> done
  const [stage, setStage] = useState("address");
  const [method, setMethod] = useState("card");
  const [order, setOrder] = useState(null);
  const [f, setF] = useState({
    name: "", email: "", phone: "",
    addr1: "", addr2: "", city: "", state: "", zip: "", country: "France",
    cardName: "", card: "", exp: "", cvc: "", paypal: "",
  });
  const [errs, setErrs] = useState({});

  useEffect(() => { if (open) { setStage("address"); setErrs({}); } }, [open]);

  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const onCard = (v) => set("card", v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim());
  const onExp = (v) => {
    let d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length >= 3) d = d.slice(0, 2) + "/" + d.slice(2);
    set("exp", d);
  };
  const onCvc = (v) => set("cvc", v.replace(/\D/g, "").slice(0, 4));
  const brand = detectBrand(f.card);

  const validateAddress = () => {
    const e = {};
    if (!f.name.trim()) e.name = t("e_name");
    if (!EMAIL.test(f.email)) e.email = t("e_email");
    if (f.phone.replace(/\D/g, "").length < 6) e.phone = t("e_phone");
    if (!f.addr1.trim()) e.addr1 = t("e_addr");
    if (!f.city.trim()) e.city = t("e_city");
    if (!f.zip.trim()) e.zip = t("e_zip");
    if (!f.country.trim()) e.country = t("e_country");
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e = {};
    if (method === "card") {
      if (!f.cardName.trim()) e.cardName = t("e_cardname");
      if (f.card.replace(/\s/g, "").length < 15) e.card = t("e_card");
      if (!/^\d{2}\/\d{2}$/.test(f.exp)) e.exp = t("e_exp");
      if (f.cvc.length < 3) e.cvc = t("e_cvc");
    }
    if (method === "paypal" && !EMAIL.test(f.paypal)) e.paypal = t("e_paypal");
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const toPayment = () => { if (validateAddress()) { setErrs({}); setStage("payment"); } };

  const addressLine = [f.addr1, f.addr2, [f.zip, f.city].filter(Boolean).join(" "), f.state, f.country]
    .filter((x) => x && x.trim()).join(", ");

  const pay = () => {
    if (!validatePayment()) return;
    setStage("processing");
    setTimeout(() => {
      const id = "ATK-" + Math.floor(100000 + ((subtotal * 7 + total * 13 + items.length * 4099) % 900000));
      const ord = {
        id, total, email: f.email, method, address: addressLine, name: f.name,
        last4: method === "card" ? f.card.replace(/\s/g, "").slice(-4) : "----",
      };
      setOrder(ord);
      setStage("done");
      onSuccess(ord);
    }, 2400);
  };

  const stepIndex = stage === "address" ? 1 : stage === "payment" ? 2 : stage === "processing" ? 2 : 3;
  const busy = stage === "processing";

  return (
    <div className={"modal" + (open ? " show" : "")}>
      <div className={"overlay" + (open ? " show" : "")} onClick={!busy ? onClose : undefined} style={{ position: "absolute" }}></div>
      <div className="sheet" style={{ position: "relative" }}>
        {stage === "done" ? (
          <div className="success">
            <div className="check"><div className="ring">✓</div></div>
            <h3>{t("ok_title")}</h3>
            <p>{t("ok_p", { x: order.email })}</p>
            <div className="order-box">
              <div className="ci"><span>{t("ok_order")}</span><b>{order.id}</b></div>
              <div className="ci"><span>{t("ok_amount")}</span><b>{money(order.total)}</b></div>
              <div className="ci"><span>{t("ok_pay")}</span><b>{order.method === "card" ? `${t("pm_card")} •••• ${order.last4}` : order.method === "paypal" ? "PayPal" : "Apple Pay"}</b></div>
              <div className="ci"><span>{t("ok_ship")}</span><b style={{ textAlign: "right", maxWidth: 260 }}>{order.name} — {order.address}</b></div>
              <div className="ci"><span>{t("ok_eta")}</span><b>{t("eta_val")}</b></div>
            </div>
            <button className="btn btn-primary" onClick={onClose} style={{ minWidth: 200 }}>{t("ok_btn")}</button>
            <div className="demo-note">{t("demo_note")}</div>
          </div>
        ) : (
          <>
            <div className="co-form">
              <div className="co-head">
                <h3>{t("co_title")}</h3>
                <button className="x" onClick={onClose} disabled={busy}>✕</button>
              </div>
              <div className="steps">
                <div className={"st" + (stepIndex >= 1 ? " on" : "")}></div>
                <div className={"st" + (stepIndex >= 2 ? " on" : "")}></div>
                <div className={"st" + (stepIndex >= 3 ? " on" : "")}></div>
              </div>
              <div className="step-labels">
                <span className={stepIndex === 1 ? "on" : ""}>1. {t("co_step1")}</span>
                <span className={stepIndex === 2 ? "on" : ""}>2. {t("co_step2")}</span>
                <span className={stepIndex === 3 ? "on" : ""}>3. {t("co_step3")}</span>
              </div>

              {stage === "address" ? (
                <>
                  <div style={{ fontSize: 15, fontWeight: 800, margin: "4px 0 2px" }}>{t("co_addr_head")}</div>

                  <label className="fl">{t("fl_name")}</label>
                  <input className={"inp" + (errs.name ? " err" : "")} autoComplete="name" placeholder="Atikur Rahman" value={f.name} onChange={(e) => set("name", e.target.value)} />
                  {errs.name && <div className="errline">{errs.name}</div>}

                  <div className="fg2">
                    <div>
                      <label className="fl">{t("fl_email")}</label>
                      <input className={"inp" + (errs.email ? " err" : "")} autoComplete="email" placeholder="you@example.com" value={f.email} onChange={(e) => set("email", e.target.value)} />
                      {errs.email && <div className="errline">{errs.email}</div>}
                    </div>
                    <div>
                      <label className="fl">{t("fl_phone")}</label>
                      <input className={"inp" + (errs.phone ? " err" : "")} autoComplete="tel" placeholder="+33 6 12 34 56 78" value={f.phone} onChange={(e) => set("phone", e.target.value)} />
                      {errs.phone && <div className="errline">{errs.phone}</div>}
                    </div>
                  </div>

                  <label className="fl">{t("fl_addr1")}</label>
                  <input className={"inp" + (errs.addr1 ? " err" : "")} autoComplete="address-line1" placeholder="12 rue de la République" value={f.addr1} onChange={(e) => set("addr1", e.target.value)} />
                  {errs.addr1 && <div className="errline">{errs.addr1}</div>}

                  <label className="fl">{t("fl_addr2")}</label>
                  <input className="inp" autoComplete="address-line2" placeholder="Bât. B, appt 21" value={f.addr2} onChange={(e) => set("addr2", e.target.value)} />

                  <div className="fg3">
                    <div>
                      <label className="fl">{t("fl_city")}</label>
                      <input className={"inp" + (errs.city ? " err" : "")} autoComplete="address-level2" placeholder="Paris" value={f.city} onChange={(e) => set("city", e.target.value)} />
                      {errs.city && <div className="errline">{errs.city}</div>}
                    </div>
                    <div>
                      <label className="fl">{t("fl_zip")}</label>
                      <input className={"inp" + (errs.zip ? " err" : "")} autoComplete="postal-code" placeholder="75011" value={f.zip} onChange={(e) => set("zip", e.target.value)} />
                      {errs.zip && <div className="errline">{errs.zip}</div>}
                    </div>
                    <div>
                      <label className="fl">{t("fl_state")}</label>
                      <input className="inp" autoComplete="address-level1" placeholder="Île-de-France" value={f.state} onChange={(e) => set("state", e.target.value)} />
                    </div>
                  </div>

                  <label className="fl">{t("fl_country")}</label>
                  <select className={"inp" + (errs.country ? " err" : "")} autoComplete="country-name" value={f.country} onChange={(e) => set("country", e.target.value)}>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errs.country && <div className="errline">{errs.country}</div>}

                  <button className="btn btn-primary btn-block" style={{ marginTop: 20 }} onClick={toPayment}>{t("co_next")}</button>
                </>
              ) : (
                <>
                  <div className="ship-recap">
                    <div>
                      <span className="lbl">{t("co_ship_to")}</span>
                      <b>{f.name}</b>
                      <span className="addr">{addressLine}</span>
                      <span className="addr">{f.email} · {f.phone}</span>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={() => setStage("address")} disabled={busy}>{t("co_edit")}</button>
                  </div>

                  <div style={{ fontSize: 15, fontWeight: 800, margin: "20px 0 12px" }}>{t("co_pay_head")}</div>
                  <div className="pay-methods">
                    <button className={"pm" + (method === "card" ? " on" : "")} onClick={() => setMethod("card")}><span className="pmi">💳</span>{t("pm_card")}</button>
                    <button className={"pm" + (method === "paypal" ? " on" : "")} onClick={() => setMethod("paypal")}><span className="pmi">🅿️</span>{t("pm_paypal")}</button>
                    <button className={"pm" + (method === "apple" ? " on" : "")} onClick={() => setMethod("apple")}><span className="pmi"></span>{t("pm_apple")}</button>
                  </div>

                  {method === "card" && (
                    <>
                      <div className="card-visual">
                        <div className="cv-top">
                          <span className="brand">CLICKFR PAY</span>
                          <span className="netw">{brand}</span>
                        </div>
                        <div className="chip-ic"></div>
                        <div className="num">{f.card || "•••• •••• •••• ••••"}</div>
                        <div className="cv-bot">
                          <div><span className="lbl">CARD HOLDER</span><span className="val">{f.cardName || f.name.toUpperCase() || "YOUR NAME"}</span></div>
                          <div><span className="lbl">EXPIRES</span><span className="val">{f.exp || "MM/YY"}</span></div>
                        </div>
                      </div>
                      <label className="fl">{t("fl_cardname")}</label>
                      <input className={"inp" + (errs.cardName ? " err" : "")} placeholder="ATIKUR RAHMAN" value={f.cardName} onChange={(e) => set("cardName", e.target.value.toUpperCase())} />
                      {errs.cardName && <div className="errline">{errs.cardName}</div>}
                      <label className="fl">{t("fl_card")}</label>
                      <input className={"inp" + (errs.card ? " err" : "")} placeholder="4242 4242 4242 4242" inputMode="numeric" value={f.card} onChange={(e) => onCard(e.target.value)} />
                      {errs.card && <div className="errline">{errs.card}</div>}
                      <div className="fg2">
                        <div>
                          <label className="fl">{t("fl_exp")}</label>
                          <input className={"inp" + (errs.exp ? " err" : "")} placeholder="12/28" inputMode="numeric" value={f.exp} onChange={(e) => onExp(e.target.value)} />
                          {errs.exp && <div className="errline">{errs.exp}</div>}
                        </div>
                        <div>
                          <label className="fl">{t("fl_cvc")}</label>
                          <input className={"inp" + (errs.cvc ? " err" : "")} placeholder="123" inputMode="numeric" value={f.cvc} onChange={(e) => onCvc(e.target.value)} />
                          {errs.cvc && <div className="errline">{errs.cvc}</div>}
                        </div>
                      </div>
                      <div style={{ fontSize: 11.5, color: "var(--muted-2)", marginTop: 10 }}>{t("card_tip")}</div>
                    </>
                  )}

                  {method === "paypal" && (
                    <div className="pay-panel">
                      <div className="pp-logo">🅿️ <b>PayPal</b></div>
                      <div style={{ fontWeight: 700, marginBottom: 4 }}>{t("paypal_t")}</div>
                      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14 }}>{t("paypal_s")}</div>
                      <label className="fl" style={{ textAlign: "left" }}>{t("paypal_acct")}</label>
                      <input className={"inp" + (errs.paypal ? " err" : "")} placeholder="you@example.com" value={f.paypal} onChange={(e) => set("paypal", e.target.value)} />
                      {errs.paypal && <div className="errline">{errs.paypal}</div>}
                    </div>
                  )}

                  {method === "apple" && (
                    <div className="pay-panel">
                      <div style={{ fontSize: 40, marginBottom: 8 }}></div>
                      <div style={{ fontWeight: 700, marginBottom: 4 }}>{t("apple_t")}</div>
                      <div style={{ fontSize: 13, color: "var(--muted)" }}>{t("apple_s")}</div>
                    </div>
                  )}

                  <button className="btn btn-ghost btn-block" style={{ marginTop: 16 }} onClick={() => setStage("address")} disabled={busy}>{t("co_back")}</button>
                </>
              )}
            </div>

            <div className="co-side">
              <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 14 }}>{t("order_summary")}</div>
              <div className="co-summary">
                {items.map((it) => (
                  <div className="ci" key={it.id}>
                    <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      {it.img ? <img src={it.img} alt="" style={{ width: 26, height: 26, objectFit: "contain", borderRadius: 6, background: "#fff", flexShrink: 0 }} /> : <span style={{ fontSize: 18 }}>🛍️</span>}
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 190 }}>{it.name}</span> × {it.qty}
                    </span>
                    <b>{money(it.price * it.qty)}</b>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid var(--line)", margin: "14px 0", paddingTop: 14 }}>
                <div className="ci"><span>{t("subtotal")}</span><b>{money(subtotal)}</b></div>
                <div className="ci"><span>{t("shipping")}</span><b>{shipping === 0 ? t("free") : money(shipping)}</b></div>
                <div className="ci"><span>{t("vat")}</span><b>{money(tax)}</b></div>
              </div>
              <div className="ci" style={{ fontSize: 20, fontWeight: 800, borderTop: "1px solid var(--line)", paddingTop: 14 }}>
                <span style={{ color: "var(--txt)" }}>{t("total")}</span><b>{money(total)}</b>
              </div>

              {stage === "address" ? (
                <button className="btn btn-primary btn-block" style={{ marginTop: 18 }} onClick={toPayment}>{t("co_next")}</button>
              ) : (
                <button className="btn btn-primary btn-block" style={{ marginTop: 18 }} onClick={pay} disabled={busy}>
                  {busy ? <><span className="spin"></span> {t("processing")}</> : <><Lock /> {t("pay_btn", { x: money(total) })}</>}
                </button>
              )}

              <div className="secure"><Lock s={14} /> <span>{t("secure")}</span></div>
              <div className="demo-note">{t("demo_note2")}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
