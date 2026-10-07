export default function Loading() {
  return (
    <div className="container-6xl py-6 space-y-5 max-w-4xl">
      <div className="skeleton h-4 w-48" />
      <div className="card p-5 flex gap-4"><div className="skeleton size-14" /><div className="flex-1 space-y-2"><div className="skeleton h-7 w-1/2" /><div className="skeleton h-4 w-1/3" /></div></div>
      <div className="card p-5 grid gap-3 sm:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="skeleton h-20" />)}</div>
      <div className="card p-5 space-y-2">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-8" />)}</div>
    </div>
  );
}
