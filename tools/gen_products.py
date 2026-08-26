import json, re

items = json.load(open("ebay_products.json"))
cmap = json.load(open("cat_map.json"))

def price(raw):
    return float(raw.replace(" EUR", "").replace(" ", "").replace(" ", "").replace(",", "."))

GRADS = ["linear-gradient(135deg,#7c5cff,#22d3ee)", "linear-gradient(135deg,#f97316,#f5b544)",
         "linear-gradient(135deg,#22d3ee,#34d399)", "linear-gradient(135deg,#6366f1,#22d3ee)",
         "linear-gradient(135deg,#34d399,#7c5cff)", "linear-gradient(135deg,#7c5cff,#ff5c8a)",
         "linear-gradient(135deg,#f5b544,#ff5c8a)"]

rows = []
for i, it in enumerate(sorted(items, key=lambda x: x["title"].lower())):
    c = cmap.get(it["id"], {})
    rows.append({
        "id": i + 1,
        "sku": it["id"],
        "name": it["title"],
        "cat": c.get("cat") or "Autres",
        "sub": c.get("sub") or c.get("cat") or "Autres",
        "price": price(it["priceRaw"]),
        "img": it["image"],
        "url": it["url"],
        "grad": GRADS[i % len(GRADS)],
    })

cats = sorted({r["cat"] for r in rows})
counts = {c: sum(1 for r in rows if r["cat"] == c) for c in cats}
cats = sorted(cats, key=lambda c: -counts[c])

def js(v):
    return json.dumps(v, ensure_ascii=False)

out = ["// ClickFR catalog — imported from the RockFR Bazar eBay store (ebay.fr/str/rockfr).",
       f"// {len(rows)} live listings, {len(cats)} categories. Regenerate with tools/import_ebay.py.",
       "export const PRODUCTS = ["]
for r in rows:
    out.append("  { " + ", ".join(f"{k}:{js(v)}" for k, v in r.items()) + " },")
out.append("];")
out.append("")
out.append("export const CATEGORIES = " + js(["All"] + cats) + ";")
out.append("")
out.append("export const SUBCATEGORIES = " + js({c: sorted({r["sub"] for r in rows if r["cat"] == c}) for c in cats}) + ";")
out.append("")
out.append('// Prices in euros, French formatting (e.g. "8,99 €").')
out.append('export const money = (n) =>')
out.append('  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);')
out.append("")

open("products.js", "w").write("\n".join(out))
print("products:", len(rows), "categories:", len(cats))
print("uncategorized:", sum(1 for r in rows if r["cat"] == "Autres"))
for c in cats: print(f"  {counts[c]:4d}  {c}")
