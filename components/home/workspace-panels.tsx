import Link from "next/link";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { Reveal } from "@/components/ui/reveal";

const panels = [
  {
    href: "/now",
    label: "now",
    title: "Current focus and momentum.",
    body: "What I am building, learning, and exploring right now.",
  },
  {
    href: "/uses",
    label: "uses",
    title: "Tools and workflow.",
    body: "The setup, tools, and systems that shape how I build.",
  },
  {
    href: "/about",
    label: "about",
    title: "The thinking behind the work.",
    body: "More about how I approach products, systems, interfaces, and creative work.",
  },
] as const;

export function WorkspacePanels() {
  return (
    <Reveal>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
            workspace panels
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Explore the current workspace.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {panels.map((panel) => (
            <Link key={panel.href} href={panel.href} prefetch className="group block">
              <InteractiveCard className="flex min-h-[260px] flex-col justify-between p-6 transition duration-200 group-hover:shadow-[0_0_0_1px_rgba(34,211,238,0.10),0_18px_40px_rgba(15,23,42,0.08),0_0_28px_rgba(34,211,238,0.12)]">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
                    {panel.label}
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold tracking-tight transition duration-200 group-hover:text-accent">
                    {panel.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-foreground/74">
                    {panel.body}
                  </p>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm text-foreground/52 transition duration-200 group-hover:text-foreground/72">
                  <span>Explore</span>
                  <span className="transition duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </InteractiveCard>
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
