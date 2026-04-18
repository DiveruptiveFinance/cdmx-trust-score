import Map from "./components/Map";
import ChatWidget from "./components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">
              Claude Impact Lab CDMX · 2026
            </p>
            <h1 className="text-xl font-bold">Trust Score CDMX</h1>
          </div>
          <nav className="flex gap-4 text-sm">
            <a href="/metodologia" className="text-zinc-600 hover:text-zinc-900">
              Metodología
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

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            ¿Qué tan confiable es tu alcaldía?
          </h2>
          <p className="mt-2 max-w-2xl text-zinc-600">
            Un Trust Score 0–100 que mide transparencia presupuestal, cumplimiento
            de plan de gobierno, manejo de deuda y declaraciones patrimoniales.
            Toca una alcaldía en el mapa para ver el detalle.
          </p>
        </div>

        <Map />

        <div className="mt-6 grid gap-4 text-sm text-zinc-600 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              Cobertura
            </div>
            <div className="text-lg font-semibold text-zinc-900">
              16 alcaldías · 3 sexenios
            </div>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              Datos
            </div>
            <div className="text-lg font-semibold text-zinc-900">
              Oficiales · ADIP CDMX
            </div>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              Código
            </div>
            <div className="text-lg font-semibold text-zinc-900">
              100% open source
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-10 border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-zinc-500">
          Proyecto educativo construido en el Claude Impact Lab CDMX 2026.
          Datos basados en fuentes públicas de{" "}
          <a
            href="https://datos.cdmx.gob.mx"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-zinc-900"
          >
            datos.cdmx.gob.mx
          </a>
          . Los scores son indicativos y no constituyen imputaciones legales.
        </div>
      </footer>

      <ChatWidget />
    </main>
  );
}
