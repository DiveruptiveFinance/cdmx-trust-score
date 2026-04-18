"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  loadEjecucion,
  loadHallazgos,
  loadScores,
  loadTitulares,
} from "../../lib/loadData";
import { scoreColor, scoreLabel, slugify } from "../../lib/types";
import type {
  AlcaldiaScore,
  Ejecucion,
  Hallazgo,
  Titular,
} from "../../lib/types";

export default function AlcaldiaDetail({ slug }: { slug: string }) {
  const [row, setRow] = useState<AlcaldiaScore | null>(null);
  const [titular, setTitular] = useState<Titular | null>(null);
  const [ejecucion, setEjecucion] = useState<Ejecucion[]>([]);
  const [hallazgos, setHallazgos] = useState<Hallazgo[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [scores, titulares, ejecs, halls] = await Promise.all([
        loadScores(),
        loadTitulares(),
        loadEjecucion(),
        loadHallazgos(),
      ]);
      const match = scores.find((r) => slugify(r.alcaldia) === slug);
      if (!match) {
        setNotFound(true);
      } else {
        setRow(match);
        setTitular(
          titulares.find(
            (t) => t.alcaldia === match.alcaldia && t.sexenio === match.sexenio
          ) ?? null
        );
        setEjecucion(
          ejecs
            .filter((e) => e.alcaldia === match.alcaldia)
            .sort((a, b) => a.anio - b.anio)
        );
        setHallazgos(
          halls.filter(
            (h) => h.alcaldia === match.alcaldia && h.sexenio === match.sexenio
          )
        );
      }
      setLoading(false);
    })();
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
        <h2 className="text-2xl font-bold text-zinc-900">
          Esta alcaldía no aparece.
        </h2>
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

  const logros = hallazgos.filter((h) => h.tipo === "logro");
  const pendientes = hallazgos.filter((h) => h.tipo === "pendiente");

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
          {titular && (
            <p className="mt-1 text-sm text-zinc-600">
              Titular:{" "}
              <span className="font-semibold text-zinc-900">
                {titular.titular}
              </span>{" "}
              <span className="text-zinc-500">({titular.partido})</span> ·
              Sexenio {row.sexenio}
              {titular.por_confirmar && (
                <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-900">
                  POR VERIFICAR
                </span>
              )}
            </p>
          )}
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

      {ejecucion.length > 0 && (
        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex items-baseline justify-between">
            <div>
              <h3 className="text-lg font-semibold">Gasto año por año</h3>
              <p className="text-sm text-zinc-500">
                Aprobado vs ejercido, en millones de pesos.
              </p>
            </div>
            <Legend />
          </div>
          <BudgetChart data={ejecucion} />
          <BudgetTable data={ejecucion} />
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <NarrativeCard
          title="Lo que se logró"
          subtitle={
            logros.length > 0
              ? `${logros.length} puntos a favor`
              : "Sin logros documentados aún"
          }
          items={logros}
          accent="border-green-200 bg-green-50"
          bullet="✓"
          bulletColor="text-green-700"
        />
        <NarrativeCard
          title="Lo que falta"
          subtitle={
            pendientes.length > 0
              ? `${pendientes.length} cosas que tu alcaldía debería explicarte`
              : "Sin pendientes documentados aún"
          }
          items={pendientes}
          accent="border-red-200 bg-red-50"
          bullet="!"
          bulletColor="text-red-700"
        />
      </div>

      {row.data_faltante && (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
          Esta alcaldía aún no publica información suficiente para calcular
          todos los componentes del score. Eso también dice algo.
        </p>
      )}

      <p className="mt-6 text-xs text-zinc-500">
        Fuente:{" "}
        <a
          href="https://datos.cdmx.gob.mx"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-zinc-900"
        >
          datos.cdmx.gob.mx
        </a>
        . Cifras presupuestales de muestra — serán reemplazadas con el
        cálculo de Yuli sobre Cuenta Pública CDMX.
      </p>

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

function Legend() {
  return (
    <div className="flex gap-3 text-xs text-zinc-600">
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-2 w-3 rounded-sm bg-zinc-300" />
        Aprobado
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-2 w-3 rounded-sm bg-zinc-900" />
        Ejercido
      </span>
    </div>
  );
}

function BudgetChart({ data }: { data: Ejecucion[] }) {
  const max = useMemo(
    () =>
      Math.max(
        ...data.flatMap((d) => [d.aprobado, d.modificado, d.ejercido])
      ),
    [data]
  );

  return (
    <div className="mt-4 overflow-x-auto">
      <div className="flex min-w-full items-end gap-4 px-1 pb-2">
        {data.map((d) => {
          const tasa =
            d.modificado > 0
              ? Math.round((d.ejercido / d.modificado) * 100)
              : null;
          return (
            <div key={d.anio} className="flex min-w-[56px] flex-1 flex-col items-center">
              <div className="flex h-48 w-full items-end justify-center gap-1">
                <div
                  className="w-4 rounded-t bg-zinc-300"
                  style={{ height: `${(d.aprobado / max) * 100}%` }}
                  title={`Aprobado ${d.aprobado} M`}
                />
                <div
                  className="w-4 rounded-t bg-zinc-900"
                  style={{ height: `${(d.ejercido / max) * 100}%` }}
                  title={`Ejercido ${d.ejercido} M`}
                />
              </div>
              <div className="mt-2 text-[11px] font-semibold text-zinc-700">
                {d.anio}
              </div>
              {tasa !== null && (
                <div className="text-[10px] text-zinc-500">{tasa}%</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BudgetTable({ data }: { data: Ejecucion[] }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="border-b border-zinc-200 text-[11px] uppercase tracking-wide text-zinc-500">
          <tr>
            <th className="py-2 pr-4 font-semibold">Año</th>
            <th className="py-2 pr-4 font-semibold">Aprobado (M MXN)</th>
            <th className="py-2 pr-4 font-semibold">Modificado (M MXN)</th>
            <th className="py-2 pr-4 font-semibold">Ejercido (M MXN)</th>
            <th className="py-2 pr-4 font-semibold">Tasa ejecución</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {data.map((d) => {
            const tasa =
              d.modificado > 0 ? (d.ejercido / d.modificado) * 100 : null;
            const color =
              tasa === null
                ? "text-zinc-500"
                : tasa >= 90
                  ? "text-green-700"
                  : tasa >= 80
                    ? "text-amber-700"
                    : "text-red-700";
            return (
              <tr key={d.anio} className="text-zinc-700">
                <td className="py-2 pr-4 font-semibold">{d.anio}</td>
                <td className="py-2 pr-4 tabular-nums">
                  {d.aprobado.toLocaleString("es-MX")}
                </td>
                <td className="py-2 pr-4 tabular-nums">
                  {d.modificado.toLocaleString("es-MX")}
                </td>
                <td className="py-2 pr-4 tabular-nums">
                  {d.ejercido.toLocaleString("es-MX")}
                </td>
                <td className={`py-2 pr-4 font-semibold tabular-nums ${color}`}>
                  {tasa !== null ? `${tasa.toFixed(1)}%` : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function NarrativeCard({
  title,
  subtitle,
  items,
  accent,
  bullet,
  bulletColor,
}: {
  title: string;
  subtitle: string;
  items: Hallazgo[];
  accent: string;
  bullet: string;
  bulletColor: string;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${accent}`}>
      <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
      <p className="text-xs text-zinc-500">{subtitle}</p>
      <ul className="mt-3 space-y-2">
        {items.length === 0 && (
          <li className="rounded-xl bg-white/70 p-3 text-xs text-zinc-500">
            Aún no documentamos nada aquí. El equipo lo está redactando.
          </li>
        )}
        {items.map((h, i) => (
          <li
            key={i}
            className="flex gap-2 rounded-xl bg-white p-3 text-sm text-zinc-800 shadow-sm"
          >
            <span className={`shrink-0 text-base font-bold ${bulletColor}`}>
              {bullet}
            </span>
            <span>{h.hallazgo_narrativo}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
