# NASAQ website release, 28 September 2026

The website expands to 30 logical pages, each in Arabic and English. The current Site project and domain mapping are retained. The release follows the user's instruction to run the master prompt and update the website online. No domain or sharing change is included.

## Source authority and design rationale

The September 2026 design-system revision and companion company profile govern brand, ten services, five packages and eleven concepts. Previously approved copy governs the slogan and positioning. Original full-counter and villa-trolley imagery is retained. Visible image-label captions have been removed as requested; descriptive alt text is retained. Sample output tables have been removed.

- AYEN: explicit client outputs, engagement choices and common questions. The benchmark review used official content, not a verified homepage visual inspection.
- MCTS: architectural imagery and dedicated technical service explanations.
- GGB: entry routes based on the visitor's decision and context, with clear illustrative labels.

Sources and the complete benchmark-informed brief: `docs/master-prompt.md`. Benchmark URLs: https://ayen.com.sa/ , https://www.mctservices.com/ , https://ggb.consulting/ . No benchmark images, copy, client claims or credentials were reused.

## Implementation

Arabic is the default entry. Explicit Arabic and English routes avoid a catch-all intercepting client assets. Each page has a unique title, description, canonical, language alternates and social metadata. Root redirects to Arabic. Sitemap contains all 60 URLs. Original logo geometry and Noto fonts are used. Home, service, concept and enquiry layouts reflow to narrow screens. The language switch keeps the equivalent page, selected enquiry interest and the homepage contact anchor.

No tracking, fabricated case studies, prices, delivery durations, qualifications, partner logos or client results were introduced. Commercial scope and accuracy limitations remain explicit. The page inventory and full bilingual copy export accompany this release.

## Requested visual and enquiry update

All 29 secondary pages now own a distinct original photograph or expressive image. The visual direction is bright, full-scale architectural and hospitality editorial imagery, with white, stainless steel and deep teal. The rejected miniature-counter-on-desk composition no longer appears in page content. The homepage retains its three separate original images and adds one unique teaser image for the nine other concepts, with compact links to their dedicated pages. The latest, simpler fourth homepage image is documented in `docs/home-concepts-simple-imagery.json`; the earlier food-hall composition is retained in source history. No in-page photograph is reused across different logical pages; Arabic and English versions of the same page intentionally share their photograph. Exact prompts, original hashes, image assignments and responsive WebP derivatives are documented in `docs/page-imagery.json`.

The deliverables page presents nine concise descriptions with no sample documents or HTML tables. Its homepage introduction also uses descriptive content. Service sample tables remain removed. The engagements page presents five packages and one shared “Discuss the appropriate scope” action after them. Pre-existing social-preview metadata is preserved separately from the new page-image assignments.

The complete enquiry form is the final section of both homepages, directly before the footer. Project CTAs link to `/ar#contact` or `/en#contact`; service and concept links carry the selected interest before the fragment. The former contact URL remains a useful information page with a link to the homepage form, preserving existing enquiry parameters. There is one form and one `contact` anchor per homepage. The contact input has a distinct ID. The form retains its existing validation and delivery behavior.

## Contact delivery contract

The existing server-side `EMAIL.send` integration is retained. The recipient is fixed at growth@nasaqfb.com and the configured sender is website@nasaqfb.com. The application validates data and allowed IDs, escapes email HTML, limits request size and applies bounded, best-effort rate and duplicate controls within each Worker isolate. This is not a durable global anti-abuse service. No enquiry database was added. Error logs do not contain enquiry data.

A success response is returned only when the delivery adapter accepts the message. An unavailable adapter or provider failure returns an error. Form entries remain after failure. Live inbox delivery is unverified and depends on a compatible configured EMAIL adapter. Automated transport tests use a mock adapter and send no email. The supervised local preview has no email adapter and correctly displays a failure.

## Verification

The final workflow runs type checking, the production build, 21 tests and the bilingual copy export before packaging and source push. The suite exercises all 60 rendered pages, internal links, direction, unique titles, metadata, root redirect, genuine 404 responses, sitemap, robots and twelve contact cases. Browser QA checked Arabic and English desktop rendering, service FAQ expansion, service-to-enquiry preselection, equivalent-language switching, validation, failure recovery, mobile menu/Escape behavior, and villa enquiry preselection. Narrow 320px and 390px frames show no horizontal overflow. These are responsive-layout checks, not physical-device or measured Core Web Vitals results. Dedicated 200% text-only zoom and live inbox delivery remain unverified. The update also checks 33 distinct rendered image sources and content hashes per language (29 secondary images and four homepage images), availability in the build, matching images between language counterparts, one shared engagement action, absence of image-label captions and deliverables and service sample tables, the homepage form as the last section, unique contact anchors, contextual CTA destinations, Arabic-to-English selection retention and empty-form error focus. Browser extension metadata warnings are external to the page; no site runtime error was observed during these checks.

## Source and rollback

The canonical release is the pushed source for the existing Sites project, archived and deployed through its hosting workflow. The `cloudflare-deploy` directory is the retained earlier standalone release, not this expanded site's deployment package. Do not deploy that legacy directory as the new release. The separately maintained GitHub repository has not been updated in this run. Previous hosted versions remain available for rollback.

Current access is owner-only. This release preserves that setting and does not enable anonymous public access.

## Simpler concepts image, 28 September 2026

The homepage teaser now uses a restrained still life: a healthy bowl, burger and croissant on a clean stainless counter, with a white background and one teal accent. The crowded food-hall scene is replaced. Existing layout, nine concept links, bilingual copy, other page images, social-preview metadata and access are retained. The final update runs type checking, the production build, five rendered-route tests covering all 60 bilingual pages, and the copy export. Earlier checks for unchanged form and UI behavior remain recorded above.
