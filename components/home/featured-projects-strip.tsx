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
              className="group relative block overflow-hidden rounded-[28px] border border-[rgba(var(--border))] bg-black/5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
            >
              {/* IMAGE */}
              {project.image && (
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover blur-[2px] transition duration-700 group-hover:scale-105 group-hover:blur-0"
                  />
                </div>
              )}

              {/* READABILITY OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/10 transition duration-500 group-hover:from-black/25 group-hover:via-black/10 group-hover:to-transparent" />

              {/* NORMAL TEXT */}
              <div className="relative z-10 flex h-65 flex-col justify-end p-6 transition duration-500 group-hover:translate-y-4 group-hover:opacity-0">
                <p className="text-xs uppercase tracking-[0.24em] text-white/65">
                  {project.slug}
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white drop-shadow-sm">
                  {project.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/15 px-3 py-1 text-xs text-white/85 backdrop-blur"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* HOVER CTA */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition duration-500 group-hover:opacity-100">
                <span className="rounded-full border border-white/20 bg-black/40 px-5 py-2 text-sm font-medium text-white backdrop-blur-md transition duration-300 group-hover:scale-105">
                  View project →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
