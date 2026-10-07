"use client";
import { useRouter } from "next/navigation";
import { doSignOut } from "./UserMenu";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <button onClick={() => doSignOut(router)} className="text-sm font-medium text-error border border-error/60 rounded-lg px-3 py-1.5 hover:bg-red-50 shrink-0">
      ↩ সাইন আউট
    </button>
  );
}
