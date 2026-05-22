import type { ReactNode } from "react";
import {
  SiAngular,
  SiAnsible,
  SiApache,
  SiApollographql,
  SiAppwrite,
  SiAstro,
  SiAuth0,
  SiBitbucket,
  SiBootstrap,
  SiBun,
  SiC,
  SiCloudflare,
  SiCplusplus,
  SiCss,
  SiDart,
  SiDeno,
  SiDjango,
  SiDocker,
  SiElectron,
  SiEslint,
  SiExpo,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiFlutter,
  SiFramer,
  SiGatsby,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGitlab,
  SiGo,
  SiGooglecloud,
  SiGraphql,
  SiHeroku,
  SiHomebrew,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiKeras,
  SiKotlin,
  SiKubernetes,
  SiLaravel,
  SiLua,
  SiMarkdown,
  SiMdx,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNeovim,
  SiNestjs,
  SiNetlify,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiNpm,
  SiNumpy,
  SiOpenai,
  SiPandas,
  SiPhp,
  SiPnpm,
  SiPostgresql,
  SiPrettier,
  SiPrisma,
  SiPytorch,
  SiPython,
  SiReact,
  SiRedis,
  SiRemix,
  SiRuby,
  SiRubyonrails,
  SiRust,
  SiSass,
  SiScikitlearn,
  SiSharp,
  SiSpringboot,
  SiSqlite,
  SiStripe,
  SiSupabase,
  SiSvelte,
  SiSwift,
  SiTailwindcss,
  SiTauri,
  SiTensorflow,
  SiTerraform,
  SiThreedotjs,
  SiTmux,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
  SiWebpack,
  SiYarn,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import {
  FaAndroid,
  FaApple,
  FaBolt,
  FaCloud,
  FaCode,
  FaDatabase,
  FaGem,
  FaIcons,
  FaLock,
  FaRobot,
  FaSearch,
  FaServer,
  FaTerminal,
} from "react-icons/fa";

export type ProjectLogoItem = {
  node: ReactNode;
  title: string;
  href?: string;
  ariaLabel?: string;
};

const logoMap: Record<string, ProjectLogoItem> = {
  // Languages
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
  Sass: {
    node: <SiSass />,
    title: "Sass",
    href: "https://sass-lang.com",
  },
  JavaScript: {
    node: <SiJavascript />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  TypeScript: {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
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
  Rust: {
    node: <SiRust />,
    title: "Rust",
    href: "https://www.rust-lang.org",
  },
  Go: {
    node: <SiGo />,
    title: "Go",
    href: "https://go.dev",
  },
  Java: {
    node: <FaCode />,
    title: "Java",
    href: "https://www.java.com",
  },
  Kotlin: {
    node: <SiKotlin />,
    title: "Kotlin",
    href: "https://kotlinlang.org",
  },
  Swift: {
    node: <SiSwift />,
    title: "Swift",
    href: "https://www.swift.org",
  },
  Dart: {
    node: <SiDart />,
    title: "Dart",
    href: "https://dart.dev",
  },
  PHP: {
    node: <SiPhp />,
    title: "PHP",
    href: "https://www.php.net",
  },
  C: {
    node: <SiC />,
    title: "C",
    href: "https://en.wikipedia.org/wiki/C_(programming_language)",
  },
  "C++": {
    node: <SiCplusplus />,
    title: "C++",
    href: "https://isocpp.org",
  },
  "C#": {
    node: <SiSharp />,
    title: "C#",
    href: "https://dotnet.microsoft.com/languages/csharp",
  },
  Lua: {
    node: <SiLua />,
    title: "Lua",
    href: "https://www.lua.org",
  },

  // Frontend / web
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
  Vite: {
    node: <SiVite />,
    title: "Vite",
    href: "https://vitejs.dev",
  },
  Vue: {
    node: <SiVuedotjs />,
    title: "Vue",
    href: "https://vuejs.org",
  },
  Nuxt: {
    node: <SiVuedotjs />,
    title: "Nuxt",
    href: "https://nuxt.com",
  },
  Angular: {
    node: <SiAngular />,
    title: "Angular",
    href: "https://angular.dev",
  },
  Svelte: {
    node: <SiSvelte />,
    title: "Svelte",
    href: "https://svelte.dev",
  },
  SvelteKit: {
    node: <SiSvelte />,
    title: "SvelteKit",
    href: "https://svelte.dev/docs/kit/introduction",
  },
  Astro: {
    node: <SiAstro />,
    title: "Astro",
    href: "https://astro.build",
  },
  Remix: {
    node: <SiRemix />,
    title: "Remix",
    href: "https://remix.run",
  },
  Gatsby: {
    node: <SiGatsby />,
    title: "Gatsby",
    href: "https://www.gatsbyjs.com",
  },
  "Tailwind CSS": {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  Bootstrap: {
    node: <SiBootstrap />,
    title: "Bootstrap",
    href: "https://getbootstrap.com",
  },
  "Material UI": {
    node: <SiMui />,
    title: "Material UI",
    href: "https://mui.com",
  },
  "shadcn/ui": {
    node: <FaCode />,
    title: "shadcn/ui",
    href: "https://ui.shadcn.com",
  },
  MDX: {
    node: <SiMdx />,
    title: "MDX",
    href: "https://mdxjs.com",
  },
  Markdown: {
    node: <SiMarkdown />,
    title: "Markdown",
    href: "https://www.markdownguide.org",
  },
  Motion: {
    node: <SiFramer />,
    title: "Motion",
    href: "https://motion.dev",
  },
  "Framer Motion": {
    node: <SiFramer />,
    title: "Framer Motion",
    href: "https://motion.dev",
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
  "Three.js": {
    node: <SiThreedotjs />,
    title: "Three.js",
    href: "https://threejs.org",
  },

  // Mobile / desktop
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
  Flutter: {
    node: <SiFlutter />,
    title: "Flutter",
    href: "https://flutter.dev",
  },
  Electron: {
    node: <SiElectron />,
    title: "Electron",
    href: "https://www.electronjs.org",
  },
  Tauri: {
    node: <SiTauri />,
    title: "Tauri",
    href: "https://tauri.app",
  },
  Android: {
    node: <FaAndroid />,
    title: "Android",
    href: "https://developer.android.com",
  },
  iOS: {
    node: <FaApple />,
    title: "iOS",
    href: "https://developer.apple.com/ios",
  },

  // Backend / APIs
  "Node.js": {
    node: <SiNodedotjs />,
    title: "Node.js",
    href: "https://nodejs.org",
  },
  Express: {
    node: <SiExpress />,
    title: "Express",
    href: "https://expressjs.com",
  },
  NestJS: {
    node: <SiNestjs />,
    title: "NestJS",
    href: "https://nestjs.com",
  },
  FastAPI: {
    node: <SiFastapi />,
    title: "FastAPI",
    href: "https://fastapi.tiangolo.com",
  },
  Django: {
    node: <SiDjango />,
    title: "Django",
    href: "https://www.djangoproject.com",
  },
  Flask: {
    node: <SiFlask />,
    title: "Flask",
    href: "https://flask.palletsprojects.com",
  },
  "Spring Boot": {
    node: <SiSpringboot />,
    title: "Spring Boot",
    href: "https://spring.io/projects/spring-boot",
  },
  Laravel: {
    node: <SiLaravel />,
    title: "Laravel",
    href: "https://laravel.com",
  },
  Rails: {
    node: <SiRubyonrails />,
    title: "Ruby on Rails",
    href: "https://rubyonrails.org",
  },
  GraphQL: {
    node: <SiGraphql />,
    title: "GraphQL",
    href: "https://graphql.org",
  },
  Apollo: {
    node: <SiApollographql />,
    title: "Apollo GraphQL",
    href: "https://www.apollographql.com",
  },
  "REST API": {
    node: <FaServer />,
    title: "REST API",
    href: "https://developer.mozilla.org/en-US/docs/Glossary/REST",
  },

  // Databases / backend services
  Supabase: {
    node: <SiSupabase />,
    title: "Supabase",
    href: "https://supabase.com",
  },
  Firebase: {
    node: <SiFirebase />,
    title: "Firebase",
    href: "https://firebase.google.com",
  },
  Appwrite: {
    node: <SiAppwrite />,
    title: "Appwrite",
    href: "https://appwrite.io",
  },
  PostgreSQL: {
    node: <SiPostgresql />,
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
  },
  MySQL: {
    node: <SiMysql />,
    title: "MySQL",
    href: "https://www.mysql.com",
  },
  SQLite: {
    node: <SiSqlite />,
    title: "SQLite",
    href: "https://www.sqlite.org",
  },
  MongoDB: {
    node: <SiMongodb />,
    title: "MongoDB",
    href: "https://www.mongodb.com",
  },
  Redis: {
    node: <SiRedis />,
    title: "Redis",
    href: "https://redis.io",
  },
  Prisma: {
    node: <SiPrisma />,
    title: "Prisma",
    href: "https://www.prisma.io",
  },
  Database: {
    node: <FaDatabase />,
    title: "Database",
  },

  // Auth / payments
  Stripe: {
    node: <SiStripe />,
    title: "Stripe",
    href: "https://stripe.com",
  },
  Auth0: {
    node: <SiAuth0 />,
    title: "Auth0",
    href: "https://auth0.com",
  },
  Auth: {
    node: <FaLock />,
    title: "Authentication",
  },
  JWT: {
    node: <FaLock />,
    title: "JWT",
    href: "https://jwt.io",
  },
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

  // DevOps / cloud
  Docker: {
    node: <SiDocker />,
    title: "Docker",
    href: "https://www.docker.com",
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
  Terraform: {
    node: <SiTerraform />,
    title: "Terraform",
    href: "https://www.terraform.io",
  },
  Ansible: {
    node: <SiAnsible />,
    title: "Ansible",
    href: "https://www.ansible.com",
  },
  Nginx: {
    node: <SiNginx />,
    title: "Nginx",
    href: "https://nginx.org",
  },
  Apache: {
    node: <SiApache />,
    title: "Apache",
    href: "https://httpd.apache.org",
  },
  Vercel: {
    node: <SiVercel />,
    title: "Vercel",
    href: "https://vercel.com",
  },
  Netlify: {
    node: <SiNetlify />,
    title: "Netlify",
    href: "https://www.netlify.com",
  },
  Cloudflare: {
    node: <SiCloudflare />,
    title: "Cloudflare",
    href: "https://www.cloudflare.com",
  },
  AWS: {
    node: <FaCloud />,
    title: "AWS",
    href: "https://aws.amazon.com",
  },
  "Google Cloud": {
    node: <SiGooglecloud />,
    title: "Google Cloud",
    href: "https://cloud.google.com",
  },
  Azure: {
    node: <FaCloud />,
    title: "Microsoft Azure",
    href: "https://azure.microsoft.com",
  },
  Heroku: {
    node: <SiHeroku />,
    title: "Heroku",
    href: "https://www.heroku.com",
  },

  // Git / tooling
  Git: {
    node: <SiGit />,
    title: "Git",
    href: "https://git-scm.com",
  },
  GitHub: {
    node: <SiGithub />,
    title: "GitHub",
    href: "https://github.com",
  },
  "GitHub Actions": {
    node: <SiGithubactions />,
    title: "GitHub Actions",
    href: "https://github.com/features/actions",
  },
  "GitHub Releases": {
    node: <SiGithub />,
    title: "GitHub Releases",
    href: "https://docs.github.com/en/repositories/releasing-projects-on-github",
  },
  GitLab: {
    node: <SiGitlab />,
    title: "GitLab",
    href: "https://gitlab.com",
  },
  Bitbucket: {
    node: <SiBitbucket />,
    title: "Bitbucket",
    href: "https://bitbucket.org",
  },
  npm: {
    node: <SiNpm />,
    title: "npm",
    href: "https://www.npmjs.com",
  },
  Yarn: {
    node: <SiYarn />,
    title: "Yarn",
    href: "https://yarnpkg.com",
  },
  pnpm: {
    node: <SiPnpm />,
    title: "pnpm",
    href: "https://pnpm.io",
  },
  Bun: {
    node: <SiBun />,
    title: "Bun",
    href: "https://bun.sh",
  },
  Deno: {
    node: <SiDeno />,
    title: "Deno",
    href: "https://deno.com",
  },
  Webpack: {
    node: <SiWebpack />,
    title: "Webpack",
    href: "https://webpack.js.org",
  },
  Turbopack: {
    node: <FaBolt />,
    title: "Turbopack",
    href: "https://turbo.build/pack",
  },
  ESLint: {
    node: <SiEslint />,
    title: "ESLint",
    href: "https://eslint.org",
  },
  Prettier: {
    node: <SiPrettier />,
    title: "Prettier",
    href: "https://prettier.io",
  },

  // Terminal / workflow tools
  "Terminal UI": {
    node: <FaTerminal />,
    title: "Terminal UI",
    href: "https://en.wikipedia.org/wiki/Text-based_user_interface",
  },
  TUI: {
    node: <FaTerminal />,
    title: "Terminal UI",
    href: "https://en.wikipedia.org/wiki/Text-based_user_interface",
  },
  CLI: {
    node: <FaTerminal />,
    title: "CLI",
    href: "https://en.wikipedia.org/wiki/Command-line_interface",
  },
  tmux: {
    node: <SiTmux />,
    title: "tmux",
    href: "https://github.com/tmux/tmux",
  },
  Neovim: {
    node: <SiNeovim />,
    title: "Neovim",
    href: "https://neovim.io",
  },
  LazyVim: {
    node: <SiNeovim />,
    title: "LazyVim",
    href: "https://www.lazyvim.org",
  },
  LazyGit: {
    node: <SiGit />,
    title: "LazyGit",
    href: "https://github.com/jesseduffield/lazygit",
  },
  fzf: {
    node: <FaSearch />,
    title: "fzf",
    href: "https://github.com/junegunn/fzf",
  },
  Homebrew: {
    node: <SiHomebrew />,
    title: "Homebrew",
    href: "https://brew.sh",
  },
  Jekyll: {
    node: <FaGem />,
    title: "Jekyll",
    href: "https://jekyllrb.com",
  },

  // AI / ML
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
  Ollama: {
    node: <FaRobot />,
    title: "Ollama",
    href: "https://ollama.com",
  },
  "Local LLM": {
    node: <FaRobot />,
    title: "Local LLM",
  },
  TensorFlow: {
    node: <SiTensorflow />,
    title: "TensorFlow",
    href: "https://www.tensorflow.org",
  },
  PyTorch: {
    node: <SiPytorch />,
    title: "PyTorch",
    href: "https://pytorch.org",
  },
  Keras: {
    node: <SiKeras />,
    title: "Keras",
    href: "https://keras.io",
  },
  "scikit-learn": {
    node: <SiScikitlearn />,
    title: "scikit-learn",
    href: "https://scikit-learn.org",
  },
  Pandas: {
    node: <SiPandas />,
    title: "Pandas",
    href: "https://pandas.pydata.org",
  },
  NumPy: {
    node: <SiNumpy />,
    title: "NumPy",
    href: "https://numpy.org",
  },
  Jupyter: {
    node: <SiJupyter />,
    title: "Jupyter",
    href: "https://jupyter.org",
  },

  // External APIs / misc
  "Frankfurter API": {
    node: <FaCode />,
    title: "Frankfurter API",
    href: "https://www.frankfurter.app",
  },
};

const aliases: Record<string, string> = {
  next: "Next.js",
  nextjs: "Next.js",
  nextdotjs: "Next.js",
  reactjs: "React",
  tailwind: "Tailwind CSS",
  tailwindcss: "Tailwind CSS",
  framer: "Framer Motion",
  framermotion: "Framer Motion",
  motiondev: "Motion",
  materialui: "Material UI",
  mui: "Material UI",
  shadcn: "shadcn/ui",
  shadcnui: "shadcn/ui",

  reactnative: "React Native",
  expoapp: "Expo",

  node: "Node.js",
  nodejs: "Node.js",
  expressjs: "Express",
  nest: "NestJS",
  nestjs: "NestJS",
  fastapi: "FastAPI",
  springboot: "Spring Boot",
  rubyrails: "Rails",
  rubyonrails: "Rails",
  rest: "REST API",
  restapi: "REST API",

  postgres: "PostgreSQL",
  postgresql: "PostgreSQL",
  mysql: "MySQL",
  sqlite: "SQLite",
  mongo: "MongoDB",
  mongodb: "MongoDB",
  rowlevelsecurity: "RLS",

  githubactions: "GitHub Actions",
  githubreleases: "GitHub Releases",
  gcp: "Google Cloud",
  googlecloud: "Google Cloud",
  amazonaws: "AWS",
  aws: "AWS",
  microsoftazure: "Azure",

  terminal: "Terminal UI",
  terminalui: "Terminal UI",
  commandline: "CLI",
  commandlineinterface: "CLI",
  lazygit: "LazyGit",
  lazyvim: "LazyVim",

  localai: "Local LLM",
  localllm: "Local LLM",
  scikitlearn: "scikit-learn",
};

function normalizeStackItem(item: string) {
  return item
    .trim()
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/[^a-z0-9]/g, "");
}

function resolveLogoKey(item: string) {
  if (logoMap[item]) return item;

  const normalized = normalizeStackItem(item);
  return aliases[normalized] ?? item;
}

export function getTechLogos(stack: string[] = []): ProjectLogoItem[] {
  const seen = new Set<string>();

  return stack
    .filter((item) => {
      if (!item) return false;

      const key = resolveLogoKey(item);
      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    })
    .map((item) => {
      const key = resolveLogoKey(item);

      return (
        logoMap[key] ?? {
          node: <FaCode />,
          title: item,
        }
      );
    });
}
