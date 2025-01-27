<script lang="js" setup>
import { computed } from "vue";
const { type } = defineProps({
  type: {
    type: String,
    default: "info",
    validator: value => ["success", "info", "error"].includes(value)
  }
});

const emit = defineEmits(["close"]);

const icon = computed(() => {
  switch (type.value) {
    case "success":
      return "check";
    case "error":
      return "alert";
    default:
      return "info";
  }
});
</script>

<template>
  <div :class="`notification notification_${type}`">
    <GIcon :name="icon" />
    <slot />
    <GIcon name="x" class="notification__close" @click="$emit('close')" />
  </div>
</template>

<style lang="css" scoped>
.notification {
  min-height: 28px;
  width: 300px;
  min-width: unset;
  max-width: 300px;
  padding: 8px 16px;
  display: grid;
  gap: 24px;
  grid-template-columns: 16px 1fr 16px;
  border-radius: 4px;
  color: var(--neutral-white-900);
}

@media screen and (max-width: 576px) {
  .notification {
    min-width: 100%;
    width: 100%;
  }
}

.notification_error {
  background: var(--semantic-red-900);
}

.notification_success {
  background: var(--semantic-green-900);
}

.notification_info {
  background: var(--neutral-black-900);
}

.notification__close {
  cursor: pointer;
}
</style>
