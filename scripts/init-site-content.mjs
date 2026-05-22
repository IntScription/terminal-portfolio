import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const siteDir = path.join(root, "content", "site");

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
  ensureDir(siteDir);

  // about.mdx
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
`
  );

  // now.json
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
              "Improving this terminal-first portfolio and refining project presentation.",
          },
          {
            label: "Learning",
            value:
              "Deeper frontend polish, interaction design, and better engineering storytelling.",
          },
          {
            label: "Exploring",
            value:
              "Game systems, interface feel, workflow tooling, and richer product depth.",
          },
        ],
      },
      null,
      2
    )
  );

  // uses.json
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
            ],
          },
          {
            title: "Focus",
            items: [
              "UI polish",
              "systems thinking",
              "cross-platform product building",
            ],
          },
        ],
      },
      null,
      2
    )
  );

  // profile.json
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

  console.log("\nSite content initialized.");
}

main();
