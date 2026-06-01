import type { Language } from "@/lib/i18n";

export type Architect = {
  slug: string;
  name: string;
  city: string;
  founded: number;
  focus: string;
  summary: string;
  palette: [string, string, string];
};

export type ArchitectureSourceSystem =
  | "building-hub"
  | "building-register"
  | "gis-building"
  | "tour-api"
  | "heritage-detail";

export type DataSourceRef = {
  system: ArchitectureSourceSystem;
  dataset: string;
  recordKey: string;
  note: string;
};

export type KoreanArchitectureRecord = {
  slug: string;
  title: string;
  city: string;
  district: string;
  year: number;
  type: string;
  status: string;
  architectSlugs: string[];
  summary: string;
  highlight: string;
  materials: string[];
  palette: [string, string, string];
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  roadAddress: string;
  areaSqm: number;
  landAreaSqm: number;
  floorsAboveGround: number;
  floorsBelowGround: number;
  structureLabel: string;
  roofLabel: string;
  primaryUseCode: string;
  primaryUseLabel: string;
  permitDate: string;
  completionDate: string;
  publicAccess: "Public" | "Limited" | "Private";
  heritageClass: "None" | "Registered cultural property" | "Future heritage" | "Modern heritage candidate";
  imagesAvailable: boolean;
  tags: string[];
  sourceRefs: DataSourceRef[];
};

export type Building = KoreanArchitectureRecord;

export type Collection = {
  slug: string;
  title: string;
  focus: string;
  summary: string;
  entries: number;
};

export const architects: Architect[] = [
  {
    slug: "studio-layer",
    name: "Studio Layer",
    city: "Seoul",
    founded: 2014,
    focus: "Civic interiors and adaptive reuse",
    summary: "Works across public interiors, archive spaces, and buildings that need a second cultural life.",
    palette: ["#a74d2f", "#2f3f40", "#ece1cf"]
  },
  {
    slug: "atelier-gonggan",
    name: "Atelier Gonggan",
    city: "Jeonju",
    founded: 2011,
    focus: "Hanok hybrids and climate-aware retrofits",
    summary: "Pairs traditional spatial sequences with contemporary environmental performance.",
    palette: ["#7f6a3d", "#324334", "#efe7d5"]
  },
  {
    slug: "field-office-seoul",
    name: "Field Office Seoul",
    city: "Seoul",
    founded: 2018,
    focus: "Urban stitching and public circulation",
    summary: "Designs projects where street, market, stair, and public room behave as one connected field.",
    palette: ["#45618d", "#d38f3f", "#ebe4d7"]
  },
  {
    slug: "coastal-common",
    name: "Coastal Common",
    city: "Busan",
    founded: 2016,
    focus: "Waterfront culture and regional commons",
    summary: "Builds around coasts, former port infrastructure, and civic waterfront programs.",
    palette: ["#1f5362", "#d0a05f", "#e7e0d0"]
  },
  {
    slug: "north-wall-lab",
    name: "North Wall Lab",
    city: "Daejeon",
    founded: 2020,
    focus: "Research buildings and compact learning environments",
    summary: "Explores dense campus buildings, research labs, and small-scale cultural institutions.",
    palette: ["#583f52", "#c7a971", "#f1e8d8"]
  }
];

