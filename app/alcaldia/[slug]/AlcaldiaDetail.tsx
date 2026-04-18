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
      <section className="mx-auto max-w-6xl px-6 py-16 text-center text-sm text-ink-muted">
        Sumando los datos oficiales…
      </section>
    );
  }

  if (notFound || !row) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-ink">Esta alcaldía no aparece.</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Revisa el link o regresa al mapa.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light"
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
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary-text">
            Alcaldía · CDMX
          </p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            {row.alcaldia}
          </h2>
          {titular && (
            <p className="mt-2 text-sm text-ink-muted">
              Titular:{" "}
              <span className="font-semibold text-ink">{titular.titular}</span>{" "}
              <span className="text-ink-muted">({titular.partido})</span> ·
              Sexenio {row.sexenio}
              {titular.por_confirmar && (
                <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-text">
                  Por verificar
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

      {ejecucion.length > 0 && (() => {
        const hasEjercido = ejecucion.some((e) => e.ejercido != null);
        return (
          <div className="mt-10 rounded-2xl border border-border bg-paper-elevated p-6">
            <div className="flex items-baseline justify-between">
              <div>
                <h3 className="text-lg font-bold text-ink">Gasto año por año</h3>
                <p className="text-sm text-ink-muted">
                  {hasEjercido
                    ? "Aprobado vs ejercido, en millones de pesos."
                    : "Presupuesto aprobado, en millones de pesos. El ejercido aún no está publicado por la alcaldía."}
                </p>
              </div>
              <Legend showEjercido={hasEjercido} />
            </div>
            <BudgetChart data={ejecucion} />
            <BudgetTable data={ejecucion} />
          </div>
        );
      })()}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <NarrativeCard
          title="Lo que se logró"
          subtitle={
            logros.length > 0
              ? `${logros.length} puntos a favor`
              : "Sin logros documentados aún"
          }
          items={logros}
          tone="success"
        />
        <NarrativeCard
          title="Lo que falta"
          subtitle={
            pendientes.length > 0
              ? `${pendientes.length} cosas que tu alcaldía debería explicarte`
              : "Sin pendientes documentados aún"
          }
          items={pendientes}
          tone="danger"
        />
      </div>

      {row.data_faltante && (
        <p className="mt-6 rounded-xl border border-accent/40 bg-accent-soft p-4 text-xs text-accent-text">
          Esta alcaldía aún no publica información suficiente para calcular
          todos los componentes del score. Eso también dice algo.
        </p>
      )}

      <p className="mt-6 text-xs text-ink-muted">
        Fuente:{" "}
        <a
          href="https://datos.cdmx.gob.mx"
          target="_blank"
          rel="noreferrer"
          className="text-primary-text underline hover:text-primary"
        >
          datos.cdmx.gob.mx
        </a>
        . Presupuesto aprobado oficial, 2018–2024. Cuando la alcaldía publique
        el monto ejercido, el score se actualiza automáticamente.
      </p>

      <div className="mt-10">
        <Link
          href="/"
          className="text-sm font-semibold text-ink-muted hover:text-primary-text"
        >
          ← Volver al mapa
        </Link>
      </div>
    </section>
  );
}

function ScoreBadge({ score }: { score: number | null }) {
  const color = scoreColor(score);
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-paper-elevated px-5 py-3">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white"
        style={{ background: color }}
      >
        {score ?? "—"}
      </div>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
          Trust Score
        </div>
        <div className="text-lg font-bold text-ink">{scoreLabel(score)}</div>
        <div className="text-xs text-ink-muted">de 100</div>
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
  const color = scoreColor(score);
  return (
    <div
      className="rounded-2xl border border-border border-l-4 bg-paper-elevated p-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-bold text-ink">{label}</div>
          <div className="mt-0.5 text-xs text-ink-muted">{body}</div>
        </div>
        <div
          className="shrink-0 rounded-full px-2.5 py-1 text-xs font-bold text-white"
          style={{ background: color }}
        >
          {score ?? "N.A."}
        </div>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border/60">
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.min(Math.max(pct, 0), 100)}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
}

function Legend({ showEjercido }: { showEjercido: boolean }) {
  return (
    <div className="flex gap-4 text-xs text-ink-muted">
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-2 w-3 rounded-sm bg-primary" />
        Aprobado
      </span>
      {showEjercido && (
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-3 rounded-sm bg-success" />
          Ejercido
        </span>
      )}
    </div>
  );
}

function BudgetChart({ data }: { data: Ejecucion[] }) {
  const max = useMemo(() => {
    const all = data.flatMap((d) => [
      d.aprobado,
      d.modificado ?? 0,
      d.ejercido ?? 0,
    ]);
    return Math.max(...all, 1);
  }, [data]);

  return (
    <div className="mt-5 overflow-x-auto">
      <div className="flex min-w-full items-end gap-4 px-1 pb-2">
        {data.map((d) => {
          const tasa =
            d.modificado && d.modificado > 0 && d.ejercido != null
              ? Math.round((d.ejercido / d.modificado) * 100)
              : null;
          const tasaColor =
            tasa === null
              ? "text-ink-muted"
              : tasa >= 90
                ? "text-success-text"
                : tasa >= 80
                  ? "text-accent-text"
                  : "text-danger-text";
          return (
            <div key={d.anio} className="flex min-w-[56px] flex-1 flex-col items-center">
              <div className="flex h-52 w-full items-end justify-center gap-1">
                <div
                  className="w-5 rounded-t bg-primary"
                  style={{ height: `${(d.aprobado / max) * 100}%` }}
                  title={`Aprobado ${d.aprobado} M`}
                />
                {d.ejercido != null && (
                  <div
                    className="w-5 rounded-t bg-success"
                    style={{ height: `${(d.ejercido / max) * 100}%` }}
                    title={`Ejercido ${d.ejercido} M`}
                  />
                )}
              </div>
              <div className="mt-2 text-[11px] font-bold text-ink">{d.anio}</div>
              {tasa !== null && (
                <div className={`text-[10px] font-semibold ${tasaColor}`}>
                  {tasa}%
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BudgetTable({ data }: { data: Ejecucion[] }) {
  const na = <span className="text-ink-muted">No publicado</span>;
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border text-[11px] uppercase tracking-widest text-ink-muted">
          <tr>
            <th className="py-2 pr-4 font-bold">Año</th>
            <th className="py-2 pr-4 font-bold">Aprobado (M MXN)</th>
            <th className="py-2 pr-4 font-bold">Modificado (M MXN)</th>
            <th className="py-2 pr-4 font-bold">Ejercido (M MXN)</th>
            <th className="py-2 pr-4 font-bold">Tasa ejecución</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((d) => {
            const tasa =
              d.modificado && d.modificado > 0 && d.ejercido != null
                ? (d.ejercido / d.modificado) * 100
                : null;
            const color =
              tasa === null
                ? "text-ink-muted"
                : tasa >= 90
                  ? "text-success-text"
                  : tasa >= 80
                    ? "text-accent-text"
                    : "text-danger-text";
            return (
              <tr key={d.anio} className="text-ink">
                <td className="py-2 pr-4 font-bold">{d.anio}</td>
                <td className="py-2 pr-4 tabular-nums">
                  {d.aprobado.toLocaleString("es-MX")}
                </td>
                <td className="py-2 pr-4 tabular-nums">
                  {d.modificado != null
                    ? d.modificado.toLocaleString("es-MX")
                    : na}
                </td>
                <td className="py-2 pr-4 tabular-nums">
                  {d.ejercido != null
                    ? d.ejercido.toLocaleString("es-MX")
                    : na}
                </td>
                <td className={`py-2 pr-4 font-bold tabular-nums ${color}`}>
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
  tone,
}: {
  title: string;
  subtitle: string;
  items: Hallazgo[];
  tone: "success" | "danger";
}) {
  const bg =
    tone === "success"
      ? "bg-success-soft border-success/30"
      : "bg-danger-soft border-danger/30";
  const icon = tone === "success" ? "✓" : "!";
  const iconColor = tone === "success" ? "text-success-text" : "text-danger-text";

  return (
    <div className={`rounded-2xl border p-5 ${bg}`}>
      <h3 className="text-base font-bold text-ink">{title}</h3>
      <p className="text-xs text-ink-muted">{subtitle}</p>
      <ul className="mt-4 space-y-2">
        {items.length === 0 && (
          <li className="rounded-xl bg-paper-elevated/70 p-3 text-xs text-ink-muted">
            Aún no documentamos nada aquí. El equipo lo está redactando.
          </li>
        )}
        {items.map((h, i) => (
          <li
            key={i}
            className="flex gap-2.5 rounded-xl bg-paper-elevated p-3 text-sm text-ink shadow-sm"
          >
            <span
              className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-paper text-xs font-black ${iconColor}`}
            >
              {icon}
            </span>
            <span>{h.hallazgo_narrativo}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
