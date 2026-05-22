# Content Workflow

This portfolio uses folder-based content for projects and blog posts.

## Projects

Each project lives in:

```txt
content/projects/<slug>/
├── meta.json
└── content.mdx
```

Recommended screenshot path:

```txt
public/screenshots/<slug>.png
```

## Project Metadata

```json
{
  "title": "Project Name",
  "slug": "project-name",
  "tagline": "Short one-line project summary.",
  "description": "A concise summary used in cards, SEO, and project listings.",
  "stack": ["Next.js", "TypeScript", "Tailwind CSS"],
  "liveUrl": "",
  "repoUrl": "",
  "appStoreUrl": "",
  "playStoreUrl": "",
  "image": "/screenshots/project-name.png",
  "featured": false,
  "published": true,
  "order": 10
}
```

## Case Study Template

```md
## Overview

What the project is and who it is for.

## Challenge

The problem, workflow pain, or technical limitation.

## Solution

How the project solves the problem.

## Outcome

What improved after building it.

## Highlights

- Technical highlight
- Product/design highlight
- Deployment/distribution highlight
```

## Blog Posts

Each blog post lives in:

```txt
content/blog/<slug>/
├── meta.json
└── content.mdx
```

## Commands

```sh
npm run new:project -- "Project Name"
npm run new:blog -- "Post Title"
npm run generate:manifest
npm run validate:content
```

## Naming Rules

Use the same slug across:

```txt
content/projects/<slug>/
meta.json -> slug
public/screenshots/<slug>.png
```

Good:

```txt
rundeck-personal-project-dashboard
```

Avoid:

```txt
rundeck---personal-project-dashboard
```

## Pre-push Checklist

```sh
npm run validate:content
npm run typecheck
npm run build
```
