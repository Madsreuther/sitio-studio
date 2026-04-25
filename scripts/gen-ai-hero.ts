#!/usr/bin/env tsx
// Build-time generator for the AI hero wash images.
// Usage:
//   FAL_KEY_2=... npx tsx scripts/gen-ai-hero.ts
//
// Writes 7 PNGs into public/ai-cache/hero/ + a manifest.json the
// runtime hero component reads at module evaluation time. Re-run
// weekly (cron, or manually before a release) to refresh the wash.

// Load .env.local manually so we don't need a dotenv dep on this side.
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
try {
  const raw = fsSync.readFileSync('.env.local', 'utf8');
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  /* fall through — env may already be set in the shell */
}
import path from 'node:path';
import { fetchImageBytes, generateImage } from '../lib/ai/fal';
import { HERO_PROMPTS } from '../lib/ai/prompts';

const OUT_DIR = path.join(process.cwd(), 'public', 'ai-cache', 'hero');

type ManifestEntry = {
  id: string;
  file: string;
  width: number;
  height: number;
  prompt: string;
  generated_at: string;
  seed: number;
};

async function main() {
  if (!process.env.FAL_KEY_2) {
    console.error('FAL_KEY_2 not set — refusing to run.');
    process.exit(1);
  }
  await fs.mkdir(OUT_DIR, { recursive: true });

  const entries: ManifestEntry[] = [];
  for (const preset of HERO_PROMPTS) {
    process.stdout.write(`→ generating "${preset.id}"… `);
    const t0 = Date.now();
    try {
      const result = await generateImage({ prompt: preset.prompt, width: 1536, height: 864 });
      const bytes = await fetchImageBytes(result.url);
      const file = `${preset.id}.png`;
      await fs.writeFile(path.join(OUT_DIR, file), bytes);
      entries.push({
        id: preset.id,
        file,
        width: result.width,
        height: result.height,
        prompt: preset.prompt,
        generated_at: new Date().toISOString(),
        seed: result.seed,
      });
      process.stdout.write(`ok (${Math.round((Date.now() - t0) / 1000)}s)\n`);
    } catch (err) {
      process.stdout.write(`failed: ${(err as Error).message}\n`);
    }
  }

  await fs.writeFile(
    path.join(OUT_DIR, 'manifest.json'),
    JSON.stringify({ generated_at: new Date().toISOString(), entries }, null, 2),
  );
  console.log(`\nWrote ${entries.length} images + manifest.json to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
