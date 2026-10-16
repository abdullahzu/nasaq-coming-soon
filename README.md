# NASAQ | نَسَق

The complete Arabic/English NASAQ website, prepared for the existing Cloudflare Worker `nasaq-coming-soon` and its official domain `nasaqfb.com`.

## Website

- 30 logical pages, each in Arabic and English, including 10 services and 11 concepts.
- All approved copy and unique page images from the latest reviewed version.
- Simplified homepage concepts image and one enquiry form at the bottom of each homepage.
- Arabic RTL and English LTR, corresponding language links, sitemap and page metadata.
- Service examples, sample deliverables tables and image-label captions removed.

## Install and verify

Node.js 22.13.0 or later is required. Dependencies are pinned by `package-lock.json`.

```sh
npm ci
npm run verify
```

Verification checks the page inventory, TypeScript, production build, rendered routes and forms, and a Cloudflare deployment dry-run. `npm run dev` starts local development.

## GitHub to Cloudflare

A push to `main` or a manual run of **Deploy NASAQ to Cloudflare** builds, tests and deploys the same verified output. Pull requests run validation only.

Configure these repository secrets under **Settings > Secrets and variables > Actions**:

- `CLOUDFLARE_API_TOKEN`: a Cloudflare API token authorized to edit the existing Worker.
- `CLOUDFLARE_ACCOUNT_ID`: the account containing `nasaq-coming-soon`.

The deployment target is the existing Worker. This repository does not change DNS or detach domains. If `nasaqfb.com` remains attached to that Worker, it receives the new website on a successful deployment. If the domain has been moved since the previous screenshot, review its current routing before claiming it serves this deployment.

The deploy workflow verifies current-release markers on the official domain after publishing. A successful upload alone is not treated as proof that the domain serves the right website.

For a local authenticated deployment:

```sh
npm run deploy
```

For Cloudflare Workers Builds, use `npm run verify` as the build command and `npm run deploy:built` as the deploy command. The repository root is the project root.

The generated Worker config is discovered by its exact Worker name. This avoids hard-coding a build folder that can differ across Cloudflare/Vinext versions.

## Enquiry email

The `EMAIL` binding sends to `growth@nasaqfb.com` from `website@nasaqfb.com`. Configure the authorized sender/domain and destination in the same Cloudflare account. User input cannot change the recipient.

The form reports success only after the email binding accepts the message. Delivery failures preserve form entries and show an error. Automated tests use a mock adapter and send no email. Inbox delivery requires a separate authorized live check and is not asserted by the build tests.

## Source and rollback

This release comes from reviewed source commit `191b1adc196d217d882c7a415795f55dd3f934f2` (version 18, 28 September 2026). The standalone Cloudflare configuration and GitHub workflows were prepared on 15 October 2026. Page content and image assignments are preserved.

The previous GitHub production source remains in commit `0da512ccc52ae5b72af5fa398c7c059492ab96e0`. Revert the release commit to restore that source. The obsolete single-page build and duplicate legacy deployment folder are not part of this release.

Full copy and page imagery records are under `docs/`.

Official references:
- https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/
- https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
- https://developers.cloudflare.com/email-service/api/send-emails/workers-api/
