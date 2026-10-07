"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-6xl py-20">
      <div className="card max-w-lg mx-auto p-10 text-center">
        <h1 className="text-xl font-bold">ডেটা লোড করা যায়নি</h1>
        <p className="mt-2 text-sm text-ink/70">ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।</p>
        <button onClick={reset} className="btn-primary mt-6 px-5 py-2.5 text-sm">আবার চেষ্টা করুন</button>
      </div>
    </div>
  );
}
