import { blogManifest, projectManifest } from "@/lib/content-manifest";
import { COMMANDS, HELP_COMMANDS, THEMES } from "@/lib/constants";
import {
  CommandResult,
  SiteTheme,
  TerminalDirectory,
} from "@/lib/types";
import { levenshtein } from "@/lib/utils";

function nearestCommand(input: string) {
  let best = "";
  let bestScore = Number.POSITIVE_INFINITY;

  for (const command of COMMANDS) {
    const score = levenshtein(input.toLowerCase(), command.toLowerCase());
    if (score < bestScore) {
      best = command;
      bestScore = score;
    }
  }

  return bestScore <= 6 ? best : null;
}

function listForDirectory(dir: TerminalDirectory) {
  if (dir === "~") return ["about", "blog", "now", "projects", "themes", "uses"];
  if (dir === "~/projects") return projectManifest.map((p) => p.slug);
  if (dir === "~/blog") return blogManifest.map((p) => p.slug);
  if (dir === "~/themes") return [...THEMES];
  if (dir.startsWith("~/projects/")) return ["overview", "repo", "demo"];
  if (dir.startsWith("~/blog/")) return ["article"];
  if (dir === "~/about") return ["about.mdx"];
  if (dir === "~/now") return ["now.json"];
  if (dir === "~/uses") return ["uses.json"];
  return [];
}

