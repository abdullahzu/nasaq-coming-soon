# Easiest Online Editing Method

## Best choice: GitHub Codespaces

GitHub Codespaces is the easiest suitable online app for this package. It looks like Visual Studio Code in the browser, keeps every edit in the same GitHub repository used by Cloudflare, provides a terminal for validation, and avoids downloading development software.

### Open it

1. Open the NASAQ repository in GitHub.
2. Select **Code**.
3. Select **Codespaces**.
4. Select **Create codespace on main**.
5. Wait for the online editor to open.

### Edit common content

| Change | File | What to edit |
| --- | --- | --- |
| Arabic page text | `public/index.html` and Arabic object in `public/app.js` | Keep matching `data-i18n` keys unchanged |
| English page text | `public/app.js` | Edit only the `en` copy object |
| Colors, spacing, type, layout | `public/styles.css` | Start with the color variables at the top |
| Hero visual | `public/nasaq-foodservice-planning-hero.webp` | Replace the file but keep the filename |
| Villa trolley visual | `public/nasaq-villa-service-trolley-layout.webp` | Replace the file but keep the filename |
| Recipient email | `worker/runtime.js` and `wrangler.jsonc` | Change both only if NASAQ changes the official recipient |

### Preview and check

Open the Codespaces terminal and run:

```bash
npm ci --no-audit --no-fund
npm run verify
npm run dev
```

Open the forwarded preview address shown by Codespaces. Test both languages and mobile width before committing.

### Save the update

In the Codespaces terminal:

```bash
git add .
git commit -m "Update NASAQ website"
git push
```

GitHub Actions validates the update. Cloudflare's Git integration deploys `main` after the repository is connected.

## Fast text-only option: github.dev

Press the `.` key while viewing the repository on GitHub. This opens a lightweight online editor. It is good for small wording changes, but it has no full terminal and is less suitable for previewing or validating the Worker.

## Avoid for this project

- Do not use Cloudflare's quick-edit Worker screen for the full site; it separates changes from GitHub and makes image management difficult.
- Do not upload the ZIP as one file to GitHub.
- Do not use a generic no-code editor that rewrites the HTML, because it can damage the bilingual attributes and form endpoint.
