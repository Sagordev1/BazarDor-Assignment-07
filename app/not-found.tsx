import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-6xl py-20">
      <div className="card max-w-lg mx-auto p-10 text-center">
        <p className="text-6xl font-bold text-primary">৪০৪</p>
        <h1 className="mt-3 text-xl font-bold">পেজটি খুঁজে পাওয়া যায়নি</h1>
        <p className="mt-2 text-sm text-ink/70">আপনি যে ঠিকানায় যেতে চেয়েছিলেন সেটি নেই বা সরানো হয়েছে।</p>
        <Link href="/" className="btn-primary mt-6 px-5 py-2.5 text-sm">হোম পেজে ফিরে যান</Link>
      </div>
    </div>
  );
}