export const buildings: Building[] = [
  {
    slug: "floating-courtyard-library",
    title: "Floating Courtyard Library",
    city: "Seoul",
    district: "Mapo",
    year: 2021,
    type: "Library",
    status: "Built",
    architectSlugs: ["studio-layer", "field-office-seoul"],
    summary: "A compact public library organized around a raised courtyard and a porous ground floor facing the street market.",
    highlight: "The project tests how a civic building can behave like an urban shortcut during the day and a reading room at night.",
    materials: ["Brick", "Exposed concrete", "Oak"],
    palette: ["#b65f31", "#17262d", "#f0e1c5"],
    coordinates: { lat: 37.5563, lng: 126.9107 },
    address: "Mapo-gu, Seoul",
    roadAddress: "28 Seongmisan-ro, Mapo-gu, Seoul",
    areaSqm: 3980,
    landAreaSqm: 1260,
    floorsAboveGround: 5,
    floorsBelowGround: 1,
    structureLabel: "Reinforced concrete",
    roofLabel: "Flat roof",
    primaryUseCode: "14000",
    primaryUseLabel: "Cultural facility",
    permitDate: "2018-09-12",
    completionDate: "2021-03-18",
    publicAccess: "Public",
    heritageClass: "None",
    imagesAvailable: true,
    tags: ["library", "courtyard", "market-edge", "civic"],
    sourceRefs: [
      {
        system: "building-hub",
        dataset: "MOLIT Building Hub",
        recordKey: "AGKR-BLD-0001",
        note: "Primary building register and use metadata"
      },
      {
        system: "gis-building",
        dataset: "MOLIT GIS building integrated info",
        recordKey: "GIS-AGKR-0001",
        note: "Geometry and parcel-linked coordinates"
      },
      {
        system: "tour-api",
        dataset: "KTO Korean Tourism Information Service",
        recordKey: "VISITKOREA-ARCH-0001",
        note: "Public-facing editorial and media layer"
      }
    ]
  },
  {
    slug: "seongsu-river-workshop",
    title: "Seongsu River Workshop",
    city: "Seoul",
    district: "Seongsu",
    year: 2023,
    type: "Mixed Use",
    status: "Adaptive reuse",
    architectSlugs: ["field-office-seoul"],
    summary: "An industrial shell converted into a public workshop, cafe, lecture hall, and fabrication floor.",
    highlight: "Instead of erasing the factory rhythm, the retrofit keeps the long-span frame visible and programs it as infrastructure.",
    materials: ["Steel", "Polycarbonate", "Birch"],
    palette: ["#274d69", "#d97742", "#efe7d8"],
    coordinates: { lat: 37.5444, lng: 127.0557 },
    address: "Seongsu-dong 2-ga, Seongdong-gu, Seoul",
    roadAddress: "42 Achasan-ro 9-gil, Seongdong-gu, Seoul",
    areaSqm: 5120,
    landAreaSqm: 1890,
    floorsAboveGround: 4,
    floorsBelowGround: 0,
    structureLabel: "Steel frame",
    roofLabel: "Sawtooth roof",
    primaryUseCode: "13000",
    primaryUseLabel: "Neighborhood living facility",
    permitDate: "2020-04-02",
    completionDate: "2023-11-14",
    publicAccess: "Limited",
    heritageClass: "Future heritage",
    imagesAvailable: true,
    tags: ["adaptive-reuse", "workshop", "industrial", "lecture"],
    sourceRefs: [
      {
        system: "building-hub",
        dataset: "MOLIT Building Hub",
        recordKey: "AGKR-BLD-0002",
        note: "Permit, use, and floor data"
      },
      {
        system: "gis-building",
        dataset: "MOLIT GIS building integrated info",
        recordKey: "GIS-AGKR-0002",
        note: "Building footprint and mapping anchor"
      }
    ]
  },
  {
    slug: "hanok-climate-lab",
    title: "Hanok Climate Lab",
    city: "Jeonju",
    district: "Wansan",
    year: 2020,
    type: "Research Center",
    status: "Built",
    architectSlugs: ["atelier-gonggan", "north-wall-lab"],
    summary: "A research center that reframes hanok courtyards as environmental devices rather than heritage replicas.",
    highlight: "The plan uses layered thresholds, deep eaves, and a thermal buffer hall to turn climate into spatial experience.",
    materials: ["Timber", "Clay tile", "Lime plaster"],
    palette: ["#7e6439", "#2f4431", "#efe6d0"],
    coordinates: { lat: 35.8145, lng: 127.1505 },
    address: "Wansan-gu, Jeonju-si, Jeollabuk-do",
    roadAddress: "61 Gyeonggijeon-gil, Wansan-gu, Jeonju-si",
    areaSqm: 2860,
    landAreaSqm: 1540,
    floorsAboveGround: 3,
    floorsBelowGround: 0,
    structureLabel: "Timber hybrid",
    roofLabel: "Tiled pitched roof",
    primaryUseCode: "10000",
    primaryUseLabel: "Educational and research facility",
    permitDate: "2017-06-28",
    completionDate: "2020-10-07",
    publicAccess: "Limited",
    heritageClass: "Modern heritage candidate",
    imagesAvailable: true,
    tags: ["hanok", "climate", "research", "courtyard"],
    sourceRefs: [
      {
        system: "building-hub",
        dataset: "MOLIT Building Hub",
        recordKey: "AGKR-BLD-0003",
        note: "Use, structure, area, and completion metadata"
      },
      {
        system: "heritage-detail",
        dataset: "Cultural heritage narrative layer",
        recordKey: "HER-AGKR-0003",
        note: "Interpretive narrative for traditional architecture context"
      }
    ]
  },
  {
    slug: "port-light-culture-hall",
    title: "Port Light Culture Hall",
    city: "Busan",
    district: "Yeongdo",
    year: 2019,
    type: "Culture Hall",
    status: "Built",
    architectSlugs: ["coastal-common"],
    summary: "A neighborhood culture hall that frames the harbor through stepped foyers and a lantern-like upper volume.",
    highlight: "The building becomes a nighttime marker without turning into spectacle, relying on massing and reflected light instead.",
    materials: ["Concrete", "Anodized aluminum", "Pine"],
    palette: ["#255260", "#d7a15b", "#f1e5d0"],
    coordinates: { lat: 35.0916, lng: 129.0781 },
    address: "Yeongdo-gu, Busan",
    roadAddress: "84 Haeyang-ro 195beon-gil, Yeongdo-gu, Busan",
    areaSqm: 4710,
    landAreaSqm: 2100,
    floorsAboveGround: 4,
    floorsBelowGround: 1,
    structureLabel: "Reinforced concrete",
    roofLabel: "Flat roof",
    primaryUseCode: "14000",
    primaryUseLabel: "Cultural facility",
    permitDate: "2016-11-09",
    completionDate: "2019-08-30",
    publicAccess: "Public",
    heritageClass: "None",
    imagesAvailable: true,
    tags: ["harbor", "culture-hall", "waterfront", "public"],
    sourceRefs: [
      {
        system: "building-hub",
        dataset: "MOLIT Building Hub",
        recordKey: "AGKR-BLD-0004",
        note: "Official building ledger attributes"
      },
      {
        system: "tour-api",
        dataset: "KTO Korean Tourism Information Service",
        recordKey: "VISITKOREA-ARCH-0004",
        note: "Visit-oriented editorial content and image references"
      }
    ]
  },
  {
    slug: "forest-terrace-housing",
    title: "Forest Terrace Housing",
    city: "Daejeon",
    district: "Yuseong",
    year: 2022,
    type: "Housing",
    status: "Built",
    architectSlugs: ["north-wall-lab"],
    summary: "A mid-rise housing prototype with shared winter gardens, study terraces, and a porous first-floor commons.",
    highlight: "The key idea is not density alone but the quality of repeated shared edges where residents can actually linger.",
    materials: ["Precast concrete", "Galvanized steel", "Glass"],
    palette: ["#5a4656", "#c2a66f", "#eee2d3"],
    coordinates: { lat: 36.3621, lng: 127.3566 },
    address: "Yuseong-gu, Daejeon",
    roadAddress: "21 Expo-ro 123beon-gil, Yuseong-gu, Daejeon",
    areaSqm: 9240,
    landAreaSqm: 3320,
    floorsAboveGround: 11,
    floorsBelowGround: 1,
    structureLabel: "Precast concrete",
    roofLabel: "Flat roof",
    primaryUseCode: "02000",
    primaryUseLabel: "Multi-family housing",
    permitDate: "2019-12-17",
    completionDate: "2022-06-24",
    publicAccess: "Private",
    heritageClass: "None",
    imagesAvailable: false,
    tags: ["housing", "shared-space", "research-city", "terrace"],
    sourceRefs: [
      {
        system: "building-hub",
        dataset: "MOLIT Building Hub",
        recordKey: "AGKR-BLD-0005",
        note: "Area, floor, and approval information"
      },
      {
        system: "building-register",
        dataset: "Building register title section",
        recordKey: "REG-AGKR-0005",
        note: "Supplementary structure and usage labels"
      }
    ]
  },
  {
    slug: "junction-market-commons",
    title: "Junction Market Commons",
    city: "Daegu",
    district: "Jung",
    year: 2018,
    type: "Market",
    status: "Adaptive reuse",
    architectSlugs: ["field-office-seoul", "studio-layer"],
    summary: "A former logistics shed reopened as a market commons with food stalls, archive rooms, and public seating terraces.",
    highlight: "It treats commerce, memory, and climate shelter as one system instead of separating them into different zones.",
    materials: ["Steel truss", "Terrazzo", "Canvas"],
    palette: ["#8f4934", "#21434c", "#f0dcc4"],
    coordinates: { lat: 35.8694, lng: 128.5932 },
    address: "Jung-gu, Daegu",
    roadAddress: "58 Gyeongsang-gamyeong-gil, Jung-gu, Daegu",
    areaSqm: 4380,
    landAreaSqm: 1780,
    floorsAboveGround: 3,
    floorsBelowGround: 0,
    structureLabel: "Steel frame",
    roofLabel: "Monitor roof",
    primaryUseCode: "13000",
    primaryUseLabel: "Neighborhood living facility",
    permitDate: "2015-05-20",
    completionDate: "2018-09-11",
    publicAccess: "Public",
    heritageClass: "Future heritage",
    imagesAvailable: true,
    tags: ["market", "adaptive-reuse", "commons", "archive"],
    sourceRefs: [
      {
        system: "building-hub",
        dataset: "MOLIT Building Hub",
        recordKey: "AGKR-BLD-0006",
        note: "Building master metadata"
      },
      {
        system: "gis-building",
        dataset: "MOLIT GIS building integrated info",
        recordKey: "GIS-AGKR-0006",
        note: "Footprint geometry and parcel context"
      },
      {
        system: "tour-api",
        dataset: "KTO Korean Tourism Information Service",
        recordKey: "VISITKOREA-ARCH-0006",
        note: "Image and place-discovery layer"
      }
    ]
  },
  {
    slug: "basalt-civic-hall",
    title: "Basalt Civic Hall",
    city: "Jeju",
    district: "Aewol",
    year: 2024,
    type: "Civic Hall",
    status: "Under construction",
    architectSlugs: ["coastal-common"],
    summary: "A coastal civic hall composed as a cluster of basalt-toned rooms around a wind-protected gathering court.",
    highlight: "The design avoids a single monumental facade and instead builds identity through repeated sheltered edges.",
    materials: ["Basalt aggregate concrete", "Timber", "Bronze mesh"],
    palette: ["#3d4749", "#ad7447", "#e9dcc5"],
    coordinates: { lat: 33.4629, lng: 126.3335 },
    address: "Aewol-eup, Jeju-si",
    roadAddress: "113 Aewolhaean-ro, Aewol-eup, Jeju-si",
    areaSqm: 3620,
    landAreaSqm: 2460,
    floorsAboveGround: 2,
    floorsBelowGround: 0,
    structureLabel: "Concrete and timber hybrid",
    roofLabel: "Low-pitched roof",
    primaryUseCode: "08000",
    primaryUseLabel: "Public office and assembly facility",
    permitDate: "2022-08-04",
    completionDate: "2024-12-19",
    publicAccess: "Limited",
    heritageClass: "None",
    imagesAvailable: false,
    tags: ["civic", "coastal", "basalt", "assembly"],
    sourceRefs: [
      {
        system: "building-hub",
        dataset: "MOLIT Building Hub",
        recordKey: "AGKR-BLD-0007",
        note: "Construction progress and permit basis"
      },
      {
        system: "tour-api",
        dataset: "KTO Korean Tourism Information Service",
        recordKey: "VISITKOREA-ARCH-0007",
        note: "Future visitor-facing narrative layer"
      }
    ]
  },
  {
    slug: "seowon-study-archive",
    title: "Seowon Study Archive",
    city: "Andong",
    district: "Pungcheon",
    year: 2017,
    type: "Archive",
    status: "Built",
    architectSlugs: ["atelier-gonggan"],
    summary: "A small archive that alternates between exhibition rooms, reading alcoves, and a quiet open-air loggia.",
    highlight: "The sequence is slow on purpose, asking visitors to move through light, slope, and silence before reaching the collection.",
    materials: ["Timber", "Brick", "Washed stone"],
    palette: ["#85633d", "#2f3f2f", "#efe3ce"],
    coordinates: { lat: 36.5662, lng: 128.5139 },
    address: "Pungcheon-myeon, Andong-si, Gyeongsangbuk-do",
    roadAddress: "177 Dosan-ro, Pungcheon-myeon, Andong-si",
    areaSqm: 1740,
    landAreaSqm: 1320,
    floorsAboveGround: 2,
    floorsBelowGround: 0,
    structureLabel: "Timber and masonry",
    roofLabel: "Tiled pitched roof",
    primaryUseCode: "10000",
    primaryUseLabel: "Educational and research facility",
    permitDate: "2014-10-16",
    completionDate: "2017-04-28",
    publicAccess: "Limited",
    heritageClass: "Registered cultural property",
    imagesAvailable: true,
    tags: ["archive", "study", "heritage", "slow-sequence"],
    sourceRefs: [
      {
        system: "building-register",
        dataset: "Building register title section",
        recordKey: "REG-AGKR-0008",
        note: "Building identity, floor, and structural metadata"
      },
      {
        system: "heritage-detail",
        dataset: "CHA palace and heritage narrative layer",
        recordKey: "HER-AGKR-0008",
        note: "Narrative text and image-style heritage interpretation"
      }
    ]
  }
];

