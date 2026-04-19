"use client";

import { useState } from "react";

const faqs = [
  {
    q: "¿Cuál es la alcaldía más transparente?",
    a: "La que más se acerca a ejercer lo que aprobó cada año, sin desviaciones sin explicación. El ranking en vivo arriba te lo dice con el número exacto.",
  },
  {
    q: "¿En qué gasta más mi alcaldía?",
    a: "Depende de cuál. Haz click en tu alcaldía en el mapa y te doy el desglose por rubro. Spoiler: el rubro más grande casi siempre es \u201cservicios generales\u201d — suena a nada y lo aclara todo.",
  },
  {
    q: "¿Cómo se calcula el score?",
    a: "Comparo lo ejercido contra lo aprobado en la Cuenta Pública CDMX 2018–2024. Entre más se parecen, más sube el score. Ver la página Metodología para la fórmula completa.",
  },
  {
    q: "¿Esto acusa o sólo describe?",
    a: "Describe. El Cuentas no acusa, no opina, no mete política. Detecta opacidad, no corrupción — son primas, no gemelas. Lee el dato oficial y te lo explica en castellano.",
  },
  {
    q: "¿Puedo confiar en los datos?",
    a: "Sí. Todo viene de datos.cdmx.gob.mx y la Cuenta Pública oficial. Los links a las fuentes están en el detalle de cada alcaldía. Si un dato cambia en la fuente, aquí también cambia.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-border bg-paper-elevated py-20">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-text">
          Preguntas frecuentes
        </p>
        <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Lo que todo mundo le pregunta.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          Si tu duda no está aquí, pregúntasela directo a El Cuentas en el chat
          de abajo.
        </p>

        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-paper">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-primary-soft/40"
                >
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 text-[11px] font-bold uppercase tracking-widest text-primary-text">
                      P.
                    </span>
                    <span className="font-display text-base font-semibold sm:text-lg">
                      {f.q}
                    </span>
                  </span>
                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border-strong text-base font-bold transition ${
                      isOpen ? "rotate-45 bg-ink text-paper" : "text-ink"
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 pl-[52px] text-[15px] leading-relaxed text-ink-muted">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
