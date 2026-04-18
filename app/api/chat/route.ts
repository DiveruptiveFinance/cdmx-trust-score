import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

let CACHED_CONTEXT: string | null = null;

async function buildContext(): Promise<string> {
  if (CACHED_CONTEXT) return CACHED_CONTEXT;
  const dataDir = path.join(process.cwd(), "public", "data");
  const [scores, ejec, hall] = await Promise.all([
    fs.readFile(path.join(dataDir, "scores.csv"), "utf-8"),
    fs.readFile(path.join(dataDir, "ejecucion.csv"), "utf-8"),
    fs.readFile(path.join(dataDir, "hallazgos.csv"), "utf-8"),
  ]);
  CACHED_CONTEXT = `SCORES (promedio sexenio 2018-2024, /100):
${scores.trim()}

EJECUCION ANUAL (millones de pesos):
${ejec.trim()}

HALLAZGOS (narrativas oficiales):
${hall.trim()}`;
  return CACHED_CONTEXT;
}

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

    const context = await buildContext();

    const systemPrompt = `Eres "El Cuentas", un agente ciudadano del Trust Score CDMX. Respondes preguntas sobre las 16 alcaldías usando EXCLUSIVAMENTE los datos adjuntos abajo (Cuenta Pública CDMX 2018-2024).

REGLAS DE FORMATO (ESTRICTAS):
- Responde en TEXTO PLANO. Nunca uses Markdown.
- Prohibido: asteriscos dobles para negritas, guiones o asteriscos como viñetas, corchetes con URLs, almohadillas para títulos, comillas invertidas.
- Si quieres enfatizar, usa MAYÚSCULAS moderadas o simplemente cambia el orden de la frase.
- Si necesitas listar, usa frases separadas con punto y aparte. No uses bullets.
- Sin emojis.
- Máximo 5 frases. Directo, sin relleno.

REGLAS DE CONTENIDO:
- Usa cifras del contexto. Nunca inventes.
- Si no hay dato, dilo: "No se publica ese dato" y sugiere ver la alcaldía en el mapa.
- Cuando menciones un score, aclara: 67-100 transparente, 34-66 a medias, 0-33 opaca.
- Metodología: 40% presupuesto + 30% ministraciones + 20% deuda + 10% patrimonio.

CONTEXTO DE DATOS:
${context}`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 500,
        system: systemPrompt,
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
    let answer =
      data.content?.find((b) => b.type === "text")?.text ??
      "Sin respuesta del modelo.";

    answer = stripMarkdown(answer);

    return NextResponse.json({ answer });
  } catch (err) {
    return NextResponse.json(
      { answer: `Error interno: ${(err as Error).message}` },
      { status: 200 }
    );
  }
}

function stripMarkdown(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/(^|\s)\*(\S.*?\S)\*(?=\s|$)/g, "$1$2")
    .replace(/(^|\s)_(\S.*?\S)_(?=\s|$)/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*#{1,6}\s+/gm, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