export const collections: Collection[] = [
  {
    slug: "urban-thresholds",
    title: "Urban Thresholds",
    focus: "Buildings that work as shortcuts, plazas, and rooms at once",
    summary: "A first route through projects where circulation is not secondary but the main public idea.",
    entries: 3
  },
  {
    slug: "reused-shells",
    title: "Reused Shells",
    focus: "Industrial or civic frames given a second life",
    summary: "A cluster of projects about keeping structural memory visible while changing use completely.",
    entries: 2
  },
  {
    slug: "climate-rooms",
    title: "Climate Rooms",
    focus: "Projects where shadow, ventilation, and buffering become design language",
    summary: "A reading path across archives, libraries, and civic buildings tuned to local climate behavior.",
    entries: 4
  }
];

const architectKoCopy: Record<
  string,
  {
    focus: string;
    summary: string;
  }
> = {
  "studio-layer": {
    focus: "공공 실내와 적응형 재생",
    summary:
      "공공 실내, 아카이브 공간, 그리고 두 번째 문화적 생명을 필요로 하는 건물을 다룹니다."
  },
  "atelier-gonggan": {
    focus: "한옥 하이브리드와 기후 대응 리트로핏",
    summary:
      "전통적 공간 시퀀스를 현대적 환경 성능과 결합하는 작업을 이어갑니다."
  },
  "field-office-seoul": {
    focus: "도시 연결과 공공 동선",
    summary:
      "거리, 시장, 계단, 공공실이 하나의 연결된 장처럼 작동하는 프로젝트를 설계합니다."
  },
  "coastal-common": {
    focus: "수변 문화와 지역 커먼즈",
    summary:
      "해안, 옛 항만 인프라, 공공 수변 프로그램을 중심으로 작업합니다."
  },
  "north-wall-lab": {
    focus: "연구시설과 압축된 학습 환경",
    summary:
      "밀도 높은 캠퍼스 건물, 연구소, 소규모 문화시설을 탐구합니다."
  }
};

