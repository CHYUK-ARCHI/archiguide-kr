"use client";

import { useDeferredValue, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { PageShell } from "@/components/page-shell";
import {
  architects,
  getArchitectFocus,
  getArchitectSummary,
  getBuildingsForArchitect,
  getCityLabel
} from "@/lib/site-data";

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0-9"
] as const;

function getGroupKey(sortName: string) {
  const initial = sortName.trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(initial) ? initial : "0-9";
}

function getProminenceScore(
  prominence: "featured" | "core" | "reference"
) {
  if (prominence === "featured") {
    return 0;
  }

  if (prominence === "core") {
    return 1;
  }

  return 2;
}

export default function ArchitectsPage() {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredArchitects = [...architects]
    .filter((architect) => {
      if (!normalizedQuery) {
        return true;
      }

      const haystack = [
        architect.name,
        architect.sortName,
        architect.city,
        architect.focus,
        architect.summary
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    })
    .sort((left, right) => {
      const prominenceDelta =
        getProminenceScore(left.prominence) - getProminenceScore(right.prominence);

      if (prominenceDelta !== 0) {
        return prominenceDelta;
      }

      return left.sortName.localeCompare(right.sortName, "en", {
        sensitivity: "base"
      });
    });

  const groups = alphabet
    .map((letter) => ({
      letter,
      items: filteredArchitects.filter(
        (architect) => getGroupKey(architect.sortName) === letter
      )
    }))
    .filter((group) => group.items.length > 0);

  const featuredCount = filteredArchitects.filter(
    (architect) => architect.prominence === "featured"
  ).length;

  return (
    <PageShell active="architects">
      <section className="page-head">
        <p className="eyebrow">
          {language === "ko" ? "이름 인덱스" : "Name index"}
        </p>
        <h1 className="page-title">
          {language === "ko" ? "건축가" : "architects"}
        </h1>
        <p className="page-intro">
          {language === "ko"
            ? "건축가 이름으로 먼저 탐색하는 페이지입니다. 검색, 알파벳 점프, 유명 건축가 중심의 목록을 가볍게 읽을 수 있게 정리했습니다."
            : "Browse the archive by architect name first. Search, jump by letter, and move through a light index led by famous Korean and international references."}
        </p>
        <p className="page-footnote">
          {language === "ko"
            ? `${filteredArchitects.length}개 이름 / 주요 레퍼런스 ${featuredCount}개`
            : `${filteredArchitects.length} names / ${featuredCount} featured references`}
        </p>
      </section>

      <section className="architect-index">
        <form
          className="architect-index__search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="eyebrow" htmlFor="architect-search">
            {language === "ko"
              ? "건축가 이름으로 검색"
              : "Search in architect names"}
          </label>
          <div className="architect-index__search-row">
            <input
              id="architect-search"
              className="architect-index__input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                language === "ko"
                  ? "이름, 오피스, 도시, 키워드를 입력하세요"
                  : "Type a name, office, city, or keyword"
              }
            />
            <button className="architect-index__button" type="submit">
              {language === "ko" ? "검색" : "Search"}
            </button>
          </div>
        </form>

        <nav className="architect-index__alphabet" aria-label="Architect initials">
          {alphabet.map((letter) => {
            const count = filteredArchitects.filter(
              (architect) => getGroupKey(architect.sortName) === letter
            ).length;

            if (count === 0) {
              return (
                <span
                  key={letter}
                  className="architect-index__letter architect-index__letter--disabled"
                >
                  {letter}
                </span>
              );
            }

            return (
              <a
                key={letter}
                href={`#architect-group-${letter.toLowerCase()}`}
                className="architect-index__letter"
              >
                {letter}
              </a>
            );
          })}
        </nav>

        <div className="architect-index__summary">
          <span>
            {language === "ko"
              ? "유명 건축가가 시드 목록의 앞부분을 이끕니다."
              : "Famous architects lead the seed list."}
          </span>
          <span>
            {language === "ko"
              ? "한국과 해외 이름을 하나의 가벼운 인덱스로 함께 봅니다."
              : "Korean and international names stay in one lightweight index."}
          </span>
        </div>
      </section>

      <section className="architect-directory">
        {groups.length === 0 ? (
          <p className="architect-directory__empty">
            {language === "ko"
              ? "검색 결과에 맞는 건축가가 아직 없습니다."
              : "No architects match this search yet."}
          </p>
        ) : (
          groups.map((group) => (
            <div
              key={group.letter}
              id={`architect-group-${group.letter.toLowerCase()}`}
              className="architect-group"
            >
              <div className="architect-group__head">
                <h2 className="architect-group__letter">{group.letter}</h2>
                <p className="architect-group__count">
                  {String(group.items.length).padStart(2, "0")}{" "}
                  {language === "ko" ? "이름" : "names"}
                </p>
              </div>

              <ul className="architect-list" role="list">
                {group.items.map((architect) => {
                  const relatedBuildings = getBuildingsForArchitect(architect.slug);
                  const secondaryMeta = [
                    architect.scope === "korean"
                      ? language === "ko"
                        ? "한국"
                        : "Korean"
                      : language === "ko"
                        ? "해외"
                        : "International",
                    getCityLabel(architect.city, language),
                    architect.founded
                      ? language === "ko"
                        ? `${architect.founded} 설립`
                        : `founded ${architect.founded}`
                      : null
                  ].filter(Boolean);

                  return (
                    <li key={architect.slug} className="architect-list__item">
                      <div className="architect-list__bullet" aria-hidden="true">
                        O
                      </div>
                      <div className="architect-list__body">
                        <div className="architect-list__top">
                          <h3 className="architect-list__name">{architect.name}</h3>
                          <span className="architect-list__tag">
                            {architect.prominence === "featured"
                              ? language === "ko"
                                ? "주요 레퍼런스"
                                : "featured reference"
                              : architect.prominence === "core"
                                ? language === "ko"
                                  ? "핵심 레퍼런스"
                                  : "core reference"
                                : language === "ko"
                                  ? "아카이브 시드"
                                  : "archive seed"}
                          </span>
                        </div>
                        <p className="architect-list__meta">
                          {secondaryMeta.join(" / ")}
                        </p>
                        <p className="architect-list__focus">
                          {getArchitectFocus(architect, language)}
                        </p>
                        <p className="architect-list__summary">
                          {getArchitectSummary(architect, language)}
                        </p>
                      </div>
                      <div className="architect-list__side">
                        <span className="architect-list__count">
                          {String(relatedBuildings.length).padStart(2, "0")}
                        </span>
                        <span className="architect-list__count-label">
                          {relatedBuildings.length > 0
                            ? language === "ko"
                              ? "연결 프로젝트"
                              : "linked projects"
                            : language === "ko"
                              ? "추가 예정"
                              : "projects to add"}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </section>
    </PageShell>
  );
}
