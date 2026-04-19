import { pages } from "@/data/pages";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { EmptyView } from "@/components/preview/empty-view";
import { ProjectView } from "@/components/preview/project-view";
import { BlogView } from "@/components/preview/blog-view";
import { PageView } from "@/components/preview/page-view";
import { PreviewState } from "@/lib/types";

export function PreviewPane({
  preview,
  onRunCommand,
}: {
  preview: PreviewState;
  onRunCommand: (value: string) => void;
}) {
  switch (preview.type) {
    case "home":
      return <EmptyView onRunCommand={onRunCommand} />;

    case "projects":
      return (
        <ProjectView
          projects={projects}
          onRunCommandAction={onRunCommand}
        />
      );

    case "project": {
      const project = projects.find((item) => item.slug === preview.slug);

      return project ? (
        <ProjectView
          projects={[project]}
          featured
          onRunCommandAction={onRunCommand}
        />
      ) : (
        <EmptyView onRunCommand={onRunCommand} />
      );
    }

    case "blog":
      return <BlogView posts={posts} onRunCommand={onRunCommand} />;

    case "post": {
      const post = posts.find((item) => item.slug === preview.slug);

      return post ? (
        <BlogView
          posts={[post]}
          featured
          onRunCommand={onRunCommand}
        />
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
