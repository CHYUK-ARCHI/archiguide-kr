"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ArchitectureArt } from "@/components/architecture-art";
import type { Building } from "@/lib/site-data";

type FeaturedCarouselProps = {
  buildings: Building[];
  architectNameMap: Record<string, string>;
};

export function FeaturedCarousel({
  buildings,
  architectNameMap
}: FeaturedCarouselProps) {
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
          title={active.title}
          label={`${active.city} / ${active.year}`}
          palette={active.palette}
        />
        <div className="feature-carousel__caption">
          <span className="feature-carousel__index">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(buildings.length).padStart(2, "0")}
          </span>
          <span>{active.city} / {active.year}</span>
        </div>
      </div>

      <div className="feature-carousel__content">
        <div className="feature-carousel__eyebrow">Featured building</div>
        <h2 className="feature-carousel__title">{active.title}</h2>
        <p className="feature-carousel__meta">
          {[active.city, active.district, active.type, active.status].join(" / ")}
        </p>
        <p className="feature-carousel__summary">{active.summary}</p>
        <p className="feature-carousel__highlight">{active.highlight}</p>
        <p className="feature-carousel__architects">
          By {active.architectSlugs.map((slug) => architectNameMap[slug]).join(", ")}
        </p>

        <div className="feature-carousel__actions">
          <Link className="button button--solid" href={`/buildings#${active.slug}`}>
            Open entry
          </Link>
          <div className="feature-carousel__controls" aria-label="Featured projects">
            <button
              type="button"
              className="button button--ghost"
              onClick={() =>
                setCurrentIndex((previous) =>
                  previous === 0 ? buildings.length - 1 : previous - 1
                )
              }
            >
              Previous
            </button>
            <button
              type="button"
              className="button button--ghost"
              onClick={() =>
                setCurrentIndex((previous) => (previous + 1) % buildings.length)
              }
            >
              Next
            </button>
          </div>
        </div>

        <div className="feature-carousel__dots">
          {buildings.map((building, index) => (
            <button
              key={building.slug}
              type="button"
              className={`feature-carousel__dot${
                index === currentIndex ? " feature-carousel__dot--active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to ${building.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
