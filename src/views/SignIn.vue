<template>
  <div class="w-full h-[calc(100vh-101px)] flex justify-center items-center border">
    <div
      class="border w-[700px] h-[500px] rounded-xl shadow-xl flex flex-col gap-[50px] justify-center items-center bg-white">
      <span class="text-2xl text-center ">{{
        t("카카오톡으로 편하게 로그인하세요!")
      }}</span>
      <img src="@/assets/images/kakao_login.png" class="cursor-pointer" :alt="t('로그인')" @click="kakaoLogin" />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n(); // 다국어 번역 함수
const { VITE_KAKAO_KEY } = import.meta.env;
const REDIRECT_URI = "http://localhost:5173/kakao"; // 백엔드에서 처리할 리디렉션 URI

const kakaoLogin = () => {
  // 카카오 인증 URL 생성
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${VITE_KAKAO_KEY}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}`;

  // 카카오 인증 페이지로 리다이렉트
  window.location.href = kakaoAuthUrl;
};
</script>
