import { money } from "../data/products";
import { Lock } from "./Icons";

export default function CartDrawer({ open, onClose, items, setQty, remove, subtotal, shipping, tax, total, onCheckout }) {
  return (
    <>
      <div className={"overlay" + (open ? " show" : "")} onClick={onClose}></div>
      <aside className={"drawer" + (open ? " show" : "")}>
        <div className="drawer-head">
          <h3>Your Cart {items.length > 0 && <span style={{ color: "var(--muted)", fontWeight: 600 }}>({items.reduce((a, b) => a + b.qty, 0)})</span>}</h3>
          <button className="x" onClick={onClose}>✕</button>
        </div>
        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty">
              <div className="big">🛒</div>
              <div><b style={{ color: "var(--txt)" }}>Your cart is empty</b><br />Add some products to get started.</div>
              <button className="btn btn-ghost" onClick={onClose}>Continue shopping</button>
            </div>
          ) : items.map((it) => (
            <div className="line" key={it.id}>
              <div className="lt" style={{ background: "#fff" }}>{it.img ? <img src={it.img} alt="" /> : "🛍️"}</div>
              <div className="li">
                <h4>{it.name}</h4>
                <div className="lc">{it.cat}</div>
                <div className="qty">
                  <button onClick={() => setQty(it.id, it.qty - 1)}>−</button>
                  <span>{it.qty}</span>
                  <button onClick={() => setQty(it.id, it.qty + 1)}>+</button>
                </div>
              </div>
              <div className="lp">
                <b>{money(it.price * it.qty)}</b>
                <button onClick={() => remove(it.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <div className="row"><span>Shipping</span><span>{shipping === 0 ? "Free" : money(shipping)}</span></div>
            <div className="row"><span>VAT (20%)</span><span>{money(tax)}</span></div>
            <div className="row total"><span>Total</span><span>{money(total)}</span></div>
            <button className="btn btn-primary btn-block" onClick={onCheckout}>
              <Lock /> Checkout · {money(total)}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
