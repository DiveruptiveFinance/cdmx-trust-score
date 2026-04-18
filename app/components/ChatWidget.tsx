"use client";

import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const CHIPS = [
  "¿Cuál alcaldía cumplió más?",
  "¿En qué gasta mi alcaldía?",
  "¿Cuánto debe mi alcaldía?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Qué onda, soy El Cuentas. Yo me leí los presupuestos para que tú no tengas que. Pregúntame lo que quieras de tu alcaldía.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer ?? "Sin respuesta." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "No pude responder eso ahorita. Intenta reformular tu pregunta o pregúntame otra cosa.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showChips = messages.length === 1 && !loading;

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[900] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:bg-primary-light focus-visible:ring-[3px] focus-visible:ring-primary/35"
        aria-label={open ? "Cerrar chat" : "Abrir chat con El Cuentas"}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-[900] flex h-[560px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-paper-elevated shadow-2xl">
          <div className="border-b border-border bg-ink px-4 py-3 text-ink-inverse">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-primary-light" />
              <span className="text-sm font-semibold">El Cuentas</span>
            </div>
            <div className="mt-0.5 text-[11px] text-ink-inverse/70">
              El único chilango que leyó los 400 PDFs.
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-paper px-4 py-4 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 leading-snug ${
                    m.role === "user"
                      ? "bg-primary text-white"
                      : "bg-paper-elevated text-ink ring-1 ring-border"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-paper-elevated px-3.5 py-2.5 text-ink-muted ring-1 ring-border">
                  Déjame revisar los datos oficiales…
                </div>
              </div>
            )}
            {showChips && (
              <div className="flex flex-wrap gap-2 pt-1">
                {CHIPS.map((c) => (
                  <button
                    key={c}
                    onClick={() => send(c)}
                    className="rounded-full border border-border bg-paper-elevated px-3 py-1 text-xs text-ink-muted transition hover:border-primary hover:text-primary-text"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-border bg-paper-elevated p-2">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Pregúntale al Cuentas… ¿en qué gastó mi alcaldía?"
                className="flex-1 rounded-full border border-border bg-paper px-4 py-2 text-sm text-ink placeholder:text-ink-muted/70 focus:border-primary focus:outline-none"
              />
              <button
                onClick={() => send()}
                disabled={loading}
                className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ink-inverse transition hover:bg-primary disabled:opacity-50"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ChatIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
