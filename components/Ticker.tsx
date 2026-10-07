import type { Product } from "@/lib/data";
import { bnPct, bnPrice } from "@/lib/format";

export default function Ticker({ products }: { products: Product[] }) {
  if (!products.length) return <div className="h-10 bg-base-100 border-b border-base-300" />;
  const items = products.map((p) => {
    const up = p.change > 0;
    const down = p.change < 0;
    return (
      <span key={p.id} className="flex items-center gap-1.5 px-4 border-r border-base-300 text-[13px] whitespace-nowrap">
        <span>{p.emoji}</span>
        <span className="font-medium">{p.name}</span>
        <span className="text-ink/70">
          {bnPrice(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}
        </span>
        <span className={`font-semibold ${up ? "text-error" : down ? "text-success" : "text-ink/60"}`}>
          {up ? "▲" : down ? "▼" : "—"} {bnPct(p.change)}%
        </span>
      </span>
    );
  });
  return (
    <div className="marquee bg-base-100 border-b border-base-300 overflow-hidden h-10 flex items-center" aria-label="দামের টিকার">
      <div className="marquee-track">
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden>{items}</div>
      </div>
    </div>
  );
}
