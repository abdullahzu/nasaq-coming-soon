# GitHub Release Guide

## Repository rules

- Use a private repository named `nasaq-coming-soon` unless NASAQ wants public source.
- The repository root must directly contain `package.json`, `package-lock.json`, `wrangler.jsonc`, `public/`, and `worker/`.
- Never commit `.env`, `.dev.vars`, access tokens, or Cloudflare API tokens.

## Upload using the GitHub website

1. Create the empty repository without a generated README or `.gitignore`.
2. Extract the delivery ZIP on your computer.
3. Open the folder inside the ZIP.
4. Upload **all files and folders inside it** to the repository root.
5. Confirm that `.github/workflows/validate.yml` was included. Hidden folders can be missed by some upload methods; GitHub Codespaces or Git is safer.

## Upload using Git

```bash
git init
git add .
git commit -m "Launch NASAQ coming-soon website"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/nasaq-coming-soon.git
git push -u origin main
```

## Required validation

Open **Actions** → **Validate NASAQ**. The workflow must pass these stages:

- Repository-root check.
- Locked `npm ci` on Node 22.13.0.
- Nine Worker behavior tests.
- Source and asset safety rules.
- Cloudflare Wrangler dry deployment.

Protect `main` and require the `validate` job before merging changes when more than one person will edit the site.

GitHub validates only. Cloudflare Workers Builds should be the only production deployment system so two pipelines cannot race.
