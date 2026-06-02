"use client";

import Link from "next/link";

import { FeaturedCarousel } from "@/components/featured-carousel";
import { useLanguage } from "@/components/language-provider";
import { PageShell } from "@/components/page-shell";
import {
  architectNameMap,
  buildings,
  siteStats,
  sourceSystemOptions,
  getSourceSystemLabel
} from "@/lib/site-data";

const featuredBuildings = buildings.slice(0, 5);

export default function HomePage() {
  const { language } = useLanguage();

  return (
    <PageShell active="home">
      <section className="home-welcome">
        <p className="eyebrow">{language === "ko" ? "환영합니다" : "Welcome"}</p>
        <h1 className="home-welcome__title">
          {language === "ko"
            ? "ARCHIGUIDE.KR에 오신 것을 환영합니다"
            : "WELCOME TO ARCHIGUIDE.KR"}
        </h1>
        <p className="home-welcome__intro">
          {language === "ko"
            ? "최근 한국 건축을 건물, 건축가, 도시, 지도, 검색의 축으로 빠르게 읽기 위한 가벼운 아카이브입니다. 이번 버전은 지도와 건물 상세 페이지가 같은 데이터 파이프라인 위에서 움직이도록 정리되어 있습니다."
            : "A light archive for reading recent Korean architecture through buildings, architects, cities, map, and search. This version aligns the map and the building detail page on the same record pipeline."}
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
          <p className="eyebrow">
            {language === "ko" ? "아카이브 개요" : "Archive snapshot"}
          </p>
          <ul className="home-info__list">
            <li>
              <Link href="/buildings">
                {language === "ko" ? "건물" : "Buildings"}
              </Link>
              <span>{String(siteStats.buildings).padStart(2, "0")}</span>
            </li>
            <li>
              <Link href="/architects">
                {language === "ko" ? "건축가" : "Architects"}
              </Link>
              <span>{String(siteStats.architects).padStart(2, "0")}</span>
            </li>
            <li>
              <Link href="/cities">{language === "ko" ? "도시" : "Cities"}</Link>
              <span>{String(siteStats.cities).padStart(2, "0")}</span>
            </li>
            <li>
              <Link href="/types">{language === "ko" ? "유형" : "Types"}</Link>
              <span>{String(siteStats.types).padStart(2, "0")}</span>
            </li>
            <li>
              <Link href="/map">{language === "ko" ? "지도" : "Map"}</Link>
              <span>{String(siteStats.buildings).padStart(2, "0")}</span>
            </li>
          </ul>
        </article>

        <article className="home-info">
          <p className="eyebrow">
            {language === "ko" ? "데이터 소스" : "Data sources"}
          </p>
          <ul className="home-source-list">
            {sourceSystemOptions.map((source) => (
              <li key={source}>
                <strong>{getSourceSystemLabel(source, language)}</strong>
                <span>
                  {
                    buildings.filter((building) =>
                      building.sourceRefs.some((entry) => entry.system === source)
                    ).length
                  }{" "}
                  {language === "ko" ? "linked entries" : "linked entries"}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </PageShell>
  );
}
