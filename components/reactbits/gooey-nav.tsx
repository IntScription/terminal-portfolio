"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type GooeyNavItem = {
  label: string;
  href: string;
};

type GooeyNavProps = {
  items: GooeyNavItem[];
};

export default function GooeyNav({ items }: GooeyNavProps) {
  const pathname = usePathname();

  const activeIndex = items.findIndex((item) => pathname === item.href);
  const hasActive = activeIndex !== -1;

  return (
    <div className="relative flex h-14 items-center rounded-full border border-[rgba(var(--border))] bg-white/55 p-1 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:bg-white/8">
      {hasActive ? (
        <div
          className="absolute top-1 h-12 rounded-full bg-cyan-400/14 transition-all duration-300"
          style={{
            left: `calc(${activeIndex} * (100% / ${items.length}) + 0.25rem)`,
            width: `calc(100% / ${items.length} - 0.5rem)`,
          }}
        />
      ) : null}

      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative z-10 flex h-12 min-w-[5.5rem] flex-1 items-center justify-center rounded-full px-4 text-sm transition ${isActive
              ? "text-foreground"
              : "text-foreground/72 hover:text-foreground"
              }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
