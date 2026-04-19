"use client";

import { motion } from "framer-motion";

type MagicRingsProps = {
  color?: string;
  colorTwo?: string;
  ringCount?: number;
  speed?: number;
  lineThickness?: number;
  opacity?: number;
};

export default function MagicRings({
  color = "#A855F7",
  colorTwo = "#6366F1",
  ringCount = 6,
  speed = 1,
  lineThickness = 2,
  opacity = 1,
}: MagicRingsProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: ringCount }).map((_, i) => {
        const size = 220 + i * 60;
        const borderColor = i % 2 === 0 ? color : colorTwo;
        const duration = (10 + i * 1.8) / Math.max(speed, 0.1);

        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              border: `${lineThickness}px solid ${borderColor}`,
              opacity: Math.max(0.12, opacity - i * 0.1),
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.03, 1],
            }}
            transition={{
              rotate: {
                duration,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        );
      })}

      <motion.div
        className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: colorTwo,
          boxShadow: `0 0 28px ${colorTwo}`,
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
