import type { Language } from "@/lib/i18n";

import rawArchitects from "@/data/normalized/architects/archive-architects.json";
import rawAwards from "@/data/normalized/awards/archive-awards.json";
import rawBuildings from "@/data/normalized/buildings/archive-buildings.json";

type ArchitectScope = "korean" | "international";
type ArchitectProminence = "featured" | "core" | "reference";
type PublicAccess = "Public" | "Limited" | "Private";
type HeritageClass =
  | "None"
  | "Registered cultural property"
  | "Future heritage"
  | "Modern heritage candidate";
type GeocodeStatus = "verified" | "manual-review" | "pending";

export type ArchitectureSourceSystem =
  | "building-hub"
  | "building-register"
  | "gis-building"
  | "tour-api"
  | "heritage-detail"
  | "young-architect-award"
  | "official-office";

export type DataSourceRef = {
  system: ArchitectureSourceSystem;
  dataset: string;
  recordKey: string;
  note: string;
  url?: string | null;
};

export type BuildingImage = {
  id: string;
  src: string | null;
  alt: string;
  altKo: string;
  originalUrl?: string | null;
  credit?: string | null;
  licenseNote?: string | null;
  sourceUrl?: string | null;
  localPath?: string | null;
  status: "approved" | "placeholder" | "pending-review";
};

export type BuildingAward = {
  awardId: string;
  displayMode: "detail-only";
  note: string;
  noteKo: string;
};

export type Architect = {
  slug: string;
  name: string;
  nameKo: string;
  sortName: string;
  scope: ArchitectScope;
  prominence: ArchitectProminence;
  city: string;
  cityKo: string;
  founded?: number;
  focus: string;
  focusKo: string;
  summary: string;
  summaryKo: string;
  palette: [string, string, string];
  officeNames: string[];
};

export type Award = {
  id: string;
  slug: string;
  name: string;
  nameKo: string;
  organizer: string;
  awardYear: number;
  category: string;
  categoryKo: string;
  result: string;
  resultKo: string;
  sourceUrl: string;
};

export type Building = {
  id: string;
  slug: string;
  title: string;
  titleKo: string;
  city: string;
  cityKo: string;
  district: string;
  districtKo: string;
  year: number;
  completionYear: number | null;
  type: string;
  typeKo: string;
  status: string;
  statusKo: string;
  architectSlugs: string[];
  officeNames: string[];
  summary: string;
  summaryKo: string;
  highlight: string;
  highlightKo: string;
  sourceExcerpt: string;
  sourceExcerptKo: string;
  materials: string[];
  palette: [string, string, string];
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  address: string;
  addressKo: string;
  roadAddress: string;
  roadAddressKo: string;
  rawAddress: string;
  rawAddressKo: string;
  areaSqm: number;
  landAreaSqm: number;
  floorsAboveGround: number;
  floorsBelowGround: number;
  structureLabel: string;
  structureLabelKo: string;
  roofLabel: string;
  roofLabelKo: string;
  primaryUseCode: string;
  primaryUseLabel: string;
  primaryUseLabelKo: string;
  permitDate: string;
  completionDate: string;
  publicAccess: PublicAccess;
  publicAccessKo: string;
  heritageClass: HeritageClass;
  heritageClassKo: string;
  tags: string[];
  placeId?: string | null;
  geocodeStatus: GeocodeStatus;
  geocodeConfidence?: number | null;
  sourceUrl: string;
  images: BuildingImage[];
  heroImage: BuildingImage | null;
  sourceRefs: DataSourceRef[];
  awards: BuildingAward[];
  imagesAvailable: boolean;
};

export type Collection = {
  slug: string;
  title: string;
  focus: string;
  summary: string;
  entries: number;
};

type RawArchitect = {
  slug: string;
  name_ko: string;
  name_en: string;
  sort_name: string;
  scope: ArchitectScope;
  prominence: ArchitectProminence;
  city_ko: string;
  city_en: string;
  founded?: number;
  focus_ko: string;
  focus_en: string;
  summary_ko: string;
  summary_en: string;
  palette: [string, string, string];
  office_names: string[];
};

