<template>
  <div
    class="w-[450px] border border-zinc-300 rounded-3xl mt-[5px] shadow-xl p-[20px] bg-white"
  >
    <div>
      <span class="text-lg font-bold mb-[8px] inline-block"> 지역</span>
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
      <span class="text-lg font-bold mb-[8px] inline-block">도시</span>
      <div class="flex flex-wrap gap-[12px]">
        <div
          v-for="city in cities"
          :key="city.cityId"
          :class="[
            'border p-[5px] rounded-lg cursor-pointe',
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
import { useTourOptionStore } from "@/stores/tourOptionStore";
const optionStore = useTourOptionStore();

const regions = ref([]);
const cities = ref([]);

onMounted(async () => {
  regions.value = await getRegion();
});

watchEffect(async () => {
  if (optionStore.regionId == null) return;
  cities.value = await getCities(optionStore.regionId);
});
const clickRegion = (regionId, regionName) => {
  optionStore.addRegion(regionId, regionName);
};
const clickCity = (cityId, name) => {
  optionStore.addCity(cityId, name);
};
</script>

<style></style>
