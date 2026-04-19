"use client";

import { useEffect, useState } from "react";

export function TOC({
  headings,
}: {
  headings: Array<{ level: number; text: string; id: string }>;
}) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const handler = () => {
      const visible = headings.findLast((heading) => {
        const el = document.getElementById(heading.id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 140;
      });

      if (visible) setActive(visible.id);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [headings]);

  if (!headings.length) return null;

  return (
    <aside className="sticky top-24 rounded-[24px] border border-[rgba(var(--border))] bg-white/45 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.04)] dark:bg-white/5">
      <p className="text-xs uppercase tracking-[0.22em] text-foreground/45">
        on this page
      </p>

      <div className="mt-4 space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block text-sm transition ${active === heading.id
                ? "text-foreground"
                : "text-foreground/60 hover:text-foreground/85"
              } ${heading.level === 3 ? "pl-4" : ""}`}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </aside>
  );
}
