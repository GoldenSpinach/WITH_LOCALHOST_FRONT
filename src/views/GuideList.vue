<template>
  <transition name="fade" appear>
    <div
      class="border-t w-screen transition-opacity duration-1000"
      v-if="isMounted"
    >
      <div class="flex gap-[6px] ps-[15px] py-[15px] border-b relative">
        <div class="flex gap-[6px] w-full flex-wrap">
          <div
            v-for="option in optionStore.selectedOptions"
            :key="option.id"
            class="box-border min-w-[100px] max-w-[200px] h-[30px] max-h-[34px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center whitespace-nowrap overflow-hidden text-ellipsis"
            @click="optionStore.deleteOption(option.id)"
          >
            {{ option.name }}
          </div>
          <img
            class="w-[30px] min-w-[30px] cursor-pointer position-sticky"
            src=" @/assets/images/add.svg"
            :alt="t('설정추가')"
            @click="toggleOptionDropdown"
          />
        </div>

        <OptionSelector
          v-if="isOptionSelectorToggled"
          class="absolute z-50 top-[55px] start-[15px]"
        />
      </div>
      <div class="flex">
        <div
          class="h-[calc(100vh-165px)] w-1/2 box-border p-[10px] overflow-y-auto"
        >
          <div
            class="grid grid-cols-[repeat(auto-fit,minmax(300px,300px))] gap-[10px]"
          >
            <template v-for="tour in tours" :key="tour.tourId">
              <RouterLink
                :to="'/guide/' + tour.tourId"
                class="w-[300px] h-[500px] flex cursor-pointer"
              >
                <div
                  class="flex flex-col w-full h-[480px] min-h-[480px] justify-center items-center"
                >
                  <img
                    class="rounded-md h-[420px]"
                    :src="tour.mainImgUrl"
                    :alt="t('체험이미지')"
                  />
                  <div class="w-full flex flex-col ms-[15px]">
                    <div class="flex items-center justify-start">
                      <img
                        src="@/assets/images/star.svg"
                        :alt="t('별점')"
                      /><span class="text-center">{{ tour.reviewAvg }}</span>
                    </div>
                    <span
                      class="inline-block w-[300px] overflow-hidden whitespace-nowrap text-ellipsis text-sm"
                      >{{ tour.title }}</span
                    >
                    <span class="text-sm ms-[3px] text-slate-400"
                      >&#8361; {{ tour.pay }}
                    </span>
                  </div>
                </div>
              </RouterLink>
            </template>
          </div>
        </div>
        <div class="h-[calc(100vh-165px)] w-1/2">
          <Map :positions="positions" :center="positions[0]" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import Map from "@/components/map/Map.vue";
import { useOptionStore } from "../stores/optionStore";
import OptionSelector from "@/components/option/OptionSelector.vue";
import { RouterLink } from "vue-router";
import { getTours } from "@/api/tour";
import { getConditionTours } from "../api/tour";
import { useI18n } from "vue-i18n";
import { translateWithChatGPT } from "@/api/translate"; // 번역 함수 추가

const { t } = useI18n(); // 다국어 번역 함수
const isOptionSelectorToggled = ref(false);
const optionStore = useOptionStore();
const isMounted = ref(false);
const tours = ref([]);
const positions = ref([]);
const toggleOptionDropdown = () => {
  isOptionSelectorToggled.value = !isOptionSelectorToggled.value;
};

const translateTours = async (tours) => {
  for (const tour of tours) {
    tour.title = await translateWithChatGPT(tour.title); // 제목 번역
  }
};

watchEffect(() => {
  if (tours.value.length === 0) return;
  positions.value = tours.value.map((tour) => {
    return { lng: Number(tour.meetLongitude), lat: Number(tour.meetLatitude) };
  });
});

watch(optionStore, async () => {
  const startDate = optionStore.start;
  const endDate = optionStore.end;
  const options =
    optionStore.selectedOptions.length !== 0
      ? optionStore.options.map((option) => option.id)
      : null;
  const regionId = optionStore.regionId;
  const cities = optionStore.cities.length !== 0 ? optionStore.cities : null;

  // 조건에 따라 투어 가져오기
  const fetchedTours = await getConditionTours({
    startDate,
    endDate,
    options,
    regionId,
    cities,
  });

  await translateTours(fetchedTours); // 투어 데이터 번역
  tours.value = fetchedTours; // 번역 완료 후 업데이트
});

const handleClickOutside = (event) => {
  const target = event.target;

  // 드롭다운 영역 내에서 클릭 시 아무 동작 안함
  if (target.closest(".relative") !== null) {
    return;
  }
  isOptionSelectorToggled.value = false;
};

// 컴포넌트 마운트 시 이벤트 리스너 추가
onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
  isMounted.value = true; // 마운트 시 true로 설정하여 트랜지션이 발생하게 함
  if (optionStore.regionId === null) {
    const fetchedTours = await getTours();
    await translateTours(fetchedTours); // 투어 데이터 번역
    tours.value = fetchedTours; // 번역 완료 후 업데이트
  }
});

// 컴포넌트 해제 시 이벤트 리스너 제거
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-1000;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
