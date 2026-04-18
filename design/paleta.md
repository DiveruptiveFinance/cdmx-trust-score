# Paleta CDMX Trust Score — Barragán Moderno

Paleta arquitectónica mexicana inspirada en Luis Barragán: bugambilia sobre ocre, verde derbyshire, crema papel. Rosa mexicano es el color de marca (una sola firma cromática, regla Daima). Ocre y bugambilia son acentos decorativos. 60-30-10: 60% neutros (crema + carbón), 30% rosa, 10% ocre/bugambilia/verde.

---

## Tokens base (formato brief del repo)

```
PRIMARIO: #D62987   /* Rosa mexicano — brand signature */
ACENTO:   #F1B12B   /* Ocre Barragán — decorativo */
VERDE:    #286634   /* Verde Derbyshire — score alto / OK */
AMARILLO: #F1B12B   /* Ocre — score medio / warning */
ROJO:     #C0000A   /* Cerámica — score bajo / alerta */
FONDO:    #FFFCF5   /* Crema papel */
```

---

## Tokens duales (Tailwind / CSS vars)

Cada acento tiene dos versiones: **vivid** para fondos/botones/bloques de color, **text** para tipografía y elementos finos sobre crema. Esto evita el problema del ocre (contraste 1.85 sobre crema, imposible como texto).

```css
:root {
  /* Neutros — 60% del lienzo */
  --color-bg:             #FFFCF5;  /* crema papel, fondo default */
  --color-bg-elevated:    #FFFFFF;  /* cards sobre crema */
  --color-bg-inverse:     #1A1A1A;  /* carbón, footer/hero oscuro */
  --color-ink:            #1A1A1A;  /* texto principal */
  --color-ink-muted:      #4A4A4A;  /* texto secundario */
  --color-ink-inverse:    #FFFCF5;  /* texto sobre carbón */
  --color-border:         #E8E0CC;  /* borde sutil sobre crema */
  --color-border-strong:  #1A1A1A;  /* borde carbón */

  /* Brand — Rosa mexicano (signature, 30%) */
  --color-primary:        #D62987;  /* vivid: botones, headlines, bloques */
  --color-primary-text:   #B52272;  /* text-safe: links, small text sobre crema */
  --color-primary-light:  #DE539F;  /* sobre carbón */
  --color-primary-soft:   #FBE5F1;  /* bg pill, hover states */

  /* Ocre Barragán — acento decorativo (10%) */
  --color-accent:         #F1B12B;  /* vivid: bloques, highlights, dividers */
  --color-accent-text:    #846117;  /* text-safe: tipografía sobre crema */
  --color-accent-light:   #F2B840;  /* sobre carbón */
  --color-accent-soft:    #FDF1D5;  /* bg pill */

  /* Bugambilia — acento decorativo (10%) */
  --color-violet:         #86299C;  /* vivid: bloques, bordes de card */
  --color-violet-text:    #712284;  /* text-safe */
  --color-violet-light:   #AA69B9;  /* sobre carbón */
  --color-violet-soft:    #F1E0F5;  /* bg pill */

  /* Semáforo del score — texto SIEMPRE acompaña al color */
  --color-success:        #286634;  /* verde derbyshire, score >=67 */
  --color-success-text:   #22562C;
  --color-success-soft:   #DCEAE0;
  --color-warning:        #F1B12B;  /* ocre, score 34-66 */
  --color-warning-text:   #846117;
  --color-warning-soft:   #FDF1D5;
  --color-danger:         #C0000A;  /* cerámica, score <=33 */
  --color-danger-text:    #A30008;
  --color-danger-soft:    #FADADC;

  /* Focus ring (a11y keyboard nav) */
  --color-focus:          #D62987;
  --ring-focus:           0 0 0 3px rgba(214, 41, 135, 0.35);
}
```

### Mapeo Tailwind (para Magni)

```js
// tailwind.config.js — extend.colors
{
  paper:    '#FFFCF5',
  ink:      '#1A1A1A',
  primary:  { DEFAULT: '#D62987', text: '#B52272', light: '#DE539F', soft: '#FBE5F1' },
  accent:   { DEFAULT: '#F1B12B', text: '#846117', light: '#F2B840', soft: '#FDF1D5' },
  violet:   { DEFAULT: '#86299C', text: '#712284', light: '#AA69B9', soft: '#F1E0F5' },
  success:  { DEFAULT: '#286634', text: '#22562C', soft: '#DCEAE0' },
  warning:  { DEFAULT: '#F1B12B', text: '#846117', soft: '#FDF1D5' },
  danger:   { DEFAULT: '#C0000A', text: '#A30008', soft: '#FADADC' },
}
```

---

## Roles y uso

