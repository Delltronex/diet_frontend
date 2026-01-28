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
        icons: [
          {
            src: "/b.png",
            type: "image/png"
          },
          {
            src: "/a.png",
            type: "image/png"
          }
        ]
      }
    })
  ],

  build: {
    outDir: "dist"
  }
});
