"use client";

import { useEffect, useState } from "react";
import { loadEjecucion } from "../lib/loadData";

function useCountUp(target: number | null, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (target == null) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVal(target);
      return;
    }
    const t0 = performance.now();
    const tick = (t: number) => {
      const e = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - e, 3);
      setVal(Math.round(target * eased));
      if (e < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return val;
}

export default function HeroStats() {
  const [ejercido2024, setEjercido2024] = useState<number | null>(null);
  const [totalAnios, setTotalAnios] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const ej = await loadEjecucion();
      const y2024 = ej.filter((e) => e.anio === 2024 && e.ejercido != null);
      const sum2024 = y2024.reduce((a, b) => a + (b.ejercido ?? 0), 0);
      const sumAll = ej.reduce((a, b) => a + (b.ejercido ?? b.aprobado ?? 0), 0);
      setEjercido2024(sum2024);
      setTotalAnios(sumAll);
      setLoaded(true);
    })();
  }, []);

  const animated = useCountUp(ejercido2024);

  const fmt = (n: number) =>
    n.toLocaleString("es-MX", { maximumFractionDigits: 0 });

  return (
    <h1 className="font-display max-w-4xl text-[clamp(40px,6vw,72px)] font-extrabold leading-[1.04] tracking-[-0.025em]">
      En 2024, las 16 alcaldías ejercieron{" "}
      <span className="relative inline-block italic text-primary">
        ${loaded ? fmt(animated) : "…"}
        <span className="ml-1 text-[0.6em] font-bold not-italic">M</span>
        <span className="absolute bottom-[0.15em] left-0 right-0 -z-10 h-[0.25em] bg-accent/55" />
      </span>
      .
      <br />
      <span className="text-ink">¿En qué se fueron?</span>
      {totalAnios != null && (
        <span className="sr-only">
          Acumulado sexenio 2018–2024: ${fmt(totalAnios)} millones.
        </span>
      )}
    </h1>
  );
}
