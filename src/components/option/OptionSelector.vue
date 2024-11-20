<template>
  <div
    class="w-[450px] border border-zinc-300 rounded-3xl mt-[5px] shadow-xl p-[20px] bg-white"
  >
    <div>
      <span class="text-lg font-bold mb-[8px] inline-block"> 지역</span>
      <div class="flex flex-wrap gap-[12px]">
        <div
          v-for="option in options"
          :key="option.categoryId"
          :class="[
            'border p-[5px] rounded-lg cursor-pointer',
            selectedOption.some((opt) => opt.id == option.categoryId)
              ? 'bg-blue-400 text-white'
              : 'hover:bg-blue-400 hover:text-white',
          ]"
          @click="clickOption(option.categoryId, option.categoryName)"
        >
          {{ option.categoryName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { dOption } from "@/dummy";
const emit = defineEmits(["addOption"]);
const props = defineProps({
  selectedOption: Array,
});
const options = ref(dOption);
const clickOption = (optionId, name) => {
  emit("addOption", optionId, name);
};
</script>

<style></style>
