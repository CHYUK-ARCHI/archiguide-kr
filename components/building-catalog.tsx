"use client";

import { useDeferredValue, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import {
  getBuildingHighlight,
  getBuildingSummary,
  getBuildingTitle,
  getCityLabel,
  getDistrictLabel,
  getMaterialLabel,
  getStatusLabel,
  getTypeLabel,
  type Building
} from "@/lib/site-data";

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
  const { language } = useLanguage();
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
      getBuildingTitle(building, "en").toLowerCase().includes(deferredQuery) ||
      getBuildingTitle(building, "ko").toLowerCase().includes(deferredQuery) ||
      getBuildingSummary(building, "en").toLowerCase().includes(deferredQuery) ||
      getBuildingSummary(building, "ko").toLowerCase().includes(deferredQuery) ||
      getCityLabel(building.city, "en").toLowerCase().includes(deferredQuery) ||
      getCityLabel(building.city, "ko").toLowerCase().includes(deferredQuery) ||
      getTypeLabel(building.type, "en").toLowerCase().includes(deferredQuery) ||
      getTypeLabel(building.type, "ko").toLowerCase().includes(deferredQuery) ||
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
          <span className="field__label">
            {language === "ko" ? "검색" : "Search"}
          </span>
          <input
            className="field__input"
            type="search"
            placeholder={
              language === "ko"
                ? "건물명, 도시, 유형, 건축가"
                : "Building, city, type, or architect"
            }
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label className="field">
          <span className="field__label">{language === "ko" ? "도시" : "City"}</span>
          <select
            className="field__select"
            value={selectedCity}
            onChange={(event) => setSelectedCity(event.target.value)}
          >
            <option value="All">
              {language === "ko" ? "모든 도시" : "All cities"}
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {getCityLabel(city, language)}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">{language === "ko" ? "유형" : "Type"}</span>
          <select
            className="field__select"
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
          >
            <option value="All">
              {language === "ko" ? "모든 유형" : "All types"}
            </option>
            {types.map((type) => (
              <option key={type} value={type}>
                {getTypeLabel(type, language)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="catalog-toolbar">
        <p className="catalog-toolbar__count">
          {language === "ko"
            ? `${filtered.length}개 항목 표시`
            : `${filtered.length} entries visible`}
        </p>
        <p className="catalog-toolbar__hint">
          {language === "ko"
            ? "건물은 카드 묶음보다 편집된 아카이브 목록으로 정리됩니다."
            : "Buildings are listed as an editorial archive rather than a card wall."}
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
                {[
                  getCityLabel(building.city, language),
                  getDistrictLabel(building.district, language)
                ].join(" / ")}
              </p>
              <h2 className="archive-row__name">
                {getBuildingTitle(building, language)}
              </h2>
              <p className="archive-row__minor">
                {building.architectSlugs
                  .map((slug) => architectNameMap[slug])
                  .join(", ")}
              </p>
            </div>

            <div className="archive-row__desc">
              <p>{getBuildingSummary(building, language)}</p>
              <p className="archive-row__highlight">
                {getBuildingHighlight(building, language)}
              </p>
            </div>

            <div className="archive-row__meta">
              <span>{building.year}</span>
              <span>{getTypeLabel(building.type, language)}</span>
              <span>{getStatusLabel(building.status, language)}</span>
              <span>
                {building.materials
                  .slice(0, 2)
                  .map((material) => getMaterialLabel(material, language))
                  .join(", ")}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
