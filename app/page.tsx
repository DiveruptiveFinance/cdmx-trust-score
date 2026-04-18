import Map from "./components/Map";
import Dashboard from "./components/Dashboard";
import ChatWidget from "./components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">
              Hecho por chilangos, para chilangos
            </p>
            <h1 className="text-xl font-bold">
              El Cuentas <span className="font-normal text-zinc-500">· Tu alcaldía en claro</span>
            </h1>
          </div>
          <nav className="flex gap-4 text-sm">
            <a href="#ranking" className="text-zinc-600 hover:text-zinc-900">
              Ranking
            </a>
            <a href="/metodologia" className="text-zinc-600 hover:text-zinc-900">
              Cómo lo calculamos
            </a>
            <a
              href="https://github.com/DiveruptiveFinance/cdmx-trust-score"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:text-zinc-900"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Claude Impact Lab CDMX · 2026
        </p>
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
          Tu alcaldía en un número.<br />Tu ciudad en claro.
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-600">
          El Cuentas mide qué tan transparente es cada una de las 16 alcaldías
          de la CDMX, con datos oficiales y en un idioma que sí se entiende.
        </p>

        <div className="mt-6 grid max-w-3xl grid-cols-1 gap-3 text-sm sm:grid-cols-3">
          <Step n={1} title="Elige tu alcaldía" body="En el mapa de CDMX." />
          <Step n={2} title="Ve su score" body="Del 0 al 100." />
          <Step n={3} title="Entiende el gasto" body="En qué se va tu dinero." />
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Datos oficiales de{" "}
          <a
            href="https://datos.cdmx.gob.mx"
            className="underline hover:text-zinc-900"
            target="_blank"
            rel="noreferrer"
          >
            datos.cdmx.gob.mx
          </a>
          . Código abierto. Sin filtros políticos.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="text-lg font-semibold">Mapa de CDMX</h3>
          <span className="text-xs text-zinc-500">
            Toca tu alcaldía. Aquí vive tu dinero.
          </span>
        </div>
        <Map />
      </section>

      <section id="ranking" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Ranking en vivo</h3>
          <p className="text-sm text-zinc-500">
            Las 16 alcaldías ordenadas de más a menos transparentes.
          </p>
        </div>
        <Dashboard />
      </section>

      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-zinc-500">
          El Cuentas no acusa ni opina — traduce. Datos de fuentes oficiales.
          Código abierto en{" "}
          <a
            href="https://github.com/DiveruptiveFinance/cdmx-trust-score"
            className="underline hover:text-zinc-900"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          . Construido en el Claude Impact Lab CDMX 2026.
        </div>
      </footer>

      <ChatWidget />
    </main>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 p-4">
      <div className="text-xs font-semibold text-zinc-400">{String(n).padStart(2, "0")}</div>
      <div className="mt-0.5 text-sm font-semibold text-zinc-900">{title}</div>
      <div className="text-xs text-zinc-500">{body}</div>
    </div>
  );
}
