import Link from "next/link";
import { getAllProjects } from "@/lib/content/projects";
import { Reveal } from "@/components/ui/reveal";

export function FeaturedProjectsStrip() {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 2);

  if (!featured.length) return null;

  return (
    <Reveal>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
              featured projects
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Selected builds worth exploring.
            </h2>
          </div>

          <Link
            href="/projects"
            className="rounded-2xl border border-[rgba(var(--border))] bg-white/70 px-4 py-2 text-sm transition duration-150 hover:-translate-y-0.5 hover:bg-white dark:bg-white/10 dark:hover:bg-white/15"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative overflow-hidden rounded-[28px] border border-[rgba(var(--border))] bg-black/5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
            >
              {/* IMAGE */}
              {project.image && (
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              )}

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* CONTENT */}
              <div className="relative z-10 flex h-[260px] flex-col justify-end p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-white/60">
                  {project.slug}
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  {project.title}
                </h3>

                {/* STACK (minimal) */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/15 px-3 py-1 text-xs text-white/80 backdrop-blur"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-4 text-sm text-white/80 transition group-hover:text-white">
                  View project →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
