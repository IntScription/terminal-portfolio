import { BlogPost } from "@/lib/types";

export function BlogView({
  posts,
  featured = false,
}: {
  posts: BlogPost[];
  featured?: boolean;
}) {
  return (
    <section className="min-h-140 rounded-[28px] border border-black/8 bg-white/50 p-6 backdrop-blur-2xl dark:border-white/15 dark:bg-white/5">
      <p className="text-xs uppercase tracking-[0.28em] text-foreground/60">
        blog
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">
        {featured ? posts[0]?.title : "Writing and notes"}
      </h2>

      <div className="mt-6 space-y-4">
        {posts.map((post) => (
          <article
            id={post.slug}
            key={post.slug}
            className="scroll-mt-28 rounded-3xl border border-black/8 bg-white/50 p-5 dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/60">
              <span>{post.publishedAt}</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/8 px-2 py-0.5 dark:border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="mt-4 text-xl font-semibold">{post.title}</h3>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-foreground/75">
              {featured ? post.body : post.excerpt}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
