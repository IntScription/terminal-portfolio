#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const packagePath = path.join(root, "package.json");

if (!fs.existsSync(packagePath)) {
  console.error("package.json not found. Run this from the repo root.");
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));

pkg.scripts = {
  ...pkg.scripts,
  lint: "eslint .",
  typecheck: "tsc --noEmit",
  doctor: "node scripts/doctor.mjs",
  "validate:content": "node scripts/validate-content.mjs",
  check:
    "npm run lint -- --max-warnings=0 && npm run typecheck && npm run validate:content && npm run build",
};

fs.writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);

console.log("Updated package.json scripts.");
