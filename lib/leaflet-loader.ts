// OpenStreetMap 기반 지도(Leaflet) 로더. API 키가 필요 없다.
// Leaflet은 번들에 넣지 않고 unpkg에서 고정 버전·SRI 해시로 한 번만 불러온다.

const LEAFLET_VERSION = "1.9.4";
const LEAFLET_BASE = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist`;
const LEAFLET_CSS_INTEGRITY =
  "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
const LEAFLET_JS_INTEGRITY =
  "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";

// OSM 타일 이용 정책: 출처(attribution) 표기 필수, 일괄 다운로드·사전 캐시 금지.
export const OSM_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';

type LeafletWindow = Window & {
  L?: any;
  __archiguideLeafletPromise?: Promise<any>;
};

export function loadLeaflet(): Promise<any> {
  const leafletWindow = window as LeafletWindow;

  if (leafletWindow.L) {
    return Promise.resolve(leafletWindow.L);
  }

  if (leafletWindow.__archiguideLeafletPromise) {
    return leafletWindow.__archiguideLeafletPromise;
  }

  leafletWindow.__archiguideLeafletPromise = new Promise((resolve, reject) => {
    if (!document.querySelector('link[data-leaflet-css="archiguide-kr"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `${LEAFLET_BASE}/leaflet.css`;
      link.integrity = LEAFLET_CSS_INTEGRITY;
      link.crossOrigin = "";
      link.dataset.leafletCss = "archiguide-kr";
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.src = `${LEAFLET_BASE}/leaflet.js`;
    script.integrity = LEAFLET_JS_INTEGRITY;
    script.crossOrigin = "";
    script.async = true;
    script.onload = () => resolve((window as LeafletWindow).L);
    script.onerror = () => {
      leafletWindow.__archiguideLeafletPromise = undefined;
      reject(new Error("Leaflet failed to load."));
    };
    document.head.appendChild(script);
  });

  return leafletWindow.__archiguideLeafletPromise;
}
