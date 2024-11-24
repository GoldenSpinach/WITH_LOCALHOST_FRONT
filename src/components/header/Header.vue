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
      <div class="flex w-full">
        <div class="flex flex-col w-1/6 mt-[3px]">
          <label for="local" class="text-xs text-zinc-400 mb-[5px]">
            {{ t("지역") }}
          </label>
          <input
            type="text"
            id="local"
            :placeholder="t('지역 검색')"
            class="pe-4 pb-2 w-32 rounded-md focus:outline-none focus:border-blue-500"
            relative
            readonly
            :value="optionStore.regionName"
            @click="toggleAreaDropdown"
          />
        </div>
        <AreaSelector
          v-if="isAreaSelectorToggled"
          class="absolute z-50 top-[75px] start-[35px]"
        />
        <div class="flex flex-col mt-[3px] w-1/6">
          <label for="local" class="text-xs text-zinc-400 mb-[5px]">
            {{ t("출발") }}
          </label>
          <input
            type="date"
            class="pe-4 pb-2 rounded-md focus:outline-none focus:border-blue-500"
            v-model="optionStore.startDate"
          />
        </div>
        <div class="flex flex-col mt-[3px] w-1/6">
          <label for="local" class="text-xs text-zinc-400 mb-[5px]">
            {{ t("종료") }}
          </label>
          <input
            type="date"
            class="pe-4 pb-2 rounded-md focus:outline-none focus:border-blue-500"
            v-model="optionStore.endDate"
          />
        </div>
        <div class="flex flex-col mt-[3px] relative w-[47%]">
          <label for="local" class="text-xs text-zinc-400 mb-[3px]">
            {{ t("추가옵션") }}
          </label>
          <div class="flex gap-[6px] w-full">
            <div class="flex gap-[6px] relative overflow-hidden">
              <div
                v-for="option in optionStore.selectedOptions"
                :key="option.id"
                class="box-border min-w-[100px] max-w-[200px] h-[30px] max-h-[34px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center whitespace-nowrap overflow-hidden text-ellipsis"
                @click="optionStore.deleteOption(option.id)"
              >
                {{ option.name }}
              </div>
            </div>
            <img
              class="w-[30px] min-w-[30px] cursor-pointer"
              src=" @/assets/images/add.svg"
              alt="설정추가"
              @click="toggleOptionDropdown"
            />
          </div>
          <OptionSelector
            v-if="isOptionSelectorToggled"
            class="absolute z-50 top-[75px] start-[15px]"
          />
        </div>
      </div>
      <RouterLink to="/guide" class="ml-4 absolute end-[40px] block">
        <img
          src="@/assets/images/search.svg"
          :alt="t('검색')"
          class="w-6 h-6"
        />
      </RouterLink>
    </form>
    <div class="relative">
      <div
        class="flex gap-[15px] p-[10px] border border-zinc-300 rounded-full cursor-pointer"
        @click="toggleDropdown"
      >
        <img src="@/assets/images/menu.svg" :alt="t('메뉴')" />
        <img
          src="@/assets/images/default_profile_small.svg"
          :alt="t('프로필')"
        />
      </div>
      <div
        class="w-[150px] border border-zinc-300 rounded-lg absolute end-0 mt-[5px] shadow-xl bg-white z-50"
        v-if="isToggled"
      >
        <ul class="flex flex-col" v-if="memberStore.isLogin">
          <RouterLink
            to="/mypage"
            class="hover:bg-slate-200 p-[10px] cursor-pointer block"
            >{{ t("프로필") }}</RouterLink
          >
          <li class="hover:bg-slate-200 p-[10px] cursor-pointer block">
            {{ t("로그아웃") }}
          </li>
        </ul>
        <ul class="flex flex-col" v-else>
          <RouterLink
            to="/signin"
            class="hover:bg-slate-200 p-[10px] cursor-pointer"
            >{{ t("로그인") }}</RouterLink
          >
          <RouterLink
            to="/register"
            class="hover:bg-slate-200 p-[10px] cursor-pointer"
            >{{ t("회원가입") }}</RouterLink
          >
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
import { RouterLink, useRoute } from "vue-router";
import AreaSelector from "@/components/area/AreaSelector.vue";
import OptionSelector from "@/components/option/OptionSelector.vue";
import { useOptionStore } from "@/stores/optionStore";
import { useMemberStore } from "@/stores/member";
import { useI18n } from "vue-i18n";

const memberStore = useMemberStore();
const isToggled = ref(false);
const isAreaSelectorToggled = ref(false);
const isOptionSelectorToggled = ref(false);
const isHome = ref(false);
const optionStore = useOptionStore();
const route = useRoute();
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

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style></style>
