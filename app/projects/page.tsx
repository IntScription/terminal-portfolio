import Particles from "@/components/reactbits/particles";
import { getAllProjects } from "@/lib/content/projects";
import { BackLink } from "@/components/ui/back-link";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-58">
        <Particles
          particleColors={["#8FD3FF", "#B497CF", "#FFFFFF"]}
          particleCount={110}
          particleSpread={9}
          speed={0.05}
          particleBaseSize={72}
          moveParticlesOnHover={false}
          alphaParticles
          disableRotation={false}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <BackLink href="/" label="Back to home" />

        <div className="mb-10 mt-4 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
            projects
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Selected work and case studies.
          </h1>
          <p className="mt-4 text-base leading-8 text-foreground/72">
            Product builds, interfaces, and engineering-focused work presented in a cleaner case-study format.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-[30px] border border-[rgba(var(--border))] bg-white/65 shadow-[0_18px_40px_rgba(15,23,42,0.05)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:bg-white/8 dark:hover:bg-white/12"
            >
              {project.image ? (
                <div className="aspect-[16/9] overflow-hidden border-b border-[rgba(var(--border))]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}

              <div className="p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
                  project
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  {project.title}
                </h2>
                {project.tagline ? (
                  <p className="mt-3 text-sm leading-7 text-foreground/72">
                    {project.tagline}
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
