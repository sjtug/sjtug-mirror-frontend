import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import solid from "@astrojs/solid-js";

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const bundleNodeModules = process.env.ASTRO_BUNDLE_NODE_MODULES === "1";

export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [solid()],
  vite: {
    server: { host: true, port: port },
    ssr: bundleNodeModules
      ? {
        // Used in Nix/container builds to generate a self-contained dist without node_modules.
        noExternal: true,
      }
      : undefined,
  },
});
