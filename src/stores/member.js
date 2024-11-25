import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMemberStore = defineStore("counter", () => {
  const id = ref("minji123");
  const isMemberLogin = ref(false);

  const memberId = computed(() => id.value);
  const isLogin = computed(() => isMemberLogin.value);

  return { memberId, isLogin };
});
