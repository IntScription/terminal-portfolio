export type BlogManifestItem = {
  slug: string;
  title: string;
};

export type ProjectManifestItem = {
  slug: string;
  title: string;
  repoUrl?: string;
  liveUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  stack?: string[];
};

export const blogManifest: BlogManifestItem[] = [];

export const projectManifest: ProjectManifestItem[] = [
  {
    "slug": "devlog",
    "title": "Devlog",
    "repoUrl": "https://github.com/IntScription/devlog",
    "liveUrl": "https://intscription.github.io/devlog/",
    "appStoreUrl": "",
    "playStoreUrl": "",
    "stack": [
      "Jekyll",
      "Markdown",
      "HTML",
      "SCSS",
      "JavaScript",
      "Python",
      "Ruby",
      "GitHub Pages"
    ]
  },
  {
    "slug": "expense-tracker",
    "title": "Expense Tracker",
    "repoUrl": "https://github.com/IntScription/expense-tracker",
    "liveUrl": "https://expense-tracker-two-weld-69.vercel.app/",
    "appStoreUrl": "",
    "playStoreUrl": "",
    "stack": [
      "React",
      "Vite",
      "JavaScript",
      "CSS",
      "Frankfurter API",
      "localStorage",
      "Vercel"
    ]
  },
  {
    "slug": "golf-charity-platform",
    "title": "Golf Charity Platform",
    "repoUrl": "https://github.com/IntScription/golf-charity-platform",
    "liveUrl": "https://golf-charity-platform-woad-gamma.vercel.app/",
    "appStoreUrl": "",
    "playStoreUrl": "",
    "stack": [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Stripe",
      "Vercel",
      "RLS"
    ]
  },
  {
    "slug": "rest-assured",
    "title": "Rest Assured",
    "repoUrl": "https://github.com/IntScription/rest-assured",
    "liveUrl": "https://rest-assured-rho.vercel.app",
    "appStoreUrl": "https://apps.apple.com/in/app/rest-assured-workout-log/id6760107763",
    "playStoreUrl": "",
    "stack": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "React Native",
      "Expo",
      "Supabase",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "Kubernetes",
      "TypeScript",
      "Vercel"
    ]
  }
];

