import { performLogin, performRegister } from "@/services/auth";
import { deleteUser, getUserById, updateUser } from "@/services/user";
import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
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

    const error = ref(null);
    const loading = ref(false);

    const initials = computed(() => {
      if (me.value) {
        return me.value.first_name[0].toUpperCase() + me.value.last_name[0].toUpperCase();
      } else {
        return "";
      }
    });

    function register(payload) {
      loading.value = true;
      error.value = null;
      performRegister(payload)
        .then(result => {
          accessToken.value = result.access_token;
        })
        .catch(err => {
          error.value = err?.message || "" + err;
        })
        .finally(() => {
          loading.value = false;
        });
    }

    function update(payload) {
      loading.value = true;
      error.value = null;
      updateUser(me.value.id, payload, accessToken.value)
        .then(result => {
          me.value = result;
        })
        .catch(err => {
          error.value = err?.message || "" + err;
        })
        .finally(() => {
          loading.value = false;
        });
    }

    function remove() {
      loading.value = true;
      error.value = null;
      deleteUser(me.value.id, accessToken.value)
        .then(() => {
          logout();
        })
        .catch(err => {
          error.value = err?.message || "" + err;
        })
        .finally(() => {
          loading.value = false;
        });
    }

    function login(payload) {
      loading.value = true;
      error.value = null;
      performLogin(payload)
        .then(result => {
          accessToken.value = result.access_token;
        })
        .catch(err => {
          error.value = err?.message || "" + err;
        })
        .finally(() => {
          loading.value = false;
        });
    }

    function logout() {
      accessToken.value = null;
    }

    watch(id, newVal => {
      if (newVal) {
        loading.value = true;
        error.value = null;
        getUserById(newVal, accessToken.value)
          .then(result => {
            me.value = result;
          })
          .catch(err => {
            error.value = err?.message || "" + err;
          })
          .finally(() => {
            loading.value = false;
          });
      }
    });

    return {
      isLoggedIn,
      register,
      login,
      logout,
      me,
      accessToken,
      initials,
      update,
      remove,
      error,
      loading
    };
  },
  {
    persist: {
      key: "user",
      storage: window.localStorage,
      paths: ["accessToken"]
    }
  }
);
