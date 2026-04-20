"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useEffect, useState } from "react";
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
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={
          mobile
            ? "flex w-full items-center justify-between rounded-2xl border border-[rgba(var(--border))] bg-white/60 px-4 py-3 text-sm text-foreground/80 dark:bg-white/6"
            : "flex items-center gap-2 rounded-2xl border border-[rgba(var(--border))] bg-white/65 px-3 py-2 text-sm text-foreground/75 dark:bg-white/8"
        }
      >
        <span className="inline-flex items-center gap-2">
          {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
          <span className="capitalize">{theme.replace("-", " ")}</span>
        </span>
        <ChevronDown size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className={`${mobile ? "mt-2 w-full" : "absolute right-0 mt-2 w-56"
              } z-20 rounded-2xl border border-[rgba(var(--border))] bg-background p-2 shadow-xl`}
          >
            {themeOptions.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTheme(t);
                  applyTheme(t);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-foreground/80 transition hover:bg-white/70 dark:hover:bg-white/8"
              >
                <span className="capitalize">{t.replace("-", " ")}</span>
                {t === theme ? <Check size={14} /> : null}
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
    if (stored && themeOptions.includes(stored)) {
      setTheme(stored);
      applyTheme(stored);
      return;
    }
    applyTheme("tokyonight");
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setShowIntro(false);
      }
    };

    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileOpen(false);
    setShowIntro(true);

    window.setTimeout(() => {
      setShowIntro(false);
      router.push("/");
    }, 1400);
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const handleDrawerDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const draggedFarEnough = info.offset.x > 110;
    const flungFastEnough = info.velocity.x > 700;

    if (draggedFarEnough || flungFastEnough) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[rgba(var(--border))] bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            onClick={handleBrandClick}
            className="flex items-center gap-2 text-sm font-semibold tracking-[0.22em] text-foreground/78"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>KARTIK</span>
          </Link>

          <div className="hidden md:block">
            <GooeyNav items={[...gooeyItems]} />
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeMenu theme={theme} setTheme={setTheme} />

            <div className="hidden items-center gap-2 rounded-2xl border border-[rgba(var(--border))] bg-white/65 px-3 py-2 text-sm text-foreground/72 dark:bg-white/8 xl:flex">
              <span className="text-foreground/55">Command</span>
              <span className="rounded-md border border-[rgba(var(--border))] px-2 py-0.5 text-xs">
                K
              </span>
            </div>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-site-drawer"
            onClick={() => setMobileOpen((p) => !p)}
            className="inline-flex items-center justify-center rounded-2xl border border-[rgba(var(--border))] bg-white/65 p-2 text-foreground/72 transition hover:bg-white dark:bg-white/8 dark:hover:bg-white/12 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-70 bg-black/45 backdrop-blur-sm md:hidden"
            />

            <motion.aside
              id="mobile-site-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              drag="x"
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.12 }}
              dragMomentum={false}
              onDragEnd={handleDrawerDragEnd}
              className="fixed right-0 top-0 z-80 flex h-dvh w-[86vw] max-w-sm flex-col border-l border-[rgba(var(--border))] bg-background/96 shadow-2xl backdrop-blur-2xl md:hidden"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-[rgba(var(--border))] px-5 py-4">
                <div className="space-y-1">
                  <p className="text-sm font-semibold tracking-[0.22em] text-foreground/78">
                    MENU
                  </p>
                  <p className="text-xs text-foreground/45">
                    Swipe right to close
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center rounded-2xl border border-[rgba(var(--border))] bg-white/65 p-2 text-foreground/72 transition hover:bg-white dark:bg-white/8 dark:hover:bg-white/12"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="border-b border-[rgba(var(--border))] px-5 py-4">
                <ThemeMenu theme={theme} setTheme={setTheme} mobile />
              </div>

              <nav className="flex flex-1 flex-col gap-3 px-5 py-5" aria-label="Primary">
                {gooeyItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 18 }}
                    transition={{ delay: index * 0.04, duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition ${isActive(item.href)
                          ? "border-cyan-400/30 bg-cyan-400/10 text-foreground"
                          : "border-[rgba(var(--border))] bg-white/60 text-foreground/80 hover:bg-white dark:bg-white/6 dark:hover:bg-white/10"
                        }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-foreground/35">→</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="border-t border-[rgba(var(--border))] px-5 py-4">
                <p className="text-xs uppercase tracking-[0.22em] text-foreground/45">
                  Quick access
                </p>
                <p className="mt-2 text-sm text-foreground/68">
                  Projects, writing, background, setup, and assistant.
                </p>
              </div>

              <div className="px-5 pb-4">
                <div className="mx-auto mt-1 h-1.5 w-12 rounded-full bg-foreground/15" />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-90 flex items-center justify-center overflow-hidden bg-black/68 backdrop-blur-2xl"
          >
            <div className="absolute inset-0 opacity-55 blur-[2px]">
              <MagicRings
                color="#A855F7"
                colorTwo="#6366F1"
                ringCount={5}
                speed={0.8}
                lineThickness={1.5}
                opacity={0.55}
              />
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.58),transparent_60%)]" />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative z-10 px-6 text-center"
            >
              <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                <GradientText
                  colors={["#5227FF", "#FF9FFC", "#B497CF", "#5227FF"]}
                  animationSpeed={8}
                  showBorder={false}
                >
                  Welcome to my portfolio
                </GradientText>
              </h2>

              <p className="mt-6 text-sm font-medium uppercase tracking-[0.32em] sm:text-base">
                <GradientText
                  colors={["#B497CF", "#FF9FFC", "#8FD3FF", "#B497CF"]}
                  animationSpeed={10}
                  showBorder={false}
                >
                  systems · products · interfaces
                </GradientText>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export const Header = SiteHeader;
