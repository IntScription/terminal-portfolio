import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { CommandPalette } from "@/components/ui/command-palette";

export const metadata: Metadata = {
  title: "Kartik Sanil — Portfolio",
  description:
    "A terminal-inspired portfolio for projects, writing, workflow, and systems-driven product building.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="relative min-h-screen bg-[rgb(var(--background))] text-foreground">
            <CursorGlow />
            <Header />
            <CommandPalette />
            <div className="relative">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