| Token | Rol | Úsalo para | NO lo uses para |
|---|---|---|---|
| `bg` / `paper` | Fondo default | Cuerpo de página, cards sobre crema | Texto |
| `ink` | Texto principal | Headlines, body, nav | Fondos grandes (usa `bg-inverse`) |
| `primary` | Brand | CTA principal, headline hero, bloque destacado | Body text (usa `primary-text`) |
| `primary-text` | Rosa para leer | Links inline, badges, small caps | Fondos grandes |
| `accent` (ocre) | Decorativo | Bloques de color, dividers gruesos, iconos grandes | Texto sobre crema — NUNCA |
| `accent-text` | Ocre para leer | Labels pequeños, captions | Bloques grandes (usa `accent`) |
| `violet` (bugambilia) | Decorativo | Borde izquierdo de cards, acento en data-viz | Texto sobre crema < 18px |
| `success/warning/danger` | Semáforo | Score cards, badges de zona | Decoración arbitraria |

---

## Semáforo del score (regla WCAG A — no depender solo de color)

Todo estado del score debe combinar **color + texto + icono**. Nunca solo color.

```tsx
// Alto (verde)
<ScoreBadge color="success" icon={Check} label="Transparente" value={82} />

// Medio (ocre)
<ScoreBadge color="warning" icon={AlertTriangle} label="Parcial" value={54} />

// Bajo (rojo)
<ScoreBadge color="danger" icon={XCircle} label="Opaco" value={21} />
```

Rangos: `>=67 success` · `34-66 warning` · `<=33 danger`.

---

## Audit WCAG 2.1 (relative luminance, fórmula estándar)

### Pares críticos validados

| Par | Ratio | Nivel | Uso |
|---|---|---|---|
| Carbón `#1A1A1A` sobre crema `#FFFCF5` | **16.99** | AAA | Body text default |
| Rosa `#D62987` sobre crema | **4.53** | AA text | CTA, headlines |
| Bugambilia `#86299C` sobre crema | **7.29** | AAA | Texto decorativo |
| Verde `#286634` sobre crema | **6.74** | AAA | Badge success |
| Rojo `#C0000A` sobre crema | **6.31** | AAA | Badge danger |
| Blanco sobre rosa `#D62987` | **4.64** | AA text | Botón primario |
| Blanco sobre bugambilia | **7.47** | AAA | Card oscura |
| Blanco sobre verde | **6.91** | AAA | Badge success filled |
| Blanco sobre rojo | **6.47** | AAA | Badge danger filled |
| Carbón sobre ocre `#F1B12B` | **9.17** | AAA | Botón ocre con texto negro |

### Pares que FALLAN (y cómo se resolvieron)

| Par | Ratio | Problema | Solución |
|---|---|---|---|
| Ocre `#F1B12B` sobre crema | 1.85 | No sirve para texto ni para gráficos | Usar `accent-text` `#846117` (5.53 AA). Ocre vivid solo como bloque de color, nunca como texto |
| Blanco sobre ocre | 1.90 | No sirve para texto en botones ocre | Texto sobre ocre SIEMPRE en carbón `#1A1A1A` (9.17 AAA) |
| Carbón sobre rosa | 3.75 | Falla AA para body text | Sobre rosa usar blanco (4.64 AA). Carbón sobre rosa solo para texto >=18px bold |
| Bugambilia/verde/rojo sobre carbón | 2.33-2.69 | Insuficiente contraste | Usar versiones `-light` (`#AA69B9`, `#689370`, `#D9666C`) que pasan AA |

### Para gráficos/data-viz (regla 3:1)

Cuando uses el ocre como barra/línea de gráfica sobre crema, acompáñalo siempre de **stroke carbón 1px** o patrón — el color solo no alcanza 3:1. Los demás acentos (rosa, bugambilia, verde, rojo) pasan 3:1 directo sobre crema.

---

## Notas de implementación para Magni

1. Default dark text: `text-ink` sobre `bg-paper` — nunca tocar eso salvo en hero oscuro
2. Botón primario: `bg-primary text-white` (4.64 AA)
3. Botón secundario: `bg-accent text-ink` (9.17 AAA) — OJO, texto negro, nunca blanco
4. Link inline: `text-primary-text underline` — nunca `text-primary` sobre crema con text-sm
5. Focus visible siempre: `focus-visible:ring-[3px] focus-visible:ring-primary/35`
6. Score card: borde izquierdo 4px con `border-{success|warning|danger}` + icono + label + número
7. Dark sections (hero/footer): `bg-ink` + texto `ink-inverse`, acentos con sufijo `-light`

---

## Moodboard de referencia

Barragán — Casa Estudio: muro ocre + bugambilia real + crema cal + acento rosa. Derbyshire pottery verde profundo. Cerámica talavera rojo. Papel algodón crema (no blanco puro — evita el glare y suaviza contraste para lectura larga).
