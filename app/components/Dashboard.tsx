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

      <div className="grid gap-6 lg:grid-cols-2">
        <RankingCard
          title="Las más transparentes"
          subtitle="Top 3 · score más alto"
          rows={top3}
          tone="success"
        />
        <RankingCard
          title="Las que más deben explicar"
          subtitle="Bottom 3 · score más bajo"
          rows={bottom3}
          tone="danger"
        />
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

function RankingCard({
  title,
  subtitle,
  rows,
  tone,
}: {
  title: string;
  subtitle: string;
  rows: AlcaldiaScore[];
  tone: "success" | "danger";
}) {
  const toneBg =
    tone === "success"
      ? "bg-success-soft border-success/20"
      : "bg-danger-soft border-danger/20";
  return (
    <div className={`rounded-2xl border p-5 ${toneBg}`}>
      <div className="mb-4">
        <h3 className="text-base font-bold text-ink">{title}</h3>
        <p className="text-xs text-ink-muted">{subtitle}</p>
      </div>
      <ol className="space-y-2">
        {rows.map((r, i) => (
          <li key={r.alcaldia}>
            <Link
              href={`/alcaldia/${slugify(r.alcaldia)}`}
              className="flex items-center gap-3 rounded-xl bg-paper-elevated px-3.5 py-2.5 transition hover:ring-2 hover:ring-primary/40"
            >
              <span className="w-5 text-sm tabular-nums text-ink-muted">
                {i + 1}
              </span>
              <span className="flex-1 text-sm font-semibold text-ink">
                {r.alcaldia}
              </span>
              <span
                className="rounded-full px-2.5 py-1 text-xs font-bold text-white"
                style={{ background: scoreColor(r.score_total) }}
              >
                {r.score_total ?? "—"}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
