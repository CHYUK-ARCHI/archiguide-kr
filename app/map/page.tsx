"use client";

import { MapExplorer } from "@/components/map-explorer";
import { useLanguage } from "@/components/language-provider";
import { PageShell } from "@/components/page-shell";
import { buildings, cityOptions, typeOptions } from "@/lib/site-data";

export default function MapPage() {
  const { language } = useLanguage();

  return (
    <PageShell active="map">
      <section className="page-head">
        <p className="eyebrow">
          {language === "ko" ? "지리적 경로" : "Geographic route"}
        </p>
        <h1 className="page-title">{language === "ko" ? "지도" : "map"}</h1>
        <p className="page-intro">
          {language === "ko"
            ? "지도는 아카이브에 지리적 읽기 층을 더해, 이름뿐 아니라 지역과 도시, 권역 단위로도 진입할 수 있게 합니다."
            : "The map adds a geographic reading layer so the archive can be entered by district, city, and regional cluster as well as by name."}
        </p>
      </section>

      <MapExplorer
        buildings={buildings}
        cityOptions={cityOptions}
        typeOptions={typeOptions}
      />
    </PageShell>
  );
}
