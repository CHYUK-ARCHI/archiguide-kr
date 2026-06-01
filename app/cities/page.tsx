"use client";

import { useLanguage } from "@/components/language-provider";
import { PageShell } from "@/components/page-shell";
import {
  citySummaries,
  getBuildingTitle,
  getCityLabel,
  getCityNote,
  getDistrictLabel,
  getTypeLabel
} from "@/lib/site-data";

export default function CitiesPage() {
  const { language } = useLanguage();

  return (
    <PageShell active="cities">
      <section className="page-head">
        <p className="eyebrow">
          {language === "ko" ? "도시" : "Regional route"}
        </p>
        <h1 className="page-title">{language === "ko" ? "도시" : "cities"}</h1>
        <p className="page-intro">
          {language === "ko"
            ? "도시는 건축 해석을 즉시 바꾸는 기준입니다. 이 페이지는 장소감을 먼저 드러내는 도시별 입구를 제공합니다."
            : "Cities immediately change how the archive is read. This page opens the guide through local atmosphere first."}
        </p>
      </section>

      <section className="directory-list">
        {citySummaries.map((summary) => (
          <article key={summary.city} className="directory-row">
            <div className="directory-row__count">
              {String(summary.buildingCount).padStart(2, "0")}
            </div>
            <div className="directory-row__title">
              <h2>{getCityLabel(summary.city, language)}</h2>
              <p>
                {language === "ko"
                  ? `${getDistrictLabel(summary.lead.district, language)} 대표 지구`
                  : `${summary.lead.district} district lead`}
              </p>
            </div>
            <div className="directory-row__summary">
              <p>{getCityNote(summary.city, language)}</p>
            </div>
            <div className="directory-row__meta">
              <span>{getBuildingTitle(summary.lead, language)}</span>
              <span>
                {summary.types
                  .map((type) => getTypeLabel(type, language))
                  .join(", ")}
              </span>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
