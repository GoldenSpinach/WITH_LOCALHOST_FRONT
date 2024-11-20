import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useOptionStore = defineStore("option", () => {
  const options = ref([]);
  const setOptions = (newOptions) => {
    options.value = newOptions;
  };
  return { options, setOptions };
});
