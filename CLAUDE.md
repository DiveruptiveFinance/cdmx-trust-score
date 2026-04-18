# CLAUDE.md — Contexto del proyecto

Este archivo es el contexto del proyecto para **cualquier IA o agente** que ayude al equipo (Claude Code, ChatGPT, etc.). Léelo completo antes de dar recomendaciones.

---

## Qué es este proyecto

Estamos construyendo una **plataforma open source + agente de IA** para el **Claude Impact Lab CDMX** (sábado 18 de abril de 2026, build time 5-6 horas).

**Nombre del producto:** pendiente (lo define Wendy).

**Track elegido:** 💰 Follow the Money (puro).

**Core del producto:** un **Trust Score 0-100** que mide qué tan transparente, fiel y confiable es cada **alcaldía de CDMX** (y sus titulares) en:
1. Cumplimiento presupuestario (¿cuánto ejerció vs cuánto presupuestó?)
2. Cumplimiento del plan de gobierno (¿hizo lo que prometió?)
3. Manejo de deuda pública
4. Transparencia patrimonial (declaraciones de funcionarios)

**Usuario target:** ciudadano común. No técnico. Entra, ve un mapa de CDMX coloreado por score, le pica a su alcaldía, entiende en 30 segundos qué pasa con su dinero.

---

## Equipo (3 personas)

| Persona | Rol | Artefactos que produce |
|---------|-----|-----------------------|
| **Magni** (Jorge) | Product + Build (infra, código, integración) | Repo Next.js, mapa, widget agente, deploy Vercel |
| **Yuli** | Datos + Score | `data/scores.csv`, `data/hallazgos.csv`, `data/metodologia.md` |
| **Wendy** | UI + Pitch | `design/logo.svg`, `design/paleta.md`, `design/wireframe.png`, `copy/textos.md`, `copy/pitch.md` |

---

## Decisiones cerradas (de la sesión de Q&A)

### Tracks y scope
- Track: **Follow the Money puro** (no híbrido con salud).
- Usuario target: **ciudadano común** (no periodista, no servidor público).
- Entregable: **repo GitHub con código + README**. Opcional: deploy Vercel público.

### Datasets MVP
- ✅ Presupuesto ejercido (por alcaldía y rubro)
- ✅ Deuda pública
- ✅ Transparencia / declaraciones patrimoniales
- ✅ Plan de gobierno (con riesgo — PDFs a parsear)
- ❌ Padrón de proveedores (fuera del MVP)

### Trust Score
- **Unidad:** alcaldías + sus titulares (un alcalde hereda el score de su alcaldía en su periodo).
- **Componentes:** los 4 mencionados arriba.
- **Presentación:** número **0-100** + breakdown por componente.
- **Ponderación:** PENDIENTE — Yuli decide después de explorar los datos.
- **Cobertura:** las **16 alcaldías**.
- **Ventana temporal:** **últimos 3 sexenios** (nota: alcaldías como tales existen desde 2018, antes eran delegaciones — tratarlas como continuidad).
- **Data faltante:** marcar N.A. + flag visible, NO penalizar con 0.

### Experiencia del usuario
- **Pantalla principal:** mapa interactivo de CDMX coloreado por score (verde/amarillo/rojo).
- **Detalle de alcaldía:** score total + sub-scores + hallazgos narrativos.
- **Filtros:** alcaldía, año/rango, rubro de gasto, sexenio.
- **Agente de IA:** widget flotante tipo Intercom, disponible en todas las páginas.
  - Prioridad 1: Q&A natural sobre los datos (text-to-SQL / RAG)
  - Prioridad 2: reportes personalizados
  - Prioridad 3: detección de anomalías
- **Idioma:** español (pendiente confirmar si bilingüe).
- **Vibe visual:** **amigable ciudadano** (colorido, accesible — NO institucional aburrido).

### Stack técnico
- **Frontend + backend:** Next.js (App Router) + TypeScript + Tailwind.
- **Deploy:** Vercel.
- **Datos:** CSVs en `/public/data/`, leídos client-side o server-side.
- **Mapa:** Leaflet + GeoJSON de alcaldías CDMX.
- **Agente:** Claude API (Anthropic SDK).
- **Nivel de ambición:** **medio** — multi-agent coordinado + UI pulida.

### Demo (2 minutos)
1. Hook (0:00-0:15)
2. Mostrar mapa CDMX completo (0:15-0:45)
3. Zoom a la **mejor alcaldía** (hero aspiracional) — breakdown + hallazgo (0:45-1:30)
4. Pregunta en vivo al agente (1:30-1:50)
5. Cierre + CTA open source (1:50-2:00)

### Legal / reputacional
- Disclaimer visible en footer.
- Página `/metodologia` que explica el cálculo del score.
- Todos los datos linkeados a su fuente original en datos.cdmx.gob.mx.

---

## Reglas duras

1. **No inventar datos.** Si falta, marcar N.A. o preguntar a Magni.
2. **Respetar esquemas de CSV** (columnas exactas — ver `BRIEF-YULI.md`).
3. **El mapa es más importante que el agente.** Si hay que recortar, el agente va primero.
4. **Open source desde minuto 1.** Todo se commitea al repo. Nada en carpetas privadas.
5. **Enlaces a fuentes originales** siempre visibles (defensa legal + credibilidad).

---

## Pendientes (se resuelven durante el build)

- [ ] Nombre final del producto (Wendy)
- [ ] Ponderación exacta del score (Yuli, post-exploración de datos)
- [ ] ¿Plan de gobierno es data disponible o hay que scrape? (Yuli explora)
- [ ] ¿Bilingüe? (idioma final)
- [ ] URL final de Vercel

---

## Cómo contribuye cada persona (para los agentes que las asisten)

### Si asistes a Yuli
- Su output es **datos**, no código.
- Ayúdala a limpiar CSVs de datos.cdmx.gob.mx.
- Ayúdala a definir una fórmula simple y defendible para el score.
- Respeta el esquema de `BRIEF-YULI.md`.
- NO sugieras cambios a la UI o al pitch.

### Si asistes a Wendy
- Su output es **diseño + copy**, no código.
- Ayúdala con logos (SVG), paletas accesibles, wireframes, copy claro.
- El vibe es "amigable ciudadano", no corporate ni institucional.
- NO sugieras cambios a la fórmula del score ni a la arquitectura técnica.

### Si asistes a Magni
- Ayúdalo con Next.js, Leaflet, Claude API, Vercel.
- Prioridad: mapa → detalle → agente → pulido.
- Si surge un tradeoff de tiempo, cortar el agente primero, no el mapa.

---

## Integración

- **Un solo repo** en GitHub. Magni es dueño del merge.
- Cada 45 min, Magni pulla lo subido por el equipo y lo integra.
- Vercel auto-deploya al hacer push a `main`.
- Sync por WhatsApp/Discord cada 30 min.
