# NASAQ Coming-Soon Homepage QA Report

QA date: 27 August 2026  
Primary market: Saudi Arabia and GCC  
Primary language: Arabic

## Build and packaging

- Production build: Passed.
- Hosted-site package validation: Passed.
- Routes: `/` and `/api/contact`.
- Placeholder scan: Passed. No TODO, FIXME, starter title, or contact placeholder remains in the published interface.
- New hero image: 78 KB WebP at 1536 × 1024 with explicit dimensions.
- Vinext compatibility: 100%, including the contact route handler.
- ESLint, strict TypeScript, Wrangler binding types, and the five-stage Vinext build: Passed.

## Desktop browser verification

Verified at approximately 1363 × 936 pixels.

- Arabic default loaded correctly.
- Document language and direction changed correctly between Arabic RTL and English LTR.
- Arabic hero copy appeared on the right and the visual area on the left.
- No horizontal overflow was detected.
- Header navigation, primary CTA, and section anchors rendered.
- The former decision graph has been removed from the source and replaced with a photorealistic foodservice-planning visual.
- Service accordion opened and exposed the correct content.
- Empty form submission activated required-field validation and focused the first missing required field.
- No application-origin console error was observed during the tested path.

## Responsive review

The page includes dedicated layout rules for:

- Desktop and wide screens.
- Tablet and narrow desktop below 960 pixels.
- Mobile below 680 pixels.

At the mobile breakpoint:

- Navigation is simplified.
- The language control remains available.
- Hero copy appears before the foodservice-planning visual.
- Primary and secondary CTAs become full width.
- The process sequence becomes a two-column list.
- Principle cards become a single column.
- Forms become single-column.
- Footer content stacks vertically.
- Horizontal overflow is prevented by fluid widths and controlled labels.

The internal browser surface did not expose a supported mobile viewport control. Mobile behavior was therefore source-reviewed against the 390-pixel design rules rather than claimed as a separate emulated-browser pass. Complete a final device spot-check on iPhone Safari and Android Chrome before connecting the public custom domain.

## Accessibility review

- One unique H1 and logical H2/H3 hierarchy: Passed.
- Skip link: Present.
- Semantic header, navigation, main, sections, figures, form, and footer: Present.
- Keyboard-compatible service accordion and language switch: Passed by component design and interaction test.
- Visible focus styles: Present.
- Form labels and required fields: Present.
- Project-type error is associated with its control and announced through a live status region.
- Informative image has language-aware alternative text.
- The hero visual has language-aware alternative text and fixed intrinsic dimensions.
- Reduced-motion behavior: Present.
- Essential content is not hidden behind hover.

## SEO and metadata

- Arabic-first title and meta description: Present.
- Canonical URL: `https://nasaqfb.com/`.
- Open Graph and X metadata: Present without an unrequested social image.
- Robots index and follow: Enabled.
- ProfessionalService structured data: Present using verified facts only.
- Favicon: Present.

## Contact and privacy

- Verified email: `growth@nasaqfb.com`.
- Form posts to the same-origin `/api/contact` route and does not open the visitor's email application.
- Server-side required-field validation, fixed recipient configuration, output escaping, same-origin checking, and a honeypot field are present.
- The Cloudflare `EMAIL` binding is restricted to `growth@nasaqfb.com` in the deployment package.
- Live delivery remains pending the one-time Cloudflare Email Service domain onboarding and recipient verification in the owner's account.
- Phone, WhatsApp, social links, physical address, and launch date remain omitted because verified values were not supplied.

## Recommended final owner checks

Before mapping `nasaqfb.com` to the final deployment:

1. Review Arabic wording with the business owner.
2. Onboard `nasaqfb.com` in Cloudflare Email Service and test one real enquiry on iPhone and Android.
3. Test the page on Safari, Chrome, and Edge.
4. Add the approved privacy wording before expanding the form or connecting a CRM.
5. Approve the final logo asset if a formal vector logo differs from the current typographic wordmark.
6. Run PageSpeed Insights after the custom domain is live and review field data when available.
