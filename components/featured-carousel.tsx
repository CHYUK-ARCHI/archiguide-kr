"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ArchitectureArt } from "@/components/architecture-art";
import { useLanguage } from "@/components/language-provider";
import { getBuildingTitle, getCityLabel, type Building } from "@/lib/site-data";

type FeaturedCarouselProps = {
  buildings: Building[];
  architectNameMap: Record<string, string>;
};

export function FeaturedCarousel({
  buildings,
  architectNameMap
}: FeaturedCarouselProps) {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (buildings.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % buildings.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [buildings.length]);

  if (buildings.length === 0) {
    return null;
  }

  const active = buildings[currentIndex];

  return (
    <div className="feature-carousel">
      <div className="feature-carousel__media">
        <ArchitectureArt
          title={getBuildingTitle(active, language)}
          label={`${getCityLabel(active.city, language)} / ${active.year}`}
          palette={active.palette}
        />
      </div>

      <div className="feature-carousel__footer">
        <Link className="feature-carousel__caption" href={`/buildings#${active.slug}`}>
          {getBuildingTitle(active, language)},{" "}
          {active.architectSlugs
            .map((slug) => architectNameMap[slug])
            .join(", ")}
          , {active.year}, {getCityLabel(active.city, language)} &gt;
        </Link>

        <div className="feature-carousel__controls" aria-label="Featured projects">
          <button
            type="button"
            className="feature-carousel__button"
            onClick={() =>
              setCurrentIndex((previous) =>
                previous === 0 ? buildings.length - 1 : previous - 1
              )
            }
          >
            {language === "ko" ? "이전" : "previous"}
          </button>
          <span className="feature-carousel__index">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(buildings.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="feature-carousel__button"
            onClick={() =>
              setCurrentIndex((previous) => (previous + 1) % buildings.length)
            }
          >
            {language === "ko" ? "다음" : "next"}
          </button>
        </div>
      </div>
    </div>
  );
}
