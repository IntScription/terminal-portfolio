import Link from "next/link";
import { getAllBlogs } from "@/lib/content/blog";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { Reveal } from "@/components/ui/reveal";

export function BlogPreviewStrip() {
  const posts = getAllBlogs().slice(0, 3);

  if (!posts.length) return null;

  return (
    <Reveal>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
              latest writing
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Notes on building, interfaces, and process.
            </h2>
          </div>

          <Link
            href="/blog"
            prefetch
            className="rounded-2xl border border-[rgba(var(--border))] bg-white/70 px-4 py-2 text-sm transition duration-150 hover:-translate-y-0.5 hover:bg-white dark:bg-white/10 dark:hover:bg-white/15"
          >
            View all posts
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              prefetch
              className="group block"
            >
              <InteractiveCard className="flex min-h-[260px] flex-col justify-between p-6 transition duration-200 group-hover:shadow-[0_0_0_1px_rgba(34,211,238,0.10),0_18px_40px_rgba(15,23,42,0.08),0_0_28px_rgba(34,211,238,0.12)]">
                <div>
                  <div className="flex flex-wrap gap-2 text-xs text-foreground/50">
                    <span>{post.publishedAt}</span>
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[rgba(var(--border))] px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-4 text-xl font-semibold tracking-tight transition duration-200 group-hover:text-accent">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-foreground/74">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm text-foreground/52 transition duration-200 group-hover:text-foreground/72">
                  <span>Read post</span>
                  <span className="transition duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </InteractiveCard>
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
