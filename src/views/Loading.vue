<template>
  <div>
    <p>카카오 로그인 처리 중...</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const { VITE_API_BASE } = import.meta.env;
const router = useRouter();
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
        localStorage.setItem("accessToken", response.data.access_token)
        if (response.data.isMember) {
          router.push("/");
        } else {
          alert("회원정보가 없어 회원가입 페이지로 이동합니다");
          router.push({
            path: "/join",
            query: {
              email: response.data.user_info.kakao_account.email,
            },
          });
        }
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
