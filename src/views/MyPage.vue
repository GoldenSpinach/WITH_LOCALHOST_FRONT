<template>
  <div class="border-t w-full"></div>
  <div
    class="w-full h-[calc(100vh-101px)] flex flex-col items-center justify-center"
  >
    <section
      class="w-5/6 max-w-[1160px] h-[700px] border rounded-lg box-border p-[25px] self-center shadow-md"
    >
      <div class="flex w-full h-full pt-[45px] box-border">
        <div class="w-1/4 flex flex-col items-center gap-[20px]">
          <img
            :src="memberStore.memberInfo.profileImage"
            :alt="t('프로필사진')"
            class="w-[120px] h-[120px] object-cover rounded-full border"
          />
          <button
            class="bg-blue-500 w-3/6 text-white h-[40px] rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300"
          >
            {{ t("관광객 전환") }}
          </button>
          <div class="border-b w-5/6 my-4"></div>
          <div class="w-5/6">
            <ul class="flex flex-col gap-[20px]">
              <RouterLink
                to="/mypage"
                class="text-lg text-gray-700 hover:text-blue-500 transition duration-300"
              >
                {{ t("예약 내역") }}
              </RouterLink>
              <!-- <RouterLink to="/mypage/review" class="text-lg text-gray-700 hover:text-blue-500 transition duration-300">{{ t('내가 쓴 리뷰') }}</RouterLink> -->
              <RouterLink
                to="/mypage/tour"
                class="text-lg text-gray-700 hover:text-blue-500 transition duration-300"
              >
                {{ t("패키지 관리") }}
              </RouterLink>
            </ul>
          </div>
        </div>
        <div class="h-full border me-[25px]"></div>
        <RouterView />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useMemberStore } from "../stores/member";

const { t } = useI18n(); // 다국어 번역 함수

const memberStore = useMemberStore();
</script>

<style></style>
