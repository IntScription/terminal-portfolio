import { TerminalLine } from "@/lib/types";

function NeofetchCard({
  data,
}: {
  data: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[rgba(var(--border))] bg-white/40 dark:bg-white/5">
      <div className="grid grid-cols-[90px_1fr] gap-0">
        <div className="border-r border-[rgba(var(--border))] bg-black/2 px-4 py-4 dark:bg-white/3">
          <pre className="text-[10px] leading-4 text-prompt">{`██╗  ██╗
██║ ██╔╝
█████╔╝
██╔═██╗
██║  ██╗
╚═╝  ╚═╝`}</pre>
        </div>

        <div className="divide-y divide-[rgba(var(--border))]">
          {data.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[88px_1fr] gap-3 px-4 py-2.5"
            >
              <span className="text-foreground/55">{item.label}</span>
              <span className="text-output">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TerminalOutput({
  lines,
  prompt,
}: {
  lines: TerminalLine[];
  prompt: string;
}) {
  return (
    <div className="space-y-2 font-mono text-sm text-output">
      {lines.map((line) => {
        if (line.kind === "input") {
          return (
            <div key={line.id}>
              <span className="text-prompt">{prompt}</span>{" "}
              <span>{line.content}</span>
            </div>
          );
        }

        if (line.kind === "neofetch") {
          return <NeofetchCard key={line.id} data={line.data} />;
        }

        return (
          <div
            key={line.id}
            className={
              line.kind === "error"
                ? "text-error"
                : line.kind === "hint"
                  ? "text-hint"
                  : "text-output"
            }
          >
            {line.content}
          </div>
        );
      })}
    </div>
  );
}
