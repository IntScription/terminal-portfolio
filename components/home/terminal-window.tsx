"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "framer-motion";
import { TerminalInput } from "@/components/terminal/terminal-input";
import { TerminalOutput } from "@/components/terminal/terminal-output";
import { MatrixOverlay } from "@/components/home/matrix-overlay";
import { PROMPT_SYMBOL, PROMPT_USER } from "@/lib/constants";
import { runCommand } from "@/lib/commands";
import {
  TerminalDirectory,
  TerminalLine,
  TerminalLineInput,
} from "@/lib/types";
import { cn, makeId } from "@/lib/utils";

const STORAGE_KEY = "terminal_portfolio_state_v2";
const DEMO_SESSION_KEY = "terminal_portfolio_demo_played_v2";
const DEMO_COMMANDS = ["help", "cd projects", "ls"];
const DEMO_FINAL_INPUT = "open rest-assured";

function TrafficButton({
  color,
  symbol,
  onClick,
  label,
}: {
  color: string;
  symbol: string;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-bold text-black/55 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] transition duration-150 hover:scale-105"
      style={{ backgroundColor: color }}
    >
      <span>{symbol}</span>
    </button>
  );
}

function makePrompt(cwd: TerminalDirectory) {
  return `${PROMPT_USER} ${cwd} ${PROMPT_SYMBOL}`;
}

