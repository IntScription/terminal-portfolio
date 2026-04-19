import fs from "node:fs";
import path from "node:path";

export type Project = {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  image?: string;
  featured?: boolean;
  published?: boolean;
  order?: number;
  content: string;
};

const projectsDir = path.join(process.cwd(), "content", "projects");

function readProject(slug: string): Project | null {
  const dir = path.join(projectsDir, slug);
  const metaPath = path.join(dir, "meta.json");
  const contentPath = path.join(dir, "content.mdx");

  if (!fs.existsSync(metaPath) || !fs.existsSync(contentPath)) {
    return null;
  }

  const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
  const content = fs.readFileSync(contentPath, "utf8");

  return {
    title: String(meta.title ?? ""),
    slug: String(meta.slug ?? slug),
    tagline: String(meta.tagline ?? ""),
    description: String(meta.description ?? ""),
    stack: Array.isArray(meta.stack)
      ? meta.stack.map((item: unknown) => String(item))
      : [],
    liveUrl: meta.liveUrl ? String(meta.liveUrl) : undefined,
    repoUrl: meta.repoUrl ? String(meta.repoUrl) : undefined,
    appStoreUrl: meta.appStoreUrl ? String(meta.appStoreUrl) : undefined,
    playStoreUrl: meta.playStoreUrl ? String(meta.playStoreUrl) : undefined,
    image: meta.image ? String(meta.image) : undefined,
    featured: Boolean(meta.featured),
    published: meta.published !== false,
    order: typeof meta.order === "number" ? meta.order : 999,
    content,
  };
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) return [];

  return fs
    .readdirSync(projectsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readProject(entry.name))
    .filter((project): project is Project => Boolean(project))
    .filter((project) => project.published !== false)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function getProjectBySlug(slug: string): Project | null {
  return readProject(slug);
}
