import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useMemberStore = defineStore("counter", () => {
  const id = ref(null);
  const isMemberLogin = ref(false);
  const info = ref({});
  const memberId = computed(() => id.value);
  const isLogin = computed(() => isMemberLogin.value);
  const memberInfo = computed(() => info.value);

  const setInfo = (userInfo) => {
    info.value = userInfo;
  };

  const setMember = (uid) => {
    id.value = uid;
  };

  const reset = () => {
    id.value = null;
    isMemberLogin.value = false;
    info.value = ref({});
  };

  watch(id, () => {
    if (id.value !== null) {
      isMemberLogin.value = true;
    } else {
      isMemberLogin.value = false;
    }
  });
  return { memberId, isLogin, memberInfo, setMember, setInfo, reset };
});
