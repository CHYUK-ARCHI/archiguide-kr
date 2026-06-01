"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { PageShell } from "@/components/page-shell";
import {
  architects,
  getArchitectFocus,
  getArchitectSummary,
  getBuildingTitle,
  getBuildingsForArchitect,
  getCityLabel,
  getTypeLabel
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
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredArchitects = useMemo(
    () =>
      [...architects]
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
            getProminenceScore(left.prominence) -
            getProminenceScore(right.prominence);

          if (prominenceDelta !== 0) {
            return prominenceDelta;
          }

          return left.sortName.localeCompare(right.sortName, "en", {
            sensitivity: "base"
          });
        }),
    [normalizedQuery]
  );

  useEffect(() => {
    if (filteredArchitects.length === 0) {
      setSelectedSlug(null);
      return;
    }

    if (
      !selectedSlug ||
      !filteredArchitects.some((architect) => architect.slug === selectedSlug)
    ) {
      setSelectedSlug(filteredArchitects[0].slug);
    }
  }, [filteredArchitects, selectedSlug]);

  const groupedArchitects = alphabet
    .map((letter) => ({
      letter,
      items: filteredArchitects.filter(
        (architect) => getGroupKey(architect.sortName) === letter
      )
    }))
    .filter((group) => group.items.length > 0);

  const selectedArchitect =
    filteredArchitects.find((architect) => architect.slug === selectedSlug) ?? null;
  const selectedProjects = selectedArchitect
    ? getBuildingsForArchitect(selectedArchitect.slug)
    : [];
  const featuredCount = filteredArchitects.filter(
    (architect) => architect.prominence === "featured"
  ).length;

  return (
    <PageShell active="architects">
      <section className="page-head">
        <p className="eyebrow">
          {language === "ko" ? "건축가 인덱스" : "Architect index"}
        </p>
        <h1 className="page-title">
          {language === "ko" ? "건축가" : "architects"}
        </h1>
        <p className="page-intro">
          {language === "ko"
            ? "건축가 이름을 먼저 찾고, 오른쪽에서 선택된 건축가와 연결 프로젝트를 읽는 방식으로 정리했습니다."
            : "Find an architect by name first, then read the selected architect and linked projects on the right."}
        </p>
        <p className="page-footnote">
          {language === "ko"
            ? `${filteredArchitects.length}개 이름 / 주요 레퍼런스 ${featuredCount}개`
            : `${filteredArchitects.length} names / ${featuredCount} featured references`}
        </p>
      </section>

      <section className="architect-browser">
        <aside className="architect-browser__sidebar">
          <form
            className="architect-browser__search"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="eyebrow" htmlFor="architect-search">
              {language === "ko"
                ? "건축가 이름 검색"
                : "Search architect names"}
            </label>
            <input
              id="architect-search"
              className="architect-browser__input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                language === "ko"
                  ? "이름, 도시, 키워드"
                  : "Name, city, keyword"
              }
            />
          </form>

          <nav
            className="architect-browser__alphabet"
            aria-label="Architect initials"
          >
            {alphabet.map((letter) => {
              const hasItems = filteredArchitects.some(
                (architect) => getGroupKey(architect.sortName) === letter
              );

              return (
                <a
                  key={letter}
                  href={`#architect-letter-${letter.toLowerCase()}`}
                  className={`architect-browser__alphabet-link${
                    hasItems ? "" : " architect-browser__alphabet-link--disabled"
                  }`}
                >
                  {letter}
                </a>
              );
            })}
          </nav>

          <div className="architect-browser__list">
            {groupedArchitects.length === 0 ? (
              <p className="architect-browser__empty">
                {language === "ko"
                  ? "검색 결과가 없습니다."
                  : "No architects match this search."}
              </p>
            ) : (
              groupedArchitects.map((group) => (
                <section
                  key={group.letter}
                  id={`architect-letter-${group.letter.toLowerCase()}`}
                  className="architect-browser__group"
                >
                  <div className="architect-browser__group-head">
                    <span className="architect-browser__group-letter">
                      {group.letter}
                    </span>
                    <span className="architect-browser__group-count">
                      {String(group.items.length).padStart(2, "0")}
                    </span>
                  </div>

                  <ul className="architect-browser__name-list" role="list">
                    {group.items.map((architect) => (
                      <li key={architect.slug}>
                        <button
                          type="button"
                          className={`architect-browser__name-button${
                            architect.slug === selectedSlug
                              ? " architect-browser__name-button--active"
                              : ""
                          }`}
                          onClick={() => setSelectedSlug(architect.slug)}
                        >
                          {architect.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ))
            )}
          </div>
        </aside>

        <div className="architect-browser__content">
          {selectedArchitect ? (
            <>
              <section className="architect-browser__hero">
                <p className="eyebrow">
                  {selectedArchitect.scope === "korean"
                    ? language === "ko"
                      ? "한국 건축가"
                      : "Korean architect"
                    : language === "ko"
                      ? "해외 건축가"
                      : "International architect"}
                </p>
                <h2 className="architect-browser__title">
                  {selectedArchitect.name}
                </h2>
                <p className="architect-browser__meta">
                  {[
                    getCityLabel(selectedArchitect.city, language),
                    selectedArchitect.founded
                      ? language === "ko"
                        ? `${selectedArchitect.founded} 설립`
                        : `founded ${selectedArchitect.founded}`
                      : null,
                    selectedArchitect.prominence === "featured"
                      ? language === "ko"
                        ? "주요 레퍼런스"
                        : "featured reference"
                      : selectedArchitect.prominence === "core"
                        ? language === "ko"
                          ? "핵심 레퍼런스"
                          : "core reference"
                        : language === "ko"
                          ? "아카이브 시드"
                          : "archive seed"
                  ]
                    .filter(Boolean)
                    .join(" / ")}
                </p>
                <p className="architect-browser__focus">
                  {getArchitectFocus(selectedArchitect, language)}
                </p>
                <p className="architect-browser__summary">
                  {getArchitectSummary(selectedArchitect, language)}
                </p>
              </section>

              <section className="architect-browser__projects">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">
                      {language === "ko" ? "연결 프로젝트" : "Linked projects"}
                    </p>
                    <h2>
                      {language === "ko"
                        ? "이 건축가와 연결된 아카이브 항목"
                        : "Archive entries linked to this architect"}
                    </h2>
                  </div>
                </div>

                {selectedProjects.length === 0 ? (
                  <p className="architect-browser__empty">
                    {language === "ko"
                      ? "아직 연결된 프로젝트가 없습니다."
                      : "No linked projects yet."}
                  </p>
                ) : (
                  <div className="architect-browser__project-list">
                    {selectedProjects.map((project, index) => (
                      <article
                        key={project.slug}
                        className="architect-browser__project"
                      >
                        <div className="architect-browser__project-number">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="architect-browser__project-body">
                          <h3 className="architect-browser__project-title">
                            {getBuildingTitle(project, language)}
                          </h3>
                          <p className="architect-browser__project-meta">
                            {[
                              getCityLabel(project.city, language),
                              getTypeLabel(project.type, language),
                              project.year
                            ].join(" / ")}
                          </p>
                          <p className="architect-browser__project-summary">
                            {project.summary}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </>
          ) : (
            <p className="architect-browser__empty architect-browser__empty--panel">
              {language === "ko"
                ? "왼쪽에서 건축가를 선택하세요."
                : "Choose an architect from the left sidebar."}
            </p>
          )}
        </div>
      </section>
    </PageShell>
  );
}
