import { NextRequest, NextResponse } from "next/server";
import { getRelevantSiteContext } from "@/lib/ai/router";
import { buildSiteAssistantPrompt } from "@/lib/ai/prompts";

type Provider = "openai" | "ollama" | "lmstudio" | "openrouter";

function getProvider(): Provider {
  const value = (process.env.AI_PROVIDER || "openrouter")
    .toLowerCase()
    .trim();

  if (value === "ollama") return "ollama";
  if (value === "lmstudio") return "lmstudio";
  if (value === "openai") return "openai";
  return "openrouter";
}

function normalizeBaseUrl(url: string) {
  return url.replace(/\/+$/, "");
}

function getConfig(providerOverride?: Provider) {
  const provider = providerOverride || getProvider();

  if (provider === "openrouter") {
    return {
      provider,
      url: "https://openrouter.ai/api/v1/chat/completions",
      model: process.env.OPENROUTER_MODEL || "deepseek/deepseek-chat",
      apiKey: process.env.OPENROUTER_API_KEY || "",
      headers: {
        "HTTP-Referer": "https://your-portfolio.vercel.app",
        "X-Title": "Atom Assistant",
      },
    };
  }

  if (provider === "openai") {
    return {
      provider,
      url: "https://api.openai.com/v1/chat/completions",
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      apiKey: process.env.OPENAI_API_KEY || "",
      headers: {},
    };
  }

  if (provider === "ollama") {
    const base = normalizeBaseUrl(
      process.env.LOCAL_LLM_BASE_URL || "http://localhost:11434/v1"
    );

    return {
      provider,
      url: `${base}/chat/completions`,
      model: process.env.LOCAL_LLM_MODEL || "llama3.2",
      apiKey: process.env.LOCAL_LLM_API_KEY || "ollama",
      headers: {},
    };
  }

  const base = normalizeBaseUrl(
    process.env.LOCAL_LLM_BASE_URL || "http://localhost:1234/v1"
  );

  return {
    provider,
    url: `${base}/chat/completions`,
    model: process.env.LOCAL_LLM_MODEL || "qwen2.5-7b-instruct",
    apiKey: process.env.LOCAL_LLM_API_KEY || "lm-studio",
    headers: {},
  };
}

async function callProvider(config: any, question: string, systemPrompt: string) {
  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
      ...config.headers,
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.4,
      max_tokens: 700,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
      data?.error ||
      `Provider error (${response.status})`
    );
  }

  return data?.choices?.[0]?.message?.content?.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = String(body?.question ?? "").trim();

    if (!question) {
      return NextResponse.json(
        { ok: false, error: "Missing question" },
        { status: 400 }
      );
    }

    const context = getRelevantSiteContext(question, 5);
    const systemPrompt = buildSiteAssistantPrompt(question, context);

    let answer = "";
    let usedProvider: Provider = "openrouter";

    try {
      const config = getConfig("openrouter");
      answer = await callProvider(config, question, systemPrompt);
      usedProvider = "openrouter";
    } catch (err) {
      console.warn("OpenRouter failed, falling back to OpenAI");

      try {
        const fallback = getConfig("openai");
        answer = await callProvider(fallback, question, systemPrompt);
        usedProvider = "openai";
      } catch (fallbackErr) {
        return NextResponse.json(
          {
            ok: false,
            error: "All providers failed. Try again later.",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      ok: true,
      answer: answer || "No response generated.",
      provider: usedProvider,
      context: context.map((c) => ({
        source: c.source,
        title: c.title,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to generate chat response",
      },
      { status: 500 }
    );
  }
}
