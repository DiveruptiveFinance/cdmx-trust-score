"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] w-full items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50">
      <p className="text-sm text-zinc-500">Cargando mapa de CDMX…</p>
    </div>
  ),
});

export default function Map() {
  return <MapClient />;
}
