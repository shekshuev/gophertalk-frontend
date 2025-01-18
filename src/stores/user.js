import { performLogin, performRegister } from "@/services/auth";
import { getUserById } from "@/services/user";
import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useUserStore = defineStore("user", () => {
  const accessToken = ref(null);
  const me = ref(null);
  const isLoggedIn = computed(() => !!accessToken.value);
  const tokenPayload = computed(() => {
    if (isLoggedIn.value) {
      return jwtDecode(accessToken.value);
    } else {
      return null;
    }
  });
  const id = computed(() => tokenPayload.value?.sub);

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

  function logout() {
    accessToken.value = null;
  }

  watch(id, newVal => {
    if (newVal) {
      getUserById(newVal, accessToken.value).then(result => {
        me.value = result;
      });
    }
  });

  return { isLoggedIn, register, login, logout, me, accessToken };
});
