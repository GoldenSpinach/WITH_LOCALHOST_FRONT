<template>
  <div class="border-t w-full"></div>
  <div
    class="w-full h-[calc(100vh-101px)] flex flex-col items-center justify-center"
  >
    <section
      class="w-5/6 max-w-[1160px] h-[700px] border rounded-lg box-border p-[25px] self-center"
    >
      <div class="flex w-full h-full pt-[45px] box-border">
        <div class="w-1/4 flex flex-col items-center gap-[15px]">
          <img
            src="@/assets/images/default_profile.svg"
            :alt="t('프로필사진')"
          />
          <button
            class="bg-blue-400 w-3/6 text-white h-[35px] rounded-lg cursor-pointer"
          >
            {{ t("관광객 전환") }}
          </button>
          <div class="border-b w-5/6"></div>
          <div class="w-5/6">
            <ul class="flex flex-col gap-[15px]">
              <RouterLink to="/mypage">{{ t("예약 내역") }}</RouterLink>
              <!-- <RouterLink to="/mypage/review">{{ t('내가 쓴 리뷰') }}</RouterLink> -->
              <RouterLink to="/mypage/tour">{{ t("패키지 관리") }}</RouterLink>
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

const { t } = useI18n(); // 다국어 번역 함수
</script>

<style></style>
