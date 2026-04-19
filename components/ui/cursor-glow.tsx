"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition duration-300"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(var(--accent), 0.10), transparent 40%)`,
      }}
    />
  );
}
