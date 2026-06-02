"use client";

import { BuildingCatalog } from "@/components/building-catalog";
import { useLanguage } from "@/components/language-provider";
import { PageShell } from "@/components/page-shell";
import {
  architectNameMap,
  buildings,
  siteStats,
  typeSummaries
} from "@/lib/site-data";

export default function BuildingsPage() {
  const { language } = useLanguage();
  const cities = Array.from(new Set(buildings.map((building) => building.city)));
  const types = typeSummaries.map((summary) => summary.type);

  return (
    <PageShell active="buildings">
      <section className="page-head">
        <p className="eyebrow">
          {language === "ko" ? "주요 아카이브" : "Primary archive"}
        </p>
        <h1 className="page-title">{language === "ko" ? "건물" : "buildings"}</h1>
        <p className="page-intro">
          {language === "ko"
            ? "프로젝트는 여전히 가이드를 읽는 가장 직접적인 입구입니다. 이제 각 행은 지도와 같은 데이터 레코드, 그리고 별도의 상세 페이지로 이어집니다."
            : "Projects remain the clearest doorway into the guide. Each row now connects to the same record used by the map and the dedicated detail page."}
        </p>
        <p className="page-footnote">
          {language === "ko"
            ? `${siteStats.cities}개 도시, ${siteStats.types}개 유형, 총 ${siteStats.buildings}개 항목`
            : `${siteStats.buildings} entries across ${siteStats.cities} cities and ${siteStats.types} types.`}
        </p>
      </section>

      <BuildingCatalog
        buildings={buildings}
        architectNameMap={architectNameMap}
        cities={cities}
        types={types}
      />
    </PageShell>
  );
}
