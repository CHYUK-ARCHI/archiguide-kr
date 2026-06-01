"use client";

import { useLanguage } from "@/components/language-provider";
import { PageShell } from "@/components/page-shell";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <PageShell active="about">
      <section className="page-head">
        <p className="eyebrow">
          {language === "ko" ? "방법" : "Archive note"}
        </p>
        <h1 className="page-title">{language === "ko" ? "방법" : "method"}</h1>
        <p className="page-intro">
          {language === "ko"
            ? "Archiguide KR는 건축을 탐색 가능한 읽기 시스템으로 다룹니다. 먼저 아카이브 구조를 세우고, 그 위에 지도와 검색을 얹는 방식입니다."
            : "Archiguide KR treats architecture as a searchable reading system. The archive structure comes first, with map and search layered on top."}
        </p>
      </section>

      <section className="home-meta-grid">
        <article className="home-info">
          <p className="eyebrow">
            {language === "ko" ? "기본 원칙" : "Core rules"}
          </p>
          <ul className="home-source-list">
            <li>
              <strong>
                {language === "ko" ? "분리된 경로" : "Separate routes"}
              </strong>
              <span>
                {language === "ko"
                  ? "건물, 건축가, 유형, 도시, 지도, 검색은 각각 독립된 진입 경로를 유지합니다."
                  : "Buildings, architects, types, cities, map, and search stay independent."}
              </span>
            </li>
            <li>
              <strong>
                {language === "ko" ? "표면에 드러난 카운트" : "Visible counts"}
              </strong>
              <span>
                {language === "ko"
                  ? "카운트와 카테고리를 표면에 두어 빠르게 훑을 수 있게 합니다."
                  : "Counts and categories stay visible so the archive can be scanned quickly."}
              </span>
            </li>
            <li>
              <strong>
                {language === "ko"
                  ? "절제된 인터페이스"
                  : "Restrained interface"}
              </strong>
              <span>
                {language === "ko"
                  ? "강한 연출보다 구조와 텍스트가 먼저 읽히게 유지합니다."
                  : "Structure and text are kept more visible than theatrical presentation."}
              </span>
            </li>
          </ul>
        </article>

        <article className="home-info">
          <p className="eyebrow">
            {language === "ko" ? "확장" : "Expansion"}
          </p>
          <ul className="home-source-list">
            <li>
              <strong>{language === "ko" ? "지도 준비 완료" : "Map ready"}</strong>
              <span>
                {language === "ko"
                  ? "좌표 기반 Google Maps 탐색과 선택 흐름이 이미 연결되어 있습니다."
                  : "Coordinate-based Google Maps browsing and selection are already wired in."}
              </span>
            </li>
            <li>
              <strong>{language === "ko" ? "스키마 준비 완료" : "Schema ready"}</strong>
              <span>
                {language === "ko"
                  ? "검색 필드는 건축물대장, GIS, 유산, 관광 데이터 구조에 맞춰져 있습니다."
                  : "Search fields are aligned to Korean building register, GIS, heritage, and tourism data structures."}
              </span>
            </li>
            <li>
              <strong>
                {language === "ko"
                  ? "교체 가능한 시드 데이터"
                  : "Replaceable seed data"}
              </strong>
              <span>
                {language === "ko"
                  ? "지금의 시드 데이터는 구조를 깨지 않고 점진적으로 교체할 수 있습니다."
                  : "The current seed dataset can be replaced gradually without breaking the structure."}
              </span>
            </li>
          </ul>
        </article>
      </section>
    </PageShell>
  );
}
