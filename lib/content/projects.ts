import fs from "node:fs";
import path from "node:path";

export type ArchitectureNode = {
  id: string;
  label: string;
  type?: string;
};

export type ArchitectureEdge = {
  source: string;
  target: string;
};

export type ProjectMeta = {
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
};

export type Project = ProjectMeta & {
  content: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  role?: string;
  year?: string;
  status?: string;
  platform?: string;
  highlights: string[];
  architecture?: {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
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

  const architecture =
    meta.architecture &&
      Array.isArray(meta.architecture.nodes) &&
      Array.isArray(meta.architecture.edges)
      ? {
        nodes: meta.architecture.nodes.map((node: any) => ({
          id: String(node.id ?? ""),
          label: String(node.label ?? ""),
          type: node.type ? String(node.type) : undefined,
        })),
        edges: meta.architecture.edges.map((edge: any) => ({
          source: String(edge.source ?? ""),
          target: String(edge.target ?? ""),
        })),
      }
      : undefined;

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

    overview: meta.overview ? String(meta.overview) : undefined,
    challenge: meta.challenge ? String(meta.challenge) : undefined,
    solution: meta.solution ? String(meta.solution) : undefined,
    outcome: meta.outcome ? String(meta.outcome) : undefined,
    role: meta.role ? String(meta.role) : undefined,
    year: meta.year ? String(meta.year) : undefined,
    status: meta.status ? String(meta.status) : undefined,
    platform: meta.platform ? String(meta.platform) : undefined,
    highlights: Array.isArray(meta.highlights)
      ? meta.highlights.map((item: unknown) => String(item))
      : [],
    architecture,

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