type RawAward = {
  id: string;
  slug: string;
  name_ko: string;
  name_en: string;
  organizer: string;
  award_year: number;
  category_ko: string;
  category_en: string;
  result_ko: string;
  result_en: string;
  source_url: string;
};

type RawBuilding = Omit<Building, "imagesAvailable">;

const materialLabels: Record<string, string> = {
  Timber: "목재",
  Concrete: "콘크리트",
  Glass: "유리",
  Aluminum: "알루미늄",
  Oak: "오크",
  Stone: "석재",
  Polycarbonate: "폴리카보네이트",
  "Galvanized steel": "아연도금 강판",
  Brick: "벽돌",
  Basalt: "현무암"
};

const sourceSystemLabels: Record<ArchitectureSourceSystem, { ko: string; en: string }> = {
  "building-hub": { ko: "건축 HUB", en: "Building Hub" },
  "building-register": { ko: "건축물대장", en: "Building Register" },
  "gis-building": { ko: "GIS 건물", en: "GIS Building" },
  "tour-api": { ko: "관광 API", en: "Tour API" },
  "heritage-detail": { ko: "유산 상세", en: "Heritage Detail" },
  "young-architect-award": { ko: "젊은 건축가상", en: "Young Architect Award" },
  "official-office": { ko: "공식 사무소", en: "Official Office" }
};

const cityNotes: Record<string, { ko: string; en: string }> = {
  Hongcheon: {
    ko: "도시보다 풍경의 밀도가 먼저 읽히는 지역으로, 작은 건축의 태도를 보기 좋다.",
    en: "A regional cluster where landscape is read before urban density, useful for studying the stance of smaller buildings."
  },
  Seoul: {
    ko: "도시 밀도와 사적 생활, 공공 노출이 겹치는 조건에서 건축의 태도가 선명하게 드러난다.",
    en: "A dense urban field where privacy, exposure, and public life overlap in ways that sharply reveal architectural attitudes."
  },
  Jeju: {
    ko: "관광과 일상, 풍경과 생활 프로그램이 동시에 압력을 주는 조건을 읽기 좋다.",
    en: "Useful for reading conditions where tourism, daily life, landscape, and local programs press on architecture at once."
  },
  Seogwipo: {
    ko: "관광지의 가장자리와 생활의 리듬이 만나는 지점에서 지역 건축의 해법을 볼 수 있다.",
    en: "Shows how regional architecture works at the meeting point between tourist edges and the rhythm of ordinary life."
  },
  Siheung: {
    ko: "기반 시설과 시민 환경을 함께 다루는 건축적 장치를 읽기에 적합한 도시다.",
    en: "A city well suited to reading architectural devices that bridge infrastructure and the civic environment."
  }
};

const typeNotes: Record<string, { ko: string; en: string }> = {
  "Cafe / Detached House": {
    ko: "생활과 접객이 한 구조 안에서 만나는 작은 복합 주거 유형이다.",
    en: "A small hybrid type where dwelling and hospitality meet inside one compact framework."
  },
  "Art Lounge": {
    ko: "짧은 체류와 느린 감상이 만나는 문화적 휴식 공간 유형이다.",
    en: "A cultural pause-space where short stays and slow looking can overlap."
  },
  "Detached House / Neighborhood Facility": {
    ko: "사적인 집과 동네를 향한 프로그램이 한 건물 안에서 교차하는 유형이다.",
    en: "A type where the private house and neighborhood-facing program intersect in one building."
  },
  "Neighborhood Facility": {
    ko: "지역의 작은 일상과 방문을 지탱하는 기초적인 공공 프로그램 유형이다.",
    en: "A foundational public program type that supports small everyday use and local visits."
  },
  "Wastewater Treatment Facility": {
    ko: "보이지 않던 기반 시설을 건축적으로 다시 읽게 만드는 프로그램 유형이다.",
    en: "A program type that makes hidden infrastructure legible as architecture."
  },
  "Detached House": {
    ko: "밀도 높은 도시 조건 속에서도 사적 삶의 구조를 세밀하게 조정하는 주거 유형이다.",
    en: "A residential type that carefully adjusts private life even inside dense urban conditions."
  }
};

