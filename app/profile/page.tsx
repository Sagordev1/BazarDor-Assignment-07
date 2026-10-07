import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import { Avatar } from "@/components/UserMenu";
import { requireUser } from "@/lib/session";

export const metadata = { title: "আমার প্রোফাইল — বাজার দর" };

export default async function ProfilePage() {
  const user = await requireUser("/profile");
  return (
    <div className="container-6xl py-8 max-w-2xl space-y-4">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-ink/60">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <section className="card p-4 sm:p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Avatar user={user} size={60} />
          <div className="min-w-0">
            <p className="font-semibold truncate">{user.name}</p>
            <p className="text-sm text-ink/60 truncate">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </section>

      <section className="card p-4 sm:p-5">
        <h2 className="font-semibold mb-4">তথ্য</h2>
        <label className="block text-sm mb-1.5">নাম</label>
        <input className="input" value={user.name} disabled readOnly />
        <Link href="/profile/update" className="btn-primary w-full mt-4 py-2.5 text-sm">আপডেট</Link>
      </section>
    </div>
  );
}
