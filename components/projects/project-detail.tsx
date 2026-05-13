import Image from "next/image";
import type { IconType } from "react-icons";
import {
  SiCss,
  SiDocker,
  SiExpo,
  SiFramer,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiKubernetes,
  SiMarkdown,
  SiMdx,
  SiNextdotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRuby,
  SiSass,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import {
  FaCode,
  FaDatabase,
  FaGem,
  FaIcons,
  FaLock,
  FaRobot,
} from "react-icons/fa";
import type { Project } from "@/lib/content/projects";

const stackIcons: Record<string, IconType> = {
  // Devlog
  Jekyll: FaGem,
  Markdown: SiMarkdown,
  HTML: SiHtml5,
  SCSS: SiSass,
  CSS: SiCss,
  JavaScript: SiJavascript,
  Python: SiPython,
  Ruby: SiRuby,
  "GitHub Pages": SiGithub,

  // Web / frontend
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  Vite: SiVite,
  MDX: SiMdx,
  Motion: SiFramer,

  // Mobile
  "React Native": SiReact,
  Expo: SiExpo,

  // Backend / platform
  Supabase: SiSupabase,
  PostgreSQL: SiPostgresql,
  Stripe: SiStripe,
  Vercel: SiVercel,

  // DevOps
  Docker: SiDocker,
  "GitHub Actions": SiGithubactions,
  Kubernetes: SiKubernetes,
  Minikube: SiKubernetes,

  // AI / extras
  OpenAI: SiOpenai,
  OpenRouter: FaRobot,
  "React Icons": FaIcons,
  OGL: FaCode,

  // Other project stack labels
  RLS: FaLock,
  localStorage: FaDatabase,
  "Frankfurter API": FaCode,
};

function getStackIcon(item: string) {
  return stackIcons[item] ?? FaCode;
}

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
            project case study
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          {project.tagline ? (
            <p className="mt-4 max-w-2xl text-lg leading-8 text-foreground/72">
              {project.tagline}
            </p>
          ) : null}

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
          <div className="relative min-h-90 overflow-hidden rounded-[30px] border border-[rgba(var(--border))] bg-white/40 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : null}
      </section>

      {project.stack.length ? (
        <section className="rounded-[30px] border border-[rgba(var(--border))] bg-white/45 p-6 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
            Tech stack
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((item: string) => {
              const Icon = getStackIcon(item);

              return (
                <span
                  key={item}
                  className="group inline-flex items-center gap-2 rounded-full border border-[rgba(var(--border))] bg-white/70 px-3 py-1.5 text-xs text-foreground/75 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-foreground hover:text-background dark:bg-white/8 dark:hover:bg-white"
                >
                  <Icon className="text-sm transition duration-200 group-hover:scale-110" />
                  {item}
                </span>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[28px] border border-[rgba(var(--border))] bg-white/45 p-6 dark:bg-white/5">
          <h2 className="text-lg font-semibold">Challenge</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/75">
            {project.challenge ??
              "Explain the main product or engineering problem here."}
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
            {project.outcome ??
              "Explain what the result was and what it demonstrates."}
          </p>
        </div>
      </section>

      <section className="rounded-[30px] border border-[rgba(var(--border))] bg-white/45 p-6 dark:bg-white/5">
        <h2 className="text-2xl font-semibold tracking-tight">Highlights</h2>

        {project.highlights.length ? (
          <ul className="mt-5 space-y-3 text-sm leading-7 text-foreground/76">
            {project.highlights.map((highlight: string) => (
              <li key={highlight}>• {highlight}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm leading-7 text-foreground/70">
            Add project highlights in this project&apos;s meta.json.
          </p>
        )}
      </section>
    </article>
  );
}
