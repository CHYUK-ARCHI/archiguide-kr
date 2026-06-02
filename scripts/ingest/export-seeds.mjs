import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

async function readJson(relativePath) {
  const absolutePath = path.join(process.cwd(), relativePath);
  return JSON.parse(await readFile(absolutePath, "utf8"));
}

const architects = await readJson("data/normalized/architects/archive-architects.json");
const offices = await readJson("data/normalized/offices/archive-offices.json");
const buildings = await readJson("data/normalized/buildings/archive-buildings.json");
const awards = await readJson("data/normalized/awards/archive-awards.json");
const relations = await readJson("data/normalized/relations/archive-relations.json");

const seed = {
  version: 1,
  generatedAt: new Date().toISOString(),
  notes: [
    "App-ready seed generated from normalized archive records.",
    "Use this file for portable snapshots or downstream app imports."
  ],
  architects,
  offices,
  buildings,
  awards,
  relations
};

const outputPath = path.join(process.cwd(), "data/seeds/archive-content.json");
await writeFile(outputPath, `${JSON.stringify(seed, null, 2)}\n`);

console.log(`Exported archive seed to ${outputPath}`);
