import { computed, ref, watchEffect } from "vue";
import { defineStore } from "pinia";

export const useTourOptionStore = defineStore("tourOption", () => {
  const selectedRegionId = ref(null);
  const selectedRegionName = ref(null);
  const selectedCities = ref([]);
  const options = ref([]);

  // options의 값을 설정하는 함수
  const setOptions = (newOptions) => {
    options.value = newOptions;
  };

  const selectedOptions = computed(() => options.value);
  const regionId = computed(() => selectedRegionId.value);
  const regionName = computed(() => selectedRegionName.value);
  const cities = computed(() => selectedCities.value);
  // 옵션을 추가하거나, 이미 있는 경우 삭제하는 함수
  const addOption = (id, name, type) => {
    const optionExists = options.value.some((opt) => opt.id === id);
    if (optionExists) {
      deleteOption(id);
    } else {
      options.value.push({ id, name, type });
    }
  };

  const deleteOption = (id) => {
    options.value = options.value.filter((opt) => opt.id !== id);
  };

  const addRegion = (regionId, regionName) => {
    selectedRegionId.value = regionId;
    selectedRegionName.value = regionName;
    selectedCities.value = [];
    // console.log(selectedOp.value);
  };
  const addCity = (cityId, name) => {
    const cityExists = selectedCities.value.some((city) => city.id === cityId);
    if (cityExists) {
      deleteCity(cityId);
      return;
    }
    selectedCities.value.push({ id: cityId, name });
    console.log(cities.value);
  };

  const deleteCity = (id) => {
    selectedCities.value = selectedCities.value.filter(
      (city) => city.id !== id
    );
  };
  return {
    options,
    setOptions,
    addOption,
    deleteOption,
    addRegion,
    addCity,
    deleteCity,
    selectedOptions,
    regionId,
    regionName,
    cities,
  };
});
