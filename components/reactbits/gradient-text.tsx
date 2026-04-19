"use client";

import { CSSProperties, ReactNode, useMemo } from "react";

type GradientTextProps = {
  children: ReactNode;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
};

export default function GradientText({
  children,
  colors = ["#5227FF", "#FF9FFC", "#B497CF"],
  animationSpeed = 8,
  showBorder = false,
  className = "",
}: GradientTextProps) {
  const gradient = useMemo(() => {
    const safe = colors.length >= 2 ? colors : ["#5227FF", "#FF9FFC", "#5227FF"];
    const looped = safe[0] === safe[safe.length - 1] ? safe : [...safe, safe[0]];
    return `linear-gradient(90deg, ${looped.join(", ")})`;
  }, [colors]);

  const style = {
    backgroundImage: gradient,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    animation: `gradient-text-shift ${animationSpeed}s linear infinite`,
  } as CSSProperties;

  return (
    <>
      <span
        className={[
          "inline-block",
          showBorder ? "rounded-[1.25rem] border border-white/10 px-4 py-2" : "",
          className,
        ].join(" ")}
        style={style}
      >
        {children}
      </span>

      <style jsx global>{`
        @keyframes gradient-text-shift {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </>
  );
}
