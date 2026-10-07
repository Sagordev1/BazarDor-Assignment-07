import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="container-6xl py-6 space-y-10">
      <div className="card p-8 space-y-4">
        <div className="skeleton h-6 w-40 rounded-full" />
        <div className="skeleton h-10 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-10 w-36" />
      </div>
      <GridSkeleton count={6} />
      <GridSkeleton count={6} />
    </div>
  );
}
