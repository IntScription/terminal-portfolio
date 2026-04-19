export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 h-10 w-36 animate-pulse rounded-full bg-black/5 dark:bg-white/10" />
      <div className="h-12 w-56 animate-pulse rounded-xl bg-black/5 dark:bg-white/10" />
      <div className="mt-4 h-24 max-w-3xl animate-pulse rounded-2xl bg-black/5 dark:bg-white/10" />

      <div className="mt-10 space-y-6">
        <div className="h-[180px] animate-pulse rounded-[30px] bg-black/5 dark:bg-white/10" />
        <div className="h-[180px] animate-pulse rounded-[30px] bg-black/5 dark:bg-white/10" />
      </div>
    </main>
  );
}
