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
            optionStore.cities.includes(city.cityId)
              ? 'bg-blue-400 text-white'
              : 'hover:bg-blue-400 hover:text-white',
          ]"
          @click="clickCity(city.cityId)"
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
import { translateWithChatGPT } from "@/api/translate"; // 번역 함수 추가
import { useOptionStore } from "@/stores/optionStore";
import { useI18n } from "vue-i18n";
const { t } = useI18n(); // 번역 함수 추가
const optionStore = useOptionStore();
const regions = ref([]);
const cities = ref([]);

// 지역 데이터 번역
const translateRegions = async (regions) => {
  for (const region of regions) {
    region.regionName = await translateWithChatGPT(region.regionName); // 지역 이름 번역
  }
};

// 도시 데이터 번역
const translateCities = async (cities) => {
  for (const city of cities) {
    city.cityName = await translateWithChatGPT(city.cityName); // 도시 이름 번역
  }
};

onMounted(async () => {
  regions.value = await getRegion(); // 지역 데이터 가져오기
  await translateRegions(regions.value); // 지역 이름 번역
});

watchEffect(async () => {
  if (optionStore.regionId == null) return;
  cities.value = await getCities(optionStore.regionId); // 도시 데이터 가져오기
  await translateCities(cities.value); // 도시 이름 번역
});

const clickRegion = (regionId, regionName) => {
  optionStore.addRegion(regionId, regionName);
};
const clickCity = (cityId) => {
  optionStore.addCity(cityId);
};
</script>

<style></style>
