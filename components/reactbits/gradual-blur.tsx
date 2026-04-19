"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Position = "top" | "bottom" | "left" | "right";
type Curve = "linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out";
type Target = "parent" | "page";

type GradualBlurProps = {
  position?: Position;
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
  animated?: boolean | "scroll";
  duration?: string;
  easing?: string;
  opacity?: number;
  curve?: Curve;
  responsive?: boolean;
  target?: Target;
  className?: string;
  style?: React.CSSProperties;
  stopAtPageEnd?: boolean;
  fadeDistance?: number;
};

const CURVE_FUNCTIONS: Record<Curve, (p: number) => number> = {
  linear: (p) => p,
  bezier: (p) => p * p * (3 - 2 * p),
  "ease-in": (p) => p * p,
  "ease-out": (p) => 1 - Math.pow(1 - p, 2),
  "ease-in-out": (p) =>
    p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2,
};

function getGradientDirection(position: Position) {
  return (
    {
      top: "to top",
      bottom: "to bottom",
      left: "to left",
      right: "to right",
    }[position] || "to bottom"
  );
}

function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("gradual-blur-styles")) return;

  const style = document.createElement("style");
  style.id = "gradual-blur-styles";
  style.textContent = `
    .gradual-blur {
      isolation: isolate;
      pointer-events: none;
    }

    .gradual-blur-inner {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .gradual-blur-inner > div {
      -webkit-backdrop-filter: inherit;
      backdrop-filter: inherit;
    }

    @supports not (backdrop-filter: blur(1px)) {
      .gradual-blur-inner > div {
        background: rgba(0, 0, 0, 0.08);
      }
    }
  `;
  document.head.appendChild(style);
}

export default function GradualBlur({
  position = "bottom",
  strength = 1,
  height = "5rem",
  width,
  divCount = 4,
  exponential = false,
  zIndex = 30,
  animated = "scroll",
  duration = "0.25s",
  easing = "ease-out",
  opacity = 0.42,
  curve = "bezier",
  responsive = false,
  target = "page",
  className = "",
  style = {},
  stopAtPageEnd = true,
  fadeDistance = 120,
}: GradualBlurProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pageOpacity, setPageOpacity] = useState(1);

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    if (target !== "page" || !stopAtPageEnd) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const remaining = fullHeight - (scrollTop + viewportHeight);

      if (remaining <= 0) {
        setPageOpacity(0);
        return;
      }

      if (remaining < fadeDistance) {
        setPageOpacity(Math.max(0, remaining / fadeDistance));
        return;
      }

      setPageOpacity(1);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [target, stopAtPageEnd, fadeDistance]);

  const blurDivs = useMemo(() => {
    const layers: React.ReactNode[] = [];
    const increment = 100 / divCount;
    const curveFn = CURVE_FUNCTIONS[curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= divCount; i++) {
      let progress = i / divCount;
      progress = curveFn(progress);

      const blurValue = exponential
        ? Math.pow(2, progress * 3.2) * 0.04 * strength
        : 0.04 * (progress * divCount + 1) * strength;

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      const direction = getGradientDirection(position);

      layers.push(
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            maskImage: `linear-gradient(${direction}, ${gradient})`,
            WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
            backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            opacity,
          }}
        />
      );
    }

    return layers;
  }, [curve, divCount, exponential, opacity, position, strength]);

  const containerStyle = useMemo(() => {
    const isVertical = position === "top" || position === "bottom";
    const base: React.CSSProperties = {
      position: target === "page" ? "fixed" : "absolute",
      zIndex,
      opacity: animated === "scroll" ? pageOpacity : 1,
      transition: `opacity ${duration} ${easing}`,
      pointerEvents: "none",
      ...style,
    };

    if (isVertical) {
      base.height = height;
      base.width = width || "100%";
      base.left = 0;
      base.right = 0;
      base[position] = 0;
    } else {
      base.width = width || height;
      base.height = "100%";
      base.top = 0;
      base.bottom = 0;
      base[position] = 0;
    }

    return base;
  }, [
    animated,
    duration,
    easing,
    height,
    pageOpacity,
    position,
    style,
    target,
    width,
    zIndex,
  ]);

  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${className}`}
      style={containerStyle}
    >
      <div className="gradual-blur-inner">{blurDivs}</div>
    </div>
  );
}
