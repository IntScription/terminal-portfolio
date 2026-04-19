import { cn } from "@/lib/utils";

export function SectionPill({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const content = (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide transition",
        active
          ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
          : "border-white/10 bg-white/5 text-foreground/75 hover:bg-white/10"
      )}
    >
      {label}
    </span>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="outline-none">
        {content}
      </button>
    );
  }

  return content;
}
