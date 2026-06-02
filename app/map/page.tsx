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
            ? "지도는 아카이브의 보조 진입이지만, 이제 마커와 목록 모두 같은 건물 상세 페이지로 이어집니다. 주소와 좌표는 빌드 전 수집 단계에서 정규화되는 구조를 전제로 합니다."
            : "The map remains a secondary archive entrance, but markers and list rows now lead into the same building detail page. Addresses and coordinates are assumed to be normalized before deploy."}
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
