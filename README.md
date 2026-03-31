# House of Leonard — Holding Page

Built with Next.js 14 (App Router) + Tailwind CSS. Deploy-ready for Vercel.

## Setup

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
```

## Deploying to Vercel

1. Push this folder to a GitHub repo (or just `site/`)
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Vercel auto-detects Next.js — hit Deploy
4. Add your custom domain in Vercel Project Settings → Domains
5. In Squarespace Domains, update DNS to point to Vercel's nameservers

## What to swap out

### Photography
Search for `TODO: Replace` in `app/page.tsx` — two Unsplash placeholder images.
Replace with real brand photography when available.
Recommend: `/public/images/` folder + Next.js `<Image>` component for optimisation.

### Email capture
The form currently logs to console. Wire it up by:
1. Creating `app/api/subscribe/route.ts`
2. Connecting to Mailchimp, ConvertKit, or Klaviyo
3. Updating the `handleSubmit` function in `page.tsx` to POST to `/api/subscribe`

Klaviyo is the recommendation for House of Leonard (best-in-class for DTC fashion brands).

### Social links
Footer Instagram link is `#` — replace with real URL when the account is live.

### Contact email
`hello@houseofleonard.com` in the footer — confirm this mailbox exists.

## Design system

Full design system is documented in `../stitch-source/leonard_editorial/DESIGN.md`.
Custom Tailwind tokens are in `tailwind.config.ts`.

## Next steps

1. Deploy to Vercel, point `houseofleonard.com` DNS
2. Wire email capture to Klaviyo/ConvertKit
3. Add Instagram link when account launches
4. Swap placeholder images for real brand photography
5. When ready to build out full site: add Collections, About, Journal, Community pages
   (Stitch HTML for all of these is in `../stitch-source/`)
