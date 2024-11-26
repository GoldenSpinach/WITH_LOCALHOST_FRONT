<template>
  <div class="w-full h-[calc(100vh-101px)] flex items-center bg-gray-100">
    <div
      class="w-full max-w-lg mx-auto p-8 border rounded-xl shadow-2xl bg-white"
    >
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        {{ t("회원가입") }}
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 이메일 입력 -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            {{ t("이메일") }}
          </label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-70"
            required
            disabled
          />
          <span v-if="errors.email" class="text-red-500 text-sm mt-1">
            {{ errors.email }}
          </span>
        </div>

        <!-- 전화번호 입력 -->
        <div>
          <label
            for="phoneNumber"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            {{ t("전화번호") }}
          </label>
          <input
            type="tel"
            id="phoneNumber"
            v-model="form.phoneNumber"
            :placeholder="t('전화번호를 입력하세요 (예: 010-1234-5678)')"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <span v-if="errors.phoneNumber" class="text-red-500 text-sm mt-1">
            {{ errors.phoneNumber }}
          </span>
        </div>

        <!-- 성별 선택 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">{{
            t("성별")
          }}</label>
          <div class="flex gap-6">
            <label class="flex items-center">
              <input
                type="radio"
                value="M"
                v-model="form.gender"
                class="mr-2 focus:ring-2 focus:ring-blue-500"
              />
              {{ t("남성") }}
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                value="F"
                v-model="form.gender"
                class="mr-2 focus:ring-2 focus:ring-blue-500"
              />
              {{ t("여성") }}
            </label>
          </div>
          <span v-if="errors.gender" class="text-red-500 text-sm mt-1">
            {{ errors.gender }}
          </span>
        </div>

        <!-- 생년월일 입력 -->
        <div>
          <label
            for="birthDate"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            {{ t("생년월일") }}
          </label>
          <input
            type="date"
            id="birthDate"
            v-model="form.birthDate"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <span v-if="errors.birthDate" class="text-red-500 text-sm mt-1">
            {{ errors.birthDate }}
          </span>
        </div>

        <!-- 제출 버튼 -->
        <div class="mt-8">
          <button
            type="submit"
            class="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 hover:scale-105 transition-transform duration-300"
          >
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
import { getMe, join } from "../api/member";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useMemberStore } from "../stores/member";

const { t } = useI18n(); // 다국어 번역 함수
const router = useRouter();
const route = useRoute();
const memberStore = useMemberStore();
const form = ref({
  email: "",
  phoneNumber: "",
  gender: "",
  birthDate: "",
});

const errors = ref({
  email: "",
  phoneNumber: "",
  gender: "",
  birthDate: "",
});

onMounted(async () => {
  if (localStorage.getItem("accessToken")) {
    const data = await getMe();
    memberStore.setMember(data.userId);
    const info = {
      phoneNumber: null,
      gender: null,
      nickname: data.nickname,
      birth: null,
      profileImage: data.profileImage,
      userId: data.userId,
      email: data.email,
    };
    memberStore.setInfo(info);
    form.value.email = memberStore.memberInfo.email;
    console.log(form.value.email);
  }
});

const handleSubmit = async () => {
  if (validateForm()) {
    // 모든 필드가 올바르게 입력된 경우 추가 회원 정보를 제출하는 로직
    await join({
      phoneNumber: form.value.phoneNumber,
      gender: form.value.gender,
      birth: form.value.birthDate,
    });
    toast.success(t("회원가입이 완료되었습니다!"));
    router.push("/");
  } else {
    toast.error(t("모든 필드를 올바르게 입력해주세요."));
  }
};

const validateForm = () => {
  let isValid = true;

  // 오류 메시지 초기화
  errors.value = {
    email: "",
    phoneNumber: "",
    gender: "",
    birthDate: "",
  };

  if (!form.value.email) {
    errors.value.email = t("이메일을 입력해주세요.");
    isValid = false;
  }

  if (!form.value.phoneNumber) {
    errors.value.phoneNumber = t("전화번호를 입력해주세요.");
    isValid = false;
  } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(form.value.phoneNumber)) {
    errors.value.phoneNumber = t(
      "올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)"
    );
    isValid = false;
  }

  if (!form.value.gender) {
    errors.value.gender = t("성별을 선택해주세요.");
    isValid = false;
  }

  if (!form.value.birthDate) {
    errors.value.birthDate = t("생년월일을 입력해주세요.");
    isValid = false;
  }

  return isValid;
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
