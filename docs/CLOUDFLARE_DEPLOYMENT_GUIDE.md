# Cloudflare Workers Deployment Guide

## Release architecture

GitHub validates the repository. Cloudflare Workers Builds deploys the approved `main` branch. There is no Pages project, framework adapter, database, or browser-side email fallback.

## Before deployment: activate email

The form cannot send until Cloudflare accepts the configured email binding.

1. Add `nasaqfb.com` to the intended Cloudflare account if it is not already there.
2. In **Email**, enable the sending/routing feature required for a Workers `send_email` binding.
3. Verify `growth@nasaqfb.com` as an allowed destination.
4. Confirm `website@nasaqfb.com` is allowed as the sender for the zone.
5. Preserve the existing MX, SPF, DKIM, DMARC, and mailbox-provider records. Do not create a second SPF record.

The source intentionally returns HTTP `503` when the email binding is missing. It never reports a false success.

## Connect GitHub to Cloudflare

1. In Cloudflare, open **Workers & Pages**.
2. Select **Create application**.
3. Select **Import a repository** under Workers.
4. Select the GitHub repository containing this package.
5. Use `main` as the production branch.

Use these settings exactly:

| Setting | Value |
| --- | --- |
| Product | Workers |
| Repository root | Blank/default |
| Build command | `npm ci --no-audit --no-fund && npm run verify` |
| Deploy command | `npx wrangler deploy` |
| Node version | `22.13.0` |
| Production branch | `main` |

The repository root is correct only when `package.json`, `package-lock.json`, and `wrangler.jsonc` are visible at the top level.

## First acceptance test

Cloudflare will create an address similar to:

```text
https://nasaq-coming-soon.<your-subdomain>.workers.dev
```

At that address, verify:

- Arabic opens first and uses RTL.
- English switches to LTR.
- The planning and service-trolley images load.
- The decision ribbon contains no numbers or graph labels.
- Services open and close.
- Mobile has no horizontal scrolling.
- A controlled form test reaches `growth@nasaqfb.com`.
- Worker logs show no email binding or route errors.

Do not test with real customer data. Use a clearly labeled internal test enquiry.

## Attach the domain

Only after the `workers.dev` acceptance test passes:

1. Open the Worker.
2. Open **Settings** → **Domains & Routes**.
3. Select **Add** → **Custom Domain**.
4. Enter `nasaqfb.com`.
5. Add `www.nasaqfb.com` separately and redirect it permanently to `https://nasaqfb.com/`.

Cloudflare should provision the website DNS record and SSL certificate. Do not delete email-related DNS records.

## If deployment fails

| Message or symptom | Likely cause | Fix |
| --- | --- | --- |
| `package.json` not found | Repository has a wrapper folder | Move this package's contents to the repository root |
| Pages output directory requested | Pages was selected | Create/import it as a Worker |
| Email binding rejected | Destination or sender is not approved | Complete the email activation steps first |
| Form returns `503` | `EMAIL` binding is absent | Confirm `send_email` appears in the deployed Worker settings |
| Form returns `502` | Cloudflare rejected the send operation | Inspect Worker logs and verify sender/destination status |
| GitHub validation fails at `npm ci` | Lockfile or Node version mismatch | Restore `package-lock.json` and use Node 22.13.0 |

## Local non-publishing proof

From the repository root:

```bash
node --version
npm --version
npm ci --no-audit --no-fund
npm run verify
```

`npm run verify` creates a local dry bundle only. The first command that publishes is `npx wrangler deploy` without `--dry-run`.
