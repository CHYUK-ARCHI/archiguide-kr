"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { PageShell } from "@/components/page-shell";
import { architectNameMap, buildings, siteStats } from "@/lib/site-data";

// 최근 등록 건물 5개
const recent = buildings.slice(0, 5);

// 카테고리 — 국한문 병기
const CATEGORIES = [
  { href: "/buildings", ko: "건물", en: "Buildings", count: siteStats.buildings },
  { href: "/architects", ko: "건축가", en: "Architects", count: siteStats.architects },
  { href: "/types", ko: "유형", en: "Types", count: siteStats.types },
  { href: "/cities", ko: "도시", en: "Cities", count: siteStats.cities },
  { href: "/young-architect-award", ko: "젊은건축가상", en: "Award", count: null },
  { href: "/map", ko: "지도", en: "Map", count: null }
];

export default function HomePage() {
  const { language } = useLanguage();
  const ko = language === "ko";

  const stats = [
    { num: siteStats.buildings, ko: "건물", en: "Buildings" },
    { num: siteStats.architects, ko: "건축가", en: "Architects" },
    { num: siteStats.cities, ko: "도시", en: "Cities" }
  ];

  return (
    <PageShell active="home">
      {/* ── 단청 띠 ── */}
      <hr className="dancheong-bar" aria-hidden="true" />

      {/* ── HERO ── */}
      <section className="home-hero-band">
        <div className="home-hero-band__left">
          <p className="home-hero-band__kicker eyebrow">
            {ko ? "한국 건축 아카이브" : "Korean Architecture Archive"}
          </p>

          <h1 className="home-hero-band__title">
            {ko ? (
              <>
                {"건물과 건축가,\n도시와 유형을\n"}
                <em>{ko ? "하나의 지도" : "one map"}</em>
                {" 위에"}
              </>
            ) : (
              <>
                {"Buildings, architects,\ncities and types\non "}
                <em>one map</em>
              </>
            )}
          </h1>

          <p className="home-hero-band__latin">
            {ko
              ? "Buildings · Architects\nCities · Types · Map"
              : "건물 · 건축가\n도시 · 유형 · 지도"}
          </p>
        </div>

        <div className="home-hero-band__right">
          <p className="home-hero-band__desc">
            {ko
              ? "한국 근현대 건축을 건물·건축가·도시·유형·지도의 다섯 축으로 교차 열람하는 아카이브입니다. 개별 작품에서 도시 맥락까지 하나의 흐름으로 읽습니다."
              : "An archive that reads Korean modern and contemporary architecture across five axes — buildings, architects, cities, types, and map — from single works through to their urban context."}
          </p>

          <div className="home-stat-row">
            {stats.map((s) => (
              <div key={s.en} className="home-stat">
                <span className="home-stat__num">
                  {String(s.num).padStart(2, "0")}
                </span>
                <span className="home-stat__label">{ko ? s.ko : s.en}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="home-hero-band__rail" aria-hidden="true">
          <p className={`vertical-label${ko ? "" : " vertical-label--latin"}`}>
            {ko ? "한국 건축 아카이브" : "ARCHIGUIDE · 2026"}
          </p>
        </div>
      </section>

      {/* ── 카테고리 스트립 ── */}
      <nav className="home-cat-strip" aria-label={ko ? "분류" : "Categories"}>
        {CATEGORIES.map((cat) => (
          <Link key={cat.href} href={cat.href} className="home-cat-item">
            <span className="home-cat-item__label">{ko ? cat.ko : cat.en}</span>
            <span className="home-cat-item__alt">{ko ? cat.en : cat.ko}</span>
            {cat.count !== null ? (
              <span className="home-cat-item__count">
                {String(cat.count).padStart(2, "0")}
              </span>
            ) : (
              <span className="home-cat-item__arrow">→</span>
            )}
          </Link>
        ))}
      </nav>

      {/* ── 최근 등록 건물 ── */}
      <section className="home-recent">
        <div className="home-section-head">
          <p className="eyebrow">{ko ? "최근 등록 건물" : "Recent entries"}</p>
          <Link href="/buildings" className="home-section-head__link eyebrow">
            {ko ? "전체 보기 →" : "View all →"}
          </Link>
        </div>

        <ul className="home-recent-list">
          {recent.map((b, i) => {
            const title = ko && b.titleKo ? b.titleKo : b.title;
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
                    {ko ? b.cityKo || b.city : b.city}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── 젊은건축가상 ── */}
      <section className="home-award-band">
        <div className="home-award-band__body">
          <p className="eyebrow home-award-band__kicker">
            {ko ? "특별 컬렉션" : "Special Collection"}
          </p>
          <h2 className="home-award-band__title">
            {ko ? "젊은건축가상" : "Young Architect Award"}
          </h2>
          <p className="home-award-band__desc">
            {ko
              ? "2008–2026 문화체육관광부 주최 젊은건축가상 역대 수상자 아카이브. 70인 이상의 신진 건축가와 대표작을 연도별·지도로 탐색합니다."
              : "Archive of Young Architect Award laureates, 2008–2026. Browse 70+ emerging architects and their representative works by year and on the map."}
          </p>
        </div>
        <Link href="/young-architect-award" className="home-award-band__cta eyebrow">
          {ko ? "아카이브 열기 →" : "Open archive →"}
        </Link>
      </section>
    </PageShell>
  );
}
