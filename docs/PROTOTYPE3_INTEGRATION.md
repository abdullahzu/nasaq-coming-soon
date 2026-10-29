# Prototype 3 integration, 29 October 2026

This review branch integrates the saved Prototype 3 v0.9 direction into the
existing NASAQ React/Vinext/Cloudflare Worker application. It does not replace
the production application with the prototype's static staging folder.

## Reference and content decisions

- Reference: `NASAQ_Prototype3_v09_Full_Source_QA.zip`, SHA-256
  `1a01bf47537188b3d454edb426ff2512c9d9f0d6ab1b822707bb6713140597d8`.
- Reference board: `NASAQ_Prototype3_v09_Staging_Preview_Board.jpg`.
- The architectural background, ivory/sage/sky surfaces, floating navigation
  and four-window service interaction follow that saved design.
- The original logo, Noto fonts, teal/slate brand anchors and approved
  production catalogue remain authoritative. Original service/concept hero
  photographs stay unique to their logical pages. New window photographs
  are homepage-only. AR/EN counterparts share their page's imagery.
- The earlier full-counter visual remains in the operational-approach section.
- Contact form remains the last homepage section. Deliverables remain prose,
  with no sample tables. The shared package-scope CTA still appears once.
- No production email, authentication, investor route, sitemap, legal copy or
  deployment configuration was replaced by a prototype placeholder.

## Implementation

- `components/nasaq/service-windows.tsx`: four disclosure buttons, selected
  detail panel, keyboard navigation, collapse with focus restoration, contextual
  service enquiry and deep links. Touch never depends on hover. There is no
  autoplay or pointer-following motion.
- `app/creative.css`: isolated marketing styles, fluid layout, mobile two-column
  windows, stacked detail panel, reduced-motion and forced-colors handling.
- `components/nasaq/home.tsx`: architectural introduction and integrated matrix.
- `components/nasaq/header.tsx`: work-packages navigation and correctly scoped
  Escape behavior. The language switch retains supported enquiry parameters.
- AR/EN layouts import the new stylesheet. The investor layout is not changed.
- Local Vite development uses the installed workerd compatibility date and
  static-asset-first routing so dev CSS loads. It has no email binding or remote
  bindings. Production retains `wrangler.jsonc` unchanged, including worker-first
  assets and its existing compatibility date.

## Verification and limitations

- `npm run verify`: source inventory, TypeScript, production build, all 36 Node
  tests, and Cloudflare packaging dry run passed during integration.
- Rendered production tests cover all 60 bilingual public routes, 38 distinct
  initially rendered photographs, metadata, internal links, contact placement,
  and investor access protections.
- `npm run test:browsers`: production-bundle browser suite added for Chromium,
  Firefox, WebKit, Chrome, Edge, Android Chrome emulation, iPhone WebKit emulation
  and iPad WebKit emulation. See the PR's Browser review workflow for actual
  execution results. Adding a project is not evidence that it passed.
- Tests intercept form submissions and the test Worker blocks outbound services.
  No live email is sent. The test runtime uses the same supported compatibility
  date as the existing rendered-HTML suite; this is not a live Cloudflare test.
- Internal preview renders styles and images. Its Vite virtual-module request
  failed to load, so it is not used as proof of hydration or interaction success.
- Emulated WebKit is not a real iPhone/iPad Safari device test. Physical-device
  and assistive-technology review remain separate checks. No claim is made that
  every browser version is supported.
- The imported prototype media are not claimed to be native 2K photographs.
  They are used at their supplied responsive sizes, without further upscaling.

## Review and release

Main has not been changed or merged by this task. The official domain is not a
preview target. Review the draft pull request and browser evidence, then approve
the exact commit before production deployment. The existing main deployment and
rollback procedures remain in place. Do not publish the static prototype package
over the production Worker.

Implementation references:
- https://playwright.dev/docs/test-projects
- https://playwright.dev/docs/ci-intro
- https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/
