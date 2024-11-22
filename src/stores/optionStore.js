import { computed, ref, watchEffect } from "vue";
import { defineStore } from "pinia";

export const useOptionStore = defineStore("option", () => {
  const selectedRegionId = ref(null);
  const selectedRegionName = ref(null);
  const selectedCities = ref([]);
  const startDate = ref(null);
  const endDate = ref(null);
  const options = ref([]);

  // options의 값을 설정하는 함수
  const setOptions = (newOptions) => {
    options.value = newOptions;
  };

  const selectedOptions = computed(() => options.value);
  const regionId = computed(() => selectedRegionId.value);
  const regionName = computed(() => selectedRegionName.value);
  const cities = computed(() => selectedCities.value);
  const start = computed(() => startDate.value);
  const end = computed(() => endDate.value);
  // 옵션을 추가하거나, 이미 있는 경우 삭제하는 함수
  const addOption = (id, name) => {
    const optionExists = options.value.some((opt) => opt.id === id);
    if (optionExists) {
      deleteOption(id);
    } else {
      options.value.push({ id, name });
    }
  };

  const deleteOption = (id) => {
    options.value = options.value.filter((opt) => opt.id !== id);
  };

  const addRegion = (regionId, regionName) => {
    selectedRegionId.value = regionId;
    selectedRegionName.value = regionName;
    // console.log(selectedOp.value);
  };
  const addCity = (cityId) => {
    if (cities.value.includes(cityId)) {
      selectedCities.value = selectedCities.value.filter((id) => id != cityId);
      return;
    }
    selectedCities.value.push(cityId);
  };

  watchEffect(() => {
    if (selectedRegionId) {
      selectedCities.value = [];
    }
  });
  return {
    options,
    setOptions,
    addOption,
    deleteOption,
    addRegion,
    addCity,
    selectedOptions,
    regionId,
    regionName,
    cities,
    startDate,
    endDate,
  };
});
