import Link from "next/link";

import { FeaturedCarousel } from "@/components/featured-carousel";
import { PageShell } from "@/components/page-shell";
import {
  architectNameMap,
  buildings,
  siteStats,
  sourceSystemOptions
} from "@/lib/site-data";

const featuredBuildings = buildings.slice(0, 5);

const sourceLabels: Record<string, string> = {
  "building-hub": "Building Hub / 건축HUB",
  "building-register": "Building Register / 건축물대장",
  "gis-building": "GIS Building / 공간정보",
  "tour-api": "Tour API / 관광정보",
  "heritage-detail": "Heritage Detail / 유산해설"
};

export default function HomePage() {
  return (
    <PageShell active="home">
      <section className="home-welcome">
        <p className="eyebrow">Welcome / 환영합니다</p>
        <h1 className="home-welcome__title">WELCOME TO ARCHIGUIDE.KR</h1>
        <p className="home-welcome__intro">
          한국 건축의 주요 흐름을 건물, 건축가, 유형, 도시, 지도, 검색으로
          탐색하는 파일럿 가이드입니다. 이 홈페이지는 전시보다 아카이브 구조가
          먼저 보이도록 단순하게 구성합니다.
        </p>
      </section>

      <section className="home-highlight">
        <FeaturedCarousel
          buildings={featuredBuildings}
          architectNameMap={architectNameMap}
        />
      </section>

      <section className="home-meta-grid">
        <article className="home-info">
          <p className="eyebrow">Archive snapshot / 아카이브 개요</p>
          <ul className="home-info__list">
            <li>
              <Link href="/buildings">Buildings / 건물</Link>
              <span>{String(siteStats.buildings).padStart(2, "0")}</span>
            </li>
            <li>
              <Link href="/architects">Architects / 건축가</Link>
              <span>{String(siteStats.architects).padStart(2, "0")}</span>
            </li>
            <li>
              <Link href="/cities">Cities / 도시</Link>
              <span>{String(siteStats.cities).padStart(2, "0")}</span>
            </li>
            <li>
              <Link href="/types">Types / 유형</Link>
              <span>{String(siteStats.types).padStart(2, "0")}</span>
            </li>
            <li>
              <Link href="/map">Map / 지도</Link>
              <span>{String(siteStats.buildings).padStart(2, "0")}</span>
            </li>
          </ul>
        </article>

        <article className="home-info">
          <p className="eyebrow">Data sources / 데이터 소스</p>
          <ul className="home-source-list">
            {sourceSystemOptions.map((source) => (
              <li key={source}>
                <strong>{sourceLabels[source] ?? source}</strong>
                <span>
                  {
                    buildings.filter((building) =>
                      building.sourceRefs.some((entry) => entry.system === source)
                    ).length
                  }{" "}
                  linked entries
                </span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </PageShell>
  );
}
