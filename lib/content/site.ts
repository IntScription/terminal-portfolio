import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_PATH = path.join(process.cwd(), "content/site");

export type ProfileData = {
  name: string;
  title: string;
  email?: string;
  github?: string;
  youtube?: string;
  instagram?: string;
  location?: string;
  bio?: string;
};

export type NowData = {
  title: string;
  intro: string;
  items: Array<{
    label: string;
    value: string;
  }>;
};

export type UsesItem =
  | string
  | {
    name: string;
    description?: string;
    category?: string;
    related?: string[];
  };

export type UsesGroup = {
  title: string;
  items: UsesItem[];
};

export type UsesData = {
  title: string;
  intro: string;
  groups: UsesGroup[];
};

function readJsonFile<T>(filename: string): T | null {
  const fullPath = path.join(SITE_PATH, filename);
  if (!fs.existsSync(fullPath)) return null;
  return JSON.parse(fs.readFileSync(fullPath, "utf8")) as T;
}

export function getProfileData(): ProfileData | null {
  return readJsonFile<ProfileData>("profile.json");
}

export function getNowData(): NowData | null {
  return readJsonFile<NowData>("now.json");
}

export function getUsesData(): UsesData | null {
  return readJsonFile<UsesData>("uses.json");
}

export function getAboutContent(): { content: string } | null {
  const fullPath = path.join(SITE_PATH, "about.mdx");
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(raw);

  return { content };
}
