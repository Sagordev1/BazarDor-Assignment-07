import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/data";
import { bn, bnDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  const risers = [...products].filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = [...products].filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <div className="container-6xl py-6 space-y-10">
      <section className="card p-5 sm:p-8 grid gap-6 md:grid-cols-[1fr_auto] items-center">
        <div>
          <span className="inline-block text-xs font-medium bg-green-100 text-primary rounded-full px-3 py-1" suppressHydrationWarning>
            {bnDate()}
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mt-4 max-w-xl text-ink/70 text-sm sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn-primary mt-6 px-5 py-2.5 text-sm">সব পণ্য দেখুন</a>
        </div>
        <Image src="/bazar-hero.png" alt="সবজির ঝুড়ি" width={315} height={263} priority className="mx-auto w-56 md:w-80 h-auto" />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><span className="text-error text-sm">▲</span> আজ দাম বেড়েছে</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {risers.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><span className="text-success text-sm">▼</span> আজ দাম কমেছে</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fallers.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section id="সব-পণ্য" className="scroll-mt-6">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="text-sm text-ink/60 mb-4">মোট {bn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  );
}
