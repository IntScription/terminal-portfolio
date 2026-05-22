#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "content");
const projectsDir = path.join(contentDir, "projects");
const blogDir = path.join(contentDir, "blog");
const publicDir = path.join(root, "public");

let errors = 0;
let warnings = 0;

function log(kind, message) {
  console.log(`${kind === "error" ? "x" : "!"} ${message}`);
  if (kind === "error") errors += 1;
  else warnings += 1;
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    log("error", `Invalid JSON: ${path.relative(root, filePath)} (${error.message})`);
    return null;
  }
}

function directories(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function hasFile(filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

function validateString(meta, key, context, required = true) {
  const value = meta?.[key];
  if (typeof value === "string" && value.trim().length > 0) return;
  log(required ? "error" : "warning", `${context}: ${required ? "missing" : "recommended"} string field "${key}"`);
}

function validateProject(slug) {
  const dir = path.join(projectsDir, slug);
  const context = `project/${slug}`;
  const metaPath = path.join(dir, "meta.json");
  const contentPath = path.join(dir, "content.mdx");

  if (!hasFile(metaPath)) {
    log("error", `${context}: missing meta.json`);
    return;
  }

  if (!hasFile(contentPath)) log("error", `${context}: missing content.mdx`);

  const meta = readJson(metaPath);
  if (!meta) return;

  validateString(meta, "title", context);
  validateString(meta, "slug", context);
  validateString(meta, "tagline", context, false);
  validateString(meta, "description", context, false);

  if (meta.slug && meta.slug !== slug) {
    log("error", `${context}: meta slug "${meta.slug}" does not match folder "${slug}"`);
  }

  if (!Array.isArray(meta.stack)) log("error", `${context}: "stack" must be an array`);
  if (typeof meta.published !== "boolean") log("warning", `${context}: "published" should be a boolean`);
  if (typeof meta.featured !== "boolean") log("warning", `${context}: "featured" should be a boolean`);
  if (typeof meta.order !== "number") log("warning", `${context}: "order" should be a number`);

  if (typeof meta.image === "string" && meta.image.trim()) {
    const imagePath = meta.image.startsWith("/")
      ? path.join(publicDir, meta.image)
      : path.join(dir, meta.image);

    if (!hasFile(imagePath)) log("warning", `${context}: image not found at ${meta.image}`);
  } else {
    log("warning", `${context}: image field is empty`);
  }
}

function validateBlog(slug) {
  const dir = path.join(blogDir, slug);
  const context = `blog/${slug}`;
  const metaPath = path.join(dir, "meta.json");
  const contentPath = path.join(dir, "content.mdx");

  if (!hasFile(metaPath)) {
    log("error", `${context}: missing meta.json`);
    return;
  }

  if (!hasFile(contentPath)) log("error", `${context}: missing content.mdx`);

  const meta = readJson(metaPath);
  if (!meta) return;

  validateString(meta, "title", context);
  validateString(meta, "slug", context);

  if (meta.slug && meta.slug !== slug) {
    log("error", `${context}: meta slug "${meta.slug}" does not match folder "${slug}"`);
  }

  validateString(meta, "description", context, false);
}

console.log("Validating portfolio content...\n");

if (!fs.existsSync(contentDir)) {
  log("error", "content directory does not exist");
} else {
  const projectSlugs = directories(projectsDir);
  const blogSlugs = directories(blogDir);

  console.log(`Projects: ${projectSlugs.length}`);
  for (const slug of projectSlugs) validateProject(slug);

  console.log(`\nBlog posts: ${blogSlugs.length}`);
  for (const slug of blogSlugs) validateBlog(slug);
}

console.log("\nSummary");
console.log(`Errors: ${errors}`);
console.log(`Warnings: ${warnings}`);

if (errors > 0) process.exit(1);
console.log("\nContent validation passed.");
