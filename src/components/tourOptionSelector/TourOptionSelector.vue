<template>
  <div
    class="w-[450px] border border-zinc-300 rounded-3xl mt-5 shadow-xl p-6 bg-white"
  >
    <div>
      <div class="border-b w-full mb-6 flex">
        <span
          :class="[
            'text-lg font-semibold inline-block px-5 pb-3 rounded-t-md me-5 cursor-pointer text-center transition-all duration-200',
            selectorMenu === 'OPTION'
              ? 'bg-blue-400 text-white'
              : 'text-gray-700 hover:bg-gray-100',
          ]"
          @click="selectorMenu = 'OPTION'"
        >
          {{ t("편의") }}
        </span>
        <span
          :class="[
            'text-lg font-semibold inline-block px-5 pb-3 rounded-t-md me-5 cursor-pointer text-center transition-all duration-200',
            selectorMenu === 'CATEGORY'
              ? 'bg-blue-400 text-white'
              : 'text-gray-700 hover:bg-gray-100',
          ]"
          @click="selectorMenu = 'CATEGORY'"
        >
          {{ t("활동유형") }}
        </span>
      </div>
      <div class="flex flex-wrap gap-3">
        <template v-if="selectorMenu === 'OPTION'">
          <div
            v-for="option in options"
            :key="option.categoryId"
            :class="[
              'border p-4 rounded-lg cursor-pointer transition-all duration-200',
              tourOptionStore.selectedOptions.some(
                (opt) => opt.id === option.categoryId
              )
                ? 'bg-blue-400 text-white border-blue-400'
                : 'border-gray-300 hover:bg-blue-50 hover:text-blue-500',
            ]"
            @click="
              tourOptionStore.addOption(
                option.categoryId,
                option.categoryName,
                option.categoryType
              )
            "
          >
            <span class="flex items-center gap-1">
              <span>{{ option.categoryName }}</span>
            </span>
          </div>
        </template>
        <template v-else>
          <div
            v-for="category in categories"
            :key="category.categoryId"
            :class="[
              'border p-4 rounded-lg cursor-pointer transition-all duration-200',
              tourOptionStore.selectedOptions.some(
                (opt) => opt.id === category.categoryId
              )
                ? 'bg-blue-400 text-white border-blue-400'
                : 'border-gray-300 hover:bg-blue-50 hover:text-blue-500',
            ]"
            @click="
              tourOptionStore.addOption(
                category.categoryId,
                category.categoryName,
                category.categoryType
              )
            "
          >
            <span class="flex items-center gap-1">
              <span>{{ category.categoryName }}</span>
            </span>
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
import { translateWithChatGPT } from "@/api/translate";
import { useI18n } from "vue-i18n";

const tourOptionStore = useTourOptionStore();
const options = ref([]);
const categories = ref([]);
const selectorMenu = ref("OPTION");

const { t } = useI18n();

// 데이터 번역
const translateData = async (data, field) => {
  for (const item of data) {
    item[field] = await translateWithChatGPT(item[field]);
  }
};

onMounted(async () => {
  options.value = await getOptions();
  categories.value = await getCategories();

  // 번역 처리
  await translateData(options.value, "categoryName");
  await translateData(categories.value, "categoryName");
});
</script>

<style scoped>
.material-icons {
  font-size: 16px;
  vertical-align: middle;
}
</style>
