import assert from "node:assert/strict";
import test from "node:test";

import { createWorker } from "../worker/runtime.js";

class MockEmailMessage {
  constructor(from, to, raw) {
    this.from = from;
    this.to = to;
    this.raw = raw;
  }
}

const worker = createWorker(MockEmailMessage);

const url = "https://nasaq-coming-soon.example.workers.dev/api/contact";
const validPayload = {
  name: "Abdullah",
  company: "NASAQ Client",
  projectType: "New restaurant or café concept",
  location: "Riyadh, Saudi Arabia",
  contact: "client@example.com",
  note: "Early planning enquiry",
  language: "en",
  website: "",
};

function contactRequest(payload = validPayload, headers = {}) {
  return new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://nasaq-coming-soon.example.workers.dev",
      ...headers,
    },
    body: JSON.stringify(payload),
  });
}

function mockEnvironment() {
  const messages = [];
  return {
    messages,
    env: {
      ASSETS: { fetch: async () => new Response("asset", { headers: { "Content-Type": "text/plain" } }) },
      EMAIL: { send: async (message) => { messages.push(message); return { messageId: "test-message" }; } },
    },
  };
}

test("serves static assets with security headers", async () => {
  const { env } = mockEnvironment();
  const response = await worker.fetch(new Request("https://nasaq-coming-soon.example.workers.dev/styles.css"), env);
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "asset");
  assert.equal(response.headers.get("X-Content-Type-Options"), "nosniff");
  assert.match(response.headers.get("Content-Security-Policy"), /frame-ancestors 'none'/);
});

test("rejects requests without a same-origin browser origin", async () => {
  const { env } = mockEnvironment();
  const request = new Request(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(validPayload) });
  const response = await worker.fetch(request, env);
  assert.equal(response.status, 403);
});

test("rejects unsupported media types", async () => {
  const { env } = mockEnvironment();
  const request = new Request(url, { method: "POST", headers: { Origin: new URL(url).origin, "Content-Type": "text/plain" }, body: "hello" });
  const response = await worker.fetch(request, env);
  assert.equal(response.status, 415);
});

test("rejects malformed or incomplete payloads", async () => {
  const { env } = mockEnvironment();
  const malformed = new Request(url, { method: "POST", headers: { Origin: new URL(url).origin, "Content-Type": "application/json" }, body: "{" });
  assert.equal((await worker.fetch(malformed, env)).status, 400);
  assert.equal((await worker.fetch(contactRequest({ ...validPayload, name: "" }), env)).status, 400);
});

test("rejects oversized payloads", async () => {
  const { env } = mockEnvironment();
  const response = await worker.fetch(contactRequest({ ...validPayload, note: "x".repeat(17_000) }), env);
  assert.equal(response.status, 413);
});

test("silently accepts honeypot submissions without sending email", async () => {
  const { env, messages } = mockEnvironment();
  const response = await worker.fetch(contactRequest({ ...validPayload, website: "spam.example" }), env);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(messages.length, 0);
});

test("sends a valid enquiry to the fixed growth address", async () => {
  const { env, messages } = mockEnvironment();
  const response = await worker.fetch(contactRequest(), env);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(messages.length, 1);
  assert.equal(messages[0].to, "growth@nasaqfb.com");
  assert.equal(messages[0].from, "website@nasaqfb.com");
  assert.match(messages[0].raw, /From: NASAQ Website <website@nasaqfb\.com>/);
  assert.match(messages[0].raw, /Reply-To: client@example\.com/);
  assert.match(messages[0].raw, /Content-Type: multipart\/alternative/);
});

test("removes line breaks from the email subject", async () => {
  const { env, messages } = mockEnvironment();
  await worker.fetch(contactRequest({ ...validPayload, company: "Safe\r\nBcc: attacker@example.com" }), env);
  assert.equal(messages.length, 1);
  const subjectHeader = messages[0].raw.match(/Subject: =\?UTF-8\?B\?([^?]+)\?=/);
  assert.ok(subjectHeader);
  const decodedSubject = Buffer.from(subjectHeader[1], "base64").toString("utf8");
  assert.equal(decodedSubject.includes("\n"), false);
  assert.equal(decodedSubject.includes("\r"), false);
});

test("reports an unavailable email binding instead of faking success", async () => {
  const response = await worker.fetch(contactRequest(), { ASSETS: { fetch: async () => new Response() } });
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { success: false, error: "email_not_configured" });
});
