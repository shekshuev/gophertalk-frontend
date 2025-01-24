<script setup lang="js">
import { useUserStore } from "@/stores/user";
import { useI18n } from "vue-i18n";
import GButton from "../ui/GButton.vue";

const { t } = useI18n();

const userStore = useUserStore();
</script>

<template>
  <div class="delete-account__wrapper">
    <h5 class="h5">{{ t("widgets.deleteAccount.title") }}</h5>
    <p class="text-regular">{{ t("widgets.deleteAccount.subtitle") }}</p>
    <GButton variant="secondary" @click="userStore.remove">{{
      t("widgets.deleteAccount.submit")
    }}</GButton>
  </div>
</template>

<style lang="css" scoped>
.delete-account__wrapper {
  display: grid;
  gap: 12px;
  color: var(--neutral-black-800);
}
</style>
