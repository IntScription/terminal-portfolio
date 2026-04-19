import { notFound } from "next/navigation";
import LogoLoop from "@/components/reactbits/logo-loop";
import { getTechLogos } from "@/lib/project-tech-logos";
import { getProjectBySlug } from "@/lib/content/projects";
import { MDXRenderer } from "@/components/mdx/mdx-renderer";
import { BackLink } from "@/components/ui/back-link";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const logos = getTechLogos(project.stack);

  return (
    <main className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <BackLink href="/projects" label="Back to projects" />

        <article className="mt-4 space-y-12">
          <section className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start">
            <div className="order-2 min-w-0 lg:order-1">
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

              {project.description ? (
                <p className="mt-6 max-w-2xl text-sm leading-8 text-foreground/76">
                  {project.description}
                </p>
              ) : null}

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

                {project.appStoreUrl ? (
                  <a
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-[rgba(var(--border))] bg-white/70 px-4 py-2 text-sm transition hover:bg-white dark:bg-white/10 dark:hover:bg-white/15"
                  >
                    App Store
                  </a>
                ) : null}

                {project.playStoreUrl ? (
                  <a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-[rgba(var(--border))] bg-white/70 px-4 py-2 text-sm transition hover:bg-white dark:bg-white/10 dark:hover:bg-white/15"
                  >
                    Play Store
                  </a>
                ) : null}
              </div>

              {logos.length > 0 ? (
                <div className="mt-8 overflow-hidden">
                  <div className="relative h-14 sm:h-16">
                    <LogoLoop
                      logos={logos}
                      speed={90}
                      direction="left"
                      logoHeight={28}
                      gap={28}
                      hoverSpeed={0}
                      scaleOnHover
                      fadeOut={false}
                      ariaLabel="Project technology stack"
                    />
                  </div>
                </div>
              ) : null}
            </div>

            {project.image ? (
              <div className="order-1 overflow-hidden rounded-[28px] border border-[rgba(var(--border))] bg-white/40 shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:order-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}
          </section>

          <section className="mx-auto w-full max-w-4xl">
            <div className="rounded-[30px] border border-[rgba(var(--border))] bg-white/55 px-5 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:bg-white/6 sm:px-8 sm:py-10 lg:px-10">
              <div
                className="
    project-mdx
    text-[15px] leading-8 text-foreground/80
    sm:text-base

    [&>*:first-child]:mt-0
    [&>*:last-child]:mb-0

    /* headings */
    [&_h2]:mt-12
    [&_h2]:text-2xl
    [&_h2]:font-semibold
    [&_h2]:tracking-tight
    [&_h2]:text-foreground
    [&_h2]:sm:text-3xl

    [&_h3]:mt-8
    [&_h3]:text-xl
    [&_h3]:font-semibold
    [&_h3]:tracking-tight
    [&_h3]:text-foreground

    /* paragraphs */
    [&_p]:mt-4
    [&_p]:leading-8
    [&_p]:text-foreground/75

/* lists */
[&_ul]:mt-4
[&_ul]:pl-5
[&_ul]:list-disc
[&_ul]:space-y-2

[&_ol]:mt-4
[&_ol]:pl-5
[&_ol]:list-decimal
[&_ol]:space-y-2

[&_li]:pl-1
[&_li]:text-foreground/75
[&_li]:marker:text-foreground/40

    /* emphasis */
    [&_strong]:font-semibold
    [&_strong]:text-foreground

    /* blockquote */
    [&_blockquote]:mt-6
    [&_blockquote]:border-l-2
    [&_blockquote]:border-foreground/20
    [&_blockquote]:pl-4
    [&_blockquote]:italic
    [&_blockquote]:text-foreground/70

    /* inline code */
    [&_code]:rounded-md
    [&_code]:bg-black/5
    [&_code]:px-1.5
    [&_code]:py-0.5
    [&_code]:text-[0.95em]
    [&_code]:dark:bg-white/10

    /* code block */
    [&_pre]:mt-6
    [&_pre]:overflow-x-auto
    [&_pre]:rounded-xl
    [&_pre]:border
    [&_pre]:border-[rgba(var(--border))]
    [&_pre]:bg-black/90
    [&_pre]:p-4
    [&_pre]:text-sm
    [&_pre]:text-white

    /* images */
    [&_img]:mt-6
    [&_img]:rounded-xl
    [&_img]:border
    [&_img]:border-[rgba(var(--border))]

    /* divider */
    [&_hr]:my-10
    [&_hr]:border-0
    [&_hr]:border-t
    [&_hr]:border-[rgba(var(--border))]
  "
              >
                <MDXRenderer source={project.content} />
              </div>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
