import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/content/blog";
import { MDXRenderer } from "@/components/mdx/mdx-renderer";
import { BackLink } from "@/components/ui/back-link";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { TOC } from "@/components/blog/toc";
import { calculateReadingTime, extractHeadings } from "@/lib/utils";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const readingTime = calculateReadingTime(post.content);

  return (
    <>
      <ReadingProgress />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="mx-auto min-w-0 max-w-5xl">
            <BackLink href="/blog" label="Back to blog" />

            <section className="mt-4 rounded-[30px] border border-[rgba(var(--border))] bg-white/55 px-5 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:bg-white/6 sm:px-8 sm:py-10 lg:px-10">
              <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
                article
              </p>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                {post.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-foreground/55">
                <span>{post.publishedAt}</span>
                <span>•</span>
                <span>{readingTime} min read</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[rgba(var(--border))] bg-white/60 px-2.5 py-0.5 dark:bg-white/8"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {post.excerpt ? (
                <p className="mt-6 max-w-3xl text-base leading-8 text-foreground/72">
                  {post.excerpt}
                </p>
              ) : null}
            </section>

            <section className="mt-10 w-full">
              <div className="rounded-[30px] border border-[rgba(var(--border))] bg-white/55 px-5 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:bg-white/6 sm:px-8 sm:py-10 lg:px-10">
                <div
                  className="
                    blog-mdx
                    text-[15px] leading-8 text-foreground/80
                    sm:text-base

                    [&>*:first-child]:mt-0
                    [&>*:last-child]:mb-0

                    [&_h2]:mt-12
                    [&_h2]:text-2xl
                    [&_h2]:font-semibold
                    [&_h2]:tracking-tight
                    [&_h2]:text-foreground
                    [&_h2]:sm:text-3xl

                    [&_h3]:mt-8
                    [&_h3]:text-xl
                    [&_h3]:font-semibold
                    [&_h3]:tracking-tight
                    [&_h3]:text-foreground

                    [&_p]:mt-4
                    [&_p]:leading-8
                    [&_p]:text-foreground/75

                    [&_ul]:mt-4
                    [&_ul]:list-disc
                    [&_ul]:space-y-2
                    [&_ul]:pl-5

                    [&_ol]:mt-4
                    [&_ol]:list-decimal
                    [&_ol]:space-y-2
                    [&_ol]:pl-5

                    [&_li]:pl-1
                    [&_li]:text-foreground/75
                    [&_li]:marker:text-foreground/40

                    [&_strong]:font-semibold
                    [&_strong]:text-foreground

                    [&_blockquote]:mt-6
                    [&_blockquote]:border-l-2
                    [&_blockquote]:border-foreground/20
                    [&_blockquote]:pl-4
                    [&_blockquote]:italic
                    [&_blockquote]:text-foreground/70

                    [&_code]:rounded-md
                    [&_code]:bg-black/5
                    [&_code]:px-1.5
                    [&_code]:py-0.5
                    [&_code]:text-[0.95em]
                    [&_code]:dark:bg-white/10

                    [&_pre]:mt-6
                    [&_pre]:overflow-x-auto
                    [&_pre]:rounded-xl
                    [&_pre]:border
                    [&_pre]:border-[rgba(var(--border))]
                    [&_pre]:bg-black/90
                    [&_pre]:p-4
                    [&_pre]:text-sm
                    [&_pre]:text-white

                    [&_img]:mt-6
                    [&_img]:rounded-xl
                    [&_img]:border
                    [&_img]:border-[rgba(var(--border))]

                    [&_hr]:my-10
                    [&_hr]:border-0
                    [&_hr]:border-t
                    [&_hr]:border-[rgba(var(--border))]
                  "
                >
                  <MDXRenderer source={post.content} />
                </div>
              </div>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TOC headings={headings} />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
