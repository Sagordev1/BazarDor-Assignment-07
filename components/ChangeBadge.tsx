import { bnPct } from "@/lib/format";

export default function ChangeBadge({ change, big = false }: { change: number; big?: boolean }) {
  const size = big ? "text-xs px-2.5 py-1" : "text-[11px] px-2 py-0.5";
  if (!change)
    return <span className={`${size} rounded-full bg-base-200 text-ink/70 font-semibold`}>— ০.০%</span>;
  const up = change > 0;
  return (
    <span
      className={`${size} rounded-full font-semibold ${up ? "bg-red-50 text-error" : "bg-green-50 text-success"}`}
      aria-label={up ? "দাম বেড়েছে" : "দাম কমেছে"}
    >
      {up ? "▲" : "▼"} {bnPct(change)}%
    </span>
  );
}
