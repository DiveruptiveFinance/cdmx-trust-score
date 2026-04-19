"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadScores } from "../lib/loadData";
import { scoreColor, scoreLabel, slugify } from "../lib/types";
import type { AlcaldiaScore } from "../lib/types";

export default function Dashboard() {
  const [rows, setRows] = useState<AlcaldiaScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScores()
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => (b.score_total ?? -1) - (a.score_total ?? -1)
        );
        setRows(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-paper-elevated p-8 text-center text-sm text-ink-muted">
        Sumando los datos oficiales…
      </div>
    );
  }

  const withScore = rows.filter((r) => r.score_total !== null);
  const top3 = withScore.slice(0, 3);
  const bottom3 = [...withScore].slice(-3).reverse();
  const promedio =
    withScore.length > 0
      ? Math.round(
          withScore.reduce((s, r) => s + (r.score_total ?? 0), 0) /
            withScore.length
        )
      : null;
  const sinDatos = rows.filter((r) => r.score_total === null || r.data_faltante).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Promedio CDMX"
          value={promedio !== null ? `${promedio}` : "—"}
          unit="/ 100"
          tone="primary"
        />
        <StatCard
          label="Mejor puntuada"
          value={top3[0]?.alcaldia ?? "—"}
          unit={top3[0] ? `${top3[0].score_total}/100` : ""}
          tone="success"
        />
        <StatCard
          label="Peor puntuada"
          value={bottom3[0]?.alcaldia ?? "—"}
          unit={bottom3[0] ? `${bottom3[0].score_total}/100` : ""}
          tone="danger"
        />
        <StatCard
          label="Con datos incompletos"
          value={`${sinDatos}`}
          unit="alcaldías"
          tone="warning"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Podio top3={top3} />
        <BottomList rows={bottom3} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-paper-elevated">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h3 className="text-base font-semibold text-ink">
              Ranking completo
            </h3>
            <p className="text-xs text-ink-muted">
              Las 16 alcaldías del sexenio 2024-2030
            </p>
          </div>
          <span className="text-xs text-ink-muted">
            Toca una para ver el detalle
          </span>
        </div>
        <ol className="divide-y divide-border">
          {rows.map((r, i) => (
            <li key={r.alcaldia}>
              <Link
                href={`/alcaldia/${slugify(r.alcaldia)}`}
                className="flex items-center gap-4 px-5 py-3 transition hover:bg-primary-soft/40"
              >
                <span className="w-6 text-right text-sm tabular-nums text-ink-muted">
                  {i + 1}
                </span>
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: scoreColor(r.score_total) }}
                />
                <span className="flex-1 text-sm font-medium text-ink">
                  {r.alcaldia}
                </span>
                <span className="hidden text-xs text-ink-muted sm:inline">
                  {scoreLabel(r.score_total)}
                </span>
                <span className="w-14 text-right text-base tabular-nums font-semibold text-ink">
                  {r.score_total ?? "—"}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
  tone,
}: {
  label: string;
  value: string;
  unit?: string;
  tone: "primary" | "success" | "warning" | "danger";
}) {
  const toneClass =
    tone === "primary"
      ? "border-l-primary"
      : tone === "success"
        ? "border-l-success"
        : tone === "warning"
          ? "border-l-warning"
          : "border-l-danger";
  return (
    <div
      className={`rounded-2xl border border-border border-l-4 bg-paper-elevated p-4 ${toneClass}`}
    >
      <div className="text-[11px] uppercase tracking-widest text-ink-muted">
        {label}
      </div>
      <div className="mt-1 text-xl font-bold text-ink">{value}</div>
      {unit && <div className="text-xs text-ink-muted">{unit}</div>}
    </div>
  );
}

function Podio({ top3 }: { top3: AlcaldiaScore[] }) {
  const [first, second, third] = top3;
  return (
    <div className="rounded-2xl border border-success/30 bg-success-soft p-6">
      <h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.18em] text-success-text">
        Top 3 · Transparentes
      </h4>
      <div className="grid items-end gap-3 sm:grid-cols-3">
        {third && <PodioSlot row={third} place={3} medal="🥉" />}
        {first && <PodioSlot row={first} place={1} medal="🏆" elevated />}
        {second && <PodioSlot row={second} place={2} medal="🥈" />}
      </div>
    </div>
  );
}

function PodioSlot({
  row,
  place,
  medal,
  elevated = false,
}: {
  row: AlcaldiaScore;
  place: number;
  medal: string;
  elevated?: boolean;
}) {
  return (
    <Link
      href={`/alcaldia/${slugify(row.alcaldia)}`}
      className={`group relative flex flex-col items-center rounded-2xl bg-paper-elevated px-3 py-5 text-center transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(40,102,52,0.18)] ${
        elevated
          ? "border-2 border-success ring-2 ring-success/20 sm:-mt-4 sm:py-7"
          : "border border-border"
      }`}
    >
      <div
        className={`absolute -top-5 left-1/2 -translate-x-1/2 text-3xl ${
          elevated ? "sm:text-4xl" : ""
        }`}
        aria-hidden="true"
      >
        {medal}
      </div>
      <div className="font-display mt-1 text-xs font-bold uppercase tracking-widest text-ink-muted">
        #{place}
      </div>
      <div
        className={`font-display mt-2 font-bold text-ink ${
          elevated ? "text-base" : "text-sm"
        }`}
      >
        {row.alcaldia}
      </div>
      <div
        className={`font-display mt-2 tabular-nums font-extrabold leading-none ${
          elevated ? "text-5xl text-success-text" : "text-3xl text-ink"
        }`}
      >
        {row.score_total ?? "—"}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-widest text-ink-muted">
        / 100
      </div>
    </Link>
  );
}

function BottomList({ rows }: { rows: AlcaldiaScore[] }) {
  return (
    <div className="rounded-2xl border border-danger/25 bg-danger-soft p-5">
      <h4 className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-danger-text">
        <svg
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        Bottom 3 · Opacas
      </h4>
      <ol className="space-y-2">
        {rows.map((r, i) => (
          <li key={r.alcaldia}>
            <Link
              href={`/alcaldia/${slugify(r.alcaldia)}`}
              className="flex items-center gap-3 rounded-xl bg-paper-elevated px-4 py-3 transition hover:ring-2 hover:ring-danger/40"
            >
              <span className="w-5 text-xs tabular-nums text-ink-muted">
                {i + 1}
              </span>
              <span className="flex-1 text-sm font-semibold text-ink">
                {r.alcaldia}
              </span>
              <span className="font-display tabular-nums text-2xl font-extrabold text-danger-text">
                {r.score_total ?? "—"}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
