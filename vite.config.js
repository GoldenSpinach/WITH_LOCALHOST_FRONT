// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import basicSsl from "@vitejs/plugin-basic-ssl";
import fs from "fs";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // '0.0.0.0'을 사용하여 네트워크에서 접근 가능하도록 설정
    port: 5173, // 기본 포트, 필요하면 변경 가능
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "./localhost+2-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "./localhost+2.pem")),
    },
  },
});
