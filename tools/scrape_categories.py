import re, json, subprocess, time, html as ihtml

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
tree = json.load(open("cat_tree.json"))

def fetch(url, pgn):
    sep = "&" if "?" in url else "?"
    u = f"{url}{sep}_pgn={pgn}&_ipg=240"
    r = subprocess.run(["curl","-sL","--max-time","90","-A",UA,
        "-H","Accept-Language: fr-FR,fr;q=0.9", u], capture_output=True)
    return r.stdout.decode("utf-8","replace")

def ids_of(h):
    return set(re.findall(r'data-testid=ig-(\d+)', h))

def all_ids(url):
    out, pgn = set(), 1
    while pgn <= 12:
        h = fetch(url, pgn)
        got = ids_of(h)
        new = got - out
        out |= got
        if not new: break
        pgn += 1
        time.sleep(0.8)
    return out

mapping = {}
for top_id, top in tree.items():
    tset = all_ids(top["url"])
    print(f"TOP {top['label']}: {len(tset)}", flush=True)
    for iid in tset:
        mapping.setdefault(iid, {"cat": top["label"], "sub": None})
    for sub_id, sub in top["subs"].items():
        sset = all_ids(sub["url"])
        print(f"   sub {sub['label']}: {len(sset)}", flush=True)
        for iid in sset:
            mapping[iid] = {"cat": top["label"], "sub": sub["label"]}
        time.sleep(0.5)
    json.dump(mapping, open("cat_map.json","w"), ensure_ascii=False)
print("MAPPED", len(mapping))
