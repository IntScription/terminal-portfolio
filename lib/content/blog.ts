import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_PATH = path.join(process.cwd(), "content/blog");

export type BlogMeta = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  published: boolean;
  featured?: boolean;
};

export type BlogPost = BlogMeta & {
  content: string;
};

function getFiles() {
  if (!fs.existsSync(BLOG_PATH)) return [];
  return fs.readdirSync(BLOG_PATH).filter((file) => file.endsWith(".mdx"));
}

export function getAllBlogs(): BlogMeta[] {
  const files = getFiles();

  const posts = files.map((file) => {
    const fullPath = path.join(BLOG_PATH, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);

    return data as BlogMeta;
  });

  return posts
    .filter((post) => post.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(BLOG_PATH, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    ...(data as BlogMeta),
    content,
  };
}
