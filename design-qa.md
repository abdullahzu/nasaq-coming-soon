# NASAQ subpage design QA

Date: 2026-11-04

final result: passed

Implementation reviewed: `64ba81611cd8244cf0ddf74584928b74cf0bddf2`.
Review branch: `design/subpages-editorial-2026-11-04`.
Production publishing is a separate step requiring the owner's final approval for this subpage release.

## Findings and comparison history

No actionable P0, P1 or P2 findings remain.

The initial comparison was blocked by two P2 issues:

1. **Input sidebar density.** The implementation added a kicker and another enquiry CTA inside the sidebar. These extended the panel and competed with the hero CTA. Removed both additions in `components/nasaq/detail-explorer.tsx`. The final sidebar contains only its heading, introductory sentence and inputs.
2. **Content hierarchy and vertical rhythm.** The output headings and sidebar heading were too small, and the gap below the hero weakened the connection to the tabs. Increased the panel heading to `clamp(32px, 3.4vw, 40px)`, output text to 20px, sidebar heading to 30px, and tightened the hero spacing in `app/subpages.css`. Mobile sizes remain separately defined.

Initial evidence: [source and first implementation](docs/design/subpages/comparison-initial.webp).
Post-fix evidence: [source and revised implementation](docs/design/subpages/comparison-revised.webp), [focused hero](docs/design/subpages/focused-comparison-hero.webp), [aligned output regions](docs/design/subpages/comparison-outputs-aligned.webp).

Both source and rendered implementation were opened together in each comparison image. The revised captures were compared after the fixes. The remaining differences below are intentional content/brand constraints or P3 polish, not unresolved layout defects.

## Source, rendering and normalization

- Selected visual truth: **option 1, Equipment Planning Service Detail**, [selected-option-1.webp](docs/design/subpages/selected-option-1.webp), 1024 × 1536 pixels. Original image: `generated_images/exec-0ae5c62e-3144-4d40-8f9c-a8bf4f842658.png` in the task workspace.
- Implementation: `/ar/services/equipment-planning`, rendered through the managed local preview and inspected in the cloud browser. State: Arabic RTL, light theme, outputs tab selected, FAQ closed.
- Full-view capture: actual 1024 × 1536 CSS-pixel page viewport in a temporary local review frame, displayed at 0.5 scale to fit the browser. Cropped implementation: 512 × 768 physical pixels. Reference downsampled to the same 512 × 768 pixels. Side-by-side comparison: 1024 × 768 pixels. Browser screenshot density was 1 physical pixel per displayed CSS pixel.
- Focused hero: actual 1024 × 800 viewport at 100% scale, compared with the source's 1024 × 800 top crop. Combined image: 2048 × 800 pixels. Full approved intro wording is longer than the mockup wording, so line breaks and vertical endpoints intentionally differ.
- Focused outputs: equal 945 × 496-pixel content crops, aligned to the top of the input/output region, combined into 1890 × 496 pixels. The source contains extra generated explanatory sentences. These were not copied into production content. The comparison assesses type, icons, columns and spacing rather than pixel-identical copy.
- Additional cloud captures: Arabic and English mobile at 390 × 800 CSS pixels, plus the concept page at 768 × 800 CSS pixels, all 1×. Screenshots exclude the review harness controls.
- CI desktop captures: 1280-pixel-wide full pages. Mobile WebKit screenshots are 390-pixel-wide full pages. These support responsive review; they are not treated as same-viewport fidelity comparisons with the mockup.
- The temporary review harness is not part of the committed application or deployment artifact.

## Required fidelity surfaces

