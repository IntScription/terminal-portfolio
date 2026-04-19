import Link from "next/link";

export function BackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <div className="mb-8">
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-full border border-[rgba(var(--border))] bg-white/65 px-4 py-2 text-sm text-foreground/75 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-white hover:text-foreground dark:bg-white/8 dark:hover:bg-white/12"
      >
        <span className="transition duration-150 group-hover:-translate-x-0.5">
          ←
        </span>
        <span>{label}</span>
      </Link>
    </div>
  );
}
