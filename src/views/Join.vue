<template>
  <div class="w-full max-w-lg mx-auto p-6 border rounded-md shadow-md">
    <h2 class="text-2xl font-bold mb-6">회원가입</h2>
    <form @submit.prevent="handleSubmit">
      <!-- 이메일 입력 -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium mb-1">이메일</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="이메일을 입력하세요"
          class="w-full p-2 border rounded"
          required
        />
      </div>

      <!-- 전화번호 입력 -->
      <div class="mb-4">
        <label for="phoneNumber" class="block text-sm font-medium mb-1"
          >전화번호</label
        >
        <input
          type="tel"
          id="phoneNumber"
          v-model="form.phoneNumber"
          placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
          class="w-full p-2 border rounded"
          required
        />
      </div>

      <!-- 성별 선택 -->
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">성별</label>
        <div class="flex gap-4">
          <label class="flex items-center">
            <input type="radio" value="M" v-model="form.gender" class="mr-2" />
            남성
          </label>
          <label class="flex items-center">
            <input type="radio" value="F" v-model="form.gender" class="mr-2" />
            여성
          </label>
        </div>
      </div>

      <!-- 생년월일 입력 -->
      <div class="mb-4">
        <label for="birthDate" class="block text-sm font-medium mb-1"
          >생년월일</label
        >
        <input
          type="date"
          id="birthDate"
          v-model="form.birthDate"
          class="w-full p-2 border rounded"
          required
        />
      </div>

      <!-- 제출 버튼 -->
      <div class="mt-6">
        <button
          type="submit"
          class="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          회원가입
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  email: "",
  phoneNumber: "",
  gender: "",
  birthDate: "",
});

const handleSubmit = () => {
  // 폼 제출 처리 로직
  if (validateForm()) {
    console.log("회원가입 정보:", form.value);
    alert("회원가입이 완료되었습니다!");
  } else {
    alert("모든 필드를 올바르게 입력해주세요.");
  }
};

// 간단한 유효성 검사 함수
const validateForm = () => {
  return (
    form.value.email &&
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
