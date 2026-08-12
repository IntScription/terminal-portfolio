import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atom Assistant",
  description:
    "Ask Atom deeper questions about the projects, stack, and ideas behind this portfolio.",
};

export default function AssistantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
