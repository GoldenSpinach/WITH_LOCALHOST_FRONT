<template>
  <div
    class="w-[450px] border border-zinc-300 rounded-3xl mt-5 shadow-xl p-6 bg-white"
  >
    <div>
      <span class="text-lg font-bold mb-4 inline-block">{{ t("지역") }}</span>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="region in regions"
          :key="region.regionId"
          :class="[
            'border p-3 rounded-lg cursor-pointer transition-all duration-200',
            optionStore.regionId == region.regionId
              ? 'bg-blue-400 text-white border-blue-400'
              : 'border-gray-300 hover:bg-blue-50 hover:text-blue-500',
          ]"
          @click="clickRegion(region.regionId, region.regionName)"
        >
          <span class="flex items-center gap-1">
            <span>{{ region.regionName }}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="w-full border-t my-5 border-gray-300"></div>

    <div>
      <span class="text-lg font-bold mb-4 inline-block">{{ t("도시") }}</span>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="city in cities"
          :key="city.cityId"
          :class="[
            'border p-3 rounded-lg cursor-pointer transition-all duration-200',
            optionStore.cities.some((c) => c.id == city.cityId)
              ? 'bg-blue-400 text-white border-blue-400'
              : 'border-gray-300 hover:bg-blue-50 hover:text-blue-500',
          ]"
          @click="clickCity(city.cityId, city.cityName)"
        >
          <span class="flex items-center gap-1">
            <span>{{ city.cityName }}</span>
          </span>
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

<style>
.material-icons {
  font-size: 16px;
  vertical-align: middle;
}
</style>
