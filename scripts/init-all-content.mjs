import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeIfNotExists(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.log(`skip: ${path.relative(root, filePath)} already exists`);
    return;
  }

  fs.writeFileSync(filePath, content.trim() + "\n", "utf8");
  console.log(`created: ${path.relative(root, filePath)}`);
}

function main() {
  const contentDir = path.join(root, "content");
  const blogDir = path.join(contentDir, "blog");
  const projectsDir = path.join(contentDir, "projects");
  const siteDir = path.join(contentDir, "site");
  const templatesDir = path.join(contentDir, "templates");
  const scriptsDir = path.join(root, "scripts");
  const screenshotsDir = path.join(root, "public", "screenshots");

  [
    contentDir,
    blogDir,
    projectsDir,
    siteDir,
    templatesDir,
    scriptsDir,
    screenshotsDir,
  ].forEach(ensureDir);

  writeIfNotExists(
    path.join(siteDir, "about.mdx"),
    `
# About me

I build products and interfaces that combine technical structure with strong visual feel.

My interests sit across full stack development, game development, workflow design, and polished interaction systems.

## What I care about

- products that feel intentional
- systems that scale cleanly
- interfaces with personality
- developer workflows that feel fast and natural

## How I like to build

I enjoy creating products that feel polished, fast, and distinct. I care about both the technical structure behind a system and the emotional feel of using it.
`
  );

  writeIfNotExists(
    path.join(siteDir, "now.json"),
    JSON.stringify(
      {
        title: "Now",
        intro:
          "What I am currently focused on, learning, and building right now.",
        items: [
          {
            label: "Building",
            value:
              "Improving this terminal-first portfolio and starting to turn it into a more complete product showcase.",
          },
          {
            label: "Learning",
            value:
              "Better frontend polish, animation systems, product storytelling, and richer UI architecture.",
          },
          {
            label: "Exploring",
            value:
              "Game systems, developer workflow tooling, interface feel, and more premium project presentation.",
          },
        ],
      },
      null,
      2
    )
  );

  writeIfNotExists(
    path.join(siteDir, "uses.json"),
    JSON.stringify(
      {
        title: "Uses",
        intro: "The tools and setup that shape how I build.",
        groups: [
          {
            title: "Development",
            items: [
              "Next.js",
              "TypeScript",
              "React Native",
              "Supabase",
              "Swift",
            ],
          },
          {
            title: "Workflow",
            items: [
              "Terminal-first navigation",
              "Alacritty-inspired UI",
              "LazyVim-style editing",
              "tmux-inspired workspace design",
            ],
          },
          {
            title: "Focus",
            items: [
              "UI polish",
              "systems thinking",
              "cross-platform product building",
              "developer experience",
            ],
          },
        ],
      },
      null,
      2
    )
  );

  writeIfNotExists(
    path.join(siteDir, "profile.json"),
    JSON.stringify(
      {
        name: "Kartik Sanil",
        title: "Full stack developer / game dev / UI builder",
        email: "you@example.com",
        github: "https://github.com/IntScription",
        youtube: "https://youtube.com/",
        instagram: "https://instagram.com/",
        location: "India",
        bio:
          "I enjoy building products that combine engineering, aesthetics, and strong interaction design.",
      },
      null,
      2
    )
  );

  writeIfNotExists(
    path.join(templatesDir, "project-meta.template.json"),
    JSON.stringify(
      {
        title: "",
        slug: "",
        tagline: "",
        description: "",
        stack: [],
        liveUrl: "",
        repoUrl: "",
        image: "",
        featured: false,
        published: true,
        order: 0,
      },
      null,
      2
    )
  );

  writeIfNotExists(
    path.join(templatesDir, "blog-meta.template.json"),
    JSON.stringify(
      {
        title: "",
        slug: "",
        excerpt: "",
        publishedAt: "",
        tags: [],
        published: true,
        featured: false,
      },
      null,
      2
    )
  );

  writeIfNotExists(
    path.join(blogDir, "welcome-to-my-blog.mdx"),
    `
---
title: "Welcome to My Blog"
slug: "welcome-to-my-blog"
excerpt: "A starting point for writing about projects, ideas, and process."
publishedAt: "2026-04-14"
tags:
  - blog
  - writing
published: true
featured: true
---

# Welcome to My Blog

This is the starting point for long-form writing on development, systems, products, and design.

## What I will write about

- projects I build
- lessons learned
- interface decisions
- workflow experiments
`
  );

  const starterProjectDir = path.join(projectsDir, "starter-project");
  ensureDir(starterProjectDir);

  writeIfNotExists(
    path.join(starterProjectDir, "meta.json"),
    JSON.stringify(
      {
        title: "Starter Project",
        slug: "starter-project",
        tagline: "A starting template for new project entries.",
        description:
          "Use this as a template for adding new project case studies to the portfolio.",
        stack: ["Next.js"],
        liveUrl: "",
        repoUrl: "",
        image: "/screenshots/starter-project.png",
        featured: false,
        published: true,
        order: 99,
      },
      null,
      2
    )
  );

  writeIfNotExists(
    path.join(starterProjectDir, "content.mdx"),
    `
## Overview

Write a high-level overview of the project here.

## Challenge

Explain the main challenge or problem.

## Solution

Explain how you approached it and what you built.

## Outcome

Describe the result and what it demonstrates.

## Highlights

- Add a strong highlight
- Add another highlight
- Add one more highlight
`
  );

  console.log("\\nEverything is initialized.");
  console.log("Next: run your manifest generator if you use one.");
}

main();
