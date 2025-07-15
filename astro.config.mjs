// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { AstroDevToolbar } from "astro/runtime/client/dev-toolbar/toolbar.js";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  devToolbar: {
    enabled: false,
  },
});
