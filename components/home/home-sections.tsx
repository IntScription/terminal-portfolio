"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const cards = [
  {
    label: "projects",
    title: "Builds with strong identity.",
    body:
      "Full-stack products, mobile work, game experiments, and systems-driven interfaces.",
    href: "/projects",
    cta: "Read projects",
  },
  {
    label: "writing",
    title: "Notes, process, and learnings.",
    body:
      "Articles on development, interfaces, product thinking, and building in public.",
    href: "/blog",
    cta: "View blogs",
  },
  {
    label: "about",
    title: "Developer, designer, builder.",
    body:
      "More about how I think, build, and shape products with technical and visual depth.",
    href: "/about",
    cta: "Read about",
  },
];

export function HomeSections() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-3">
        {cards.map((card, index) => (
          <motion.div
            key={card.href}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.05, duration: 0.25 }}
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
            className="group rounded-[28px] border border-black/8 bg-white/50 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] backdrop-blur-xl transition duration-150 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_18px_40px_rgba(0,0,0,0.16)]"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-foreground/55">
              {card.label}
            </p>
            <h3 className="mt-3 text-2xl font-semibold">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-foreground/72">
              {card.body}
            </p>

            <Link
              href={card.href}
              className="mt-6 inline-flex items-center rounded-2xl border border-[rgba(var(--border))] bg-white/70 px-4 py-2 text-sm font-medium text-foreground transition duration-150 hover:-translate-y-0.5 hover:bg-white dark:bg-white/10 dark:hover:bg-white/15"
            >
              {card.cta}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
