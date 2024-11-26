<template>
  <div class="w-full h-full box-border pt-[25px]">
    <h1 class="text-4xl">{{ t("내 투어 패키지") }}</h1>
    <div class="border w-full my-[15px]"></div>
    <div class="w-full flex">
      <div class="w-1/2 h-[505px] overflow-y-auto border">
        <div v-for="tour in tours" :key="tour.tourId">
          <div @click="selectedTour = tour.tourId" :class="[
            'w-full border h-[200px] rounded-lg flex relative',
            tour.id === selectedTour ? 'opacity-25' : '',
          ]">
            <img class="h-full w-1/3" :src="tour.mainImgUrl" :alt="t('패키지사진')" />
            <div class="w-2/3 flex flex-col">
              <h3 class="w-full block box-border p-[5px] text-lg truncate">
                {{ tour.title }}
              </h3>
              <div class="flex items-center justify-start w-full mt-[5px]">
                <img src="@/assets/images/star.svg" :alt="t('별점')" /><span class="text-center">{{ tour.reviewAvg
                  }}</span>
              </div>
              <img class="w-[24px] self-end mt-[98px] me-[10px] cursor-pointer" src="@/assets/images/option.svg"
                :alt="t('패키지설정')" @click="clickToggle" />
            </div>
            <div
              class="w-[150px] border border-zinc-300 absolute end-0 bottom-[-85px] rounded-lg shadow-xl bg-white z-50"
              v-if="isToggled">
              <ul class="flex flex-col">
                <RouterLink to="/mypage" class="hover:bg-slate-200 p-[10px] cursor-pointer">{{ t("수정") }}</RouterLink>
                <li class="hover:bg-slate-200 p-[10px] cursor-pointer">
                  {{ t("삭제") }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <RouterLink to="/tour/add" class="flex w-full justify-center">
          <img class="w-1/2 box-border p-[20px] cursor-pointer h-[200px]" src="@/assets/images/add.svg"
            :alt="t('추가')" />
        </RouterLink>
      </div>
      <div class="w-1/2 border h-[505px] rounded-lg flex relative" v-if="selectedTour !== null">
        <WaitList :tourId="selectedTour" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { getMyTours } from "@/api/tour";
import { translateWithChatGPT } from "@/api/translate"; // 번역 함수 추가
import WaitList from "@/components/waitlList/WaitList.vue";
import { useI18n } from "vue-i18n";
import { useMemberStore } from "../stores/member";

const { t } = useI18n(); // 다국어 번역 함수
const selectedTour = ref(null);
const isToggled = ref(false);
const tours = ref([]);
const memberStore = useMemberStore();
// 투어 데이터 번역 함수
const translateTours = async (tours) => {
  for (const tour of tours) {
    tour.title = await translateWithChatGPT(tour.title); // 투어 제목 번역
  }
};

const clickToggle = () => {
  isToggled.value = !isToggled.value;
};

const handleClickOutside = (event) => {
  const target = event.target;
  if (target.closest(".relative") !== null) {
    return;
  }

  isToggled.value = false;
};

onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
  const id = memberStore.memberId;
  tours.value = await getMyTours(id);

  // 투어 데이터 번역 적용
  await translateTours(tours.value);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style></style>
