<template>
  <RegionCitySelector
    :regions="regions"
    :cities="cities"
    :selectedRegionId="tourOptionStore.regionId"
    :selectedCityIds="tourOptionStore.cities.map((c) => c.id)"
    @selectRegion="clickRegion"
    @selectCity="clickCity"
  />
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { getRegion, getCities } from "@/api/region";
import { useTourOptionStore } from "@/stores/tourOptionStore";
import RegionCitySelector from "@/components/selector/regionCitySelector/RegionCitySelector.vue";

const tourOptionStore = useTourOptionStore();
const regions = ref([]);
const cities = ref([]);

onMounted(async () => {
  regions.value = await getRegion();
});

watchEffect(async () => {
  if (tourOptionStore.regionId == null) return;
  cities.value = await getCities(tourOptionStore.regionId);
});

const clickRegion = (regionId, regionName) => {
  tourOptionStore.addRegion(regionId, regionName);
};

const clickCity = (cityId) => {
  tourOptionStore.addCity(cityId);
};
</script>
