"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Building } from "@/lib/site-data";

type GoogleMapPanelProps = {
  buildings: Building[];
  selectedSlug?: string;
  onSelect?: (slug: string) => void;
  title?: string;
  description?: string;
};

type MapsWindow = Window & {
  google?: any;
  __archiguideGoogleMapsPromise?: Promise<any>;
};

const DEFAULT_CENTER = { lat: 36.2, lng: 127.8 };
const DEFAULT_ZOOM = 7;

function loadGoogleMapsApi(apiKey: string) {
  const mapsWindow = window as MapsWindow;

  if (mapsWindow.google?.maps) {
    return Promise.resolve(mapsWindow.google);
  }

  if (mapsWindow.__archiguideGoogleMapsPromise) {
    return mapsWindow.__archiguideGoogleMapsPromise;
  }

  mapsWindow.__archiguideGoogleMapsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-google-maps-loader="archiguide-kr"]'
    );

    if (existing) {
      existing.addEventListener("load", () => resolve((window as MapsWindow).google));
      existing.addEventListener("error", () => reject(new Error("Google Maps script failed to load.")));
      return;
    }

    const script = document.createElement("script");
    const params = new URLSearchParams({
      key: apiKey,
      v: "weekly",
      libraries: "maps,marker",
      loading: "async",
      language: "ko",
      region: "KR",
      auth_referrer_policy: "origin"
    });

    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMapsLoader = "archiguide-kr";
    script.onload = () => resolve((window as MapsWindow).google);
    script.onerror = () => reject(new Error("Google Maps script failed to load."));
    document.head.appendChild(script);
  });

  return mapsWindow.__archiguideGoogleMapsPromise;
}

export function GoogleMapPanel({
  buildings,
  selectedSlug,
  onSelect,
  title = "Google map",
  description = "Markers reflect the filtered architecture entries."
}: GoogleMapPanelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "missing-key" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID";

  const selectedBuilding = useMemo(
    () => buildings.find((building) => building.slug === selectedSlug),
    [buildings, selectedSlug]
  );

  useEffect(() => {
    if (!apiKey) {
      setStatus("missing-key");
      return;
    }

    const resolvedApiKey = apiKey;

    let cancelled = false;

    async function initialize() {
      try {
        setStatus("loading");
        const google = await loadGoogleMapsApi(resolvedApiKey);

        if (cancelled || !containerRef.current) {
          return;
        }

        const { Map, InfoWindow } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

        if (!mapRef.current) {
          mapRef.current = new Map(containerRef.current, {
            center: selectedBuilding?.coordinates ?? DEFAULT_CENTER,
            zoom: selectedBuilding ? 11 : DEFAULT_ZOOM,
            mapId,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          });
          infoWindowRef.current = new InfoWindow();
        }

        markersRef.current.forEach((marker) => {
          marker.map = null;
        });
        markersRef.current = [];

        if (buildings.length === 0) {
          setStatus("ready");
          return;
        }

        const bounds = new google.maps.LatLngBounds();

        buildings.forEach((building) => {
          const pin = new PinElement({
            background: building.slug === selectedSlug ? "#ca6a39" : "#f3eadb",
            borderColor: "#17262d",
            glyphColor: "#17262d"
          });

          const marker = new AdvancedMarkerElement({
            map: mapRef.current,
            position: building.coordinates,
            title: building.title,
            content: pin.element
          });

          marker.addListener("click", () => {
            infoWindowRef.current.setContent(
              `
                <div style="max-width:240px;color:#171311;font-family:Segoe UI, sans-serif;">
                  <strong style="display:block;margin-bottom:6px;">${building.title}</strong>
                  <div style="font-size:12px;line-height:1.5;">
                    ${building.city} · ${building.district}<br/>
                    ${building.type} · ${building.year}<br/>
                    ${building.roadAddress}
                  </div>
                </div>
              `
            );
            infoWindowRef.current.open({
              map: mapRef.current,
              anchor: marker
            });
            onSelect?.(building.slug);
          });

          markersRef.current.push(marker);
          bounds.extend(building.coordinates);
        });

        if (selectedBuilding) {
          mapRef.current.panTo(selectedBuilding.coordinates);
          mapRef.current.setZoom(Math.max(mapRef.current.getZoom() ?? 11, 11));
        } else if (buildings.length === 1) {
          mapRef.current.panTo(buildings[0].coordinates);
          mapRef.current.setZoom(12);
        } else {
          mapRef.current.fitBounds(bounds, 72);
        }

        setStatus("ready");
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Unknown map error");
        setStatus("error");
      }
    }

    initialize();

    return () => {
      cancelled = true;
    };
  }, [apiKey, buildings, mapId, onSelect, selectedBuilding, selectedSlug]);

  return (
    <section className="map-panel">
      <div className="map-panel__head">
        <div>
          <p className="eyebrow">Map explorer</p>
          <h2>{title}</h2>
        </div>
        <p className="map-panel__copy">{description}</p>
      </div>

      {status === "missing-key" ? (
        <div className="map-fallback">
          <strong>Google Maps API key is not configured.</strong>
          <p>
            Add <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> and optionally <code>NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID</code> to enable the interactive map. The filtered entries and coordinates are already ready for live rendering.
          </p>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="map-fallback">
          <strong>Map failed to load.</strong>
          <p>{errorMessage}</p>
        </div>
      ) : null}

      <div ref={containerRef} className="map-canvas" aria-label="Architecture map" />

      <div className="map-panel__legend">
        <span>{buildings.length} visible markers</span>
        <span>{selectedBuilding ? `Selected: ${selectedBuilding.title}` : "Select a marker or list entry."}</span>
      </div>
    </section>
  );
}
