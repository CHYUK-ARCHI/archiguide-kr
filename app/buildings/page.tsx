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
            ? "프로젝트는 가이드를 읽는 가장 직접적인 입구입니다. 이 목록은 도시와 유형 필터를 유지하면서도 아카이브를 한눈에 읽히도록 정리합니다."
            : "Projects remain the clearest doorway into the guide. This list keeps the archive readable at a glance while still allowing city and type filtering from the top."}
        </p>
        <p className="page-footnote">
          {language === "ko"
            ? `${siteStats.cities}개 도시와 ${siteStats.types}개 유형에 걸쳐 ${siteStats.buildings}개 항목을 담고 있습니다.`
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
