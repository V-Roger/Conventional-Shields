/**
 * Pre-generates all badge URL combinations, shortens them via TinyURL, and writes
 * a cache JSON for the extension to use without network requests.
 *
 * Run after build: pnpm build && node dist/scripts/generate-badge-cache.js
 */
/// <reference types="node" />

import * as fs from 'fs';
import * as path from 'path';
import * as ConventionalShields from '../index.js';

const TINYURL_API = 'https://tinyurl.com/api-create.php';
const DELAY_MS = 250; // Be nice to TinyURL
const OUTPUT_PATH = path.join(process.cwd(), 'src', 'config', 'badge-url-cache.json');

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function shortenUrl(longUrl: string): Promise<string> {
  const url = `${TINYURL_API}?url=${encodeURIComponent(longUrl)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`TinyURL failed ${res.status}: ${await res.text()}`);
  }
  return res.text();
}

function getCombinations(): { label: ConventionalShields.ConventionalLabel; decorations: ConventionalShields.ConventionalDecoration[] }[] {
  const labels = ConventionalShields.availableLabels;
  const decorations = ConventionalShields.availableDecorations;
  const combinations: { label: ConventionalShields.ConventionalLabel; decorations: ConventionalShields.ConventionalDecoration[] }[] = [];

  for (const label of labels) {
    combinations.push({ label, decorations: [] });
    for (const dec of decorations) {
      combinations.push({ label, decorations: [dec] });
    }
  }

  return combinations;
}

async function main(): Promise<void> {
  const combinations = getCombinations();
  const cache: Record<string, string> = {};
  let done = 0;

  console.log(`Generating ${combinations.length} short URLs via TinyURL...`);

  for (const { label, decorations } of combinations) {
    const fullUrl = ConventionalShields.generateConventionalShield({
      label,
      decorations,
    });
    const key = ConventionalShields.getBadgeCacheKey(label, decorations);

    try {
      const shortUrl = await shortenUrl(fullUrl);
      cache[key] = shortUrl.trim();
      done++;
      if (done % 50 === 0) {
        console.log(`  ${done}/${combinations.length}`);
      }
    } catch (err) {
      console.error(`  Failed for ${key}:`, (err as Error).message);
      cache[key] = fullUrl; // Fallback to long URL in cache
    }

    await sleep(DELAY_MS);
  }

  const outDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`Wrote ${Object.keys(cache).length} entries to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
