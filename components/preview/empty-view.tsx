export function EmptyView({ onRunCommand }: { onRunCommand: (value: string) => void }) {
  return (
    <section className="flex min-h-140 flex-col justify-between rounded-[28px] border border-white/15 bg-white/10 p-6 backdrop-blur-2xl dark:bg-white/5">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-foreground/60">workspace preview</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Command-first portfolio, GUI-friendly layout.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/72">
          Explore projects, blog posts, setup details, and contact information through terminal commands or the top navigation.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => onRunCommand("projects")} className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm">
          Open projects
        </button>
        <button onClick={() => onRunCommand("blog")} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm">
          Read blog
        </button>
        <button onClick={() => onRunCommand("setup")} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm">
          View setup
        </button>
      </div>
    </section>
  );
}
