# /design — Carpeta de branding (Wendy)

> **Para la IA que asista a Wendy:** léete este archivo completo. El copy ya está mergeado en `/copy/textos.md` y `/copy/pitch.md`. El landing, el mapa y el chat ya usan el tono y las frases de Wendy. Falta el **branding visual**.

## Nombre del producto (ya definido)

**El Cuentas** · Tu alcaldía en claro.

## Qué hace falta subir a esta carpeta

| Archivo | Formato | Uso en el código |
|---|---|---|
| `logo.svg` | SVG limpio, un solo color o dos | Header del sitio y favicon |
| `logo-light.svg` (opcional) | SVG blanco | Para el header del chat (fondo oscuro) |
| `paleta.md` | Markdown con hex | Sustituye los `zinc-*` actuales por la paleta real |
| `wireframe.png` | Imagen | Referencia, no se sirve al usuario |
| `tipografia.md` (opcional) | Markdown | Si queremos fonts distintas a Geist |

### Formato esperado de `paleta.md`

```markdown
# Paleta · El Cuentas

## Colores primarios
- Primary:   #RRGGBB   (para CTA, badges, brand)
- Secondary: #RRGGBB   (acentos, links)

## Semáforo del Trust Score
- Transparente (verde):  #RRGGBB   (70-100)
- A medias (amarillo):   #RRGGBB   (50-69)
- Opaca (rojo):          #RRGGBB   (0-49)
- Sin datos (gris):      #RRGGBB

## Neutros
- Texto principal:   #RRGGBB
- Texto secundario:  #RRGGBB
- Fondo:             #RRGGBB
- Borde:             #RRGGBB
```

## Tono visual (del brief)

- **Vibe:** amigable ciudadano, NO institucional ni corporate.
- **Personalidad:** chilango, directo, honesto. "Yo me leí los PDFs por ti."
- **No queremos:** azules gobierno, serif aburridas, mucho texto.
- **Sí queremos:** colores con personalidad, tipografía limpia, espacios amplios.

## Dónde se aplicará el branding (ya está cableado en código)

1. **Header del landing** (`app/page.tsx`) — logo arriba-izquierda, texto "El Cuentas · Tu alcaldía en claro".
2. **Header del detalle de alcaldía** (`app/alcaldia/[slug]/page.tsx`).
3. **ChatWidget** (`app/components/ChatWidget.tsx`) — header oscuro con nombre "El Cuentas" y subtítulo "El único chilango que leyó los 400 PDFs."
4. **Mapa** (`app/components/MapClient.tsx`) — la leyenda usa hex actualmente hardcoded: verde `#16a34a`, amarillo `#eab308`, rojo `#dc2626`, gris `#d1d5db`. Cambiar en `app/lib/types.ts` (función `scoreColor`).
5. **Favicon** — reemplazar `app/favicon.ico` por uno basado en el logo.

## Mensajes de copy que YA están usados (no cambiar, son de Wendy)

- Tagline: *El Cuentas · Tu alcaldía en claro.*
- Hero: *Tu alcaldía en un número. Tu ciudad en claro.*
- Kicker: *Hecho por chilangos, para chilangos.*
- Map: *Toca tu alcaldía. Aquí vive tu dinero.*
- Chat greeting: *Qué onda, soy El Cuentas. Yo me leí los presupuestos para que tú no tengas que…*
- Chat placeholder: *Pregúntale al Cuentas…*
- Disclaimer: *El Cuentas no acusa ni opina — traduce.*

## Flujo para subir archivos (Wendy desde GitHub web)

1. Entra a https://github.com/DiveruptiveFinance/cdmx-trust-score
2. Ve a la carpeta `design/`
3. Click **Add file → Upload files**
4. Arrastra tus archivos (logo.svg, paleta.md, wireframe.png)
5. Abajo, en "Commit changes":
   - Title: `design: logo + paleta + wireframe`
   - Description: breve contexto
   - Selecciona **"Create a new branch"** → nombre: `wendy/branding`
   - Click **Propose changes**
6. En la pantalla siguiente click **Create pull request**
7. Pégale el link del PR a Magni por WhatsApp

## Qué NO tocar (lo maneja Magni)

- `app/` (código de la app)
- `public/data/` y `public/geojson/` (datos y geometría)
- `supabase/` (base de datos)
- `package.json`, configs, etc.

## Pendientes tuyos que no bloquean el push

- Logo final (bloquea cambios visuales al header)
- Paleta final (bloquea el esquema de colores del sitio)
- Revisión del pitch en vivo con Magni antes del demo

---

**Status actual del sitio (2026-04-18):**
- ✅ Copy de Wendy integrado en landing, mapa, chat y detalle
- ✅ Dashboard funcional con top 3 / bottom 3 y ranking
- ✅ Página de detalle por alcaldía
- ❌ Branding visual (logo + paleta) — **pendiente de Wendy**
- ⏳ Datos reales computados por Yuli — pendiente
