"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/content/projects";
import { MDXRenderer } from "@/components/mdx/mdx-renderer";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";

function MetaRow({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value) return null;

  return (
    <div className="rounded-2xl border border-[rgba(var(--border))] bg-white/65 px-4 py-3 dark:bg-white/8">
      <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/45">
        {label}
      </p>
      <p className="mt-1 text-sm text-foreground/80">{value}</p>
    </div>
  );
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <article className="relative space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <InteractiveCard className="p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--accent),0.16),transparent_30%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
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
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm transition hover:scale-[1.02] hover:bg-cyan-400/20"
                  >
                    Live demo
                  </a>
                ) : null}

                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-[rgba(var(--border))] bg-white/70 px-4 py-2 text-sm transition hover:scale-[1.02] hover:bg-white dark:bg-white/10 dark:hover:bg-white/15"
                  >
                    Repository
                  </a>
                ) : null}
              </div>

              {project.stack?.length ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item: string) => (
                    <span
                      key={item}
                      className="rounded-full border border-[rgba(var(--border))] bg-white/70 px-3 py-1 text-xs text-foreground/70 dark:bg-white/8"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <MetaRow label="Role" value={project.role} />
                <MetaRow label="Year" value={project.year} />
                <MetaRow label="Status" value={project.status} />
                <MetaRow label="Platform" value={project.platform} />
              </div>
            </div>

            {project.image ? (
              <div className="overflow-hidden rounded-[30px] border border-[rgba(var(--border))] bg-white/40 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
                />
              </div>
            ) : null}
          </div>
        </InteractiveCard>
      </motion.section>

      {project.architecture ? (
        <ArchitectureDiagram
          nodes={project.architecture.nodes}
          edges={project.architecture.edges}
        />
      ) : null}

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.3, ease: "easeOut" }}
        className="mx-auto max-w-3xl"
      >
        <InteractiveCard className="p-7">
          <MDXRenderer source={project.content} />
        </InteractiveCard>
      </motion.section>
    </article>
  );
}
