# CDMX Trust Score

Plataforma open source + agente de IA para medir la **transparencia y confiabilidad** de las 16 alcaldías de CDMX.

Construido en el **Claude Impact Lab CDMX** — sábado 18 de abril de 2026.

---

## Para el equipo (guía no-técnica)

### 📌 Si eres la financiera

Tu casa es la carpeta **`/data`**. Lee **`BRIEF-FINANCIERA.md`** primero.

**Cómo subir un archivo:**
1. Entra al repo en GitHub (el link que te pasó Magni).
2. Click en la carpeta **`data`**.
3. Arriba a la derecha: botón **"Add file"** → **"Upload files"**.
4. Arrastra tus CSVs o archivos `.md`.
5. Abajo de la página, escribe algo corto tipo "Primera versión de scores".
6. Click verde **"Commit changes"**.

Listo. Ya está en el repo.

### 📌 Si eres la marketera

Tu casa son las carpetas **`/design`** y **`/copy`**. Lee **`BRIEF-MARKETERA.md`** primero.

**Cómo subir archivos:** igual que arriba, pero en la carpeta que toque.

**Cómo editar un archivo de texto directamente (sin bajarlo):**
1. Click en el archivo (ej. `copy/textos.md`).
2. Click en el ícono de **lápiz ✏️** arriba a la derecha.
3. Edita como un documento normal.
4. Abajo: **"Commit changes"**.

### 📌 Ambas — reglas importantes

- ❌ **No toquen carpetas que no les corresponden.** Código y configuración son responsabilidad de Magni.
- ❌ **No borren archivos** aunque parezcan raros. Pregunten antes.
- ✅ **Commitean seguido.** Cada archivo subido actualiza la web en vivo.
- ✅ **Pregunten si no entienden algo.** Mejor preguntar que romper.

---

## Estructura del repo

```
/app               ← Código Next.js (solo Magni)
/public            ← Imágenes y CSVs servidos al navegador
  /data            ← CSVs que genera la financiera (montados aquí)
  /design          ← Assets que genera la marketera (montados aquí)
/data              ← Archivos fuente de la financiera (CSVs, .md)
/design            ← Archivos fuente de la marketera (logo, paleta)
/copy              ← Textos del sitio y pitch
BRIEF-FINANCIERA.md
BRIEF-MARKETERA.md
CLAUDE.md          ← Contexto del proyecto para IAs
README.md          ← Este archivo
```

---

## Stack técnico (para referencia)

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind
- **Mapa:** Leaflet + GeoJSON de alcaldías CDMX
- **Agente IA:** Claude API
- **Deploy:** Vercel
- **Datos:** datos.cdmx.gob.mx (portal oficial CDMX)

---

## URL pública

- **Desarrollo:** _pendiente_ (se actualiza al desplegar)
- **Producción:** _pendiente_
