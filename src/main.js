import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/assets/main.css";

import App from "./App.vue";
import router from "./router";
import i18n from "./utils/i18n";
import Vue3Toastify from "vue3-toastify";
const { VITE_KAKAO_KEY } = import.meta.env;
const app = createApp(App);
// Service Worker 등록

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("@/api/mocks/browser");
  worker.start();
} else if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Firebase Service Worker 등록 성공:", registration);
    })
    .catch((error) => {
      console.error("Firebase Service Worker 등록 실패:", error);
    });
}
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(Vue3Toastify, {
  autoClose: 3000,
});
window.Kakao.init(VITE_KAKAO_KEY);

app.mount("#app");
