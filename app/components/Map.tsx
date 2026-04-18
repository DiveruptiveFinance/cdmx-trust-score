"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] w-full items-center justify-center rounded-2xl border border-border bg-paper-elevated">
      <p className="text-sm text-ink-muted">Sumando los datos oficiales…</p>
    </div>
  ),
});

export default function Map() {
  return <MapClient />;
}
