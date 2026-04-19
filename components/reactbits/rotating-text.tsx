"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type RotatingTextProps = {
  texts: string[];
  mainClassName?: string;
  staggerFrom?: "first" | "last";
  initial?: { y?: string | number; opacity?: number };
  animate?: { y?: string | number; opacity?: number };
  exit?: { y?: string | number; opacity?: number };
  staggerDuration?: number;
  splitLevelClassName?: string;
  transition?: {
    type?: string;
    damping?: number;
    stiffness?: number;
    duration?: number;
  };
  rotationInterval?: number;
  splitBy?: "characters" | "words";
  auto?: boolean;
  loop?: boolean;
};

export default function RotatingText({
  texts,
  mainClassName = "",
  initial = { y: "100%" },
  animate = { y: 0 },
  exit = { y: "-120%" },
  staggerDuration = 0.025,
  splitLevelClassName = "",
  transition = { type: "spring", damping: 30, stiffness: 400 },
  rotationInterval = 2000,
  splitBy = "characters",
  auto = true,
  loop = true,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!auto || texts.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= texts.length) return loop ? 0 : prev;
        return next;
      });
    }, rotationInterval);

    return () => window.clearInterval(timer);
  }, [auto, loop, rotationInterval, texts.length]);

  const current = texts[index] ?? "";
  const parts = splitBy === "words" ? current.split(" ") : current.split("");

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={current}
        layout
        className={`inline-flex whitespace-nowrap ${mainClassName}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          layout: {
            type: "spring",
            damping: 28,
            stiffness: 280,
          },
          opacity: {
            duration: 0.18,
          },
        }}
      >
        {parts.map((part, i) => (
          <span
            key={`${current}-${i}`}
            className={splitLevelClassName || "overflow-hidden"}
          >
            <motion.span
              className="inline-block whitespace-pre"
              initial={initial}
              animate={animate}
              exit={exit}
              transition={{
                ...transition,
                delay:
                  splitBy === "characters"
                    ? i * staggerDuration
                    : i * Math.max(staggerDuration * 3, 0.04),
              }}
            >
              {part}
              {splitBy === "words" && i < parts.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}
