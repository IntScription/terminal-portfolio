import type { ReactNode } from "react";
import {
  SiDocker,
  SiExpo,
  SiGithubactions,
  SiKubernetes,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

export type ProjectLogoItem = {
  node: ReactNode;
  title: string;
  href?: string;
  ariaLabel?: string;
};

const logoMap: Record<string, ProjectLogoItem> = {
  "Next.js": {
    node: <SiNextdotjs />,
    title: "Next.js",
    href: "https://nextjs.org",
  },
  React: {
    node: <SiReact />,
    title: "React",
    href: "https://react.dev",
  },
  TypeScript: {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  "Tailwind CSS": {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  "React Native": {
    node: <TbBrandReactNative />,
    title: "React Native",
    href: "https://reactnative.dev",
  },
  Expo: {
    node: <SiExpo />,
    title: "Expo",
    href: "https://expo.dev",
  },
  Supabase: {
    node: <SiSupabase />,
    title: "Supabase",
    href: "https://supabase.com",
  },
  PostgreSQL: {
    node: <SiPostgresql />,
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
  },
  Docker: {
    node: <SiDocker />,
    title: "Docker",
    href: "https://www.docker.com",
  },
  "GitHub Actions": {
    node: <SiGithubactions />,
    title: "GitHub Actions",
    href: "https://github.com/features/actions",
  },
  Kubernetes: {
    node: <SiKubernetes />,
    title: "Kubernetes",
    href: "https://kubernetes.io",
  },
  Vercel: {
    node: <SiVercel />,
    title: "Vercel",
    href: "https://vercel.com",
  },
};

export function getTechLogos(stack: string[] = []): ProjectLogoItem[] {
  const seen = new Set<string>();

  return stack
    .filter((item) => {
      if (!item || seen.has(item)) return false;
      seen.add(item);
      return true;
    })
    .map((item) => logoMap[item])
    .filter(Boolean);
}
