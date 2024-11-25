<template>
  <div
    class="w-[450px] border border-zinc-300 rounded-3xl mt-[5px] shadow-xl p-[20px] bg-white"
  >
    <div>
      <span class="text-lg font-bold mb-[8px] inline-block">{{
        t("지역")
      }}</span>
      <div class="flex flex-wrap gap-[12px]">
        <div
          v-for="region in regions"
          :key="region.regionId"
          :class="[
            'border p-[5px] rounded-lg cursor-pointer',
            optionStore.regionId == region.regionId
              ? 'bg-blue-400 text-white'
              : 'hover:bg-blue-400 hover:text-white',
          ]"
          @click="clickRegion(region.regionId, region.regionName)"
        >
          {{ region.regionName }}
        </div>
      </div>
    </div>
    <div class="w-full border my-[25px]"></div>
    <div>
      <span class="text-lg font-bold mb-[8px] inline-block">{{
        t("도시")
      }}</span>
      <div class="flex flex-wrap gap-[12px]">
        <div
          v-for="city in cities"
          :key="city.cityId"
          :class="[
            'border p-[5px] rounded-lg cursor-pointer',
            optionStore.cities.some((c) => c.id == city.cityId)
              ? 'bg-blue-400 text-white'
              : 'hover:bg-blue-400 hover:text-white',
          ]"
          @click="clickCity(city.cityId, city.cityName)"
        >
          {{ city.cityName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { getRegion, getCities } from "@/api/region";
import { useI18n } from "vue-i18n"; // I18n 번역 함수 가져오기
import { useTourOptionStore } from "@/stores/tourOptionStore";
import { translateWithChatGPT } from "@/api/translate";

const optionStore = useTourOptionStore();
const { t } = useI18n();

const regions = ref([]);
const cities = ref([]);

// 지역 데이터 번역
const translateRegions = async (regions) => {
  for (const region of regions) {
    region.regionName = await translateWithChatGPT(region.regionName);
  }
};

// 도시 데이터 번역
const translateCities = async (cities) => {
  for (const city of cities) {
    city.cityName = await translateWithChatGPT(city.cityName);
  }
};

onMounted(async () => {
  // 지역 데이터 가져오기
  regions.value = await getRegion();
  await translateRegions(regions.value); // 지역 이름 번역
});

watchEffect(async () => {
  if (optionStore.regionId == null) return;

  // 도시 데이터 가져오기
  cities.value = await getCities(optionStore.regionId);
  await translateCities(cities.value); // 도시 이름 번역
});

const clickRegion = (regionId, regionName) => {
  optionStore.addRegion(regionId, regionName);
};

const clickCity = (cityId, name) => {
  optionStore.addCity(cityId, name);
};
</script>

<style></style>
