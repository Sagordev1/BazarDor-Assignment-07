"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/data";
import { bn } from "@/lib/format";
import ProductCard from "./ProductCard";

type Sort = "default" | "asc" | "desc";

export default function CategoryList({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");

  // p.price is already a real number (Bengali digits parsed in lib/format.toNum) so sorting is numeric, not string-based
  const list = useMemo(() => {
    const a = [...products];
    if (sort === "asc") a.sort((x, y) => x.price - y.price);
    if (sort === "desc") a.sort((x, y) => y.price - x.price);
    return a;
  }, [products, sort]);

  return (
    <>
      <div className="card p-3 sm:p-4 flex justify-end items-center gap-3">
        <label htmlFor="sort" className="text-sm">সাজান</label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="appearance-none bg-base-100 border border-base-300 rounded-lg text-sm pl-3 pr-8 py-1.5 outline-none focus:border-primary cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </div>
      </div>
      <p className="text-sm text-ink/60 my-4">মোট {bn(list.length)}টি পণ্য দেখানো হচ্ছে</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </>
  );
}
