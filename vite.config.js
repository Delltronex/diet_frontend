import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "tron.jpg",
        "tron1.avif",
        "Kaushal_R.pdf"
      ],
      manifest: {
        name: "NutriLife",
        short_name: "NutriLife",
        description: "Personal AI Diet planer website",
        theme_color: "#00E5FF",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/e.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/a.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],

  // Required for Vercel
  build: {
    outDir: "dist"
  }
});
