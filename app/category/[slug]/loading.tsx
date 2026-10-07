import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="container-6xl py-6 space-y-4">
      <div className="card p-5 flex items-center gap-4">
        <div className="skeleton size-12" />
        <div className="space-y-2 flex-1">
          <div className="skeleton h-6 w-32" />
          <div className="skeleton h-3 w-56" />
        </div>
      </div>
      <div className="card p-4 flex justify-end"><div className="skeleton h-8 w-40" /></div>
      <p className="text-sm text-ink/60">Loading…</p>
      <GridSkeleton count={6} />
    </div>
  );
}
