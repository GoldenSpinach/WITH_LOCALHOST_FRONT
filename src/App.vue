<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import Header from "@/components/header/Header.vue";
import ChatButton from "./components/chatting/ChatButton.vue";
import { requestNotificationPermission } from "@/api/fcm";

// onMounted(() => {
//   requestNotificationPermission();
// });
</script>

<template>
  <div class="bg-neutral-50">
    <Header />
    <button @click="requestNotificationPermission">
      oerqhguoqheorgoieqrogoerq
    </button>
    <ChatButton />
    <RouterView />
  </div>
</template>

<style scoped></style>
