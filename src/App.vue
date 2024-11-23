<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/header/Header.vue";
import ChatButton from "./components/chatting/ChatButton.vue";
</script>

<template>
  <Header />
  <ChatButton />
  <RouterView />
</template>

<style scoped></style>
