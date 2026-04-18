import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { question } = (await req.json()) as { question?: string };
    if (!question || !question.trim()) {
      return NextResponse.json({ answer: "Escribe una pregunta." });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";

    if (!apiKey) {
      return NextResponse.json({
        answer:
          "El agente todavía no está configurado. Mientras tanto, haz clic en una alcaldía del mapa para ver su Trust Score.",
      });
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 600,
        system:
          "Eres un agente ciudadano del proyecto Trust Score CDMX. Explicas de forma clara y breve (máx 4 frases) qué tan transparente y confiable es una alcaldía de la Ciudad de México. Si no tienes datos exactos, dilo y sugiere al usuario abrir la alcaldía en el mapa. Nunca inventas cifras.",
        messages: [{ role: "user", content: question }],
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json(
        { answer: `Error del modelo (${res.status}). ${txt.slice(0, 200)}` },
        { status: 200 }
      );
    }

    const data = (await res.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const answer =
      data.content?.find((b) => b.type === "text")?.text ??
      "Sin respuesta del modelo.";
    return NextResponse.json({ answer });
  } catch (err) {
    return NextResponse.json(
      { answer: `Error interno: ${(err as Error).message}` },
      { status: 200 }
    );
  }
}
