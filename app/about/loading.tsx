export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 h-10 w-36 animate-pulse rounded-full bg-black/5 dark:bg-white/10" />

      <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="h-[420px] animate-pulse rounded-[30px] bg-black/5 dark:bg-white/10" />
        <div className="h-[420px] animate-pulse rounded-[30px] bg-black/5 dark:bg-white/10" />
      </div>
    </main>
  );
}
