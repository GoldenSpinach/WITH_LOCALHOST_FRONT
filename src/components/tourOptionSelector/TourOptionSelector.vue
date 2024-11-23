<template>
  <div
    class="w-[450px] border border-zinc-300 rounded-3xl mt-[5px] shadow-xl p-[20px] bg-white"
  >
    <div>
      <div class="border-b w-full mb-[15px] flex">
        <span
          :class="[
            'text-lg font-semibold inline-block px-[5px] pb-[10px] rounded-t-md me-[20px] cursor-pointer text-center',
            selectorMenu === 'OPTION' ? 'bg-blue-400 text-white' : '',
          ]"
          @click="selectorMenu = 'OPTION'"
          >편의</span
        >
        <span
          :class="[
            'text-lg font-semibold inline-block px-[5px] pb-[10px] rounded-t-md me-[20px] cursor-pointer text-center',
            selectorMenu === 'CATEGORY' ? 'bg-blue-400 text-white' : '',
          ]"
          @click="selectorMenu = 'CATEGORY'"
          >활동유형</span
        >
      </div>
      <div class="flex flex-wrap gap-[12px]">
        <template v-if="selectorMenu === 'OPTION'">
          <div
            v-for="option in options"
            :key="option.categoryId"
            :class="[
              'border p-[5px] rounded-lg cursor-pointer',
              tourOptionStore.selectedOptions.some(
                (opt) => opt.id == option.categoryId
              )
                ? 'bg-blue-400 text-white'
                : 'hover:bg-blue-400 hover:text-white',
            ]"
            @click="
              tourOptionStore.addOption(
                option.categoryId,
                option.categoryName,
                option.categoryType
              )
            "
          >
            {{ option.categoryName }}
          </div>
        </template>
        <template v-else>
          <div
            v-for="category in categories"
            :key="category.categoryId"
            :class="[
              'border p-[5px] rounded-lg cursor-pointer',
              tourOptionStore.selectedOptions.some(
                (opt) => opt.id == category.categoryId
              )
                ? 'bg-blue-400 text-white'
                : 'hover:bg-blue-400 hover:text-white',
            ]"
            @click="
              tourOptionStore.addOption(
                category.categoryId,
                category.categoryName,
                category.categoryType
              )
            "
          >
            {{ category.categoryName }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getOptions, getCategories } from "@/api/region";
import { useTourOptionStore } from "../../stores/tourOptionStore";
const tourOptionStore = useTourOptionStore();
const options = ref([]);
const categories = ref([]);
// OPTION = 편의 / CATEGORY = 활동유형
const selectorMenu = ref("OPTION");

onMounted(async () => {
  options.value = await getOptions();
  categories.value = await getCategories();
});
</script>

<style></style>
