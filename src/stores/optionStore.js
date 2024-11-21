import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useOptionStore = defineStore("option", () => {
  const options = ref([]);

  // options의 값을 설정하는 함수
  const setOptions = (newOptions) => {
    options.value = newOptions;
  };

  const selectedOptions = computed(() => options.value);

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

  return { options, setOptions, addOption, deleteOption, selectedOptions };
});
