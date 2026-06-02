"use client";

import Link from "next/link";
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
    return buildings.filter((building) => {
      const matchesCity = city === "All" || building.city === city;
      const matchesType = type === "All" || building.type === type;

      return matchesCity && matchesType;
    });
  }, [buildings, city, type]);

  const selected = filtered.find((building) => building.slug === selectedSlug);

  return (
    <section className="explorer-grid">
      <div className="catalog-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {language === "ko" ? "Google Maps 레이어" : "Google Maps layer"}
            </p>
            <h2>
              {language === "ko"
                ? "건물을 지도에서 읽기"
                : "Browse buildings geographically"}
            </h2>
          </div>
          <p className="section-heading__copy">
            {language === "ko"
              ? "도시와 유형으로 먼저 좁히고, 한 항목을 선택하면 지도와 목록이 같은 프로젝트에 맞춰집니다."
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
              ? `${filtered.length}개 지도 항목`
              : `${filtered.length} map-ready entries`}
          </p>
          <p className="catalog-toolbar__hint">
            {language === "ko"
              ? "목록 선택과 지도 마커가 같은 건물 상세로 이어집니다."
              : "List selection and markers now lead into the same building detail route."}
          </p>
        </div>

        <div className="map-list">
          {filtered.map((building) => (
            <div
              key={building.slug}
              className={`map-list__item${
                building.slug === selected?.slug ? " map-list__item--active" : ""
              }`}
            >
              <button
                type="button"
                className="map-list__button"
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
              <Link href={`/buildings/${building.slug}`} className="map-list__detail-link">
                {language === "ko" ? "건물 정보" : "Building page"}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <GoogleMapPanel
        buildings={filtered}
        selectedSlug={selected?.slug}
        onSelect={setSelectedSlug}
        title={
          language === "ko" ? "한국 건축 마커 레이어" : "Architecture markers in Korea"
        }
        description={
          language === "ko"
            ? "정규화된 좌표만 지도에 올리고, 상세 페이지는 같은 데이터 레코드에서 바로 읽습니다."
            : "Only normalized coordinates are rendered as markers, and the detail route reads from the same record."
        }
      />
    </section>
  );
}