const awardLookup = new Map<string, Award>();

export const architects: Architect[] = ((rawArchitects as unknown) as RawArchitect[]).map(
  (architect) => ({
    slug: architect.slug,
    name: architect.name_en,
    nameKo: architect.name_ko,
    sortName: architect.sort_name,
    scope: architect.scope,
    prominence: architect.prominence,
    city: architect.city_en,
    cityKo: architect.city_ko,
    founded: architect.founded,
    focus: architect.focus_en,
    focusKo: architect.focus_ko,
    summary: architect.summary_en,
    summaryKo: architect.summary_ko,
    palette: architect.palette as [string, string, string],
    officeNames: architect.office_names
  })
);

export const awards: Award[] = (rawAwards as RawAward[]).map((award) => {
  const nextAward: Award = {
    id: award.id,
    slug: award.slug,
    name: award.name_en,
    nameKo: award.name_ko,
    organizer: award.organizer,
    awardYear: award.award_year,
    category: award.category_en,
    categoryKo: award.category_ko,
    result: award.result_en,
    resultKo: award.result_ko,
    sourceUrl: award.source_url
  };

  awardLookup.set(nextAward.id, nextAward);
  return nextAward;
});

export const buildings: Building[] = ((rawBuildings as unknown) as RawBuilding[]).map(
  (building) => ({
    ...building,
    palette: building.palette as [string, string, string],
    imagesAvailable: building.images.some((image) => image.status === "approved")
  })
);

export const architectNameMap = Object.fromEntries(
  architects.map((architect) => [architect.slug, architect.name])
) as Record<string, string>;

export const architectNameMapKo = Object.fromEntries(
  architects.map((architect) => [architect.slug, architect.nameKo])
) as Record<string, string>;

function unique<T>(values: T[]) {
  return Array.from(new Set(values));
}

function firstMatchingBuildingBy<K extends keyof Building>(
  key: K,
  value: Building[K]
) {
  return buildings.find((building) => building[key] === value);
}

function labelByLanguage(ko: string, en: string, language: Language) {
  return language === "ko" ? ko : en;
}

export function getArchitectFocus(architect: Architect, language: Language) {
  return labelByLanguage(architect.focusKo, architect.focus, language);
}

export function getArchitectSummary(architect: Architect, language: Language) {
  return labelByLanguage(architect.summaryKo, architect.summary, language);
}

export function getArchitectName(slug: string, language: Language) {
  const architect = architects.find((entry) => entry.slug === slug);

  if (!architect) {
    return slug;
  }

  return labelByLanguage(architect.nameKo, architect.name, language);
}

export function getBuildingTitle(building: Building, language: Language) {
  return labelByLanguage(building.titleKo, building.title, language);
}

export function getBuildingSummary(building: Building, language: Language) {
  return labelByLanguage(building.summaryKo, building.summary, language);
}

export function getBuildingHighlight(building: Building, language: Language) {
  return labelByLanguage(building.highlightKo, building.highlight, language);
}

export function getBuildingExcerpt(building: Building, language: Language) {
  return labelByLanguage(building.sourceExcerptKo, building.sourceExcerpt, language);
}

export function getBuildingAddress(building: Building, language: Language) {
  return labelByLanguage(building.addressKo, building.address, language);
}

export function getBuildingRoadAddress(building: Building, language: Language) {
  return labelByLanguage(building.roadAddressKo, building.roadAddress, language);
}

