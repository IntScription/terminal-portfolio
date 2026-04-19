import type { SiteContextChunk } from "@/lib/ai/router";

export function buildSiteAssistantPrompt(
  question: string,
  context: SiteContextChunk[]
) {
  const contextBlock = context
    .map(
      (item) =>
        `SOURCE: ${item.source}\nTITLE: ${item.title}\nCONTENT:\n${item.text}`
    )
    .join("\n\n---\n\n");

  return [
    "You are the assistant for Kartik's portfolio website.",
    "Answer helpfully and clearly.",
    "Prefer answers grounded in the provided site content.",
    "If the question goes beyond the site content, say so clearly and then answer more generally if appropriate.",
    "Do not invent project details that are not supported by the provided context.",
    "",
    `USER QUESTION:\n${question}`,
    "",
    `SITE CONTEXT:\n${contextBlock}`,
  ].join("\n");
}
