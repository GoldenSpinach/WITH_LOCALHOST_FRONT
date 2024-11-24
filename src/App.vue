<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import Header from "@/components/header/Header.vue";
import ChatButton from "./components/chatting/ChatButton.vue";
import { requestNotificationPermission } from "@/api/fcm";

onMounted(() => {
  requestNotificationPermission();
});
</script>

<template>
  <Header />
  <button @click="requestNotificationPermission">
    oerqhguoqheorgoieqrogoerq
  </button>
  <ChatButton />
  <RouterView />
</template>

<style scoped></style>
