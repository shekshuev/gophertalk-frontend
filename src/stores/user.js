import { performLogin, performRegister } from "@/services/auth";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const accessToken = ref(null);
  const isLoggedIn = computed(() => !!accessToken.value);

  function register(payload) {
    performRegister(payload).then(result => {
      accessToken.value = result.access_token;
    });
  }

  function login(payload) {
    performLogin(payload).then(result => {
      accessToken.value = result.access_token;
    });
  }

  return { isLoggedIn, register, login };
});
