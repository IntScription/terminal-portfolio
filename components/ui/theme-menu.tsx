"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { THEMES } from "@/lib/constants";
import { SiteTheme } from "@/lib/types";

const themeDots: Record<SiteTheme, string[]> = {
  light: ["#111827", "#2563eb", "#7c3aed"],
  tokyonight: ["#7dcfff", "#bb9af7", "#f7768e"],
  dracula: ["#ff79c6", "#8be9fd", "#bd93f9"],
  catppuccin: ["#89b4fa", "#cba6f7", "#f38ba8"],
  nord: ["#88c0d0", "#81a1c1", "#bf616a"],
  gruvbox: ["#fabd2f", "#83a598", "#fb4934"],
  "rose-pine": ["#ebbcba", "#9ccfd8", "#c4a7e7"],
  "one-dark": ["#61afef", "#56b6c2", "#e06c75"],
  "ayu-dark": ["#ffb454", "#5ccfe6", "#ff6b6b"],
  "solarized-dark": ["#268bd2", "#2aa198", "#dc322f"],
};

export function ThemeMenu() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full border border-black/8 bg-white/55 px-3 py-1.5 text-sm text-foreground/80 transition hover:bg-white dark:border-white/10 dark:bg-white/5"
      >
        themes
      </button>

      {open && (
        <div className="absolute right-0 mt-2 min-w-[220px] overflow-hidden rounded-2xl border border-[rgba(var(--border))] bg-[rgb(var(--background-elevated))]/95 p-2 shadow-xl backdrop-blur-xl">
          {THEMES.map((item) => {
            const active = theme === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setTheme(item);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${active
                    ? "bg-white/10 text-foreground"
                    : "text-foreground/75 hover:bg-white/8 hover:text-foreground"
                  }`}
              >
                <span>{item}</span>
                <span className="flex gap-1">
                  {themeDots[item].map((dot) => (
                    <span
                      key={dot}
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: dot }}
                    />
                  ))}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
