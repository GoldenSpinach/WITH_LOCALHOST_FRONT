<template>
  <div class="border-t w-screen">
    <div class="flex gap-[6px] ps-[15px] py-[15px] border-b relative">
      <div class="flex gap-[6px] w-3/4">
        <div v-for="option in optionStore.selectedOptions" :key="option.id"
          class="box-border min-w-[100px] max-w-[200px] h-[30px] max-h-[34px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center whitespace-nowrap overflow-hidden text-ellipsis"
          @click="optionStore.deleteOption(option.id)">
          {{ option.name }}
        </div>
        <img class="w-[30px] min-w-[30px] cursor-pointer position-sticky" src=" @/assets/images/add.svg" alt="설정추가"
          @click="toggleOptionDropdown" />
      </div>

      <OptionSelector v-if="isOptionSelectorToggled" class="absolute z-50 top-[55px] start-[15px]" />
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
        </div>
      </div>
      <div class="h-[calc(100vh-165px)] w-1/2">
        <Map />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import Map from "@/components/map/Map.vue";
import { useOptionStore } from "../stores/optionStore";
import OptionSelector from "@/components/option/OptionSelector.vue";
const isOptionSelectorToggled = ref(false);
const optionStore = useOptionStore();
const toggleOptionDropdown = () => {
  isOptionSelectorToggled.value = !isOptionSelectorToggled.value;
};

const handleClickOutside = (event) => {
  const target = event.target;

  // 드롭다운 영역 내에서 클릭 시 아무 동작 안함
  console.log(target.closest(".relative"))
  if (target.closest(".relative") !== null) {
    return;
  }
  console.log('asdf')
  isOptionSelectorToggled.value = false;
};

// 컴포넌트 마운트 시 이벤트 리스너 추가
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// 컴포넌트 해제 시 이벤트 리스너 제거
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style></style>