| Surface | Result and evidence |
| --- | --- |
| Fonts and typography | Passed. Retained the approved self-hosted Noto Sans Arabic and Noto Sans, normal/bold weights and sans-serif fallback. Teal display headings, readable body copy and restrained small UI text reproduce the hierarchy. Focused captures show intact Arabic shaping, wrapping and legible controls. Generated raster glyphs are not a reliable font specification and were not copied as text images. No clipped headings observed at 320, 390, 768 or desktop widths. |
| Spacing and layout | Passed after the two P2 fixes. Wide split hero, edge-aligned photograph, horizontal tabs, output list with sage input sidebar, sky scope band and related links follow option 1. Mobile stacks these regions and provides a scrollable tab row without page-wide overflow. Rounded corners, fine separators and existing header elevation remain consistent with the approved homepage. Longer approved copy determines actual section height. |
| Colors and tokens | Passed. Existing teal, ivory, slate, sage and sky tokens carry the visual identity. Teal text and selected-tab underline remain distinct; focus states have visible outlines. No gradient or hand-drawn decorative replacement was added. The flat ivory canvas is intentionally quieter than the generated image's sunlight texture. |
| Image quality and assets | Passed. The existing unique equipment-planning photograph shows the full preparation island, with responsive WebP sources and a useful desktop/mobile crop. Brand logo is the supplied asset. Other services/concepts retain their separate existing photographs. New UI icons come from the existing Lucide library. No screenshot-as-UI, placeholder imagery or custom-drawn replacement of the source photo/logo was introduced. |
| Copy and content | Passed. Existing bilingual catalogue content is retained. The approved slogan remains unchanged. The implementation does not adopt generated mockup promises or pseudo-copy. No visible “صورة تعبيرية” labels, examples or tables were introduced. Packages have one shared scope CTA. The enquiry form remains at the bottom of the homepage. |

## Interaction, accessibility and responsive review

- Service tabs switch panels; keyboard arrows respect Arabic/English direction, with Home/End support and roving focus.
- FAQ questions expand and collapse. Mobile navigation opens and closes with Escape.
- Service hero CTA opens the homepage enquiry form with `service=S05` selected. Private concept CTA preserves the private-project selection. No real enquiry email was sent during QA.
- Hero section links scroll to the correct detail region. Language navigation preserves the appropriate route.
- The tablet concept page was inspected in the cloud browser. “اكتشف نطاق التخطيط” opens the content region, and “تسلسل التشغيل” replaces it with the ordered operating relationships.
- Automated accessibility checks, keyboard interactions, image loading, page overflow, 320px width and enlarged-text coverage passed in the new browser suite.
- Browser application errors were checked. No application runtime errors were found. Cloud-browser extension metadata messages were excluded from app findings; CI `pageerror` checks remained empty.

## Validation evidence

- Source integrity, TypeScript and production build passed.
- 42 Node tests passed, 0 failures.
- [Validate workflow](https://github.com/abdullahzu/nasaq-coming-soon/actions/runs/41770117916): completed successfully for the exact implementation commit.
- [Browser workflow](https://github.com/abdullahzu/nasaq-coming-soon/actions/runs/41770117989): 128 passed, 0 failed, 0 skipped, 0 flaky, across Chromium, Firefox, WebKit, Chrome, Edge, mobile Chrome, mobile WebKit and tablet WebKit profiles.
- Machine-readable results: [browser-results-summary.json](docs/design/subpages/browser-results-summary.json).
- Review captures: [desktop Arabic service](docs/design/subpages/ci-chromium-service-ar.webp), [desktop English service](docs/design/subpages/ci-chromium-service-en.webp), [mobile Arabic](docs/design/subpages/cloud-mobile-ar.webp), [mobile English](docs/design/subpages/cloud-mobile-en.webp), [mobile detail](docs/design/subpages/cloud-mobile-detail-ar.webp), [tablet concept](docs/design/subpages/cloud-concept-tablet.webp), [deliverables](docs/design/subpages/ci-chromium-deliverables-ar.webp), [packages](docs/design/subpages/ci-chromium-engagements-ar.webp).

This is tested browser/profile coverage, not a guarantee for every browser version or physical device. Live mail delivery was not retested because this change does not modify the delivery backend.

## Follow-up polish

- P3, optional: the reference's subtle daylight background treatment could be explored later. The current flat ivory background preserves the existing brand and keeps copy clearer. No additional art is required for acceptance.
- The production photograph and approved bilingual wording take precedence over the mockup's generated image treatment and illustrative copy.

## Implementation checklist

- [x] Selected option resolved and compared directly with browser-rendered implementation.
- [x] Initial P2 findings corrected and recaptured.
- [x] Five required fidelity surfaces reviewed at full and focused sizes.
- [x] Services, concepts and supporting pages retain the approved identity.
- [x] Main conversion path, keyboard states, Arabic RTL and English LTR verified.
- [x] Production build, 42 Node tests and 128 browser tests passed.
- [x] QA report and review evidence prepared for the existing GitHub review branch.
- [ ] Owner's final approval and production publishing, outside this review handoff.
