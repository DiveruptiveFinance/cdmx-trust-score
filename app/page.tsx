import Map from "./components/Map";
import Dashboard from "./components/Dashboard";
import ChatWidget from "./components/ChatWidget";
import Logo from "./components/Logo";
import HeroStats from "./components/HeroStats";
import Ticker from "./components/Ticker";
import Capabilities from "./components/Capabilities";
import FAQ from "./components/FAQ";
import HowItWorks from "./components/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-border bg-paper-elevated">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Logo size={36} />
          <nav className="flex items-center gap-5 text-sm text-ink-muted">
            <a href="#como" className="hover:text-ink">Cómo funciona</a>
            <a href="#mapa" className="hover:text-ink">Mapa</a>
            <a href="#ranking" className="hover:text-ink">Ranking</a>
            <a href="/metodologia" className="hover:text-ink">
              Cómo lo calculamos
            </a>
            <a
              href="#mapa"
              className="hidden rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper transition hover:bg-primary sm:inline-block"
            >
              Ver mi alcaldía
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-14">
        <div className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary-text">
          <span
            className="h-2 w-2 rounded-full bg-primary"
            style={{ animation: "pulseDot 1.8s ease-in-out infinite" }}
          />
          En vivo · Cuenta Pública 2018–2024
        </div>

        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-text">
          Hecho por chilangos, para chilangos.
        </p>

        <HeroStats />

        <p className="mt-5 max-w-2xl text-lg text-ink-muted">
          El Cuentas leyó la Cuenta Pública de la CDMX y midió qué tanto se
          parece lo que cada alcaldía <em>ejerció</em> a lo que <em>aprobó</em>.
          Un número del 0 al 100 por alcaldía. Sin jerga. Sin colores de partido.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
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

        <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-ink-muted">
          <li className="inline-flex items-center gap-1.5">
            <span className="text-success-text">✓</span>
            Cuenta Pública CDMX oficial
          </li>
          <li className="inline-flex items-center gap-1.5">
            <span className="text-accent-text">⟳</span>
            Actualizado al ejercicio 2024
          </li>
          <li className="inline-flex items-center gap-1.5">
            <a
              href="https://github.com/DiveruptiveFinance/cdmx-trust-score"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-ink"
            >
              <span className="text-primary-text">{"</>"}</span>
              Código abierto en GitHub
            </a>
          </li>
        </ul>
      </section>

      <Ticker />

      <HowItWorks />

      <section id="mapa" className="mx-auto max-w-6xl px-6 py-14">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-text">
          Paso 1
        </p>
        <div className="mt-2 mb-5 flex items-baseline justify-between gap-4">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Busca tu alcaldía.
            <br />
            <span className="text-ink-muted">Aquí vive tu dinero.</span>
          </h2>
          <span className="hidden text-sm text-ink-muted sm:block">
            Toca una zona del mapa.
          </span>
        </div>
        <Map />
      </section>

      <section id="ranking" className="mx-auto max-w-6xl px-6 pb-16">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-text">
          Paso 2
        </p>
        <div className="mt-2 mb-5">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Quiénes cumplen.
            <br />
            <span className="text-ink-muted">Quiénes te deben explicaciones.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-ink-muted">
            El podio lo hacen los datos. Pica cualquier alcaldía para ver su detalle.
          </p>
        </div>
        <Dashboard />
      </section>

      <section className="border-t border-border bg-paper-elevated py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:grid-cols-[200px_1fr] sm:items-center sm:gap-14">
          <div className="relative mx-auto h-[200px] w-[200px] shrink-0 sm:mx-0">
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-accent"
              style={{ animation: "spin 40s linear infinite" }}
            />
            <div
              className="absolute inset-2 flex items-center justify-center rounded-full bg-paper"
              style={{ animation: "floatAvatar 4s ease-in-out infinite" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icono.svg" alt="El Cuentas" className="h-32 w-32" />
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-text">
              Conócelo
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Quién es El Cuentas?
            </h2>
            <p className="mt-4 max-w-[56ch] text-lg text-ink-muted">
              El único chilango que se leyó los 400 PDFs del presupuesto de la
              CDMX — y todavía se quedó con ganas de más.
            </p>
            <p className="mt-3 max-w-[56ch] text-lg text-ink-muted">
              Ahora te los traduce. Sin jerga, sin colores de partido. Solo la
              cifra oficial, explicada como te la explicaría un compa que sí
              entiende de números.
            </p>
            <p className="font-display mt-5 text-xl italic text-primary-text">
              “Pregúntame lo que quieras. Yo ya leí la letra chiquita.”
            </p>
          </div>
        </div>
      </section>

      <Capabilities />

      <FAQ />

      <footer className="border-t border-border bg-ink text-ink-inverse">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Logo size={32} inverse />
            <p className="font-display mt-4 max-w-[32ch] text-base italic text-ink-inverse/80">
              El Cuentas no acusa, no opina. Traduce la cifra oficial.
            </p>
          </div>
          <FooterCol
            title="Producto"
            links={[
              { label: "Mapa", href: "#mapa" },
              { label: "Ranking", href: "#ranking" },
              { label: "Metodología", href: "/metodologia" },
            ]}
          />
          <FooterCol
            title="Fuentes"
            links={[
              { label: "datos.cdmx.gob.mx", href: "https://datos.cdmx.gob.mx", external: true },
              { label: "Cuenta Pública CDMX", href: "https://servidoresx3.finanzas.cdmx.gob.mx/egresos/", external: true },
            ]}
          />
          <FooterCol
            title="Código"
            links={[
              { label: "GitHub", href: "https://github.com/DiveruptiveFinance/cdmx-trust-score", external: true },
              { label: "Claude Impact Lab", href: "https://www.anthropic.com", external: true },
            ]}
          />
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[11px] text-ink-inverse/60">
            <span>
              Datos oficiales. El Cuentas no acusa ni opina — <strong>traduce</strong>.
            </span>
            <span>Construido en el Claude Impact Lab CDMX · abril 2026</span>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </main>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h5 className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
        {title}
      </h5>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer" : undefined}
              className="text-sm text-ink-inverse/80 transition hover:text-accent"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
