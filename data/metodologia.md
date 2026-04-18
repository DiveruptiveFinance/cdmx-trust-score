# Metodología — CDMX Trust Score

**Versión:** 1.0 — Hackathon Claude Impact Lab CDMX, 18 de abril de 2026  
**Responsable:** Yuli (Acacia Capital)  
**Fuente metodológica de referencia:** Fitch Ratings, *Metodología de Calificación de Gobiernos Locales y Regionales Internacionales* (diciembre 2024), adaptada al contexto municipal de CDMX.

---

## 1. Objetivo

El Trust Score mide qué tan transparente, fiel y confiable es cada alcaldía de CDMX en el manejo de recursos públicos, el cumplimiento de compromisos y la rendición de cuentas. La escala es 0–100 (mayor es mejor). No es una calificación crediticia; es un índice de confiabilidad institucional para uso ciudadano.

---

## 2. Componentes y ponderación

| Componente | Variable | Peso |
|---|---|---|
| `score_presupuesto` | Ejecución presupuestal y calidad del gasto | 40% |
| `score_plan` | Cumplimiento del plan de gobierno | 25% |
| `score_deuda` | Manejo responsable de deuda pública | 20% |
| `score_patrimonio` | Transparencia patrimonial de funcionarios | 15% |

**Fórmula:**  
`score_total = 0.40 × score_presupuesto + 0.25 × score_plan + 0.20 × score_deuda + 0.15 × score_patrimonio`

La ponderación asigna mayor peso al presupuesto porque es el componente con mayor cobertura de datos verificables y el más relevante para el ciudadano promedio (¿en qué y cuánto gastaron?). La deuda se pondera por encima del patrimonio porque tiene implicaciones fiscales de mayor magnitud. El plan de gobierno recibe peso intermedio dado que su disponibilidad como dato abierto es heterogénea entre alcaldías.

---

## 3. Definición de cada componente

### 3.1 Score Presupuesto (peso 40%)
Mide la calidad de la ejecución del presupuesto asignado por la CDMX a cada alcaldía.

Subindicadores considerados:
- **Tasa de ejecución:** gasto ejercido / presupuesto modificado. Rango óptimo: 90%–100%. Tanto la subejecución como el sobreejercicio penalizan.
- **Calidad del gasto:** proporción destinada a inversión y servicios directos vs. gasto corriente administrativo.
- **Regularidad:** consistencia de la ejecución a lo largo del año (vs. concentración en el 4T).
- **Transparencia del reporte:** disponibilidad de reportes trimestrales completos en datos.cdmx.gob.mx.

Fuente primaria: Reportes de gasto trimestral por alcaldía, portal datos.cdmx.gob.mx y tudinero.cdmx.gob.mx.

### 3.2 Score Plan (peso 25%)
Mide el grado en que la alcaldía publicó, ejecutó y reportó avance de su Plan de Gobierno o Programa de Desarrollo Delegacional/Alcaldía.

Subindicadores:
- Existencia del plan como documento público y descargable.
- Número de compromisos con indicadores cuantificables vs. total de compromisos.
- Reportes de avance publicados (al menos anual).
- Porcentaje de metas con evidencia de cumplimiento documentada.

**Nota:** Para sexenios anteriores a 2018 (delegaciones), este componente se marca `N.A.` porque el marco legal de planes de gobierno con métricas de desempeño no era homologado. No se penaliza la ausencia; se excluye del cálculo y el score_total se recalcula proporcionalmente entre los componentes disponibles.

### 3.3 Score Deuda (peso 20%)
Evalúa el nivel y la gestión de la deuda pública de la alcaldía, siguiendo el enfoque del FCR3 de Fitch adaptado a nivel municipal.

Subindicadores:
- Nivel de deuda per cápita relativo al promedio de las 16 alcaldías.
- Evolución de la deuda durante el sexenio (¿creció por encima del presupuesto?).
- Tipo de deuda: proveedores, créditos formales, adeudos al GDF/CDMX.
- Existencia de pasivos contingentes documentados (APP, compromisos de largo plazo).

Fuente: Cuenta Pública CDMX, Informe de Deuda Pública CDMX (SAF), datos.cdmx.gob.mx.

