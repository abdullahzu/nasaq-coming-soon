# GitHub production release, prepared 15–16 October 2026

## Changes

Replaces the obsolete single-page GitHub source with the latest complete bilingual NASAQ site: 60 page routes and all their imagery. The approved page content is unchanged.

The build runs directly on GitHub/Cloudflare using the pinned Vinext, Vite and Cloudflare plugin versions. Sites-specific build metadata is excluded from this standalone deployment. The target Worker remains `nasaq-coming-soon`, matching the domain binding shown in the user's Cloudflare screenshot.

The existing Cloudflare Workers Builds integration automatically builds and deploys main. After detecting and confirming that integration, the GitHub validation workflow was configured to build and test each main push, await the corresponding Cloudflare check, and verify the official domain. The separate deployment workflow is manual-only and requires repository secrets for that optional fallback.

The Worker explicitly serves Vite's hashed client bundles through the asset binding. This fixes stylesheet and JavaScript 404s when worker-first routing is enabled. Local verification passed all 22 tests, including requests for the actual homepage styles, scripts and images through the built Worker.

## Verification boundary

Local rendered-route, form and source checks are run before the GitHub branch is updated. The Cloudflare integration check and the subsequent official-domain smoke test establish deployment and serving status. Missing token/account ID secrets block only the optional manual fallback. The email tests are mocked and do not prove inbox delivery.

## Historical notes

`README.md` in this release directory describes the September Sites release. Its owner-only access and unsynchronized GitHub statements were accurate at that historical checkpoint and are superseded by the current root README and this release note. The managed Site is public; this standalone GitHub deployment uses the user's Cloudflare Worker.
