import Papa from "papaparse";
import type { AlcaldiaScore, Ejecucion, Hallazgo, Titular } from "./types";

function parseNumberOrNull(v: string): number | null {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export async function loadScores(): Promise<AlcaldiaScore[]> {
  const res = await fetch("/data/scores-sample.csv", { cache: "no-store" });
  const text = await res.text();
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  });
  return parsed.data.map((r) => ({
    alcaldia: r.alcaldia,
    sexenio: r.sexenio,
    score_total: parseNumberOrNull(r.score_total),
    score_presupuesto: parseNumberOrNull(r.score_presupuesto),
    score_plan: parseNumberOrNull(r.score_plan),
    score_deuda: parseNumberOrNull(r.score_deuda),
    score_patrimonio: parseNumberOrNull(r.score_patrimonio),
    data_faltante: r.data_faltante === "true",
  }));
}

export async function loadHallazgos(): Promise<Hallazgo[]> {
  const res = await fetch("/data/hallazgos-sample.csv", { cache: "no-store" });
  const text = await res.text();
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  });
  return parsed.data.map((r) => ({
    alcaldia: r.alcaldia,
    sexenio: r.sexenio,
    tipo: (r.tipo === "logro" ? "logro" : "pendiente") as "logro" | "pendiente",
    hallazgo_narrativo: r.hallazgo_narrativo,
  }));
}

export async function loadTitulares(): Promise<Titular[]> {
  const res = await fetch("/data/titulares-sample.csv", { cache: "no-store" });
  const text = await res.text();
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  });
  return parsed.data.map((r) => ({
    alcaldia: r.alcaldia,
    sexenio: r.sexenio,
    titular: r.titular,
    partido: r.partido,
    periodo_inicio: r.periodo_inicio,
    periodo_fin: r.periodo_fin,
    por_confirmar: r.por_confirmar === "true",
  }));
}

export async function loadEjecucion(): Promise<Ejecucion[]> {
  const res = await fetch("/data/ejecucion-sample.csv", { cache: "no-store" });
  const text = await res.text();
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  });
  return parsed.data.map((r) => ({
    alcaldia: r.alcaldia,
    anio: Number(r.anio),
    aprobado: Number(r.aprobado),
    modificado: Number(r.modificado),
    ejercido: Number(r.ejercido),
  }));
}
