<template>
  <div class="w-[450px] border border-zinc-300 rounded-3xl mt-[5px] shadow-xl p-[20px] bg-white">
    <div>
      <span class="text-lg font-bold mb-[8px] inline-block"> 지역</span>
      <div class="flex flex-wrap gap-[12px]">
        <div v-for="region in regions" :key="region.regionId" :class="[
          'border p-[5px] rounded-lg cursor-pointer',
          selectedOption.region == region.regionId
            ? 'bg-blue-400 text-white'
            : 'hover:bg-blue-400 hover:text-white', // 선택된 경우
        ]" @click="clickRegion(region.regionId, region.regionName)">
          {{ region.regionName }}
        </div>
      </div>
    </div>
    <div class="w-full border my-[25px]"></div>
    <div>
      <span class="text-lg font-bold mb-[8px] inline-block">도시</span>
      <div class="flex flex-wrap gap-[12px]">
        <div v-for="city in cities" :key="city.cityId" :class="[
          'border p-[5px] rounded-lg cursor-pointe',
          selectedOption.cities.includes(city.cityId)
            ? 'bg-blue-400 text-white'
            : 'hover:bg-blue-400 hover:text-white',
        ]" @click="clickCity(city.cityId)">
          {{ city.cityName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { dRegion, dCity } from "@/dummy";
const emit = defineEmits(["chooseArea", "chooseCity"]);
const props = defineProps({
  selectedOption: {
    type: Object,
    default: () => ({ region: null, cities: [], extras: [] }),
  },
});

const regions = ref(dRegion);
const cities = ref(dCity);
const clickRegion = (regionId, regionName) => {
  emit("chooseArea", regionId, regionName);
};
const clickCity = (cityId, cityName) => {
  emit("chooseCity", cityId, cityName);
};
</script>

<style></style>
