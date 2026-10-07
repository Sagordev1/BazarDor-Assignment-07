"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Category } from "@/lib/data";
import { bnDate } from "@/lib/format";
import { authClient } from "@/lib/auth-client";
import UserMenu from "./UserMenu";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("");
  useEffect(() => setDate(bnDate()), []);

  return (
    <header className="bg-base-100 border-b border-base-300">
      <div className="container-6xl flex items-center justify-between h-16 gap-3">
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <span className="size-10 shrink-0 rounded-xl bg-primary grid place-items-center">
            <Image src="/logo-icon.png" alt="" width={18} height={18} />
          </span>
          <span className="leading-tight min-w-0">
            <span className="block font-bold text-lg">বাজার দর</span>
            <span className="block text-[11px] text-ink/70 truncate" suppressHydrationWarning>{date || "\u00A0"}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {isPending ? (
            <div className="skeleton h-9 w-24" />
          ) : session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <>
              <Link href="/signin" className="text-sm font-medium px-2 sm:px-3 py-2 hover:text-primary">সাইন ইন</Link>
              <Link href="/signup" className="btn-primary text-sm px-3 sm:px-4 py-2">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-base-300" aria-label="ক্যাটাগরি">
        <ul className="container-6xl flex items-center gap-1 h-12 overflow-x-auto no-scrollbar">
          {categories.map((c) => {
            const href = `/category/${c.id}`;
            const active = pathname === href;
            return (
              <li key={c.id} className="shrink-0">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition ${
                    active ? "bg-primary text-primary-content font-semibold" : "hover:bg-base-200"
                  }`}
                >
                  <span className="text-sm">{c.emoji}</span>
                  {c.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
