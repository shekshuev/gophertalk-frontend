<script setup lang="js">
const { post } = defineProps({
  post: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="post-card">
    <div class="post-card__header"></div>
    <div class="post-card__body text-regular">{{ post.text }}</div>
    <div class="post-card__footer"></div>
  </div>
</template>

<style scoped>
.post-card {
  border-radius: 8px;
  border: 1px solid var(--neutral-white-300);
  background: var(--neutral-white-900);
  padding: 24px 32px;
  display: grid;
  gap: 24px;
}
</style>
