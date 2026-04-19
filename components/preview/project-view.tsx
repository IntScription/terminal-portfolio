import Image from "next/image";
import { Project } from "@/lib/types";
import { SectionPill } from "@/components/ui/section-pill";

export function ProjectView({
  projects,
  featured = false,
}: {
  projects: Project[];
  featured?: boolean;
}) {
  return (
    <section className="min-h-140 rounded-[28px] border border-black/8 bg-white/50 p-6 backdrop-blur-2xl dark:border-white/15 dark:bg-white/5">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-foreground/60">
            projects
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            {featured ? projects[0]?.title : "Featured work"}
          </h2>
        </div>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <article
            id={project.slug}
            key={project.slug}
            className="scroll-mt-28 rounded-3xl border border-black/8 bg-white/50 p-5 transition hover:border-black/12 hover:bg-white/70 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/[0.07]"
          >
            <div className="flex flex-col gap-5">
              {project.image && (
                <div className="relative h-52 overflow-hidden rounded-2xl border border-black/8 dark:border-white/10">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-foreground/72">
                  {project.tagline}
                </p>
                <p className="mt-4 text-sm leading-7 text-foreground/78">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <SectionPill key={item} label={item} />
                ))}
              </div>

              <ul className="space-y-2 text-sm text-foreground/78">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>• {highlight}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm transition hover:bg-cyan-400/20"
                  >
                    Live demo
                  </a>
                )}

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-black/8 bg-white/70 px-4 py-2 text-sm transition hover:bg-white dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
                  >
                    Repository
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
