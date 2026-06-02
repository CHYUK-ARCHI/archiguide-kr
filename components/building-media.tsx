"use client";

import { ArchitectureArt } from "@/components/architecture-art";
import { useLanguage } from "@/components/language-provider";
import { getBuildingHeroImage, getBuildingTitle, type Building } from "@/lib/site-data";

type BuildingMediaProps = {
  building: Building;
  variant?: "hero" | "card" | "preview";
};

export function BuildingMedia({
  building,
  variant = "hero"
}: BuildingMediaProps) {
  const { language } = useLanguage();
  const image = getBuildingHeroImage(building);

  if (!image?.src) {
    return (
      <div className={`building-media building-media--${variant}`}>
        <ArchitectureArt
          title={getBuildingTitle(building, language)}
          label={`${building.city} / ${building.year}`}
          palette={building.palette}
          mode={variant === "hero" ? "wide" : "compact"}
        />
      </div>
    );
  }

  return (
    <figure className={`building-media building-media--${variant}`}>
      <img
        src={image.src}
        alt={language === "ko" ? image.altKo : image.alt}
        className="building-media__image"
      />
      {(image.credit || image.licenseNote) ? (
        <figcaption className="building-media__caption">
          {[image.credit, image.licenseNote].filter(Boolean).join(" / ")}
        </figcaption>
      ) : null}
    </figure>
  );
}
