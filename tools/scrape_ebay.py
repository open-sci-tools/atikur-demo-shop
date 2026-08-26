import re, json, subprocess, sys, time, html as ihtml

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
CARD = re.compile(r'<article[^>]*class="str-item-card[^"]*"[^>]*>(.*?)</article>', re.S)

def fetch(pgn):
    url = f"https://www.ebay.fr/str/rockfr?_pgn={pgn}&rt=nc&_tab=shop&_ipg=240"
    out = subprocess.run(["curl","-sL","--max-time","90","-A",UA,
        "-H","Accept-Language: fr-FR,fr;q=0.9", url], capture_output=True)
    return out.stdout.decode("utf-8","replace")

def parse(h):
    items = {}
    for c in CARD.findall(h):
        m = re.search(r'href=(https://www\.ebay\.fr/itm/(\d+))[^\s>]*', c)
        if not m: continue
        iid = m.group(2)
        t = re.search(r'str-item-card__property-title[^>]*>.*?<span class=str-text-span[^>]*>(.*?)</span>', c, re.S)
        if not t:
            t = re.search(r'aria-label="([^"]+)"\s+data-track', c)
        title = ihtml.unescape(re.sub(r'<[^>]+>','',t.group(1))).strip() if t else ""
        p = re.search(r'str-item-card__property-displayPrice">(.*?)</span>', c, re.S)
        price = ihtml.unescape(p.group(1)).strip() if p else ""
        img = re.search(r'i\.ebayimg\.com/images/g/([^/\s]+)/s-l', c)
        cat = re.search(r'"_sacat":"(\d+)"', c)
        if not title or not price: continue
        items[iid] = {"id": iid, "title": title, "priceRaw": price,
                      "url": f"https://www.ebay.fr/itm/{iid}",
                      "image": f"https://i.ebayimg.com/images/g/{img.group(1)}/s-l500.jpg" if img else "",
                      "imageId": img.group(1) if img else ""}
    return items

all_items = {}
pgn = 1
empty = 0
while pgn <= 60:
    h = fetch(pgn)
    got = parse(h)
    new = {k:v for k,v in got.items() if k not in all_items}
    all_items.update(got)
    print(f"page {pgn}: parsed {len(got)}, new {len(new)}, total {len(all_items)}", flush=True)
    if not new:
        empty += 1
        if empty >= 2: break
    else:
        empty = 0
    pgn += 1
    time.sleep(1.5)

json.dump(list(all_items.values()), open("ebay_products.json","w"), ensure_ascii=False, indent=1)
print("TOTAL", len(all_items))
