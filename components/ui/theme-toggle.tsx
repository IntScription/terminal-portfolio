"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { SiteTheme } from "@/lib/types";

function useMounted() {
  return useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );
}

const allThemes: SiteTheme[] = [
  "light",
  "tokyonight",
  "dracula",
  "catppuccin",
  "nord",
  "gruvbox",
  "rose-pine",
  "one-dark",
  "ayu-dark",
  "solarized-dark",
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const current = mounted ? ((theme as SiteTheme) ?? "tokyonight") : "tokyonight";
  const safeCurrent = allThemes.includes(current) ? current : "tokyonight";
  const index = allThemes.indexOf(safeCurrent);
  const nextTheme = allThemes[(index + 1) % allThemes.length];

  return (
    <button
      type="button"
      onClick={() => {
        if (!mounted) return;
        setTheme(nextTheme);
      }}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-foreground/80 transition duration-150 hover:bg-white/10"
      aria-label="Cycle theme"
      title={`Current theme: ${mounted ? safeCurrent : "theme"}`}
    >
      {mounted ? safeCurrent : "theme"}
    </button>
  );
}
