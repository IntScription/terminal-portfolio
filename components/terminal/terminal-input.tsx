"use client";

import { useEffect, useRef, useState } from "react";

export function TerminalInput({
  prompt,
  history,
  onRunCommandAction,
  prefillValue,
  onPrefillConsumedAction,
}: {
  prompt: string;
  history: string[];
  onRunCommandAction: (input: string) => void | Promise<void>;
  prefillValue?: string;
  onPrefillConsumedAction?: () => void;
}) {
  const [value, setValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [cursorVisible, setCursorVisible] = useState(true);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const mirrorRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 650);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!prefillValue) return;
    setValue(prefillValue);
    setHistoryIndex(null);
    onPrefillConsumedAction?.();
  }, [prefillValue, onPrefillConsumedAction]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    await onRunCommandAction(trimmed);
    setValue("");
    setHistoryIndex(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;

      const nextIndex =
        historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setValue(history[nextIndex] ?? "");
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!history.length) return;

      if (historyIndex === null) return;

      const nextIndex = historyIndex + 1;

      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setValue("");
        return;
      }

      setHistoryIndex(nextIndex);
      setValue(history[nextIndex] ?? "");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <span className="shrink-0 font-mono text-sm text-prompt">{prompt}</span>

      <div className="relative flex w-full items-center font-mono text-sm text-foreground">
        <span
          ref={mirrorRef}
          className="invisible whitespace-pre font-mono text-sm"
          aria-hidden="true"
        >
          {value || ""}
        </span>

        <input
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 w-full bg-transparent outline-none placeholder:text-foreground/30 caret-transparent"
          placeholder="type a command"
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />

        <span
          className={`pointer-events-none ml-[1px] inline-block h-5 w-3 bg-cyan-400/75 align-middle ${cursorVisible ? "opacity-100" : "opacity-0"
            }`}
        />
      </div>
    </form>
  );
}
