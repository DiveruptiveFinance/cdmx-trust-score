"use client";

import { useEffect, useState } from "react";
import {
  loadEjecucion,
  loadHallazgos,
  loadScores,
  loadTitulares,
} from "../lib/loadData";
import type {
  AlcaldiaScore,
  Ejecucion,
  Hallazgo,
  Titular,
} from "../lib/types";

type Zone = "v" | "a" | "r";

function zoneFor(score: number | null): Zone | "n" {
  if (score === null) return "n";
  if (score >= 67) return "v";
  if (score >= 34) return "a";
  return "r";
}

const VERDICT_WORD: Record<Zone, string> = {
  v: "TRANSPARENTE",
  a: "A MEDIAS",
  r: "OPACA",
};

const VERDICT_COLOR: Record<Zone, { ring: string; text: string; soft: string }> = {
  v: { ring: "#286634", text: "#22562C", soft: "#DCEAE0" },
  a: { ring: "#F1B12B", text: "#846117", soft: "#FDF1D5" },
  r: { ring: "#C0000A", text: "#A30008", soft: "#FADADC" },
};

const SUB_META = [
  { key: "score_presupuesto", label: "Presupuesto" },
  { key: "score_plan", label: "Ministraciones" },
  { key: "score_deuda", label: "Deuda" },
  { key: "score_patrimonio", label: "Patrimonio" },
] as const;

