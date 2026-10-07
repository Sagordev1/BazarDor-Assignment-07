"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type U = { name: string; email: string; image?: string | null };

export function Avatar({ user, size = 32 }: { user: U; size?: number }) {
  if (user.image)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={user.image} alt="" width={size} height={size} className="rounded-full object-cover" style={{ width: size, height: size }} referrerPolicy="no-referrer" />;
  return (
    <span className="rounded-full bg-primary text-primary-content grid place-items-center font-semibold" style={{ width: size, height: size, fontSize: size * 0.4 }}>
      {user.name?.trim()?.[0]?.toUpperCase() ?? "U"}
    </span>
  );
}

export async function doSignOut(router: ReturnType<typeof useRouter>) {
  const { error } = await authClient.signOut();
  if (error) return toast.error(error.message ?? "সাইন আউট করা যায়নি");
  toast.success("সফলভাবে সাইন আউট হয়েছে");
  router.push("/");
  router.refresh();
}

export default function UserMenu({ user }: { user: U }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const h = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2 text-sm font-medium py-1 px-1.5 rounded-lg hover:bg-base-200" aria-expanded={open}>
        <Avatar user={user} />
        <span className="hidden sm:block max-w-24 truncate">{user.name.split(" ")[0]}</span>
        <span className="text-[9px] text-ink/50">▾</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-60 card p-2 shadow-xl z-50">
          <div className="px-3 py-2">
            <p className="font-semibold text-sm truncate">{user.name}</p>
            <p className="text-xs text-ink/60 truncate">{user.email}</p>
          </div>
          <Link href="/profile" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm rounded-lg hover:bg-base-200">👤 আমার প্রোফাইল</Link>
          <button onClick={() => { setOpen(false); doSignOut(router); }} className="w-full text-left px-3 py-2 text-sm rounded-lg text-error hover:bg-red-50">↩ সাইন আউট</button>
        </div>
      )}
    </div>
  );
}
