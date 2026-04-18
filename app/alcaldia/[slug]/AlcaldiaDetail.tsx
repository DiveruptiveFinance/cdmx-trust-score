"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadScores } from "../../lib/loadData";
import { scoreColor, scoreLabel, slugify } from "../../lib/types";
import type { AlcaldiaScore } from "../../lib/types";

export default function AlcaldiaDetail({ slug }: { slug: string }) {
  const [row, setRow] = useState<AlcaldiaScore | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScores()
      .then((rows) => {
        const match = rows.find((r) => slugify(r.alcaldia) === slug);
        if (!match) setNotFound(true);
        else setRow(match);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-16 text-center text-sm text-zinc-500">
        Sumando los datos oficiales…
      </section>
    );
  }

  if (notFound || !row) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-zinc-900">Esta alcaldía no aparece.</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Revisa el link o regresa al mapa.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-full bg-zinc-900 px-5 py-2 text-sm text-white"
        >
          Volver al mapa
        </Link>
      </section>
    );
  }

  const subs: Array<{ key: keyof AlcaldiaScore; label: string; body: string }> = [
    {
      key: "score_presupuesto",
      label: "Presupuesto",
      body: "¿Gasta lo que prometió gastar?",
    },
    {
      key: "score_plan",
      label: "Plan de gobierno",
      body: "¿Cumple lo que dijo que iba a hacer?",
    },
    {
      key: "score_deuda",
      label: "Deuda",
      body: "¿Debe con medida o está apretando la cuerda?",
    },
    {
      key: "score_patrimonio",
      label: "Patrimonio",
      body: "¿Declara lo que tiene quien firma los cheques?",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Alcaldía · CDMX
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">{row.alcaldia}</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Sexenio {row.sexenio}
          </p>
        </div>

        <ScoreBadge score={row.score_total} />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {subs.map((s) => (
          <SubScoreCard
            key={s.key}
            label={s.label}
            body={s.body}
            score={row[s.key] as number | null}
          />
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6">
        <h3 className="text-lg font-semibold">Lo que encontramos</h3>
        <p className="mt-1 text-sm text-zinc-500">
          Tres cosas que tu alcaldía debería explicarte.
        </p>
        <ul className="mt-4 space-y-3 text-sm text-zinc-700">
          <li className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
            Los hallazgos narrativos aparecerán aquí cuando conectemos los datos
            reales de Yuli. Por ahora, este detalle muestra los scores de muestra.
          </li>
        </ul>
        <p className="mt-4 text-xs text-zinc-500">
          Fuente:{" "}
          <a
            href="https://datos.cdmx.gob.mx"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-zinc-900"
          >
            datos.cdmx.gob.mx
          </a>
        </p>
      </div>

      {row.data_faltante && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
          Esta alcaldía aún no publica información suficiente para calcular
          algunos componentes del score. Eso también dice algo.
        </p>
      )}

      <div className="mt-10">
        <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
          ← Volver al mapa
        </Link>
      </div>
    </section>
  );
}

function ScoreBadge({ score }: { score: number | null }) {
  const color = scoreColor(score);
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-5 py-3">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white"
        style={{ background: color }}
      >
        {score ?? "—"}
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wide text-zinc-500">
          Trust Score
        </div>
        <div className="text-lg font-semibold text-zinc-900">
          {scoreLabel(score)}
        </div>
        <div className="text-xs text-zinc-500">de 100</div>
      </div>
    </div>
  );
}

function SubScoreCard({
  label,
  body,
  score,
}: {
  label: string;
  body: string;
  score: number | null;
}) {
  const pct = score ?? 0;
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-semibold text-zinc-900">{label}</div>
          <div className="mt-0.5 text-xs text-zinc-500">{body}</div>
        </div>
        <div
          className="shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold text-white"
          style={{ background: scoreColor(score) }}
        >
          {score ?? "N.A."}
        </div>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${Math.min(Math.max(pct, 0), 100)}%`,
            background: scoreColor(score),
          }}
        />
      </div>
    </div>
  );
}
