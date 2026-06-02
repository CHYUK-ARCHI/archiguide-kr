import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

function readArg(name, fallback = null) {
  const index = process.argv.indexOf(`--${name}`);

  if (index === -1) {
    return fallback;
  }

  return process.argv[index + 1] ?? fallback;
}

function normalizeAddress(value) {
  return value.replace(/\s+/g, " ").replace(/\s*,\s*/g, ", ").trim();
}

const inputPath = path.resolve(
  process.cwd(),
  readArg("input", "data/normalized/buildings/archive-buildings.json")
);
const reviewPath = path.resolve(
  process.cwd(),
  readArg("review", "data/normalized/reviews/geocode-review.json")
);
const apiKey = process.env.GOOGLE_GEOCODING_API_KEY;

if (!apiKey) {
  console.error("Missing GOOGLE_GEOCODING_API_KEY in the environment.");
  process.exit(1);
}

const buildings = JSON.parse(await readFile(inputPath, "utf8"));
const reviewQueue = JSON.parse(await readFile(reviewPath, "utf8"));

for (const building of buildings) {
  if (building.coordinates) {
    continue;
  }

  const address = normalizeAddress(
    building.roadAddress || building.address || building.rawAddress || ""
  );

  if (!address) {
    reviewQueue.push({
      slug: building.slug,
      reason: "missing-address",
      reviewedAt: new Date().toISOString()
    });
    continue;
  }

  const endpoint = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  endpoint.searchParams.set("address", address);
  endpoint.searchParams.set("key", apiKey);
  endpoint.searchParams.set("language", "en");
  endpoint.searchParams.set("region", "KR");

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Geocoding request failed for ${building.slug}`);
  }

  const payload = await response.json();
  const results = payload.results ?? [];
  const topResult = results[0];

  if (!topResult?.geometry?.location) {
    reviewQueue.push({
      slug: building.slug,
      reason: "no-results",
      address,
      reviewedAt: new Date().toISOString()
    });
    building.geocodeStatus = "pending";
    continue;
  }

  building.coordinates = {
    lat: topResult.geometry.location.lat,
    lng: topResult.geometry.location.lng
  };
  building.placeId = topResult.place_id ?? null;
  building.geocodeStatus =
    results.length > 1 || topResult.geometry.location_type !== "ROOFTOP"
      ? "manual-review"
      : "verified";
  building.geocodeConfidence =
    building.geocodeStatus === "verified" ? 0.95 : 0.75;

  if (building.geocodeStatus === "manual-review") {
    reviewQueue.push({
      slug: building.slug,
      reason: "ambiguous-result",
      address,
      resultCount: results.length,
      placeId: topResult.place_id ?? null,
      reviewedAt: new Date().toISOString()
    });
  }
}

await writeFile(inputPath, `${JSON.stringify(buildings, null, 2)}\n`);
await writeFile(reviewPath, `${JSON.stringify(reviewQueue, null, 2)}\n`);

console.log(`Geocode pass complete: ${path.relative(process.cwd(), inputPath)}`);
