"use client";

import { ReactNode } from "react";
import { Header } from "@/components/layout/site-header";

export function WorkspaceShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[rgb(var(--background))] text-foreground">
      <Header />
      <div className="relative">{children}</div>
    </div>
  );
}
