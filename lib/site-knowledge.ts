import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllProjects, getProjectBySlug } from "@/lib/content/projects";
import { getAllBlogs, getBlogBySlug } from "@/lib/content/blog";
import {
  getAboutContent,
  getNowData,
  getProfileData,
  getUsesData,
} from "@/lib/content/site";

type KnowledgeChunk = {
  id: string;
  title: string;
  source: string;
  text: string;
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function keywords(text: string) {
  return new Set(
    normalize(text)
      .split(" ")
      .filter((word) => word.length > 2)
  );
}

function scoreChunk(question: string, chunk: KnowledgeChunk) {
  const q = keywords(question);
  const c = keywords(`${chunk.title} ${chunk.source} ${chunk.text}`);

  let score = 0;
  for (const word of q) {
    if (c.has(word)) score += 3;
    if (chunk.title.toLowerCase().includes(word)) score += 2;
    if (chunk.source.toLowerCase().includes(word)) score += 1;
  }

  if (normalize(chunk.text).includes(normalize(question))) {
    score += 8;
  }

  return score;
}

function excerpt(text: string, maxLength = 280) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength).trim()}...`;
}

export function getKnowledgeChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  const about = getAboutContent();
  if (about) {
    chunks.push({
      id: "about",
      title: "About",
      source: "about",
      text: about.content,
    });
  }

  const now = getNowData();
  if (now) {
    chunks.push({
      id: "now",
      title: now.title,
      source: "now",
      text: `${now.intro}\n${now.items
        .map((item) => `${item.label}: ${item.value}`)
        .join("\n")}`,
    });
  }

  const uses = getUsesData();
  if (uses) {
    chunks.push({
      id: "uses",
      title: uses.title,
      source: "uses",
      text: `${uses.intro}\n${uses.groups
        .map((group) => `${group.title}: ${group.items.join(", ")}`)
        .join("\n")}`,
    });
  }

  const profile = getProfileData();
  if (profile) {
    chunks.push({
      id: "profile",
      title: profile.name,
      source: "profile",
      text: [
        profile.title,
        profile.bio,
        profile.location,
        profile.github,
        profile.youtube,
        profile.instagram,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  }

  for (const postMeta of getAllBlogs()) {
    const post = getBlogBySlug(postMeta.slug);
    if (!post) continue;

    chunks.push({
      id: `blog-${post.slug}`,
      title: post.title,
      source: `blog/${post.slug}`,
      text: `${post.excerpt}\n${post.content}`,
    });
  }

  for (const projectMeta of getAllProjects()) {
    const project = getProjectBySlug(projectMeta.slug);
    if (!project) continue;

    chunks.push({
      id: `project-${project.slug}`,
      title: project.title,
      source: `projects/${project.slug}`,
      text: `${project.tagline}\n${project.description}\n${project.stack.join(
        ", "
      )}\n${project.content}`,
    });
  }

  return chunks;
}

export function answerWebsiteQuestion(question: string) {
  const chunks = getKnowledgeChunks();

  const ranked = chunks
    .map((chunk) => ({
      chunk,
      score: scoreChunk(question, chunk),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (!ranked.length) {
    return {
      found: false,
      answer:
        "I can answer questions about this portfolio, projects, blog posts, workflow, tools, and pages like about / now / uses.",
      suggestions: [
        "ask what is rest assured",
        "ask what tools do you use",
        "ask what are you building now",
        "ask how this terminal works",
      ],
    };
  }

  const top = ranked[0];
  const supporting = ranked.slice(1);

  const answerLines = [
    `${top.chunk.title}: ${excerpt(top.chunk.text, 320)}`,
    ...supporting.map(
      (item) => `Related from ${item.chunk.source}: ${excerpt(item.chunk.text, 180)}`
    ),
  ];

  return {
    found: true,
    answer: answerLines.join("\n"),
    suggestions: [
      `source: ${top.chunk.source}`,
      "try: ls",
      "try: help",
    ],
  };
}
