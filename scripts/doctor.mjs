#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const root = process.cwd();
let passed = 0;
let warnings = 0;
let failed = 0;

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  dim: "\x1b[2m",
};

function section(title) {
  console.log(`\n${c.bold}${title}${c.reset}`);
}

function pass(message) {
  passed += 1;
  console.log(`${c.green}✓${c.reset} ${message}`);
}

function warn(message) {
  warnings += 1;
  console.log(`${c.yellow}!${c.reset} ${message}`);
}

function fail(message) {
  failed += 1;
  console.log(`${c.red}x${c.reset} ${message}`);
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function commandVersion(command) {
  try {
    return execSync(command, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim()
      .split("\n")[0];
  } catch {
    return null;
  }
}

function checkCommand(name, command, required = true) {
  const output = commandVersion(command);
  if (output) {
    pass(`${name} found ${c.dim}(${output})${c.reset}`);
  } else if (required) {
    fail(`${name} not found`);
  } else {
    warn(`${name} not found`);
  }
}

function checkPath(label, relativePath, required = true) {
  if (exists(relativePath)) {
    pass(`${label} exists ${c.dim}(${relativePath})${c.reset}`);
  } else if (required) {
    fail(`${label} missing ${c.dim}(${relativePath})${c.reset}`);
  } else {
    warn(`${label} missing ${c.dim}(${relativePath})${c.reset}`);
  }
}

console.log(`${c.bold}Terminal Portfolio Doctor${c.reset}`);
console.log(`${c.dim}Checking local development setup.${c.reset}`);

section("Runtime");
checkCommand("Node", "node --version");
checkCommand("npm", "npm --version");
checkCommand("Git", "git --version", false);

section("Core files");
checkPath("package.json", "package.json");
checkPath("Next config", "next.config.mjs", false);
checkPath("TypeScript config", "tsconfig.json");
checkPath("ESLint config", "eslint.config.mjs", false);
checkPath("Environment example", ".env.example");

section("App folders");
checkPath("App Router folder", "app");
checkPath("Components folder", "components");
checkPath("Content folder", "content");
checkPath("Projects content folder", "content/projects");
checkPath("Blog content folder", "content/blog");
checkPath("Public folder", "public");
checkPath("Screenshots folder", "public/screenshots", false);
checkPath("Scripts folder", "scripts");

section("Scripts");
checkPath("Content validator", "scripts/validate-content.mjs");
checkPath("Content manifest generator", "scripts/generate-content-manifest.mjs", false);
checkPath("Project scaffold script", "scripts/new-project.mjs", false);
checkPath("Blog scaffold script", "scripts/new-blog.mjs", false);

section("Environment");
if (exists(".env.local")) {
  pass(".env.local exists");
} else {
  warn(".env.local missing. Copy .env.example to .env.local for local AI/provider settings.");
}

if (process.env.NEXT_PUBLIC_SITE_URL) {
  pass(`NEXT_PUBLIC_SITE_URL set ${c.dim}(${process.env.NEXT_PUBLIC_SITE_URL})${c.reset}`);
} else {
  warn("NEXT_PUBLIC_SITE_URL not set in current shell");
}

section("Summary");
console.log(`${c.green}Passed:${c.reset} ${passed}`);
console.log(`${c.yellow}Warnings:${c.reset} ${warnings}`);
console.log(`${c.red}Failed:${c.reset} ${failed}`);

if (failed > 0) process.exit(1);
if (warnings > 0) {
  console.log(`\n${c.yellow}Setup is usable, but a few optional checks need attention.${c.reset}`);
} else {
  console.log(`\n${c.green}Everything looks good.${c.reset}`);
}
