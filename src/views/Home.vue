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
import { translateWithChatGPT } from "../api/translate";
import { toast } from "vue3-toastify";

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
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      nickname: data.nickname,
      birth: data.birth,
      profileImage: data.profileImage,
      userId: data.userId,
      email: data.email,
    };
    memberStore.setInfo(info);
  }
  console.log(memberStore.memberInfo);
  if (memberStore.isLogin && memberStore.memberInfo.birth === null) {
    toast("회원가입을 완료해주세요");
    router.push("/join");
  }
  tours.value = await getCurrentTours();
  tours.value.forEach(async (tour, idx) => {
    console.log(tour.title);
    tours.value[idx].title = await translateWithChatGPT(tour.title);
  });
  console.log(tours.value);
});
</script>

<style></style>
