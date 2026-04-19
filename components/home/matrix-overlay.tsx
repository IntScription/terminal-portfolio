"use client";

import { useEffect, useRef } from "react";

export function MatrixOverlay({
  onCloseAction,
}: {
  onCloseAction: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseAction();
    };

    window.addEventListener("keydown", onKeyDown);

    const canvas = canvasRef.current;
    if (!canvas) {
      return () => window.removeEventListener("keydown", onKeyDown);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return () => window.removeEventListener("keydown", onKeyDown);
    }

    const chars =
      "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=%<>[]{}";
    const fontSize = 16;
    let drops: number[] = [];
    let animationFrame = 0;
    let last = 0;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * canvas.height)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (timestamp: number) => {
      if (timestamp - last > 50) {
        ctx.fillStyle = "rgba(0,0,0,0.12)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#4ade80";
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i += 1) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }

          drops[i] += 1;
        }

        last = timestamp;
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [onCloseAction]);

  return (
    <div className="absolute inset-0 z-30 overflow-hidden rounded-[30px] bg-black">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute left-4 top-4 flex items-center gap-3">
        <button
          type="button"
          onClick={onCloseAction}
          className="rounded-full border border-green-400/25 bg-black/50 px-3 py-1.5 font-mono text-xs text-green-300 transition hover:bg-black/70"
        >
          exit matrix
        </button>
        <span className="font-mono text-xs text-green-400/70">
          press esc to close
        </span>
      </div>
    </div>
  );
}
