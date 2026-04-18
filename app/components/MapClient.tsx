"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { Layer, PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";

import { loadScores } from "../lib/loadData";
import { scoreColor } from "../lib/types";
import type { AlcaldiaScore } from "../lib/types";
import AlcaldiaDrawer from "./AlcaldiaDrawer";

const CDMX_CENTER: [number, number] = [19.3909, -99.1436];

export default function MapClient() {
  const [geo, setGeo] = useState<FeatureCollection | null>(null);
  const [scoresByName, setScoresByName] = useState<Record<string, AlcaldiaScore>>({});
  const [activeAlcaldia, setActiveAlcaldia] = useState<string | null>(null);

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
      color: "#FFFCF5",
      fillOpacity: 0.82,
    };
  };

  const onEachFeature = (feature: Feature<Geometry, { NOMGEO?: string }>, layer: Layer) => {
    const name = feature.properties?.NOMGEO ?? "";
    const score = scoresByName[name]?.score_total ?? null;
    layer.on({
      mouseover: (e) => {
        const target = e.target as { setStyle: (s: PathOptions) => void };
        target.setStyle({ weight: 3, color: "#1A1A1A", fillOpacity: 0.92 });
      },
      mouseout: (e) => {
        const target = e.target as { setStyle: (s: PathOptions) => void };
        target.setStyle({ weight: 1.5, color: "#FFFCF5", fillOpacity: 0.82 });
      },
      click: () => {
        setActiveAlcaldia(name);
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
    <>
    <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-border shadow-sm">
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

      <div className="absolute bottom-3 left-3 z-[500] space-y-1 rounded-xl border border-border bg-paper-elevated/95 p-3 text-xs shadow-md backdrop-blur-sm">
        <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-ink-muted">
          Trust Score
        </div>
        <div className="flex items-center gap-2 text-ink">
          <span className="h-3 w-3 rounded-sm" style={{ background: "#286634" }} />
          Transparente · 67–100
        </div>
        <div className="flex items-center gap-2 text-ink">
          <span className="h-3 w-3 rounded-sm" style={{ background: "#F1B12B" }} />
          A medias · 34–66
        </div>
        <div className="flex items-center gap-2 text-ink">
          <span className="h-3 w-3 rounded-sm" style={{ background: "#C0000A" }} />
          Opaca · 0–33
        </div>
        <div className="flex items-center gap-2 text-ink-muted">
          <span className="h-3 w-3 rounded-sm border border-border" style={{ background: "#E8E0CC" }} />
          Sin datos
        </div>
      </div>
    </div>
    <AlcaldiaDrawer
      alcaldia={activeAlcaldia}
      onClose={() => setActiveAlcaldia(null)}
    />
    </>
  );
}
