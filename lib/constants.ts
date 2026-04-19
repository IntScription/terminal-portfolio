import { SiteTheme } from "@/lib/types";

export const NAV_ITEMS = [
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Now", href: "/now" },
  { label: "Uses", href: "/uses" },
  { label: "Assistant", href: "/assistant" },
] as const;

export const QUICK_COMMANDS = [
  "help",
  "cd projects",
  "ls",
  "open rest-assured",
  "ask what is rest assured",
  "chat explain how your stack fits together",
] as const;

export const PROMPT_USER = "kartik@portfolio";
export const PROMPT_SYMBOL = "%";
export const PROMPT = `${PROMPT_USER} ${PROMPT_SYMBOL}`;

export const THEMES: SiteTheme[] = [
  "light",
  "tokyonight",
  "dracula",
  "catppuccin",
  "nord",
  "gruvbox",
  "rose-pine",
  "one-dark",
  "ayu-dark",
  "solarized-dark",
];

export const COMMANDS = [
  "help",
  "ls",
  "pwd",
  "cd projects",
  "cd blog",
  "cd about",
  "cd now",
  "cd uses",
  "cd themes",
  "cd ..",
  "home",
  "projects",
  "blog",
  "about",
  "now",
  "uses",
  "open rest-assured",
  "read welcome-to-my-blog",
  "theme light",
  "theme tokyonight",
  "clear",
  "neofetch",
  "whoami",
  "cat about.md",
  "repo rest-assured",
  "demo rest-assured",
  "ask what is rest assured",
  "chat explain how your stack fits together",
  "coffee",
  "sudo hire kartik",
  "matrix",
] as const;

export const HELP_COMMANDS = [
  "ls",
  "pwd",
  "cd <dir>",
  "home",
  "projects",
  "blog",
  "about",
  "now",
  "uses",
  "open <slug>",
  "read <slug>",
  "repo <slug>",
  "demo <slug>",
  "theme <name>",
  "clear",
  "neofetch",
  "whoami",
  "cat about.md",
  "ask <question>",
  "chat <question>",
  "coffee",
  "sudo hire kartik",
  "matrix",
] as const;

export const COMMAND_PALETTE_ITEMS = [
  { label: "Go to Home", href: "/" },
  { label: "Go to Projects", href: "/projects" },
  { label: "Go to Blog", href: "/blog" },
  { label: "Go to About", href: "/about" },
  { label: "Go to Now", href: "/now" },
  { label: "Go to Uses", href: "/uses" },
  { label: "Go to Assistant", href: "/assistant" },
];
