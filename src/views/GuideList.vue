<template>
  <div class="border-t">
    <!-- <div
      v-for="option in selectedOptions"
      :key="option.id"
      class="min-w-[100px] max-h-[36px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center"
      @click="deleteOption(option.id)"
    >
      {{ option.name }}
    </div> -->
    <div class="flex gap-[6px] ps-[15px] py-[15px] border-b">
      <div class="flex gap-[6px] w-3/4 overflow-hidden">
        <div
          class="min-w-[100px] max-h-[36px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center"
          @click="deleteOption(option.id)"
        >
          asdf
        </div>
        <div
          class="min-w-[100px] max-h-[36px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center"
          @click="deleteOption(option.id)"
        >
          asdf
        </div>
        <div
          class="min-w-[100px] max-h-[36px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center"
          @click="deleteOption(option.id)"
        >
          asdf
        </div>
        <img
          class="w-[30px] cursor-pointer"
          src=" @/assets/images/add.svg"
          alt="설정추가"
          @click="toggleOptionDropdown"
        />
      </div>
      <Map />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Map from "@/components/map/Map.vue";

const selectedOptions = ref([]);
</script>

<style></style>
