import vinext from "vinext";
import { defineConfig } from "vite";

export default defineConfig(async ({command}) => {
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  const { cloudflare, getLocalWorkerdCompatibilityDate } = await import("@cloudflare/vite-plugin");
  return {
    server: {allowedHosts: ['terminal.local']},
    plugins: [
      vinext(),
      cloudflare({
        configPath: "./wrangler.jsonc",
        // Local development follows the installed runtime. Production keeps
        // wrangler.jsonc's compatibility date and bindings unchanged.
        ...(command === 'serve' ? {
          config: {
            compatibility_date: getLocalWorkerdCompatibilityDate().date,
            send_email: [],
            assets: {binding: 'ASSETS', run_worker_first: false},
          },
          remoteBindings: false,
        } : {}),
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        inspectorPort: false,
      }),
    ],
  };
});
