import { notFound } from "next/navigation";
import { MDXRenderer } from "@/components/mdx/mdx-renderer";
import { getAboutContent, getProfileData } from "@/lib/content/site";
import { BackLink } from "@/components/ui/back-link";
import { InteractiveCard } from "@/components/ui/interactive-card";

const principles = [
  {
    title: "Build with intent",
    body: "I like products and interfaces that feel deliberate. Strong systems, clear structure, and thoughtful details matter more than noise.",
  },
  {
    title: "Polish is part of the work",
    body: "Visual quality and interaction quality are not extras. They shape how the work is felt and understood.",
  },
  {
    title: "Learn by making",
    body: "The strongest growth usually comes from building real things, solving real problems, and refining the result until it feels right.",
  },
];

const fallbackFocusAreas = [
  "Full-stack product development",
  "Terminal-inspired and systems-driven UI",
  "Cross-platform app building",
  "Developer workflow and tooling",
  "Interactive interface design",
  "Game and system experimentation",
];

const fallbackWorkStyle = [
  "I like turning rough ideas into structured systems.",
  "I usually think in layers: concept, architecture, interaction, polish.",
  "I enjoy improving both the visual side and the implementation side together.",
  "I prefer work that mixes creativity with technical depth.",
];

type ProfileHighlight = {
  label: string;
  value: string;
};

type ProfileStat = {
  label: string;
  value: string;
};

type ProfileStatus = {
  current?: string;
  learning?: string;
  goal?: string;
};

