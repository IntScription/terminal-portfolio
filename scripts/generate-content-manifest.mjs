#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "content");
const blogDir = path.join(contentDir, "blog");
const projectsDir = path.join(contentDir, "projects");
const outputFile = path.join(root, "lib", "content-manifest.ts");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getDirectories(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function buildBlogManifest() {
  return getDirectories(blogDir)
    .map((slug) => {
      const metaPath = path.join(blogDir, slug, "meta.json");
      if (!fs.existsSync(metaPath)) return null;
      const meta = readJson(metaPath);
      return {
        slug: meta.slug || slug,
        title: meta.title || slug,
      };
    })
    .filter(Boolean);
}

function buildProjectManifest() {
  return getDirectories(projectsDir)
    .map((slug) => {
      const metaPath = path.join(projectsDir, slug, "meta.json");
      if (!fs.existsSync(metaPath)) return null;
      const meta = readJson(metaPath);
      return {
        slug: meta.slug || slug,
        title: meta.title || slug,
        repoUrl: meta.repoUrl || "",
        liveUrl: meta.liveUrl || "",
        appStoreUrl: meta.appStoreUrl || "",
        playStoreUrl: meta.playStoreUrl || "",
        stack: Array.isArray(meta.stack) ? meta.stack : [],
      };
    })
    .filter(Boolean);
}

const blogManifest = buildBlogManifest();
const projectManifest = buildProjectManifest();

const fileContents = `export type BlogManifestItem = {
  slug: string;
  title: string;
};

export type ProjectManifestItem = {
  slug: string;
  title: string;
  repoUrl?: string;
  liveUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  stack?: string[];
};

export const blogManifest: BlogManifestItem[] = ${JSON.stringify(blogManifest, null, 2)};

export const projectManifest: ProjectManifestItem[] = ${JSON.stringify(projectManifest, null, 2)};
`;

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, `${fileContents}\n`);

console.log("Generated lib/content-manifest.ts");
