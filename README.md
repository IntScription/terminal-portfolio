<div align="center">

# Terminal Portfolio

**A terminal-inspired portfolio built with Next.js, TypeScript, Tailwind CSS, MDX, motion, and AI-assisted project exploration.**

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-111827?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-18-111827?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-111827?style=for-the-badge&logo=typescript&logoColor=3178C6">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-111827?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8">
  <img alt="MDX" src="https://img.shields.io/badge/MDX-content-111827?style=for-the-badge&logo=mdx&logoColor=white">
  <img alt="Vercel" src="https://img.shields.io/badge/Deploy-Vercel-111827?style=for-the-badge&logo=vercel&logoColor=white">
  <img alt="CI" src="https://img.shields.io/github/actions/workflow/status/IntScription/terminal-portfolio/ci.yml?branch=main&style=for-the-badge&label=CI">
</p>

<p>
  <a href="https://terminal-portfolio-eight-theta.vercel.app">Live Site</a> ·
  <a href="#features">Features</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#content-workflow">Content</a> ·
  <a href="#developer-workflow">Developer Workflow</a>
</p>

</div>

## Overview

Terminal Portfolio is a personal developer portfolio that blends a terminal-first landing experience with clean editorial project pages, MDX-powered writing, responsive layouts, animated visuals, and an AI assistant backed by hosted LLM providers.

The goal is to feel less like a generic portfolio and more like stepping into a real developer workflow: projects, tools, notes, case studies, writing, and experiments all organized in one polished interface.

## Features

- Terminal-style homepage experience
- Theme-aware interface
- Project case study pages
- Blog powered by MDX
- Dedicated **About**, **Now**, and **Uses** pages
- AI assistant page with hosted model support
- Responsive design for desktop, tablet, and mobile
- Motion, particles, and WebGL-style visual details
- JSON + MDX content workflow for projects and blog posts
- Content validation, doctor checks, CI, and build checks

## Tech Stack

| Area | Tools |
|---|---|
| Framework | Next.js App Router |
| UI | React, TypeScript, Tailwind CSS |
| Content | MDX, JSON metadata, content manifest |
| Animation | Motion / Framer Motion |
| Visuals | OGL, Three.js, React Force Graph |
| AI | OpenRouter, OpenAI, optional local LLM endpoint |
| Deployment | Vercel |
| Quality | ESLint, TypeScript, content validation, GitHub Actions |

## Project Structure

```text
.
├── app/                      # Next.js App Router pages, API routes, SEO routes
│   ├── api/                  # API endpoints
│   ├── projects/             # Project listing and dynamic project pages
│   ├── blog/                 # Blog listing and dynamic blog pages
│   ├── about/                # About page
│   ├── now/                  # Now page
│   ├── uses/                 # Uses / setup page
│   ├── robots.ts             # Robots route
│   └── sitemap.ts            # Sitemap route
├── components/               # Reusable UI and feature components
├── content/                  # Structured content
│   ├── blog/<slug>/          # Blog meta.json + content.mdx
│   ├── projects/<slug>/      # Project meta.json + content.mdx
│   └── site/                 # Site-level content
├── docs/                     # Repo documentation
├── lib/                      # Core helpers, AI utilities, content loaders
├── public/                   # Static assets
│   └── screenshots/          # Project screenshots
├── scripts/                  # Developer/content scripts
├── .github/workflows/        # GitHub Actions CI
├── .env.example              # Environment template
├── Makefile                  # Shortcut commands
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Set up environment variables

```bash
cp .env.example .env.local
```

Then fill the providers you want to use.

### Start the development server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://terminal-portfolio-eight-theta.vercel.app

AI_PROVIDER=openrouter
OPENROUTER_API_KEY=
OPENROUTER_MODEL=deepseek/deepseek-chat

OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini

LOCAL_LLM_BASE_URL=http://localhost:11434/v1
LOCAL_LLM_MODEL=llama3.2
LOCAL_LLM_API_KEY=ollama
```

## Content Workflow

### Create a new project

```bash
npm run new:project -- "Project Name"
```

This creates:

```txt
content/projects/<slug>/
├── meta.json
└── content.mdx
```

Add the project screenshot here:

```txt
public/screenshots/<slug>.png
```

### Create a new blog post

```bash
npm run new:blog -- "Post Title"
```

This creates:

```txt
content/blog/<slug>/
├── meta.json
└── content.mdx
```

### Regenerate the content manifest

```bash
npm run generate:manifest
```

### Validate content

```bash
npm run validate:content
```

The validator checks JSON metadata, slug/folder consistency, content files, stack arrays, project image paths, and common missing fields.

## Developer Workflow

| Command | What it does |
|---|---|
| `npm run dev` | Start Next.js locally |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript checks |
| `npm run validate:content` | Validate project/blog content |
| `npm run doctor` | Check local repo setup |
| `npm run check` | Run lint, typecheck, content validation, and build |
| `make check` | Same as `npm run check` |
| `make doctor` | Run repo health checks |
| `make validate` | Validate content |

### Recommended flow before pushing

```bash
npm run check
lazygit
```

For content-only changes:

```bash
npm run validate:content
npm run build
lazygit
```

## Quality Checks

This repo includes GitHub Actions CI.

On every push or pull request, CI runs:

```txt
npm ci
npm run lint
npm run typecheck
npm run validate:content
npm run build
```

This helps catch broken TypeScript, invalid content metadata, missing screenshots, and failed production builds before deployment.

## SEO

The repo includes:

```txt
app/sitemap.ts
app/robots.ts
```

Set this in `.env.local` and in Vercel project environment variables:

```env
NEXT_PUBLIC_SITE_URL=https://terminal-portfolio-eight-theta.vercel.app
```

## Docs

More docs live in:

```txt
docs/CONTENT.md
```

Use the docs folder for deeper notes as the content system grows.

## Deployment

This app is designed to deploy on Vercel.

Typical production flow:

```bash
npm run check
git push
```

Vercel will build from the latest pushed commit.

## License

MIT License.
