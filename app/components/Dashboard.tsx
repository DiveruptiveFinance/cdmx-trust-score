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
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center text-sm text-zinc-500">
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
  const sinDatos = rows.filter((r) => r.score_total === null).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Promedio CDMX" value={promedio !== null ? `${promedio}/100` : "—"} />
        <StatCard label="Mejor puntuada" value={top3[0]?.alcaldia ?? "—"} />
        <StatCard label="Peor puntuada" value={bottom3[0]?.alcaldia ?? "—"} />
        <StatCard label="Sin datos suficientes" value={`${sinDatos} alcaldías`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RankingCard
          title="Las más transparentes"
          subtitle="Top 3 · score más alto"
          rows={top3}
          accent="bg-green-50 border-green-200"
        />
        <RankingCard
          title="Las que más deben explicar"
          subtitle="Bottom 3 · score más bajo"
          rows={bottom3}
          accent="bg-red-50 border-red-200"
        />
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white">
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3">
          <h3 className="text-sm font-semibold text-zinc-900">
            Ranking completo · 16 alcaldías
          </h3>
          <span className="text-xs text-zinc-500">
            Toca una para ver el detalle
          </span>
        </div>
        <ol className="divide-y divide-zinc-100">
          {rows.map((r, i) => (
            <li key={r.alcaldia}>
              <Link
                href={`/alcaldia/${slugify(r.alcaldia)}`}
                className="flex items-center gap-4 px-5 py-3 transition hover:bg-zinc-50"
              >
                <span className="w-6 text-right text-sm tabular-nums text-zinc-400">
                  {i + 1}
                </span>
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ background: scoreColor(r.score_total) }}
                />
                <span className="flex-1 text-sm font-medium text-zinc-900">
                  {r.alcaldia}
                </span>
                <span className="text-xs text-zinc-500">
                  {scoreLabel(r.score_total)}
                </span>
                <span className="w-14 text-right text-sm tabular-nums font-semibold text-zinc-900">
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

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="text-[11px] uppercase tracking-wide text-zinc-500">
        {label}
      </div>
      <div className="mt-1 text-base font-semibold text-zinc-900">{value}</div>
    </div>
  );
}

function RankingCard({
  title,
  subtitle,
  rows,
  accent,
}: {
  title: string;
  subtitle: string;
  rows: AlcaldiaScore[];
  accent: string;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${accent}`}>
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
        <p className="text-xs text-zinc-500">{subtitle}</p>
      </div>
      <ol className="space-y-2">
        {rows.map((r, i) => (
          <li key={r.alcaldia}>
            <Link
              href={`/alcaldia/${slugify(r.alcaldia)}`}
              className="flex items-center gap-3 rounded-lg bg-white px-3 py-2 shadow-sm transition hover:shadow-md"
            >
              <span className="w-5 text-sm tabular-nums text-zinc-400">
                {i + 1}
              </span>
              <span className="flex-1 text-sm font-medium text-zinc-900">
                {r.alcaldia}
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-xs font-semibold text-white"
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
