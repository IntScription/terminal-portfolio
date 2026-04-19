"use client";

type Node = {
  id: string;
  label: string;
  type?: string;
};

type Edge = {
  source: string;
  target: string;
};

function nodeColor(type?: string) {
  switch (type) {
    case "frontend":
      return "bg-cyan-400/12 border-cyan-400/30 text-foreground";
    case "backend":
      return "bg-emerald-400/12 border-emerald-400/30 text-foreground";
    case "database":
      return "bg-violet-400/12 border-violet-400/30 text-foreground";
    case "infra":
      return "bg-amber-400/12 border-amber-400/30 text-foreground";
    default:
      return "bg-white/60 border-[rgba(var(--border))] text-foreground dark:bg-white/8";
  }
}

export function ArchitectureDiagram({
  nodes,
  edges,
}: {
  nodes: Node[];
  edges: Edge[];
}) {
  const columns = Math.min(4, Math.max(2, nodes.length));

  return (
    <div className="rounded-[28px] border border-[rgba(var(--border))] bg-white/45 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)] dark:bg-white/5">
      <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
        architecture
      </p>

      <div
        className="relative mt-6 grid gap-6"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`rounded-2xl border px-4 py-4 text-sm shadow-sm ${nodeColor(node.type)}`}
          >
            <p className="font-medium">{node.label}</p>
            {node.type ? (
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-foreground/50">
                {node.type}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        {edges.map((edge, index) => {
          const source = nodes.find((n) => n.id === edge.source)?.label ?? edge.source;
          const target = nodes.find((n) => n.id === edge.target)?.label ?? edge.target;

          return (
            <div
              key={`${edge.source}-${edge.target}-${index}`}
              className="rounded-xl border border-[rgba(var(--border))] bg-white/60 px-3 py-2 text-sm text-foreground/72 dark:bg-white/8"
            >
              {source} → {target}
            </div>
          );
        })}
      </div>
    </div>
  );
}