export function runCommand(
  rawInput: string,
  cwd: TerminalDirectory
): CommandResult {
  const input = rawInput.trim();
  const normalized = input.toLowerCase();

  if (!input) return { action: { type: "none" } };

  if (normalized === "clear") {
    return { action: { type: "clear" }, lines: [] };
  }

  if (normalized === "help") {
    return {
      action: { type: "none" },
      lines: [
        { kind: "output", content: "available commands:" },
        {
          kind: "output",
          content: HELP_COMMANDS.join(", "),
        },
        {
          kind: "hint",
          content:
            "use cd themes, then ls to view all themes. apply one with theme <name>",
        },
      ],
    };
  }

  if (normalized === "pwd") {
    return {
      action: { type: "none" },
      lines: [{ kind: "output", content: cwd }],
    };
  }

  if (normalized === "ls") {
    const entries = listForDirectory(cwd);
    return {
      action: { type: "none" },
      lines: entries.length
        ? entries.map((entry) => ({ kind: "output" as const, content: entry }))
        : [{ kind: "output", content: "(empty)" }],
    };
  }

  if (normalized.startsWith("cd ")) {
    const target = normalized.replace(/^cd\s+/, "").trim();

    if (target === "..") {
      if (cwd.startsWith("~/projects/")) {
        return {
          action: { type: "cwd", value: "~/projects" },
          lines: [{ kind: "output", content: "moved to ~/projects" }],
        };
      }

      if (cwd.startsWith("~/blog/")) {
        return {
          action: { type: "cwd", value: "~/blog" },
          lines: [{ kind: "output", content: "moved to ~/blog" }],
        };
      }

      return {
        action: { type: "cwd", value: "~" },
        lines: [{ kind: "output", content: "moved to ~" }],
      };
    }

    const topLevelMap: Record<string, TerminalDirectory> = {
      projects: "~/projects",
      blog: "~/blog",
      about: "~/about",
      now: "~/now",
      uses: "~/uses",
      themes: "~/themes",
      "~": "~",
    };

    if (topLevelMap[target]) {
      return {
        action: { type: "cwd", value: topLevelMap[target] },
        lines: [{ kind: "output", content: `moved to ${topLevelMap[target]}` }],
      };
    }

    if (cwd === "~/projects") {
      const project = projectManifest.find((item) => item.slug === target);
      if (project) {
        return {
          action: { type: "cwd", value: `~/projects/${project.slug}` },
          lines: [{ kind: "output", content: `entered ${project.slug}` }],
        };
      }
    }

    if (cwd === "~/blog") {
      const post = blogManifest.find((item) => item.slug === target);
      if (post) {
        return {
          action: { type: "cwd", value: `~/blog/${post.slug}` },
          lines: [{ kind: "output", content: `entered ${post.slug}` }],
        };
      }
    }

    return {
      action: { type: "none" },
      lines: [{ kind: "error", content: `cd: no such directory: ${target}` }],
    };
  }

  if (normalized === "home") {
    return {
      action: { type: "navigate", href: "/", delayMs: 180 },
      lines: [{ kind: "output", content: "opening home..." }],
    };
  }

  if (["projects", "blog", "about", "now", "uses"].includes(normalized)) {
    return {
      action: { type: "navigate", href: `/${normalized}`, delayMs: 220 },
      lines: [{ kind: "output", content: `opening ${normalized}...` }],
    };
  }

  if (normalized.startsWith("theme ")) {
    const requested = normalized.replace(/^theme\s+/, "").trim() as SiteTheme;

    if (!THEMES.includes(requested)) {
      return {
        action: { type: "none" },
        lines: [{ kind: "error", content: `theme not found: ${requested}` }],
      };
    }

    return {
      action: { type: "theme", value: requested },
      lines: [{ kind: "output", content: `applied theme: ${requested}` }],
    };
  }

  if (normalized === "neofetch") {
    return {
      action: { type: "none" },
      lines: [
        {
          kind: "neofetch",
          data: [
            { label: "user", value: "Kartik@portfolio" },
            { label: "role", value: "Full stack developer / game dev / UI builder" },
            { label: "terminal", value: "Alacritty-inspired web terminal" },
            { label: "cwd", value: cwd },
            { label: "stack", value: "Next.js, React Native, Supabase, Swift, TypeScript" },
          ],
        },
      ],
    };
  }

  if (normalized === "whoami") {
    return {
      action: { type: "none" },
      lines: [
        {
          kind: "output",
          content:
            "Kartik — full stack developer, game dev, and interface-focused builder.",
        },
      ],
    };
  }

  if (normalized === "cat about.md") {
    return {
      action: { type: "navigate", href: "/about", delayMs: 220 },
      lines: [{ kind: "output", content: "opening about.md..." }],
    };
  }

  if (normalized.startsWith("repo ")) {
    const slug = normalized.replace(/^repo\s+/, "").trim();
    const project = projectManifest.find((item) => item.slug === slug);

    if (!project?.repoUrl) {
      return {
        action: { type: "none" },
        lines: [{ kind: "error", content: `command not found: repo ${slug}` }],
      };
    }

    return {
      action: { type: "none" },
      lines: [{ kind: "output", content: project.repoUrl }],
    };
  }

  if (normalized.startsWith("demo ")) {
    const slug = normalized.replace(/^demo\s+/, "").trim();
    const project = projectManifest.find((item) => item.slug === slug);

    if (!project?.liveUrl) {
      return {
        action: { type: "none" },
        lines: [{ kind: "error", content: `command not found: demo ${slug}` }],
      };
    }

    return {
      action: { type: "none" },
      lines: [{ kind: "output", content: project.liveUrl }],
    };
  }

  if (normalized === "coffee") {
    return {
      action: { type: "none" },
      lines: [
        { kind: "output", content: "brewing focus..." },
        { kind: "output", content: "optimizing caffeine intake..." },
        { kind: "output", content: "compiling thoughts..." },
        { kind: "output", content: "ready. ship something." },
      ],
    };
  }

  if (normalized === "sudo hire kartik") {
    return {
      action: { type: "none" },
      lines: [
        { kind: "output", content: "[sudo] password for recruiter:" },
        { kind: "hint", content: "********" },
        { kind: "output", content: "access granted." },
        { kind: "output", content: "welcome aboard." },
        { kind: "hint", content: "initiating onboarding sequence..." },
      ],
    };
  }

  if (normalized === "matrix") {
    return {
      action: { type: "overlay", mode: "matrix" },
      lines: [{ kind: "hint", content: "entering the matrix..." }],
    };
  }

  if (normalized === "open ." && cwd.startsWith("~/projects/")) {
    const slug = cwd.replace("~/projects/", "");
    const project = projectManifest.find((item) => item.slug === slug);
    if (project) {
      return {
        action: { type: "navigate", href: `/projects/${project.slug}`, delayMs: 220 },
        lines: [{ kind: "output", content: `opening project: ${project.title}` }],
      };
    }
  }

  if (normalized === "read ." && cwd.startsWith("~/blog/")) {
    const slug = cwd.replace("~/blog/", "");
    const post = blogManifest.find((item) => item.slug === slug);
    if (post) {
      return {
        action: { type: "navigate", href: `/blog/${post.slug}`, delayMs: 220 },
        lines: [{ kind: "output", content: `opening post: ${post.title}` }],
      };
    }
  }

  if (normalized.startsWith("open ")) {
    const slug = normalized.replace(/^open\s+/, "").trim();
    const project = projectManifest.find((item) => item.slug === slug);

    if (!project) {
      const suggestion = nearestCommand(input);
      return {
        action: { type: "none" },
        lines: [
          { kind: "error", content: `command not found: ${input}` },
          ...(suggestion
            ? [{ kind: "hint" as const, content: `did you mean: ${suggestion} ?` }]
            : []),
        ],
      };
    }

    return {
      action: { type: "navigate", href: `/projects/${project.slug}`, delayMs: 260 },
      lines: [{ kind: "output", content: `opening project: ${project.title}` }],
    };
  }

  if (normalized.startsWith("read ")) {
    const slug = normalized.replace(/^read\s+/, "").trim();
    const post = blogManifest.find((item) => item.slug === slug);

    if (!post) {
      const suggestion = nearestCommand(input);
      return {
        action: { type: "none" },
        lines: [
          { kind: "error", content: `command not found: ${input}` },
          ...(suggestion
            ? [{ kind: "hint" as const, content: `did you mean: ${suggestion} ?` }]
            : []),
        ],
      };
    }

    return {
      action: { type: "navigate", href: `/blog/${post.slug}`, delayMs: 260 },
      lines: [{ kind: "output", content: `opening post: ${post.title}` }],
    };
  }

  const suggestion = nearestCommand(input);

  return {
    action: { type: "none" },
    lines: [
      { kind: "error", content: `command not found: ${input}` },
      ...(suggestion
        ? [{ kind: "hint" as const, content: `did you mean: ${suggestion} ?` }]
        : []),
    ],
  };
}
