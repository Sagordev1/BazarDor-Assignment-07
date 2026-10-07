"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    if (sp.get("reason") === "protected" && !shown.current) {
      shown.current = true;
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
    }
  }, [sp]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) return fail("ইমেইল ও পাসওয়ার্ড দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    setLoading(true);
    const { error } = await authClient.signIn.email({ email: email.trim(), password });
    setLoading(false);
    if (error) return fail(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(next && next.startsWith("/") ? next : "/");
    router.refresh();
  }
  function fail(msg: string) { setError(msg); toast.error(msg); }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">ইমেইল</label>
          <input id="email" type="email" autoComplete="email" className="input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1.5">পাসওয়ার্ড</label>
          <input id="password" type="password" autoComplete="current-password" className="input" placeholder="কমপক্ষে ৮ অক্ষর" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p role="alert" className="text-sm text-error bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm">{loading ? "অপেক্ষা করুন…" : "সাইন ইন"}</button>
      </form>
      <SocialButtons />
      <p className="text-center text-sm mt-5">অ্যাকাউন্ট নেই? <Link href="/signup" className="text-primary font-medium hover:underline">সাইন আপ করুন</Link></p>
    </>
  );
}
