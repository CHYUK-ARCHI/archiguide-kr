"use client";

import { useLanguage } from "@/components/language-provider";
import { PageShell } from "@/components/page-shell";
import {
  getBuildingTitle,
  getCityLabel,
  getTypeLabel,
  getTypeNote,
  typeSummaries
} from "@/lib/site-data";

export default function TypesPage() {
  const { language } = useLanguage();

  return (
    <PageShell active="types">
      <section className="page-head">
        <p className="eyebrow">
          {language === "ko" ? "유형" : "Program route"}
        </p>
        <h1 className="page-title">{language === "ko" ? "유형" : "types"}</h1>
        <p className="page-intro">
          {language === "ko"
            ? "건물 유형은 배경 정보가 아니라 읽기 방식의 기준입니다. 비슷한 프로그램을 한 번에 훑을 수 있도록 정리합니다."
            : "Building type is treated as a reading mode rather than background metadata, so similar programs can be scanned together."}
        </p>
      </section>

      <section className="directory-list">
        {typeSummaries.map((summary) => (
          <article key={summary.type} className="directory-row">
            <div className="directory-row__count">
              {String(summary.buildingCount).padStart(2, "0")}
            </div>
            <div className="directory-row__title">
              <h2>{getTypeLabel(summary.type, language)}</h2>
              <p>
                {language === "ko"
                  ? `${getCityLabel(summary.lead.city, language)} 대표 도시`
                  : `${summary.lead.city} lead city`}
              </p>
            </div>
            <div className="directory-row__summary">
              <p>{getTypeNote(summary.type, language)}</p>
            </div>
            <div className="directory-row__meta">
              <span>{getBuildingTitle(summary.lead, language)}</span>
              <span>
                {summary.cities
                  .map((city) => getCityLabel(city, language))
                  .join(", ")}
              </span>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
