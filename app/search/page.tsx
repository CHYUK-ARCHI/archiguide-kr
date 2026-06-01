"use client";

import { AdvancedSearch } from "@/components/advanced-search";
import { useLanguage } from "@/components/language-provider";
import { PageShell } from "@/components/page-shell";
import {
  accessOptions,
  architectNameMap,
  buildings,
  cityOptions,
  districtOptions,
  heritageOptions,
  materialOptions,
  sourceSystemOptions,
  statusOptions,
  structureOptions,
  typeOptions,
  yearRange
} from "@/lib/site-data";

export default function SearchPage() {
  const { language } = useLanguage();

  return (
    <PageShell active="search">
      <section className="page-head">
        <p className="eyebrow">
          {language === "ko" ? "스키마 경로" : "Schema route"}
        </p>
        <h1 className="page-title">{language === "ko" ? "검색" : "search"}</h1>
        <p className="page-intro">
          {language === "ko"
            ? "고급검색은 한국의 건축, GIS, 유산, 관광 공공데이터가 실제로 제공하는 필드에 맞춰 유지됩니다."
            : "Extended search remains tied to fields that Korean public building, GIS, heritage, and tourism datasets already expose."}
        </p>
      </section>

      <AdvancedSearch
        buildings={buildings}
        architectNameMap={architectNameMap}
        cityOptions={cityOptions}
        districtOptions={districtOptions}
        typeOptions={typeOptions}
        statusOptions={statusOptions}
        accessOptions={accessOptions}
        materialOptions={materialOptions}
        structureOptions={structureOptions}
        heritageOptions={heritageOptions}
        sourceSystemOptions={sourceSystemOptions}
        yearRange={yearRange}
      />
    </PageShell>
  );
}
