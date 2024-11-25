<template>
  <div class="w-full h-[calc(100vh-101px)] flex items-center">
    <div class="w-full max-w-lg mx-auto p-6 border rounded-md shadow-md bg-white">
      <h2 class="text-2xl font-bold mb-6">{{ t("회원가입") }}</h2>
      <form @submit.prevent="handleSubmit">
        <!-- 이메일 입력 -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium mb-1">
            {{ t("이메일") }}
          </label>
          <input type="email" id="email" v-model="form.email" class="w-full p-2 border rounded" required disabled />
        </div>

        <!-- 전화번호 입력 -->
        <div class="mb-4">
          <label for="phoneNumber" class="block text-sm font-medium mb-1">
            {{ t("전화번호") }}
          </label>
          <input type="tel" id="phoneNumber" v-model="form.phoneNumber"
            :placeholder="t('전화번호를 입력하세요 (예: 010-1234-5678)')" class="w-full p-2 border rounded" required />
        </div>

        <!-- 성별 선택 -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">{{ t("성별") }}</label>
          <div class="flex gap-4">
            <label class="flex items-center">
              <input type="radio" value="M" v-model="form.gender" class="mr-2" />
              {{ t("남성") }}
            </label>
            <label class="flex items-center">
              <input type="radio" value="F" v-model="form.gender" class="mr-2" />
              {{ t("여성") }}
            </label>
          </div>
        </div>

        <!-- 생년월일 입력 -->
        <div class="mb-4">
          <label for="birthDate" class="block text-sm font-medium mb-1">
            {{ t("생년월일") }}
          </label>
          <input type="date" id="birthDate" v-model="form.birthDate" class="w-full p-2 border rounded" required />
        </div>

        <!-- 제출 버튼 -->
        <div class="mt-6">
          <button type="submit" class="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600">
            {{ t("회원가입") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { join } from "../api/member";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n(); // 다국어 번역 함수
const router = useRouter();
const route = useRoute();
const form = ref({
  email: "",
  phoneNumber: "",
  gender: "",
  birthDate: "",
});

onMounted(() => {
  form.value.email = route.query.email;
})

const handleSubmit = async () => {
  // 폼 제출 처리 로직
  if (validateForm()) {
    await join({
      phoneNumber: form.value.phoneNumber,
      gender: form.value.gender,
      birth: form.value.birthDate
    })
    alert(t("회원가입이 완료되었습니다!"));
    router.push("/")
  } else {
    alert(t("모든 필드를 올바르게 입력해주세요."));
  }
};

// 이메일 유효성 검사 함수
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 정규표현식
  // return emailRegex.test(email);
  return true;
};

// 간단한 유효성 검사 함수
const validateForm = () => {
  // 이메일 유효성 검사 추가
  if (!isValidEmail(form.value.email)) {
    alert(t("올바른 이메일 형식을 입력해주세요."));
    return false;
  }
  return (
    // form.value.email &&
    form.value.phoneNumber &&
    form.value.gender &&
    form.value.birthDate
  );
};
</script>

<style scoped>
/* 기본 스타일링 */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"] {
  border: 1px solid #ccc;
}

button {
  transition: background-color 0.3s ease;
}
</style>
