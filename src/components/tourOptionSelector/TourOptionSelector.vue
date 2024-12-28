<template>
  <CommonSelector
    :menus="menus"
    :items="{ OPTION: options, CATEGORY: categories }"
    :selectedItems="tourOptionStore.selectedOptions"
    @select="handleSelect"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getOptions, getCategories } from "@/api/region";
import { translateWithChatGPT } from "@/api/translate";
import { useTourOptionStore } from "@/stores/tourOptionStore";
import CommonSelector from "@/components/selector/commonOptionSelector/CommonOptionSelector.vue";

const tourOptionStore = useTourOptionStore();
const menus = [
  { key: "OPTION", label: "편의" },
  { key: "CATEGORY", label: "활동유형" },
];

const options = ref([]); // 편의 옵션 데이터
const categories = ref([]); // 활동 유형 데이터

const handleSelect = ({ id, name }) => {
  tourOptionStore.addOption(id, name);
};

onMounted(async () => {
  // API 데이터 가져오기
  const fetchedOptions = await getOptions();
  const fetchedCategories = await getCategories();

  // 데이터 정리 및 번역
  options.value = fetchedOptions;

  categories.value = fetchedCategories;
});
</script>
