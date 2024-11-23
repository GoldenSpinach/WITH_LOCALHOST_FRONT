<template>
  <div
    v-if="isChatBoxToggled"
    class="w-3/4 max-w-[1150px] h-[1000px] bg-slate-100 rounded-md fixed shadow-2xl end-[25px] bottom-[100px] z-50 flex"
  >
    <div class="w-1/4 h-full">
      <span class="text-xl">채팅 목록</span>
      <div
        class="flex flex-col gap-[10px] p-[15px] cursor-pointer hover:bg-slate-300"
      >
        <span class="text-2xl">사람이름</span>
        <span class="ms-[5px]">채팅내용</span>
      </div>
    </div>
    <div class="w-3/4 h-full flex flex-col justify-end flex-wrap border-s">
      <div>
        <div class="w-contet">
          <span class="ps-[15px] pe-[15px] bg-white text-4xl">대화</span>
        </div>
        <div class="w-content text-end flex justify-end">
          <span class="ps-[15px] pe-[15px] bg-white text-4xl"
            >eoghkasdfkjasldf</span
          >
        </div>
      </div>
      <div class="flex w-full">
        <input
          class="py-[15px] px-[20px] w-[90%] rounded-md"
          type="text"
          placeholder="asdf"
        />
        <img
          class="w-[10%] cursor-pointer"
          src="@/assets/images/up_arrow.svg"
          alt=""
        />
      </div>
    </div>
  </div>
  <div class="fixed bottom-[15px] right-[15px] cursor-pointer">
    <img
      class="w-[75px] cursor-pointer"
      src="@/assets/images/chat.svg"
      alt="채팅"
      @click="isChatBoxToggled = !isChatBoxToggled"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";

const isChatBoxToggled = ref(false);
</script>
<style></style>
