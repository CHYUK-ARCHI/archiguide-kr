import { AdvancedSearch } from "@/components/advanced-search";
import { PageShell } from "@/components/page-shell";
import {
  accessOptions,
  architectNameMap,
  buildings,
  cityOptions,
  districtOptions,
  heritageOptions,
  materialOptions,
  sourceSystemOptions,
  statusOptions,
  structureOptions,
  typeOptions,
  yearRange
} from "@/lib/site-data";

export default function SearchPage() {
  return (
    <PageShell active="search">
      <section className="page-head">
        <p className="eyebrow">Search</p>
        <h1 className="page-title">Advanced search built on real public-data facets.</h1>
        <p className="page-intro">
          This search layer is intentionally broader than the current seed dataset. It matches fields already exposed by Korean building-ledger, GIS building, tourism, and heritage sources so the archive can scale without redesigning the interface.
        </p>
      </section>

      <AdvancedSearch
        buildings={buildings}
        architectNameMap={architectNameMap}
        cityOptions={cityOptions}
        districtOptions={districtOptions}
        typeOptions={typeOptions}
        statusOptions={statusOptions}
        accessOptions={accessOptions}
        materialOptions={materialOptions}
        structureOptions={structureOptions}
        heritageOptions={heritageOptions}
        sourceSystemOptions={sourceSystemOptions}
        yearRange={yearRange}
      />
    </PageShell>
  );
}
