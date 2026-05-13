import type { ReactNode } from "react";
import {
  SiCss,
  SiDocker,
  SiExpo,
  SiFramer,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiKubernetes,
  SiMarkdown,
  SiMdx,
  SiNextdotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRuby,
  SiSass,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { FaCode, FaDatabase, FaGem, FaIcons, FaLock, FaRobot } from "react-icons/fa";

export type ProjectLogoItem = {
  node: ReactNode;
  title: string;
  href?: string;
  ariaLabel?: string;
};

const logoMap: Record<string, ProjectLogoItem> = {
  // Devlog / static site
  Jekyll: {
    node: <FaGem />,
    title: "Jekyll",
    href: "https://jekyllrb.com",
  },
  Markdown: {
    node: <SiMarkdown />,
    title: "Markdown",
    href: "https://www.markdownguide.org",
  },
  HTML: {
    node: <SiHtml5 />,
    title: "HTML",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  CSS: {
    node: <SiCss />,
    title: "CSS",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  SCSS: {
    node: <SiSass />,
    title: "SCSS",
    href: "https://sass-lang.com",
  },
  JavaScript: {
    node: <SiJavascript />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  Python: {
    node: <SiPython />,
    title: "Python",
    href: "https://www.python.org",
  },
  Ruby: {
    node: <SiRuby />,
    title: "Ruby",
    href: "https://www.ruby-lang.org",
  },
  "GitHub Pages": {
    node: <SiGithub />,
    title: "GitHub Pages",
    href: "https://pages.github.com",
  },

  // Web / frontend
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
  Vite: {
    node: <SiVite />,
    title: "Vite",
    href: "https://vitejs.dev",
  },
  MDX: {
    node: <SiMdx />,
    title: "MDX",
    href: "https://mdxjs.com",
  },
  Motion: {
    node: <SiFramer />,
    title: "Motion",
    href: "https://motion.dev",
  },

  // Mobile
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

  // Backend / platform
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
  Stripe: {
    node: <SiStripe />,
    title: "Stripe",
    href: "https://stripe.com",
  },
  Vercel: {
    node: <SiVercel />,
    title: "Vercel",
    href: "https://vercel.com",
  },

  // DevOps
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
  Minikube: {
    node: <SiKubernetes />,
    title: "Minikube",
    href: "https://minikube.sigs.k8s.io/docs",
  },

  // AI / extras
  OpenAI: {
    node: <SiOpenai />,
    title: "OpenAI",
    href: "https://openai.com",
  },
  OpenRouter: {
    node: <FaRobot />,
    title: "OpenRouter",
    href: "https://openrouter.ai",
  },
  "React Icons": {
    node: <FaIcons />,
    title: "React Icons",
    href: "https://react-icons.github.io/react-icons",
  },
  OGL: {
    node: <FaCode />,
    title: "OGL",
    href: "https://github.com/oframe/ogl",
  },

  // Other project stack labels
  RLS: {
    node: <FaLock />,
    title: "Row Level Security",
    href: "https://supabase.com/docs/guides/database/postgres/row-level-security",
  },
  localStorage: {
    node: <FaDatabase />,
    title: "localStorage",
    href: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
  },
  "Frankfurter API": {
    node: <FaCode />,
    title: "Frankfurter API",
    href: "https://www.frankfurter.app",
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