export function TerminalWindow({
  minimized,
  expanded,
  focusRequestKey = 0,
  onCloseAction,
  onMinimizeAction,
  onExpandAction,
  onRestoreAction,
}: {
  minimized: boolean;
  expanded: boolean;
  focusRequestKey?: number;
  onCloseAction: () => void;
  onMinimizeAction: () => void;
  onExpandAction: () => void;
  onRestoreAction: () => void;
}) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [cwd, setCwd] = useState<TerminalDirectory>("~");
  const [overlay, setOverlay] = useState<null | { mode: "matrix" }>(null);
  const [active, setActive] = useState(false);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [prefillCommand, setPrefillCommand] = useState("");
  const [hasPlayedDemo, setHasPlayedDemo] = useState(true);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const { setTheme } = useTheme();
  const reduceMotion = useReducedMotion();

  const prompt = makePrompt(cwd);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        lines?: TerminalLine[];
        history?: string[];
        cwd?: TerminalDirectory;
      };

      if (parsed.lines) setLines(parsed.lines);
      if (parsed.history) setHistory(parsed.history);
      if (parsed.cwd) setCwd(parsed.cwd);
    } catch { }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          lines,
          history,
          cwd,
        })
      );
    } catch { }
  }, [lines, history, cwd]);

  useEffect(() => {
    try {
      const alreadyPlayed = sessionStorage.getItem(DEMO_SESSION_KEY) === "1";
      setHasPlayedDemo(alreadyPlayed);
    } catch {
      setHasPlayedDemo(true);
    }
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines, cwd, minimized, expanded]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const onFocusIn = () => setActive(true);
    const onFocusOut = () => {
      window.setTimeout(() => {
        if (!node.contains(document.activeElement)) {
          setActive(false);
        }
      }, 0);
    };

    node.addEventListener("focusin", onFocusIn);
    node.addEventListener("focusout", onFocusOut);

    return () => {
      node.removeEventListener("focusin", onFocusIn);
      node.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  useEffect(() => {
    if (minimized) return;

    setActive(true);

    const timer = window.setTimeout(() => {
      const input = containerRef.current?.querySelector("input") as HTMLInputElement | null;
      input?.focus();
    }, 50);

    return () => window.clearTimeout(timer);
  }, [focusRequestKey, minimized]);

  const appendLines = (input: string, extra: TerminalLine[]) => {
    setLines((prev) => [
      ...prev,
      { id: makeId(), kind: "input", content: input },
      ...extra,
    ]);
  };

  const callApiAndAppend = async (
    endpoint: "/api/ask" | "/api/chat",
    input: string
  ) => {
    const question = input.replace(/^(ask|chat)\s+/i, "").trim();

    if (!question) {
      appendLines(input, [
        {
          id: makeId(),
          kind: "hint",
          content:
            endpoint === "/api/ask"
              ? "try: ask what is rest assured"
              : "try: chat explain how your stack fits together",
        },
      ]);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        appendLines(input, [
          {
            id: makeId(),
            kind: "error",
            content:
              data?.error ||
              (endpoint === "/api/ask"
                ? "failed to answer question from site content"
                : "failed to generate assistant response"),
          },
        ]);
        return;
      }

      const outputLines: TerminalLine[] = [
        { id: makeId(), kind: "output", content: data.answer },
        ...((data.suggestions ?? []).map((item: string) => ({
          id: makeId(),
          kind: "hint" as const,
          content: item,
        })) as TerminalLine[]),
      ];

      appendLines(input, outputLines);
    } catch {
      appendLines(input, [
        {
          id: makeId(),
          kind: "error",
          content:
            endpoint === "/api/ask"
              ? "failed to answer question from site content"
              : "failed to generate assistant response",
        },
      ]);
    }
  };

  const executeCommand = async (input: string) => {
    if (!input.trim()) return;

    setHistory((prev) => [...prev, input]);

    const normalized = input.trim().toLowerCase();

    if (normalized.startsWith("ask ")) {
      await callApiAndAppend("/api/ask", input);
      return;
    }

    if (normalized.startsWith("chat ")) {
      await callApiAndAppend("/api/chat", input);
      return;
    }

    const result = runCommand(input, cwd);

    if (result.action?.type === "clear") {
      setLines([]);
      return;
    }

    const mappedLines: TerminalLine[] = (result.lines ?? []).map(
      (line: TerminalLineInput) =>
        line.kind === "neofetch"
          ? { id: makeId(), kind: "neofetch", data: line.data }
          : { id: makeId(), kind: line.kind, content: line.content }
    );

    setLines((prev) => [
      ...prev,
      { id: makeId(), kind: "input", content: input },
      ...mappedLines,
    ]);

    if (result.action?.type === "cwd") {
      setCwd(result.action.value);
    }

    if (result.action?.type === "theme") {
      setTheme(result.action.value);
    }

    if (result.action?.type === "overlay") {
      setOverlay({ mode: "matrix" });
    }

    if (result.action?.type === "navigate") {
      const delay = result.action.delayMs ?? 0;
      if (delay > 0) {
        await new Promise((resolve) => window.setTimeout(resolve, delay));
      }
      router.push(result.action.href);
    }
  };

  const runDemo = async () => {
    if (isDemoRunning || hasPlayedDemo) return;
    setIsDemoRunning(true);

    for (const cmd of DEMO_COMMANDS) {
      await new Promise((resolve) => window.setTimeout(resolve, 500));
      await executeCommand(cmd);
    }

    setLines((prev) => [
      ...prev,
      {
        id: makeId(),
        kind: "hint",
        content: "demo mode complete — press Enter to run the highlighted command",
      },
    ]);

    setPrefillCommand(DEMO_FINAL_INPUT);

    try {
      sessionStorage.setItem(DEMO_SESSION_KEY, "1");
    } catch { }

    setHasPlayedDemo(true);
    setIsDemoRunning(false);
  };

  const terminalMotion = useMemo(
    () =>
      reduceMotion
        ? {}
        : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.18, ease: "easeOut" },
        },
    [reduceMotion]
  );

  const handleMatrixClose = () => {
    setOverlay(null);
    setLines((prev) => [
      ...prev,
      { id: makeId(), kind: "hint", content: "exited the matrix." },
    ]);
  };

  return (
    <motion.div
      ref={containerRef}
      {...terminalMotion}
      className={cn(
        "relative w-full overflow-hidden rounded-[30px] border backdrop-blur-2xl transition-all duration-150",
        "bg-[rgba(var(--terminal-shell))]",
        active
          ? "border-cyan-400/35 shadow-[0_0_0_1px_rgba(34,211,238,0.16),0_18px_60px_rgba(15,23,42,0.14),0_0_40px_rgba(34,211,238,0.10)]"
          : "border-[rgba(var(--border))] shadow-[0_18px_60px_rgba(15,23,42,0.12)]",
        expanded ? "min-h-168" : "min-h-0"
      )}
    >
      {overlay?.mode === "matrix" ? (
        <MatrixOverlay onCloseAction={handleMatrixClose} />
      ) : null}

      <div className="border-b border-[rgba(var(--border))] bg-black/[0.035] px-4 py-3 dark:bg-[rgba(var(--terminal-titlebar))]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrafficButton
              color="#ff5f57"
              symbol="×"
              onClick={onCloseAction}
              label="Close terminal"
            />
            <TrafficButton
              color="#febc2e"
              symbol="−"
              onClick={onMinimizeAction}
              label="Minimize terminal"
            />
            <TrafficButton
              color="#28c840"
              symbol={expanded ? "↙" : "↗"}
              onClick={expanded ? onRestoreAction : onExpandAction}
              label={expanded ? "Restore terminal" : "Expand terminal"}
            />
          </div>

          <div className="flex items-center gap-2">
            {!hasPlayedDemo ? (
              <button
                type="button"
                onClick={() => void runDemo()}
                className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300"
              >
                Demo mode
              </button>
            ) : null}

            <div
              className={cn(
                "terminal-title-chip rounded-full px-4 py-1 text-[11px] font-medium tracking-wide shadow-sm transition duration-150",
                active ? "shadow-[0_0_20px_rgba(34,211,238,0.12)]" : ""
              )}
            >
              alacritty — zsh — portfolio
            </div>
          </div>
        </div>
      </div>

      <div className={minimized ? "hidden" : "block"}>
        <div className="p-5 sm:p-6">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.26em] text-foreground/45">
              terminal
            </p>
            <h2 className="mt-2 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
              Navigate the site like a real workspace.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-foreground/65">
              Type <span className="font-mono text-prompt">help</span> to
              view commands, move through directories, and open content.
            </p>
          </div>

          <div
            className={cn(
              "rounded-[28px] border bg-[rgb(var(--terminal-screen))] p-5 shadow-inner transition duration-150",
              active
                ? "border-cyan-400/25 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.06)]"
                : "border-[rgba(var(--border))]"
            )}
          >
            <div
              ref={scrollRef}
              className={cn(
                expanded ? "h-[34rem]" : "h-[22rem]",
                "overflow-y-auto pr-1"
              )}
            >
              <TerminalOutput lines={lines} prompt={prompt} />
              <div className="mt-2">
                <TerminalInput
                  prompt={prompt}
                  onRunCommandAction={executeCommand}
                  history={history}
                  prefillValue={prefillCommand}
                  onPrefillConsumedAction={() => setPrefillCommand("")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ClosedTerminalCard({
  onOpenAction,
}: {
  onOpenAction: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName?.toLowerCase();
      const isTypingTarget =
        tag === "input" ||
        tag === "textarea" ||
        (event.target as HTMLElement | null)?.isContentEditable;

      if (isTypingTarget) return;

      if (event.key.toLowerCase() === "t") {
        event.preventDefault();
        onOpenAction();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpenAction]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.16 }}
      className="rounded-[28px] border border-[rgba(var(--border))] bg-white/40 p-6 backdrop-blur-2xl dark:bg-white/5"
    >
      <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
        terminal
      </p>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight">
        Terminal window is closed
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/68">
        Open it again to navigate the portfolio with commands, explore content,
        and switch themes. You can also press <span className="font-mono">T</span>{" "}
        anytime to bring it back.
      </p>

      <button
        type="button"
        onClick={onOpenAction}
        className="mt-5 rounded-2xl border border-[rgba(var(--border))] bg-white/70 px-4 py-2 text-sm font-medium text-foreground transition duration-150 hover:-translate-y-0.5 hover:bg-white dark:bg-white/10 dark:hover:bg-white/15"
      >
        Open terminal or press T
      </button>
    </motion.div>
  );
}
