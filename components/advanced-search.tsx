"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { GoogleMapPanel } from "@/components/google-map-panel";
import type { Building } from "@/lib/site-data";

type AdvancedSearchProps = {
  buildings: Building[];
  architectNameMap: Record<string, string>;
  cityOptions: string[];
  districtOptions: string[];
  typeOptions: string[];
  statusOptions: string[];
  accessOptions: string[];
  materialOptions: string[];
  structureOptions: string[];
  heritageOptions: string[];
  sourceSystemOptions: string[];
  yearRange: {
    min: number;
    max: number;
  };
};

export function AdvancedSearch({
  buildings,
  architectNameMap,
  cityOptions,
  districtOptions,
  typeOptions,
  statusOptions,
  accessOptions,
  materialOptions,
  structureOptions,
  heritageOptions,
  sourceSystemOptions,
  yearRange
}: AdvancedSearchProps) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All");
  const [district, setDistrict] = useState("All");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [access, setAccess] = useState("All");
  const [material, setMaterial] = useState("All");
  const [structure, setStructure] = useState("All");
  const [heritage, setHeritage] = useState("All");
  const [sourceSystem, setSourceSystem] = useState("All");
  const [imagesOnly, setImagesOnly] = useState(false);
  const [yearMin, setYearMin] = useState(String(yearRange.min));
  const [yearMax, setYearMax] = useState(String(yearRange.max));
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(
    buildings[0]?.slug
  );

  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filtered = useMemo(() => {
    const minYear = Number(yearMin) || yearRange.min;
    const maxYear = Number(yearMax) || yearRange.max;

    return buildings.filter((building) => {
      const architectText = building.architectSlugs
        .map((slug) => architectNameMap[slug])
        .join(" ")
        .toLowerCase();
      const sourceText = building.sourceRefs
        .map((source) => source.system)
        .join(" ")
        .toLowerCase();
      const tagText = building.tags.join(" ").toLowerCase();
      const materialText = building.materials.join(" ").toLowerCase();
      const addressText = `${building.address} ${building.roadAddress}`.toLowerCase();

      const matchesQuery =
        deferredQuery.length === 0 ||
        building.title.toLowerCase().includes(deferredQuery) ||
        building.summary.toLowerCase().includes(deferredQuery) ||
        building.highlight.toLowerCase().includes(deferredQuery) ||
        building.city.toLowerCase().includes(deferredQuery) ||
        building.district.toLowerCase().includes(deferredQuery) ||
        architectText.includes(deferredQuery) ||
        sourceText.includes(deferredQuery) ||
        tagText.includes(deferredQuery) ||
        materialText.includes(deferredQuery) ||
        addressText.includes(deferredQuery);

      const matchesCity = city === "All" || building.city === city;
      const matchesDistrict = district === "All" || building.district === district;
      const matchesType = type === "All" || building.type === type;
      const matchesStatus = status === "All" || building.status === status;
      const matchesAccess = access === "All" || building.publicAccess === access;
      const matchesMaterial =
        material === "All" || building.materials.includes(material);
      const matchesStructure =
        structure === "All" || building.structureLabel === structure;
      const matchesHeritage =
        heritage === "All" || building.heritageClass === heritage;
      const matchesSource =
        sourceSystem === "All" ||
        building.sourceRefs.some((source) => source.system === sourceSystem);
      const matchesImages = !imagesOnly || building.imagesAvailable;
      const matchesYear = building.year >= minYear && building.year <= maxYear;

      return (
        matchesQuery &&
        matchesCity &&
        matchesDistrict &&
        matchesType &&
        matchesStatus &&
        matchesAccess &&
        matchesMaterial &&
        matchesStructure &&
        matchesHeritage &&
        matchesSource &&
        matchesImages &&
        matchesYear
      );
    });
  }, [
    access,
    architectNameMap,
    buildings,
    city,
    deferredQuery,
    district,
    heritage,
    imagesOnly,
    material,
    sourceSystem,
    status,
    structure,
    type,
    yearMax,
    yearMin,
    yearRange.max,
    yearRange.min
  ]);

  const selected =
    filtered.find((building) => building.slug === selectedSlug) ?? filtered[0];

  useEffect(() => {
    if (filtered.length === 0) {
      setSelectedSlug(undefined);
      return;
    }

    if (!filtered.some((building) => building.slug === selectedSlug)) {
      setSelectedSlug(filtered[0].slug);
    }
  }, [filtered, selectedSlug]);

  return (
    <div className="search-layout">
      <section className="catalog-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Advanced search</p>
            <h2>Filter with schema-ready facets</h2>
          </div>
          <p className="section-heading__copy">
            Filters stay aligned to public Korean building, GIS, heritage, and
            tourism fields so the archive can expand without changing its logic.
          </p>
        </div>

        <div className="search-grid">
          <label className="field field--wide">
            <span className="field__label">Keyword</span>
            <input
              className="field__input"
              type="search"
              placeholder="Title, architect, tag, address, source"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

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
            <span className="field__label">District</span>
            <select
              className="field__select"
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
            >
              <option value="All">All districts</option>
              {districtOptions.map((option) => (
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

          <label className="field">
            <span className="field__label">Status</span>
            <select
              className="field__select"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="All">All statuses</option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">Public access</span>
            <select
              className="field__select"
              value={access}
              onChange={(event) => setAccess(event.target.value)}
            >
              <option value="All">All access levels</option>
              {accessOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">Material</span>
            <select
              className="field__select"
              value={material}
              onChange={(event) => setMaterial(event.target.value)}
            >
              <option value="All">All materials</option>
              {materialOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">Structure</span>
            <select
              className="field__select"
              value={structure}
              onChange={(event) => setStructure(event.target.value)}
            >
              <option value="All">All structures</option>
              {structureOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">Heritage</span>
            <select
              className="field__select"
              value={heritage}
              onChange={(event) => setHeritage(event.target.value)}
            >
              <option value="All">All heritage classes</option>
              {heritageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">Source system</span>
            <select
              className="field__select"
              value={sourceSystem}
              onChange={(event) => setSourceSystem(event.target.value)}
            >
              <option value="All">All sources</option>
              {sourceSystemOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">From year</span>
            <input
              className="field__input"
              type="number"
              value={yearMin}
              min={yearRange.min}
              max={yearRange.max}
              onChange={(event) => setYearMin(event.target.value)}
            />
          </label>

          <label className="field">
            <span className="field__label">To year</span>
            <input
              className="field__input"
              type="number"
              value={yearMax}
              min={yearRange.min}
              max={yearRange.max}
              onChange={(event) => setYearMax(event.target.value)}
            />
          </label>
        </div>

        <label className="toggle">
          <input
            type="checkbox"
            checked={imagesOnly}
            onChange={(event) => setImagesOnly(event.target.checked)}
          />
          <span>
            Only show entries that already have image-ready media metadata.
          </span>
        </label>

        <div className="catalog-toolbar">
          <p className="catalog-toolbar__count">{filtered.length} entries match</p>
          <p className="catalog-toolbar__hint">
            Current range: {yearMin} to {yearMax}
          </p>
        </div>
      </section>

      <section className="catalog-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Filtered archive</p>
            <h2>Read the result set as a list</h2>
          </div>
          <p className="section-heading__copy">
            Select one entry to keep the archive and map focused on the same
            project.
          </p>
        </div>

        {filtered.length === 0 ? (
          <p className="archive-empty">
            No entries match the current filter set. Adjust the range or clear a
            few facets to widen the archive again.
          </p>
        ) : (
          <div className="archive-list archive-list--catalog">
            {filtered.map((building, index) => (
              <button
                key={building.slug}
                type="button"
                className={`archive-row archive-row--catalog archive-row--button${
                  building.slug === selected?.slug ? " archive-row--active" : ""
                }`}
                onClick={() => setSelectedSlug(building.slug)}
              >
                <span className="archive-row__number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="archive-row__title">
                  <span className="archive-row__kicker">
                    {[building.city, building.district, building.heritageClass].join(
                      " / "
                    )}
                  </span>
                  <span className="archive-row__name">{building.title}</span>
                  <span className="archive-row__minor">
                    {building.architectSlugs
                      .map((slug) => architectNameMap[slug])
                      .join(", ")}
                  </span>
                </span>

                <span className="archive-row__desc">
                  <span className="archive-row__copy">{building.summary}</span>
                  <span className="archive-row__highlight">
                    {building.highlight}
                  </span>
                </span>

                <span className="archive-row__meta">
                  <span>{building.year}</span>
                  <span>{building.primaryUseLabel}</span>
                  <span>{building.structureLabel}</span>
                  <span>
                    {building.sourceRefs.map((source) => source.system).join(", ")}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      <GoogleMapPanel
        buildings={filtered}
        selectedSlug={selected?.slug}
        onSelect={setSelectedSlug}
        title="Filtered architecture map"
        description="The selected list entry remains synced with the visible marker set."
      />
    </div>
  );
}
