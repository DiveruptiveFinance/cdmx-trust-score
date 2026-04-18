import Link from "next/link";
import Logo from "../components/Logo";

export default function MetodologiaPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-border bg-paper-elevated">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-primary-text">
            <span aria-hidden>←</span>
            <Logo size={32} />
          </Link>
          <nav className="flex gap-5 text-sm text-ink-muted">
            <Link href="/#mapa" className="hover:text-ink">Mapa</Link>
            <Link href="/#ranking" className="hover:text-ink">Ranking</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 pb-20 pt-14">
        <p className="mb-3 inline-block rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-text">
          Metodología
        </p>
        <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
          Qué medimos, cómo lo medimos,
          <br />
          <span className="text-primary">y qué no medimos.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-muted">
          El Trust Score es un número del 0 al 100. No mide simpatía ni partido.
          Mide qué tan parecido fue lo que la alcaldía <em>ejerció</em> a lo que
          <em> aprobó</em> — y qué tanto de eso comprobó con documentos.
        </p>

        {/* Tesis central */}
        <div className="mt-10 rounded-2xl border border-border bg-paper-elevated p-6">
          <h2 className="font-display text-xl font-bold">
            La pregunta de fondo
          </h2>
          <p className="mt-3 text-base text-ink">
            Cada año tu alcaldía publica un presupuesto aprobado. Doce meses
            después publica cuánto <strong>ejerció</strong>. Si ambos números se
            parecen y están comprobados, hubo planeación. Si se parecen poco, o
            no hay comprobantes, algo no cuadra.
          </p>
          <p className="mt-3 text-base text-ink-muted">
            El Trust Score es la forma más corta que encontramos de resumir esa
            distancia — sin opinar, sin adjetivos políticos. Solo cifras
            oficiales de la Cuenta Pública CDMX.
          </p>
        </div>

        {/* La fórmula */}
        <div className="mt-8 rounded-2xl border border-primary/30 bg-primary-soft p-6">
          <h2 className="font-display text-xl font-bold text-primary-text">
            La fórmula
          </h2>
          <p className="mt-2 text-sm text-primary-text/90">
            Cuatro componentes. Pesos fijos. Redistribución automática si falta
            un componente.
          </p>
          <div className="mt-5 rounded-xl bg-paper-elevated p-5 font-mono text-[15px] text-ink">
            Score =&nbsp;
            <span className="font-bold text-primary">40%</span> · Presupuesto +&nbsp;
            <span className="font-bold text-primary">30%</span> · Ministraciones +&nbsp;
            <span className="font-bold text-primary">20%</span> · Deuda +&nbsp;
            <span className="font-bold text-primary">10%</span> · Patrimonio
          </div>
        </div>

        {/* Componentes */}
        <div className="mt-10">
          <h2 className="font-display text-2xl font-bold">Los 4 componentes</h2>

          <Componente
            n={1}
            peso={40}
            titulo="Fidelidad presupuestaria"
            body="¿Qué tanto se parece lo ejercido a lo aprobado?"
            formula="score = max(0, 100 − |tasa − 100| × 2)    donde tasa = (ejercido / aprobado) × 100"
            ejemplos={[
              { caso: "Ejerce exactamente lo aprobado (100%)", puntos: "100" },
              { caso: "Subejerce 10% (ejerce 90%)", puntos: "80" },
              { caso: "Sobreejerce 10% (ejerce 110%)", puntos: "80" },
              { caso: "Subejerce 25% (ejerce 75%)", puntos: "50" },
              { caso: "Subejerce 50% (ejerce 50%)", puntos: "0" },
            ]}
            fuente="Cuenta Pública CDMX 2018–2024, Tomo I — Clasificación Administrativa"
          />

          <Componente
            n={2}
            peso={30}
            titulo="Comprobación de ministraciones"
            body="Del dinero que recibió de tesorería, ¿cuánto comprobó con documentos?"
            formula="score = (gasto comprobado / ministración anual) × 100"
            ejemplos={[
              { caso: "Comprueba el 100%", puntos: "100" },
              { caso: "Comprueba el 90%", puntos: "90" },
              { caso: "Comprueba el 70%", puntos: "70" },
            ]}
            fuente="Cuenta Pública CDMX, Tomo I, sección I.2.2.4 ‘Ministraciones y gasto de Alcaldías’"
            notas="Solo hay dato estructurado desde 2021. Para 2018–2020 este componente es N.A."
          />

          <Componente
            n={3}
            peso={20}
            titulo="Política de deuda"
            body="¿La ciudad usa la deuda con disciplina? Refleja calificación crediticia y cumplimiento de límites de endeudamiento."
            formula="score institucional CDMX asignado por año (no se desagrega por alcaldía)"
            ejemplos={[
              { caso: "2018", puntos: "60" },
              { caso: "2019", puntos: "63" },
              { caso: "2020", puntos: "58" },
              { caso: "2021", puntos: "65" },
              { caso: "2022", puntos: "68" },
              { caso: "2023", puntos: "72" },
              { caso: "2024", puntos: "75" },
            ]}
            fuente="Cuenta Pública CDMX, Tomo I, sección I.3; Fitch Ratings AAA(mex) y HR Ratings HR AAA (2024)"
            notas="Limitación honesta: la deuda pública de CDMX no se publica desglosada por alcaldía. Todas las alcaldías reciben el mismo score institucional del año correspondiente."
          />

          <Componente
            n={4}
            peso={10}
            titulo="Transparencia patrimonial"
            body="Declaraciones patrimoniales 3de3 del alcalde/a y funcionarios."
            formula="pendiente de dataset estructurado"
            ejemplos={[]}
            fuente="datos.cdmx.gob.mx — declaraciones 3de3 (2021+)"
            notas="Las declaraciones existen pero no están estructuradas por alcaldía de forma que permita comparación sistemática 2018–2024. Mientras tanto, este componente se marca N.A. y su peso se redistribuye entre los otros tres."
          />
        </div>

        {/* Qué pasa con N.A. */}
        <div className="mt-10 rounded-2xl border border-accent/40 bg-accent-soft p-6">
          <h2 className="font-display text-xl font-bold text-accent-text">
            ¿Qué pasa si falta un dato?
          </h2>
          <p className="mt-3 text-sm text-accent-text">
            No penalizamos con cero. Penalizaríamos a la alcaldía por una
            omisión que puede ser del reporte, no del gasto. En su lugar:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-accent-text">
            <li>
              <strong>Marcamos N.A.</strong> y ponemos una bandera visible
              (<em>&ldquo;score parcial&rdquo;</em>) en la alcaldía.
            </li>
            <li>
              <strong>Redistribuimos proporcionalmente</strong> el peso del
              componente ausente entre los que sí tienen dato.
            </li>
            <li>
              Cuando el dato aparezca en la fuente oficial, el score se
              recalcula automáticamente.
            </li>
          </ul>
        </div>

        {/* Rangos */}
        <div className="mt-10">
          <h2 className="font-display text-2xl font-bold">Cómo leer el score</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <RangoCard
              color="#286634"
              soft="#DCEAE0"
              label="TRANSPARENTE"
              rango="67 – 100"
              body="Ejerció cerca de lo aprobado, comprobó la mayoría de ministraciones, sin sobresaltos de deuda."
            />
            <RangoCard
              color="#F1B12B"
              soft="#FDF1D5"
              label="A MEDIAS"
              rango="34 – 66"
              body="Hay desviaciones notorias entre aprobado y ejercido, o ministraciones con brechas de comprobación."
            />
            <RangoCard
              color="#C0000A"
              soft="#FADADC"
              label="OPACA"
              rango="0 – 33"
              body="Ejecución muy lejana a lo aprobado, o comprobación baja. Pide explicaciones por oficio o acceso a la información."
            />
          </div>
        </div>

        {/* Qué NO mide */}
        <div className="mt-10 rounded-2xl border border-border bg-paper-elevated p-6">
          <h2 className="font-display text-xl font-bold">Qué el score NO dice</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink">
            <li>
              <strong>No dice si hubo corrupción.</strong> Solo puede indicar
              señales para investigar — como sobreejercicios sin justificación
              pública.
            </li>
            <li>
              <strong>No dice si el gasto fue útil.</strong> Una alcaldía puede
              gastar el 100% de lo aprobado en algo irrelevante y tener score
              perfecto. La eficacia del gasto es otra pregunta.
            </li>
            <li>
              <strong>No compara calidad de servicios.</strong> Es una medida
              de disciplina presupuestal, no de satisfacción ciudadana.
            </li>
            <li>
              <strong>No es opinión.</strong> Es aritmética sobre la Cuenta
              Pública oficial publicada por la Secretaría de Administración y
              Finanzas.
            </li>
          </ul>
        </div>

        {/* Supuestos */}
        <div className="mt-10">
          <h2 className="font-display text-2xl font-bold">Supuestos clave</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <SupuestoCard
              titulo="Continuidad territorial"
              body="Las alcaldías son continuación de las delegaciones (hasta 2018). Se tratan como la misma unidad geográfica para comparar histórico."
            />
            <SupuestoCard
              titulo="Pesos corrientes"
              body="Los montos están en pesos del año correspondiente, sin deflactar. Para comparar años con mucha inflación, usa el INPC CDMX como referencia."
            />
            <SupuestoCard
              titulo="Sexenio 2018–2024"
              body="Primer ciclo completo de alcaldías como entes autónomos. El sexenio 2024–2030 inicia con datos 2024 como primer año."
            />
            <SupuestoCard
              titulo="Años sin aprobado"
              body="2018 y 2020 no tienen presupuesto aprobado desagregado por alcaldía en el Tomo I. El componente presupuesto se calcula con el promedio del sexenio como referencia, y se etiqueta como exploratorio."
            />
          </div>
        </div>

        {/* Fuentes */}
        <div className="mt-10 rounded-2xl border border-border bg-paper-elevated p-6">
          <h2 className="font-display text-xl font-bold">Fuentes oficiales</h2>
          <ul className="mt-3 space-y-2.5 text-sm text-ink">
            <li>
              <strong>Gasto programable y ministraciones:</strong>{" "}
              <a
                href="https://servidoresx3.finanzas.cdmx.gob.mx/egresos/"
                target="_blank"
                rel="noreferrer"
                className="text-primary-text underline hover:text-primary"
              >
                servidoresx3.finanzas.cdmx.gob.mx/egresos/
              </a>
              {" — "}Cuenta Pública CDMX 2018–2024, Tomo I
            </li>
            <li>
              <strong>Deuda pública:</strong> Cuenta Pública CDMX, Tomo I, sección I.3; Fitch AAA(mex), HR AAA (Nov–Dic 2024)
            </li>
            <li>
              <strong>Declaraciones patrimoniales:</strong>{" "}
              <a
                href="https://datos.cdmx.gob.mx"
                target="_blank"
                rel="noreferrer"
                className="text-primary-text underline hover:text-primary"
              >
                datos.cdmx.gob.mx
              </a>
            </li>
            <li>
              <strong>Código y metodología abierta:</strong>{" "}
              <a
                href="https://github.com/DiveruptiveFinance/cdmx-trust-score"
                target="_blank"
                rel="noreferrer"
                className="text-primary-text underline hover:text-primary"
              >
                github.com/DiveruptiveFinance/cdmx-trust-score
              </a>
            </li>
          </ul>
        </div>

        {/* Volver */}
        <div className="mt-12">
          <Link
            href="/"
            className="text-sm font-semibold text-ink-muted hover:text-primary-text"
          >
            ← Volver al mapa
          </Link>
        </div>
      </section>

      <footer className="border-t border-border bg-ink text-ink-inverse">
        <div className="mx-auto max-w-4xl px-6 py-6 text-xs text-ink-inverse/70">
          El Cuentas no acusa, no opina. Sólo lee la cifra oficial y la traduce.
          Si un dato cambia en la fuente, el score cambia aquí.
        </div>
      </footer>
    </main>
  );
}

