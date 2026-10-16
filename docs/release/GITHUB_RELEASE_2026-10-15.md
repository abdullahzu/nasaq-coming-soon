# GitHub production release, prepared 15–16 October 2026

## Changes

Replaces the obsolete single-page GitHub source with the latest complete bilingual NASAQ site: 60 page routes and all their imagery. The approved page content is unchanged.

The build runs directly on GitHub/Cloudflare using the pinned Vinext, Vite and Cloudflare plugin versions. Sites-specific build metadata is excluded from this standalone deployment. The target Worker remains `nasaq-coming-soon`, matching the domain binding shown in the user's Cloudflare screenshot.

The deploy workflow now runs on each push to main, verifies the build before publishing, checks required Cloudflare secrets without printing their values, and verifies current-release markers on the official domain after deployment.

The Worker explicitly serves Vite's hashed client bundles through the asset binding. This fixes stylesheet and JavaScript 404s when worker-first routing is enabled. Local verification passed all 22 tests, including requests for the actual homepage styles, scripts and images through the built Worker.

## Verification boundary

Local rendered-route, form and source checks are run before the GitHub branch is updated. The GitHub workflow result is the authority for actual Cloudflare deployment. A missing token/account ID is a deployment blocker, not a source-build failure. The email tests are mocked and do not prove inbox delivery.

## Historical notes

`README.md` in this release directory describes the September Sites release. Its owner-only access and unsynchronized GitHub statements were accurate at that historical checkpoint and are superseded by the current root README and this release note. The managed Site is public; this standalone GitHub deployment uses the user's Cloudflare Worker.
