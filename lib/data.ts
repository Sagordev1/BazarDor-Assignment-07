import { toNum } from "./format";

const BASES = [
  process.env.API_BASE,
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
].filter(Boolean) as string[];

export type Market = { name: string; division: string; min: number; max: number; avg: number };
export type Category = { id: string; name: string; emoji: string };
export type Product = {
  id: string;
  name: string;
  unit: string;
  emoji: string;
  price: number;
  change: number; // percent, + = up, - = down
  previous: number;
  category: string; // category id
  categoryName: string;
  description: string;
  tags: string[];
  min: number;
  max: number;
  avg: number;
  markets: Market[];
};

/* ---------- fetch with fallback base ---------- */
async function api(path: string): Promise<any> {
  let lastErr: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 60 } });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return await res.json();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr ?? new Error("API unreachable");
}

const unwrap = (j: any): any =>
  Array.isArray(j) ? j : j?.data ?? j?.products ?? j?.categories ?? j?.items ?? j?.result ?? j;

/* ---------- helpers ---------- */
const first = (o: any, keys: string[]) => {
  for (const k of keys) if (o?.[k] !== undefined && o?.[k] !== null && o?.[k] !== "") return o[k];
  return undefined;
};

/** scan every key of the raw object: first numeric-looking value whose key matches `re` (and not `not`) */
const scan = (o: any, re: RegExp, not?: RegExp): number | undefined => {
  if (!o || typeof o !== "object") return undefined;
  for (const [k, v] of Object.entries(o)) {
    if (!re.test(k) || (not && not.test(k))) continue;
    if (typeof v === "number" || (typeof v === "string" && /\d|[০-৯]/.test(v))) return toNum(v);
  }
  return undefined;
};

const UNIT_BN: Record<string, string> = {
  kg: "প্রতি কেজি", kilogram: "প্রতি কেজি", "কেজি": "প্রতি কেজি",
  l: "প্রতি লিটার", ltr: "প্রতি লিটার", litre: "প্রতি লিটার", liter: "প্রতি লিটার", "লিটার": "প্রতি লিটার",
  dozen: "প্রতি ডজন", dz: "প্রতি ডজন", "ডজন": "প্রতি ডজন",
  piece: "প্রতি পিস", pcs: "প্রতি পিস", pc: "প্রতি পিস", "পিস": "প্রতি পিস",
  g: "প্রতি গ্রাম", gm: "প্রতি গ্রাম", gram: "প্রতি গ্রাম", hali: "প্রতি হালি", "হালি": "প্রতি হালি",
};
const unitBn = (u: string) => {
  const t = u.trim();
  if (t.startsWith("প্রতি")) return t;
  return UNIT_BN[t.toLowerCase()] ?? `প্রতি ${t}`;
};

const CAT_EMOJI: Record<string, string> = {
  chal: "🍚", dal: "🫘", tel: "🫙", sobji: "🥬", sabji: "🥬", mach: "🐟", mangsho: "🍗", mangsh: "🍗", dim: "🥛", "dim-dudh": "🥛", moshla: "🌶️", mosla: "🌶️",
};
const catEmoji = (id: string) => CAT_EMOJI[id?.toLowerCase()] ?? "🛒";

/* ---------- normalizers ---------- */
export function normalizeCategory(r: any): Category {
  const id = String(first(r, ["id", "slug", "_id", "key"]) ?? "");
  return {
    id,
    name: String(first(r, ["name_bn", "nameBn", "name", "title", "label"]) ?? id),
    emoji: String(first(r, ["emoji", "icon"]) ?? catEmoji(id)),
  };
}

function normalizeMarket(m: any): Market {
  const price = toNum(first(m, ["price", "avg", "average", "avgPrice"]));
  const min = toNum(first(m, ["min", "minPrice", "lowest", "low"]) ?? price);
  const max = toNum(first(m, ["max", "maxPrice", "highest", "high"]) ?? price);
  const avg = toNum(first(m, ["avg", "average", "avgPrice", "price"]) ?? (min + max) / 2);
  return {
    name: String(first(m, ["name", "market", "bazar", "bazaar", "title"]) ?? "—"),
    division: String(first(m, ["division", "region", "city", "location", "district"]) ?? "—"),
    min,
    max,
    avg,
  };
}