### 3.4 Score Patrimonio (peso 15%)
Mide la transparencia patrimonial de los funcionarios de mando superior de cada alcaldía.

Subindicadores:
- Porcentaje de funcionarios obligados que presentaron declaración patrimonial en tiempo.
- Completitud de la información declarada (ingresos, bienes, pasivos).
- Ausencia de observaciones formales o señalamientos de la ASF o contraloría interna.

Fuente: Plataforma Nacional de Transparencia (declaranet.gob.mx), Sistema de Declaraciones CDMX, Informe de Resultados de Fiscalización ASF.

---

## 4. Escala de puntuación por componente

Cada subindicador se convierte a una escala 0–100 usando rangos de referencia definidos a partir de los mejores y peores valores observados en las 16 alcaldías. Los valores extremos (mejor y peor observado) anclan la escala.

| Rango score | Interpretación |
|---|---|
| 80–100 | Confiabilidad alta: cumplimiento sólido y transparencia robusta |
| 60–79 | Confiabilidad media-alta: desempeño aceptable con áreas de mejora |
| 40–59 | Confiabilidad media-baja: brechas importantes en al menos un componente |
| 0–39 | Confiabilidad baja: opacidad estructural o incumplimientos documentados |

---

## 5. Manejo de datos faltantes

**Regla general:** dato faltante ≠ penalización automática.

- Si un componente no tiene dato verificable, se marca `N.A.` en el CSV y `data_faltante: true`.
- El `score_total` se recalcula redistribuyendo el peso del componente faltante proporcionalmente entre los componentes disponibles.
- Ejemplo: si `score_plan = N.A.` (peso 25%), los pesos se redistribuyen: presupuesto=53.3%, deuda=26.7%, patrimonio=20%.
- El mapa visual señalará con un ícono de aviso las alcaldías con `data_faltante: true`.

---

## 6. Cobertura temporal

| Periodo | Marco legal | Nota |
|---|---|---|
| 2018–2024 | Alcaldías (Constitución CDMX 2017) | Cobertura completa de los 4 componentes |
| 2012–2018 | Delegaciones (Estatuto GDF) | `score_plan = N.A.` en todos los casos |
| 2006–2012 | Delegaciones | `score_plan = N.A.`; datos de patrimonio con cobertura parcial |

Las tres ventanas se tratan como continuidad institucional de la misma demarcación territorial, con nota explícita del cambio de marco legal en 2018.

---

## 7. Supuestos clave y limitaciones

1. **Los scores reflejan información disponible públicamente.** No incorporan investigaciones periodísticas ni denuncias no resueltas como datos cuantitativos.
2. **La disponibilidad de datos varía por alcaldía y año.** Las alcaldías con menor digitalización histórica tienen más flags de `data_faltante`, lo que puede subestimar su score real o reflejar genuina opacidad.
3. **El score no es una auditoría.** Es un índice de transparencia institucional basado en información publicada, no en verificación directa de obra o gasto.
4. **Los periodos pre-2018 son comparativamente menos ricos** en datos de plan de gobierno. La serie 2006–2012 y 2012–2018 debe interpretarse con mayor cautela que la de 2018–2024.
5. **Todos los datos se enlazan a su fuente original** en datos.cdmx.gob.mx, tudinero.cdmx.gob.mx, declaranet.gob.mx y ASF para que el ciudadano pueda verificar directamente.

---

## 8. Fuentes de datos

| Componente | Fuente | URL |
|---|---|---|
| Presupuesto ejercido | Portal Datos Abiertos CDMX | https://datos.cdmx.gob.mx/dataset/presupuesto-de-egresos |
| Presupuesto por alcaldía | Tu Ciudad, Tu Dinero | https://tudinero.cdmx.gob.mx |
| Deuda pública | Secretaría de Administración y Finanzas CDMX | https://www.finanzas.cdmx.gob.mx |
| Declaraciones patrimoniales | Plataforma Nacional de Transparencia | https://declaranet.gob.mx |
| Fiscalización | Auditoría Superior de la Federación | https://www.asf.gob.mx |
| Planes de gobierno | Portales de transparencia de cada alcaldía | Varía por demarcación |

