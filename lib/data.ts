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

  const price = toNum(first(r, ["price", "currentPrice", "todayPrice", "today", "avgPrice", "avg", "average"]));
  let change = toNum(first(r, ["change", "changePercent", "percentChange", "change_percent", "changePct", "pct", "percent"]));
  const trend = String(first(r, ["trend", "direction"]) ?? "").toLowerCase();
  if (trend === "down" || trend === "fall") change = -Math.abs(change);
  if (trend === "up" || trend === "rise") change = Math.abs(change);

  const prevRaw = first(r, ["previous", "previousPrice", "yesterday", "yesterdayPrice", "prevPrice"]);
  const previous = prevRaw !== undefined ? toNum(prevRaw) : change ? price / (1 + change / 100) : price;

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
    unit: String(first(r, ["unit", "unitBn", "unit_bn"]) ?? "প্রতি কেজি"),
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
