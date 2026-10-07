"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [f, setF] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  const fail = (m: string) => { setError(m); toast.error(m); };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!f.name.trim()) return fail("নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return fail("সঠিক ইমেইল দিন");
    if (f.password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (f.password !== f.confirm) return fail("দুটি পাসওয়ার্ড মেলেনি");
    setLoading(true);
    const { error } = await authClient.signUp.email({ name: f.name.trim(), email: f.email.trim(), password: f.password });
    setLoading(false);
    if (error) return fail(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">নাম</label>
          <input id="name" autoComplete="name" className="input" placeholder="যেমন: রহিম উদ্দিন" value={f.name} onChange={set("name")} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">ইমেইল</label>
          <input id="email" type="email" autoComplete="email" className="input" placeholder="you@example.com" value={f.email} onChange={set("email")} />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1.5">পাসওয়ার্ড</label>
          <input id="password" type="password" autoComplete="new-password" className="input" placeholder="কমপক্ষে ৮ অক্ষর" value={f.password} onChange={set("password")} />
        </div>
        <div>
          <label htmlFor="confirm" className="block text-sm font-medium mb-1.5">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input id="confirm" type="password" autoComplete="new-password" className="input" placeholder="আবার লিখুন" value={f.confirm} onChange={set("confirm")} />
        </div>
        {error && <p role="alert" className="text-sm text-error bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm">{loading ? "অপেক্ষা করুন…" : "অ্যাকাউন্ট তৈরি করুন"}</button>
      </form>
      <SocialButtons />
      <p className="text-center text-sm mt-5">অ্যাকাউন্ট আছে? <Link href="/signin" className="text-primary font-medium hover:underline">সাইন ইন করুন</Link></p>
    </>
  );
}
