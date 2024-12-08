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
              optionStore.selectedOptions.some(
                (opt) => opt.id == option.categoryId
              )
                ? 'bg-blue-400 text-white border-blue-400'
                : 'border-gray-300 hover:bg-blue-50 hover:text-blue-500',
            ]"
            @click="
              optionStore.addOption(option.categoryId, option.categoryName)
            "
          >
            <span class="flex items-center gap-1">
              <span>{{ option.categoryName }}</span>
            </span>
            <img :src="option.categoryImg" alt="" />
          </div>
        </template>
        <template v-else>
          <div
            v-for="category in categories"
            :key="category.categoryId"
            :class="[
              'border p-4 rounded-lg cursor-pointer transition-all duration-200',
              optionStore.selectedOptions.some(
                (opt) => opt.id == category.categoryId
              )
                ? 'bg-blue-400 text-white border-blue-400'
                : 'border-gray-300 hover:bg-blue-50 hover:text-blue-500',
            ]"
            @click="
              optionStore.addOption(category.categoryId, category.categoryName)
            "
          >
            <span class="flex items-center gap-1">
              <span>{{ category.categoryName }}</span>
            </span>
            <img :src="option.categoryImg" alt="" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useOptionStore } from "../../stores/optionStore";
import { getOptions, getCategories } from "@/api/region";
import { useI18n } from "vue-i18n";
import { translateWithChatGPT } from "@/api/translate";

const { t } = useI18n(); // 번역 함수 추가
const optionStore = useOptionStore();
const options = ref([]);
const categories = ref([]);
// OPTION = 편의 / CATEGORY = 활동유형
const selectorMenu = ref("OPTION");

// 옵션 데이터 번역
const translateOptions = async (options) => {
  for (const option of options) {
    option.categoryName = await translateWithChatGPT(option.categoryName);
  }
};

// 카테고리 데이터 번역
const translateCategories = async (categories) => {
  for (const category of categories) {
    category.categoryName = await translateWithChatGPT(category.categoryName);
  }
};

onMounted(async () => {
  // 데이터 가져오기
  options.value = await getOptions();
  categories.value = await getCategories();

  // 데이터 번역
  await translateOptions(options.value);
  await translateCategories(categories.value);
});
</script>

<style scoped>
.material-icons {
  font-size: 16px;
  vertical-align: middle;
}
</style>
