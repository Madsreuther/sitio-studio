#!/usr/bin/env tsx
// Build-time generator for the Selected Work card mockups.
// Usage:
//   FAL_KEY_3=... npx tsx scripts/gen-ai-work.ts
//
// Writes one PNG per business-type variant into public/ai-cache/work/
// + a manifest.json. The runtime SelectedWorkThumbnail keeps its SVG
// output as a fallback when the variant is missing from the manifest.

import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
try {
  const raw = fsSync.readFileSync('.env.local', 'utf8');
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) {
      let v = m[2];
      // `vercel env pull` wraps values in double quotes. Strip a
      // matched pair so FAL gets the bare token, not "<token>".
      if (v.length >= 2 && v.startsWith('"') && v.endsWith('"')) {
        v = v.slice(1, -1);
      } else if (v.length >= 2 && v.startsWith("'") && v.endsWith("'")) {
        v = v.slice(1, -1);
      }
      process.env[m[1]] = v;
    }
  }
} catch {
  /* fall through */
}

import { fetchImageBytes, generateImage } from '../lib/ai/fal';
import { WORK_PROMPTS } from '../lib/ai/prompts';

const OUT_DIR = path.join(process.cwd(), 'public', 'ai-cache', 'work');

type Entry = {
  variant: string;
  file: string;
  width: number;
  height: number;
  generated_at: string;
  seed: number;
  prompt: string;
};

async function main() {
  if (!process.env.FAL_KEY_3) {
    console.error('FAL_KEY_3 not set — refusing to run.');
    process.exit(1);
  }
  await fs.mkdir(OUT_DIR, { recursive: true });

  const entries: Entry[] = [];
  for (const [variant, preset] of Object.entries(WORK_PROMPTS)) {
    process.stdout.write(`→ generating "${variant}"… `);
    const t0 = Date.now();
    try {
      // 4:3 mockup, generous resolution so the iframe-shaped card stays
      // sharp on retina without blowing up the PNG.
      const result = await generateImage({
        prompt: preset.prompt,
        negativePrompt: preset.negative,
        width: 1280,
        height: 960,
      });
      const bytes = await fetchImageBytes(result.url);
      const file = `${variant}.png`;
      await fs.writeFile(path.join(OUT_DIR, file), bytes);
      entries.push({
        variant,
        file,
        width: result.width,
        height: result.height,
        generated_at: new Date().toISOString(),
        seed: result.seed,
        prompt: preset.prompt,
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
  console.log(`\nWrote ${entries.length} mockups + manifest.json to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
