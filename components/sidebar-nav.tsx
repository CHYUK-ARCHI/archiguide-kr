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
  key: Exclude<NavKey, "home" | "about">;
  href: string;
  label: {
    ko: string;
    en: string;
  };
  count?: number;
};

const navItems: NavItem[] = [
  {
    key: "architects",
    href: "/architects",
    label: { ko: "건축가", en: "Architects" },
    count: siteStats.architects
  },
  {
    key: "buildings",
    href: "/buildings",
    label: { ko: "건물", en: "Buildings" },
    count: siteStats.buildings
  },
  {
    key: "types",
    href: "/types",
    label: { ko: "유형", en: "Types" },
    count: siteStats.types
  },
  {
    key: "cities",
    href: "/cities",
    label: { ko: "도시", en: "Cities" },
    count: siteStats.cities
  },
  {
    key: "map",
    href: "/map",
    label: { ko: "지도", en: "Map" },
    count: siteStats.buildings
  },
  {
    key: "search",
    href: "/search",
    label: { ko: "고급 검색", en: "Advanced Search" }
  }
];

export function SidebarNav({ active }: SidebarNavProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="site-header">
      <div className="site-header__top">
        <div className="site-header__mark" aria-hidden="true">
          AG
        </div>

        <Link href="/" className="site-header__brand">
          <span className="site-header__wordmark">archiguide</span>
          <span className="site-header__sub">korean architecture archive</span>
        </Link>

        <div className="site-header__meta" aria-label="Meta controls">
          <Link
            href="/about"
            className={`site-header__meta-link${
              active === "about" ? " site-header__meta-link--active" : ""
            }`}
          >
            INFO
          </Link>
          <span className="site-header__meta-separator">/</span>
          <button
            type="button"
            className={`site-header__meta-button${
              language === "en" ? " site-header__meta-button--active" : ""
            }`}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <span className="site-header__meta-separator">/</span>
          <button
            type="button"
            className={`site-header__meta-button${
              language === "ko" ? " site-header__meta-button--active" : ""
            }`}
            onClick={() => setLanguage("ko")}
          >
            KR
          </button>
        </div>

        <nav className="site-header__stack" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = item.key === active;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`site-header__stack-link${
                  isActive ? " site-header__stack-link--active" : ""
                }`}
              >
                <span className="site-header__stack-label">
                  {item.label[language]}
                </span>
                {typeof item.count === "number" ? (
                  <span className="site-header__stack-count">
                    ({String(item.count).padStart(2, "0")})
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <p className="site-header__footnote">
          {language === "ko"
            ? "pilot dataset / 2026 / map + detail pipeline"
            : "pilot dataset / 2026 / map + detail pipeline"}
        </p>
      </div>

      <nav className="site-header__rail" aria-label="Mobile navigation">
        <Link
          href="/"
          className={`site-header__rail-link${
            active === "home" ? " site-header__rail-link--active" : ""
          }`}
        >
          {language === "ko" ? "홈" : "Home"}
        </Link>
        {navItems.map((item) => {
          const isActive = item.key === active;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`site-header__rail-link${
                isActive ? " site-header__rail-link--active" : ""
              }`}
            >
              {item.label[language]}
            </Link>
          );
        })}
        <Link
          href="/about"
          className={`site-header__rail-link${
            active === "about" ? " site-header__rail-link--active" : ""
          }`}
        >
          INFO
        </Link>
      </nav>
    </header>
  );
}
