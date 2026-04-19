"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BackLink } from "@/components/ui/back-link";

type AssistantMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ProviderMeta = {
  provider?: string;
  model?: string;
};

const STARTER_PROMPTS = [
  "How does your stack fit together?",
  "What kind of developer are you based on this site?",
  "Explain Rest Assured in simple terms.",
  "What tools do you use most and why?",
];

const ASK_EXAMPLES = [
  "Explain projects in simpler terms",
  "Compare tools and frameworks used on the site",
  "Summarize the workflow behind the portfolio",
  "Ask broader technical questions tied to the work",
];

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[28px] border border-[rgba(var(--border))] bg-white/70 shadow-[0_18px_40px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:bg-white/8 ${className}`}
    >
      {children}
    </div>
  );
}

function AtomOrbital() {
  return (
    <div className="relative hidden h-72 w-72 lg:block" style={{ perspective: "1200px" }}>
      <motion.div
        className="absolute inset-0 rounded-full bg-cyan-400/10 blur-3xl"
        animate={{ scale: [1, 1.06, 1], opacity: [0.45, 0.82, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/25"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotate: 360, rotateX: 20, rotateY: 10 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-52 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/25"
        style={{ transformStyle: "preserve-3d", rotateX: "72deg" }}
        animate={{ rotate: -360, rotateZ: 18 }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-28 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/25"
        style={{ transformStyle: "preserve-3d", rotateY: "72deg" }}
        animate={{ rotate: 360, rotateX: -16 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.58)]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.78, 1, 0.78] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-3.5 w-3.5 rounded-full bg-violet-300 shadow-[0_0_20px_rgba(167,139,250,0.5)]"
        animate={{
          x: [0, 72, 0, -72, 0],
          y: [-84, 0, 84, 0, -84],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 8.4, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-3.5 w-3.5 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.5)]"
        animate={{
          x: [0, -82, 0, 82, 0],
          y: [66, 0, -66, 0, 66],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 10.2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function prettyProvider(provider?: string) {
  if (!provider) return "unknown";
  if (provider === "lmstudio") return "LM Studio";
  if (provider === "ollama") return "Ollama";
  if (provider === "openai") return "OpenAI";
  return provider;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: makeId(),
      role: "assistant",
      content:
        "Hey — I’m Atom. Ask about projects, writing, stack decisions, workflow, or broader technical questions connected to this portfolio.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [providerMeta, setProviderMeta] = useState<ProviderMeta>({});

  const listRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading]
  );

  const scrollToBottom = () => {
    window.setTimeout(() => {
      if (!listRef.current) return;
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }, 0);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, isLoading]);

  const sendMessage = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;

    const userMessage: AssistantMessage = {
      id: makeId(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ question: trimmed }),
      });

      const data = await response.json().catch(() => null);

      if (data?.provider || data?.model) {
        setProviderMeta({
          provider: data.provider,
          model: data.model,
        });
      }

      const assistantMessage: AssistantMessage = {
        id: makeId(),
        role: "assistant",
        content:
          response.ok && data?.ok
            ? data.answer
            : data?.error || "Something went wrong while generating the response.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "assistant",
          content: "Network error while generating the response.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await sendMessage(input);
  };

  return (
    <main className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <BackLink href="/" label="Back to home" />

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
              atom
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Ask deeper questions about the work, stack, and ideas behind the site.
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-8 text-foreground/72">
              Atom uses the site’s own content first, then helps with broader
              explanations and deeper reasoning when needed.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                site-aware
              </span>
              <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
                deeper reasoning
              </span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                local or cloud
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08, duration: 0.35, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <AtomOrbital />
          </motion.div>
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.35, ease: "easeOut" }}
            className="space-y-6"
          >
            <Panel className="p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
                prompts and question types
              </p>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div className="space-y-3">
                  {ASK_EXAMPLES.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + index * 0.04, duration: 0.22 }}
                      className="rounded-2xl border border-[rgba(var(--border))] bg-white/60 px-4 py-4 text-sm leading-7 text-foreground/76 dark:bg-white/8"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  {STARTER_PROMPTS.map((prompt, index) => (
                    <motion.button
                      key={prompt}
                      type="button"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.04, duration: 0.22 }}
                      onClick={() => void sendMessage(prompt)}
                      className="w-full rounded-2xl border border-[rgba(var(--border))] bg-white/60 px-4 py-4 text-left text-sm leading-7 text-foreground/76 transition hover:bg-white/80 dark:bg-white/8 dark:hover:bg-white/12"
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              </div>
            </Panel>

            <Panel className="p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
                terminal shortcut
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/74">
                For faster site questions, you can still use the terminal with{" "}
                <span className="font-mono text-accent">ask &lt;question&gt;</span>{" "}
                or{" "}
                <span className="font-mono text-accent">chat &lt;question&gt;</span>.
              </p>

              <div className="mt-4">
                <Link
                  href="/"
                  className="inline-flex rounded-2xl border border-[rgba(var(--border))] bg-white/70 px-4 py-2 text-sm transition hover:bg-white dark:bg-white/10 dark:hover:bg-white/15"
                >
                  Back to terminal
                </Link>
              </div>
            </Panel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.35, ease: "easeOut" }}
          >
            <Panel className="flex min-h-[36rem] flex-col overflow-hidden p-0 sm:min-h-[42rem]">
              <div className="border-b border-[rgba(var(--border))] px-5 py-5 sm:px-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-foreground/45">
                      chat
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      Atom conversation
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-[rgba(var(--border))] bg-white/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-foreground/55 dark:bg-white/8">
                      provider: {prettyProvider(providerMeta.provider)}
                    </span>
                    {providerMeta.model ? (
                      <span className="rounded-full border border-[rgba(var(--border))] bg-white/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-foreground/55 dark:bg-white/8">
                        model: {providerMeta.model}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              <div
                ref={listRef}
                className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6"
              >
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={
                        message.role === "user"
                          ? "ml-auto max-w-[94%] rounded-[24px] border border-cyan-400/20 bg-cyan-400/10 px-4 py-4 text-sm leading-7 text-foreground shadow-[0_12px_24px_rgba(34,211,238,0.05)] sm:max-w-[85%] sm:px-5"
                          : "max-w-[96%] rounded-[24px] border border-[rgba(var(--border))] bg-white/70 px-4 py-4 text-sm leading-7 text-foreground/82 shadow-[0_12px_24px_rgba(15,23,42,0.04)] dark:bg-white/8 sm:max-w-[92%] sm:px-5"
                      }
                    >
                      <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-foreground/42">
                        {message.role === "user" ? "you" : "atom"}
                      </p>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-[96%] rounded-[24px] border border-[rgba(var(--border))] bg-white/70 px-4 py-4 text-sm text-foreground/72 dark:bg-white/8 sm:max-w-[92%] sm:px-5"
                  >
                    <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-foreground/42">
                      atom
                    </p>
                    thinking...
                  </motion.div>
                ) : null}
              </div>

              <div className="border-t border-[rgba(var(--border))] px-4 py-4 sm:px-6 sm:py-5">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask about the projects, stack, workflow, or anything deeper connected to the site..."
                    rows={4}
                    className="w-full resize-none rounded-[22px] border border-[rgba(var(--border))] bg-white/70 px-4 py-4 text-sm leading-7 text-foreground outline-none transition focus:border-cyan-400/30 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)] dark:bg-white/8"
                  />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-foreground/48">
                      Ask about the site first, then go broader if needed.
                    </p>

                    <button
                      type="submit"
                      disabled={!canSend}
                      className="rounded-2xl border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-700 transition duration-200 hover:bg-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-50 dark:text-cyan-300"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </Panel>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
