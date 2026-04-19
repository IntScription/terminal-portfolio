import { EmptyView } from "@/components/preview/empty-view";
import { ProjectView } from "@/components/preview/project-view";
import { BlogView } from "@/components/preview/blog-view";
import { PageView } from "@/components/preview/page-view";
import { PreviewState, BlogPost, StaticPage } from "@/lib/types";

type Project = {
  slug: string;
  title: string;
  description?: string;
  body?: string;
};

type PagesMap = {
  about: StaticPage;
  setup: StaticPage;
  contact: StaticPage;
  resume: StaticPage;
};

export function PreviewPane({
  preview,
  onRunCommand,
  pages,
  posts,
  projects,
}: {
  preview: PreviewState;
  onRunCommand: (value: string) => void;
  pages: PagesMap;
  posts: BlogPost[];
  projects: Project[];
}) {
  if (!preview) {
    return <EmptyView onRunCommand={onRunCommand} />;
  }

  switch (preview.type) {
    case "home":
      return <EmptyView onRunCommand={onRunCommand} />;

    case "projects":
      return <ProjectView projects={projects} />;

    case "project": {
      const project = projects.find((item: Project) => item.slug === preview.slug);

      return project ? (
        <ProjectView projects={[project]} featured />
      ) : (
        <EmptyView onRunCommand={onRunCommand} />
      );
    }

    case "blog":
      return <BlogView posts={posts} />;

    case "post": {
      const post = posts.find((item: BlogPost) => item.slug === preview.slug);

      return post ? (
        <BlogView posts={[post]} featured />
      ) : (
        <EmptyView onRunCommand={onRunCommand} />
      );
    }

    case "about":
      return <PageView title={pages.about.title} body={pages.about.body} />;

    case "setup":
      return <PageView title={pages.setup.title} body={pages.setup.body} />;

    case "contact":
      return <PageView title={pages.contact.title} body={pages.contact.body} />;

    case "resume":
      return <PageView title={pages.resume.title} body={pages.resume.body} />;

    case "not-found":
      return (
        <PageView
          title="Not found"
          body={`No resource found for: ${preview.value}`}
        />
      );

    default:
      return <EmptyView onRunCommand={onRunCommand} />;
  }
}
