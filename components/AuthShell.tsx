import Link from "next/link";

export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="container-6xl py-10">
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-ink/60 mt-1">{subtitle}</p>
      </div>
      <div className="card max-w-md mx-auto p-5 sm:p-6">{children}</div>
      <p className="text-center mt-6 text-sm text-ink/60"><Link href="/" className="hover:text-primary">← হোম পেজে ফিরে যান</Link></p>
    </div>
  );
}
