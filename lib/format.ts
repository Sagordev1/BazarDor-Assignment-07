const D = "০১২৩৪৫৬৭৮৯";
const WEEK = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const MONTH = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];

export const bn = (v: string | number) => String(v).replace(/\d/g, (d) => D[+d]);

/** Bengali string/number -> JS number ("১,২৯০" -> 1290) */
export function toNum(v: unknown): number {
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  if (typeof v !== "string") return 0;
  const s = v
    .replace(/[০-৯]/g, (d) => String(D.indexOf(d)))
    .replace(/,/g, "")
    .replace(/[^\d.\-]/g, "");
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

export const bnPrice = (n: number) =>
  bn(Number.isInteger(n) ? n.toLocaleString("en-US") : n.toLocaleString("en-US", { maximumFractionDigits: 2 }));

export const bnPct = (n: number) => bn(Math.abs(n).toFixed(1));

export function bnDate(date = new Date()) {
  const d = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
  return `${WEEK[d.getDay()]}, ${bn(d.getDate())} ${MONTH[d.getMonth()]}, ${bn(d.getFullYear())}`;
}
