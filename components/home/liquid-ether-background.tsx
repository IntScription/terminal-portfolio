"use client";

import { motion } from "framer-motion";

export function LiquidEtherBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-[-10%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl"
        animate={{
          x: [0, 60, -20, 0],
          y: [0, -24, 20, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[-8%] top-[14%] h-[26rem] w-[26rem] rounded-full bg-violet-400/10 blur-3xl"
        animate={{
          x: [0, -52, 24, 0],
          y: [0, 18, -20, 0],
          scale: [1, 0.96, 1.08, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-[22%] bottom-[-6%] h-[22rem] w-[22rem] rounded-full bg-emerald-400/8 blur-3xl"
        animate={{
          x: [0, 28, -24, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.06, 0.94, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_42%)]" />
    </div>
  );
}
