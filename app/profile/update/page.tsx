import Link from "next/link";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { requireUser } from "@/lib/session";

export const metadata = { title: "তথ্য আপডেট — বাজার দর" };

export default async function UpdatePage() {
  const user = await requireUser("/profile/update");
  return (
    <div className="container-6xl py-8 max-w-2xl space-y-4">
      <div>
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="text-sm text-ink/60">আপনার নাম পরিবর্তন করুন।</p>
      </div>
      <section className="card p-4 sm:p-5">
        <UpdateProfileForm initialName={user.name} />
      </section>
      <Link href="/profile" className="text-sm text-ink/60 hover:text-primary">← প্রোফাইলে ফিরে যান</Link>
    </div>
  );
}
