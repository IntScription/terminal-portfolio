import {
  getAboutContent,
  getNowData,
  getProfileData,
  getUsesData,
} from "@/lib/content/site";
import { getAllBlogs, getBlogBySlug } from "@/lib/content/blog";
import { getAllProjects, getProjectBySlug } from "@/lib/content/projects";

export type SiteContextChunk = {
  source: string;
  title: string;
  text: string;
};

function normalize(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(text: string) {
  return normalize(text)
    .split(" ")
    .filter((word) => word.length > 2);
}

function scoreChunk(query: string, chunk: SiteContextChunk) {
  const q = tokenize(query);
  const haystack = `${chunk.title} ${chunk.source} ${chunk.text}`.toLowerCase();

  let score = 0;
  for (const token of q) {
    if (haystack.includes(token)) score += 2;
    if (chunk.title.toLowerCase().includes(token)) score += 2;
  }
  return score;
}

export function buildSiteContext(): SiteContextChunk[] {
  const chunks: SiteContextChunk[] = [];

  const profile = getProfileData();
  if (profile) {
    chunks.push({
      source: "profile",
      title: profile.name,
      text: JSON.stringify(profile),
    });
  }

  const about = getAboutContent();
  if (about) {
    chunks.push({
      source: "about",
      title: "About",
      text: about.content,
    });
  }

  const now = getNowData();
  if (now) {
    chunks.push({
      source: "now",
      title: now.title,
      text: JSON.stringify(now),
    });
  }

  const uses = getUsesData();
  if (uses) {
    chunks.push({
      source: "uses",
      title: uses.title,
      text: JSON.stringify(uses),
    });
  }

  for (const post of getAllBlogs()) {
    const full = getBlogBySlug(post.slug);
    if (!full) continue;
    chunks.push({
      source: `blog/${post.slug}`,
      title: full.title,
      text: `${full.excerpt}\n${full.content}`,
    });
  }

  for (const project of getAllProjects()) {
    const full = getProjectBySlug(project.slug);
    if (!full) continue;
    chunks.push({
      source: `project/${project.slug}`,
      title: full.title,
      text: `${full.tagline}\n${full.description}\n${full.content}`,
    });
  }

  return chunks;
}

export function getRelevantSiteContext(question: string, limit = 5) {
  return buildSiteContext()
    .map((chunk) => ({
      chunk,
      score: scoreChunk(question, chunk),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.chunk);
}
