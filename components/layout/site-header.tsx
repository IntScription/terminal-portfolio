"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
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

export function SiteHeader() {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    setShowIntro(true);

    window.setTimeout(() => {
      setShowIntro(false);
      router.push("/");
    }, 3200);
  };

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[rgba(var(--border))] bg-[rgb(var(--background))]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            onClick={handleBrandClick}
            className="text-sm font-semibold tracking-[0.22em] text-foreground/78"
          >
            KARTIK
          </Link>

          <div className="hidden md:block">
            <div className="relative h-14 w-136">
              <GooeyNav items={gooeyItems} />
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-2xl border border-[rgba(var(--border))] bg-white/65 px-3 py-2 text-sm text-foreground/72 dark:bg-white/8 lg:flex">
            <span className="text-foreground/55">Command</span>
            <span className="rounded-md border border-[rgba(var(--border))] px-2 py-0.5 text-xs">
              K
            </span>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-site-menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-2xl border border-[rgba(var(--border))] bg-white/65 p-2 text-foreground/72 transition hover:bg-white dark:bg-white/8 dark:hover:bg-white/12 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div
              id="mobile-site-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="border-t border-[rgba(var(--border))] bg-[rgb(var(--background))]/95 px-4 py-4 backdrop-blur-xl md:hidden"
            >
              <nav className="flex flex-col gap-2">
                {gooeyItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleMobileLinkClick}
                    className="rounded-2xl border border-[rgba(var(--border))] bg-white/60 px-4 py-3 text-sm font-medium text-foreground/80 transition hover:bg-white dark:bg-white/6 dark:hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {showIntro ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-black/68 backdrop-blur-2xl"
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
        ) : null}
      </AnimatePresence>
    </>
  );
}

export const Header = SiteHeader;
