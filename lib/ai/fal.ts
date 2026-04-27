// Thin wrapper around @fal-ai/client. Used by build-time generation
// scripts (scripts/gen-ai-*.ts) — NOT by the runtime app. Keeping FAL
// off the runtime path means we never charge a visitor request for an
// image we already have on the CDN, and FAL_KEY_3 never lands in any
// route handler bundle.

import { fal } from '@fal-ai/client';

export type GenerateOpts = {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
};

export type GenerateResult = {
  url: string;
  width: number;
  height: number;
  seed: number;
};

let configured = false;

function ensureConfigured() {
  if (configured) return;
  // FAL_KEY_3 in Vercel; previous FAL_KEY_2 was rotated/deprecated.
  const key = process.env.FAL_KEY_3;
  if (!key) throw new Error('FAL_KEY_3 is not set');
  fal.config({ credentials: key });
  configured = true;
}

// Flux Schnell is the speed/cost target the brief asked for —
// ~$0.003/image and 1–2s generation. We use the canonical fal endpoint
// id and let fal.subscribe handle the queue+poll for us.
const FLUX_SCHNELL = 'fal-ai/flux/schnell';

export async function generateImage(opts: GenerateOpts): Promise<GenerateResult> {
  ensureConfigured();
  // Flux Schnell is a 4-step model and does not accept a negative_prompt.
  // We keep the field in our public type for symmetry with other models
  // but ignore it here; prompt phrasing carries the signal.
  void opts.negativePrompt;
  const result = await fal.subscribe(FLUX_SCHNELL, {
    input: {
      prompt: opts.prompt,
      image_size:
        opts.width && opts.height
          ? { width: opts.width, height: opts.height }
          : 'landscape_16_9',
      num_inference_steps: 4,
      enable_safety_checker: true,
    },
    logs: false,
  });
  type FluxImage = { url?: string; width?: number; height?: number };
  type FluxData = { images?: FluxImage[]; seed?: number };
  const data = (result as { data?: FluxData }).data ?? {};
  const first = data.images?.[0];
  if (!first?.url) throw new Error('FAL returned no image URL');
  return {
    url: first.url,
    width: first.width ?? opts.width ?? 1280,
    height: first.height ?? opts.height ?? 720,
    seed: data.seed ?? 0,
  };
}

// Pull the bytes off FAL's CDN so we can write them locally. Fal hosts
// generated images on its own CDN with no expiry guarantee — copying
// once at build time decouples us.
export async function fetchImageBytes(url: string): Promise<Buffer> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`download failed: ${r.status}`);
  const buf = await r.arrayBuffer();
  return Buffer.from(buf);
}