const buildingKoCopy: Record<
  string,
  {
    title: string;
    summary: string;
    highlight: string;
    address: string;
    roadAddress: string;
  }
> = {
  "floating-courtyard-library": {
    title: "부유하는 중정 도서관",
    summary:
      "가로시장과 맞닿은 다공성 1층과 들어 올린 중정을 중심으로 구성한 소형 공공도서관입니다.",
    highlight:
      "이 프로젝트는 낮에는 도시의 지름길처럼, 밤에는 독서실처럼 작동하는 공공건물의 가능성을 실험합니다.",
    address: "서울특별시 마포구",
    roadAddress: "서울특별시 마포구 성미산로 28"
  },
  "seongsu-river-workshop": {
    title: "성수 리버 워크숍",
    summary:
      "산업용 외피를 공공 워크숍, 카페, 강연장, 제작 공간으로 전환한 복합시설입니다.",
    highlight:
      "공장의 리듬을 지우지 않고 긴 스팬의 골조를 그대로 드러내며 새로운 기반시설로 재구성합니다.",
    address: "서울특별시 성동구 성수동",
    roadAddress: "서울특별시 성동구 아차산로9길 42"
  },
  "hanok-climate-lab": {
    title: "한옥 기후 연구소",
    summary:
      "한옥의 중정을 유산 복제가 아니라 환경 장치로 다시 읽어내는 연구시설입니다.",
    highlight:
      "겹겹의 경계, 깊은 처마, 열완충 홀이 기후 자체를 공간 경험으로 바꾸는 평면을 만듭니다.",
    address: "전북특별자치도 전주시 완산구",
    roadAddress: "전북특별자치도 전주시 완산구 경기전길 61"
  },
  "port-light-culture-hall": {
    title: "포트 라이트 문화회관",
    summary:
      "단차가 있는 로비와 등불 같은 상부 매스를 통해 항구 풍경을 끌어들이는 동네 문화회관입니다.",
    highlight:
      "과장된 스펙터클 대신 매스와 반사광만으로 야간의 표지를 만드는 방식이 핵심입니다.",
    address: "부산광역시 영도구",
    roadAddress: "부산광역시 영도구 해양로195번길 84"
  },
  "forest-terrace-housing": {
    title: "포레스트 테라스 하우징",
    summary:
      "공유 겨울정원, 학습 테라스, 다공성 1층 커먼즈를 포함한 중층 주거 프로토타입입니다.",
    highlight:
      "핵심은 단순한 밀도가 아니라, 실제로 머무를 수 있는 반복된 공유 경계의 질에 있습니다.",
    address: "대전광역시 유성구",
    roadAddress: "대전광역시 유성구 엑스포로123번길 21"
  },
  "junction-market-commons": {
    title: "정션 마켓 커먼즈",
    summary:
      "옛 물류 창고를 먹거리 점포, 아카이브실, 공공 좌석 테라스를 가진 시장 커먼즈로 다시 연 프로젝트입니다.",
    highlight:
      "상업, 기억, 기후 피난처를 분리하지 않고 하나의 시스템으로 다루는 점이 이 프로젝트의 중심입니다.",
    address: "대구광역시 중구",
    roadAddress: "대구광역시 중구 경상감영길 58"
  },
  "basalt-civic-hall": {
    title: "현무암 공공회관",
    summary:
      "바람을 막아주는 집합 마당 주위에 현무암 톤의 방들을 군집시킨 해안 공공회관입니다.",
    highlight:
      "하나의 기념비적 정면 대신 반복되는 보호된 가장자리를 통해 정체성을 형성합니다.",
    address: "제주특별자치도 제주시 애월읍",
    roadAddress: "제주특별자치도 제주시 애월읍 애월해안로 113"
  },
  "seowon-study-archive": {
    title: "서원 스터디 아카이브",
    summary:
      "전시실, 독서 틈새, 조용한 외부 로지아가 교차하는 소형 아카이브 건물입니다.",
    highlight:
      "빛, 경사, 침묵을 따라 천천히 이동한 뒤 컬렉션에 닿도록 의도적으로 느린 시퀀스를 구성합니다.",
    address: "경상북도 안동시 풍천면",
    roadAddress: "경상북도 안동시 풍천면 도산로 177"
  }
};

