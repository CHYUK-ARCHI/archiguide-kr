"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { siteStats } from "@/lib/site-data";

export type NavKey =
  | "home"
  | "buildings"
  | "architects"
  | "cities"
  | "types"
  | "map"
  | "search"
  | "about";

type SidebarNavProps = {
  active: NavKey;
};

type NavItem = {
  key: Exclude<NavKey, "home">;
  href: string;
  label: string;
  labelEn: string;
  count?: number;
};

const navItems: NavItem[] = [
  {
    key: "architects",
    href: "/architects",
    label: "건축가",
    labelEn: "Architects",
    count: siteStats.architects
  },
  {
    key: "buildings",
    href: "/buildings",
    label: "건물",
    labelEn: "Buildings",
    count: siteStats.buildings
  },
  {
    key: "types",
    href: "/types",
    label: "유형",
    labelEn: "Types",
    count: siteStats.types
  },
  {
    key: "cities",
    href: "/cities",
    label: "도시",
    labelEn: "Cities",
    count: siteStats.cities
  },
  {
    key: "map",
    href: "/map",
    label: "지도",
    labelEn: "Map",
    count: siteStats.buildings
  },
  {
    key: "search",
    href: "/search",
    label: "고급검색",
    labelEn: "Search"
  },
  {
    key: "about",
    href: "/about",
    label: "방법",
    labelEn: "Method"
  }
];

export function SidebarNav({ active }: SidebarNavProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar__head">
          <Link href="/" className="sidebar__brand">
            <span className="sidebar__brand-main">ARCHIGUIDE.KR</span>
            <span className="sidebar__brand-sub">
              {language === "ko"
                ? "한국 건축 아카이브 가이드"
                : "Korean architecture guide"}
            </span>
          </Link>
          <p className="sidebar__intro">
            {language === "ko"
              ? "한국 건축을 건물, 건축가, 유형, 도시, 지도, 검색으로 읽는 파일럿 아카이브입니다."
              : "A pilot archive for reading Korean architecture through buildings, architects, types, cities, maps, and search."}
          </p>
        </div>

        <nav className="sidebar__menu" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = item.key === active;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`sidebar__menu-item${
                  isActive ? " sidebar__menu-item--active" : ""
                }`}
              >
                <span className="sidebar__menu-label">
                  {language === "ko" ? item.label : item.labelEn}
                </span>
                {typeof item.count === "number" ? (
                  <span className="sidebar__menu-count">
                    ({String(item.count).padStart(2, "0")})
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar__foot">
          <div className="language-switch" aria-label="Language switch">
            <button
              type="button"
              className={`language-switch__button${
                language === "ko" ? " language-switch__button--active" : ""
              }`}
              onClick={() => setLanguage("ko")}
            >
              한국어
            </button>
            <button
              type="button"
              className={`language-switch__button${
                language === "en" ? " language-switch__button--active" : ""
              }`}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>
          <Link
            href="/about"
            className={`sidebar__info-link${
              active === "about" ? " sidebar__info-link--active" : ""
            }`}
          >
            {language === "ko" ? "방법" : "INFO / METHOD"}
          </Link>
          <p className="sidebar__footnote">
            {language === "ko" ? "파일럿 데이터셋 / 2026" : "pilot dataset / 2026"}
          </p>
        </div>
      </aside>

      <header className="mobile-header">
        <Link href="/" className="mobile-header__brand">
          ARCHIGUIDE.KR
        </Link>
        <nav className="mobile-header__rail" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = item.key === active;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`mobile-header__link${
                  isActive ? " mobile-header__link--active" : ""
                }`}
              >
                {language === "ko" ? item.label : item.labelEn}
              </Link>
            );
          })}
        </nav>
        <div className="language-switch language-switch--mobile" aria-label="Language switch">
          <button
            type="button"
            className={`language-switch__button${
              language === "ko" ? " language-switch__button--active" : ""
            }`}
            onClick={() => setLanguage("ko")}
          >
            한국어
          </button>
          <button
            type="button"
            className={`language-switch__button${
              language === "en" ? " language-switch__button--active" : ""
            }`}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
        </div>
      </header>
    </>
  );
}
