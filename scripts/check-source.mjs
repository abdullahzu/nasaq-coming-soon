import { access, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const publicDir = resolve(root, "public");
const required = [
  "index.html",
  "styles.css",
  "app.js",
  "favicon.svg",
  "nasaq-full-counter-hero-v2.webp",
  "nasaq-villa-service-trolley-layout.webp",
  "robots.txt",
  "sitemap.xml",
];

for (const file of required) await access(resolve(publicDir, file));

const [html, css, client, workerEntry, workerRuntime, wrangler, workflow] = await Promise.all([
  readFile(resolve(publicDir, "index.html"), "utf8"),
  readFile(resolve(publicDir, "styles.css"), "utf8"),
  readFile(resolve(publicDir, "app.js"), "utf8"),
  readFile(resolve(root, "worker/index.js"), "utf8"),
  readFile(resolve(root, "worker/runtime.js"), "utf8"),
  readFile(resolve(root, "wrangler.jsonc"), "utf8"),
  readFile(resolve(root, ".github/workflows/validate.yml"), "utf8"),
]);
const worker = `${workerEntry}\n${workerRuntime}`;

const checks = [
  [html.includes('<html lang="ar" dir="rtl">'), "Arabic must be the default document language and direction"],
  [html.includes('action="/api/contact"'), "Form must submit to the Worker endpoint"],
  [html.includes("nasaq-full-counter-hero-v2.webp"), "Full-counter hero visual must be present"],
  [html.includes("التشغيل قبل المساحة"), "Approved Arabic short slogan must be present"],
  [client.includes('slogan: "Operational Flow Before Space"'), "Approved English short slogan must be present"],
  [client.includes('titleA: "We plan the operational flow,"'), "Approved English descriptor must be present"],
  [html.includes("nasaq-villa-service-trolley-layout.webp"), "Villa service-trolley visual must be present"],
  [!/mailto:/i.test(`${html}\n${client}`), "No mailto fallback may remain"],
  [!/(decision-orbit|operation map|operational map|<svg[^>]*graph)/i.test(html), "The former graph must not remain"],
  [client.includes('fetch("/api/contact"'), "Client must send form data directly"],
  [worker.includes('const CONTACT_EMAIL = "growth@nasaqfb.com"'), "Recipient must be fixed server-side"],
  [worker.includes('const SENDER_EMAIL = "website@nasaqfb.com"'), "Sender must be fixed server-side"],
  [workerEntry.includes('from "cloudflare:email"'), "Worker must use Cloudflare's supported EmailMessage runtime"],
  [worker.includes("MAX_BODY_BYTES"), "Worker must enforce a request-size limit"],
  [worker.includes("Content-Security-Policy"), "Worker must add security headers"],
  [wrangler.includes('"binding": "ASSETS"'), "Static asset binding must be configured"],
  [wrangler.includes('"name": "EMAIL"'), "Email binding must be configured"],
  [workflow.includes("npm ci --no-audit --no-fund"), "GitHub must perform a clean locked install"],
  [workflow.includes("npm run verify"), "GitHub must run the full validation suite"],
  [css.includes("prefers-reduced-motion"), "Reduced-motion support must be present"],
];

const failures = checks.filter(([passed]) => !passed).map(([, message]) => message);
if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}

for (const image of required.filter((file) => file.endsWith(".webp"))) {
  const details = await stat(resolve(publicDir, image));
  if (details.size < 10_000) throw new Error(`${image} appears incomplete`);
}

console.log(`Source checks passed (${checks.length} rules, ${required.length} required assets).`);
