# Terminal Portfolio

A terminal-inspired portfolio built with **Next.js**, **TypeScript**, and **Tailwind CSS**.
It blends a terminal-first landing experience with clean editorial project pages, MDX-powered writing, and an AI assistant backed by hosted LLM providers.

## Overview

This project is designed to feel like stepping into a personal workflow rather than browsing a standard portfolio. It combines command-line inspired interaction, structured long-form case studies, themed visuals, and responsive layouts across desktop and mobile.

## Features

- Terminal-style homepage experience
- Theme-aware interface
- Project case study pages
- Blog powered by MDX
- Dedicated **About**, **Now**, and **Uses** pages
- AI assistant page with hosted model support
- Responsive design for desktop, tablet, and mobile
- Motion, particles, and polished interaction details

## Tech Stack

- **Framework:** Next.js
- **UI:** React, TypeScript, Tailwind CSS
- **Content:** MDX
- **Animation:** Framer Motion / Motion
- **Deployment:** Vercel
- **AI Providers:** OpenRouter, OpenAI
- **Icons:** React Icons
- **Visual Effects:** OGL

## Project Structure

```text
.
├── app/                      # Next.js App Router pages and API routes
│   ├── api/                  # API endpoints (chat, assistant, etc.)
│   ├── projects/             # Project listing and dynamic project pages
│   ├── blog/                 # Blog listing and dynamic blog pages
│   ├── about/                # About page
│   ├── now/                  # Now page
│   ├── uses/                 # Uses / setup page
│   └── layout.tsx            # Root layout

├── components/               # Reusable UI and feature components
│   ├── ui/                   # Buttons, cards, links, and primitives
│   ├── layout/               # Header, footer, navigation, shell
│   ├── home/                 # Homepage sections
│   ├── blog/                 # Blog-specific components
│   ├── projects/             # Project-specific components
│   └── reactbits/            # Animated visual components

├── content/                  # Structured content (MDX + JSON)
│   ├── blog/                 # Blog post content
│   │   └── <slug>/
│   │       ├── meta.json
│   │       └── content.mdx
│   ├── projects/             # Project case studies
│   │   └── <slug>/
│   │       ├── meta.json
│   │       └── content.mdx
│   └── site/                 # Site-level content (about, now, uses, profile)

├── lib/                      # Core logic and helpers
│   ├── ai/                   # AI routing, prompts, and context
│   ├── content/              # Content loaders and MDX parsing
│   └── utils/                # Shared utilities

├── public/                   # Static assets
│   ├── screenshots/          # Project screenshots
│   └── icons/                # Icons, favicons, and misc assets

├── scripts/                  # Developer scripts
│   ├── new-project.mjs       # Scaffold a new project entry
│   ├── new-blog.mjs          # Scaffold a new blog entry
│   └── generate-content.mjs  # Generate or refresh content manifest

├── styles/                   # Global styles (if separated)
├── .env.local                # Local environment variables
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Open in your browser

`http://localhost:3000`

## Environment Variables

- Create a .env.local file in the project root:

```.env
# Primary provider
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=deepseek/deepseek-chat

# Optional fallback provider
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4.1-mini

# Optional local development provider
LOCAL_LLM_BASE_URL=http://localhost:11434/v1
LOCAL_LLM_MODEL=llama3.2
LOCAL_LLM_API_KEY=ollama
```

## Content Workflow

### Create a new project

- Use the project scaffolding script:

```bash
npm run new:project -- "Project Name"
```

- This creates a new folder inside:

`content/projects/<slug>/`

- With the following files:

`meta.json`
`content.mdx`

### Create a new blog post

- Use the blog scaffolding script:

```bash
npm run new:blog -- "Post Title"
```

- This creates a new folder inside:

`content/blog/<slug>/`

- With the following files:

`meta.json`
`content.mdx`

### Regenerate the content manifest

- If your setup uses a generated content manifest, run:

```bash
npm run generate:content
```

- If your script name differs, use the matching command defined in `package.json`.
