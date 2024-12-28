<template>
  <RegionCitySelector
    :regions="regions"
    :cities="cities"
    :selectedRegionId="optionStore.regionId"
    :selectedCityIds="optionStore.cities"
    @selectRegion="clickRegion"
    @selectCity="clickCity"
  />
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { getRegion, getCities } from "@/api/region";
import { useOptionStore } from "@/stores/optionStore";
import RegionCitySelector from "@/components/selector/regionCitySelector/RegionCitySelector.vue";

const optionStore = useOptionStore();
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

const clickCity = (cityId) => {
  optionStore.addCity(cityId);
};
</script>
