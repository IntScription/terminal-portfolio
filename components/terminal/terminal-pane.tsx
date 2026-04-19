"use client";

import { motion } from "framer-motion";
import { PROMPT } from "@/lib/constants";
import { TerminalLine } from "@/lib/types";
import { CommandChipRow } from "@/components/terminal/command-chip-row";
import { TerminalInput } from "@/components/terminal/terminal-input";
import { TerminalOutput } from "@/components/terminal/terminal-output";

export function TerminalPane({
  lines,
  onRunCommandAction,
  quickCommands,
}: {
  lines: TerminalLine[];
  onRunCommandAction: (value: string) => void;
  quickCommands: string[];
}) {
  const history = lines.reduce<string[]>((acc, line) => {
    if (line.kind === "input" && "content" in line) {
      acc.push(line.content);
    }
    return acc;
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex min-h-140 flex-col rounded-[28px] border border-white/15 bg-black/55 shadow-2xl backdrop-blur-2xl"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-400/80" />
        <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <div className="h-3 w-3 rounded-full bg-green-400/80" />
        <div className="ml-3 text-xs text-white/60">
          alacritty — zsh — portfolio
        </div>
      </div>

      <div className="flex-1 space-y-4 p-4">
        <TerminalOutput lines={lines} prompt={PROMPT} />
      </div>

      <div className="space-y-3 border-t border-white/10 p-4">
        <CommandChipRow
          commands={quickCommands}
          onSelect={onRunCommandAction}
        />

        <TerminalInput
          prompt={PROMPT}
          history={history}
          onRunCommandAction={onRunCommandAction}
        />
      </div>
    </motion.section>
  );
}
