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

This official-domain page uses images and presentation downloads from the existing public NASAQ Site at `https://nasaq-coming-soon.abdullah-zu.chatgpt.site/foh/`. This avoids duplicating large presentation binaries in this GitHub repository. Assets are public and contain only the investor presentation, not the detailed feasibility workbook or Word report.

The matching public page is `https://nasaq-coming-soon.abdullah-zu.chatgpt.site/FOH`. Keep its page, assets, downloadable deck and financial snapshot consistent when revising the proposal.

## Deployment

The repository's existing deployment workflow is manual. In GitHub Settings > Secrets and variables > Actions, configure `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, then run the existing **Manual NASAQ deployment to Cloudflare** workflow on `main`.

The last inspected official-domain deployment failed at the credential check, before deployment. A GitHub source commit alone does not publish the official domain. Do not paste credentials into the page, repository or conversation.

## Verification

Type checking and production builds cover the route and assets. Financial checks reconcile all 108 monthly scenario rows, annual revenue/direct cost/gross profit/EBIT and reserve headroom. The PowerPoint contains editable tables and a native cash-flow chart. All 15 PDF pages were visually reviewed. Interactive browser QA was unavailable in the authoring environment.
