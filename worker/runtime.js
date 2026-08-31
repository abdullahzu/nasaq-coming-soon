const CONTACT_PATH = "/api/contact";
const CONTACT_EMAIL = "growth@nasaqfb.com";
const SENDER_EMAIL = "website@nasaqfb.com";
const MAX_BODY_BYTES = 16_384;

const limits = {
  name: 120,
  company: 160,
  projectType: 180,
  location: 160,
  contact: 200,
  note: 2400,
};

const securityHeaders = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);
}

function base64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/.{1,76}/g, "$&\r\n").trimEnd();
}

function buildRawMessage({ subject, text, html, replyTo }) {
  const boundary = `nasaq-${crypto.randomUUID()}`;
  const headers = [
    "MIME-Version: 1.0",
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@nasaqfb.com>`,
    `From: NASAQ Website <${SENDER_EMAIL}>`,
    `To: ${CONTACT_EMAIL}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    `Subject: =?UTF-8?B?${base64(subject).replace(/\r?\n/g, "")}?=`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    base64(text),
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    base64(html),
    `--${boundary}--`,
    "",
  ];
  return headers.join("\r\n");
}

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(securityHeaders)) headers.set(name, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function json(body, status = 200) {
  return withSecurityHeaders(Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
    },
  }));
}

function originIsAllowed(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

async function sendContact(request, env, EmailMessageClass) {
  if (request.method !== "POST") return json({ success: false, error: "method_not_allowed" }, 405);
  if (!originIsAllowed(request)) return json({ success: false, error: "forbidden" }, 403);

  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ success: false, error: "unsupported_media_type" }, 415);
  }

  const declaredLength = Number(request.headers.get("Content-Length") || 0);
  if (declaredLength > MAX_BODY_BYTES) return json({ success: false, error: "payload_too_large" }, 413);

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return json({ success: false, error: "payload_too_large" }, 413);
  }

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ success: false, error: "invalid_json" }, 400);
  }

  if (clean(payload.website, 200)) return json({ success: true });

  const language = payload.language === "ar" ? "ar" : "en";
  const fields = {
    name: clean(payload.name, limits.name),
    company: clean(payload.company, limits.company),
    projectType: clean(payload.projectType, limits.projectType),
    location: clean(payload.location, limits.location),
    contact: clean(payload.contact, limits.contact),
    note: clean(payload.note, limits.note),
  };

  if (!fields.name || !fields.company || !fields.projectType || !fields.location || !fields.contact) {
    return json({ success: false, error: "missing_fields" }, 400);
  }

  if (!env.EMAIL || typeof env.EMAIL.send !== "function") {
    console.error("NASAQ contact email binding is not configured");
    return json({ success: false, error: "email_not_configured" }, 503);
  }

  const safeCompany = fields.company.replace(/[\r\n]+/g, " ");
  const subject = language === "ar"
    ? `طلب مناقشة مشروع نَسَق — ${safeCompany}`
    : `NASAQ project discussion — ${safeCompany}`;
  const labels = language === "ar"
    ? ["الاسم", "الشركة أو المشروع", "نوع المشروع", "المدينة والدولة", "بيانات التواصل", "نبذة المشروع"]
    : ["Name", "Company or project", "Project type", "City and country", "Contact details", "Project note"];
  const values = [fields.name, fields.company, fields.projectType, fields.location, fields.contact, fields.note || "—"];
  const text = labels.map((label, index) => `${label}: ${values[index]}`).join("\n");
  const textAlign = language === "ar" ? "right" : "left";
  const rows = labels.map((label, index) => `<tr><th style="padding:12px;border-bottom:1px solid #ded8cc;text-align:${textAlign};vertical-align:top;color:#14554b;width:34%">${escapeHtml(label)}</th><td style="padding:12px;border-bottom:1px solid #ded8cc;white-space:pre-wrap;color:#1d2926">${escapeHtml(values[index])}</td></tr>`).join("");
  const replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.contact) ? fields.contact : undefined;
  const html = `<div dir="${language === "ar" ? "rtl" : "ltr"}" style="font-family:Arial,sans-serif;background:#f3efe6;padding:24px"><table style="width:100%;max-width:680px;margin:auto;border-collapse:collapse;background:#fbf9f3;border:1px solid #ded8cc">${rows}</table></div>`;

  try {
    const raw = buildRawMessage({ subject, text, html, replyTo });
    const message = new EmailMessageClass(SENDER_EMAIL, CONTACT_EMAIL, raw);
    await env.EMAIL.send(message);
    return json({ success: true });
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "unknown";
    console.error(`NASAQ contact email failed: ${code}`);
    return json({ success: false, error: "email_failed" }, 502);
  }
}

async function fetchHandler(request, env, EmailMessageClass) {
  const url = new URL(request.url);
  if (url.pathname === CONTACT_PATH) return sendContact(request, env, EmailMessageClass);

  const assetResponse = await env.ASSETS.fetch(request);
  const response = withSecurityHeaders(assetResponse);
  const headers = new Headers(response.headers);
  if (url.pathname === "/" || headers.get("Content-Type")?.includes("text/html")) {
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  } else if (response.ok) {
    headers.set("Cache-Control", "public, max-age=86400");
  }
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function createWorker(EmailMessageClass) {
  return {
    fetch(request, env) {
      return fetchHandler(request, env, EmailMessageClass);
    },
  };
}

export { buildRawMessage, createWorker, fetchHandler, sendContact };
