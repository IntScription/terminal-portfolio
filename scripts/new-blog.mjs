import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

const root = process.cwd();
const args = process.argv.slice(2);

if (!args.length) {
  console.log('Usage: npm run new:blog -- "Post Title"');
  process.exit(1);
}

const title = args.join(" ");

const slug = title
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const filePath = path.join(root, "content", "blog", `${slug}.mdx`);

if (fs.existsSync(filePath)) {
  console.log(`Post already exists: ${slug}`);
  process.exit(1);
}

const today = new Date().toISOString().split("T")[0];

const content = `---
title: "${title}"
slug: "${slug}"
publishedAt: "${today}"
tags: ["dev"]
published: true
excerpt: "Write a short summary."
---

## Introduction

Start writing your post here.

## Why

Explain why you did this.

## Process

Explain how you built it.

## Learnings

What you learned.

## Next Steps

Where you're going next.
`;

fs.writeFileSync(filePath, content, "utf8");

console.log(`Created blog: content/blog/${slug}.mdx`);

const manifestScript = path.join(root, "scripts", "generate-content-manifest.mjs");

if (fs.existsSync(manifestScript)) {
  console.log("Updating content manifest...");
  spawnSync("node", [manifestScript], { stdio: "inherit" });
}

console.log("Done.");
