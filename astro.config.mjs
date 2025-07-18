// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  integrations: [react()],

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),

  devToolbar: {
    enabled: false,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});