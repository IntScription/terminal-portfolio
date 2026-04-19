import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function levenshtein(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[a.length][b.length];
}

export function calculateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function extractHeadings(markdown: string) {
  return markdown
    .split("\n")
    .map((line) => {
      const match = /^(##|###)\s+(.*)$/.exec(line.trim());
      if (!match) return null;

      const raw = match[2].trim();
      const id = raw
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      return {
        level: match[1].length,
        text: raw,
        id,
      };
    })
    .filter(Boolean) as Array<{ level: number; text: string; id: string }>;
}
