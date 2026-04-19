import Link from "next/link";
import Image from "next/image";
import { ProjectMeta } from "@/lib/content/projects";
import { InteractiveCard } from "@/components/ui/interactive-card";

export function ProjectCardGrid({
  projects,
}: {
  projects: ProjectMeta[];
}) {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <Link key={project.slug} href={`/projects/${project.slug}`}>
          <InteractiveCard className="overflow-hidden">
            {project.image ? (
              <div className="relative h-56 overflow-hidden border-b border-[rgba(var(--border))]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-80" />
              </div>
            ) : null}

            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.26em] text-foreground/50">
                project
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                {project.title}
              </h2>

              <p className="mt-2 text-sm text-foreground/72">
                {project.tagline}
              </p>

              <p className="mt-4 text-sm leading-7 text-foreground/74">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[rgba(var(--border))] bg-white/70 px-3 py-1 text-xs text-foreground/70 dark:bg-white/8"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </InteractiveCard>
        </Link>
      ))}
    </section>
  );
}
