// src/plugins/i18n.js
import { createI18n } from "vue-i18n";

// 다국어 JSON 파일 불러오기
import ko from "@/assets/language/ko.json";
import ja from "@/assets/language/ja.json";
import zhCN from "@/assets/language/zh-CN.json";
import en from "@/assets/language/en.json";

const supportedLanguages = ["ko", "en", "ja", "zh"];
const defaultLanguage = "en"; // 기본 언어

// 브라우저 언어 감지 함수
const getBrowserLanguage = () => {
  const browserLang = navigator.language.split("-")[0]; // 지역 코드 제거
  console.log(browserLang);
  return supportedLanguages.includes(browserLang)
    ? browserLang
    : defaultLanguage;
};
const messages = {
  ko,
  ja,
  zh: zhCN,
  en,
};

// i18n 인스턴스 생성
const i18n = createI18n({
  legacy: false, // Composition API 모드 활성화
  globalInjection: true, // $t를 전역적으로 사용 가능
  locale: getBrowserLanguage(), // 기본 언어 설정 (한국어)
  fallbackLocale: "en", // 기본 언어가 없을 때 사용할 언어 (영어)
  messages,
});

export default i18n;
