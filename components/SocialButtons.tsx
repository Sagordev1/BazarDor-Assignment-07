"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const Google = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z"/><path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-2.9-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.100 0 24s.9 7.6 2.600 10.8l7.9-6.100z"/><path fill="#34A853" d="M24 48c6.500 0 11.900-2.100 15.900-5.800l-7.400-5.700c-2.100 1.400-4.800 2.300-8.500 2.300-6.300 0-11.600-4.100-13.500-9.800l-7.9 6.100C6.500 42.600 14.600 48 24 48z"/></svg>
);
const Github = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 .5C5.700.5.600 5.600.6 11.900c0 5 3.300 9.300 7.800 10.8.6.100.8-.2.8-.6v-2c-3.200.7-3.800-1.500-3.800-1.500-.5-1.300-1.300-1.700-1.300-1.700-1-.7.1-.7.1-.7 1.100.1 1.700 1.200 1.700 1.200 1 1.800 2.700 1.300 3.300 1 .1-.7.4-1.300.7-1.600-2.600-.3-5.300-1.300-5.300-5.700 0-1.300.5-2.300 1.200-3.100-.1-.3-.5-1.500.1-3.100 0 0 1-.3 3.200 1.200a11 11 0 0 1 5.800 0c2.200-1.500 3.200-1.200 3.200-1.200.6 1.600.2 2.800.1 3.100.8.800 1.200 1.800 1.200 3.100 0 4.400-2.700 5.400-5.300 5.700.4.400.8 1.100.8 2.200v3.200c0 .3.2.7.8.6 4.500-1.500 7.800-5.800 7.800-10.8C23.400 5.600 18.300.5 12 .5z"/></svg>
);

export default function SocialButtons() {
  const [busy, setBusy] = useState<string | null>(null);
  const go = async (provider: "google" | "github") => {
    setBusy(provider);
    const { error } = await authClient.signIn.social({ provider, callbackURL: "/" });
    if (error) {
      toast.error(error.message || "সোশ্যাল লগইন করা যায়নি");
      setBusy(null);
    }
  };
  return (
    <>
      <div className="flex items-center gap-3 my-5 text-xs text-ink/60">
        <span className="h-px flex-1 bg-base-300" /> অথবা <span className="h-px flex-1 bg-base-300" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" disabled={!!busy} onClick={() => go("google")} className="btn-ghost-border text-sm py-2 px-2"><Google /> <span className="truncate">Google দিয়ে চালিয়ে যান</span></button>
        <button type="button" disabled={!!busy} onClick={() => go("github")} className="btn-ghost-border text-sm py-2 px-2"><Github /> <span className="truncate">GitHub দিয়ে চালিয়ে যান</span></button>
      </div>
    </>
  );
}
