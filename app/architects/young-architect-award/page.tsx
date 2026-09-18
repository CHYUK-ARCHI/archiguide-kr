"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { PageShell } from "@/components/page-shell";

// ---------- 데이터 타입 ----------
interface AwardBuilding {
  id: string;
  slug: string;
  titleKo: string;
  title: string;
  address: string;
  coordinates: { lat: number; lng: number };
  program: string;
  architectNames: string[];
  office: string;
  website?: string;
  awardYear: number;
}

interface AwardEntry {
  year: number;
  architects: string[];
  office: string;
  website?: string;
  representative_works: string[];
}

// ---------- 인라인 데이터 ----------
const AWARD_DATA: AwardEntry[] = [
  // 2026
  { year: 2026, architects: ["나종원"], office: "Of Architecture", website: "https://www.studio-of.co.uk", representative_works: ["Woodbury House", "연수구 청소년센터"] },
  { year: 2026, architects: ["김민호"], office: "코드아키텍츠", website: "https://www.kodearchitects.com", representative_works: ["에이쿤스트 갤러리", "보령청년센터"] },
  { year: 2026, architects: ["신성진", "손경민"], office: "볼드아키텍츠", website: "https://boldarch.kr", representative_works: ["원주시창업지원허브", "봉담와우도서관"] },
  // 2025
  { year: 2025, architects: ["김선형"], office: "Frame Works", website: "https://www.frameworks.kr", representative_works: ["타호캐빈 (US)", "광주조립식도서관"] },
  { year: 2025, architects: ["이창규", "강정윤"], office: "에이루트", website: "https://www.arootarchitecture.com", representative_works: ["월정리 두:집", "청수 목월재"] },
  { year: 2025, architects: ["정이삭", "홍진표"], office: "에이코랩", website: "https://www.acolab.co.kr", representative_works: ["청파동 아흔살집", "N작가주택"] },
  // 2024
  { year: 2024, architects: ["현승헌"], office: "선랩", website: "https://www.sunlabarchitects.com", representative_works: ["쉐어어스 신림", "쉐어어스 거성"] },
  { year: 2024, architects: ["김한중"], office: "그라운드아키텍츠", website: "https://www.groundarchitects.com", representative_works: ["인텔리안테크 연구소", "카페 트래버틴"] },
  { year: 2024, architects: ["조경빈"], office: "필동2가아키텍츠", website: "http://pd2ga.com", representative_works: ["율현동 세가족집", "서초동 1515"] },
  // 2023
  { year: 2023, architects: ["김민균", "김민재"], office: "아지트스튜디오", website: "https://www.agitstudio.kr", representative_works: ["콘크리트 도서관", "옥녀봉 정상부 전망대"] },
  { year: 2023, architects: ["남건우"], office: "건축사사무소 김남", website: "https://www.kimnam.kr", representative_works: ["QUAD", "FRAME"] },
  { year: 2023, architects: ["문성준", "나경욱"], office: "SOoA", website: "https://www.sooa.co.kr", representative_works: ["은계 어울림센터", "새절역 복합청사"] },
  // 2022
  { year: 2022, architects: ["신재원"], office: "신재원건축사사무소", website: "https://www.archifield.com", representative_works: ["고성향교 문화재 보수", "홍성 공원형 생활SOC"] },
  { year: 2022, architects: ["안기현"], office: "안기현건축사사무소", website: "https://www.akharch.com", representative_works: ["양덕마을 주택", "완주 쉐어하우스"] },
  { year: 2022, architects: ["우준승", "박중현"], office: "플랫폼에이 건축사사무소", website: "https://www.platform-a.kr", representative_works: ["갈월동 주택", "후암마을 STAY"] },
  // 2021
  { year: 2021, architects: ["박창현"], office: "비유에스 아키텍츠", website: "https://www.bvsarchitects.com", representative_works: ["도화1구역 주택", "함지박마을 어린이집"] },
  { year: 2021, architects: ["정현아"], office: "아이디에이 건축사사무소", website: "https://www.idea-arch.kr", representative_works: ["독산 그린 스퀘어", "마장동 문화공간"] },
  { year: 2021, architects: ["이진오"], office: "지율건축", website: "https://www.jiyularch.com", representative_works: ["의정부 나우우리카페", "미금 복합문화공간"] },
  // 2020
  { year: 2020, architects: ["한승재", "한진이"], office: "지요건축", website: "https://www.jiyoarchitecture.com", representative_works: ["체부동 생활문화센터", "중구 생활문화센터"] },
  { year: 2020, architects: ["강예린", "이치훈"], office: "SoA", representative_works: ["을지로 주니어", "삼익패션빌딩 리모델링"] },
  { year: 2020, architects: ["박진희", "박상희"], office: "에이오에이 아키텍츠", website: "http://www.aoaarchitects.com", representative_works: ["정릉동 주택", "시청역 근생"] },
  // 2019
  { year: 2019, architects: ["한양규", "신혜원", "이재용"], office: "푸하하하프렌즈", website: "https://www.fuhahaafriends.com", representative_works: ["성수연방", "서울숲 어반소스"] },
  { year: 2019, architects: ["권형표", "이선희"], office: "아이디알", website: "http://www.idear.co.kr", representative_works: ["매곡도서관", "무주 양수장 복합문화공간"] },
  { year: 2019, architects: ["최동규"], office: "노말아키텍츠", website: "https://www.normalarchitects.com", representative_works: ["다니엘 빌라", "봉담 다가구주택"] },
  // 2018
  { year: 2018, architects: ["이영복", "황소현"], office: "경계없는 작업실", website: "https://www.boundlessatelier.com", representative_works: ["후암동 코너 하우스", "보문동 사거리 주택"] },
  { year: 2018, architects: ["임태병", "류성진"], office: "로우아키텍츠", website: "https://www.rawarchitects.kr", representative_works: ["아라리오 뮤지엄 인 스페이스", "성남 문화재단"] },
  { year: 2018, architects: ["최준석", "정재윤"], office: "스튜디오 101", representative_works: ["연희 근린생활시설", "가좌동 근생"] },
  // 2017
  { year: 2017, architects: ["강제용", "전종우"], office: "이데아키텍츠", website: "http://ideeaa.net", representative_works: ["어나더빌딩(Another bldg.)", "라티스빌딩(Lattice bldg.)"] },
  { year: 2017, architects: ["서재원", "이의행"], office: "에이오에이 아키텍츠", website: "http://www.aoaarchitects.com", representative_works: ["망원동 쌓은집(Villa Mangwon)", "연희동 주택"] },
  { year: 2017, architects: ["이정훈"], office: "조호건축사사무소", website: "https://johoarchitecture.com", representative_works: ["양양 고속도로 휴게소", "제주 복합문화공간"] },
  // 2016
  { year: 2016, architects: ["이승택", "임미정"], office: "stpmj", website: "https://www.stpmj.com", representative_works: ["시어 하우스(Shear House)", "디엔 카페"] },
  { year: 2016, architects: ["이민수", "윤혜진"], office: "에이앤엘스튜디오", website: "https://www.anlstudio.com", representative_works: ["잠원 얇은집", "L.O.G. 카이로스 제주"] },
  // 2015
  { year: 2015, architects: ["이재원", "강민수"], office: "이엠에이건축사사무소", representative_works: ["만리동 예술인 협동조합형 공공주택", "조치원 문화정원"] },
  { year: 2015, architects: ["서재원", "이의행"], office: "에스오에이", representative_works: ["통의동 브릭웰"] },
  // 2014
  { year: 2014, architects: ["이재혁", "김성우"], office: "OBBA", website: "https://www.o-bba.com", representative_works: ["서초동 R TOWER", "워크스쉽"] },
  { year: 2014, architects: ["장웅세"], office: "숨비건축사사무소", representative_works: ["영주시 실내수영장", "통영 어촌어항 정비"] },
  // 2013
  { year: 2013, architects: ["나은중", "유소래"], office: "lokaldesign", representative_works: ["신반포 나들목"] },
  { year: 2013, architects: ["전숙희"], office: "오우재 건축사사무소", representative_works: ["청산도 느린섬 여행학교", "완도 해조류박람회 1관"] },
  // 2012
  { year: 2012, architects: ["최재원"], office: "Ateliers Lion Seoul", representative_works: ["윤동주문학관", "종로 근생"] },
  { year: 2012, architects: ["이강민"], office: "바우건축사사무소", representative_works: ["화개의 집", "춘천 주택"] },
  // 2011
  { year: 2011, architects: ["김원진", "장영철"], office: "WISE ARCHITECTURE", website: "https://wisearchitecture.kr", representative_works: ["전쟁과 여성인권 박물관", "춘천 은화수로"] },
  // 2010
  { year: 2010, architects: ["조진만"], office: "JOHO Architecture", website: "https://www.johoarchitecture.com", representative_works: ["플랫폼 엘 컨템포러리 아트센터"] },
  { year: 2010, architects: ["배대용"], office: "디림건축사사무소", representative_works: ["안중근의사기념관"] },
  // 2009
  { year: 2009, architects: ["유현준"], office: "유현준건축사사무소", website: "https://www.hyunjoonryu.com", representative_works: ["플로팅 하우스(Floating House)", "능곡교회"] },
  { year: 2009, architects: ["최삼영", "비탈리 페레이라"], office: "최-페레이라 건축", representative_works: ["양주시립장욱진미술관"] },
  { year: 2009, architects: ["이병욱"], office: "SL건축사사무소", representative_works: ["포천아트벨리 전시교육관"] },
  // 2008
  { year: 2008, architects: ["임재용"], office: "로디자인", representative_works: ["바티리을(Bati Rieul)", "사진문화공간 이아"] },
  { year: 2008, architects: ["원도연"], office: "제공건축", representative_works: ["가시리 조랑말박물관"] },
];

