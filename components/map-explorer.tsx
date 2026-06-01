"use client";

import { useMemo, useState } from "react";

import { GoogleMapPanel } from "@/components/google-map-panel";
import { useLanguage } from "@/components/language-provider";
import {
  getBuildingRoadAddress,
  getBuildingTitle,
  getCityLabel,
  getDistrictLabel,
  getTypeLabel,
  type Building
} from "@/lib/site-data";

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
  const { language } = useLanguage();
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
            <p className="eyebrow">
              {language === "ko" ? "구글 지도 레이어" : "Google Maps layer"}
            </p>
            <h2>
              {language === "ko"
                ? "지리적으로 항목 읽기"
                : "Browse entries geographically"}
            </h2>
          </div>
          <p className="section-heading__copy">
            {language === "ko"
              ? "도시나 유형으로 거른 뒤 하나의 항목을 선택하면 목록과 지도가 같은 프로젝트를 가리킵니다."
              : "Filter by city or type, then select one entry to keep the list and map aligned."}
          </p>
        </div>

        <div className="catalog-controls catalog-controls--split">
          <label className="field">
            <span className="field__label">{language === "ko" ? "도시" : "City"}</span>
            <select
              className="field__select"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            >
              <option value="All">
                {language === "ko" ? "모든 도시" : "All cities"}
              </option>
              {cityOptions.map((option) => (
                <option key={option} value={option}>
                  {getCityLabel(option, language)}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">{language === "ko" ? "유형" : "Type"}</span>
            <select
              className="field__select"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="All">
                {language === "ko" ? "모든 유형" : "All types"}
              </option>
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {getTypeLabel(option, language)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="catalog-toolbar">
          <p className="catalog-toolbar__count">
            {language === "ko"
              ? `${filtered.length}개 지도 연동 항목`
              : `${filtered.length} map-ready entries`}
          </p>
          <p className="catalog-toolbar__hint">
            {language === "ko"
              ? "필터링된 항목은 지도 옆에서 읽기 목록으로 계속 보입니다."
              : "Filtered entries stay visible as a reading list beside the map."}
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
              <span className="map-list__title">
                {getBuildingTitle(building, language)}
              </span>
              <span className="map-list__meta">
                {[
                  getCityLabel(building.city, language),
                  getDistrictLabel(building.district, language),
                  getTypeLabel(building.type, language)
                ].join(" / ")}
              </span>
              <span className="map-list__address">
                {getBuildingRoadAddress(building, language)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <GoogleMapPanel
        buildings={filtered}
        selectedSlug={selected?.slug}
        onSelect={setSelectedSlug}
        title={
          language === "ko" ? "한국 건축 마커 지도" : "Architecture markers in Korea"
        }
        description={
          language === "ko"
            ? "각 마커는 WGS84 좌표를 사용하므로 같은 스키마에 공공데이터를 직접 연결할 수 있습니다."
            : "Each marker is built from WGS84-ready coordinates so the same schema can later ingest public datasets directly."
        }
      />
    </section>
  );
}
