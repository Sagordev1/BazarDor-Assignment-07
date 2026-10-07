import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryList from "@/components/CategoryList";
import { getCategory, getProducts } from "@/lib/data";
import { bn } from "@/lib/format";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  const products = await getProducts(slug);

  return (
    <div className="container-6xl py-6 space-y-4">
      <header className="card p-4 sm:p-5 flex items-center gap-4">
        <span className="size-12 rounded-xl bg-base-200 grid place-items-center text-3xl">{category.emoji}</span>
        <div>
          <h1 className="text-2xl font-bold leading-tight">{category.name}</h1>
          <p className="text-sm text-ink/60">{bn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </header>

      {products.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-5xl font-bold text-primary">৪০৪</p>
          <p className="mt-3 font-semibold">এই ক্যাটাগরিতে কোনো পণ্য নেই</p>
          <Link href="/" className="btn-primary mt-5 px-5 py-2.5 text-sm">হোম পেজে ফিরে যান</Link>
        </div>
      ) : (
        <CategoryList products={products} />
      )}
    </div>
  );
}