export function getCityLabel(city: string, language: Language) {
  const fromBuilding = firstMatchingBuildingBy("city", city);
  const fromArchitect = architects.find((architect) => architect.city === city);

  if (language === "en") {
    return city;
  }

  return fromBuilding?.cityKo ?? fromArchitect?.cityKo ?? city;
}

export function getDistrictLabel(district: string, language: Language) {
  const fromBuilding = firstMatchingBuildingBy("district", district);

  if (language === "en") {
    return district;
  }

  return fromBuilding?.districtKo ?? district;
}

export function getTypeLabel(type: string, language: Language) {
  const fromBuilding = firstMatchingBuildingBy("type", type);

  if (language === "en") {
    return type;
  }

  return fromBuilding?.typeKo ?? type;
}

export function getStatusLabel(status: string, language: Language) {
  const fromBuilding = firstMatchingBuildingBy("status", status);

  if (language === "en") {
    return status;
  }

  return fromBuilding?.statusKo ?? status;
}

export function getMaterialLabel(material: string, language: Language) {
  if (language === "en") {
    return material;
  }

  return materialLabels[material] ?? material;
}

export function getStructureLabel(structure: string, language: Language) {
  const fromBuilding = buildings.find((building) => building.structureLabel === structure);

  if (language === "en") {
    return structure;
  }

  return fromBuilding?.structureLabelKo ?? structure;
}

export function getPrimaryUseLabel(use: string, language: Language) {
  const fromBuilding = buildings.find((building) => building.primaryUseLabel === use);

  if (language === "en") {
    return use;
  }

  return fromBuilding?.primaryUseLabelKo ?? use;
}

export function getPublicAccessLabel(access: PublicAccess, language: Language) {
  const fromBuilding = buildings.find((building) => building.publicAccess === access);

  if (language === "en") {
    return access;
  }

  return fromBuilding?.publicAccessKo ?? access;
}

export function getHeritageLabel(heritage: HeritageClass, language: Language) {
  const fromBuilding = buildings.find((building) => building.heritageClass === heritage);

  if (language === "en") {
    return heritage;
  }

  return fromBuilding?.heritageClassKo ?? heritage;
}

export function getSourceSystemLabel(
  system: ArchitectureSourceSystem,
  language: Language
) {
  return sourceSystemLabels[system][language];
}

export function getBuildingHeroImage(building: Building) {
  return (
    building.heroImage ??
    building.images.find((image) => image.status === "approved") ??
    null
  );
}

export function getBuildingAwardRecords(building: Building) {
  return building.awards
    .map((entry) => {
      const award = awardLookup.get(entry.awardId);

      if (!award) {
        return null;
      }

      return {
        ...entry,
        award
      };
    })
    .filter(Boolean) as Array<BuildingAward & { award: Award }>;
}

export function getArchitectNamesForBuilding(
  building: Building,
  language: Language
) {
  return building.architectSlugs.map((slug) => getArchitectName(slug, language));
}

export function getBuildingsForArchitect(slug: string) {
  return buildings.filter((building) => building.architectSlugs.includes(slug));
}

export function getRelatedBuildings(slug: string) {
  const building = buildings.find((entry) => entry.slug === slug);

  if (!building) {
    return [];
  }

  return buildings.filter((entry) => {
    if (entry.slug === slug) {
      return false;
    }

    const sharesArchitect = entry.architectSlugs.some((architectSlug) =>
      building.architectSlugs.includes(architectSlug)
    );
    const sharesOffice = entry.officeNames.some((officeName) =>
      building.officeNames.includes(officeName)
    );

    return sharesArchitect || sharesOffice;
  });
}

export function findBuildingBySlug(slug: string) {
  return buildings.find((building) => building.slug === slug) ?? null;
}

export function getCityNote(city: string, language: Language) {
  const note = cityNotes[city];

  if (!note) {
    return language === "ko"
      ? "앞으로 더 많은 지역 아카이브를 연결할 예정인 도시다."
      : "A city that will connect to a wider regional archive as the dataset grows.";
  }

  return note[language];
}