const cityLabels: Record<string, string> = {
  Seoul: "서울",
  Jeonju: "전주",
  Busan: "부산",
  Daejeon: "대전",
  Daegu: "대구",
  Jeju: "제주",
  Andong: "안동"
};

const districtLabels: Record<string, string> = {
  Mapo: "마포",
  Seongsu: "성수",
  Wansan: "완산",
  Yeongdo: "영도",
  Yuseong: "유성",
  Jung: "중구",
  Aewol: "애월",
  Pungcheon: "풍천"
};

const typeLabels: Record<string, string> = {
  Library: "도서관",
  "Mixed Use": "복합시설",
  "Research Center": "연구시설",
  "Culture Hall": "문화회관",
  Housing: "주거",
  Market: "시장",
  "Civic Hall": "공공회관",
  Archive: "아카이브"
};

const statusLabels: Record<string, string> = {
  Built: "준공",
  "Adaptive reuse": "재생 리노베이션",
  "Under construction": "공사 중"
};

const materialLabels: Record<string, string> = {
  Brick: "벽돌",
  "Exposed concrete": "노출콘크리트",
  Oak: "오크",
  Steel: "철골",
  Polycarbonate: "폴리카보네이트",
  Birch: "자작합판",
  Timber: "목재",
  "Clay tile": "점토기와",
  "Lime plaster": "석회미장",
  Concrete: "콘크리트",
  "Anodized aluminum": "아노다이징 알루미늄",
  Pine: "소나무",
  "Precast concrete": "프리캐스트 콘크리트",
  "Galvanized steel": "아연도금 강재",
  Glass: "유리",
  "Steel truss": "철골 트러스",
  Terrazzo: "테라조",
  Canvas: "캔버스",
  "Basalt aggregate concrete": "현무암 골재 콘크리트",
  "Bronze mesh": "브론즈 메쉬",
  "Washed stone": "세척석"
};

