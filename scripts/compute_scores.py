#!/usr/bin/env python3
"""
El Cuentas — pipeline de datos reales (versión honesta v2).

Lee los 7 CSVs de egresos aprobados (2018-2024) de datos.cdmx.gob.mx que nos
compartió Yuli, los filtra a las 16 alcaldías de CDMX, y genera:

  - public/data/ejecucion.csv    (16 alcaldías × años con datos · aprobado únicamente)
  - public/data/scores.csv       (16 alcaldías, sexenio 2018-2024 · score parcial)

Realidad del dataset:
---------------------
Los CSVs `egresos_YYYY_aprobado.csv` sólo contienen `monto_aprobado`. Las columnas
`monto_modificado` y `monto_ejercido` existen en el esquema pero vienen en 0 en
*todos* los registros de los 7 años (validado 2026-04-18). Por eso NO podemos
calcular las métricas originales de Yuli (tasa_ejecucion y disciplina_modificatoria).

Metodología v2 (parcial, honesta):
----------------------------------
El score_presupuesto se deriva de dos señales que SÍ podemos calcular con datos
públicos ya publicados:

  1. Estabilidad presupuestal (peso 0.6)
     - Coeficiente de variación del aprobado año con año (std/media).
     - Rúbrica: <=5% → 100 · <=10% → 80 · <=20% → 60 · <=35% → 40 · >35% → 20.
     - Intuición: una alcaldía que presupuesta de forma errática año con año
       acusa falta de plan multianual.

  2. Cobertura temporal (peso 0.4)
     - Años con reporte publicado / 7.
     - Rúbrica: 7/7 → 100 · 6/7 → 85 · 5/7 → 70 · 4/7 → 55 · <4/7 → 40.
     - Intuición: transparencia empieza con estar en el dataset público.

Cuando Yuli entregue el ejercido real, el pipeline regresa a la rúbrica
original (tasa de ejecución + disciplina modificatoria) y los pesos se
recalibran. Los componentes plan/deuda/patrimonio siguen pendientes y el peso
del presupuesto se redistribuye hasta que lleguen.

Uso:
  python3 scripts/compute_scores.py
"""

from __future__ import annotations

import csv
import sys
from pathlib import Path

import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT.parent / "Impact Lab Yuli"
OUT_DIR = ROOT / "public" / "data"

YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024]

# Los CSVs vienen con doble-encoding: bytes UTF-8 etiquetados como latin-1.
# Para recuperar los acentos ("Álvaro" vs "Ãlvaro") leemos como latin-1 y
# re-decodificamos los strings con utf-8.
def fix_mojibake(s):
    if not isinstance(s, str):
        return s
    try:
        return s.encode("latin-1").decode("utf-8")
    except (UnicodeEncodeError, UnicodeDecodeError):
        return s


# Claves esperadas después del fix_mojibake (16 alcaldías de CDMX).
# La izquierda = como aparece en los CSVs; la derecha = nombre canónico
# (coincide con NOMGEO del GeoJSON y supabase.alcaldias.nombre).
ALCALDIA_MAP = {
    "Alcaldía Álvaro Obregón": "Álvaro Obregón",
    "Alcaldía Azcapotzalco": "Azcapotzalco",
    "Alcaldía Benito Juárez": "Benito Juárez",
    "Alcaldía Coyoacán": "Coyoacán",
    "Alcaldía Cuajimalpa de Morelos": "Cuajimalpa de Morelos",
    "Alcaldía Cuauhtémoc": "Cuauhtémoc",
    "Alcaldía Gustavo A. Madero": "Gustavo A. Madero",
    "Alcaldía Iztacalco": "Iztacalco",
    "Alcaldía Iztapalapa": "Iztapalapa",
    "Alcaldía la Magdalena Contreras": "La Magdalena Contreras",
    "Alcaldía Miguel Hidalgo": "Miguel Hidalgo",
    "Alcaldía Milpa Alta": "Milpa Alta",
    "Alcaldía Tláhuac": "Tláhuac",
    "Alcaldía Tlalpan": "Tlalpan",
    "Alcaldía Venustiano Carranza": "Venustiano Carranza",
    "Alcaldía Xochimilco": "Xochimilco",
}


