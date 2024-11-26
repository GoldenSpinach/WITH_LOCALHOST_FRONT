import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useChatStore = defineStore("chatting", () => {
  const isToggled = ref(false);
  const isChatBoxToggled = computed(() => isToggled.value);
  const toggleChat = () => {
    isToggled.value = !isToggled.value;
  };

  return { isChatBoxToggled, toggleChat };
});