export function normalizeProduct(r: any, cats: Category[] = []): Product {
  const rawCat = first(r, ["category", "categoryId", "category_id"]);
  const catId = String(typeof rawCat === "object" && rawCat ? first(rawCat, ["id", "slug"]) : rawCat ?? "");
  const cat = cats.find((c) => c.id === catId);

  const price = toNum(first(r, ["price", "currentPrice", "current_price", "todayPrice", "today_price", "today", "avgPrice", "avg", "average"]) ?? scan(r, /price|দাম/i, /prev|yest|old|last|min|max/i));

  // previous (yesterday) price, any key name
  const prevScan = scan(r, /(prev|yest|old|last|গতকাল)/i);
  const prevRaw = first(r, ["previous", "previousPrice", "previous_price", "yesterday", "yesterdayPrice", "yesterday_price", "prevPrice", "prev_price"]);
  let previous = prevRaw !== undefined ? toNum(prevRaw) : prevScan !== undefined ? prevScan : 0;

  // percent change: explicit percent key -> else computed from previous -> else generic "change/delta/diff" key
  let change: number | undefined = scan(r, /(percent|pct|%)/i);
  if (change === undefined && previous > 0 && price > 0) change = ((price - previous) / previous) * 100;
  if (change === undefined) {
    const g = scan(r, /(change|chg|delta|diff|variation|trend|movement)/i);
    if (g !== undefined) change = g;
  }
  change = change ?? 0;
  const dir = String(first(r, ["trend", "direction", "status", "movement", "change_type", "changeType"]) ?? "").toLowerCase();
  if (/down|fall|decrease|drop|কম/.test(dir)) change = -Math.abs(change);
  else if (/up|rise|increase|high|বাড়/.test(dir)) change = Math.abs(change);
  if (!previous) previous = change ? price / (1 + change / 100) : price;

  const rawMarkets = first(r, ["markets", "bazars", "bazaars", "marketPrices", "market_prices", "prices"]);
  const markets: Market[] = Array.isArray(rawMarkets) ? rawMarkets.map(normalizeMarket) : [];

  const mins = markets.map((m) => m.min);
  const maxs = markets.map((m) => m.max);
  const min = toNum(first(r, ["min", "minPrice", "lowest"]) ?? (mins.length ? Math.min(...mins) : price));
  const max = toNum(first(r, ["max", "maxPrice", "highest"]) ?? (maxs.length ? Math.max(...maxs) : price));
  const avg = toNum(
    first(r, ["avg", "avgPrice", "average", "averagePrice"]) ??
      (markets.length ? markets.reduce((s, m) => s + m.avg, 0) / markets.length : price),
  );

  const rawTags = first(r, ["tags", "categories"]);
  const tags = Array.isArray(rawTags)
    ? rawTags.map((t: any) => (typeof t === "string" ? t : String(first(t, ["name_bn", "name", "title"]) ?? "")))
    : [];

  return {
    id: String(first(r, ["id", "_id", "slug"]) ?? ""),
    name: String(first(r, ["name_bn", "nameBn", "name", "title"]) ?? ""),
    unit: unitBn(String(first(r, ["unit_bn", "unitBn", "unit", "uom"]) ?? "কেজি")),
    emoji: String(first(r, ["emoji", "icon", "image"]) ?? cat?.emoji ?? catEmoji(catId)),
    price,
    change,
    previous,
    category: catId,
    categoryName: cat?.name ?? (typeof rawCat === "object" && rawCat ? String(first(rawCat, ["name_bn", "name"]) ?? "") : ""),
    description: String(first(r, ["description", "summary", "subtitle", "desc"]) ?? ""),
    tags: tags.length ? tags : cat ? [cat.name] : [],
    min,
    max,
    avg,
    markets,
  };
}

/* ---------- public API ---------- */
export async function getCategories(): Promise<Category[]> {
  const j = unwrap(await api("/categories"));
  return (Array.isArray(j) ? j : []).map(normalizeCategory);
}

export async function getCategory(id: string): Promise<Category | null> {
  const j = await api(`/categories/${encodeURIComponent(id)}`);
  if (!j) return null;
  const d = unwrap(j);
  const raw = Array.isArray(d) ? d[0] : d;
  return raw && (raw.id || raw.slug || raw.name || raw.name_bn) ? normalizeCategory(raw) : null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const cats = await getCategories().catch(() => []);
  const j = unwrap(await api(category ? `/products?category=${encodeURIComponent(category)}` : "/products"));
  return (Array.isArray(j) ? j : []).map((r) => normalizeProduct(r, cats));
}

export async function getProduct(id: string): Promise<Product | null> {
  const cats = await getCategories().catch(() => []);
  const j = await api(`/products/${encodeURIComponent(id)}`);
  if (!j) return null;
  const d = unwrap(j);
  const raw = Array.isArray(d) ? d[0] : d;
  if (!raw || (!raw.id && !raw.name && !raw.name_bn && !raw._id)) return null;
  return normalizeProduct(raw, cats);
}