def load_ejecucion() -> pd.DataFrame:
    """DataFrame con columnas: alcaldia, anio, aprobado (millones MXN)."""
    frames = []
    for year in YEARS:
        path = RAW_DIR / f"egresos_{year}_aprobado.csv"
        if not path.exists():
            print(f"  WARN: no existe {path.name}", file=sys.stderr)
            continue

        cols = ["desc_unidad_responsable", "monto_aprobado"]
        # latin-1 nunca falla (es 1:1 byte→char). El mojibake se repara después.
        df = pd.read_csv(path, usecols=cols, low_memory=False, encoding="latin-1")
        df["desc_unidad_responsable"] = df["desc_unidad_responsable"].map(fix_mojibake)

        df = df[df["desc_unidad_responsable"].isin(ALCALDIA_MAP)].copy()
        df["alcaldia"] = df["desc_unidad_responsable"].map(ALCALDIA_MAP)
        df["anio"] = year
        frames.append(df[["alcaldia", "anio", "monto_aprobado"]])

    if not frames:
        raise RuntimeError("No se pudo leer ningún CSV de Yuli — revisa la ruta RAW_DIR.")

    big = pd.concat(frames, ignore_index=True)
    big["monto_aprobado"] = pd.to_numeric(big["monto_aprobado"], errors="coerce").fillna(0)

    agg = (
        big.groupby(["alcaldia", "anio"], as_index=False)
        .agg(aprobado=("monto_aprobado", "sum"))
        .sort_values(["alcaldia", "anio"])
    )

    # pesos → millones (entero para UI limpia)
    agg["aprobado"] = (agg["aprobado"] / 1_000_000).round().astype(int)

    # modificado/ejercido no vienen publicados → los dejamos vacíos para que
    # el front sepa que no debe graficarlos.
    agg["modificado"] = ""
    agg["ejercido"] = ""

    return agg[["alcaldia", "anio", "aprobado", "modificado", "ejercido"]]


# ---------------------------------------------------------------
# Scoring v2 (parcial, con los datos disponibles)
# ---------------------------------------------------------------

def score_estabilidad(cv: float) -> int:
    if cv <= 0.05: return 100
    if cv <= 0.10: return 80
    if cv <= 0.20: return 60
    if cv <= 0.35: return 40
    return 20


def score_cobertura(n_anios: int, total: int = 7) -> int:
    ratio = n_anios / total
    if ratio >= 1.00: return 100
    if ratio >= 6 / 7: return 85
    if ratio >= 5 / 7: return 70
    if ratio >= 4 / 7: return 55
    return 40


def compute_presupuesto_score(ejec: pd.DataFrame) -> pd.DataFrame:
    rows = []
    for alc, sub in ejec.groupby("alcaldia"):
        valores = sub["aprobado"].astype(float).values
        valores = valores[valores > 0]

        if len(valores) >= 2 and valores.mean() > 0:
            cv = float(np.std(valores) / np.mean(valores))
        else:
            cv = 1.0  # penalizar fuerte si solo hay 0-1 años de datos

        s_est = score_estabilidad(cv)
        s_cob = score_cobertura(len(valores))
        score_pres = round(0.6 * s_est + 0.4 * s_cob)

        rows.append({
            "alcaldia": alc,
            "coef_variacion": round(cv * 100, 1),
            "cobertura_anios": int(len(valores)),
            "score_presupuesto": int(score_pres),
        })
    return pd.DataFrame(rows).sort_values("alcaldia")


def redistribute(weights: dict[str, float], presentes: set[str]) -> dict[str, float]:
    total = sum(w for k, w in weights.items() if k in presentes)
    if total == 0:
        return {k: 0 for k in weights}
    return {k: (w / total if k in presentes else 0) for k, w in weights.items()}


def main() -> int:
    print(f"→ Leyendo egresos de {RAW_DIR}")
    ejec = load_ejecucion()
    print(f"  {len(ejec)} filas agregadas (alcaldía × año)")

    print("→ Calculando score_presupuesto (estabilidad + cobertura)")
    scores_pres = compute_presupuesto_score(ejec)

    weights = {"presupuesto": 0.40, "plan": 0.25, "deuda": 0.20, "patrimonio": 0.15}
    effective = redistribute(weights, presentes={"presupuesto"})
    pesos_aplicados = {k: round(v, 2) for k, v in effective.items()}

    scores_pres["sexenio"] = "2018-2024"
    scores_pres["score_plan"] = ""
    scores_pres["score_deuda"] = ""
    scores_pres["score_patrimonio"] = ""
    scores_pres["data_faltante"] = "true"
    scores_pres["score_total"] = scores_pres["score_presupuesto"].astype(int)

    scores_out = scores_pres[[
        "alcaldia", "sexenio",
        "score_total",
        "score_presupuesto", "score_plan", "score_deuda", "score_patrimonio",
        "data_faltante",
    ]]

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    scores_path = OUT_DIR / "scores.csv"
    ejec_path = OUT_DIR / "ejecucion.csv"

    scores_out.to_csv(scores_path, index=False, quoting=csv.QUOTE_MINIMAL)
    ejec.to_csv(ejec_path, index=False, quoting=csv.QUOTE_MINIMAL)

    print(f"✓ {scores_path.relative_to(ROOT)} ({len(scores_out)} filas)")
    print(f"✓ {ejec_path.relative_to(ROOT)} ({len(ejec)} filas)")
    print()
    print("Pesos aplicados (presupuesto = único componente disponible):")
    for k, v in pesos_aplicados.items():
        print(f"  {k:>12}: {v:.2f}")
    print()
    print("Resumen scores:")
    print(scores_pres[["alcaldia", "score_total", "coef_variacion", "cobertura_anios"]].to_string(index=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
