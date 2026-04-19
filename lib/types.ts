export type TerminalTextLineKind = "input" | "output" | "error" | "hint";

export type TerminalTextLine = {
  id: string;
  kind: TerminalTextLineKind;
  content: string;
};

export type TerminalNeofetchLine = {
  id: string;
  kind: "neofetch";
  data: Array<{ label: string; value: string }>;
};

export type TerminalLine = TerminalTextLine | TerminalNeofetchLine;

export type TerminalTextLineInput = {
  kind: TerminalTextLineKind;
  content: string;
};

export type TerminalNeofetchLineInput = {
  kind: "neofetch";
  data: Array<{ label: string; value: string }>;
};

export type TerminalLineInput =
  | TerminalTextLineInput
  | TerminalNeofetchLineInput;

export type SiteTheme =
  | "light"
  | "tokyonight"
  | "dracula"
  | "catppuccin"
  | "nord"
  | "gruvbox"
  | "rose-pine"
  | "one-dark"
  | "ayu-dark"
  | "solarized-dark";

export type TerminalDirectory =
  | "~"
  | "~/projects"
  | "~/blog"
  | "~/about"
  | "~/now"
  | "~/uses"
  | "~/themes"
  | `~/projects/${string}`
  | `~/blog/${string}`;

export type CommandAction =
  | { type: "navigate"; href: string; delayMs?: number }
  | { type: "theme"; value: SiteTheme }
  | { type: "clear" }
  | { type: "none" }
  | { type: "cwd"; value: TerminalDirectory }
  | { type: "overlay"; mode: "matrix" };

export type CommandResult = {
  lines?: TerminalLineInput[];
  action?: CommandAction;
};

export type StaticPage = {
  title: string;
  body: string;
};

export type PreviewState = {
  title?: string;
  description?: string;
  href?: string;
} | null;

export type BlogPost = {
  title: string;
  publishedAt: string;
  tags: string[];
  body: string;
};
