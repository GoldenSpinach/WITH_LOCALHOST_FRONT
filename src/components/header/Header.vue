<template>
  <header class="flex h-[100px] items-center justify-between px-[40px]">
    <RouterLink to="/" class="w-[100px] h-[50px] bg-sky-500 rounded">
      <img class="w-[100px] h-[50px]" src="@/assets/images/logo.png" alt="" />
    </RouterLink>
    <form
      class="flex w-3/4 px-[50px] max-w-[11670px] h-[70px] items-center gap-4 p-4 rounded-full shadow-lg border border-gray-200 relative"
    >
      <div class="flex">
        <div class="flex flex-col mt-[3px]">
          <label for="local" class="text-xs text-zinc-400 mb-[5px]">지역</label>
          <input
            type="text"
            id="local"
            placeholder="지역 검색"
            class="pe-4 pb-2 w-32 rounded-md focus:outline-none focus:border-blue-500"
            relative
            @click="toggleAreaDropdown"
          />
        </div>
        <AreaSelector
          v-if="isAreaSelectorToggled"
          class="absolute z-50 top-[75px] start-[35px]"
          @choose-area="addRegion"
          @choose-city="addcity"
          @selectedOptions="selectedOptions"
        />
        <div class="flex flex-col mt-[3px]">
          <label for="local" class="text-xs text-zinc-400 mb-[5px]">출발</label>
          <input
            type="date"
            class="pe-4 pb-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="flex flex-col mt-[3px]">
          <label for="local" class="text-xs text-zinc-400 mb-[5px]">종료</label>
          <input
            type="date"
            class="pe-4 pb-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="flex flex-col mt-[3px] relative">
          <label for="local" class="text-xs text-zinc-400 mb-[3px]"
            >추가 옵션</label
          >
          <div class="flex relative">
            <div class="flex gap-[6px]">
              <div
                class="min-w-[65px] max-h-[36px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center"
              >
                차량
              </div>
              <div
                class="min-w-[90px] max-h-[36px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center"
              >
                일본어
              </div>
              <div
                class="min-w-[65px] max-h-[36px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center"
              >
                영어
              </div>

              <img
                class="w-[30px] cursor-pointer"
                src=" @/assets/images/add.svg"
                alt="설정추가"
                @click="toggleOptionDropdown"
              />
            </div>
          </div>
          <OptionSelector
            v-if="isOptionSelectorToggled"
            class="absolute z-50 top-[75px] start-[15px]"
          />
        </div>
      </div>
      <button type="submit" class="ml-4 absolute end-[40px]">
        <img src="@/assets/images/search.svg" alt="검색" class="w-6 h-6" />
      </button>
    </form>
    <div class="relative">
      <div
        class="flex gap-[15px] p-[10px] border border-zinc-300 rounded-full cursor-pointer"
        @click="toggleDropdown"
      >
        <img src="@/assets/images/menu.svg" alt="메뉴" />
        <img src="@/assets/images/default_profile_small.svg" alt="" />
      </div>
      <div
        class="w-[150px] border border-zinc-300 rounded-lg absolute end-0 mt-[5px] shadow-xl"
        v-if="isToggled"
      >
        <ul class="flex flex-col" v-if="isLogin">
          <RouterLink
            to="/mypage"
            class="hover:bg-slate-200 p-[10px] cursor-pointer"
            >MyPage</RouterLink
          >
          <li class="hover:bg-slate-200 p-[10px] cursor-pointer">Sign Out</li>
        </ul>
        <ul v-else>
          <li class="hover:bg-slate-200 p-[10px] cursor-pointer">Sign in</li>
          <li class="hover:bg-slate-200 p-[10px] cursor-pointer">Join</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from "vue";
import { RouterLink } from "vue-router";
import AreaSelector from "@/components/area/AreaSelector.vue";
import OptionSelector from "@/components/option/OptionSelector.vue";
const isLogin = ref(true);
const isToggled = ref(false);
const isAreaSelectorToggled = ref(false);
const isOptionSelectorToggled = ref(false);
const selectedOptions: Ref<{
  region: number | null;
  cities: number[];
  extras: string[];
}> = ref({
  region: null,
  cities: [],
  extras: [],
});

const toggleAreaDropdown = () => {
  isAreaSelectorToggled.value = !isAreaSelectorToggled.value;
};
const toggleOptionDropdown = () => {
  isOptionSelectorToggled.value = !isOptionSelectorToggled.value;
};
const toggleDropdown = () => {
  isToggled.value = !isToggled.value;
};
const addRegion = (regionId: number) => {
  selectedOptions.value.region = regionId;
};
const addcity = (cityId: number) => {
  selectedOptions.value.cities.push(cityId);
};
// 문서 클릭 이벤트 핸들러
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  // 드롭다운 영역 내에서 클릭 시 아무 동작 안함
  if (target.closest(".relative") !== null) {
    return;
  }

  // 드롭다운 외부 클릭 시 드롭다운 닫기
  isToggled.value = false;
  isAreaSelectorToggled.value = false;
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
