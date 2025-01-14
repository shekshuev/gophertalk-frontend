<script setup>
defineProps({
  for: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: "",
    required: true
  }
});
</script>

<template>
  <label :for="for" class="g-label text-regular">{{ label }}</label>
</template>

<style lang="css" scoped>
.g-label {
  color: var(--neutral-black-600);
}
</style>
