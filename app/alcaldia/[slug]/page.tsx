import Link from "next/link";
import ChatWidget from "../../components/ChatWidget";
import Logo from "../../components/Logo";
import AlcaldiaDetail from "./AlcaldiaDetail";

export default async function AlcaldiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-border bg-paper-elevated">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-primary-text">
            <span aria-hidden>←</span>
            <Logo size={32} />
          </Link>
          <nav className="flex gap-5 text-sm text-ink-muted">
            <Link href="/#ranking" className="hover:text-ink">
              Ranking
            </Link>
            <Link href="/metodologia" className="hover:text-ink">
              Cómo lo calculamos
            </Link>
          </nav>
        </div>
      </header>

      <AlcaldiaDetail slug={slug} />

      <footer className="border-t border-border bg-ink text-ink-inverse">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-ink-inverse/70">
          El Cuentas no acusa, no opina. Sólo lee la cifra oficial y la traduce.
          Si un dato cambia en la fuente, el score cambia aquí.
        </div>
      </footer>

      <ChatWidget />
    </main>
  );
}
