"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { PageShell } from "@/components/page-shell";
import {
  architectNameMap,
  buildings,
  siteStats,
} from "@/lib/site-data";

// 최근 5개 건물
const recent = buildings.slice(0, 5);

// 카테고리 링크 데이터
const CATEGORIES = [
  { href: "/buildings",              ko: "건물",     en: "Buildings",   count: siteStats.buildings   },
  { href: "/architects",             ko: "건축가",   en: "Architects",  count: siteStats.architects  },
  { href: "/types",                  ko: "유형",     en: "Types",       count: siteStats.types       },
  { href: "/cities",                 ko: "도시",     en: "Cities",      count: siteStats.cities      },
  { href: "/young-architect-award",  ko: "젊은건축가상", en: "Award",   count: null                  },
  { href: "/map",                    ko: "지도",     en: "Map",         count: null                  },
];

export default function HomePage() {
  const { language } = useLanguage();

  return (
    <PageShell active="home">

      {/* ── HERO ── */}
      <section className="home-hero-band">
        <div className="home-hero-band__left">
          <p className="home-hero-band__kicker eyebrow">
            {language === "ko" ? "한국 건축 아카이브" : "Korean Architecture Archive"}
          </p>
          <h1 className="home-hero-band__title">
            {language === "ko"
              ? "건물, 건축가,\n도시 그리고 지도"
              : "Buildings,\nArchitects,\nCities & Map"}
          </h1>
        </div>
        <div className="home-hero-band__right">
          <p className="home-hero-band__desc">
            {language === "ko"
              ? "한국의 현대 건축을 건물·건축가·도시·유형·지도의 다섯 축으로 빠르게 탐색할 수 있는 경량 아카이브입니다."
              : "A lightweight archive for reading Korean contemporary architecture across five axes: buildings, architects, cities, types, and map."}
          </p>
          <p className="home-hero-band__meta eyebrow">
            {language === "ko"
              ? `${siteStats.buildings}개 건물 · ${siteStats.architects}명 건축가 · 파일럿 2026`
              : `${siteStats.buildings} buildings · ${siteStats.architects} architects · Pilot 2026`}
          </p>
        </div>
      </section>

      {/* ── 카테고리 내비게이션 스트립 ── */}
      <nav className="home-cat-strip" aria-label="Archive categories">
        {CATEGORIES.map((cat) => (
          <Link key={cat.href} href={cat.href} className="home-cat-item">
            <span className="home-cat-item__label">
              {language === "ko" ? cat.ko : cat.en}
            </span>
            {cat.count !== null && (
              <span className="home-cat-item__count">
                {String(cat.count).padStart(2, "0")}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* ── 최근 건물 목록 ── */}
      <section className="home-recent">
        <div className="home-section-head">
          <p className="eyebrow">
            {language === "ko" ? "최근 등록 건물" : "Recent entries"}
          </p>
          <Link href="/buildings" className="home-section-head__link eyebrow">
            {language === "ko" ? "전체 보기 →" : "View all →"}
          </Link>
        </div>

        <ul className="home-recent-list">
          {recent.map((b, i) => {
            const title = language === "ko" && b.titleKo ? b.titleKo : b.title;
            const names = b.architectSlugs
              .map((slug) => architectNameMap[slug])
              .filter(Boolean)
              .join(", ");

            return (
              <li key={b.slug}>
                <Link href={`/buildings/${b.slug}`} className="home-recent-row">
                  <span className="home-recent-row__num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="home-recent-row__title">{title}</span>
                  <span className="home-recent-row__meta">
                    {names}
                    {names && b.year ? " · " : ""}
                    {b.year || ""}
                  </span>
                  <span className="home-recent-row__city eyebrow">
                    {language === "ko" ? b.cityKo || b.city : b.city}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── 젊은건축가상 배너 ── */}
      <section className="home-award-band">
        <div className="home-award-band__body">
          <p className="eyebrow home-award-band__kicker">
            {language === "ko" ? "특별 컬렉션" : "Special Collection"}
          </p>
          <h2 className="home-award-band__title">
            {language === "ko" ? "젊은건축가상" : "Young Architect Award"}
          </h2>
          <p className="home-award-band__desc">
            {language === "ko"
              ? "2008–2026 문화체육관광부 주최 젊은건축가상 역대 수상자 아카이브. 70인 이상의 신진 건축가와 대표작을 연도별·지도로 탐색."
              : "Archive of all Young Architect Award laureates from 2008–2026. Browse 70+ emerging architects and their representative works by year and map."}
          </p>
        </div>
        <Link href="/young-architect-award" className="home-award-band__cta eyebrow">
          {language === "ko" ? "아카이브 열기 →" : "Open archive →"}
        </Link>
      </section>

    </PageShell>
  );
}
