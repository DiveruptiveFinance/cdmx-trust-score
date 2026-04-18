"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { Layer, PathOptions } from "leaflet";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";

import { loadScores } from "../lib/loadData";
import { scoreColor, slugify } from "../lib/types";
import type { AlcaldiaScore } from "../lib/types";

const CDMX_CENTER: [number, number] = [19.3909, -99.1436];

export default function MapClient() {
  const [geo, setGeo] = useState<FeatureCollection | null>(null);
  const [scoresByName, setScoresByName] = useState<Record<string, AlcaldiaScore>>({});
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const [g, s] = await Promise.all([
        fetch("/geojson/alcaldias.geojson").then((r) => r.json()),
        loadScores(),
      ]);
      setGeo(g);
      const map: Record<string, AlcaldiaScore> = {};
      s.forEach((row) => (map[row.alcaldia] = row));
      setScoresByName(map);
    })();
  }, []);

  const styleFn = (feature?: Feature<Geometry, { NOMGEO?: string }>): PathOptions => {
    const name = feature?.properties?.NOMGEO ?? "";
    const score = scoresByName[name]?.score_total ?? null;
    return {
      fillColor: scoreColor(score),
      weight: 1.5,
      opacity: 1,
      color: "#ffffff",
      fillOpacity: 0.78,
    };
  };

  const onEachFeature = (feature: Feature<Geometry, { NOMGEO?: string }>, layer: Layer) => {
    const name = feature.properties?.NOMGEO ?? "";
    const score = scoresByName[name]?.score_total ?? null;
    layer.on({
      mouseover: (e) => {
        const target = e.target as { setStyle: (s: PathOptions) => void };
        target.setStyle({ weight: 3, color: "#111827", fillOpacity: 0.92 });
      },
      mouseout: (e) => {
        const target = e.target as { setStyle: (s: PathOptions) => void };
        target.setStyle({ weight: 1.5, color: "#ffffff", fillOpacity: 0.78 });
      },
      click: () => {
        router.push(`/alcaldia/${slugify(name)}`);
      },
    });
    if (layer.bindTooltip) {
      layer.bindTooltip(
        `<strong>${name}</strong><br/>Score: ${score ?? "Sin datos"}`,
        { sticky: true, direction: "top" }
      );
    }
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
      <MapContainer
        center={CDMX_CENTER}
        zoom={10}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geo && (
          <GeoJSON
            data={geo}
            style={styleFn}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>

      <div className="absolute bottom-3 left-3 z-[500] rounded-xl bg-white/95 p-3 text-xs shadow-md">
        <div className="mb-1 font-semibold text-zinc-700">Trust Score</div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded" style={{ background: "#16a34a" }} /> Transparente · 70–100
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded" style={{ background: "#eab308" }} /> A medias · 50–69
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded" style={{ background: "#dc2626" }} /> Opaca · 0–49
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded" style={{ background: "#d1d5db" }} /> Sin datos
        </div>
      </div>
    </div>
  );
}
