/** Server-only shared investor access. Never import this module into client code. */
export const FOH_AUTH = Object.freeze({
  username: "investor",
  salt: "bfa632350a0969221e8eccfdb8f6120c",
  hash: "78bc52532443e40acecac2b170b7ce4d77059df9ca9acae120669faa58ff0868",
  iterations: 100000,
});

export function protectedFohPath(path: string): boolean {
  // Match the same route through encoded characters, case variants and RSC URLs.
  for (let i = 0; i < 4; i++) {
    try { const decoded = decodeURIComponent(path); if (decoded === path) break; path = decoded; }
    catch { break; }
  }
  path = path.replace(/\\/g, "/").replace(/\/+/g, "/").toLowerCase();
  return path === "/foh" || path.startsWith("/foh/") ||
    /^\/assets\/(?:foh[-.]|foh-financials[-.])/.test(path);
}

export function isFohRequest(request: Request): boolean {
  const url = new URL(request.url);
  if (protectedFohPath(url.pathname)) return true;
  if (url.pathname === "/_vinext/image" || url.pathname === "/_next/image") {
    try { return protectedFohPath(new URL(url.searchParams.get("url") || "", url).pathname); }
    catch { return false; }
  }
  return false;
}

const encoder = new TextEncoder();
const accepted = new Map<string, number>();
const hex = (buffer: ArrayBuffer) => Array.from(new Uint8Array(buffer), n => n.toString(16).padStart(2, "0")).join("");

export async function authenticatedFoh(request: Request): Promise<boolean> {
  const header = request.headers.get("Authorization") || "";
  if (header.length > 512 || !/^Basic [A-Za-z0-9+/]+=*$/i.test(header)) return false;
  let credentials: string;
  try { credentials = atob(header.slice(6)); } catch { return false; }
  const colon = credentials.indexOf(":");
  if (colon < 0 || credentials.slice(0, colon) !== FOH_AUTH.username) return false;
  const password = credentials.slice(colon + 1);
  if (!password || password.length > 256) return false;
  // Cache only a digest of successful credentials, never the password/header.
  const fingerprint = hex(await crypto.subtle.digest("SHA-256", encoder.encode(header)));
  const now = Date.now();
  if ((accepted.get(fingerprint) || 0) > now) return true;
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const result = hex(await crypto.subtle.deriveBits(
    {name: "PBKDF2", salt: encoder.encode(FOH_AUTH.salt), iterations: FOH_AUTH.iterations, hash: "SHA-256"}, key, 256
  ));
  let different = 0;
  for (let i = 0; i < FOH_AUTH.hash.length; i++) different |= result.charCodeAt(i) ^ FOH_AUTH.hash.charCodeAt(i);
  if (different) return false;
  if (accepted.size >= 32) accepted.clear();
  accepted.set(fingerprint, now + 300000);
  return true;
}

export function privateFohResponse(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "private, no-store, max-age=0");
  headers.set("Pragma", "no-cache");
  headers.set("Expires", "0");
  headers.set("Vary", [...new Set((headers.get("Vary") || "").split(",").map(s => s.trim()).filter(Boolean).concat("Authorization"))].join(", "));
  headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(response.body, {status: response.status, statusText: response.statusText, headers});
}

export function requireFohLogin(request: Request): Response {
  const body = request.method === "HEAD" ? null : `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Investor access | NASAQ</title><style>body{margin:0;background:#132923;color:#f3eee4;font:18px/1.6 system-ui,sans-serif;display:grid;place-items:center;min-height:100vh}main{padding:40px;max-width:540px}small{letter-spacing:.2em;color:#c5a879}h1{font-size:40px;line-height:1.2}a{color:#c5a879}</style><main><small>NASAQ · INVESTOR ACCESS</small><h1>A private partnership conversation.</h1><p>Enter the investor username and password in your browser’s sign-in prompt to view this page.</p><p dir="rtl">أدخل اسم المستخدم وكلمة المرور لعرض مقترح الشراكة.</p><a href="/en">Return to NASAQ</a></main></html>`;
  return privateFohResponse(new Response(body, {status:401, headers:{
    "Content-Type":"text/html; charset=utf-8",
    "WWW-Authenticate": 'Basic realm="NASAQ Investor", charset="UTF-8"',
    "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'"
  }}));
}

