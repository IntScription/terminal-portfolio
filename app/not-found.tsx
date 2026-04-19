import Link from "next/link";
import { BackLink } from "@/components/ui/back-link";
import { InteractiveCard } from "@/components/ui/interactive-card";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <BackLink href="/" label="Back to home" />

      <InteractiveCard className="overflow-hidden p-8 sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--accent),0.16),transparent_30%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
              404
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              command not found: page
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-foreground/72">
              The route you tried to open does not exist, was moved, or was never
              created in this workspace.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm transition hover:bg-cyan-400/20"
              >
                Return home
              </Link>

              <Link
                href="/projects"
                className="rounded-2xl border border-[rgba(var(--border))] bg-white/70 px-4 py-2 text-sm transition hover:bg-white dark:bg-white/10 dark:hover:bg-white/15"
              >
                View projects
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-[rgba(var(--border))] bg-[rgb(var(--terminal-screen))] p-5 font-mono text-sm shadow-inner">
            <div className="space-y-2 text-output">
              <div>
                <span className="text-prompt">kartik@portfolio ~ %</span>{" "}
                open /missing-route
              </div>
              <div className="text-error">command not found: page</div>
              <div className="text-hint">try: home</div>
              <div className="text-hint">try: projects</div>
              <div className="text-hint">try: blog</div>
              <div className="mt-4">
                <span className="text-prompt">kartik@portfolio ~ %</span>{" "}
                <span className="inline-block h-5 w-2.5 animate-pulse rounded-[2px] bg-foreground/70 align-middle" />
              </div>
            </div>
          </div>
        </div>
      </InteractiveCard>
    </main>
  );
}
