// 역대 젊은건축가상 수상자 데이터
// 출처: http://www.youngarchitect.kr
// 주최: 문화체육관광부 / 주관: 새건축사협의회·한국건축가협회·한국여성건축가협회

export interface YoungArchitectAwardee {
  year: number;
  architects: string[];
  office: string;
  website?: string;
  representative_works: string[];
}

export const youngArchitectAwardData: YoungArchitectAwardee[] = [
  // 2026
  {
    year: 2026,
    architects: ["나종원"],
    office: "Of Architecture",
    website: "https://www.studio-of.co.uk",
    representative_works: ["Woodbury House", "연수구 청소년센터"],
  },
  {
    year: 2026,
    architects: ["김민호"],
    office: "코드아키텍츠",
    website: "https://www.kodearchitects.com",
    representative_works: ["에이쿤스트 갤러리", "보령청년센터"],
  },
  {
    year: 2026,
    architects: ["신성진", "손경민"],
    office: "볼드아키텍츠",
    website: "https://boldarch.kr",
    representative_works: ["원주시창업지원허브", "봉담와우도서관"],
  },
  // 2025
  {
    year: 2025,
    architects: ["김선형"],
    office: "Frame Works",
    website: "https://www.frameworks.kr",
    representative_works: ["타호캐빈 (US)", "광주조립식도서관"],
  },
  {
    year: 2025,
    architects: ["이창규", "강정윤"],
    office: "에이루트",
    website: "https://www.arootarchitecture.com",
    representative_works: ["월정리 두:집", "청수 목월재"],
  },
  {
    year: 2025,
    architects: ["정이삭", "홍진표"],
    office: "에이코랩",
    website: "https://www.acolab.co.kr",
    representative_works: ["청파동 아흔살집", "N작가주택"],
  },
  // 2024
  {
    year: 2024,
    architects: ["현승헌"],
    office: "선랩",
    website: "https://www.sunlabarchitects.com",
    representative_works: ["쉐어어스 신림", "쉐어어스 거성"],
  },
  {
    year: 2024,
    architects: ["김한중"],
    office: "그라운드아키텍츠",
    website: "https://www.groundarchitects.com",
    representative_works: ["인텔리안테크 연구소", "카페 트래버틴"],
  },
  {
    year: 2024,
    architects: ["조경빈"],
    office: "필동2가아키텍츠",
    website: "http://pd2ga.com",
    representative_works: ["율현동 세가족집", "서초동 1515"],
  },
  // 2023
  {
    year: 2023,
    architects: ["김진휴", "남호진"],
    office: "건축사사무소 김남",
    website: "http://kimnam.co.kr",
    representative_works: ["QUAD", "Warm and Cool"],
  },
  {
    year: 2023,
    architects: ["김영수"],
    office: "모어레스",
    website: "https://www.morelessarchitects.com",
    representative_works: ["수리움", "도산 알로하"],
  },
  {
    year: 2023,
    architects: ["서자민"],
    office: "아지트스튜디오",
    website: "https://www.agit-studio.com",
    representative_works: ["콘크리트 도서관", "모따기99"],
  },
  // 2022
  {
    year: 2022,
    architects: ["김효영"],
    office: "김효영 건축사사무소",
    website: "http://www.khyarchitects.com",
    representative_works: ["동해 폐쇄석장 리모델링"],
  },
  {
    year: 2022,
    architects: ["박정환", "송상헌"],
    office: "심플렉스",
    website: "http://www.simplex-arch.com",
    representative_works: ["Isabu Doko Museum", "ANArKH Cafe"],
  },
  // 2021
  {
    year: 2021,
    architects: ["이세웅", "최연웅"],
    office: "아파랏체",
    website: "http://apparat-c.com",
    representative_works: ["홍은주택", "연희공단"],
  },
  {
    year: 2021,
    architects: ["조윤희"],
    office: "구보건축",
    website: "https://www.gubowork.com",
    representative_works: ["Work From Home", "The Pole House"],
  },
  {
    year: 2021,
    architects: ["강영진", "강우현"],
    office: "아키후드",
    website: "http://www.archihood.com",
    representative_works: ["Voree", "서림연가"],
  },
  // 2020
  {
    year: 2020,
    architects: ["박지현", "우승진", "조성학"],
    office: "비유에스",
    website: "http://bus-architecture.com",
    representative_works: ["후아미", "당진 우-물"],
  },
  {
    year: 2020,
    architects: ["김세진"],
    office: "지요건축",
    website: "http://jiyo.co.kr",
    representative_works: ["체부동 생활문화센터"],
  },
  {
    year: 2020,
    architects: ["정웅식"],
    office: "온건축",
    website: "http://on-u.kr",
    representative_works: ["왕방요", "NONSPACE"],
  },
  // 2019
  {
    year: 2019,
    architects: ["박수정", "심희준"],
    office: "건축공방",
    website: "http://www.archiworkshop.kr",
    representative_works: ["건축공방 연희사옥", "Glamtree Resort"],
  },
  {
    year: 2019,
    architects: ["전보림", "이승환"],
    office: "아이디알",
    website: "http://www.idrarchitects.com",
    representative_works: ["매곡도서관", "Caffeine Jung-ri"],
  },
  {
    year: 2019,
    architects: ["한승재", "한양규", "윤한진"],
    office: "푸하하하프렌즈",
    website: "http://fhhhfriends.com",
    representative_works: ["성수연방", "Around 사옥"],
  },
  // 2018
  {
    year: 2018,
    architects: ["문주호", "임지환", "조성현"],
    office: "경계없는 작업실",
    website: "http://www.boundless.kr",
    representative_works: ["corner house", "후암동 복합주거"],
  },
  {
    year: 2018,
    architects: ["김이홍"],
    office: "김이홍 아키텍츠",
    website: "http://leehongkim.com",
    representative_works: ["압구정역 지하철출입구 Modules", "Superbin im_factory"],
  },
  {
    year: 2018,
    architects: ["남정민"],
    office: "OA-Lab",
    website: "http://oa-lab.com",
    representative_works: ["Flower+Kindergarten", "Alley House"],
  },
  // 2017
  {
    year: 2017,
    architects: ["강제용", "전종우"],
    office: "이데아키텍츠 건축사사무소",
    website: "http://ideeaa.net",
    representative_works: ["another bldg.", "Lattice bldg."],
  },
  {
    year: 2017,
    architects: ["국형걸"],
    office: "(주)요즈음건축",
    website: "https://yz-architecture.com",
    representative_works: ["Engbong Terrace (응봉테라스)", "Secho Cliff Tower (서초 클리프 타워)"],
  },
  {
    year: 2017,
    architects: ["서재원", "이의행"],
    office: "(주)에이오에이 아키텍츠",
    website: "http://www.aoaarchitects.com",
    representative_works: ["망원동 쌓은집 (Villa Mangwon)", "음성 디귿집 (ㄷHouse)"],
  },
  // 2016
  {
    year: 2016,
    architects: ["김현석"],
    office: "준 아키텍츠 건축사사무소",
    website: "http://www.junearchitects.net",
    representative_works: ["흐르는 집", "관음리 복합시설"],
  },
  {
    year: 2016,
    architects: ["신민재", "안기현"],
    office: "에이앤엘스튜디오",
    website: "http://anlstudio.com",
    representative_works: ["잠원 얇은집", "L.O.G. (카이로스 제주)"],
  },
  {
    year: 2016,
    architects: ["이승택", "임미정"],
    office: "stpmj",
    website: "http://www.stpmj.com",
    representative_works: ["Shear House", "Super-Normal (보통집)"],
  },
  // 2015
  {
    year: 2015,
    architects: ["이은경"],
    office: "이엠에이건축사사무소",
    website: "http://www.emaa.co.kr",
    representative_works: ["만리동 예술인 협동조합형 공공주택", "성북구립 최만린미술관"],
  },
  {
    year: 2015,
    architects: ["조진만"],
    office: "조진만 아키텍츠",
    website: "http://www.jo-jinman.com",
    representative_works: ["K2 Tower", "Nasoop Library (내를 건너서 숲으로 도서관)"],
  },
  {
    year: 2015,
    architects: ["강예린", "이치훈", "이재원"],
    office: "건축사사무소 에스오에이",
    website: "http://www.societyofarchitecture.com",
    representative_works: ["통의동 브릭웰", "지붕감각 (국립현대미술관 YAP 당선작)"],
  },
  // 2014
  {
    year: 2014,
    architects: ["곽상준", "이소정"],
    office: "OBBA",
    website: "http://www.o-bba.com",
    representative_works: ["The Illusion (서초동 R TOWER)", "The Layers (강화 고천리 단독주택)"],
  },
  {
    year: 2014,
    architects: ["김민석"],
    office: "노션 건축사사무소",
    website: "http://www.notionarchitecture.kr",
    representative_works: ["GP house", "BJ house"],
  },
  {
    year: 2014,
    architects: ["故박현진"],
    office: "HJP Architects",
    representative_works: ["BB-housing (방배동 다세대)", "EA-communitycentre (응암산골마을 주민공동이용시설)"],
  },
  {
    year: 2014,
    architects: ["김수영"],
    office: "(주)숨비건축사사무소",
    website: "http://www.sumvie.com",
    representative_works: ["영주시 실내수영장", "한센기념관"],
  },
  // 2013
  {
    year: 2013,
    architects: ["신혜원"],
    office: "lokaldesign",
    website: "http://www.lokaldesign.com",
    representative_works: ["신반포 나들목", "APAP (안양공공예술프로젝트)"],
  },
  {
    year: 2013,
    architects: ["조장희", "원유민", "안현희"],
    office: "JYA-RCHITECTS",
    website: "http://www.jyarchitects.com",
    representative_works: ["광명 볍씨학교", "제주 월령 CAVE"],
  },
  {
    year: 2013,
    architects: ["김주경", "최교식"],
    office: "오우재 건축사사무소",
    website: "http://www.oujae.com",
    representative_works: ["청산도 느린섬 여행학교", "청산도 향토역사문화전시관"],
  },
  // 2012
  {
    year: 2012,
    architects: ["김순주", "권형표"],
    office: "바우건축사사무소",
    website: "http://www.bauarchitects.com",
    representative_works: ["House of Hwagae (화개의 집)", "Alley House (골목집)"],
  },
  {
    year: 2012,
    architects: ["이동준"],
    office: "Stocker Lee Architetti",
    representative_works: ["Ishi (Tremona, Switzerland)", "Faggio (Mendrisio, Switzerland)"],
  },
  {
    year: 2012,
    architects: ["이소진"],
    office: "Ateliers Lion Seoul",
    website: "http://www.lionseoul.com",
    representative_works: ["윤동주문학관", "삼청공원 숲속도서관"],
  },
  // 2011
  {
    year: 2011,
    architects: ["김창균"],
    office: "유타건축사사무소",
    website: "http://www.utaa.co.kr",
    representative_works: ["청담동 비원(祕苑)", "역삼동 BKJY 사옥"],
  },
  {
    year: 2011,
    architects: ["박인수"],
    office: "(주)파크이즈건축사사무소",
    website: "http://www.parkiz.com",
    representative_works: ["동탄 타운하우스", "전남전문건설회관"],
  },
  {
    year: 2011,
    architects: ["장영철", "전숙희"],
    office: "WISE ARCHITECTURE",
    website: "http://www.wisearchitecture.com",
    representative_works: ["전쟁과 여성인권 박물관", "어둠속의 대화 북촌"],
  },
  // 2010
  {
    year: 2010,
    architects: ["이기용"],
    office: "KLNB Architects",
    representative_works: ["Bouwkunde Reloaded", "Artificial Landscape"],
  },
  {
    year: 2010,
    architects: ["이정훈"],
    office: "JOHO Architecture",
    website: "http://www.johoarchitecture.com",
    representative_works: ["Platform-L Contemporary Art Center (플랫폼 엘)", "남해 처마하우스"],
  },
  {
    year: 2010,
    architects: ["임영환", "김선현"],
    office: "디림건축사사무소",
    website: "https://www.dlimarch.com",
    representative_works: ["안중근의사기념관", "Three Yard House (세마당집)"],
  },
  {
    year: 2010,
    architects: ["전병욱"],
    office: "건축사사무소 이.마",
    website: "https://www.imaa1030.com",
    representative_works: ["SNJ 사옥", "스타웨이 하동"],
  },
  {
    year: 2010,
    architects: ["강진구"],
    office: "아이엠에이(IMA)건축사사무소",
    representative_works: ["민음사사옥", "목적지 나인 (안성)"],
  },
  {
    year: 2010,
    architects: ["정기정"],
    office: "(주)건축사사무소유오에스",
    website: "http://www.uos-ar.com",
    representative_works: ["호텔마누", "원당리주택"],
  },
  // 2009
  {
    year: 2009,
    architects: ["유현준"],
    office: "유현준건축사사무소",
    website: "http://www.hyunjoonyoo.com",
    representative_works: ["플로팅 하우스", "Metal Curtain Building"],
  },
  {
    year: 2009,
    architects: ["조 한"],
    office: "HAHN Design",
    website: "https://blog.naver.com/jluke313",
    representative_works: ["광정리 마을회관", "M+ (신사동)"],
  },
  {
    year: 2009,
    architects: ["임지택"],
    office: "SL건축사사무소",
    representative_works: ["포천아트벨리 전시교육관", "주택 VIII (판교 Y's Haus)"],
  },
  {
    year: 2009,
    architects: ["최성희", "로랑 페레이라"],
    office: "최-페레이라 건축",
    website: "http://www.chaepereira.com",
    representative_works: ["양주시립장욱진미술관", "광명업사이클아트센터"],
  },
  {
    year: 2009,
    architects: ["故김현진"],
    office: "에스피엘케이건축사사무소",
    representative_works: ["혼신지집 (Honsinzi House)", "a House (대구)"],
  },
  // 2008 (제1회)
  {
    year: 2008,
    architects: ["김동진"],
    office: "(주)로디자인 도시환경건축연구소",
    website: "http://leau.co.kr",
    representative_works: ["Bait-ㄹ (바티리을)", "논현 마트료시카"],
  },
  {
    year: 2008,
    architects: ["신승수"],
    office: "디자인 그룹 오즈(OZ)",
    website: "http://designgroupoz.com",
    representative_works: ["가시리 조랑말박물관", "문정동 보금자리주택"],
  },
  {
    year: 2008,
    architects: ["임도균", "조준호"],
    office: "건축사사무소 루연",
    website: "http://luyoun.com",
    representative_works: ["은행나무출판사 사옥", "제이크하우스"],
  },
  {
    year: 2008,
    architects: ["유석연"],
    office: "경간도시디자인건축사사무소",
    representative_works: ["에코넷센터", "다음글로벌미디어센터"],
  },
  {
    year: 2008,
    architects: ["김정주", "윤웅원"],
    office: "제공건축",
    representative_works: ["가시리 조랑말박물관 (Horse Museum)", "덕수리 공유주말주택"],
  },
];

// 연도별 그룹화 헬퍼
export const awardsByYear = youngArchitectAwardData.reduce(
  (acc, item) => {
    if (!acc[item.year]) acc[item.year] = [];
    acc[item.year].push(item);
    return acc;
  },
  {} as Record<number, YoungArchitectAwardee[]>
);

// 전체 수상 연도 목록 (최신순)
export const awardYears = Object.keys(awardsByYear)
  .map(Number)
  .sort((a, b) => b - a);
