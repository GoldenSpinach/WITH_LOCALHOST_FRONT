<template>
  <div>
    <p>카카오 로그인 처리 중...</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import axios from "axios";
const { VITE_API_BASE } = import.meta.env;
// 카카오 로그인 처리 함수
const sendCodeToServer = () => {
  // URL에서 `code` 추출
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (code) {
    // 서버로 인증 코드 전송
    axios
      .post(VITE_API_BASE + "/user/kakao", { code })
      .then((response) => {
        console.log("서버 응답:", response.data);
        // 서버 응답 처리 (예: 토큰 저장, 페이지 이동 등)
      })
      .catch((error) => {
        console.error("인증 코드 전송 실패:", error);
      });
  } else {
    console.error("인증 코드가 URL에 포함되어 있지 않습니다.");
  }
};

// 컴포넌트가 마운트될 때 실행
onMounted(() => {
  sendCodeToServer();
});
</script>
