import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

const dirs = [
  "content",
  "content/blog",
  "content/projects",
  "content/site",
  "content/templates",
  "public/screenshots",
  "public/blog",
];

const files = {
  "content/templates/blog-meta.template.json": {
    title: "",
    slug: "",
    excerpt: "",
    publishedAt: "",
    tags: [],
    published: true,
    featured: false
  },

  "content/templates/project-meta.template.json": {
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
    order: 0
  },

  "content/templates/now.template.json": {
    title: "Now",
    intro: "What I am currently focused on, learning, and building right now.",
    items: [
      {
        label: "Building",
        value: ""
      },
      {
        label: "Learning",
        value: ""
      },
      {
        label: "Exploring",
        value: ""
      }
    ]
  },

  "content/templates/uses.template.json": {
    title: "Uses",
    intro: "The tools and setup that shape how I build.",
    groups: [
      {
        title: "Development",
        items: []
      },
      {
        title: "Workflow",
        items: []
      },
      {
        title: "Focus",
        items: []
      }
    ]
  },

  "content/templates/profile.template.json": {
    name: "Kartik Sanil",
    title: "Full stack developer / game dev / UI builder",
    email: "",
    github: "",
    youtube: "",
    instagram: "",
    location: "",
    bio: ""
  },

  "content/site/now.json": {
    title: "Now",
    intro: "What I am currently focused on, learning, and building right now.",
    items: [
      {
        label: "Building",
        value: ""
      },
      {
        label: "Learning",
        value: ""
      },
      {
        label: "Exploring",
        value: ""
      }
    ]
  },

  "content/site/uses.json": {
    title: "Uses",
    intro: "The tools and setup that shape how I build.",
    groups: [
      {
        title: "Development",
        items: []
      },
      {
        title: "Workflow",
        items: []
      },
      {
        title: "Focus",
        items: []
      }
    ]
  },

  "content/site/profile.json": {
    name: "Kartik Sanil",
    title: "Full stack developer / game dev / UI builder",
    email: "",
    github: "",
    youtube: "",
    instagram: "",
    location: "",
    bio: ""
  }
};

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  for (const dir of dirs) {
    await mkdir(path.join(root, dir), { recursive: true });
  }

  for (const [relativePath, content] of Object.entries(files)) {
    const fullPath = path.join(root, relativePath);

    if (await exists(fullPath)) {
      console.log(`skip: ${relativePath}`);
      continue;
    }

    await writeFile(fullPath, JSON.stringify(content, null, 2) + "\n", "utf8");
    console.log(`created: ${relativePath}`);
  }

  console.log("\nContent scaffolding ready.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