const MAP_BUILDINGS: AwardBuilding[] = [
  { id: "b01", slug: "another-bldg", titleKo: "어나더빌딩", title: "Another bldg.", address: "서울 강남구 논현동", coordinates: { lat: 37.5224, lng: 126.9929 }, program: "근린생활시설", architectNames: ["강제용", "전종우"], office: "이데아키텍츠", website: "http://ideeaa.net", awardYear: 2017 },
  { id: "b02", slug: "lattice-bldg", titleKo: "라티스빌딩", title: "Lattice bldg.", address: "광주광역시 동구 동명동", coordinates: { lat: 35.1485, lng: 126.9204 }, program: "근린생활시설", architectNames: ["강제용", "전종우"], office: "이데아키텍츠", awardYear: 2017 },
  { id: "b03", slug: "mangwon-villa", titleKo: "망원동 쌓은집", title: "Villa Mangwon", address: "서울 마포구 망원동", coordinates: { lat: 37.5553, lng: 126.9029 }, program: "다가구주택", architectNames: ["서재원", "이의행"], office: "에이오에이 아키텍츠", awardYear: 2017 },
  { id: "b04", slug: "shear-house", titleKo: "시어 하우스", title: "Shear House", address: "경북 예천군 호명면", coordinates: { lat: 36.5961, lng: 128.4428 }, program: "단독주택", architectNames: ["이승택", "임미정"], office: "stpmj", awardYear: 2016 },
  { id: "b05", slug: "jpo-thin-house", titleKo: "잠원 얇은집", title: "Jamwon Thin House", address: "서울 서초구 잠원동", coordinates: { lat: 37.5118, lng: 127.0102 }, program: "단독주택", architectNames: ["이민수", "윤혜진"], office: "에이앤엘스튜디오", awardYear: 2016 },
  { id: "b06", slug: "manri-dong-housing", titleKo: "만리동 예술인 공공주택", title: "Manri-dong Artists' Housing", address: "서울 중구 만리동", coordinates: { lat: 37.5583, lng: 126.9653 }, program: "협동조합형 공공주택", architectNames: ["이재원", "강민수"], office: "이엠에이건축사사무소", awardYear: 2015 },
  { id: "b07", slug: "brick-well", titleKo: "통의동 브릭웰", title: "Brick Well", address: "서울 종로구 통의동", coordinates: { lat: 37.5783, lng: 126.9740 }, program: "근린생활시설", architectNames: ["서재원", "이의행"], office: "에스오에이", awardYear: 2015 },
  { id: "b08", slug: "r-tower", titleKo: "서초동 R Tower", title: "R Tower Seocho", address: "서울 서초구 서초동", coordinates: { lat: 37.4929, lng: 126.9961 }, program: "근린생활시설", architectNames: ["이재혁", "김성우"], office: "OBBA", awardYear: 2014 },
  { id: "b09", slug: "yeongju-pool", titleKo: "영주시 실내수영장", title: "Yeongju Public Pool", address: "경북 영주시", coordinates: { lat: 36.8057, lng: 128.6235 }, program: "체육시설", architectNames: ["장웅세"], office: "숨비건축사사무소", awardYear: 2014 },
  { id: "b10", slug: "sinbankpo-overpass", titleKo: "신반포 나들목", title: "Sinbanpo Overpass", address: "서울 서초구 잠원동", coordinates: { lat: 37.5091, lng: 126.9993 }, program: "공공시설", architectNames: ["나은중", "유소래"], office: "lokaldesign", awardYear: 2013 },
  { id: "b11", slug: "cheongsando-school", titleKo: "청산도 느린섬 여행학교", title: "Cheongsando Travel School", address: "전남 완도군 청산면", coordinates: { lat: 34.1802, lng: 126.8653 }, program: "교육시설", architectNames: ["전숙희"], office: "오우재 건축사사무소", awardYear: 2013 },
  { id: "b12", slug: "yundongju-museum", titleKo: "윤동주문학관", title: "Yun Dong-ju Literary Museum", address: "서울 종로구 청운동", coordinates: { lat: 37.5937, lng: 126.9625 }, program: "문화시설", architectNames: ["최재원"], office: "Ateliers Lion Seoul", awardYear: 2012 },
  { id: "b13", slug: "war-women-museum", titleKo: "전쟁과 여성인권 박물관", title: "War & Women's Human Rights Museum", address: "서울 마포구 성산동", coordinates: { lat: 37.5632, lng: 126.9104 }, program: "문화시설", architectNames: ["김원진", "장영철"], office: "WISE ARCHITECTURE", awardYear: 2011 },
  { id: "b14", slug: "platform-l", titleKo: "플랫폼 엘 컨템포러리 아트센터", title: "Platform-L Contemporary Art Center", address: "서울 강남구 논현동", coordinates: { lat: 37.5197, lng: 126.9893 }, program: "문화시설", architectNames: ["조진만"], office: "JOHO Architecture", awardYear: 2010 },
  { id: "b15", slug: "ahn-jungeun-memorial", titleKo: "안중근의사기념관", title: "Ahn Jung-geun Memorial Hall", address: "서울 중구 남대문로 5가", coordinates: { lat: 37.5607, lng: 126.9770 }, program: "기념관", architectNames: ["배대용"], office: "디림건축사사무소", awardYear: 2010 },
  { id: "b16", slug: "floating-house", titleKo: "플로팅 하우스", title: "Floating House", address: "경기 양평군", coordinates: { lat: 37.5143, lng: 127.4889 }, program: "단독주택", architectNames: ["유현준"], office: "유현준건축사사무소", awardYear: 2009 },
  { id: "b17", slug: "jang-uk-jin-museum", titleKo: "양주시립장욱진미술관", title: "Yangju Jang Wook-jin Museum", address: "경기 양주시 장흥면", coordinates: { lat: 37.7572, lng: 126.9815 }, program: "문화시설", architectNames: ["최삼영", "비탈리 페레이라"], office: "최-페레이라 건축", awardYear: 2009 },
  { id: "b18", slug: "pocheon-art-valley", titleKo: "포천아트벨리 전시교육관", title: "Pocheon Art Valley", address: "경기 포천시 신북면", coordinates: { lat: 37.9305, lng: 127.1964 }, program: "문화시설", architectNames: ["이병욱"], office: "SL건축사사무소", awardYear: 2009 },
  { id: "b19", slug: "bati-rieul", titleKo: "바티리을", title: "Bati Rieul", address: "서울 중구", coordinates: { lat: 37.5619, lng: 126.9794 }, program: "복합시설", architectNames: ["임재용"], office: "로디자인", awardYear: 2008 },
  { id: "b20", slug: "jeju-horse-museum", titleKo: "가시리 조랑말박물관", title: "Gasiri Horse Museum", address: "제주 서귀포시 표선면 가시리", coordinates: { lat: 33.3513, lng: 126.8135 }, program: "박물관", architectNames: ["원도연"], office: "제공건축", awardYear: 2008 },
  { id: "b21", slug: "seongsu-yeonbang", titleKo: "성수연방", title: "Seongsu Yeonbang", address: "서울 성동구 성수동", coordinates: { lat: 37.5440, lng: 127.0557 }, program: "복합문화시설", architectNames: ["한양규", "신혜원", "이재용"], office: "푸하하하프렌즈", awardYear: 2019 },
  { id: "b22", slug: "maegok-library", titleKo: "매곡도서관", title: "Maegok Library", address: "광주광역시 북구 매곡동", coordinates: { lat: 35.2109, lng: 126.8758 }, program: "도서관", architectNames: ["권형표", "이선희"], office: "아이디알", awardYear: 2019 },
  { id: "b23", slug: "chaebu-dong-culture", titleKo: "체부동 생활문화센터", title: "Chaebu-dong Cultural Center", address: "서울 종로구 체부동", coordinates: { lat: 37.5795, lng: 126.9682 }, program: "문화시설", architectNames: ["한승재", "한진이"], office: "지요건축", awardYear: 2020 },
  { id: "b24", slug: "huam-corner-house", titleKo: "후암동 코너 하우스", title: "Huam Corner House", address: "서울 용산구 후암동", coordinates: { lat: 37.5476, lng: 126.9823 }, program: "단독주택", architectNames: ["이영복", "황소현"], office: "경계없는 작업실", awardYear: 2018 },
];

