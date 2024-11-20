<template>
    <header class="flex h-[100px]  items-center justify-between px-[40px]">
        <RouterLink to="/" class="w-[100px] h-[50px] bg-sky-500 rounded">
            <img class="w-[100px] h-[50px]" src="@/assets/images/logo.png" alt="">
        </RouterLink>
        <div class="relative">
            <div class="flex gap-[15px] p-[10px] border border-zinc-300 rounded-full cursor-pointer"
                @click="toggleDropdown">
                <img src="@/assets/images/menu.svg" alt="메뉴">
                <img src="@/assets/images/default_profile_small.svg" alt="">
            </div>
            <div class="w-[150px] border border-zinc-300 rounded-lg absolute end-0 mt-[5px] shadow-xl" v-if="isToggled">
                <ul class="flex flex-col" v-if="isLogin">
                    <RouterLink to="/mypage" class="hover:bg-slate-200 p-[10px] cursor-pointer">MyPage</RouterLink>
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

<script setup lang='ts'>
import { onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";

const isLogin = ref(true)
const isToggled = ref(false)
const toggleDropdown = () => {
    isToggled.value = !isToggled.value;
};
// 문서 클릭 이벤트 핸들러
const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    // 드롭다운 영역 내에서 클릭 시 아무 동작 안함
    if (
        target.closest('.relative') !== null
    ) {
        return;
    }

    // 드롭다운 외부 클릭 시 드롭다운 닫기
    isToggled.value = false;
};

// 컴포넌트 마운트 시 이벤트 리스너 추가
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

// 컴포넌트 해제 시 이벤트 리스너 제거
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style></style>