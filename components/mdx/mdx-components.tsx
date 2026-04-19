import Image from "next/image";
import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ComponentPropsWithoutRef,
  HTMLAttributes,
  ImgHTMLAttributes,
  LiHTMLAttributes,
  OlHTMLAttributes,
  ReactNode,
  DetailedHTMLProps,
} from "react";

type MDXComponents = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element;
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element;
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element;
  p: (props: HTMLAttributes<HTMLParagraphElement>) => JSX.Element;
  ul: (props: HTMLAttributes<HTMLUListElement>) => JSX.Element;
  ol: (props: OlHTMLAttributes<HTMLOListElement>) => JSX.Element;
  li: (props: LiHTMLAttributes<HTMLLIElement>) => JSX.Element;
  blockquote: (props: HTMLAttributes<HTMLElement>) => JSX.Element;
  a: (
    props: AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string }
  ) => JSX.Element;
  hr: (props: HTMLAttributes<HTMLHRElement>) => JSX.Element;
  code: (props: HTMLAttributes<HTMLElement>) => JSX.Element;
  pre: (props: HTMLAttributes<HTMLPreElement>) => JSX.Element;
  img: (
    props: ImgHTMLAttributes<HTMLImageElement> & { src?: string; alt?: string }
  ) => JSX.Element;
  Image: typeof Image;
  Callout: typeof Callout;
  StatGrid: typeof StatGrid;
};

function Callout({
  children,
  type = "default",
}: {
  children: ReactNode;
  type?: "default" | "info" | "warning" | "success";
}) {
  const styles = {
    default: "border-[rgba(var(--border))] bg-white/50 dark:bg-white/5",
    info: "border-cyan-400/25 bg-cyan-400/10",
    warning: "border-amber-400/25 bg-amber-400/10",
    success: "border-emerald-400/25 bg-emerald-400/10",
  };

  return (
    <div className={`my-6 rounded-2xl border p-4 ${styles[type]}`}>
      <div className="text-sm leading-7 text-foreground/80">{children}</div>
    </div>
  );
}

function StatGrid({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-[rgba(var(--border))] bg-white/50 p-5 dark:bg-white/5"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-foreground/50">
            {item.label}
          </p>
          <p className="mt-2 text-lg font-semibold tracking-tight">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-10 text-4xl font-semibold tracking-tight sm:text-5xl"
      {...props}
    />
  ),

  h2: (props) => (
    <h2
      className="mt-12 text-2xl font-semibold tracking-tight sm:text-3xl"
      {...props}
    />
  ),

  h3: (props) => (
    <h3 className="mt-8 text-xl font-semibold tracking-tight" {...props} />
  ),

  p: (props) => (
    <p className="mt-4 text-[15px] leading-8 text-foreground/78" {...props} />
  ),

  ul: (props) => (
    <ul
      className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-8 text-foreground/78"
      {...props}
    />
  ),

  ol: (props) => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-6 text-[15px] leading-8 text-foreground/78"
      {...props}
    />
  ),

  li: (props) => <li className="pl-1" {...props} />,

  blockquote: (props) => (
    <blockquote
      className="my-6 rounded-r-2xl border-l-4 border-accent bg-white/40 px-5 py-4 italic text-foreground/75 dark:bg-white/5"
      {...props}
    />
  ),

  a: ({ href = "", ...props }) => {
    const isInternal = href.startsWith("/");
    const className =
      "text-accent underline decoration-accent/35 underline-offset-4 transition hover:decoration-accent";

    return isInternal ? (
      <Link href={href} className={className} {...props} />
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        {...props}
      />
    );
  },

  hr: (props) => <hr className="my-10 border-[rgba(var(--border))]" {...props} />,

  code: (props) => (
    <code
      className="rounded-md bg-black/5 px-1.5 py-0.5 font-mono text-[0.92em] dark:bg-white/10"
      {...props}
    />
  ),

  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-2xl border border-[rgba(var(--border))] bg-black/5 p-4 text-sm leading-7 dark:bg-white/5"
      {...props}
    />
  ),

  img: ({ src = "", alt = "", ...props }) => (
    <span className="my-8 block overflow-hidden rounded-3xl border border-[rgba(var(--border))]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full object-cover" {...props} />
    </span>
  ),

  Image,
  Callout,
  StatGrid,
};
