import { BlogPost } from "@/lib/types";

export function ArticleLayout({ post }: { post: BlogPost }) {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
        article
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {post.title}
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-foreground/55">
        <span>{post.publishedAt}</span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[rgba(var(--border))] px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-10 whitespace-pre-line text-[15px] leading-8 text-foreground/78">
        {post.body}
      </div>
    </article>
  );
}
