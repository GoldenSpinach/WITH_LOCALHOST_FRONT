<template>
  <div class="w-full h-full box-border pt-[25px]">
    <h1 class="text-4xl">내 패키지</h1>
    <div class="border w-full my-[15px]"></div>
    <div class="w-full h-[505px] overflow-y-auto">
      <div>
        <div class="w-1/2 border h-[200px] rounded-lg flex relative">
          <img
            class="h-full w-1/3"
            src="@/assets/images/default.png"
            alt="패키지사진"
          />
          <div class="w-2/3 flex flex-col">
            <h3 class="w-full block box-border p-[5px] text-lg truncate">
              해병대와함께해asdfasdfasdfasdfsadfsaas
            </h3>
            <div class="flex items-center justify-start w-full mt-[5px]">
              <img src="@/assets/images/star.svg" alt="" /><span
                class="text-center"
                >3.24</span
              >
            </div>
            <img
              class="w-[24px] self-end mt-[98px] me-[10px] cursor-pointer"
              src="@/assets/images/option.svg"
              alt="패키지설정"
              @click="clickToggle"
            />
          </div>
          <div
            class="w-[150px] border border-zinc-300 absolute end-0 bottom-[-85px] rounded-lg shadow-xl bg-white z-50"
            v-if="isToggled"
          >
            <ul class="flex flex-col">
              <RouterLink
                to="/mypage"
                class="hover:bg-slate-200 p-[10px] cursor-pointer"
                >수정</RouterLink
              >
              <li class="hover:bg-slate-200 p-[10px] cursor-pointer">삭제</li>
            </ul>
          </div>
        </div>
      </div>
      <RouterLink to="/tour/add">
        <img
          class="w-1/2 box-border p-[20px] cursor-pointer h-[200px]"
          src="@/assets/images/add.svg"
          alt=""
        />
      </RouterLink>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const isToggled = ref(false);

const clickToggle = () => {
  isToggled.value = !isToggled.value;
};
const handleClickOutside = (event) => {
  const target = event.target;
  if (target.closest(".relative") !== null) {
    return;
  }

  isToggled.value = false;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<style></style>
