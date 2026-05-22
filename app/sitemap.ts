import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://terminal-portfolio-eight-theta.vercel.app";

function getSlugs(dir: string) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const root = process.cwd();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/now",
    "/uses",
    "/projects",
    "/blog",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
  }));

  const projectRoutes: MetadataRoute.Sitemap = getSlugs(
    path.join(root, "content", "projects"),
  ).map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified: now,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getSlugs(
    path.join(root, "content", "blog"),
  ).map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
