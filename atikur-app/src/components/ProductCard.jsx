import { money } from "../data/products";

export default function ProductCard({ p, onAdd, fav, onFav }) {
  return (
    <div className="card">
      <div className="thumb" style={{ background: p.grad }}>
        <span className="em">{p.emoji}</span>
        {p.tag && <span className={"tag" + (p.tag === "Sale" ? " sale" : "")}>{p.tag}</span>}
        <button className="fav" onClick={() => onFav(p.id)} title="Save">{fav ? "❤️" : "🤍"}</button>
      </div>
      <div className="body">
        <span className="cat">{p.sub || p.cat}</span>
        <h3>{p.name}</h3>
        <div className="rate">
          <span className="stars">{"★".repeat(Math.round(p.rating))}</span>
          {p.rating} · {p.reviews.toLocaleString()} reviews
        </div>
        <div className="foot">
          <div className="price"><b>{money(p.price)}</b>{p.old && <s>{money(p.old)}</s>}</div>
          <button className="add" onClick={() => onAdd(p)} title="Add to cart">+</button>
        </div>
      </div>
    </div>
  );
}
