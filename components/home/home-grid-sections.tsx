import Link from "next/link";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { Reveal } from "@/components/ui/reveal";

export function HomeGridSections() {
  return (
    <Reveal>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <Link href="/now">
            <InteractiveCard className="p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
                now
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Current focus and momentum.
              </h3>
              <p className="mt-3 text-sm leading-7 text-foreground/74">
                What I am building, learning, and exploring right now.
              </p>
            </InteractiveCard>
          </Link>

          <Link href="/uses">
            <InteractiveCard className="p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
                uses
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Tools and workflow.
              </h3>
              <p className="mt-3 text-sm leading-7 text-foreground/74">
                The setup, tools, and systems that shape how I build.
              </p>
            </InteractiveCard>
          </Link>

          <Link href="/about">
            <InteractiveCard className="p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
                about
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                The thinking behind the work.
              </h3>
              <p className="mt-3 text-sm leading-7 text-foreground/74">
                More about how I approach products, systems, interfaces, and creative work.
              </p>
            </InteractiveCard>
          </Link>
        </div>
      </section>
    </Reveal>
  );
}
