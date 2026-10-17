/** Cloudflare Worker entry point for the NASAQ website. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { authenticatedRemoteFoh, relayFohLogin, fohForwardHeaders, isFohRequest, privateFohResponse, requireFohLogin } from "./foh-auth";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/FOH/access") return request.method === "POST" ? relayFohLogin(request) : requireFohLogin(request);
    const protectedRequest = isFohRequest(request);
    if (protectedRequest && !(await authenticatedRemoteFoh(request))) return requireFohLogin(request);
    const finish = (response: Response) => protectedRequest ? privateFohResponse(response) : response;

    // Serve the investor's assets through this origin so the browser's same
    // investor login covers images, slide previews and downloads.
    if (url.pathname.startsWith("/foh/")) {
      if (request.method !== "GET" && request.method !== "HEAD") return finish(new Response("Method not allowed", {status:405, headers:{Allow:"GET, HEAD"}}));
      const upstream = new URL(url.pathname, "https://nasaq-coming-soon.abdullah-zu.chatgpt.site");
      const headers = fohForwardHeaders(request);
      for (const name of ["Range", "If-Range", "Accept"]) { const value = request.headers.get(name); if (value) headers.set(name, value); }
      try {
        const response = await fetch(upstream, {method:request.method, headers, redirect:"manual", signal:AbortSignal.timeout(30000)});
        // Never redirect authenticated requests to another origin.
        if (response.status >= 300 && response.status < 400) { await response.body?.cancel(); return finish(new Response("Presentation temporarily unavailable", {status:502})); }
        const result = new Response(response.body, response);
        if (url.pathname.endsWith(".webp")) result.headers.set("Content-Type", "image/webp");
        if (url.pathname.endsWith(".pdf")) result.headers.set("Content-Type", "application/pdf");
        if (url.pathname.endsWith(".pptx")) result.headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
        return finish(result);
      } catch { return finish(new Response("Presentation temporarily unavailable. Please retry.", {status:502})); }
    }

    // The application router handles pages; Vite's hashed client bundles are
    // served directly by the asset binding when run_worker_first is enabled.
    if (url.pathname.startsWith("/assets/")) {
      return finish(await env.ASSETS.fetch(request));
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return finish(await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths));
    }

    return finish(await handler.fetch(request, env, ctx));
  },
};

export default worker;