export function getTypeNote(type: string, language: Language) {
  const note = typeNotes[type];

  if (!note) {
    return language === "ko"
      ? "데이터가 확장되면 더 많은 읽기 경로를 묶을 수 있는 프로그램 유형이다."
      : "A program type that can support broader reading routes as the dataset expands.";
  }

  return note[language];
}

export const siteStats = {
  buildings: buildings.length,
  architects: architects.length,
  cities: unique(buildings.map((building) => building.city)).length,
  types: unique(buildings.map((building) => building.type)).length
};

export const districtOptions = unique(
  buildings.map((building) => building.district)
).sort((left, right) => left.localeCompare(right, "en"));

export const cityOptions = unique(buildings.map((building) => building.city)).sort(
  (left, right) => left.localeCompare(right, "en")
);

export const typeOptions = unique(buildings.map((building) => building.type)).sort(
  (left, right) => left.localeCompare(right, "en")
);

export const materialOptions = unique(
  buildings.flatMap((building) => building.materials)
).sort((left, right) => left.localeCompare(right, "en"));

export const statusOptions = unique(
  buildings.map((building) => building.status)
).sort((left, right) => left.localeCompare(right, "en"));

export const accessOptions = unique(
  buildings.map((building) => building.publicAccess)
).sort((left, right) => left.localeCompare(right, "en"));

export const heritageOptions = unique(
  buildings.map((building) => building.heritageClass)
).sort((left, right) => left.localeCompare(right, "en"));

export const sourceSystemOptions = unique(
  buildings.flatMap((building) => building.sourceRefs.map((source) => source.system))
).sort((left, right) => left.localeCompare(right, "en"));

export const structureOptions = unique(
  buildings.map((building) => building.structureLabel)
).sort((left, right) => left.localeCompare(right, "en"));

export const yearRange = {
  min: Math.min(...buildings.map((building) => building.year)),
  max: Math.max(...buildings.map((building) => building.year))
};

export const citySummaries = unique(buildings.map((building) => building.city)).map(
  (city) => {
    const group = buildings.filter((building) => building.city === city);

    return {
      city,
      note: cityNotes[city]?.en ?? "Emerging regional archive cluster.",
      buildingCount: group.length,
      types: unique(group.map((building) => building.type)),
      lead: group[0]
    };
  }
);

export const typeSummaries = unique(buildings.map((building) => building.type)).map(
  (type) => {
    const group = buildings.filter((building) => building.type === type);

    return {
      type,
      note: typeNotes[type]?.en ?? "A category for future archive expansion.",
      buildingCount: group.length,
      cities: unique(group.map((building) => building.city)),
      lead: group[0]
    };
  }
);

export const collections: Collection[] = [
  {
    slug: "young-architect-award-2025",
    title: "Young Architect Award 2025",
    focus: "Recent Korean architects and representative projects",
    summary:
      "A first seed set built around recent Korean architects whose work is already being watched and referenced.",
    entries: buildings.length
  }
];

export const focusPrinciples = [
  "Keep the archive building-first while allowing architects and maps to remain strong entry points.",
  "Treat awards as metadata inside the project page, not as the front-facing information architecture.",
  "Use geocoded coordinates, source links, and excerpt fields so the map and detail page can grow from the same record.",
  "Prefer reviewable ingestion steps over opaque scraping."
];

export function getBuildingBounds() {
  const geocoded = buildings.filter(
    (building): building is Building & { coordinates: { lat: number; lng: number } } =>
      Boolean(building.coordinates)
  );

  if (geocoded.length === 0) {
    return {
      north: 38,
      south: 33,
      east: 129.5,
      west: 126
    };
  }

  const latitudes = geocoded.map((building) => building.coordinates.lat);
  const longitudes = geocoded.map((building) => building.coordinates.lng);

  return {
    north: Math.max(...latitudes),
    south: Math.min(...latitudes),
    east: Math.max(...longitudes),
    west: Math.min(...longitudes)
  };
}
