<script lang="js" setup>
import LoginForm from "@/components/widgets/LoginForm.vue";
import { useUserStore } from "@/stores/user";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const userStore = useUserStore();

const onSubmit = values => {
  userStore.login(values);
};
</script>

<template>
  <div class="card">
    <LoginForm @submit="onSubmit" />
    <div class="no-account text-regular mt-7">
      {{ t("pages.auth.noAccount") }}
      <router-link :to="{ name: 'register' }" class="text-medium">{{
        t("pages.auth.signUp")
      }}</router-link>
    </div>
  </div>
</template>

<style lang="css" scoped>
.card {
  border: 1px solid var(--neutral-white-300);
  background: var(--neutral-white-900);
  padding: 64px 32px;
  border-radius: 8px;
  max-height: max-content;
}

.no-account {
  color: var(--neutral-black-600);
  text-align: center;
}

.no-account a {
  color: var(--neutral-black-800);
  text-decoration: none;
  cursor: pointer;
}
</style>
