<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import Header from "@/components/header/Header.vue";
import ChatButton from "./components/chatting/ChatButton.vue";
import { requestNotificationPermission } from "@/api/fcm";
import { useMemberStore } from "./stores/member";
import { getMe } from "./api/member";
</script>

<template>
  <div class="bg-Neutral-50">
    <Header />
    <ChatButton />
    <RouterView />
  </div>
</template>

<style scoped></style>
