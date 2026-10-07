import Link from "next/link";
import type { Product } from "@/lib/data";
import { bnPrice } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.id}`}
      className="card block p-4 hover:border-primary/50 hover:shadow-sm transition focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-3">
        <div className="size-11 shrink-0 rounded-lg bg-base-200 grid place-items-center text-2xl">{p.emoji}</div>
        <div className="min-w-0">
          <h3 className="font-semibold leading-tight truncate">{p.name}</h3>
          <p className="text-xs text-ink/60">{p.unit}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-ink/70">আজকের দাম</p>
      <div className="flex items-center justify-between gap-2">
        <p>
          <span className="text-lg font-bold">{bnPrice(p.price)}</span> <span className="text-sm">টাকা</span>
        </p>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}
