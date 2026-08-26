import { useLocale } from "../data/locale.jsx";

export default function ProductCard({ p, onAdd, fav, onFav }) {
  const { money, tc, t } = useLocale();
  return (
    <div className="card">
      <div className="thumb" style={{ background: p.grad }}>
        {p.img ? (
          <img className="ph" src={p.img} alt={p.name} loading="lazy" decoding="async" />
        ) : (
          <span className="em">🛍️</span>
        )}
        {p.tag && <span className={"tag" + (p.tag === "Sale" ? " sale" : "")}>{p.tag}</span>}
        <button className="fav" onClick={() => onFav(p.id)} title="Save">{fav ? "❤️" : "🤍"}</button>
      </div>
      <div className="body">
        <span className="cat">{tc(p.sub || p.cat)}</span>
        <h3 title={p.name}>{p.name}</h3>
        <a className="src" href={p.url} target="_blank" rel="noreferrer">{t("view_ebay")}</a>
        <div className="foot">
          <div className="price"><b>{money(p.price)}</b>{p.old && <s>{money(p.old)}</s>}</div>
          <button className="add" onClick={() => onAdd(p)} title="Add to cart">+</button>
        </div>
      </div>
    </div>
  );
}
