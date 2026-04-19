export function StatusBar({ activeSection }: { activeSection: string }) {
  return (
    <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-2 text-xs text-foreground/65 backdrop-blur-lg dark:bg-white/5">
      <span>tmux session: portfolio</span>
      <span>active: {activeSection}</span>
      <span>mode: interactive</span>
    </div>
  );
}
