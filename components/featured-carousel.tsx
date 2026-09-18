"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BuildingMedia } from "@/components/building-media";
import { useLanguage } from "@/components/language-provider";
import { getBuildingTitle, getCityLabel, type Building } from "@/lib/site-data";

type FeaturedCarouselProps = {
  buildings: Building[];
  architectNameMap: Record<string, string>;
};

// architectuurgids.nl 홈 방식: 조작 버튼 없이 일정 간격으로 자동 전환
const ROTATE_MS = 5000;

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
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [buildings.length]);

  if (buildings.length === 0) {
    return null;
  }

  const active = buildings[currentIndex];
  const href = `/buildings/${active.slug}`;
  const caption = [
    getBuildingTitle(active, language),
    active.architectSlugs.map((slug) => architectNameMap[slug]).join(", "),
    active.year,
    getCityLabel(active.city, language)
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="feature-carousel">
      <Link
        key={active.slug}
        href={href}
        className="feature-carousel__media"
        aria-label={getBuildingTitle(active, language)}
      >
        <BuildingMedia building={active} variant="hero" />
      </Link>

      <Link href={href} className="feature-carousel__caption">
        {caption} &gt;
      </Link>
    </div>
  );
}
