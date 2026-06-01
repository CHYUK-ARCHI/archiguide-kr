"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { GoogleMapPanel } from "@/components/google-map-panel";
import { useLanguage } from "@/components/language-provider";
import {
  getBuildingAddress,
  getBuildingRoadAddress,
  getBuildingHighlight,
  getBuildingSummary,
  getBuildingTitle,
  getCityLabel,
  getDistrictLabel,
  getHeritageLabel,
  getMaterialLabel,
  getPrimaryUseLabel,
  getPublicAccessLabel,
  getSourceSystemLabel,
  getStatusLabel,
  getStructureLabel,
  getTypeLabel,
  type ArchitectureSourceSystem,
  type Building
} from "@/lib/site-data";

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
  const { language } = useLanguage();
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
        .flatMap((source) => [
          getSourceSystemLabel(source.system, "en"),
          getSourceSystemLabel(source.system, "ko")
        ])
        .join(" ")
        .toLowerCase();
      const tagText = building.tags.join(" ").toLowerCase();
      const materialText = building.materials
        .flatMap((material) => [material, getMaterialLabel(material, "ko")])
        .join(" ")
        .toLowerCase();
      const addressText = `${getBuildingAddress(
        building,
        "en"
      )} ${getBuildingAddress(building, "ko")} ${building.roadAddress} ${getBuildingRoadAddress(
        building,
        "ko"
      )}`.toLowerCase();

      const matchesQuery =
        deferredQuery.length === 0 ||
        getBuildingTitle(building, "en").toLowerCase().includes(deferredQuery) ||
        getBuildingTitle(building, "ko").toLowerCase().includes(deferredQuery) ||
        getBuildingSummary(building, "en").toLowerCase().includes(deferredQuery) ||
        getBuildingSummary(building, "ko").toLowerCase().includes(deferredQuery) ||
        getBuildingHighlight(building, "en").toLowerCase().includes(deferredQuery) ||
        getBuildingHighlight(building, "ko").toLowerCase().includes(deferredQuery) ||
        getCityLabel(building.city, "en").toLowerCase().includes(deferredQuery) ||
        getCityLabel(building.city, "ko").toLowerCase().includes(deferredQuery) ||
        getDistrictLabel(building.district, "en")
          .toLowerCase()
          .includes(deferredQuery) ||
        getDistrictLabel(building.district, "ko")
          .toLowerCase()
          .includes(deferredQuery) ||
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
            <p className="eyebrow">
              {language === "ko" ? "고급검색" : "Advanced search"}
            </p>
            <h2>
              {language === "ko"
                ? "스키마 기반 필터로 좁혀보기"
                : "Filter with schema-ready facets"}
            </h2>
          </div>
          <p className="section-heading__copy">
            {language === "ko"
              ? "필터는 한국의 건축, GIS, 유산, 관광 공공데이터 필드와 맞춰져 있어 아카이브 구조를 바꾸지 않고도 확장할 수 있습니다."
              : "Filters stay aligned to public Korean building, GIS, heritage, and tourism fields so the archive can expand without changing its logic."}
          </p>
        </div>

        <div className="search-grid">
          <label className="field field--wide">
            <span className="field__label">
              {language === "ko" ? "키워드" : "Keyword"}
            </span>
            <input
              className="field__input"
              type="search"
              placeholder={
                language === "ko"
                  ? "제목, 건축가, 태그, 주소, 출처"
                  : "Title, architect, tag, address, source"
              }
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

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
            <span className="field__label">
              {language === "ko" ? "지역" : "District"}
            </span>
            <select
              className="field__select"
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
            >
              <option value="All">
                {language === "ko" ? "모든 지역" : "All districts"}
              </option>
              {districtOptions.map((option) => (
                <option key={option} value={option}>
                  {getDistrictLabel(option, language)}
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

          <label className="field">
            <span className="field__label">
              {language === "ko" ? "상태" : "Status"}
            </span>
            <select
              className="field__select"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="All">
                {language === "ko" ? "모든 상태" : "All statuses"}
              </option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {getStatusLabel(option, language)}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">
              {language === "ko" ? "공개 범위" : "Public access"}
            </span>
            <select
              className="field__select"
              value={access}
              onChange={(event) => setAccess(event.target.value)}
            >
              <option value="All">
                {language === "ko" ? "모든 공개 범위" : "All access levels"}
              </option>
              {accessOptions.map((option) => (
                <option key={option} value={option}>
                  {getPublicAccessLabel(option as Building["publicAccess"], language)}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">
              {language === "ko" ? "재료" : "Material"}
            </span>
            <select
              className="field__select"
              value={material}
              onChange={(event) => setMaterial(event.target.value)}
            >
              <option value="All">
                {language === "ko" ? "모든 재료" : "All materials"}
              </option>
              {materialOptions.map((option) => (
                <option key={option} value={option}>
                  {getMaterialLabel(option, language)}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">
              {language === "ko" ? "구조" : "Structure"}
            </span>
            <select
              className="field__select"
              value={structure}
              onChange={(event) => setStructure(event.target.value)}
            >
              <option value="All">
                {language === "ko" ? "모든 구조" : "All structures"}
              </option>
              {structureOptions.map((option) => (
                <option key={option} value={option}>
                  {getStructureLabel(option, language)}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">
              {language === "ko" ? "유산 구분" : "Heritage"}
            </span>
            <select
              className="field__select"
              value={heritage}
              onChange={(event) => setHeritage(event.target.value)}
            >
              <option value="All">
                {language === "ko" ? "모든 유산 구분" : "All heritage classes"}
              </option>
              {heritageOptions.map((option) => (
                <option key={option} value={option}>
                  {getHeritageLabel(option as Building["heritageClass"], language)}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">
              {language === "ko" ? "출처 시스템" : "Source system"}
            </span>
            <select
              className="field__select"
              value={sourceSystem}
              onChange={(event) => setSourceSystem(event.target.value)}
            >
              <option value="All">
                {language === "ko" ? "모든 출처" : "All sources"}
              </option>
              {sourceSystemOptions.map((option) => (
                <option key={option} value={option}>
                  {getSourceSystemLabel(option as ArchitectureSourceSystem, language)}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">
              {language === "ko" ? "시작 연도" : "From year"}
            </span>
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
            <span className="field__label">
              {language === "ko" ? "종료 연도" : "To year"}
            </span>
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
            {language === "ko"
              ? "이미지 메타데이터가 준비된 항목만 표시합니다."
              : "Only show entries that already have image-ready media metadata."}
          </span>
        </label>

        <div className="catalog-toolbar">
          <p className="catalog-toolbar__count">
            {language === "ko"
              ? `${filtered.length}개 항목 일치`
              : `${filtered.length} entries match`}
          </p>
          <p className="catalog-toolbar__hint">
            {language === "ko"
              ? `현재 범위: ${yearMin} - ${yearMax}`
              : `Current range: ${yearMin} to ${yearMax}`}
          </p>
        </div>
      </section>

      <section className="catalog-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {language === "ko" ? "필터링된 아카이브" : "Filtered archive"}
            </p>
            <h2>
              {language === "ko"
                ? "결과를 목록으로 읽기"
                : "Read the result set as a list"}
            </h2>
          </div>
          <p className="section-heading__copy">
            {language === "ko"
              ? "하나의 항목을 선택하면 아카이브와 지도가 같은 프로젝트를 중심으로 맞춰집니다."
              : "Select one entry to keep the archive and map focused on the same project."}
          </p>
        </div>

        {filtered.length === 0 ? (
          <p className="archive-empty">
            {language === "ko"
              ? "현재 필터와 일치하는 항목이 없습니다. 범위를 넓히거나 몇 개의 필터를 해제해 다시 살펴보세요."
              : "No entries match the current filter set. Adjust the range or clear a few facets to widen the archive again."}
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
                    {[
                      getCityLabel(building.city, language),
                      getDistrictLabel(building.district, language),
                      getHeritageLabel(building.heritageClass, language)
                    ].join(" / ")}
                  </span>
                  <span className="archive-row__name">
                    {getBuildingTitle(building, language)}
                  </span>
                  <span className="archive-row__minor">
                    {building.architectSlugs
                      .map((slug) => architectNameMap[slug])
                      .join(", ")}
                  </span>
                </span>

                <span className="archive-row__desc">
                  <span className="archive-row__copy">
                    {getBuildingSummary(building, language)}
                  </span>
                  <span className="archive-row__highlight">
                    {getBuildingHighlight(building, language)}
                  </span>
                </span>

                <span className="archive-row__meta">
                  <span>{building.year}</span>
                  <span>{getPrimaryUseLabel(building.primaryUseLabel, language)}</span>
                  <span>{getStructureLabel(building.structureLabel, language)}</span>
                  <span>
                    {building.sourceRefs
                      .map((source) => getSourceSystemLabel(source.system, language))
                      .join(", ")}
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
        title={
          language === "ko" ? "필터링된 건축 지도" : "Filtered architecture map"
        }
        description={
          language === "ko"
            ? "선택한 목록 항목과 지도 마커가 같은 결과 집합을 공유합니다."
            : "The selected list entry remains synced with the visible marker set."
        }
      />
    </div>
  );
}
