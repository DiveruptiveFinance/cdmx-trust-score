# Brief — Marketera (UI + Pitch)

**Tu rol:** Diseño de la plataforma + pitch de 2 minutos.

**Deadline:**
- Assets de diseño: **hora 4**.
- Pitch final: **hora 5**.

---

## Vibe

**Amigable ciudadano** — colorido, accesible. NO institucional aburrido. Piensa: un niño de 12 años entiende qué pasa al entrar a la página.

---

## Entregables (subir a carpetas del repo)

### 1. `/design/logo.svg` (o .png alta resolución)

- Logo del producto. Nombre pendiente — lo decides tú con el equipo. Propuestas: `CuentasClarasMX`, `TransparentaCDMX`, `FidelioCDMX`, o el tuyo.
- Debe verse bien en el header (pequeño) y en el pitch (grande).

### 2. `/design/paleta.md`

Colores hex del sistema:
- 1 color primario (headers, botones)
- 1 color acento (CTAs)
- 3 colores de score: verde (bueno), amarillo (mid), rojo (malo)
- 1 color neutro fondo

Ejemplo de formato:
```
PRIMARIO: #...
ACENTO: #...
VERDE: #...
AMARILLO: #...
ROJO: #...
FONDO: #...
```

### 3. `/design/wireframe.png` (Figma o Canva exportado)

Bocetos de 3 pantallas:
- **Mapa de CDMX** con las 16 alcaldías coloreadas por score (pantalla principal)
- **Detalle de alcaldía** — score total + breakdown de 4 sub-scores + hallazgos
- **Widget flotante del agente** — esquina inferior derecha, abre un chat

### 4. `/copy/textos.md`

Todo el texto en **español**. Copia este template y lo llenas:

```markdown
# Textos del sitio

## Landing / Header
- Nombre: [...]
- Tagline: [...]
- CTA principal: [...]

## Mapa
- Instrucción: [ej. "Haz click en tu alcaldía"]
- Tooltip: [ej. "Score: 45/100"]

## Detalle alcaldía
- Header: [...]
- Label score total: [ej. "Confiabilidad"]
- Labels sub-scores: [presupuesto, plan, deuda, patrimonio]
- Label hallazgos: [ej. "Banderas rojas"]

## Widget agente
- Placeholder input: [ej. "Pregunta sobre tu alcaldía..."]
- Saludo inicial: [...]

## /metodologia
- Intro: [...]
- Disclaimer: [ej. "Datos de datos.cdmx.gob.mx. Esta herramienta es informativa..."]
```

### 5. `/copy/pitch.md`

Script del pitch de 2 minutos. Template:

```markdown
# Pitch — 2 minutos

## Hook (0:00 - 0:15)
[Frase fuerte de apertura. Ej: "El gobierno de CDMX gasta 250 mil millones al año. ¿Sabes en qué?"]

## Demo mapa (0:15 - 0:45)
- Mostrar mapa completo de CDMX
- Señalar top-3 alcaldías (mejor score)
- Señalar bottom-3 (peor score)

## Zoom al hero case (0:45 - 1:30)
- Click en la MEJOR alcaldía
- Mostrar breakdown del score
- Leer 1 hallazgo fuerte

## Agente en vivo (1:30 - 1:50)
- Preguntar al widget: "¿Por qué [alcaldía] sacó buen score?"
- Dejar que responda

## Cierre (1:50 - 2:00)
- [Call to action. Ej: "Todo el código es open source. Cualquier ciudad del mundo puede replicarlo mañana."]
```

Ensáyalo mínimo 2 veces antes del demo.

---

## Qué NO haces

- No tocas código.
- No calculas scores.
- No decides la fórmula.

---

## Cómo subir archivos al GitHub (sin código)

1. Abre el link del repo (te lo pasa Magni).
2. Navega a la carpeta correcta (`/design` o `/copy`).
3. Click en **"Add file"** → **"Upload files"**.
4. Arrastra el archivo.
5. Mensaje corto abajo (ej. "Primera versión del logo").
6. Click **"Commit changes"**.

Los archivos `.md` (texto) los puedes editar directo en GitHub:
1. Click en el archivo → ícono de lápiz ✏️
2. Edita como documento normal.
3. Abajo: "Commit changes".
