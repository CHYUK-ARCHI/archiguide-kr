"use client";

import { useDeferredValue, useState } from "react";

import { ArchitectureArt } from "@/components/architecture-art";
import type { Building } from "@/lib/site-data";

type BuildingCatalogProps = {
  buildings: Building[];
  architectNameMap: Record<string, string>;
  cities: string[];
  types: string[];
};

export function BuildingCatalog({
  buildings,
  architectNameMap,
  cities,
  types
}: BuildingCatalogProps) {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filtered = buildings.filter((building) => {
    const architectNames = building.architectSlugs
      .map((slug) => architectNameMap[slug])
      .join(" ")
      .toLowerCase();

    const matchesQuery =
      deferredQuery.length === 0 ||
      building.title.toLowerCase().includes(deferredQuery) ||
      building.summary.toLowerCase().includes(deferredQuery) ||
      building.city.toLowerCase().includes(deferredQuery) ||
      building.type.toLowerCase().includes(deferredQuery) ||
      architectNames.includes(deferredQuery);

    const matchesCity =
      selectedCity === "All" || building.city === selectedCity;
    const matchesType =
      selectedType === "All" || building.type === selectedType;

    return matchesQuery && matchesCity && matchesType;
  });

  return (
    <section className="catalog-panel">
      <div className="catalog-controls">
        <label className="field">
          <span className="field__label">Search</span>
          <input
            className="field__input"
            type="search"
            placeholder="Search by building, city, type, or architect"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label className="field">
          <span className="field__label">City</span>
          <select
            className="field__select"
            value={selectedCity}
            onChange={(event) => setSelectedCity(event.target.value)}
          >
            <option value="All">All cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">Type</span>
          <select
            className="field__select"
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
          >
            <option value="All">All types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="catalog-toolbar">
        <p className="catalog-toolbar__count">{filtered.length} entries visible</p>
        <p className="catalog-toolbar__hint">
          This pilot list is seeded to validate structure before a larger archive is connected.
        </p>
      </div>

      <div className="catalog-grid">
        {filtered.map((building) => (
          <article key={building.slug} id={building.slug} className="catalog-card">
            <ArchitectureArt
              title={building.title}
              label={`${building.city} / ${building.year}`}
              palette={building.palette}
              mode="compact"
            />
            <div className="catalog-card__head">
              <p className="catalog-card__meta">
                {building.city} · {building.district}
              </p>
              <h2 className="catalog-card__title">{building.title}</h2>
            </div>
            <p className="catalog-card__summary">{building.summary}</p>
            <dl className="detail-list">
              <div>
                <dt>Type</dt>
                <dd>{building.type}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{building.status}</dd>
              </div>
              <div>
                <dt>Architect</dt>
                <dd>
                  {building.architectSlugs
                    .map((slug) => architectNameMap[slug])
                    .join(", ")}
                </dd>
              </div>
              <div>
                <dt>Materials</dt>
                <dd>{building.materials.join(", ")}</dd>
              </div>
            </dl>
            <p className="catalog-card__highlight">{building.highlight}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
