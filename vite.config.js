import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "NutriLife",
        short_name: "NutriLife",
        description: "Personal AI Diet Planner website",
        theme_color: "#00E5FF",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",

        icons: [
          {
            src: "https://cdn-icons-png.flaticon.com/192/706/706164.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "https://cdn-icons-png.flaticon.com/512/706/706164.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "https://cdn-icons-png.flaticon.com/512/706/706164.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },

      workbox: {
        cleanupOutdatedCaches: true
      },

      devOptions: {
        enabled: true
      }
    })
  ],

  build: {
    outDir: "dist"
  }
});
