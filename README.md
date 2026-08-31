# NASAQ Coming-Soon Website

This is the clean, Cloudflare-native NASAQ deployment package. It contains one bilingual static website and one Cloudflare Worker endpoint for direct project enquiries.

## What changed

- Rebuilt as plain HTML, CSS, and JavaScript so it is easy to edit online.
- Removed the previous graph, point numbering, and technical tags.
- Replaced the graph with one focused consultancy visual combining stainless-steel fabrication and an engineering layout.
- Added the dedicated villas and palaces service-trolley visual.
- Arabic is the default; English is a complete LTR alternative.
- The enquiry form posts to `/api/contact` and never opens the visitor's email application.
- The Worker sends a MIME email to `growth@nasaqfb.com` through Cloudflare's supported `EmailMessage` runtime.
- GitHub Actions performs a clean install, automated tests, source checks, and a Cloudflare dry deployment.

## Project map

| File or folder | Purpose |
| --- | --- |
| `public/index.html` | Page sections and Arabic default content |
| `public/styles.css` | Complete responsive design |
| `public/app.js` | Arabic/English copy, language switch, and form behavior |
| `public/*.webp` | Approved planning and villa visuals |
| `worker/index.js` | Cloudflare EmailMessage runtime adapter |
| `worker/runtime.js` | Form validation, MIME email, security, and asset serving |
| `wrangler.jsonc` | Worker, static assets, and email binding configuration |
| `.github/workflows/validate.yml` | Automatic GitHub validation on every push and pull request |
| `.github/workflows/deploy.yml` | Optional manual deployment from GitHub Actions |
| `tests/worker.test.mjs` | Functional Worker tests |
| `scripts/check-source.mjs` | Content and packaging safety checks |

## Validate locally

Use Node 22 or later, then run:

```bash
npm ci --no-audit --no-fund
npm run verify
```

`npm run verify` does not publish. It runs the test suite, checks the source and assets, and asks Wrangler to build a dry deployment bundle.

For a local preview:

```bash
npm run dev
```

The page will open at the local address shown by Wrangler. Direct email requires the Cloudflare account binding and is expected to be unavailable in an unconfigured local preview.

## Deploy

Follow [docs/CLOUDFLARE_DEPLOYMENT_GUIDE.md](docs/CLOUDFLARE_DEPLOYMENT_GUIDE.md). The email activation gate must be completed before the first form test.

For manual editing, follow [docs/ONLINE_EDITING_GUIDE.md](docs/ONLINE_EDITING_GUIDE.md).

## Important

- Commit the **contents of this folder** at the GitHub repository root. Do not commit a wrapper folder or the ZIP itself.
- Choose **Cloudflare Workers**, not Pages.
- Do not attach `nasaqfb.com` until the temporary `workers.dev` URL and one controlled email submission both pass.
- Preserve the domain's MX, SPF, DKIM, DMARC, and mailbox-provider records.
