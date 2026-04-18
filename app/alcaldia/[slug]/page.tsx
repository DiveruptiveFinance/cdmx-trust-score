import Link from "next/link";
import ChatWidget from "../../components/ChatWidget";
import AlcaldiaDetail from "./AlcaldiaDetail";

export default async function AlcaldiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← El Cuentas
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/#ranking" className="text-zinc-600 hover:text-zinc-900">
              Ranking
            </Link>
            <Link href="/metodologia" className="text-zinc-600 hover:text-zinc-900">
              Cómo lo calculamos
            </Link>
          </nav>
        </div>
      </header>

      <AlcaldiaDetail slug={slug} />

      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-zinc-500">
          El Cuentas no acusa, no opina. Sólo lee la cifra oficial y la traduce.
          Si un dato cambia en la fuente, el score cambia aquí.
        </div>
      </footer>

      <ChatWidget />
    </main>
  );
}
