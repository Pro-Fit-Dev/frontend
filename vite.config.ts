import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";
import path from "path";

// manifest.json 파일을 읽어 객체로 변환
const manifest = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./manifest.json"), "utf-8")
);

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest, // JSON 객체 전달
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/49\.247\.169\.44\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache"
            }
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  build: {
    outDir: 'dist',
  },
  define: {
    'process.env': process.env,
  },
});
