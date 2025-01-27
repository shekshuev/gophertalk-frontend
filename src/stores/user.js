import { performLogin, performRegister } from "@/services/auth";
import { deleteUser, getUserById, updateUser } from "@/services/user";
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

  const initials = computed(() => {
    if (me.value) {
      return me.value.first_name[0].toUpperCase() + me.value.last_name[0].toUpperCase();
    } else {
      return "";
    }
  });

  function register(payload) {
    performRegister(payload).then(result => {
      accessToken.value = result.access_token;
    });
  }

  function update(payload) {
    updateUser(me.value.id, payload, accessToken.value).then(result => {
      me.value = result;
    });
  }

  function remove() {
    deleteUser(me.value.id, accessToken.value).then(result => {
      logout();
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

  return { isLoggedIn, register, login, logout, me, accessToken, initials, update, remove };
});
