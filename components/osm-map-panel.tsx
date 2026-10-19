"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { BuildingMedia } from "@/components/building-media";
import { useLanguage } from "@/components/language-provider";
import {
  getArchitectNamesForBuilding,
  getBuildingRoadAddress,
  getBuildingTitle,
  getCityLabel,
  getDistrictLabel,
  getTypeLabel,
  type Building
} from "@/lib/site-data";
import { OSM_ATTRIBUTION, OSM_TILE_URL, loadLeaflet } from "@/lib/leaflet-loader";

type OsmMapPanelProps = {
  buildings: Building[];
  selectedSlug?: string;
  onSelect?: (slug: string) => void;
  title?: string;
  description?: string;
};

const DEFAULT_CENTER: [number, number] = [36.2, 127.8];
const DEFAULT_ZOOM = 7;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function OsmMapPanel({
  buildings,
  selectedSlug,
  onSelect,
  title = "OpenStreetMap",
  description = "Markers reflect the filtered architecture entries."
}: OsmMapPanelProps) {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedBuilding = useMemo(
    () => buildings.find((building) => building.slug === selectedSlug) ?? null,
    [buildings, selectedSlug]
  );

  const selectedCoordinates = selectedBuilding?.coordinates ?? null;

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      try {
        const L = await loadLeaflet();

        if (cancelled || !containerRef.current) {
          return;
        }

        if (!mapRef.current) {
          mapRef.current = L.map(containerRef.current, {
            center: selectedCoordinates
              ? [selectedCoordinates.lat, selectedCoordinates.lng]
              : DEFAULT_CENTER,
            zoom: selectedCoordinates ? 11 : DEFAULT_ZOOM,
            scrollWheelZoom: true
          });
          L.tileLayer(OSM_TILE_URL, {
            maxZoom: 19,
            attribution: OSM_ATTRIBUTION
          }).addTo(mapRef.current);
          layerRef.current = L.layerGroup().addTo(mapRef.current);
        }

        layerRef.current.clearLayers();

        const geocodedBuildings = buildings.flatMap((building) =>
          building.coordinates ? [{ building, coordinates: building.coordinates }] : []
        );

        if (geocodedBuildings.length === 0) {
          mapRef.current.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
          setStatus("ready");
          return;
        }

        const points: [number, number][] = [];

        geocodedBuildings.forEach(({ building, coordinates }) => {
          const point: [number, number] = [coordinates.lat, coordinates.lng];
          const isSelected = building.slug === selectedSlug;
          const buildingTitle = getBuildingTitle(building, language);

          const marker = L.circleMarker(point, {
            radius: isSelected ? 10 : 7,
            color: "#1d1d1b",
            weight: 2,
            fillColor: isSelected ? "#903f1e" : "#f8f5ee",
            fillOpacity: 1
          });

          marker.bindTooltip(escapeHtml(buildingTitle));
          marker.bindPopup(
            `
              <div style="max-width:240px;color:#171311;font-family:Segoe UI, sans-serif;">
                <strong style="display:block;margin-bottom:6px;">${escapeHtml(
                  buildingTitle
                )}</strong>
                <div style="font-size:12px;line-height:1.5;">
                  ${escapeHtml(getCityLabel(building.city, language))} / ${escapeHtml(
                    getDistrictLabel(building.district, language)
                  )}<br/>
                  ${escapeHtml(getTypeLabel(building.type, language))} / ${building.year}<br/>
                  ${escapeHtml(getBuildingRoadAddress(building, language))}
                </div>
              </div>
            `
          );
          marker.on("click", () => onSelect?.(building.slug));
          marker.addTo(layerRef.current);

          if (isSelected) {
            marker.bringToFront();
          }

          points.push(point);
        });

        if (selectedCoordinates) {
          mapRef.current.setView(
            [selectedCoordinates.lat, selectedCoordinates.lng],
            Math.max(mapRef.current.getZoom(), 11)
          );
        } else if (points.length === 1) {
          mapRef.current.setView(points[0], 12);
        } else {
          mapRef.current.fitBounds(points, { padding: [72, 72] });
        }

        setStatus("ready");
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Unknown map error"
        );
        setStatus("error");
      }
    }

    initialize();

    return () => {
      cancelled = true;
    };
  }, [buildings, language, onSelect, selectedCoordinates, selectedSlug]);

  useEffect(() => {
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  return (
    <section className="map-panel">
      <div className="map-panel__head">
        <div>
          <p className="eyebrow">{language === "ko" ? "지도 탐색" : "Map explorer"}</p>
          <h2>{title}</h2>
        </div>
        <p className="map-panel__copy">{description}</p>
      </div>

      {status === "error" ? (
        <div className="map-fallback">
          <strong>{language === "ko" ? "지도를 불러오지 못했습니다." : "Map failed to load."}</strong>
          <p>{errorMessage}</p>
        </div>
      ) : null}

      <div ref={containerRef} className="map-canvas" aria-label="Architecture map" />

      <div className="map-panel__legend">
        <span>
          {language === "ko"
            ? `${buildings.filter((building) => building.coordinates).length}개 마커 표시`
            : `${buildings.filter((building) => building.coordinates).length} visible markers`}
        </span>
        <span>
          {selectedBuilding
            ? language === "ko"
              ? `선택됨: ${getBuildingTitle(selectedBuilding, language)}`
              : `Selected: ${getBuildingTitle(selectedBuilding, language)}`
            : language === "ko"
              ? "마커나 목록 항목을 선택하세요."
              : "Select a marker or list entry."}
        </span>
      </div>

      {selectedBuilding ? (
        <article className="map-selection-card">
          <div className="map-selection-card__media">
            <BuildingMedia building={selectedBuilding} variant="preview" />
          </div>
          <div className="map-selection-card__body">
            <p className="eyebrow">
              {language === "ko" ? "선택한 프로젝트" : "Selected project"}
            </p>
            <h3 className="map-selection-card__title">
              {getBuildingTitle(selectedBuilding, language)}
            </h3>
            <p className="map-selection-card__meta">
              {getArchitectNamesForBuilding(selectedBuilding, language).join(", ")}
            </p>
            <p className="map-selection-card__meta">
              {[
                getCityLabel(selectedBuilding.city, language),
                getDistrictLabel(selectedBuilding.district, language),
                getTypeLabel(selectedBuilding.type, language)
              ].join(" / ")}
            </p>
            <p className="map-selection-card__address">
              {getBuildingRoadAddress(selectedBuilding, language)}
            </p>
            <Link
              href={`/buildings/${selectedBuilding.slug}`}
              className="map-selection-card__link"
            >
              {language === "ko" ? "건물 정보 보기" : "Open building page"}
            </Link>
          </div>
        </article>
      ) : null}
    </section>
  );
}