const structureLabels: Record<string, string> = {
  "Reinforced concrete": "철근콘크리트",
  "Steel frame": "철골조",
  "Timber hybrid": "목구조 하이브리드",
  "Precast concrete": "프리캐스트 콘크리트",
  "Concrete and timber hybrid": "콘크리트·목구조 하이브리드",
  "Timber and masonry": "목구조와 조적",
  "Steel and timber hybrid": "철골·목구조 하이브리드",
  "Concrete frame": "콘크리트 골조"
};

const useLabels: Record<string, string> = {
  "Cultural facility": "문화시설",
  "Neighborhood living facility": "근린생활시설",
  "Educational and research facility": "교육연구시설",
  "Multi-family housing": "공동주택",
  "Public office and assembly facility": "공공업무 및 집회시설"
};

const accessLabels: Record<Building["publicAccess"], string> = {
  Public: "공개",
  Limited: "부분 공개",
  Private: "비공개"
};

const heritageLabels: Record<Building["heritageClass"], string> = {
  None: "해당 없음",
  "Registered cultural property": "등록문화재",
  "Future heritage": "미래유산",
  "Modern heritage candidate": "근현대유산 후보"
};

const sourceSystemLabels: Record<ArchitectureSourceSystem, string> = {
  "building-hub": "건축HUB",
  "building-register": "건축물대장",
  "gis-building": "공간정보",
  "tour-api": "관광정보",
  "heritage-detail": "유산해설"
};

