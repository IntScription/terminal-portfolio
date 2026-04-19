import { notFound } from "next/navigation";
import { getUsesData, type UsesItem } from "@/lib/content/site";
import { BackLink } from "@/components/ui/back-link";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { StackGraph3D } from "@/components/uses/stack-graph-3d";

function getUsesItemName(item: UsesItem) {
  return typeof item === "string" ? item : item.name;
}

function getUsesItemDescription(item: UsesItem) {
  return typeof item === "string" ? null : item.description ?? null;
}

function getUsesItemCategory(item: UsesItem) {
  return typeof item === "string" ? null : item.category ?? null;
}

export default function UsesPage() {
  const uses = getUsesData();

  if (!uses) {
    notFound();
  }

  const coreGroups = uses.groups.slice(0, 3);
  const secondaryGroups = uses.groups.slice(3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <BackLink href="/" label="Back to home" />

      <header className="max-w-4xl">
        <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
          uses
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          {uses.title}
        </h1>

        <p className="mt-4 text-base leading-8 text-foreground/72">
          {uses.intro}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            workflow
          </span>
          <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
            systems
          </span>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            tools
          </span>
        </div>
      </header>

      <section className="mt-10">
        <InteractiveCard className="overflow-hidden p-7">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--accent),0.12),transparent_34%)]" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
              core stack
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Frontend, app, and backend as one connected setup
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-foreground/74">
              These are the primary layers of the current workflow. Instead of
              treating them as isolated tool lists, this section shows them as a
              connected system that supports building, shipping, and refining.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {coreGroups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-[28px] border border-[rgba(var(--border))] bg-white/60 p-5 shadow-[0_16px_32px_rgba(15,23,42,0.04)] dark:bg-white/8"
                >
                  <h3 className="text-lg font-semibold tracking-tight">
                    {group.title}
                  </h3>

                  <div className="mt-5 space-y-3">
                    {group.items.map((item) => {
                      const name = getUsesItemName(item);
                      const description = getUsesItemDescription(item);
                      const category = getUsesItemCategory(item);

                      return (
                        <div
                          key={`${group.title}-${name}`}
                          className="rounded-2xl border border-[rgba(var(--border))] bg-white/70 p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)] dark:bg-white/8"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-medium text-foreground/84">
                              {name}
                            </p>

                            {category ? (
                              <span className="rounded-full border border-[rgba(var(--border))] px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-foreground/50">
                                {category}
                              </span>
                            ) : null}
                          </div>

                          {description ? (
                            <p className="mt-2 text-xs leading-6 text-foreground/64">
                              {description}
                            </p>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </InteractiveCard>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <InteractiveCard className="p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
            setup philosophy
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            A setup built for depth and speed
          </h2>

          <p className="mt-4 text-sm leading-8 text-foreground/76">
            I prefer tools that support both experimentation and refinement.
            The ideal setup is one that makes it easier to build strong systems,
            shape better interfaces, and keep momentum without sacrificing
            quality.
          </p>

          <p className="mt-4 text-sm leading-8 text-foreground/76">
            The goal is not to use more tools. It is to make the tools feel like
            they belong to one coherent workflow.
          </p>
        </InteractiveCard>

        <InteractiveCard className="p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
            current setup signals
          </p>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-[rgba(var(--border))] bg-white/60 p-4 dark:bg-white/8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                priority
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground/76">
                Tools that help turn ideas into structured, polished systems.
              </p>
            </div>

            <div className="rounded-2xl border border-[rgba(var(--border))] bg-white/60 p-4 dark:bg-white/8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                balance
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground/76">
                Enough flexibility for experiments, enough stability for deeper
                builds.
              </p>
            </div>

            <div className="rounded-2xl border border-[rgba(var(--border))] bg-white/60 p-4 dark:bg-white/8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                outcome
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground/76">
                A workflow that supports product thinking, UI polish, and
                technical depth together.
              </p>
            </div>
          </div>
        </InteractiveCard>
      </section>

      <section className="mt-12">
        <div className="mb-5 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
            visual systems map
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            The stack as a connected workspace
          </h2>
          <p className="mt-3 text-sm leading-8 text-foreground/74">
            This graph turns the setup into a spatial map using the actual Uses
            data. As the content grows, the graph grows with it.
          </p>
        </div>

        <StackGraph3D uses={uses} />
      </section>

      {secondaryGroups.length ? (
        <section className="mt-12">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
              more tools
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {secondaryGroups.map((group) => (
              <InteractiveCard key={group.title} className="p-6">
                <h2 className="text-xl font-semibold tracking-tight">
                  {group.title}
                </h2>

                <div className="mt-5 space-y-3">
                  {group.items.map((item) => {
                    const name = getUsesItemName(item);
                    const description = getUsesItemDescription(item);
                    const category = getUsesItemCategory(item);

                    return (
                      <div
                        key={`${group.title}-${name}`}
                        className="rounded-2xl border border-[rgba(var(--border))] bg-white/60 p-4 dark:bg-white/8"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-medium text-foreground/82">
                            {name}
                          </p>

                          {category ? (
                            <span className="rounded-full border border-[rgba(var(--border))] px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-foreground/50">
                              {category}
                            </span>
                          ) : null}
                        </div>

                        {description ? (
                          <p className="mt-2 text-xs leading-6 text-foreground/64">
                            {description}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </InteractiveCard>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
