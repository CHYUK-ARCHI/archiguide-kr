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
        <p className="eyebrow">Schema route</p>
        <h1 className="page-title">search</h1>
        <p className="page-intro">
          Extended search remains tied to fields that Korean public building,
          GIS, heritage, and tourism datasets already expose.
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
