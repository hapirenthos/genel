import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Yeni kod ittiğinde sayfayı arkada otomatik günceller
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Benim Harika Uygulamam",
        short_name: "Uygulamam",
        description: "React + Tailwind + TS Harika PWA Projesi",
        theme_color: "#0f172a", // Tailwind bg-slate-950/90 rengiyle uyumlu
        background_color: "#0f172a",
        display: "standalone", // Tarayıcı barlarını gizler, tam App modu yapar
        orientation: "portrait",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
