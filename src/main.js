import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/assets/main.css";

import App from "./App.vue";
import router from "./router";
import i18n from "./utils/i18n";
const { VITE_KAKAO_KEY } = import.meta.env;
const app = createApp(App);
// Service Worker 등록
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker 등록 성공:", registration);
    })
    .catch((error) => {
      console.error("Service Worker 등록 실패:", error);
    });
}

app.use(createPinia());
app.use(router);
app.use(i18n);
window.Kakao.init(VITE_KAKAO_KEY);

app.mount("#app");