export default function AboutPage() {
  const about = getAboutContent();
  const profile = getProfileData() as
    | (ReturnType<typeof getProfileData> & {
      tagline?: string;
      focus?: string[];
      highlights?: ProfileHighlight[];
      stats?: ProfileStat[];
      status?: ProfileStatus;
    })
    | null;

  if (!about) {
    notFound();
  }

  const focusAreas =
    profile?.focus && profile.focus.length
      ? profile.focus
      : fallbackFocusAreas;

  const highlights = profile?.highlights ?? [];
  const stats = profile?.stats ?? [];
  const status = profile?.status;

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <BackLink href="/" label="Back to home" />

      <header className="max-w-5xl">
        <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
          about
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Builder, designer, and systems-focused developer.
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/72 sm:text-lg">
          I like building products where structure, interaction, and visual quality
          all matter at the same time. This page is less about a static bio and
          more about how I think, work, and refine ideas into something usable.
        </p>

        {(status?.current || status?.learning || status?.goal) && (
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {status?.current ? (
              <span className="rounded-full border border-[rgba(var(--border))] bg-white/65 px-3 py-1.5 text-foreground/74 dark:bg-white/8">
                Current: {status.current}
              </span>
            ) : null}
            {status?.learning ? (
              <span className="rounded-full border border-[rgba(var(--border))] bg-white/65 px-3 py-1.5 text-foreground/74 dark:bg-white/8">
                Learning: {status.learning}
              </span>
            ) : null}
            {status?.goal ? (
              <span className="rounded-full border border-[rgba(var(--border))] bg-white/65 px-3 py-1.5 text-foreground/74 dark:bg-white/8">
                Goal: {status.goal}
              </span>
            ) : null}
          </div>
        )}
      </header>

      <section className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <InteractiveCard className="p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
              profile
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              {profile?.name ?? "Kartik"}
            </h2>

            <p className="mt-2 text-sm leading-7 text-foreground/72">
              {profile?.title ?? "Developer"}
            </p>

            {profile?.tagline ? (
              <p className="mt-4 text-base leading-7 text-foreground/82">
                {profile.tagline}
              </p>
            ) : null}

            <div className="mt-5 space-y-3 text-sm text-foreground/72">
              {profile?.location ? (
                <div>
                  <span className="font-medium text-foreground">Location:</span>{" "}
                  {profile.location}
                </div>
              ) : null}

              {profile?.email ? (
                <div>
                  <span className="font-medium text-foreground">Email:</span>{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-accent underline decoration-accent/35 underline-offset-4"
                  >
                    {profile.email}
                  </a>
                </div>
              ) : null}
            </div>

            {highlights.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {highlights.map((item) => (
                  <span
                    key={`${item.label}-${item.value}`}
                    className="rounded-full border border-[rgba(var(--border))] bg-white/65 px-3 py-1.5 text-xs text-foreground/74 dark:bg-white/8"
                  >
                    {item.value}
                  </span>
                ))}
              </div>
            ) : null}
          </InteractiveCard>

          {(stats.length > 0 || status) && (
            <InteractiveCard className="p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
                overview
              </p>

              {stats.length ? (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {stats.map((stat) => (
                    <div
                      key={`${stat.label}-${stat.value}`}
                      className="rounded-2xl border border-[rgba(var(--border))] bg-white/60 p-3 text-center dark:bg-white/8"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[11px] text-foreground/50">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              {(status?.current || status?.learning || status?.goal) && (
                <div className="mt-5 space-y-3">
                  {status?.current ? (
                    <div className="rounded-2xl border border-[rgba(var(--border))] bg-white/60 px-4 py-4 dark:bg-white/8">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                        current
                      </p>
                      <p className="mt-2 text-sm leading-7 text-foreground/76">
                        {status.current}
                      </p>
                    </div>
                  ) : null}

                  {status?.learning ? (
                    <div className="rounded-2xl border border-[rgba(var(--border))] bg-white/60 px-4 py-4 dark:bg-white/8">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                        learning
                      </p>
                      <p className="mt-2 text-sm leading-7 text-foreground/76">
                        {status.learning}
                      </p>
                    </div>
                  ) : null}

                  {status?.goal ? (
                    <div className="rounded-2xl border border-[rgba(var(--border))] bg-white/60 px-4 py-4 dark:bg-white/8">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                        goal
                      </p>
                      <p className="mt-2 text-sm leading-7 text-foreground/76">
                        {status.goal}
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
            </InteractiveCard>
          )}
        </div>

        <section className="rounded-[30px] border border-[rgba(var(--border))] bg-white/55 px-5 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:bg-white/6 sm:px-8 sm:py-10 lg:px-10">
          <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
            background
          </p>

          <div
            className="
              about-mdx
              mt-6
              text-[15px] leading-8 text-foreground/80
              sm:text-base
              [&>*:first-child]:mt-0
              [&>*:last-child]:mb-0
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
              [&_p]:mt-4
              [&_p]:leading-8
              [&_p]:text-foreground/75
              [&_ul]:mt-4
              [&_ul]:list-disc
              [&_ul]:space-y-2
              [&_ul]:pl-5
              [&_ol]:mt-4
              [&_ol]:list-decimal
              [&_ol]:space-y-2
              [&_ol]:pl-5
              [&_li]:pl-1
              [&_li]:text-foreground/75
              [&_li]:marker:text-foreground/40
              [&_strong]:font-semibold
              [&_strong]:text-foreground
              [&_blockquote]:mt-6
              [&_blockquote]:border-l-2
              [&_blockquote]:border-foreground/20
              [&_blockquote]:pl-4
              [&_blockquote]:italic
              [&_blockquote]:text-foreground/70
              [&_code]:rounded-md
              [&_code]:bg-black/5
              [&_code]:px-1.5
              [&_code]:py-0.5
              [&_code]:text-[0.95em]
              [&_code]:dark:bg-white/10
              [&_pre]:mt-6
              [&_pre]:overflow-x-auto
              [&_pre]:rounded-xl
              [&_pre]:border
              [&_pre]:border-[rgba(var(--border))]
              [&_pre]:bg-black/90
              [&_pre]:p-4
              [&_pre]:text-sm
              [&_pre]:text-white
              [&_img]:mt-6
              [&_img]:rounded-xl
              [&_img]:border
              [&_img]:border-[rgba(var(--border))]
              [&_hr]:my-10
              [&_hr]:border-0
              [&_hr]:border-t
              [&_hr]:border-[rgba(var(--border))]
            "
          >
            <MDXRenderer source={about.content} />
          </div>
        </section>
      </section>

      <section className="mt-12">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
            principles
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {principles.map((item, index) => (
            <InteractiveCard key={item.title} className="p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/40">
                0{index + 1}
              </p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-8 text-foreground/76">
                {item.body}
              </p>
            </InteractiveCard>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[30px] border border-[rgba(var(--border))] bg-white/55 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:bg-white/6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
              focus areas
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              What I naturally move toward
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {focusAreas.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[rgba(var(--border))] bg-white/65 px-3 py-1.5 text-sm text-foreground/74 dark:bg-white/8"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-6 text-sm leading-8 text-foreground/76">
              I am most interested in work where product thinking, interface
              quality, and technical systems meet. That combination is what makes
              building feel the most meaningful to me.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
              how I like to work
            </p>

            <div className="mt-5 space-y-3">
              {fallbackWorkStyle.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[rgba(var(--border))] bg-white/60 px-4 py-4 text-sm leading-7 text-foreground/76 dark:bg-white/8"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
