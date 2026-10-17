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

The page, financial client bundle, slide images, PDF and PowerPoint downloads require the shared investor sign-in. The main website remains public. Both published origins enforce the password on the server before serving content. The official domain proxies `/foh/` assets to the existing NASAQ Site with the authenticated session cookie; redirects are not followed. This keeps one login on the official domain.

Investor responses have `Cache-Control: private, no-store`, `Vary: Authorization, Cookie`, and `X-Robots-Tag: noindex, nofollow, noarchive`. The route is excluded from the sitemap. The image optimizer checks the source URL before accessing investor images.

The sign-in form prefills the read-only username `Investor`. The password field stays empty and supports the browser password manager. Successful sign-in creates an eight-hour, signed, host-only cookie with `Secure`, `HttpOnly`, and `SameSite=Lax`. No password is stored in that cookie or the page source. The previous browser credential popup has been removed.

The login form uses `Referrer-Policy: same-origin`, so browser form navigation retains its origin. Previously loaded forms or privacy-restricted browsers may submit a hidden origin. Those requests are accepted only when the browser reports `Sec-Fetch-Site: same-origin` and the destination is an approved NASAQ origin. Cross-site, ambiguous and unknown-origin requests remain blocked. The relay forwards the validated origin to the asset host. Protected investor content retains `no-referrer`. Regression coverage includes the formerly failing browser-form headers and their cross-site rejection.

The private asset host owns three runtime secrets: `FOH_PASSWORD_SALT`, `FOH_PASSWORD_HASH` (PBKDF2-SHA256, 100,000 iterations), and `FOH_SESSION_SECRET` (random HMAC key). The official-domain Worker relays form submissions to the fixed asset-host origin and checks sessions through its `/_foh-session` endpoint. It forwards only the investor cookie or explicit Basic credentials to that host. Missing configuration, invalid cookies and network failures deny access.

To rotate the password, update the password salt/hash and session signing key in the asset host's runtime secrets, then deploy its saved version. This revokes existing sessions. Keep passwords and signing keys out of repository files and links.

This access gate controls current hosted copies. It does not revoke presentations already downloaded, previous browser caches, or material previously published in Git history.

## Deployment

Pushing `main` triggers the connected Cloudflare Workers build and the GitHub **Validate NASAQ website** workflow. The validation workflow checks source/types/build/tests, waits for Cloudflare, then verifies the official domain. Check both results before declaring the official page live.

A separate fallback workflow, **Manual NASAQ deployment to Cloudflare**, requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in GitHub Settings > Secrets and variables > Actions. Its last inspected run failed because both were missing. That manual-workflow failure does not determine the outcome of the connected Cloudflare build.

Do not paste deployment credentials into the page, repository or conversation.

## Verification

Type checking and production builds cover the route and assets. Financial checks reconcile all 108 monthly scenario rows, annual revenue/direct cost/gross profit/EBIT and reserve headroom. The PowerPoint contains editable tables and a native cash-flow chart. All 15 PDF pages were visually reviewed. Interactive browser QA was unavailable in the authoring environment.

## Access verification

`tests/foh-access.test.mjs` checks anonymous and malformed/wrong credentials, encoded and case-variant routes, RSC requests, HEAD requests, downloads, image optimization, and actual financial client chunks. Authorized page and cookie checks use isolated test credentials, never production secrets. `tests/foh-login.test.mjs` verifies the prefilled username, successful login, incorrect credentials, CSRF rejection, cookie attributes, and tampered/expired/revoked sessions. `scripts/check-live.mjs` verifies that the official published page and downloads challenge unauthenticated visitors. Browser UI QA is unavailable in the managed authoring environment.
