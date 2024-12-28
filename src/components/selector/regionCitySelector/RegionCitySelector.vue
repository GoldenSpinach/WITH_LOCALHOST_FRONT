<template>
  <div
    class="w-[450px] border border-zinc-300 rounded-3xl mt-5 shadow-xl p-6 bg-white"
  >
    <div>
      <span class="text-xl font-semibold mb-4 inline-block">{{
        t("지역")
      }}</span>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="region in regions"
          :key="region.regionId"
          :class="[
            'border p-3 rounded-lg cursor-pointer transition-all duration-200',
            selectedRegionId == region.regionId
              ? 'bg-blue-400 text-white border-blue-400'
              : 'border-gray-300 hover:bg-blue-50 hover:text-blue-500',
          ]"
          @click="$emit('selectRegion', region.regionId, region.regionName)"
        >
          <span class="flex items-center gap-1">
            <span>{{ region.regionName }}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="w-full border-t my-5 border-gray-200"></div>

    <div>
      <span class="text-xl font-semibold mb-4 inline-block">{{
        t("도시")
      }}</span>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="city in cities"
          :key="city.cityId"
          :class="[
            'border p-3 rounded-lg cursor-pointer transition-all duration-200',
            selectedCityIds.includes(city.cityId)
              ? 'bg-blue-400 text-white border-blue-400'
              : 'border-gray-300 hover:bg-blue-50 hover:text-blue-500',
          ]"
          @click="$emit('selectCity', city.cityId, city.cityName)"
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
import { ref, onMounted, watchEffect } from "vue";
import { translateWithChatGPT } from "@/api/translate";
import { useI18n } from "vue-i18n";

const props = defineProps({
  regions: Array,
  cities: Array,
  selectedRegionId: [String, Number],
  selectedCityIds: Array,
});

const { t } = useI18n();
</script>

<style scoped>
.material-icons {
  font-size: 16px;
  vertical-align: middle;
}
</style>
