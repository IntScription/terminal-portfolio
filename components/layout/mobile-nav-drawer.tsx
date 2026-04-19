"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import { ThemeMenu } from "@/components/ui/theme-menu";
import { cn } from "@/lib/utils";

export function MobileNavDrawer({
  open,
  onCloseAction,
}: {
  open: boolean;
  onCloseAction: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseAction();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCloseAction]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] lg:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onCloseAction}
        className="absolute inset-0 bg-black/35 backdrop-blur-sm"
      />

      <div className="absolute right-0 top-0 h-full w-[88vw] max-w-sm border-l border-[rgba(var(--border))] bg-[rgb(var(--background-elevated))]/95 p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-foreground/50">
              navigation
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              Workspace menu
            </h2>
          </div>

          <button
            type="button"
            onClick={onCloseAction}
            className="rounded-full border border-[rgba(var(--border))] bg-white/65 px-3 py-1.5 text-sm transition hover:bg-white dark:bg-white/8 dark:hover:bg-white/12"
          >
            Close
          </button>
        </div>

        <div className="mt-6 space-y-2">
          <Link
            href="/"
            onClick={onCloseAction}
            className={cn(
              "block rounded-2xl px-4 py-3 text-sm transition",
              pathname === "/"
                ? "border border-cyan-400/35 bg-cyan-400/10 text-foreground"
                : "border border-transparent bg-white/55 text-foreground/75 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10"
            )}
          >
            Home
          </Link>

          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseAction}
                className={cn(
                  "block rounded-2xl px-4 py-3 text-sm transition",
                  active
                    ? "border border-cyan-400/35 bg-cyan-400/10 text-foreground"
                    : "border border-transparent bg-white/55 text-foreground/75 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-6 rounded-[24px] border border-[rgba(var(--border))] bg-white/45 p-4 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.22em] text-foreground/45">
            appearance
          </p>
          <div className="mt-3">
            <ThemeMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
