"use client";

import { useMemo, useState } from "react";

import { GoogleMapPanel } from "@/components/google-map-panel";
import type { Building } from "@/lib/site-data";

type MapExplorerProps = {
  buildings: Building[];
  cityOptions: string[];
  typeOptions: string[];
};

export function MapExplorer({
  buildings,
  cityOptions,
  typeOptions
}: MapExplorerProps) {
  const [city, setCity] = useState("All");
  const [type, setType] = useState("All");
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(
    buildings[0]?.slug
  );

  const filtered = useMemo(() => {
    const next = buildings.filter((building) => {
      const matchesCity = city === "All" || building.city === city;
      const matchesType = type === "All" || building.type === type;

      return matchesCity && matchesType;
    });

    return next;
  }, [buildings, city, type]);

  const selected = filtered.find((building) => building.slug === selectedSlug);

  return (
    <section className="explorer-grid">
      <div className="catalog-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Google Maps layer</p>
            <h2>Browse entries geographically</h2>
          </div>
          <p className="section-heading__copy">
            Filter by city or type, then select one entry to keep the list and
            map aligned.
          </p>
        </div>

        <div className="catalog-controls catalog-controls--split">
          <label className="field">
            <span className="field__label">City</span>
            <select
              className="field__select"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            >
              <option value="All">All cities</option>
              {cityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">Type</span>
            <select
              className="field__select"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="All">All types</option>
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="catalog-toolbar">
          <p className="catalog-toolbar__count">{filtered.length} map-ready entries</p>
          <p className="catalog-toolbar__hint">
            Filtered entries stay visible as a reading list beside the map.
          </p>
        </div>

        <div className="map-list">
          {filtered.map((building) => (
            <button
              key={building.slug}
              type="button"
              className={`map-list__item${
                building.slug === selected?.slug ? " map-list__item--active" : ""
              }`}
              onClick={() => setSelectedSlug(building.slug)}
            >
              <span className="map-list__title">{building.title}</span>
              <span className="map-list__meta">
                {[building.city, building.district, building.type].join(" / ")}
              </span>
              <span className="map-list__address">{building.roadAddress}</span>
            </button>
          ))}
        </div>
      </div>

      <GoogleMapPanel
        buildings={filtered}
        selectedSlug={selected?.slug}
        onSelect={setSelectedSlug}
        title="Architecture markers in Korea"
        description="Each marker is built from WGS84-ready coordinates so the same schema can later ingest public datasets directly."
      />
    </section>
  );
}
