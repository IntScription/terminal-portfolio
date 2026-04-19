"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

export function InteractiveCard({
  children,
  className,
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [style, setStyle] = useState<React.CSSProperties>({
    ["--mx" as string]: "50%",
    ["--my" as string]: "50%",
  });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setStyle({
      ["--mx" as string]: `${(x / rect.width) * 100}%`,
      ["--my" as string]: `${(y / rect.height) * 100}%`,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -4, rotateX: 1.2, rotateY: -1.2, scale: 1.01 }
      }
      transition={{ duration: 0.14, ease: "easeOut" }}
      style={{ ...style, transformPerspective: 1000 }}
      className={cn(
        "interactive-card relative overflow-hidden rounded-[30px] border border-[rgba(var(--border))] bg-white/50 shadow-[0_18px_40px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:bg-white/5",
        className
      )}
      {...(glow ? { "data-glow": "true" } : {})}
    >
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}
