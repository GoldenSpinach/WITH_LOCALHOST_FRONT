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
          class="border p-[5px] rounded-lg cursor-pointer hover:bg-blue-400 hover:text-white"
          @click="clickRegion(region.regionId)"
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
          class="border p-[5px] rounded-lg cursor-pointer hover:bg-blue-400 hover:text-white"
          @click="clickCity(city.cityId)"
        >
          {{ city.cityName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { dRegion, dCity } from "@/dummy";
const emit = defineEmits<{
  (event: "chooseArea", value: number): void;
  (event: "chooseCity", value: number): void;
}>();
const regions = ref(dRegion);
const cities = ref(dCity);

const clickRegion = (regionId: number) => {
  emit("chooseArea", regionId);
};
const clickCity = (cityId: number) => {
  emit("chooseCity", cityId);
};
</script>

<style></style>
