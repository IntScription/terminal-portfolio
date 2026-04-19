export type BlogManifestItem = {
  slug: string;
  title: string;
};

export type ProjectManifestItem = {
  slug: string;
  title: string;
  repoUrl?: string;
  liveUrl?: string;
};

export const blogManifest: BlogManifestItem[] = [
  {
    slug: "welcome-to-my-blog",
    title: "Welcome to My Blog",
  },
];

export const projectManifest: ProjectManifestItem[] = [
  {
    slug: "rest-assured",
    title: "Rest Assured",
    repoUrl: "https://github.com/IntScription/rest-assured",
    liveUrl: "https://rest-assured-rho.vercel.app/login",
  },
];
