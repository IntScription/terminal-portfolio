import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { CommandPalette } from "@/components/ui/command-palette";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://terminal-portfolio-eight-theta.vercel.app";

const title = "Kartik Sanil — Portfolio";
const description =
  "A terminal-inspired portfolio for projects, writing, workflow, and systems-driven product building.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Kartik Sanil",
  },
  description,
  keywords: [
    "Kartik Sanil",
    "Full Stack Developer",
    "Next.js portfolio",
    "Terminal portfolio",
    "UI/UX builder",
    "React developer",
  ],
  authors: [{ name: "Kartik Sanil" }],
  creator: "Kartik Sanil",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: title,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
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
