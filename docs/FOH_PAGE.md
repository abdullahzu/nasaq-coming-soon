# NASAQ FOH investor page

Route: `https://nasaqfb.com/FOH` (capital FOH).

The page adds an English/Arabic switch, beverage-station and custom-bar concepts, all 20 configurations, unit economics, three financial scenarios, 12/36-month cash charts, and a 15-slide investor presentation viewer.

## Financial basis

Source: NASAQ FOH Feasibility Model revision 1 and Feasibility Study, 16 October 2026. The page snapshot is in `content/foh-financials.json`.

- Reference 6–7 m counter: SAR 55,000 sales, SAR 20,000 direct cost.
- Equipment: SAR 40,000 sales at 35% gross margin.
- Design: SAR 10,000 sales, SAR 3,500 midpoint direct cost.
- Complete order: SAR 105,000 sales, SAR 55,500 gross profit, 52.9% margin.
- Base volume: 24 / 48 / 72 deliveries. Full equipment/design uptake is an assumption.
- Proposed funding: SAR 350k in M1, SAR 450k in M4, SAR 400k in M7, within the same SAR 1.2m ceiling. The displayed cash balances are recalculated for that proposed timing.
- Sales/profit exclude VAT. Cash includes VAT timing. No debt, zakat, income tax, dividends or exit value are modelled.

The base, downside and expansion cases reconcile to the feasibility model. These are management projections, not audited results or investor returns.

## Presentation assets

The page, financial client bundle, slide images, PDF and PowerPoint downloads require the shared investor HTTP Basic login. The main website remains public. Both published origins enforce the password on the server before serving content. The official domain proxies `/foh/` assets to the existing NASAQ Site with the authenticated request header; redirects are not followed. This keeps one login on the official domain.

Investor responses have `Cache-Control: private, no-store`, `Vary: Authorization`, and `X-Robots-Tag: noindex, nofollow, noarchive`. The route is excluded from the sitemap. The image optimizer checks the source URL before accessing investor images.

`worker/foh-auth.ts` contains only a salted PBKDF2-SHA256 verifier (100,000 iterations), never a plaintext password. A cryptographically generated high-entropy password was delivered privately to the owner. Use HTTPS. To rotate access, generate a new strong password and salt, update the verifier on both deployments, and redeploy both. Do not commit the password or put it in links. The browser retains Basic credentials for its session; close the private browsing session to clear investor access.

This access gate controls current hosted copies. It does not revoke presentations already downloaded, previous browser caches, or material previously published in Git history.

## Deployment

Pushing `main` triggers the connected Cloudflare Workers build and the GitHub **Validate NASAQ website** workflow. The validation workflow checks source/types/build/tests, waits for Cloudflare, then verifies the official domain. Check both results before declaring the official page live.

A separate fallback workflow, **Manual NASAQ deployment to Cloudflare**, requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in GitHub Settings > Secrets and variables > Actions. Its last inspected run failed because both were missing. That manual-workflow failure does not determine the outcome of the connected Cloudflare build.

Do not paste deployment credentials into the page, repository or conversation.

## Verification

Type checking and production builds cover the route and assets. Financial checks reconcile all 108 monthly scenario rows, annual revenue/direct cost/gross profit/EBIT and reserve headroom. The PowerPoint contains editable tables and a native cash-flow chart. All 15 PDF pages were visually reviewed. Interactive browser QA was unavailable in the authoring environment.

## Access verification

`tests/foh-access.test.mjs` checks anonymous and malformed/wrong credentials, encoded and case-variant routes, RSC requests, HEAD requests, downloads, image optimization, and actual financial client chunks. Authorized page checks use `FOH_TEST_PASSWORD` supplied only in the test environment; the actual password is never stored in tests. `scripts/check-live.mjs` verifies that the official published page and downloads challenge unauthenticated visitors. Browser UI QA is unavailable in the managed authoring environment.
