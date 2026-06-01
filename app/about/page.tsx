import { PageShell } from "@/components/page-shell";

export default function AboutPage() {
  return (
    <PageShell active="about">
      <section className="page-head">
        <p className="eyebrow">Archive note / 방법</p>
        <h1 className="page-title">method</h1>
        <p className="page-intro">
          Archiguide KR는 건축을 탐색 가능한 읽기 시스템으로 다룹니다. 먼저
          아카이브 구조를 세우고, 그 위에 지도와 검색을 얹는 방식입니다.
        </p>
      </section>

      <section className="home-meta-grid">
        <article className="home-info">
          <p className="eyebrow">Core rules / 기본 원칙</p>
          <ul className="home-source-list">
            <li>
              <strong>Separate routes</strong>
              <span>
                Buildings, architects, types, cities, map, and search stay
                independent.
              </span>
            </li>
            <li>
              <strong>Visible counts</strong>
              <span>
                카운트와 카테고리를 표면에 두어 빠르게 훑을 수 있게 합니다.
              </span>
            </li>
            <li>
              <strong>Restrained interface</strong>
              <span>강한 연출보다 구조와 텍스트가 먼저 읽히게 유지합니다.</span>
            </li>
          </ul>
        </article>

        <article className="home-info">
          <p className="eyebrow">Expansion / 확장</p>
          <ul className="home-source-list">
            <li>
              <strong>Map ready</strong>
              <span>
                좌표 기반 Google Maps 탐색과 선택 흐름이 이미 연결되어 있습니다.
              </span>
            </li>
            <li>
              <strong>Schema ready</strong>
              <span>
                검색 필드는 건축물대장, GIS, 유산, 관광 데이터 구조에 맞춰져
                있습니다.
              </span>
            </li>
            <li>
              <strong>Replaceable seed data</strong>
              <span>
                지금의 시드 데이터는 구조를 깨지 않고 점진적으로 교체할 수
                있습니다.
              </span>
            </li>
          </ul>
        </article>
      </section>
    </PageShell>
  );
}
