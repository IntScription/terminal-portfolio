export function PageView({ title, body }: { title: string; body: string }) {
  return (
    <section className="min-h-140 rounded-[28px] border border-white/15 bg-white/10 p-6 backdrop-blur-2xl dark:bg-white/5">
      <p className="text-xs uppercase tracking-[0.28em] text-foreground/60">page</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-6 whitespace-pre-line text-sm leading-8 text-foreground/78">{body}</div>
    </section>
  );
}
