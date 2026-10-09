
import { bnPrice, bnPct } from "@/lib/format";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { getProduct } from "@/lib/data";
import { bnPrice } from "@/lib/format";
import { requireUser } from "@/lib/session";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await requireUser(`/product/${slug}`);

  const p = await getProduct(slug);
  if (!p) notFound();

  const unitShort = p.unit.replace("প্রতি ", "");
  const diff = Math.round(Math.abs(p.price - p.previous));
 const note = p.description || (p.change > 0
  ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${bnPct(p.change)}%`
  : p.change < 0
    ? `গতকালের তুলনায় আজ দাম কমেছে · ${bnPct(p.change)}%`
    : "গতকালের তুলনায় দাম অপরিবর্তিত");

  const tone = p.change > 0 ? "text-error" : p.change < 0 ? "text-success" : "";

  return (
    <div className="container-6xl py-6 space-y-5 max-w-4xl">
      <nav className="text-xs text-ink/60 flex items-center gap-1.5 flex-wrap" aria-label="breadcrumb">
        <Link href="/" className="hover:text-primary">হোম</Link>
        <span>›</span>
        {p.category && <Link href={`/category/${p.category}`} className="hover:text-primary">{p.categoryName || p.category}</Link>}
        {p.category && <span>›</span>}
        <span className="text-ink">{p.name}</span>
      </nav>

      <section className="card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="flex items-start gap-4">
          <span className="size-14 shrink-0 rounded-xl bg-base-200 grid place-items-center text-3xl">{p.emoji}</span>
          <div>
            <h1 className="text-2xl font-bold leading-tight">{p.name}</h1>
            <p className="text-sm text-ink/60">{p.unit}{p.tags.length ? ` · ${p.tags.join(", ")}` : ""}</p>
            <p className={`text-sm mt-1 font-medium ${tone}`}>{note}</p>
          </div>
        </div>
        <div className="bg-base-200 border border-base-300 rounded-xl px-5 py-3 text-center sm:min-w-32">
          <p className="text-xs text-ink/60">আজকের দাম</p>
          <p className="text-2xl font-bold">{bnPrice(p.price)}</p>
          <p className="text-[11px] text-ink/60">টাকা / {unitShort}</p>
          <div className="mt-1"><ChangeBadge change={p.change} /></div>
        </div>
      </section>

      <section className="card p-4 sm:p-5">
        <h2 className="font-bold mb-3">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="border border-base-300 rounded-xl p-4">
            <p className="text-xs text-ink/60">সর্বনিম্ন দাম</p>
            <p className="text-xl font-bold text-success">{bnPrice(p.min)} <span className="text-sm">টাকা</span></p>
            <p className="text-[11px] text-ink/60">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="border border-base-300 rounded-xl p-4">
            <p className="text-xs text-ink/60">সর্বোচ্চ দাম</p>
            <p className="text-xl font-bold text-error">{bnPrice(p.max)} <span className="text-sm">টাকা</span></p>
            <p className="text-[11px] text-ink/60">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="border border-base-300 rounded-xl p-4">
            <p className="text-xs text-ink/60">গড় দাম</p>
            <p className="text-xl font-bold">{bnPrice(Math.round(p.avg * 100) / 100)} <span className="text-sm">টাকা</span></p>
            <p className="text-[11px] text-ink/60">প্রতি {unitShort}-এর গড়ে</p>
          </div>
        </div>
      </section>

      <section className="card p-4 sm:p-5">
        <h2 className="font-bold mb-3">বাজারভিত্তিক আজকের দাম</h2>
        {p.markets.length === 0 ? (
          <p className="text-sm text-ink/60">এই পণ্যের বাজারভিত্তিক তথ্য এখনো নেই।</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-base-300">
            <table className="w-full text-sm min-w-[560px]">
              <thead className="bg-base-200 text-ink/70">
                <tr>
                  <th className="text-left font-medium px-4 py-2.5">বাজার</th>
                  <th className="text-left font-medium px-4 py-2.5">বিভাগ</th>
                  <th className="text-right font-medium px-4 py-2.5">সর্বনিম্ন</th>
                  <th className="text-right font-medium px-4 py-2.5">সর্বাধিক</th>
                  <th className="text-right font-medium px-4 py-2.5">গড়</th>
                </tr>
              </thead>
              <tbody>
                {p.markets.map((m, i) => (
                  <tr key={i} className="border-t border-base-300 odd:bg-base-100 even:bg-base-200/60">
                    <td className="px-4 py-2.5">{m.name}</td>
                    <td className="px-4 py-2.5">{m.division}</td>
                    <td className="px-4 py-2.5 text-right">{bnPrice(m.min)} টাকা</td>
                    <td className="px-4 py-2.5 text-right">{bnPrice(m.max)} টাকা</td>
                    <td className="px-4 py-2.5 text-right font-bold">{bnPrice(Math.round(m.avg * 100) / 100)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
