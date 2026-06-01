"use client";

import { useLanguage } from "@/components/language-provider";
import { PageShell } from "@/components/page-shell";
import {
  architects,
  getArchitectFocus,
  getArchitectSummary,
  getBuildingTitle,
  getBuildingsForArchitect,
  getCityLabel
} from "@/lib/site-data";

export default function ArchitectsPage() {
  const { language } = useLanguage();

  return (
    <PageShell active="architects">
      <section className="page-head">
        <p className="eyebrow">
          {language === "ko" ? "건축가" : "Authorship route"}
        </p>
        <h1 className="page-title">{language === "ko" ? "건축가" : "architects"}</h1>
        <p className="page-intro">
          {language === "ko"
            ? "건축가는 이름 목록이 아니라 반복되는 태도와 작업 궤적으로 읽히도록 정리합니다."
            : "Architects are organized as recurring attitudes and trajectories rather than as a flat list of names."}
        </p>
      </section>

      <section className="directory-list">
        {architects.map((architect) => {
          const relatedBuildings = getBuildingsForArchitect(architect.slug);

          return (
            <article key={architect.slug} className="directory-row">
              <div className="directory-row__count">
                {String(relatedBuildings.length).padStart(2, "0")}
              </div>
              <div className="directory-row__title">
                <h2>{architect.name}</h2>
                <p>
                  {language === "ko"
                    ? `${getCityLabel(architect.city, language)} / ${architect.founded} 설립`
                    : `${architect.city} / founded ${architect.founded}`}
                </p>
              </div>
              <div className="directory-row__summary">
                <p>{getArchitectFocus(architect, language)}</p>
                <p>{getArchitectSummary(architect, language)}</p>
              </div>
              <div className="directory-row__meta">
                <span>
                  {language === "ko"
                    ? `${relatedBuildings.length}개 연결 항목`
                    : `${relatedBuildings.length} linked entries`}
                </span>
                <span>
                  {relatedBuildings
                    .map((building) => getBuildingTitle(building, language))
                    .join(", ")}
                </span>
              </div>
            </article>
          );
        })}
      </section>
    </PageShell>
  );
}
