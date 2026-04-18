"use client";

import { useEffect, useState } from "react";
import { loadHallazgos } from "../lib/loadData";
import type { Hallazgo } from "../lib/types";

export default function Ticker() {
  const [items, setItems] = useState<Hallazgo[]>([]);

  useEffect(() => {
    (async () => {
      const h = await loadHallazgos();
      setItems(h.slice(0, 12));
    })();
  }, []);

  if (items.length === 0) return null;
  const loop = [...items, ...items];

  return (
    <section className="overflow-hidden bg-ink py-3.5 text-paper">
      <div
        className="flex min-w-max items-center gap-10 whitespace-nowrap px-6 animate-[ticker_80s_linear_infinite] motion-reduce:animate-none"
        aria-label="Hallazgos recientes"
      >
        {loop.map((h, i) => {
          const good = h.tipo === "logro";
          const short =
            h.hallazgo_narrativo.length > 120
              ? h.hallazgo_narrativo.slice(0, 117) + "…"
              : h.hallazgo_narrativo;
          return (
            <span key={i} className="inline-flex items-center gap-3 text-[13px]">
              <span
                className={`rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                  good ? "bg-success/25 text-[#7AE09A]" : "bg-accent/25 text-accent"
                }`}
              >
                {good ? "Logro" : "Revisar"}
              </span>
              <span className="text-paper/90">
                <strong className="font-semibold text-paper">
                  {h.alcaldia}:
                </strong>{" "}
                {short}
              </span>
              <span className="text-paper/20">·</span>
            </span>
          );
        })}
      </div>
    </section>
  );
}