export default function AlcaldiaPopup({
  alcaldia,
  onClose,
}: {
  alcaldia: string | null;
  onClose: () => void;
}) {
  const [row, setRow] = useState<AlcaldiaScore | null>(null);
  const [titular, setTitular] = useState<Titular | null>(null);
  const [hallazgos, setHallazgos] = useState<Hallazgo[]>([]);
  const [ejec, setEjec] = useState<Ejecucion[]>([]);
  const [animateScore, setAnimateScore] = useState(0);

  const open = alcaldia !== null;

  useEffect(() => {
    if (!alcaldia) return;
    let cancelled = false;
    (async () => {
      const [scores, titulares, hall, ejecs] = await Promise.all([
        loadScores(),
        loadTitulares(),
        loadHallazgos(),
        loadEjecucion(),
      ]);
      if (cancelled) return;
      const s = scores.find((r) => r.alcaldia === alcaldia) ?? null;
      setRow(s);
      setTitular(
        titulares.find(
          (t) => t.alcaldia === alcaldia && t.sexenio === s?.sexenio,
        ) ?? null,
      );
      setHallazgos(hall.filter((h) => h.alcaldia === alcaldia).slice(0, 3));
      setEjec(
        ejecs
          .filter((e) => e.alcaldia === alcaldia)
          .sort((a, b) => a.anio - b.anio),
      );
    })();
    return () => {
      cancelled = true;
    };
  }, [alcaldia]);

  useEffect(() => {
    if (!row?.score_total) {
      setAnimateScore(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimateScore(row.score_total);
      return;
    }
    const target = row.score_total;
    const duration = 1000;
    const t0 = performance.now();
    const tick = (t: number) => {
      const elapsed = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setAnimateScore(Math.round(target * eased));
      if (elapsed < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [row]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const zone = zoneFor(row?.score_total ?? null);
  const verdictColor = zone !== "n" ? VERDICT_COLOR[zone] : null;
  const circ = 502;
  const pct = (row?.score_total ?? 0) / 100;
  const offset = circ - circ * pct;

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[9998] backdrop-blur-[6px] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(26,26,26,0.15)" }}
      />
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto px-4 py-6 transition-opacity duration-300 sm:py-10 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Detalle de alcaldía"
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-[520px] overflow-hidden rounded-2xl border border-border bg-paper-elevated shadow-[0_30px_80px_rgba(0,0,0,0.25)] transition-transform duration-[320ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
            open ? "translate-y-0 scale-100" : "translate-y-4 scale-[0.98]"
          }`}
        >
          <header className="sticky top-0 z-[5] flex items-center justify-between bg-ink px-6 py-4 text-paper">
            <div className="flex items-center gap-3">
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-paper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icono.svg" alt="" className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-paper/70">
                  Detalle · El Cuentas
                </h4>
                <p className="text-[13px] text-paper/60">
                  {alcaldia ?? ""} · Trust Score
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar detalle"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-paper/10 text-xl text-paper transition hover:rotate-90 hover:bg-paper/20"
            >
              ×
            </button>
          </header>

          <div className="max-h-[calc(100vh-160px)] overflow-y-auto px-7 pb-10 pt-7">
            {!row ? (
              <SkeletonBlock />
            ) : (
              <>
                {verdictColor && (
                  <div className="pb-2 pt-3 text-center">
                    <div
                      className="mb-3 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full text-[28px]"
                      style={{
                        background: verdictColor.soft,
                        color: verdictColor.text,
                      }}
                    >
                      {zone === "v" ? "✓" : zone === "a" ? "!" : "×"}
                    </div>
                    <div
                      className="font-display text-[44px] font-extrabold leading-none tracking-[-0.02em]"
                      style={{ color: verdictColor.text }}
                    >
                      {VERDICT_WORD[zone as Zone]}
                    </div>
                  </div>
                )}

                <div className="mb-4 flex flex-col items-center justify-center">
                  <div className="relative flex h-[180px] w-[180px] items-center justify-center">
                    <svg
                      viewBox="0 0 180 180"
                      className="absolute inset-0 -rotate-90"
                    >
                      <circle
                        cx="90"
                        cy="90"
                        r="80"
                        fill="none"
                        stroke="#E8E0CC"
                        strokeWidth="10"
                      />
                      <circle
                        cx="90"
                        cy="90"
                        r="80"
                        fill="none"
                        stroke={verdictColor?.ring ?? "#E8E0CC"}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                        style={{
                          transition:
                            "stroke-dashoffset 1.2s cubic-bezier(0.2,0.8,0.2,1), stroke 0.4s",
                        }}
                      />
                    </svg>
                    <div className="relative z-[1] flex flex-col items-center">
                      <div className="font-display tabular-nums text-[62px] font-extrabold leading-none tracking-[-0.03em] text-ink">
                        {animateScore}
                      </div>
                      <div className="mt-0.5 text-xs text-ink-muted">/ 100</div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <div className="font-display text-[22px] font-bold">
                      Alcaldía {alcaldia}
                    </div>
                    <div className="mt-0.5 text-xs text-ink-muted">
                      {titular
                        ? `${titular.titular} (${titular.partido}) · Sexenio ${row.sexenio}`
                        : `Sexenio ${row.sexenio}`}
                    </div>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-paper px-3.5 py-2 text-xs font-medium text-ink-muted">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#286634"
                      strokeWidth="2.5"
                      className="h-3.5 w-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Verificado por{" "}
                    <strong className="font-semibold text-ink">
                      datos.cdmx.gob.mx
                    </strong>
                  </div>
                </div>

                <PopupSection title="4 sub-scores">
                  <div className="grid grid-cols-4 gap-2.5">
                    {SUB_META.map((m) => {
                      const v = row[m.key] as number | null;
                      const z = zoneFor(v);
                      const color =
                        z === "n" ? null : VERDICT_COLOR[z as Zone].ring;
                      const subPct = v ? v / 100 : 0;
                      const subCirc = 201;
                      const subOff = subCirc - subCirc * subPct;
                      return (
                        <div
                          key={m.key}
                          className="flex flex-col items-center text-center"
                        >
                          <div className="relative mb-2 h-[72px] w-[72px]">
                            <svg
                              viewBox="0 0 72 72"
                              className="h-full w-full -rotate-90"
                            >
                              <circle
                                cx="36"
                                cy="36"
                                r="32"
                                fill="none"
                                stroke="#E8E0CC"
                                strokeWidth="6"
                              />
                              {color && (
                                <circle
                                  cx="36"
                                  cy="36"
                                  r="32"
                                  fill="none"
                                  stroke={color}
                                  strokeWidth="6"
                                  strokeLinecap="round"
                                  strokeDasharray={subCirc}
                                  strokeDashoffset={subOff}
                                  style={{
                                    transition:
                                      "stroke-dashoffset 1s cubic-bezier(0.2,0.8,0.2,1)",
                                  }}
                                />
                              )}
                            </svg>
                            <div className="font-display absolute inset-0 flex items-center justify-center text-[17px] font-bold text-ink">
                              {v ?? "—"}
                            </div>
                          </div>
                          <div className="text-[10px] font-semibold uppercase leading-tight tracking-[0.06em] text-ink-muted">
                            {m.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </PopupSection>

                {ejec.length >= 2 && (
                  <PopupSection title="Presupuesto año con año (M MXN)">
                    <Sparkline data={ejec} zone={zone as Zone} />
                  </PopupSection>
                )}

                <PopupSection title="Lo que encontramos">
                  <div className="flex flex-col gap-2.5">
                    {hallazgos.length === 0 && (
                      <p className="text-sm text-ink-muted">
                        Aún no hay hallazgos publicados para esta alcaldía.
                      </p>
                    )}
                    {hallazgos.map((h, i) => {
                      const tone: Zone = h.tipo === "logro" ? "v" : "a";
                      const c = VERDICT_COLOR[tone];
                      return (
                        <div
                          key={i}
                          className="flex gap-3 rounded-xl border p-3 text-sm"
                          style={{
                            background: c.soft,
                            borderColor: `${c.ring}40`,
                          }}
                        >
                          <span
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-bold text-white"
                            style={{ background: c.ring }}
                          >
                            {h.tipo === "logro" ? "✓" : "!"}
                          </span>
                          <span className="text-ink">
                            {h.hallazgo_narrativo}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </PopupSection>

                {row.data_faltante && (
                  <p className="mt-6 rounded-xl border border-accent/40 bg-accent-soft p-3 text-[11px] text-accent-text">
                    Score parcial. Algunos componentes (patrimonio, deuda por
                    alcaldía) aún no se publican con granularidad. Cuando
                    aparezcan en datos.cdmx.gob.mx el score se actualiza.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function PopupSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7 border-t border-border pt-6">
      <h5 className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-ink-muted">
        {title}
      </h5>
      {children}
    </section>
  );
}

function SkeletonBlock() {
  return (
    <div className="space-y-4 pt-8">
      <div className="mx-auto h-[180px] w-[180px] animate-pulse rounded-full bg-border/50" />
      <div className="mx-auto h-4 w-3/5 animate-pulse rounded bg-border/50" />
      <div className="mt-8 h-20 animate-pulse rounded-xl bg-border/30" />
    </div>
  );
}

function Sparkline({ data, zone }: { data: Ejecucion[]; zone: Zone | "n" }) {
  const values = data.map((d) => d.aprobado ?? d.ejercido ?? 0);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const w = 420;
  const h = 60;
  const stepX = w / (values.length - 1 || 1);
  const points = values.map((v, i) => {
    const x = i * stepX;
    const y = h - ((v - min) / range) * (h - 10) - 5;
    return [x, y] as [number, number];
  });
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(" ");
  const area =
    path + ` L${points[points.length - 1][0].toFixed(1)},${h} L0,${h} Z`;
  const color = zone === "n" ? "#4A4A4A" : VERDICT_COLOR[zone as Zone].ring;
  const first = values[0] || 1;
  const last = values[values.length - 1] || 0;
  const delta = values.length >= 2 ? Math.round(((last - first) / first) * 100) : 0;
  const deltaClass =
    delta > 0
      ? "text-success-text"
      : delta < 0
        ? "text-danger-text"
        : "text-ink-muted";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[12px]">
        <strong className="font-semibold text-ink">Presupuesto sexenio</strong>
        <span className={`font-semibold ${deltaClass}`}>
          {delta > 0 ? "+" : ""}
          {delta}% vs {data[0].anio}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="h-[60px] w-full"
      >
        <path d={area} fill={color} opacity="0.15" />
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill={color} />
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-[10px] font-semibold text-ink-muted">
        {data.map((d) => (
          <span key={d.anio}>{d.anio}</span>
        ))}
      </div>
    </div>
  );
}