// ---------- 연도별 그룹화 ----------
const YEARS = Array.from(new Set(AWARD_DATA.map((e) => e.year))).sort((a, b) => b - a);
const BY_YEAR: Record<number, AwardEntry[]> = {};
AWARD_DATA.forEach((e) => {
  if (!BY_YEAR[e.year]) BY_YEAR[e.year] = [];
  BY_YEAR[e.year].push(e);
});

// ---------- 지도 컴포넌트 ----------
type MapInstance = Window & { google?: any; __awardMapPromise?: Promise<any> };

function AwardMap({ buildings, activeYear }: { buildings: AwardBuilding[]; activeYear: number | null }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID";
    if (!apiKey || !containerRef.current) return;

    const win = window as MapInstance;

    const load = () => {
      if (win.google?.maps) return Promise.resolve(win.google);
      if (win.__awardMapPromise) return win.__awardMapPromise;
      win.__awardMapPromise = new Promise((resolve, reject) => {
        const s = document.createElement("script");
        const p = new URLSearchParams({ key: apiKey, v: "weekly", libraries: "maps,marker", loading: "async", language: "ko", region: "KR" });
        s.src = `https://maps.googleapis.com/maps/api/js?${p}`;
        s.async = true;
        s.onload = () => resolve(win.google);
        s.onerror = reject;
        document.head.appendChild(s);
      });
      return win.__awardMapPromise;
    };

    load().then((g) => {
      if (!containerRef.current) return;
      if (!mapRef.current) {
        mapRef.current = new g.maps.Map(containerRef.current, {
          center: { lat: 36.5, lng: 127.7 },
          zoom: 7,
          mapId,
          disableDefaultUI: true,
          zoomControl: true,
        });
      }
      // 기존 마커 제거
      markersRef.current.forEach((m) => m.map = null);
      markersRef.current = [];

      const filtered = activeYear ? buildings.filter((b) => b.awardYear === activeYear) : buildings;

      filtered.forEach((b) => {
        // 오버레이 시 이동·확대 없이 색만 전환되는 CSS 마커
        const dot = document.createElement("div");
        dot.className = activeYear ? "award-pin award-pin--active" : "award-pin";
        const marker = new g.maps.marker.AdvancedMarkerElement({
          map: mapRef.current,
          position: b.coordinates,
          title: b.titleKo,
          content: dot,
        });
        markersRef.current.push(marker);
      });
    }).catch(() => {});
  }, [buildings, activeYear]);

  return (
    <div ref={containerRef} className="lattice-fill" style={{ width: "100%", height: "420px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--ink-muted)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
        MAP LOADING
      </div>
    </div>
  );
}

// ---------- 메인 페이지 ----------
export default function YoungArchitectAwardPage() {
  const { language } = useLanguage();
  const [activeYear, setActiveYear] = useState<number | null>(null);

  const visibleEntries = activeYear ? BY_YEAR[activeYear] || [] : AWARD_DATA;
  const visibleYears = activeYear ? [activeYear] : YEARS;

  return (
    <PageShell active="architects">
      <p className="subarchive-crumb eyebrow">
        <Link href="/architects">
          {language === "ko" ? "건축가" : "Architects"}
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{language === "ko" ? "젊은건축가상" : "Young Architect Award"}</span>
      </p>

      <section className="page-head">
        <p className="eyebrow">
          {language === "ko" ? "건축가 하위 아카이브" : "Architect sub-archive"}
        </p>
        <h1 className="page-title">
          {language === "ko" ? "젊은건축가상" : "young architect award"}
        </h1>
        <p className="page-intro">
          {language === "ko"
            ? "문화체육관광부 주최·새건축사협의회·한국건축가협회·한국여성건축가협회 주관. 2008년부터 매년 우수한 역량을 갖춘 신진 건축가를 선발하는 국내 대표 건축가 등용문."
            : "Organized by the Ministry of Culture, Sports and Tourism. Since 2008, the award has recognized emerging Korean architects of outstanding ability each year."}
        </p>
      </section>

      {/* 지도 섹션 */}
      <section className="award-map-section">
        <div className="award-map-header">
          <span className="eyebrow">
            {language === "ko" ? "수상작 위치" : "Award project locations"}
          </span>
          {activeYear && (
            <span className="award-map-year-badge">{activeYear}</span>
          )}
        </div>
        <AwardMap buildings={MAP_BUILDINGS} activeYear={activeYear} />
      </section>

      {/* 연도 필터 + 목록 */}
      <div className="award-layout">
        {/* 연도 내비게이션 */}
        <nav className="award-year-nav" aria-label="연도 필터">
          <button
            className={`award-year-btn${activeYear === null ? " award-year-btn--active" : ""}`}
            onClick={() => setActiveYear(null)}
          >
            {language === "ko" ? "전체" : "All"}
            <span className="award-year-count">{AWARD_DATA.length}</span>
          </button>
          {YEARS.map((y) => (
            <button
              key={y}
              className={`award-year-btn${activeYear === y ? " award-year-btn--active" : ""}`}
              onClick={() => setActiveYear(activeYear === y ? null : y)}
            >
              {y}
              <span className="award-year-count">{(BY_YEAR[y] || []).length}</span>
            </button>
          ))}
        </nav>

        {/* 수상자 목록 */}
        <div className="award-entries">
          {visibleYears.map((year) => (
            <section key={year} id={`year-${year}`} className="award-year-section">
              <div className="award-year-section__head">
                <span className="award-year-label">{year}</span>
                <span className="award-year-subtitle">
                  {language === "ko" ? "수상" : "Award"}
                </span>
              </div>
              <div className="award-cards">
                {(BY_YEAR[year] || []).map((entry, i) => (
                  <article key={i} className="award-card">
                    <div className="award-card__top">
                      <div>
                        <h2 className="award-card__names">
                          {entry.architects.join(" · ")}
                        </h2>
                        <p className="award-card__office">{entry.office}</p>
                      </div>
                      {entry.website && (
                        <a
                          href={entry.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="award-card__link"
                          title={entry.website}
                        >
                          ↗
                        </a>
                      )}
                    </div>
                    <div className="award-card__works">
                      <span className="award-card__works-label eyebrow">
                        {language === "ko" ? "대표작" : "Works"}
                      </span>
                      <ul className="award-card__works-list">
                        {entry.representative_works.map((w, j) => (
                          <li key={j}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
