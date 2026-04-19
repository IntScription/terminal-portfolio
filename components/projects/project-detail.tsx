import Image from "next/image";
import { Project } from "@/lib/types";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
            project case study
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-foreground/72">
            {project.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-foreground/76">
            {project.overview ?? project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm transition hover:bg-cyan-400/20"
              >
                Live demo
              </a>
            ) : null}

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-[rgba(var(--border))] bg-white/70 px-4 py-2 text-sm transition hover:bg-white dark:bg-white/10 dark:hover:bg-white/15"
              >
                Repository
              </a>
            ) : null}
          </div>
        </div>

        {project.image ? (
          <div className="relative min-h-[360px] overflow-hidden rounded-[30px] border border-[rgba(var(--border))] bg-white/40 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        ) : null}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[28px] border border-[rgba(var(--border))] bg-white/45 p-6 dark:bg-white/5">
          <h2 className="text-lg font-semibold">Challenge</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/75">
            {project.challenge ?? "Explain the main product or engineering problem here."}
          </p>
        </div>

        <div className="rounded-[28px] border border-[rgba(var(--border))] bg-white/45 p-6 dark:bg-white/5">
          <h2 className="text-lg font-semibold">Solution</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/75">
            {project.solution ?? "Explain how you approached and solved it."}
          </p>
        </div>

        <div className="rounded-[28px] border border-[rgba(var(--border))] bg-white/45 p-6 dark:bg-white/5">
          <h2 className="text-lg font-semibold">Outcome</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/75">
            {project.outcome ?? "Explain what the result was and what it demonstrates."}
          </p>
        </div>
      </section>

      <section className="rounded-[30px] border border-[rgba(var(--border))] bg-white/45 p-6 dark:bg-white/5">
        <h2 className="text-2xl font-semibold tracking-tight">Highlights</h2>
        <ul className="mt-5 space-y-3 text-sm leading-7 text-foreground/76">
          {project.highlights.map((highlight) => (
            <li key={highlight}>• {highlight}</li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[rgba(var(--border))] bg-white/70 px-3 py-1 text-xs text-foreground/70 dark:bg-white/8"
            >
              {item}
            </span>
          ))}
        </div>
      </section>
    </article>
  );
}
