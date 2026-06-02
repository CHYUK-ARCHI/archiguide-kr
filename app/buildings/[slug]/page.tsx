import Link from "next/link";
import { notFound } from "next/navigation";

import { BuildingMedia } from "@/components/building-media";
import { PageShell } from "@/components/page-shell";
import {
  architectNameMap,
  buildings,
  findBuildingBySlug,
  getArchitectNamesForBuilding,
  getBuildingAddress,
  getBuildingAwardRecords,
  getBuildingExcerpt,
  getBuildingHighlight,
  getBuildingRoadAddress,
  getBuildingSummary,
  getBuildingTitle,
  getCityLabel,
  getDistrictLabel,
  getMaterialLabel,
  getPrimaryUseLabel,
  getPublicAccessLabel,
  getRelatedBuildings,
  getSourceSystemLabel,
  getStatusLabel,
  getStructureLabel,
  getTypeLabel
} from "@/lib/site-data";

type BuildingDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return buildings.map((building) => ({
    slug: building.slug
  }));
}

export default function BuildingDetailPage({
  params
}: BuildingDetailPageProps) {
  const building = findBuildingBySlug(params.slug);

  if (!building) {
    notFound();
  }

  const currentIndex = buildings.findIndex((entry) => entry.slug === building.slug);
  const nextBuilding = buildings[(currentIndex + 1) % buildings.length];
  const relatedBuildings = getRelatedBuildings(building.slug).slice(0, 3);
  const awardRecords = getBuildingAwardRecords(building);
  const architectNamesKo = getArchitectNamesForBuilding(building, "ko");
  const architectNamesEn = getArchitectNamesForBuilding(building, "en");

  return (
    <PageShell active="buildings">
      <article className="building-detail">
        <nav className="building-detail__topline" aria-label="Entry navigation">
          <Link href="/map" className="building-detail__topline-link">
            kaart
          </Link>
          <span className="building-detail__topline-separator">-</span>
          <Link href="/buildings" className="building-detail__topline-link">
            afbeeldingen
          </Link>
          <span className="building-detail__topline-separator">-</span>
          <Link
            href={`/buildings/${nextBuilding.slug}`}
            className="building-detail__topline-link"
          >
            volgende project
          </Link>
        </nav>

        <header className="building-detail__header">
          <p className="building-detail__eyebrow">building detail</p>
          <h1 className="building-detail__title">{building.title}</h1>
          <p className="building-detail__subtitle">
            {architectNamesEn.join(", ")}, {building.completionYear ?? building.year} /{" "}
            {getBuildingRoadAddress(building, "en")}
          </p>
          <p className="building-detail__subtitle building-detail__subtitle--ko">
            {architectNamesKo.join(", ")} / {getBuildingRoadAddress(building, "ko")}
          </p>
        </header>

        <BuildingMedia building={building} variant="hero" />

        <section className="building-detail__body">
          <aside className="building-detail__meta">
            <dl className="detail-list">
              <div>
                <dt>architect</dt>
                <dd>{architectNamesEn.join(", ")}</dd>
              </div>
              <div>
                <dt>architect (ko)</dt>
                <dd>{architectNamesKo.join(", ")}</dd>
              </div>
              <div>
                <dt>office</dt>
                <dd>{building.officeNames.join(", ")}</dd>
              </div>
              <div>
                <dt>location</dt>
                <dd>
                  {getCityLabel(building.city, "en")} /{" "}
                  {getDistrictLabel(building.district, "en")}
                </dd>
              </div>
              <div>
                <dt>address</dt>
                <dd>{getBuildingAddress(building, "en")}</dd>
              </div>
              <div>
                <dt>road address</dt>
                <dd>{getBuildingRoadAddress(building, "en")}</dd>
              </div>
              <div>
                <dt>program</dt>
                <dd>{getTypeLabel(building.type, "en")}</dd>
              </div>
              <div>
                <dt>status</dt>
                <dd>{getStatusLabel(building.status, "en")}</dd>
              </div>
              <div>
                <dt>use</dt>
                <dd>{getPrimaryUseLabel(building.primaryUseLabel, "en")}</dd>
              </div>
              <div>
                <dt>structure</dt>
                <dd>{getStructureLabel(building.structureLabel, "en")}</dd>
              </div>
              <div>
                <dt>materials</dt>
                <dd>
                  {building.materials
                    .map((material) => getMaterialLabel(material, "en"))
                    .join(", ")}
                </dd>
              </div>
              <div>
                <dt>access</dt>
                <dd>{getPublicAccessLabel(building.publicAccess, "en")}</dd>
              </div>
              <div>
                <dt>geocode</dt>
                <dd>
                  {building.geocodeStatus}
                  {typeof building.geocodeConfidence === "number"
                    ? ` (${Math.round(building.geocodeConfidence * 100)}%)`
                    : ""}
                </dd>
              </div>
              {awardRecords.length > 0 ? (
                <div>
                  <dt>award</dt>
                  <dd>
                    {awardRecords
                      .map(
                        (record) =>
                          `${record.award.name} / ${record.award.result} ${record.award.awardYear}`
                      )
                      .join(", ")}
                  </dd>
                </div>
              ) : null}
            </dl>
          </aside>

          <div className="building-detail__content">
            <section className="building-detail__section">
              <p className="building-detail__lead">{getBuildingSummary(building, "en")}</p>
              <p>{getBuildingHighlight(building, "en")}</p>
            </section>

            <section className="building-detail__section">
              <h2>source excerpt</h2>
              <p>{getBuildingExcerpt(building, "en")}</p>
              <p className="building-detail__source-note">
                This excerpt is stored as archive metadata rather than a full mirrored article.
              </p>
              <p>
                <a href={building.sourceUrl} target="_blank" rel="noreferrer">
                  Open source page
                </a>
              </p>
            </section>

            <section className="building-detail__section">
              <h2>archive facts</h2>
              <ul className="building-detail__facts">
                <li>
                  {building.areaSqm} sqm / {building.landAreaSqm} sqm site
                </li>
                <li>
                  {building.floorsAboveGround} above ground / {building.floorsBelowGround} below ground
                </li>
                <li>
                  Permit {building.permitDate} / completion {building.completionDate}
                </li>
                <li>
                  Sources:{" "}
                  {building.sourceRefs
                    .map((source) => getSourceSystemLabel(source.system, "en"))
                    .join(", ")}
                </li>
              </ul>
            </section>

            {relatedBuildings.length > 0 ? (
              <section className="building-detail__section">
                <h2>related buildings</h2>
                <div className="building-detail__related">
                  {relatedBuildings.map((entry) => (
                    <Link
                      key={entry.slug}
                      href={`/buildings/${entry.slug}`}
                      className="building-detail__related-link"
                    >
                      <span>{entry.title}</span>
                      <span>
                        {entry.architectSlugs
                          .map((slug) => architectNameMap[slug] ?? slug)
                          .join(", ")}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
