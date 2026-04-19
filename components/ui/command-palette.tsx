"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { COMMAND_PALETTE_ITEMS, THEMES } from "@/lib/constants";
import { useTheme } from "next-themes";

type Item = {
  label: string;
  action: () => void;
  group: string;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (isShortcut) {
        event.preventDefault();
        setOpen((prev) => !prev);
        setShowHelp(false);
      }

      if (event.key === "Escape") {
        setOpen(false);
        setShowHelp(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const items = useMemo<Item[]>(() => {
    const navItems: Item[] = COMMAND_PALETTE_ITEMS.map((item) => ({
      label: item.label,
      group: "Navigate",
      action: () => {
        router.push(item.href);
        setOpen(false);
      },
    }));

    const themeItems: Item[] = THEMES.map((theme) => ({
      label: `Theme: ${theme}`,
      group: "Themes",
      action: () => {
        setTheme(theme);
        setOpen(false);
      },
    }));

    return [...navItems, ...themeItems];
  }, [router, setTheme]);

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, filtered.length);
  }, [filtered.length]);

  useEffect(() => {
    const activeEl = itemRefs.current[activeIndex];
    if (activeEl && open && !showHelp) {
      activeEl.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
      activeEl.focus();
    }
  }, [activeIndex, open, showHelp]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        setShowHelp(false);
        return;
      }

      if (event.key === "?") {
        event.preventDefault();
        setShowHelp((prev) => !prev);
        return;
      }

      if (showHelp) return;

      if (!filtered.length) return;

      if (event.key === "ArrowDown" || event.key.toLowerCase() === "j") {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filtered.length);
      }

      if (event.key === "ArrowUp" || event.key.toLowerCase() === "k") {
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      }

      if (event.key === "Enter") {
        event.preventDefault();
        filtered[activeIndex]?.action();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filtered, activeIndex, showHelp]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => {
          setOpen(false);
          setShowHelp(false);
        }}
        className="absolute inset-0"
        aria-label="Close command palette"
      />
      <div className="relative mx-auto mt-24 w-full max-w-2xl rounded-[28px] border border-[rgba(var(--border))] bg-[rgb(var(--background-elevated))]/95 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[rgba(var(--border))] px-5 py-4">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages or themes..."
            className="w-full bg-transparent text-base outline-none placeholder:text-foreground/45"
          />
          <span className="ml-4 shrink-0 text-xs text-foreground/45">
            press ? for help
          </span>
        </div>

        {showHelp ? (
          <div className="space-y-3 px-5 py-5 text-sm text-foreground/72">
            <div className="rounded-2xl border border-[rgba(var(--border))] bg-white/60 px-4 py-4 dark:bg-white/8">
              <p className="font-medium text-foreground">Command palette keys</p>
              <div className="mt-3 space-y-2">
                <p><span className="font-mono">↑ / ↓</span> navigate</p>
                <p><span className="font-mono">j / k</span> vim navigation</p>
                <p><span className="font-mono">Enter</span> open selected item</p>
                <p><span className="font-mono">Esc</span> close palette</p>
                <p><span className="font-mono">?</span> toggle help</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-h-[26rem] overflow-y-auto p-2">
            {filtered.map((item, index) => (
              <button
                key={`${item.group}-${item.label}`}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={item.action}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition outline-none ${index === activeIndex
                    ? "bg-white/10 ring-1 ring-cyan-400/25"
                    : "hover:bg-white/8"
                  }`}
              >
                <span>{item.label}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-foreground/45">
                  {item.group}
                </span>
              </button>
            ))}

            {!filtered.length ? (
              <div className="px-4 py-6 text-sm text-foreground/55">
                No results found.
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
