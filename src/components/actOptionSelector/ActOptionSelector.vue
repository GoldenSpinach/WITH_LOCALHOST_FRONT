<template>
  <CommonSelector
    :menus="menus"
    :items="{ CATEGORY: categories }"
    :selectedItems="[selectedCategory]"
    @select="handleSelect"
  />
</template>

<script setup>
import { onMounted, ref, defineEmits } from "vue";
import { getActivities } from "@/api/region";
import { translateWithChatGPT } from "@/api/translate";
import CommonSelector from "@/components/selector/commonOptionSelector/CommonOptionSelector.vue";

// 이벤트 정의
const emit = defineEmits(["update:category"]);

const menus = [
  { key: "CATEGORY", label: "활동유형" }, // 단일 메뉴
];

const categories = ref([]); // API 데이터 저장
const selectedCategory = ref([]); // 선택된 카테고리

// 선택 핸들러
const handleSelect = ({ id, name }) => {
  selectedCategory.value = { id, name }; // 선택된 데이터 업데이트
  emit("update:category", { id, name }); // 부모 컴포넌트로 전달
};

// 데이터 번역 처리
const translateCategories = async (categories) => {
  for (const category of categories) {
    category.categoryName = await translateWithChatGPT(category.categoryName);
  }
};

onMounted(async () => {
  categories.value = await getActivities();
  console.log(categories.value);
  // 번역 처리
  await translateCategories(categories.value);
});
</script>
