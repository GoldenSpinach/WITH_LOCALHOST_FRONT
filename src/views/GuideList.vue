<template>
  <div class="border-t w-screen">
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
        <div class="min-w-[100px] max-h-[36px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center"
          @click="deleteOption(option.id)">
          asdf
        </div>
        <div class="min-w-[100px] max-h-[36px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center"
          @click="deleteOption(option.id)">
          asdf
        </div>
        <div class="min-w-[100px] max-h-[36px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center"
          @click="deleteOption(option.id)">
          asdf
        </div>
        <img class="w-[30px] cursor-pointer" src=" @/assets/images/add.svg" alt="설정추가" @click="toggleOptionDropdown" />
      </div>
    </div>
    <div class="flex">
      <div class="h-[calc(100vh-165px)] w-1/2 box-border p-[10px] overflow-y-auto">
        <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,300px))] gap-[10px] ">
          <div class="w-[300px] h-[500px] flex cursor-pointer">
            <div class="flex flex-col w-full h-[480px] min-h-[480px] justify-center items-center">
              <div class="rounded-md w-full h-full bg-black"></div>
              <div class="w-full flex flex-col">
                <div class="flex items-center justify-start w-full"><img src="@/assets/images/star.svg" alt=""><span
                    class="text-center">4.5</span>
                </div>
                <span class="inline-block w-[300px] overflow-hidden whitespace-nowrap text-ellipsis">해병대의 산악구보해병대의
                  산악구보해병대의 산악구보해병대의 산악구보해병대의 산악구보해병대의
                  산악구보</span>
                <span>&#8361; 58,000 </span>
              </div>
            </div>
          </div>
          <div class="w-[300px] h-[500px] flex cursor-pointer">
            <div class="flex flex-col w-full h-[480px] min-h-[480px] justify-center items-center">
              <div class="rounded-md w-full h-full bg-black"></div>
              <div class="w-full flex flex-col">
                <div class="flex items-center justify-start w-full"><img src="@/assets/images/star.svg" alt=""><span
                    class="text-center">4.5</span>
                </div>
                <span class="inline-block w-[300px] overflow-hidden whitespace-nowrap text-ellipsis">해병대의 산악구보해병대의
                  산악구보해병대의 산악구보해병대의 산악구보해병대의 산악구보해병대의
                  산악구보</span>
                <span>&#8361; 58,000 </span>
              </div>
            </div>
          </div>
          <div class="w-[300px] h-[500px] flex cursor-pointer">
            <div class="flex flex-col w-full h-[480px] min-h-[480px] justify-center items-center">
              <div class="rounded-md w-full h-full bg-black"></div>
              <div class="w-full flex flex-col">
                <div class="flex items-center justify-start w-full"><img src="@/assets/images/star.svg" alt=""><span
                    class="text-center">4.5</span>
                </div>
                <span class="inline-block w-[300px] overflow-hidden whitespace-nowrap text-ellipsis">해병대의 산악구보해병대의
                  산악구보해병대의 산악구보해병대의 산악구보해병대의 산악구보해병대의
                  산악구보</span>
                <span>&#8361; 58,000 </span>
              </div>
            </div>
          </div>
          <div class="w-[300px] h-[500px] flex cursor-pointer">
            <div class="flex flex-col w-full h-[480px] min-h-[480px] justify-center items-center">
              <div class="rounded-md w-full h-full bg-black"></div>
              <div class="w-full flex flex-col">
                <div class="flex items-center justify-start w-full"><img src="@/assets/images/star.svg" alt=""><span
                    class="text-center">4.5</span>
                </div>
                <span class="inline-block w-[300px] overflow-hidden whitespace-nowrap text-ellipsis">해병대의 산악구보해병대의
                  산악구보해병대의 산악구보해병대의 산악구보해병대의 산악구보해병대의
                  산악구보</span>
                <span>&#8361; 58,000 </span>
              </div>
            </div>
          </div>



          <!-- 다른 항목들도 동일하게 반복 -->
        </div>
      </div>
      <div class="h-[calc(100vh-165px)] w-1/2">
        <Map />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Map from "@/components/map/Map.vue";

const selectedOptions = ref([]);
</script>

<style></style>
