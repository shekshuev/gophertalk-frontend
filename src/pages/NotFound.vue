<script setup lang="js">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="not-found">
    <h1 class="h1">404</h1>
    <h5 class="h5">{{ t("pages.notFound.title") }}</h5>
    <p class="text-medium">{{ t("pages.notFound.message") }}</p>
  </div>
</template>

<style lang="css" scoped>
.not-found {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.not-found {
  color: var(--neutral-black-600);
}
</style>
