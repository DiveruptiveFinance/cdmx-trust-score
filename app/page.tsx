import Map from "./components/Map";
import Dashboard from "./components/Dashboard";
import ChatWidget from "./components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-border bg-paper-elevated">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight text-primary">
              El Cuentas
            </span>
            <span className="hidden text-sm text-ink-muted sm:inline">
              · Tu alcaldía en claro
            </span>
          </div>
          <nav className="flex gap-5 text-sm text-ink-muted">
            <a href="#ranking" className="hover:text-ink">
              Ranking
            </a>
            <a href="/metodologia" className="hover:text-ink">
              Cómo lo calculamos
            </a>
            <a
              href="https://github.com/DiveruptiveFinance/cdmx-trust-score"
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-14 pb-8">
        <p className="mb-3 inline-block rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-text">
          Hecho por chilangos, para chilangos
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
          Tu alcaldía en un número.
          <br />
          <span className="text-primary">Tu ciudad en claro.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-muted">
          El Cuentas mide qué tan transparente es cada una de las 16 alcaldías
          de la CDMX, con datos oficiales y en un idioma que sí se entiende.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#mapa"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-light"
          >
            Ver mi alcaldía
          </a>
          <a
            href="/metodologia"
            className="rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-ink hover:text-ink-inverse"
          >
            Cómo lo calculamos
          </a>
        </div>

        <div className="mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          <Step n={1} title="Elige tu alcaldía" body="En el mapa de CDMX." />
          <Step n={2} title="Ve su score" body="Del 0 al 100." />
          <Step n={3} title="Entiende el gasto" body="En qué se va tu dinero." />
        </div>

        <p className="mt-6 text-xs text-ink-muted">
          Datos oficiales de{" "}
          <a
            href="https://datos.cdmx.gob.mx"
            className="text-primary-text underline hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            datos.cdmx.gob.mx
          </a>
          . Código abierto. Sin filtros políticos.
        </p>
      </section>

      <section id="mapa" className="mx-auto max-w-6xl px-6 pb-10">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-bold">Mapa de CDMX</h2>
          <span className="text-sm text-ink-muted">
            Toca tu alcaldía. Aquí vive tu dinero.
          </span>
        </div>
        <Map />
      </section>

      <section id="ranking" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-5">
          <h2 className="text-xl font-bold">Ranking en vivo</h2>
          <p className="text-sm text-ink-muted">
            Las 16 alcaldías, ordenadas de más a menos transparentes.
          </p>
        </div>
        <Dashboard />
      </section>

      <footer className="border-t border-border bg-ink text-ink-inverse">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="text-base font-bold">El Cuentas</div>
              <p className="mt-1 max-w-sm text-xs text-ink-inverse/70">
                El Cuentas no acusa, no opina. Traduce la cifra oficial.
                Si un dato cambia en la fuente, el score cambia aquí.
              </p>
            </div>
            <div className="flex gap-6 text-xs">
              <a
                href="https://github.com/DiveruptiveFinance/cdmx-trust-score"
                target="_blank"
                rel="noreferrer"
                className="text-ink-inverse/80 hover:text-primary-light"
              >
                GitHub
              </a>
              <a
                href="https://datos.cdmx.gob.mx"
                target="_blank"
                rel="noreferrer"
                className="text-ink-inverse/80 hover:text-primary-light"
              >
                Fuente: datos.cdmx.gob.mx
              </a>
              <a href="/metodologia" className="text-ink-inverse/80 hover:text-primary-light">
                Metodología
              </a>
            </div>
          </div>
          <div className="mt-6 border-t border-white/10 pt-4 text-[11px] text-ink-inverse/50">
            Construido en el Claude Impact Lab CDMX · 2026.
          </div>
        </div>
      </footer>

      <ChatWidget />
    </main>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-paper-elevated p-5">
      <div className="text-xs font-semibold tracking-widest text-primary-text">
        {String(n).padStart(2, "0")}
      </div>
      <div className="mt-1 text-base font-semibold text-ink">{title}</div>
      <div className="text-sm text-ink-muted">{body}</div>
    </div>
  );
}
