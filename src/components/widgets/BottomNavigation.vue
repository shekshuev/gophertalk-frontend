<script setup lang="js">
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();
</script>

<template>
  <dit class="bottom-navigation">
    <router-link
      :to="{ name: 'feed' }"
      class="bottom-navigation__link"
      :class="{ 'bottom-navigation__link_active': 'feed' === route.name }"
    >
      <GIcon name="home" />
    </router-link>
    <GIcon name="search" />
    <router-link
      :to="{ name: 'profile', params: { id: userStore.me.id } }"
      class="bottom-navigation__link"
      :class="{ 'bottom-navigation__link_active': 'profile' === route.name }"
    >
      <GIcon name="user" />
    </router-link>
  </dit>
</template>

<style scoped>
.bottom-navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.bottom-navigation__avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid var(--neutral-white-300);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--neutral-white-100);
}

.bottom-navigation__link {
  color: var(--neutral-black-300);
}

.bottom-navigation__link_active {
  color: var(--neutral-black-900);
}
</style>
