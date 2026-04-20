"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import MagicRings from "@/components/reactbits/magic-rings";
import GooeyNav from "@/components/reactbits/gooey-nav";
import GradientText from "@/components/reactbits/gradient-text";

const gooeyItems = [
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Now", href: "/now" },
  { label: "Uses", href: "/uses" },
  { label: "Assistant", href: "/assistant" },
];

const themeOptions = [
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
] as const;

type Theme = (typeof themeOptions)[number];

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function ThemeMenu({
  theme,
  setTheme,
  mobile = false,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
  mobile?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={
          mobile
            ? "flex w-full justify-between rounded-2xl border border-[rgba(var(--border))] bg-white/60 px-4 py-3 text-sm dark:bg-white/6"
            : "flex items-center gap-2 rounded-2xl border border-[rgba(var(--border))] bg-white/65 px-3 py-2 text-sm dark:bg-white/8"
        }
      >
        {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
        <span>{theme}</span>
        <ChevronDown size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 mt-2 w-52 rounded-xl border border-[rgba(var(--border))] bg-background p-2 shadow-xl"
          >
            {themeOptions.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTheme(t);
                  applyTheme(t);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-white/70 dark:hover:bg-white/8"
              >
                {t}
                {t === theme && <Check size={14} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const [showIntro, setShowIntro] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("tokyonight");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    setShowIntro(true);

    setTimeout(() => {
      setShowIntro(false);
      router.push("/");
    }, 1400);
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[rgba(var(--border))] bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            onClick={handleBrandClick}
            className="flex items-center gap-2 text-sm font-semibold tracking-widest"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            KARTIK
          </Link>

          <div className="hidden md:block">
            <GooeyNav items={gooeyItems} />
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeMenu theme={theme} setTheme={setTheme} />

            <div className="flex items-center gap-2 rounded-xl border border-[rgba(var(--border))] px-3 py-2 text-sm">
              <span>Command</span>
              <span className="border px-2 text-xs">K</span>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="md:hidden"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-70 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 z-80 h-full w-[85%] max-w-sm bg-background p-5 shadow-xl"
            >
              <ThemeMenu theme={theme} setTheme={setTheme} mobile />

              <nav className="mt-6 space-y-3">
                {gooeyItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 ${isActive(item.href)
                        ? "bg-cyan-400/10"
                        : "hover:bg-white/10"
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Intro */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-90 flex items-center justify-center bg-black/70"
          >
            <MagicRings color="#A855F7" ringCount={5} />
            <GradientText colors={["#5227FF", "#FF9FFC"]}>
              Welcome
            </GradientText>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export const Header = SiteHeader;
