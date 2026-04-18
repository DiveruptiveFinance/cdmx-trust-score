export type AlcaldiaScore = {
  alcaldia: string;
  sexenio: string;
  score_total: number | null;
  score_presupuesto: number | null;
  score_plan: number | null;
  score_deuda: number | null;
  score_patrimonio: number | null;
  data_faltante: boolean;
};

export type Hallazgo = {
  alcaldia: string;
  sexenio: string;
  hallazgo_narrativo: string;
};

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function scoreColor(score: number | null): string {
  if (score === null) return "#d1d5db";
  if (score >= 70) return "#16a34a";
  if (score >= 50) return "#eab308";
  return "#dc2626";
}

export function scoreLabel(score: number | null): string {
  if (score === null) return "Sin datos";
  if (score >= 70) return "Transparente";
  if (score >= 50) return "A medias";
  return "Opaca";
}
