# Brief: Video 2 min · El Cuentas · Remotion

**Responsable:** quien se apunte a ejecutar este prompt (idealmente con Claude Code o Cursor).
**Deadline:** antes del pitch final (hora 5).
**Output:** `out/elcuentas-2min.mp4` — 1920x1080, 60 fps, H.264, <50 MB.

---

## Cómo usarlo

1. Abre una sesión nueva de Claude Code o Cursor en una carpeta vacía.
2. Copia TODO el prompt de abajo (desde "Eres un editor de video…" hasta "Rompela.").
3. Pégalo. Deja que el agente genere el proyecto Remotion.
4. Renderea con `npx remotion render src/index.ts video out/elcuentas-2min.mp4`.
5. Sube el MP4 a este repo en `/video/elcuentas-2min.mp4`.

---

## Prompt (copia todo esto y pégalo)

```
Eres un editor de video + motion designer. Genera un proyecto Remotion (React + TS) para un video de 2 minutos exactos (60 fps, 1920x1080) que explica El Cuentas.

## Qué es El Cuentas
Plataforma open source + agente de IA personificado que mide la transparencia de las 16 alcaldías de CDMX con un score 0–100. Producto del hackathon Claude Impact Lab.

Repo: github.com/DiveruptiveFinance/cdmx-trust-score (ver /design/prototype.html, /copy/textos.md, /copy/pitch.md, /design/paleta.md, /design/logo/)

## Voz y framework (obligatorio)
- **Donald Miller StoryBrand**: hero = ciudadano CDMX, problema = no sabe en qué gasta su alcaldía, guía = El Cuentas, plan = 3 pasos, éxito = ciudadano informado, fracaso = seguir en la oscuridad.
- **Seth Godin**: Purple Cow = "el único chilango que se leyó los 400 PDFs del presupuesto". Tribu = "nuestra ciudad, nuestro dinero". Permission = respetar el tiempo del espectador, cada frame pelea.
- Tono: amigable, directo, orgulloso mexicano, niño de 12 entiende. Nunca institucional. Ortografía perfecta en español (acentos, ñ, ¿?, ¡!).

## Paleta (tokens Barragán Moderno)
- Crema `#FFFCF5` (fondo)
- Rosa `#D62987` (brand, CTAs, highlights)
- Ocre `#F1B12B` (acento cálido)
- Bugambilia `#86299C` (acento secundario)
- Verde `#286634`, Amarillo `#F1B12B`, Rojo `#C0000A` (semáforo del score)
- Carbón `#1A1A1A` (texto)
- Tipografías: Fraunces 700/800 (display) + Inter 400/500/600 (body). Google Fonts.

## Estructura del video (exactamente 2 min · 7200 frames @ 60 fps)

### Escena 1 · 0:00–0:12 — Hook (problema)
- Pantalla carbón. Texto blanco grande Fraunces 800: "¿Sabes en qué gasta tu alcaldía?"
- Counter gigante animando: "$247,392,418" en rosa
- Subtítulo Inter 500: "Esta semana. De tu dinero."
- Pausa de 1s en silencio visual
- Cierre: "Y nadie te lo explica."

### Escena 2 · 0:12–0:30 — Agitación (problema interno)
- Split screen: imágenes de PDFs apilados + gráficos de presupuesto en crudo
- Texto animado tipo scrollyteller: "400 páginas de presupuesto.", "En 5 documentos distintos.", "Publicados en 3 portales diferentes."
- Fade a negro con texto rosa: "Hasta hoy."

### Escena 3 · 0:30–0:55 — El Cuentas aparece (guía)
- Logo El Cuentas entra con reveal elegante (fade + subtle scale). Usa el SVG de `/design/logo/el-cuentas-logo.svg`.
- Voice-over copy (o texto en pantalla): "Les presento a El Cuentas. Es el primer chilango que se leyó los 400 PDFs del presupuesto de CDMX. Y te los traduce."
- Mockup del prototipo animándose: mapa de CDMX con alcaldías pintándose por zona (verde/amarillo/rojo)
- Highlight en 3 alcaldías top con animación tipo podio

### Escena 4 · 0:55–1:25 — Cómo funciona (plan de 3 pasos)
- Tres bloques secuenciales, cada uno con ícono + número grande Fraunces 800 + texto corto:
  1. "01 · Elige tu alcaldía" — animación de cursor clickeando una alcaldía del mapa
  2. "02 · Ve su score" — anillo semáforo llenándose 0→64 con count-up
  3. "03 · Entiende en qué gasta" — 4 sub-scores apareciendo en cascada, veredicto grande "A MEDIAS" tipo Rotten Tomatoes
- Ritmo rápido, 10 segundos por bloque

### Escena 5 · 1:25–1:45 — Agente en vivo (Purple Cow)
- Mockup del widget chat abriéndose
- Saludo animándose tipo typewriter: "Qué onda, soy El Cuentas. Yo me leí los presupuestos para que tú no tengas que."
- Usuario escribe: "¿Por qué Cuauhtémoc bajó 8 puntos?"
- Respuesta tipeada con dato específico + link a fuente
- Tag en esquina: "Datos oficiales · datos.cdmx.gob.mx"

### Escena 6 · 1:45–2:00 — Cierre (tribu + CTA)
- Fondo crema, logo El Cuentas centrado grande
- Texto Fraunces 800 secuencial:
  - "El Cuentas es código abierto."
  - "No es mío. No es de Anthropic."
  - "Es tuyo." (pausa 1s)
- CTA final: "github.com/DiveruptiveFinance/cdmx-trust-score"
- Tagline: "Tu alcaldía en claro."

## Requerimientos técnicos
- Remotion v4+, React 18, TypeScript
- Usar `<Sequence>`, `<AbsoluteFill>`, `spring()`, `interpolate()` para animaciones
- Integrar Google Fonts (Fraunces, Inter) con `@remotion/google-fonts`
- Audio: generar track simple con `@remotion/media-utils` (beat chilango sutil, 80 BPM) o dejar sin audio para voice-over posterior
- Exportar config: 1920x1080, 60 fps, H.264, target size <50 MB
- Respetar `prefers-reduced-motion` en accesibilidad (si Remotion lo soporta en preview)

## Entrega
Estructura completa del proyecto Remotion con:
- `src/Root.tsx` — registra la composición
- `src/Video.tsx` — orquestador de escenas
- `src/scenes/Scene1Hook.tsx` → `src/scenes/Scene6Close.tsx`
- `src/theme.ts` — tokens Barragán (colores + fuentes)
- `src/assets/` — placeholder para logo (usa el SVG del repo en `/design/logo/el-cuentas-logo.svg`)
- `README.md` con comando para render

Cero lorem ipsum. Todo el copy está arriba.

Rompela.
```

---

## Referencias del repo

- **Copy definitivo:** [`copy/textos.md`](./copy/textos.md), [`copy/pitch.md`](./copy/pitch.md)
- **Paleta + tokens:** [`design/paleta.md`](./design/paleta.md)
- **Logo SVG:** [`design/logo/el-cuentas-logo.svg`](./design/logo/el-cuentas-logo.svg)
- **Prototipo interactivo:** [`design/prototype.html`](./design/prototype.html) — abrir en Chrome

## Dónde subir el MP4 final

```bash
mkdir -p video
mv /path/to/elcuentas-2min.mp4 video/elcuentas-2min.mp4
git add video/elcuentas-2min.mp4
git commit -m "Video: 2 min explainer El Cuentas (Remotion)"
git push
```