const sourceSystemLabelsEn: Record<ArchitectureSourceSystem, string> = {
  "building-hub": "Building Hub",
  "building-register": "Building Register",
  "gis-building": "GIS Building",
  "tour-api": "Tour API",
  "heritage-detail": "Heritage Detail"
};

const cityNotes: Record<string, string> = {
  Seoul: "Density, adaptive reuse, and street-facing public programs.",
  Jeonju: "Hanok continuities, courtyard logic, and material tactility.",
  Busan: "Waterfront exposure, civic light, and sloped urban edges.",
  Daejeon: "Research infrastructure and compact shared living.",
  Daegu: "Market urbanism, interior publicness, and large-span reuse.",
  Jeju: "Wind, basalt, and dispersed public rooms.",
  Andong: "Quiet cultural landscapes and archive-like sequences."
};

const cityNotesKo: Record<string, string> = {
  Seoul: "고밀도 도시, 적응형 재생, 그리고 거리와 맞닿는 공공 프로그램의 층위가 두드러집니다.",
  Jeonju: "한옥의 연속성, 중정의 논리, 재료의 촉감이 도시 읽기의 기준이 됩니다.",
  Busan: "수변의 노출, 시민적 빛, 경사진 도시 경계가 건축의 성격을 만듭니다.",
  Daejeon: "연구 인프라와 압축된 공동 주거가 도시의 건축 언어를 형성합니다.",
  Daegu: "시장 도시성, 실내 공공성, 대공간 재생의 흐름을 한눈에 볼 수 있습니다.",
  Jeju: "바람, 현무암, 분산된 공공실의 조합이 공간 경험을 결정합니다.",
  Andong: "조용한 문화 경관과 아카이브 같은 동선이 도시의 분위기를 규정합니다."
};

const typeNotes: Record<string, string> = {
  Library: "Reading spaces that double as neighborhood public rooms.",
  "Mixed Use": "Projects where work, gathering, and culture overlap.",
  "Research Center": "Institutional buildings shaped by climate and focused study.",
  "Culture Hall": "Public gathering halls with a strong spatial identity.",
  Housing: "Residential types that treat common space as essential.",
  Market: "Commercial buildings recast as civic infrastructure.",
  "Civic Hall": "Collective rooms for assembly, ritual, and local governance.",
  Archive: "Buildings for memory, quiet circulation, and editorial curation."
};

const typeNotesKo: Record<string, string> = {
  Library: "동네의 공공실 역할까지 겸하는 읽기 공간입니다.",
  "Mixed Use": "일, 모임, 문화가 한 건물 안에서 겹쳐 작동하는 유형입니다.",
  "Research Center": "기후 대응과 집중된 연구 활동이 형태를 규정하는 시설입니다.",
  "Culture Hall": "강한 공간 정체성을 가진 공공 집합 공간입니다.",
  Housing: "공용공간을 필수 요소로 다루는 주거 유형입니다.",
  Market: "상업 건물을 시민적 기반시설로 다시 읽는 유형입니다.",
  "Civic Hall": "집회, 의식, 지역 거버넌스를 위한 공동의 방입니다.",
  Archive: "기억, 느린 동선, 편집적 큐레이션을 담는 건축 유형입니다."
};

function unique<T>(values: T[]) {
  return Array.from(new Set(values));
}

export const architectNameMap = Object.fromEntries(
  architects.map((architect) => [architect.slug, architect.name])
) as Record<string, string>;

function getLabel(
  value: string,
  language: Language,
  labels: Record<string, string>
) {
  if (language === "en") {
    return value;
  }

  return labels[value] ?? value;
}

export function getArchitectFocus(architect: Architect, language: Language) {
  if (language === "en") {
    return architect.focus;
  }

  return architectKoCopy[architect.slug]?.focus ?? architect.focus;
}

export function getArchitectSummary(architect: Architect, language: Language) {
  if (language === "en") {
    return architect.summary;
  }

  return architectKoCopy[architect.slug]?.summary ?? architect.summary;
}

export function getBuildingTitle(building: Building, language: Language) {
  if (language === "en") {
    return building.title;
  }

  return buildingKoCopy[building.slug]?.title ?? building.title;
}

export function getBuildingSummary(building: Building, language: Language) {
  if (language === "en") {
    return building.summary;
  }

  return buildingKoCopy[building.slug]?.summary ?? building.summary;
}

export function getBuildingHighlight(building: Building, language: Language) {
  if (language === "en") {
    return building.highlight;
  }

  return buildingKoCopy[building.slug]?.highlight ?? building.highlight;
}

export function getCityLabel(city: string, language: Language) {
  return getLabel(city, language, cityLabels);
}

export function getDistrictLabel(district: string, language: Language) {
  return getLabel(district, language, districtLabels);
}

