"use client";

import { useEffect, useState } from "react";
import {
  ClosedTerminalCard,
  TerminalWindow,
} from "@/components/home/terminal-window";
import { LiquidEtherBackground } from "@/components/home/liquid-ether-background";
import RotatingText from "@/components/reactbits/rotating-text";

export function HomeHero() {
  const [terminalClosed, setTerminalClosed] = useState(false);
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  const [terminalExpanded, setTerminalExpanded] = useState(false);
  const [focusRequestKey, setFocusRequestKey] = useState(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isTypingTarget =
        tag === "input" || tag === "textarea" || target?.isContentEditable;

      if (isTypingTarget) return;

      if (event.key.toLowerCase() === "t") {
        event.preventDefault();
        setTerminalClosed(false);
        setTerminalMinimized(false);
        setFocusRequestKey((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <LiquidEtherBackground />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-5xl">
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              A portfolio built around
            </h1>

            <div className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              <RotatingText
                texts={["projects", "systems", "interfaces", "products", "workflow"]}
                mainClassName="inline-flex overflow-hidden rounded-lg bg-cyan-300 px-2 py-1 text-black sm:px-3 sm:py-1.5"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
                splitBy="characters"
                auto
                loop
              />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <p className="max-w-3xl text-base leading-8 text-foreground/72 sm:text-lg">
              Explore the work through a cleaner terminal-first interface.
            </p>

            <div className="text-base leading-8 text-foreground/72 sm:text-lg">
              Think in terms of{" "}
              <RotatingText
                texts={["build", "design", "refine", "ship", "improve"]}
                mainClassName="inline-flex overflow-hidden rounded-lg bg-white/75 px-2 py-0.5 text-foreground dark:bg-white/12"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
                splitBy="characters"
                auto
                loop
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-[rgba(var(--border))] bg-white/65 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-foreground/65 dark:bg-white/8">
              press T to open terminal
            </span>
          </div>
        </div>

        <div className="mt-10">
          {terminalClosed ? (
            <ClosedTerminalCard
              onOpenAction={() => {
                setTerminalClosed(false);
                setTerminalMinimized(false);
                setFocusRequestKey((prev) => prev + 1);
              }}
            />
          ) : (
            <TerminalWindow
              minimized={terminalMinimized}
              expanded={terminalExpanded}
              focusRequestKey={focusRequestKey}
              onCloseAction={() => setTerminalClosed(true)}
              onMinimizeAction={() => setTerminalMinimized(true)}
              onExpandAction={() => {
                setTerminalMinimized(false);
                setTerminalExpanded(true);
              }}
              onRestoreAction={() => {
                setTerminalMinimized(false);
                setTerminalExpanded(false);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
