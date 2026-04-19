import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function MDXRenderer({ source }: { source: string }) {
  return (
    <div
      className="
        prose prose-neutral max-w-none dark:prose-invert
        prose-headings:tracking-tight
        prose-h2:mt-12 prose-h2:text-2xl prose-h2:border-b prose-h2:border-[rgba(var(--border))] prose-h2:pb-2
        prose-h3:mt-8 prose-h3:text-xl
        prose-p:text-foreground/78
        prose-li:text-foreground/78
        prose-strong:text-foreground
        prose-a:text-accent prose-a:underline prose-a:decoration-accent/35 prose-a:underline-offset-4
        prose-code:rounded-md prose-code:bg-black/5 prose-code:px-1.5 prose-code:py-0.5 dark:prose-code:bg-white/10
        prose-pre:rounded-2xl prose-pre:border prose-pre:border-[rgba(var(--border))] prose-pre:bg-black/5 dark:prose-pre:bg-white/5
        prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-white/40 prose-blockquote:px-5 prose-blockquote:py-4 dark:prose-blockquote:bg-white/5
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children, ...props }) => {
            const text = String(children);
            return (
              <h2 id={slugify(text)} {...props}>
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const text = String(children);
            return (
              <h3 id={slugify(text)} {...props}>
                {children}
              </h3>
            );
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
