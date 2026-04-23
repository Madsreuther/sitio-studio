# sitio studio

Marketing site for sitiostudio.com — a boutique website studio in Copenhagen.

Next.js 16 · TypeScript · Tailwind · Resend contact form.

## Local dev

```bash
npm install
npm run dev            # http://localhost:3000
```

## Environment

| Variable | Required for | Notes |
|----------|--------------|-------|
| `RESEND_API_KEY` | contact form | When unset the form logs the message and returns success so local dev still works |

## Pages

```
/              Home
/about         About — founders + why
/process       How a project runs + FAQ
/pricing       €1000 + €29/month breakdown
/contact       Contact form (Resend)
/api/contact   Form POST endpoint
```

## Content

No CMS. Copy lives directly in the page components in `app/*/page.tsx`.
Sample-work cards are an array at the top of `app/page.tsx`.

## Design system

- Fonts: Fraunces (serif headings), Inter (body) — both via `next/font/google`.
- Palette: cream `#F5F1EB` · earth `#A57C52` · ink `#1A1814` — CSS vars in `app/globals.css`.
- Motion: opt-in fade-up on scroll via `components/Reveal.tsx`; respects `prefers-reduced-motion`.
- Components: `SiteHeader`, `SiteFooter`, `Container`, primitives in `ui.tsx`.

## Redirects

Alternate domains (`hello-sitio.com`, `sitio-hq.com`, `sitiodesign.app`) permanent-redirect to `sitiostudio.com` via `vercel.json`.

## Deployment

GitHub push → Vercel auto-deploy. OG image auto-generates at `/opengraph-image`. `robots.ts` + `sitemap.ts` are MetadataRoute files so Next serves `/robots.txt` and `/sitemap.xml` automatically.
