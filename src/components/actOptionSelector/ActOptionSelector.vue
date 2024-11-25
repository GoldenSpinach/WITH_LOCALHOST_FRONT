<template>
  <div
    class="w-[450px] border border-zinc-300 rounded-3xl mt-[5px] shadow-xl p-[20px] bg-white"
  >
    <div>
      <div class="border-b w-full mb-[15px] flex">
        <span
          class="text-lg font-semibold inline-block px-[5px] pb-[10px] rounded-t-md me-[20px] cursor-pointer text-center bg-blue-400 text-white"
        >
          {{ t("활동유형") }}
        </span>
      </div>
      <div class="flex flex-wrap gap-[12px]">
        <div
          v-for="category in categories"
          :key="category.categoryId"
          :class="[
            'border p-[5px] rounded-lg cursor-pointer',
            seletedCategory === category.categoryId
              ? 'bg-blue-400 text-white'
              : 'hover:bg-blue-400 hover:text-white',
          ]"
          @click="select(category.categoryId, category.categoryName)"
        >
          {{ category.categoryName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits, defineProps } from "vue";
import { getActivities } from "@/api/region";
import { translateWithChatGPT } from "@/api/translate"; // 번역 함수 추가
const { t } = useI18n(); // 번역 함수 추가
const props = defineProps({
  seletedCategory: String,
  seletedCategoryName: String,
});

const emit = defineEmits(["update:category"]);

const categories = ref([]);

const select = (id, name) => {
  emit("update:category", { id, name });
};

const translateCategories = async (categories) => {
  for (const category of categories) {
    category.categoryName = await translateWithChatGPT(category.categoryName);
  }
};

onMounted(async () => {
  categories.value = await getActivities(); // 활동 유형 데이터 가져오기
  await translateCategories(categories.value); // 활동 유형 번역
});
</script>

<style></style>