export function getTypeLabel(type: string, language: Language) {
  return getLabel(type, language, typeLabels);
}

export function getStatusLabel(status: string, language: Language) {
  return getLabel(status, language, statusLabels);
}

export function getMaterialLabel(material: string, language: Language) {
  return getLabel(material, language, materialLabels);
}

export function getStructureLabel(structure: string, language: Language) {
  return getLabel(structure, language, structureLabels);
}

export function getPrimaryUseLabel(use: string, language: Language) {
  return getLabel(use, language, useLabels);
}

export function getPublicAccessLabel(
  access: Building["publicAccess"],
  language: Language
) {
  if (language === "en") {
    return access;
  }

  return accessLabels[access];
}

export function getHeritageLabel(
  heritage: Building["heritageClass"],
  language: Language
) {
  if (language === "en") {
    return heritage;
  }

  return heritageLabels[heritage];
}

export function getSourceSystemLabel(
  system: ArchitectureSourceSystem,
  language: Language
) {
  if (language === "en") {
    return sourceSystemLabelsEn[system];
  }

  return sourceSystemLabels[system];
}

export function getBuildingAddress(building: Building, language: Language) {
  if (language === "en") {
    return building.address;
  }

  return buildingKoCopy[building.slug]?.address ?? building.address;
}

export function getBuildingRoadAddress(building: Building, language: Language) {
  if (language === "en") {
    return building.roadAddress;
  }

  return buildingKoCopy[building.slug]?.roadAddress ?? building.roadAddress;
}

export function getCityNote(city: string, language: Language) {
  if (language === "en") {
    return cityNotes[city] ?? "Emerging regional archive cluster.";
  }

  return cityNotesKo[city] ?? "새로운 지역 아카이브 클러스터로 확장할 수 있는 도시입니다.";
}

export function getTypeNote(type: string, language: Language) {
  if (language === "en") {
    return typeNotes[type] ?? "A category for future archive expansion.";
  }

  return typeNotesKo[type] ?? "향후 아카이브 확장을 위한 유형입니다.";
}

export const siteStats = {
  buildings: buildings.length,
  architects: architects.length,
  cities: unique(buildings.map((building) => building.city)).length,
  types: unique(buildings.map((building) => building.type)).length
};

export const districtOptions = unique(buildings.map((building) => building.district)).sort();
export const cityOptions = unique(buildings.map((building) => building.city)).sort();
export const typeOptions = unique(buildings.map((building) => building.type)).sort();
export const materialOptions = unique(buildings.flatMap((building) => building.materials)).sort();
export const statusOptions = unique(buildings.map((building) => building.status)).sort();
export const accessOptions = unique(buildings.map((building) => building.publicAccess)).sort();
export const heritageOptions = unique(buildings.map((building) => building.heritageClass)).sort();
export const sourceSystemOptions = unique(
  buildings.flatMap((building) => building.sourceRefs.map((source) => source.system))
).sort();
export const structureOptions = unique(buildings.map((building) => building.structureLabel)).sort();
export const yearRange = {
  min: Math.min(...buildings.map((building) => building.year)),
  max: Math.max(...buildings.map((building) => building.year))
};

export const citySummaries = unique(buildings.map((building) => building.city)).map((city) => {
  const group = buildings.filter((building) => building.city === city);

  return {
    city,
    note: cityNotes[city] ?? "Emerging regional archive cluster.",
    buildingCount: group.length,
    types: unique(group.map((building) => building.type)),
    lead: group[0]
  };
});

export const typeSummaries = unique(buildings.map((building) => building.type)).map((type) => {
  const group = buildings.filter((building) => building.type === type);

  return {
    type,
    note: typeNotes[type] ?? "A category for future archive expansion.",
    buildingCount: group.length,
    cities: unique(group.map((building) => building.city)),
    lead: group[0]
  };
});

export const focusPrinciples = [
  "Keep a database-first navigation model instead of a marketing-only landing page.",
  "Use the homepage as an editorial doorway, not as the only destination.",
  "Expose counts, categories, and browsing modes immediately on desktop.",
  "Translate the archival tone into a responsive, mobile-safe, contemporary interface."
];

export function getBuildingsForArchitect(slug: string) {
  return buildings.filter((building) => building.architectSlugs.includes(slug));
}

export function getBuildingBounds() {
  const latitudes = buildings.map((building) => building.coordinates.lat);
  const longitudes = buildings.map((building) => building.coordinates.lng);

  return {
    north: Math.max(...latitudes),
    south: Math.min(...latitudes),
    east: Math.max(...longitudes),
    west: Math.min(...longitudes)
  };
}
