<script setup lang="js">
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const { t } = useI18n();
const route = useRoute();

const menu = computed(() => [
  {
    id: 1,
    title: t("pages.main.sidebar.home"),
    to: { name: "feed" },
    icon: "home"
  },
  {
    id: 2,
    title: t("pages.main.sidebar.profile"),
    to: { name: "profile", params: { id: userStore.me?.id || 0 } },
    icon: "user"
  }
]);
</script>

<template>
  <div class="sidebar">
    <img src="@/assets/images/cover.jpeg" alt="cover" class="sidebar__cover" />
    <div class="sidebar__avatar h4">{{ userStore.initials }}</div>
    <div class="sidebar__content">
      <div>
        <p class="text-medium">
          {{ userStore.me ? userStore.me.first_name + " " + userStore.me.last_name : "" }}
        </p>
        <p class="label-regular">{{ userStore.me ? userStore.me.user_name : "" }}</p>
      </div>
      <div class="sidebar__menu">
        <router-link
          class="sidebar__menu-item"
          :class="{ 'sidebar__menu-item_current': route.path.startsWith(`/${item.to.name}`) }"
          v-for="item in menu"
          :key="item.id"
          :to="item.to"
        >
          <GIcon :name="item.icon" />
          <p>{{ item.title }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.sidebar {
  border-radius: 8px;
  border: 1px solid var(--neutral-white-300);
  background: var(--neutral-white-900);
  overflow: hidden;
}

.sidebar__content {
  padding: 32px;
  display: grid;
  gap: 40px;
}

.sidebar__cover {
  width: 100%;
  height: 72px;
  object-fit: cover;
}

.sidebar__avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid var(--neutral-white-300);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--neutral-white-100);
  margin-top: -32px;
  margin-left: 32px;
  z-index: 10;
  position: relative;
}

.sidebar__menu {
  padding: 12px 0;
  display: grid;
  gap: 12px;
}

.sidebar__menu-item {
  cursor: pointer;
  text-decoration: none;
  display: grid;
  gap: 10px;
  grid-template-columns: 20px 1fr;
  align-items: center;
  color: var(--neutral-black-600);
  transition: color 0.2s ease;
}

.sidebar__menu-item_current {
  color: var(--neutral-black-900);
}

.sidebar__menu-item:hover,
.sidebar__menu-item:active {
  color: var(--neutral-black-900);
}
</style>
