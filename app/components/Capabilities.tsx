export default function Capabilities() {
  return (
    <section id="capacidades" className="border-t border-border bg-paper py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-text">
          Transparencia total
        </p>
        <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Qué hace · y qué no hace.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          Porque la única forma de construir confianza es decirte también lo que
          no somos. Sin humo, sin letras chiquitas.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {/* SÍ HACE */}
          <div className="rounded-2xl border border-border bg-paper-elevated p-7">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15 text-lg font-bold text-success-text">
                ✓
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-success-text">
                  Qué sí hace
                </div>
                <div className="font-display text-lg font-bold">
                  El Cuentas te ayuda a…
                </div>
              </div>
            </div>
            <ul className="mt-5 space-y-4 text-[14.5px] leading-relaxed">
              <CapItem good>
                <strong>Leer datos oficiales</strong> de la Cuenta Pública y de
                datos.cdmx.gob.mx. Yo me los leo para que tú no tengas que.
              </CapItem>
              <CapItem good>
                <strong>Medir transparencia</strong> con un score 0–100 por
                alcaldía, basado en lo ejercido vs. lo aprobado.
              </CapItem>
              <CapItem good>
                <strong>Comparar presupuesto vs. gasto real.</strong> Si dijeron
                que iban a gastar X y gastaron Y, el score lo refleja.
              </CapItem>
              <CapItem good>
                <strong>Revisar cumplimiento por año y sexenio.</strong>
                Ventana 2018–2024 de la Cuenta Pública.
              </CapItem>
              <CapItem good>
                <strong>Responder en lenguaje natural.</strong> Pregúntame como
                a un compa que sí leyó todo.
              </CapItem>
              <CapItem good>
                <strong>Actualizar con la fuente oficial.</strong> Si un dato
                cambia en la Cuenta Pública, aquí también cambia.
              </CapItem>
            </ul>
          </div>

          {/* NO HACE */}
          <div className="rounded-2xl border border-border bg-paper-elevated p-7">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger/15 text-lg font-bold text-danger-text">
                ✕
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-danger-text">
                  Qué no hace
                </div>
                <div className="font-display text-lg font-bold">
                  El Cuentas no es…
                </div>
              </div>
            </div>
            <ul className="mt-5 space-y-4 text-[14.5px] leading-relaxed">
              <CapItem>
                <strong>No detecto corrupción.</strong> Detecto{" "}
                <em>opacidad</em>. Son primas, no gemelas.
              </CapItem>
              <CapItem>
                <strong>No opino de política.</strong> Si tu alcaldía cumple lo
                que prometió, el score sube — aunque no te guste quién la
                dirige.
              </CapItem>
              <CapItem>
                <strong>No sustituyo una auditoría.</strong> Soy un semáforo,
                no un fiscal.
              </CapItem>
              <CapItem>
                <strong>No mido calidad de servicios.</strong> Una banqueta
                nueva puede estar mal hecha — eso lo ves con los ojos, no
                conmigo.
              </CapItem>
              <CapItem>
                <strong>No invento datos.</strong> Prefiero un &ldquo;no
                sé&rdquo; honesto a una respuesta inventada.
              </CapItem>
              <CapItem>
                <strong>No soy de nadie.</strong> No pertenezco a alcaldía,
                partido, medio ni gobierno. Soy código abierto, de la ciudad.
              </CapItem>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapItem({
  children,
  good = false,
}: {
  children: React.ReactNode;
  good?: boolean;
}) {
  return (
    <li className="flex gap-3">
      <span
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-paper ${
          good ? "bg-success" : "bg-danger"
        }`}
        aria-hidden
      >
        {good ? "✓" : "✕"}
      </span>
      <span className="text-ink">{children}</span>
    </li>
  );
}
