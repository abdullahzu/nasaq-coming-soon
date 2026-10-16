# NASAQ Coming-Soon Site Handoff

## Purpose

This is the Arabic-first coming-soon homepage for NASAQ Foodservice Design & Advisory.

Its conversion goal is to help a qualified F&B decision-maker understand NASAQ’s approach and begin a project conversation with the Business Growth & Partnerships team.

## Brand idea

Flow Before Space.

The page relates:

Menu → Operating model → Flow → Space → Equipment → Engineering → Cost → Clear scope

The visual system uses warm paper, graphite, deep mineral green, and a restrained copper accent. A photorealistic foodservice-planning model now replaces the former graph, while a second service-trolley scene grounds the villa and palace offer in a believable use case.

## Page structure

1. Arabic-first hero with immediate project CTA.
2. Foodservice-planning hero visual and casual process strip.
3. “Clarity before commitment” positioning.
4. Four connected service workstreams.
5. Decision-maker audience statement.
6. Service kitchens for villas and palaces.
7. Structured project-enquiry form.
8. Verified contact and brand footer.

## Languages

- Arabic is the default language and uses RTL layout.
- English is available through the header language control and uses LTR layout.
- The switch changes the full visible interface, document language, and document direction.

## Contact behavior

The project form validates the required fields and posts them to a same-origin server route. The Cloudflare Worker formats the enquiry and sends it directly to:

growth@nasaqfb.com

The Worker uses a restricted Cloudflare Email Service binding. The sender domain must be onboarded in the Cloudflare account before the form can send.

To connect a CRM later, extend `app/api/contact/route.ts` with the approved endpoint and add the approved privacy and consent wording before publishing that change.

## Configuration

Verified business values are centralized in:

`lib/site-config.ts`

Update that file when the contact email, canonical domain, country label, or copyright year changes.

Arabic and English interface copy is maintained in the `content` object near the top of:

`app/page.tsx`

## Main files

- `app/page.tsx`: content, language behavior, service accordion, and enquiry workflow.
- `app/globals.css`: visual system, animation, responsive layouts, focus states, and reduced-motion behavior.
- `app/layout.tsx`: metadata, canonical URL, Open Graph data, robots settings, and structured data.
- `lib/site-config.ts`: verified business configuration.
- `app/api/contact/route.ts`: validated server-side enquiry delivery.
- `public/nasaq-foodservice-planning-hero.webp`: optimized foodservice-planning hero visual.
- `public/nasaq-villa-service-trolley-layout.webp`: optimized service-trolley and layout visual for the private-residence section.

## Cloudflare Workers deployment

The clean deployment package is a Vinext application with a verified Cloudflare Workers build and a restricted Email Service binding.

1. Connect the private project repository to Cloudflare Workers Builds.
2. Use the repository’s existing Node version and lockfile.
3. Set the build command to `npm run build`.
4. Set the deploy command to `npx wrangler deploy`.
5. Onboard `nasaqfb.com` in Cloudflare Email Service before testing the direct enquiry form.
6. Connect `nasaqfb.com` only after the `workers.dev` preview is approved.
7. Verify the canonical URL, HTTPS redirect, favicon, Arabic default, English switch, and direct email workflow on the custom domain.

See `NASAQ_MANUAL_EDITING_GUIDE.md` for the online editing workflow and the one-time email activation steps.

Do not publish invented phone numbers, social links, addresses, launch dates, client logos, testimonials, or certifications.

## Standards baseline

- WCAG 2.2 Level AA: https://www.w3.org/WAI/WCAG22/quickref/
- WCAG minimum text contrast: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum
- Core Web Vitals: https://web.dev/articles/vitals
- Google responsive-design guidance: https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing
- Google SEO starter guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide

## Future inputs

The following items remain intentionally omitted until NASAQ supplies verified values:

- WhatsApp number.
- LinkedIn and Instagram URLs.
- CRM or form endpoint.
- Privacy-policy URL and final consent language.
- Confirmed public launch date.
- Approved client logos, case studies, results, or testimonials.
