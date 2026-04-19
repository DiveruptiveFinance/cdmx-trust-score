export default function HowItWorks() {
  return (
    <section
      id="como"
      className="border-t border-border bg-paper-elevated py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-text">
          Tres pasos
        </span>
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-text">
          Cómo usar El Cuentas
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          En 30 segundos sabes si tu dinero
          <br />
          <span className="text-ink-muted">está bien gastado.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          Sin registrarte, sin descargar nada. Abres, eliges, entiendes.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <Step
            num="01"
            title="Elige tu alcaldía"
            body="Pica sobre el mapa. 16 alcaldías, tres colores: verde, amarillo o rojo."
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="#D62987" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
          />
          <Step
            num="02"
            title="Ve su score"
            body="Un número del 0 al 100. 67-100 transparente, 34-66 a medias, 0-33 opaca."
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="#D62987" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            }
          />
          <Step
            num="03"
            title="Entiende el gasto"
            body="Cuatro sub-scores y hallazgos concretos. Y si quieres más, le preguntas a El Cuentas."
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="#D62987" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}

function Step({
  num,
  title,
  body,
  icon,
}: {
  num: string;
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-border bg-paper p-6 transition hover:border-primary/40 hover:shadow-[0_8px_30px_rgba(214,41,135,0.08)]">
      <div className="font-display absolute right-5 top-4 text-4xl font-extrabold text-primary/15">
        {num}
      </div>
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft">
        {icon}
      </div>
      <h3 className="font-display text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