function Componente({
  n,
  peso,
  titulo,
  body,
  formula,
  ejemplos,
  fuente,
  notas,
}: {
  n: number;
  peso: number;
  titulo: string;
  body: string;
  formula: string;
  ejemplos: { caso: string; puntos: string }[];
  fuente: string;
  notas?: string;
}) {
  return (
    <div className="mt-5 rounded-2xl border border-border bg-paper-elevated p-6">
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="font-display text-[11px] font-bold uppercase tracking-widest text-ink-muted">
          Componente {n}
        </span>
        <span className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary-text">
          {peso}% del score
        </span>
      </div>
      <h3 className="mt-2 font-display text-2xl font-bold text-ink">{titulo}</h3>
      <p className="mt-2 text-base text-ink">{body}</p>
      <div className="mt-4 rounded-xl bg-paper p-4 font-mono text-[13px] text-ink-muted">
        {formula}
      </div>
      {ejemplos.length > 0 && (
        <div className="mt-5">
          <div className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
            Ejemplos
          </div>
          <ul className="mt-2 divide-y divide-border text-sm">
            {ejemplos.map((e, i) => (
              <li key={i} className="flex items-center justify-between py-2">
                <span className="text-ink">{e.caso}</span>
                <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-bold tabular-nums text-paper">
                  {e.puntos}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {notas && (
        <p className="mt-4 rounded-xl border border-accent/40 bg-accent-soft p-3 text-[12px] text-accent-text">
          <strong>Nota:</strong> {notas}
        </p>
      )}
      <p className="mt-4 text-[11px] text-ink-muted">Fuente: {fuente}</p>
    </div>
  );
}

function RangoCard({
  color,
  soft,
  label,
  rango,
  body,
}: {
  color: string;
  soft: string;
  label: string;
  rango: string;
  body: string;
}) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ borderColor: `${color}40`, background: soft }}
    >
      <div
        className="font-display text-[18px] font-extrabold tracking-[-0.01em]"
        style={{ color }}
      >
        {label}
      </div>
      <div className="mt-1 font-mono text-lg font-bold text-ink">{rango}</div>
      <p className="mt-2 text-sm text-ink">{body}</p>
    </div>
  );
}

function SupuestoCard({ titulo, body }: { titulo: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-paper-elevated p-5">
      <div className="font-display text-base font-bold text-ink">{titulo}</div>
      <p className="mt-1.5 text-sm text-ink-muted">{body}</p>
    </div>
  );
}
