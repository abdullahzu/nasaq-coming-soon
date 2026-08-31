# NASAQ Release QA Report

Test date: 30 August 2026  
Release: 2.0.0  
Target: GitHub validation + Cloudflare Workers deployment

## Release verdict

The redesigned source is ready for repository upload and Cloudflare account activation. A clean extraction installs successfully, all automated tests pass, and Wrangler produces a valid dry deployment with both the static asset and email bindings.

The only uncompleted production gate is a real email delivery from the user's Cloudflare account. That requires the `nasaqfb.com` email destination and sender to be activated in Cloudflare first.

## Automated evidence

| Check | Result |
| --- | --- |
| Clean `npm ci` from copied source | Pass — 37 packages installed |
| Worker behavior suite | Pass — 9 of 9 |
| Source and asset rules | Pass — 17 of 17 |
| Wrangler dry deployment | Pass |
| Static assets discovered by Wrangler | Pass — 8 files |
| Worker upload bundle | Pass — 8.51 KiB / 3.05 KiB gzip |
| `env.ASSETS` binding | Pass |
| `env.EMAIL` binding | Pass — `growth@nasaqfb.com`, sender `website@nasaqfb.com` |
| Root React/Sites lint | Pass — zero errors or warnings |
| Root React/Sites production build | Pass |

The Worker tests cover:

- Static asset serving and security headers.
- Same-origin enforcement.
- Unsupported content type rejection.
- Invalid and incomplete payload rejection.
- 16 KiB body-size enforcement.
- Honeypot behavior with no email send.
- Valid direct email construction to the fixed growth address.
- Email-subject header-injection protection.
- Explicit failure when the email binding is unavailable.

## Browser evidence

| Experience | Result |
| --- | --- |
| Arabic default language and RTL | Pass |
| English switch and LTR | Pass |
| Desktop horizontal overflow | Pass — none |
| 390 × 844 mobile horizontal overflow | Pass — none |
| Mobile hero column | Pass — single column |
| Mobile form rows | Pass — single column |
| Planning hero image | Pass — 1536 × 1024 |
| Villa trolley image | Pass — 1536 × 1024 |
| Service accordion | Pass |
| Empty project-type validation | Pass — visible message and `aria-invalid=true` |
| Keyboard focus visibility | Pass — 3 px focus outline |
| Former graph labels or visible point numbers | Pass — absent |

One English villas-list spacing defect was found during the first visual pass and corrected in both source versions. The corrected layout was rechecked.

## Accessibility and resilience

- Arabic headings use neutral letter spacing.
- Text and controls use accessible darker color values.
- Form labels are at least 13 px.
- Placeholders have increased contrast.
- The hidden bot field is removed from keyboard and accessibility navigation.
- Reduced-motion preferences are respected.
- Native landmarks, headings, lists, image alternatives, and form labels are present.
- No customer data is stored.
- No `mailto:` behavior remains.
- The Worker escapes HTML, limits field lengths, enforces a request-size limit, and fixes recipient/sender addresses server-side.
- Security headers include CSP, nosniff, frame denial, referrer, permissions, and cross-origin policies.

## External release gates

These checks require the owner's accounts and cannot be completed by local source validation alone:

1. GitHub Actions must pass after the source is pushed to the selected repository.
2. Cloudflare must accept the verified `growth@nasaqfb.com` destination and `website@nasaqfb.com` sender.
3. One controlled internal enquiry must arrive in the growth inbox from the temporary `workers.dev` address.
4. Worker logs must show no email rejection.
5. The custom domain should be attached only after those checks pass.

The local Wrangler development server could not bind a network interface inside the packaging workspace (`uv_interface_addresses` system error). This environment-specific preview limitation does not affect the dry deployment result or the production Worker bundle.
