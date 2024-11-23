<template>
  <div
    class="w-[450px] border border-zinc-300 rounded-3xl mt-[5px] shadow-xl p-[20px] bg-white"
  >
    <div>
      <div class="border-b w-full mb-[15px] flex">
        <span
          class="text-lg font-semibold inline-block px-[5px] pb-[10px] rounded-t-md me-[20px] cursor-pointer text-center bg-blue-400 text-white"
          >활동유형</span
        >
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
import { getCategories } from "@/api/region";

const props = defineProps({
  seletedCategory: String,
  seletedCategoryName: String,
});

const emit = defineEmits(["update:category"]);

const categories = ref([]);

const select = (id, name) => {
  emit("update:category", { id, name });
};

onMounted(async () => {
  categories.value = await getCategories();
});
</script>

<style></style>
