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
        <p className="eyebrow">
          {language === "ko" ? "환영합니다" : "Welcome"}
        </p>
        <h1 className="home-welcome__title">
          {language === "ko"
            ? "ARCHIGUIDE.KR에 오신 것을 환영합니다"
            : "WELCOME TO ARCHIGUIDE.KR"}
        </h1>
        <p className="home-welcome__intro">
          {language === "ko"
            ? "한국 건축의 주요 흐름을 건물, 건축가, 유형, 도시, 지도, 검색으로 탐색하는 파일럿 가이드입니다. 이 홈페이지는 전시보다 아카이브 구조가 먼저 보이도록 단순하게 구성합니다."
            : "A pilot guide for exploring Korean architecture through buildings, architects, types, cities, maps, and search. The homepage stays deliberately simple so the archive structure appears before presentation."}
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
                  {language === "ko" ? "연결된 항목" : "linked entries"}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </PageShell>
  );
}
