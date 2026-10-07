"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম খালি রাখা যাবে না");
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);
    if (error) return toast.error(error.message || "তথ্য আপডেট করা যায়নি");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1.5">নাম</label>
        <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="আপনার নাম" autoFocus />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm">{loading ? "আপডেট হচ্ছে…" : "তথ্য আপডেট করুন"}</button>
    </form>
  );
}
