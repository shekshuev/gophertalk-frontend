<script setup lang="js">
import { useUserStore } from "@/stores/user";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const { t } = useI18n();

const route = useRoute();

const userStore = useUserStore();
console.log(route);
</script>

<template>
  <div class="settings">
    <div class="settings__header">
      <h5 class="h5">{{ t("pages.settings.header") }}</h5>
    </div>
    <div class="settings__content">
      <div class="settings__sidebar">
        <router-link
          class="settings__sidebar-link"
          :class="{ 'settings__sidebar-link_active': route.name === 'general' }"
          :to="{ name: 'general', params: { id: userStore.me.id || 0 } }"
        >
          {{ t("pages.settings.general") }}
        </router-link>
        <router-link
          class="settings__sidebar-link"
          :class="{ 'settings__sidebar-link_active': route.name === 'account' }"
          :to="{ name: 'account', params: { id: userStore.me.id || 0 } }"
        >
          {{ t("pages.settings.account") }}
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="css" scoped>
.settings {
  border-radius: 8px;
  border: 1px solid var(--neutral-white-300);
  background: var(--neutral-white-900);
}

.settings__header {
  padding: 24px 40px;
  border-bottom: 1px solid var(--neutral-white-300);
}

.settings__content {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.settings__sidebar {
  display: grid;
  padding: 40px 0;
  border-right: 1px solid var(--neutral-white-300);
}

.settings__sidebar-link {
  padding: 10px 40px;
  transition: background 0.2s ease;
  color: var(--neutral-black-800);
  text-decoration: none;
  cursor: pointer;
}

.settings__sidebar-link_active,
.settings__sidebar-link:active,
.settings__sidebar-link:hover {
  background: var(--neutral-white-200);
}
</style>
