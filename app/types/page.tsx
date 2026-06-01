import { PageShell } from "@/components/page-shell";
import { typeSummaries } from "@/lib/site-data";

export default function TypesPage() {
  return (
    <PageShell active="types">
      <section className="page-head">
        <p className="eyebrow">Program route / 유형</p>
        <h1 className="page-title">types</h1>
        <p className="page-intro">
          건물 유형은 배경 정보가 아니라 읽기 방식의 기준입니다. 비슷한 프로그램을
          한 번에 훑을 수 있도록 정리합니다.
        </p>
      </section>

      <section className="directory-list">
        {typeSummaries.map((summary) => (
          <article key={summary.type} className="directory-row">
            <div className="directory-row__count">
              {String(summary.buildingCount).padStart(2, "0")}
            </div>
            <div className="directory-row__title">
              <h2>{summary.type}</h2>
              <p>{summary.lead.city} lead city</p>
            </div>
            <div className="directory-row__summary">
              <p>{summary.note}</p>
            </div>
            <div className="directory-row__meta">
              <span>{summary.lead.title}</span>
              <span>{summary.cities.join(", ")}</span>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
