export function CardSkeleton() {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton size-11" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="skeleton h-3 w-16 mt-4" />
      <div className="flex justify-between mt-2">
        <div className="skeleton h-6 w-20" />
        <div className="skeleton h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="লোড হচ্ছে…">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
