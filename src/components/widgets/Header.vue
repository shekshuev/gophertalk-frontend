<script setup lang="js">
import { usePostStore } from "@/stores/post";
import { useUserStore } from "@/stores/user";
import { debounce } from "lodash";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();

const userStore = useUserStore();
const postStore = usePostStore();
const router = useRouter();

const search = ref("");

watch(
  search,
  debounce(newVal => postStore.setSearch(newVal), 500)
);

watch(
  () => userStore.isLoggedIn,
  newVal => {
    if (!newVal) {
      router.push({ name: "auth" });
    }
  },
  {
    immediate: true
  }
);
</script>

<template>
  <div class="container">
    <router-link :to="{ name: 'feed' }" class="logo-wrapper">
      <Logo :height="40" :width="40" />
      <h4 class="h4">Gopher Talk</h4>
    </router-link>
    <div class="search-wrapper">
      <GTextInput
        class="search"
        type="text"
        :with-label="false"
        :label="t('pages.main.header.search')"
        v-model="search"
      />
    </div>
    <div class="logout-wrapper">
      <GButton variant="link" @click="userStore.logout">
        <div class="logout-button__content">
          {{ t("pages.main.header.logout") }}
          <GIcon name="user" />
        </div>
      </GButton>
    </div>
  </div>
</template>

<style scoped>
.container {
  align-items: center;
  height: 100%;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  grid-column: span 3;
  gap: 12px;
  text-decoration: none;
  color: var(--neutral-black-900);
}

.search-wrapper {
  grid-column: span 6;
  height: 100%;
  display: flex;
  align-items: center;
}

.search {
  width: 100%;
}

.logout-wrapper {
  grid-column: span 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.logout-button__content {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}
</style>
