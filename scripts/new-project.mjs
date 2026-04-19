#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const rawName = process.argv.slice(2).join(" ").trim();

if (!rawName) {
  console.log('Usage: npm run new:project -- "Project Name"');
  process.exit(1);
}

const slug = rawName
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-");

const root = process.cwd();
const projectDir = path.join(root, "content", "projects", slug);

if (fs.existsSync(projectDir)) {
  console.error(`Project already exists: ${slug}`);
  process.exit(1);
}

fs.mkdirSync(projectDir, { recursive: true });

const meta = {
  title: rawName,
  slug,
  tagline: "",
  description: "",
  stack: [],
  liveUrl: "",
  repoUrl: "",
  appStoreUrl: "",
  playStoreUrl: "",
  image: "",
  featured: false,
  published: true,
  order: 10,
};

const content = `## Overview

## Challenge

## Solution

## Outcome

## Highlights

- 
- 
- 
`;

fs.writeFileSync(
  path.join(projectDir, "meta.json"),
  `${JSON.stringify(meta, null, 2)}\n`
);

fs.writeFileSync(path.join(projectDir, "content.mdx"), `${content}\n`);

console.log(`Created project: ${slug}`);
console.log(projectDir);
