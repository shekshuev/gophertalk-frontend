<script setup lang="js">
import { useUserStore } from "@/stores/user";
import { useI18n } from "vue-i18n";

const userStore = useUserStore();
const { t } = useI18n();
</script>

<template>
  <div class="profile-header">
    <div class="profile-header__profile-info">
      <div class="profile-header__personal-info">
        <div class="profile-header__avatar h1">{{ userStore.initials }}</div>
        <div class="profile-header__name">
          <h4 class="h4">
            {{ userStore.me ? userStore.me.first_name + " " + userStore.me.last_name : "" }}
          </h4>
          <p class="label-regular">{{ userStore.me ? userStore.me.user_name : "" }}</p>
        </div>
      </div>
    </div>
    <div class="profile-header__links">
      <router-link
        class="profile-header__link"
        :to="{ name: 'my-posts', params: { id: userStore.me?.id || 0 } }"
      >
        {{ t("widgets.profileHeader.myPosts") }}
      </router-link>
      <router-link class="profile-header__link" :to="{ name: 'settings' }">
        {{ t("widgets.profileHeader.settings") }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.profile-header {
  border-radius: 8px;
  border: 1px solid var(--neutral-white-300);
  background: var(--neutral-white-900);
}

.profile-header__profile-info {
  border: none;
  border-bottom: 1px solid var(--neutral-white-300);
  padding: 32px 44px 40px 44px;
  display: flex;
  justify-content: space-between;
}

.profile-header__personal-info {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 24px;
  align-items: center;
}

.profile-header__avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 1px solid var(--neutral-white-300);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--neutral-white-100);
}

.profile-header__name {
  display: grid;
  gap: 12px;
}

.profile-header__name.h4 {
  color: var(--neutral-black-800);
}

.profile-header__links {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 20px 40px;
}

.profile-header__link {
  color: var(--neutral-black-600);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.profile-header__link:active,
.profile-header__link:hover,
.profile-header__active {
  color: var(--neutral-black-900);
}
</style>
