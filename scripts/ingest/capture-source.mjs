import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

function readArg(name, fallback = null) {
  const index = process.argv.indexOf(`--${name}`);

  if (index === -1) {
    return fallback;
  }

  return process.argv[index + 1] ?? fallback;
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripHtml(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchOne(pattern, source) {
  const match = source.match(pattern);
  return match?.[1]?.trim() ?? null;
}

const url = readArg("url");
const bucket = readArg("bucket", "young-architect-award");
const requestedSlug = readArg("slug");

if (!url) {
  console.error("Usage: npm run ingest:capture -- --url <source-url> [--bucket <folder>] [--slug <file-slug>]");
  process.exit(1);
}

const response = await fetch(url, {
  headers: {
    "user-agent": "archiguide-kr-ingest/0.1"
  }
});

if (!response.ok) {
  throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
}

const html = await response.text();
const title =
  matchOne(/<title[^>]*>([\s\S]*?)<\/title>/i, html) ?? "Untitled source";
const description =
  matchOne(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i, html) ??
  matchOne(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i, html);
const imageUrls = Array.from(
  html.matchAll(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi),
  (match) => match[1]
);
const bodyText = stripHtml(html).slice(0, 6000);
const slug = requestedSlug ?? slugify(title) || `capture-${Date.now()}`;

const outputDir = path.join(process.cwd(), "data", "raw", bucket);
const outputFile = path.join(outputDir, `${slug}.json`);

await mkdir(outputDir, { recursive: true });
await writeFile(
  outputFile,
  JSON.stringify(
    {
      slug,
      bucket,
      sourceUrl: url,
      capturedAt: new Date().toISOString(),
      title,
      description,
      imageUrls,
      bodyText,
      html
    },
    null,
    2
  )
);

console.log(`Saved raw capture to ${outputFile}`);
