<template>
  <section
    class="flex flex-col items-center justify-center h-[calc(100vh-100px)]"
  >
    <div class="flex flex-col gap-48 justify-center items-center">
      <div class="flex items-center gap-24 relative">
        <div class="text-7xl flex flex-col gap-[15px] font-bold">
          <span class="inline-block text-blue-500">{{ t("환영합니다1") }}</span>
          <span class="inline-block text-blue-500">{{ t("환영합니다2") }}</span>
          <span class="inline-block">{{ t("환영합니다3") }}</span>
        </div>
        <!-- 캐러셀 그라데이션 효과 적용 -->
        <div class="relative w-[700px] overflow-hidden">
          <Carousel
            :itemsToShow="3"
            :wrapAround="true"
            :autoplay="2000"
            :paginationEnabled="true"
            :transition="600"
            :height="400"
            class="relative z-0"
          >
            <Slide v-for="tour in tours" :key="tour.tourId">
              <RouterLink
                :to="`/guide/${tour.tourId}`"
                class="opacity-50 text-white hover:opacity-100 hover:text-slate-400 text-sm"
              >
                <img
                  :src="tour.mainImgUrl"
                  :alt="tour.title"
                  class="rounded-xl w-[200px]"
                />
                <div class="flex justify-start ps-[15px]">
                  <span>{{ tour.title }}</span>
                </div>
              </RouterLink>
            </Slide>
          </Carousel>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { getCurrentTours } from "@/api/tour";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useMemberStore } from "../stores/member";
import { getMe } from "../api/member";

const { t } = useI18n();
const tours = ref([]);
const memberStore = useMemberStore();
const router = useRouter();
const accessToken = localStorage.getItem("accessToken");
onMounted(async () => {
  if (accessToken) {
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
  }
  if (memberStore.isLogin && memberStore.memberInfo.birth === null) {
    alert("회원가입을 완료해주세요");
    router.push("/join");
  }
  tours.value = await getCurrentTours();
  console.log(tours.val);
});
</script>

<style></style>
