export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-16 text-zinc-900">
      <div className="max-w-2xl text-center">
        <p className="mb-3 text-xs uppercase tracking-widest text-zinc-500">
          Claude Impact Lab CDMX · 2026
        </p>
        <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
          Trust Score CDMX
        </h1>
        <p className="mb-8 text-lg text-zinc-600">
          Qué tan transparente, fiel y confiable es cada alcaldía de la Ciudad de México.
          Datos públicos. Código abierto. Ciudadano al centro.
        </p>

        <div className="mb-10 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-10">
          <p className="text-sm text-zinc-500">
            🗺️ Mapa interactivo de las 16 alcaldías — próximamente hoy.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <a
            href="https://github.com/DiveruptiveFinance/cdmx-trust-score"
            className="rounded-full border border-zinc-300 px-4 py-2 hover:border-zinc-900"
            target="_blank"
            rel="noreferrer"
          >
            Código en GitHub
          </a>
          <a
            href="https://datos.cdmx.gob.mx"
            className="rounded-full border border-zinc-300 px-4 py-2 hover:border-zinc-900"
            target="_blank"
            rel="noreferrer"
          >
            Fuente: datos.cdmx.gob.mx
          </a>
        </div>
      </div>

      <footer className="mt-16 text-xs text-zinc-400">
        Construido hoy por 3 personas. Datos oficiales de la ADIP.
      </footer>
    </main>
  );
}
