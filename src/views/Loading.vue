<template>
  <div>
    <p>카카오 로그인 처리 중...</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useMemberStore } from "../stores/member";
import { requestNotificationPermission } from "../api/fcm";
import { toast } from "vue3-toastify";
const { VITE_API_BASE } = import.meta.env;
const router = useRouter();
const memberStore = useMemberStore();
// 카카오 로그인 처리 함수
const sendCodeToServer = async () => {
  // URL에서 `code` 추출
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (code) {
    // 서버로 인증 코드 전송
    axios
      .post(VITE_API_BASE + "/user/kakao", { code })
      .then(async (response) => {
        console.log("서버 응답:", response.data);
        localStorage.setItem("accessToken", response.data.accessToken);
        if (response.data.isMember) {
          const info = {
            email: response.data.email,
            id: response.data.id,
            nickName: response.data.nickName,
            profileImg: response.data.profileImage,
          };
          memberStore.setInfo(info);
          memberStore.setMember(info.id);
          await requestNotificationPermission(info.id);
          router.push("/");
        } else {
          toast("회원정보가 없어 회원가입 페이지로 이동합니다");
          router.push({
            path: "/join",
            query: {
              email: response.data.email,
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
