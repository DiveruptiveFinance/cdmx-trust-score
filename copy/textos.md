<!--
Tagline elegido: "El Cuentas · Tu alcaldía en claro."
Alternativas para Wen:
  1. "El Cuentas · Sabe dónde vive tu dinero."
  2. "El Cuentas · El único chilango que leyó los 400 PDFs."
-->

# Textos del sitio — El Cuentas

> Copy maestro del sitio. Español mexicano, voz activa, directa.
> Framework: StoryBrand (Miller) + Tribu/Purple Cow (Godin).
> Hero = ciudadano de CDMX. Guía = El Cuentas (personaje, nickname chilango). Propuesta = respuestas claras sobre tu dinero.

---

## Landing / Header

- **Nombre del producto:** El Cuentas
- **Tagline (1 línea):** El Cuentas · Tu alcaldía en claro.
- **Subtítulo (1-2 líneas):** El Cuentas mide qué tan transparente es cada una de las 16 alcaldías de la CDMX, con datos oficiales y en un idioma que sí se entiende.
- **CTA principal (botón):** Ver mi alcaldía
- **CTA secundario (link):** Cómo lo calculamos

### Bloque de apoyo (opcional, arriba del fold)

- **Kicker:** Hecho por chilangos, para chilangos.
- **Prueba social / autoridad:** Datos oficiales de [datos.cdmx.gob.mx](https://datos.cdmx.gob.mx). Código abierto. Sin filtros políticos.

### Los 3 pasos (plan simple, StoryBrand)

1. **Elige tu alcaldía** en el mapa.
2. **Ve su score** del 0 al 100.
3. **Entiende en qué gasta** tu dinero.

---

## Mapa (pantalla principal)

- **Instrucción al entrar:** Toca tu alcaldía. Aquí vive tu dinero.
- **Tooltip al pasar sobre alcaldía:**
  - Línea 1: **[NOMBRE_ALCALDÍA]**
  - Línea 2: Score [NÚMERO]/100 · [NIVEL]
  - Línea 3 (hint): Toca para ver el detalle
- **Leyenda del semáforo:**
  - Verde · Transparente · [NÚMERO]–100
  - Amarillo · A medias · [NÚMERO]–[NÚMERO]
  - Rojo · Opaca · 0–[NÚMERO]
- **Filtros:**
  - Sexenio: [Actual] · [Anterior] · [Todos]
  - Año: [AÑO]
  - Rubro: Presupuesto · Plan de gobierno · Deuda · Patrimonio

### Mensajes de estado del mapa

- **Cargando:** Sumando los datos oficiales… un momento.
- **Sin datos:** Esta alcaldía aún no publica información suficiente para calcular su score. Eso también dice algo.
- **Error:** Algo falló de nuestro lado. Intenta otra vez en un minuto.

---

## Detalle de alcaldía

- **Header:**
  - Título: [NOMBRE_ALCALDÍA]
  - Subtítulo: Titular: [NOMBRE_TITULAR] · Sexenio [AÑO_INICIO]–[AÑO_FIN]
- **Label del score total:** Trust Score
  - Helper: Qué tan transparente es esta alcaldía con tu dinero y tus datos.
- **Labels de los 4 sub-scores:**
  1. **Presupuesto** — ¿Gasta lo que prometió gastar?
  2. **Plan de gobierno** — ¿Cumple lo que dijo que iba a hacer?
  3. **Deuda** — ¿Debe con medida o está apretando la cuerda?
  4. **Patrimonio** — ¿Declara lo que tiene quien firma los cheques?

### Zona de hallazgos

- **Título:** Lo que encontramos
- **Intro (1 línea):** Tres cosas que tu alcaldía debería explicarte.

**Ejemplo tipo 1 (presupuesto):**
> En [AÑO], [NOMBRE_ALCALDÍA] gastó [NÚMERO]% más en [RUBRO] de lo que aprobó. No publicó el porqué.
> _Fuente: [datos.cdmx.gob.mx](https://datos.cdmx.gob.mx)_

**Ejemplo tipo 2 (plan):**
> Prometió [NÚMERO] obras de [RUBRO] para [AÑO]. Entregó [NÚMERO].
> _Fuente: [datos.cdmx.gob.mx](https://datos.cdmx.gob.mx)_

**Ejemplo tipo 3 (patrimonio):**
> [NÚMERO] de [NÚMERO] funcionarios obligados aún no publican su declaración patrimonial.
> _Fuente: [datos.cdmx.gob.mx](https://datos.cdmx.gob.mx)_

### Fuentes y disclaimer (pie del detalle)

- **Fuentes:** Todos los datos vienen de registros públicos: [datos.cdmx.gob.mx](https://datos.cdmx.gob.mx), Cuenta Pública CDMX, y las declaraciones patrimoniales publicadas por cada alcaldía.
- **Disclaimer:** El Cuentas no acusa, no opina. Sólo lee la cifra oficial y la traduce. Si un dato cambia en la fuente, el score cambia aquí.

---

## Widget agente (chat flotante)

- **Placeholder del input:** Pregúntale al Cuentas… por ejemplo: ¿en qué gastó mi alcaldía?
- **Saludo inicial (1-2 líneas):**
  > Qué onda, soy El Cuentas. Yo me leí los presupuestos para que tú no tengas que. Pregúntame lo que quieras de tu alcaldía.
- **3 preguntas sugeridas (chips):**
  1. ¿Quieres saber cuál alcaldía cumplió más?
  2. ¿Te cuento en qué gasta [NOMBRE_ALCALDÍA]?
  3. ¿Le checo a tu alcaldía cuánto debe?
- **Mensaje de loading:** Déjame revisar los datos oficiales…
- **Mensaje de error:** No pude responder eso ahorita. Intenta reformular tu pregunta o pregúntame otra cosa.
- **Mensaje sin datos:** No tengo suficiente información pública para contestarte con honestidad. Prefiero decírtelo a inventar.

---

## /metodologia

### Intro — ¿Qué es el Trust Score?

Un número del 0 al 100 que te dice qué tan transparente es tu alcaldía con tu dinero.

No es una calificación política. No mide si te cae bien el titular. Mide si cumple lo que prometió, si gasta lo que dijo que iba a gastar, si debe con medida y si quien firma declara lo que tiene.

### Cómo se calcula — los 4 componentes

El Trust Score combina cuatro sub-scores. Cada uno pesa distinto porque no todo vale lo mismo.

1. **Cumplimiento presupuestario · [NÚMERO]%**
   Compara lo que la alcaldía dijo que iba a gastar (presupuesto aprobado) con lo que de verdad gastó (cuenta pública). Si coinciden, sube. Si hay desviación sin explicación, baja.

2. **Cumplimiento del plan de gobierno · [NÚMERO]%**
   Lee el Programa de Gobierno de la alcaldía y cuenta cuántas metas cumplió en tiempo. Si prometió [NÚMERO] y entregó [NÚMERO], el score lo refleja.

3. **Manejo de deuda · [NÚMERO]%**
   Mide el peso de la deuda sobre los ingresos. No castiga tener deuda — castiga tenerla sin plan.

4. **Transparencia patrimonial · [NÚMERO]%**
   Cuenta cuántos funcionarios obligados publicaron su declaración patrimonial en tiempo y forma. Si los que firman los cheques no declaran, el score baja.

### De dónde vienen los datos

- [datos.cdmx.gob.mx](https://datos.cdmx.gob.mx) — portal oficial de datos abiertos
- Cuenta Pública de la Ciudad de México
- Programa General de Desarrollo y Programas de Gobierno de cada alcaldía
- Declaraciones patrimoniales publicadas en la Plataforma Digital Nacional

Actualizamos el score cada [PERIODICIDAD]. La última actualización se muestra en el detalle de cada alcaldía.

### Qué NO hace el score (limitaciones honestas)

Seamos claros para no venderte humo.

- **No detecta corrupción.** Detecta opacidad. Son primas, no gemelas.
- **No opina de política.** Si tu alcaldía cumple lo que prometió, sube. Aunque no te guste quién la dirige.
- **No sustituye una auditoría.** Somos un semáforo, no un fiscal.
- **Depende de lo que se publica.** Si la alcaldía no publica, el score se queda corto. Y eso también aparece en el reporte.
- **No mide calidad de servicios.** Una banqueta nueva puede estar mal hecha. Eso lo ves con los ojos, no con un score.

### Disclaimer legal y reputacional

El Cuentas es una herramienta ciudadana de código abierto. No está afiliado a ninguna alcaldía, partido político, gobierno o medio de comunicación.

Los datos mostrados provienen de fuentes oficiales publicadas por el Gobierno de la Ciudad de México y sus alcaldías. Si detectas un error, escríbenos: corregimos en público.

El score es una interpretación metodológica, no un juicio legal. No constituye prueba en procesos administrativos ni judiciales.

---

## Footer

### Links

- Inicio
- Mapa
- Metodología
- Código en GitHub
- Contacto

### Crédito open source

Hecho por ciudadanos para ciudadanos. El Cuentas es software libre bajo licencia [LICENCIA]. El código vive en GitHub: [ENLACE_REPO].

El Cuentas vive en código abierto. El que quiera sumarse, bienvenido. Si le encuentras un error, ábrelo como issue. Si quieres ayudar, los PRs son bienvenidos.

### Disclaimer corto

Datos de fuentes oficiales. El Cuentas no acusa ni opina — traduce. Última actualización: [FECHA].

### Línea de cierre (microcopy)

Tu dinero. Tu ciudad. Tus preguntas. El Cuentas los traduce.
