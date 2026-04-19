import Link from "next/link";
import { BlogMeta } from "@/lib/content/blog";
import { InteractiveCard } from "@/components/ui/interactive-card";

export function BlogList({ posts }: { posts: BlogMeta[] }) {
  return (
    <section className="grid gap-6">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <InteractiveCard className="p-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/55">
              <span>{post.publishedAt}</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[rgba(var(--border))] px-2.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              {post.title}
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/74">
              {post.excerpt}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm text-foreground/60">
              <span>Read article</span>
              <span>→</span>
            </div>
          </InteractiveCard>
        </Link>
      ))}
    </section>
  );
}
