import { PageShell } from "@/components/page-shell";
import { architects, getBuildingsForArchitect } from "@/lib/site-data";

export default function ArchitectsPage() {
  return (
    <PageShell active="architects">
      <section className="page-head">
        <p className="eyebrow">Authorship route / 건축가</p>
        <h1 className="page-title">architects</h1>
        <p className="page-intro">
          건축가는 이름 목록이 아니라 반복되는 태도와 작업 궤적으로 읽히도록
          정리합니다.
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
                <p>{architect.city} / founded {architect.founded}</p>
              </div>
              <div className="directory-row__summary">
                <p>{architect.focus}</p>
                <p>{architect.summary}</p>
              </div>
              <div className="directory-row__meta">
                <span>{relatedBuildings.length} linked entries</span>
                <span>{relatedBuildings.map((building) => building.title).join(", ")}</span>
              </div>
            </article>
          );
        })}
      </section>
    </PageShell>
  );
}
