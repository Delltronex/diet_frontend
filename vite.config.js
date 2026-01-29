import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      // 🔥 Service worker behavior
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,

        runtimeCaching: [
          // 🖼 Images cache (auto cleanup)
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache-v1",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
              }
            }
          },

          // 📦 JS & CSS cache
          {
            urlPattern: ({ request }) =>
              request.destination === "script" ||
              request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "assets-cache-v1",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
              }
            }
          },

          // 🔌 API cache (short-lived)
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/api"),
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache-v1",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 5 * 60 // 5 minutes
              }
            }
          }
        ]
      },

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

      // 🧪 Enable SW in dev
      devOptions: {
        enabled: true
      }
    })
  ],

  build: {
    outDir: "dist"
  }
});
