<template>
  <div>
    <button @click="kakaoLogin">카카오 로그인</button>
  </div>
</template>

<script setup>
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
