export function CommandChipRow({
  commands,
  onSelect,
}: {
  commands: readonly string[] | string[];
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.24em] text-foreground/40">
        quick actions
      </p>
      <div className="flex flex-wrap gap-2">
        {commands.map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => onSelect(command)}
            className="rounded-full border border-[rgba(var(--border))] bg-white/60 px-3 py-1 text-xs text-foreground/75 transition hover:bg-white dark:bg-white/5 dark:hover:bg-white/10"
          >
            {command}
          </button>
        ))}
      </div>
    </div>
  );
}
