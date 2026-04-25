// Build-time read of the AI manifest. If the file is missing (no
// generation has been run yet), readHeroManifest returns null and the
// runtime hero component falls back to the existing 3D scene + CSS
// gradient. No FAL key is ever read at runtime.

import fs from 'node:fs';
import path from 'node:path';

export type HeroEntry = {
  id: string;
  file: string;
  width: number;
  height: number;
  generated_at: string;
};

export type HeroManifest = {
  generated_at: string;
  entries: HeroEntry[];
};

export function readHeroManifest(): HeroManifest | null {
  try {
    const p = path.join(process.cwd(), 'public', 'ai-cache', 'hero', 'manifest.json');
    const raw = fs.readFileSync(p, 'utf8');
    const parsed = JSON.parse(raw) as HeroManifest;
    if (!Array.isArray(parsed?.entries) || parsed.entries.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

export type WorkEntry = {
  variant: string;
  file: string;
  width: number;
  height: number;
  generated_at: string;
};

export function readWorkManifest(): Record<string, WorkEntry> | null {
  try {
    const p = path.join(process.cwd(), 'public', 'ai-cache', 'work', 'manifest.json');
    const raw = fs.readFileSync(p, 'utf8');
    const parsed = JSON.parse(raw) as { entries: WorkEntry[] };
    if (!Array.isArray(parsed?.entries) || parsed.entries.length === 0) return null;
    const map: Record<string, WorkEntry> = {};
    for (const e of parsed.entries) map[e.variant] = e;
    return map;
  } catch {
    return null;
  }
}
