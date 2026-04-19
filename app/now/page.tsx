import { notFound } from "next/navigation";
import { getNowData } from "@/lib/content/site";
import { BackLink } from "@/components/ui/back-link";
import { InteractiveCard } from "@/components/ui/interactive-card";

export default function NowPage() {
  const now = getNowData();

  if (!now) notFound();

  const primary = now.items.slice(0, 3);
  const secondary = now.items.slice(3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <BackLink href="/" label="Back to home" />

      <header className="max-w-5xl">
        <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
          now
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {now.title}
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/72 sm:text-lg">
          {now.intro}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300">
            building
          </span>
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            learning
          </span>
          <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
            refining
          </span>
        </div>
      </header>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {primary.map((item, index) => (
          <InteractiveCard key={item.label} className="min-h-[220px] p-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/40">
              0{index + 1}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-foreground/50">
              {item.label}
            </p>
            <p className="mt-4 text-base font-medium leading-8 text-foreground/82">
              {item.value}
            </p>
          </InteractiveCard>
        ))}
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <InteractiveCard className="p-7 sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
            current direction
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            What this phase looks like
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-8 text-foreground/74">
            <p>
              Right now the focus is on building deeper projects, improving the
              overall quality of the portfolio, making the interaction design feel
              sharper, and bringing more structure to the systems behind the work.
            </p>

            <p>
              This page is meant to feel more alive than a static summary. It
              reflects momentum, direction, and the things actively shaping the
              current workflow.
            </p>
          </div>
        </InteractiveCard>

        <InteractiveCard className="p-7 sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
            current signal
          </p>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-[rgba(var(--border))] bg-white/60 p-4 dark:bg-white/8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                mindset
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground/76">
                Build stronger systems. Make the details feel intentional.
              </p>
            </div>

            <div className="rounded-2xl border border-[rgba(var(--border))] bg-white/60 p-4 dark:bg-white/8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                priority
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground/76">
                Deeper case studies, smoother product polish, and stronger presentation quality.
              </p>
            </div>

            <div className="rounded-2xl border border-[rgba(var(--border))] bg-white/60 p-4 dark:bg-white/8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                status
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground/76">
                Actively iterating, refining, and pushing the work into a more complete form.
              </p>
            </div>
          </div>
        </InteractiveCard>
      </section>

      {secondary.length ? (
        <section className="mt-12 rounded-[30px] border border-[rgba(var(--border))] bg-white/55 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:bg-white/6 sm:p-8">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
              more updates
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {secondary.map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-[rgba(var(--border))] bg-white/60 p-5 dark:bg-white/8"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-foreground/50">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-8 text-foreground/76">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
