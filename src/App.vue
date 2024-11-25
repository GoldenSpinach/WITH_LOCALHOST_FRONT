<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import Header from "@/components/header/Header.vue";
import ChatButton from "./components/chatting/ChatButton.vue";
import { useMemberStore } from "./stores/member";
// import { requestNotificationPermission } from "@/api/fcm";

// onMounted(() => {
//   requestNotificationPermission();
// });
const memberStore = useMemberStore();
const id = ref("")
const setId = () => {
  memberStore.setMember(id.value)
}
</script>

<template>
  <div class="bg-neutral-50">
    <Header />
    <input type="text" v-model="id" class="border w-[150px] h-[25px]">
    <button @click="setId">
      아이디변경하기
    </button>
    <ChatButton />
    <RouterView />
  </div>
</template>

<style scoped></style>
