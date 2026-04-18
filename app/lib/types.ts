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
  tipo: "logro" | "pendiente";
  hallazgo_narrativo: string;
};

export type Titular = {
  alcaldia: string;
  sexenio: string;
  titular: string;
  partido: string;
  periodo_inicio: string;
  periodo_fin: string;
  por_confirmar: boolean;
};

export type Ejecucion = {
  alcaldia: string;
  anio: number;
  aprobado: number;
  modificado: number;
  ejercido: number;
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
  if (score === null) return "#E8E0CC";
  if (score >= 67) return "#286634";
  if (score >= 34) return "#F1B12B";
  return "#C0000A";
}

export function scoreColorText(score: number | null): string {
  if (score === null) return "#4A4A4A";
  if (score >= 67) return "#22562C";
  if (score >= 34) return "#846117";
  return "#A30008";
}

export function scoreLabel(score: number | null): string {
  if (score === null) return "Sin datos";
  if (score >= 67) return "Transparente";
  if (score >= 34) return "A medias";
  return "Opaca";
}
