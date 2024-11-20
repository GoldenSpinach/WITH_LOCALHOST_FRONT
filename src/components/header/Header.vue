<template>
  <header class="flex h-[100px] items-center justify-between px-[40px]">
    <RouterLink to="/" class="w-[100px] h-[50px] bg-sky-500 rounded">
      <img class="w-[100px] h-[50px]" src="@/assets/images/logo.png" alt="" />
    </RouterLink>
    <form
      :class="[
        'flex w-3/4 px-[50px] max-w-[1167px] h-[70px] items-center gap-4 p-4 rounded-full shadow-lg border border-gray-200 relative transition-all duration-500',
        isHome ? 'mt-[550px]' : 'mt-0',
      ]"
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
            readonly
            :value="selectedOptions.regionName"
            @click="toggleAreaDropdown"
          />
        </div>
        <AreaSelector
          v-if="isAreaSelectorToggled"
          class="absolute z-50 top-[75px] start-[35px]"
          @choose-area="addRegion"
          @choose-city="addcity"
          :selectedOption="selectedOptions"
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
          <div class="flex gap-[6px]">
            <div class="flex gap-[6px] max-w-[340px] relative overflow-hidden">
              <div
                v-for="option in selectedOptions.options"
                :key="option.id"
                class="min-w-[100px] max-h-[36px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center"
                @click="deleteOption(option.id)"
              >
                {{ option.name }}
              </div>
            </div>
            <img
              class="w-[30px] cursor-pointer"
              src=" @/assets/images/add.svg"
              alt="설정추가"
              @click="toggleOptionDropdown"
            />
          </div>
          <OptionSelector
            v-if="isOptionSelectorToggled"
            class="absolute z-50 top-[75px] start-[15px]"
            :selectedOption="selectedOptions.options"
            @add-option="addOption"
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

<script setup>
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import { RouterLink, useRoute } from "vue-router";
import AreaSelector from "@/components/area/AreaSelector.vue";
import OptionSelector from "@/components/option/OptionSelector.vue";
const isLogin = ref(true);
const isToggled = ref(false);
const isAreaSelectorToggled = ref(false);
const isOptionSelectorToggled = ref(false);
const selectedOptions = ref({
  region: null,
  regionName: null,
  cities: [],
  extras: [],
  options: [],
});
const isHome = ref(false);
const route = useRoute();

watchEffect(() => {
  isHome.value = route.path === "/";
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
const addRegion = (regionId, regionName) => {
  selectedOptions.value.region = regionId;
  selectedOptions.value.regionName = regionName;
  console.log(selectedOptions.value);
};
const addcity = (cityId) => {
  if (selectedOptions.value.cities.includes(cityId)) {
    selectedOptions.value.cities = selectedOptions.value.cities.filter(
      (id) => id != cityId
    );
    return;
  }
  selectedOptions.value.cities.push(cityId);
};
const addOption = (id, name) => {
  const optionExists = selectedOptions.value.options.some(
    (opt) => opt.id === id
  );
  if (optionExists) {
    deleteOption(id);
    return;
  }
  selectedOptions.value.options.push({ id, name });
};
const deleteOption = (id) => {
  selectedOptions.value.options = selectedOptions.value.options.filter(
    (opt) => opt.id !== id
  );
};
watchEffect(() => {
  if (selectedOptions.value.region) {
    selectedOptions.value.cities = [];
    console.log("Region changed:", selectedOptions.value.region);
  }
});
// 문서 클릭 이벤트 핸들러
const handleClickOutside = (event) => {
  const target = event.target;

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
