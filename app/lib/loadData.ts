import Papa from "papaparse";
import type { AlcaldiaScore, Hallazgo } from "./types";

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
  const parsed = Papa.parse<Hallazgo>(text, {
    header: true,
    skipEmptyLines: true,
  });
  return parsed.data;
}
