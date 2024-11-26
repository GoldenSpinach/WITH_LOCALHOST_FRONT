<template>
  <header class="flex h-[80px] items-center justify-between px-8 bg-white shadow-md border-b border-gray-200">
    <!-- 로고 -->
    <RouterLink to="/" class="flex items-center">
      <img class="w-[120px] h-auto" src="@/assets/images/logo.png" alt="서비스 로고" />
    </RouterLink>

    <!-- 검색창 -->
    <form :class="[
      'flex items-center w-full max-w-[800px] h-[60px] rounded-full border border-gray-300 shadow-sm px-6 bg-white transition-all duration-500',
      isHome ? 'mt-[700px]' : 'mt-0',
    ]" @submit.prevent>
      <div class="flex items-center gap-6 w-full">
        <!-- 지역 선택 -->
        <div class="flex flex-col w-[25%] relative">
          <label class="text-xs text-gray-500 mb-1">{{ t("지역") }}</label>
          <input type="text"
            class="w-full text-sm font-light bg-transparent focus:outline-none cursor-pointer border-b border-transparent focus:border-blue-500 pb-1"
            readonly :value="optionStore.regionName || t('지역 검색')" @click="toggleAreaDropdown" />
          <AreaSelector v-if="isAreaSelectorToggled"
            class="absolute z-50 top-[60px] left-0 w-[300%] border border-gray-200 bg-white shadow-md rounded-lg" />
        </div>

        <!-- 출발 날짜 -->
        <div class="flex flex-col w-[25%]">
          <label for="startDate" class="text-xs text-gray-500 mb-1">{{
            t("출발")
          }}</label>
          <input type="date" id="startDate"
            class="w-full text-sm font-light bg-transparent focus:outline-none border-b border-transparent focus:border-blue-500 pb-1"
            v-model="optionStore.startDate" />
        </div>

        <!-- 종료 날짜 -->
        <div class="flex flex-col w-[25%]">
          <label for="endDate" class="text-xs text-gray-500 mb-1">{{
            t("종료")
          }}</label>
          <input type="date" id="endDate"
            class="w-full text-sm font-light bg-transparent focus:outline-none border-b border-transparent focus:border-blue-500 pb-1"
            v-model="optionStore.endDate" />
        </div>

        <!-- 추가 옵션 -->
        <div class="flex flex-col w-[25%] relative">
          <label class="text-xs text-gray-500 mb-1">{{ t("추가옵션") }}</label>
          <div class="flex gap-2 items-center">
            <div class="flex items-center gap-2 overflow-hidden">
              <div v-for="option in optionStore.selectedOptions" :key="option.id"
                class="text-xs bg-blue-500 text-white px-3 py-1 rounded-full cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
                @click="optionStore.deleteOption(option.id)">
                {{ option.name }}
              </div>
            </div>
            <img src="@/assets/images/add.svg" alt="옵션 추가" class="w-[24px] cursor-pointer"
              @click="toggleOptionDropdown" />
          </div>
          <OptionSelector v-if="isOptionSelectorToggled"
            class="absolute z-50 top-[60px] left-0 w-[300%] border border-gray-200 bg-white shadow-md rounded-lg" />
        </div>
      </div>

      <!-- 검색 버튼 -->
      <button
        class="ml-4 bg-blue-500 text-white rounded-full p-3 flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
        @click="clickSearch">
        <img src="@/assets/images/search.svg" :alt="t('검색')" class="w-4 h-4 cursor-pointer" />
      </button>
    </form>

    <!-- 사용자 메뉴 -->
    <div class="relative">
      <div
        class="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-full cursor-pointer hover:shadow-md transition-shadow duration-300"
        @click="toggleDropdown">
        <img src="@/assets/images/menu.svg" :alt="t('메뉴')" />
        <img src="@/assets/images/default_profile_small.svg" :alt="t('프로필')" class="w-8 h-8 rounded-full" />
      </div>
      <div v-if="isToggled"
        class="w-[200px] border border-gray-300 rounded-lg absolute right-0 mt-2 shadow-xl bg-white z-50">
        <ul class="flex flex-col">
          <template v-if="memberStore.isLogin">
            <RouterLink to="/mypage" class="hover:bg-gray-100 p-3 cursor-pointer block">
              {{ t("프로필") }}
            </RouterLink>
            <li class="hover:bg-gray-100 p-3 cursor-pointer block" @click="userLogout">
              {{ t("로그아웃") }}
            </li>
          </template>
          <template v-else>
            <RouterLink to="/signin" class="hover:bg-gray-100 p-3 cursor-pointer block">
              {{ t("로그인") }}
            </RouterLink>
            <RouterLink to="/register" class="hover:bg-gray-100 p-3 cursor-pointer block">
              {{ t("회원가입") }}
            </RouterLink>
          </template>
        </ul>
      </div>
    </div>
  </header>
  <div>
    <button @click="setLanguage('ko')">한국어</button>
    <button @click="setLanguage('en')">English</button>
    <button @click="setLanguage('ja')">日本語</button>
    <button @click="setLanguage('zh-CN')">中文(简体)</button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import AreaSelector from "@/components/area/AreaSelector.vue";
import OptionSelector from "@/components/option/OptionSelector.vue";
import { useOptionStore } from "@/stores/optionStore";
import { useMemberStore } from "@/stores/member";
import { useI18n } from "vue-i18n";
import { logout } from "../../api/member";

const memberStore = useMemberStore();
const isToggled = ref(false);
const isAreaSelectorToggled = ref(false);
const isOptionSelectorToggled = ref(false);
const isHome = ref(false);
const optionStore = useOptionStore();
const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n(); // Composition API 방식

const setLanguage = (lang) => {
  locale.value = lang; // 언어 변경
};
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

const handleClickOutside = (event) => {
  const target = event.target;
  if (target.closest(".relative") !== null) {
    return;
  }

  isToggled.value = false;
  isAreaSelectorToggled.value = false;
  isOptionSelectorToggled.value = false;
};
const userLogout = async () => {
  const data = await logout();
  memberStore.reset();
  localStorage.removeItem("accessToken");
  toggleDropdown();
  router.push("/");
};

const clickSearch = () => {
  console.log("asdf")
  router.push("/guide");
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style></style>
