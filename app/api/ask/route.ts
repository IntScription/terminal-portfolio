import { NextRequest, NextResponse } from "next/server";
import { answerWebsiteQuestion } from "@/lib/site-knowledge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = String(body?.question ?? "").trim();

    if (!question) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing question",
        },
        { status: 400 }
      );
    }

    const result = answerWebsiteQuestion(question);

    return NextResponse.json({
      ok: true,
      ...result,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to process ask request",
      },
      { status: 500 }
    );
  }
}
