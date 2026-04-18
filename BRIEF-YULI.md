# Brief — Yuli (Datos + Trust Score)

**Tu rol:** Calcular el **Trust Score 0-100** para las 16 alcaldías de CDMX, en los últimos 3 sexenios.

**Deadline:** Entrega de archivos **antes de la hora 4** (dejamos 1 hora de integración).

---

## Fuente de datos

Portal oficial: https://datos.cdmx.gob.mx

Datasets que necesitas:
1. **Presupuesto ejercido** (por alcaldía y rubro)
2. **Deuda pública** de CDMX
3. **Declaraciones patrimoniales** de funcionarios
4. **Plan de gobierno** de cada alcaldía (si está disponible como dato abierto)

---

## Entregables (subir a la carpeta `/data` del repo de GitHub)

### 1. `scores.csv`

Columnas EXACTAS (respétalas, el frontend las lee literal):

```
alcaldia,sexenio,score_total,score_presupuesto,score_plan,score_deuda,score_patrimonio,data_faltante
```

- `alcaldia`: nombre oficial (ej. "Iztapalapa", "Miguel Hidalgo")
- `sexenio`: formato `2018-2024`, `2024-2030`, etc.
- `score_*`: número 0-100 (o vacío si falta data)
- `data_faltante`: `true` o `false`

### 2. `hallazgos.csv`

```
alcaldia,sexenio,hallazgo_narrativo
```

- 1-2 frases jugosas por fila. Ej: "Iztapalapa ejerció solo 62% del presupuesto 2022 en obras públicas, el resto no tiene destino claro."
- Mínimo 5 hallazgos fuertes (el demo los usa).

### 3. `metodologia.md`

Explicación humana de:
- Cómo se pondera cada componente (ej. "40/30/20/10")
- Cómo manejas data faltante
- Supuestos clave

---

## Reglas duras

- **No inventes datos.** Si falta algo, pregúntale a Magni antes — puede conseguirlo manual.
- **Data faltante** = marcar `N.A.` + flag visible. NO penalices con 0 automáticamente.
- **Nombres de alcaldías** consistentes (sin acentos o con, pero uniforme).
- **Sexenios cambian de nombre en CDMX** (delegaciones hasta 2018, alcaldías después). Trátalos como continuidad pero nota el cambio.

---

## Qué NO haces

- No tocas código.
- No decides UI.
- No escribes el pitch.

---

## Cómo subir los archivos al GitHub

1. Abre el link del repo (te lo pasa Magni).
2. Entra a la carpeta `/data`.
3. Click en **"Add file"** → **"Upload files"**.
4. Arrastra tus CSVs y el `.md`.
5. Escribe un mensaje corto abajo (ej. "Primera versión de scores").
6. Click **"Commit changes"**.

Listo. Magni los ve en tiempo real.
