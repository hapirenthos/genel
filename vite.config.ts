import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Yeni güncelleme geldiğinde eski cache'i otomatik temizler ve yeniler
      registerType: "autoUpdate",

      // Kayıt kodlarını direkt HTML içerisine gömer (Safari'nin kaçırmasını önler)
      injectRegister: "inline",

      // Çevrimdışı (Offline) çalışma stratejileri
      workbox: {
        // Projedeki tüm js, css, html ve görsel formatlarını hafızaya dondurur
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],

        // İnternet yokken herhangi bir sayfaya gitmeye çalışırsa direkt ana index.html'i yükler
        navigateFallback: "/index.html",

        // URL'deki query parametrelerini (örn: ?source=pwa) yok sayarak cache'den okur
        ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
      },

      // Mobil cihazın ana ekranına eklendiğinde görünecek uygulama ayarları
      manifest: {
        name: "Benim Harika Uygulamam",
        short_name: "Uygulamam",
        description: "React + Tailwind + TS Çevrimdışı Çalışan PWA Projesi",
        theme_color: "#0f172a", // Telefonun üst bar rengi (Tailwind bg-slate-900 uyumlu)
        background_color: "#0f172a", // Uygulama açılırken arkada görünecek renk
        display: "standalone", // Tarayıcı butonlarını gizler, tam uygulama yapar
        orientation: "portrait", // Uygulamayı dikey moda sabitler
        icons: [
          {
            src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4f1.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/512x512/1f4f1.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
