"use client";

import { useDeferredValue, useState } from "react";

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
            placeholder="Building, city, type, or architect"
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
          Buildings are listed as an editorial archive rather than a card wall.
        </p>
      </div>

      <div className="archive-list archive-list--catalog">
        {filtered.map((building, index) => (
          <article
            key={building.slug}
            id={building.slug}
            className="archive-row archive-row--catalog"
          >
            <div className="archive-row__number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="archive-row__title">
              <p className="archive-row__kicker">
                {[building.city, building.district].join(" / ")}
              </p>
              <h2 className="archive-row__name">{building.title}</h2>
              <p className="archive-row__minor">
                {building.architectSlugs
                  .map((slug) => architectNameMap[slug])
                  .join(", ")}
              </p>
            </div>

            <div className="archive-row__desc">
              <p>{building.summary}</p>
              <p className="archive-row__highlight">{building.highlight}</p>
            </div>

            <div className="archive-row__meta">
              <span>{building.year}</span>
              <span>{building.type}</span>
              <span>{building.status}</span>
              <span>{building.materials.slice(0, 2).join(", ")}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
