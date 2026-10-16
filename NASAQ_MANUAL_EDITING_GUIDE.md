# NASAQ Manual Online Editing Guide

Updated: 27 August 2026

## Recommended setup

Use three tools, each for the job it handles well:

1. **GitHub Codespaces** for editing the website source and viewing a live browser preview.
2. **Canva or Figma** for creating replacement visuals.
3. **Cloudflare Workers** for automatic production deployment after you push an approved change.

Cloudflare is the hosting and deployment layer. It is not the best place to manually edit a React/Vinext website.

GitHub's lightweight `github.dev` editor is acceptable for a very small text change, but it has no full terminal or reliable application preview. Codespaces is the safer default.

Official references:

- GitHub Codespaces quickstart: https://docs.github.com/en/codespaces/quickstart
- Codespaces port forwarding and browser previews: https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace?tool=webui
- Cloudflare Workers Builds: https://developers.cloudflare.com/workers/ci-cd/builds/
- Cloudflare GitHub integration: https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/

## First-time setup

1. Extract the NASAQ Cloudflare deployment ZIP.
2. Create a private GitHub repository named `nasaq-coming-soon`.
3. Upload the extracted project contents to the repository root.
4. In GitHub, select **Code**, then **Codespaces**, then **Create codespace on main**.
5. In the Codespaces terminal, run:

   ```bash
   npm ci
   npm run dev
   ```

6. Open the browser preview offered by Codespaces. If it does not open automatically, select the **Ports** tab and open the forwarded application port.

## Where to make each change

| Change | File or folder |
| --- | --- |
| Arabic and English page text | `app/page.tsx` |
| Page sections and content order | `app/page.tsx` |
| Colors, spacing, typography and responsive layout | `app/globals.css` |
| Domain, recipient email and sender email | `lib/site-config.ts` |
| SEO title, description and social metadata | `app/layout.tsx` |
| Direct enquiry email logic | `app/api/contact/route.ts` |
| Website images | `public/` |
| Cloudflare Worker and email binding | `wrangler.jsonc` |

## Easiest way to replace the hero visual

The hero now uses this file:

`public/nasaq-foodservice-planning-hero.webp`

To replace it without touching code:

1. Create or edit the image in Canva, Figma, or Photopea.
2. Use a landscape 3:2 canvas, ideally 1536 × 1024 pixels.
3. Keep the important equipment near the center so the mobile 4:3 crop remains clear.
4. Export as WebP, preferably below 350 KB.
5. Name it exactly `nasaq-foodservice-planning-hero.webp`.
6. Replace the existing file in `public/`.
7. Refresh the Codespaces preview.

For this design, avoid text, logos, numbered points, arrows, tags, graph nodes, and busy food photography inside the image.

## Edit page text safely

In `app/page.tsx`, the `content` object has two language blocks:

- `ar` for Arabic.
- `en` for English.

Change only the text between quotation marks. Preserve commas, quotation marks, brackets, and property names. Update both languages before publishing.

## Direct enquiry email activation

The form now posts to `app/api/contact/route.ts`. The Worker sends the message directly to `growth@nasaqfb.com` through the Cloudflare Email Service binding named `EMAIL`. It does not open the visitor's email application.

Complete this once in the Cloudflare account that owns `nasaqfb.com`:

1. Open **Compute**, then **Email Service**, then **Email Sending**.
2. Select **Onboard Domain** and choose `nasaqfb.com`.
3. Review the proposed DNS records carefully. Preserve all records used by your existing mailbox provider.
4. Confirm `growth@nasaqfb.com` as an allowed or verified destination when Cloudflare requests it.
5. Deploy the repository. The included `wrangler.jsonc` restricts the Worker email binding to that destination.
6. Submit one test enquiry from the temporary `workers.dev` address and confirm receipt before using the custom domain.

Official references:

- Cloudflare Email Service setup: https://developers.cloudflare.com/email-service/get-started/send-emails/
- Cloudflare Workers email API: https://developers.cloudflare.com/email-service/api/send-emails/workers-api/
- Cloudflare send-binding restrictions: https://developers.cloudflare.com/email-service/configuration/send-bindings/

Cloudflare Email Sending is currently marked beta in Cloudflare's documentation. For a high-volume or mission-critical lead workflow, evaluate a dedicated transactional provider and a CRM integration before launch.

## Validate and publish

Before every production push, run:

```bash
npm run verify
```

Then use the Source Control panel in Codespaces:

1. Review the changed files.
2. Enter a short commit message.
3. Select **Commit**, then **Sync Changes**.
4. Cloudflare Workers Builds will build and deploy the `main` branch automatically when the GitHub integration is connected.

Test the temporary `workers.dev` version first. Check Arabic, English, mobile layout, both visuals, the service accordion, and one real enquiry submission.

## Important controls

- Keep the GitHub repository private.
- Never commit passwords, API tokens, `.env` files, or `.dev.vars`.
- Do not delete MX, SPF, DKIM, DMARC, or mailbox-verification DNS records.
- Create a Git commit before a major edit so you can revert safely.
- Use Cloudflare deployment history as the production rollback path.

## Tools I would not use for this project

- **Cloudflare's dashboard editor**: useful for tiny Worker scripts, not this complete Vinext project.
- **Framer or Webflow**: they would require rebuilding the site rather than directly editing this source.
- **StackBlitz or Replit**: useful for experiments, but less predictable for this Cloudflare Worker configuration and production handoff.

