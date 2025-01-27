<script setup lang="js">
import { useUserStore } from "@/stores/user";
import { computed, ref, useId, watchEffect } from "vue";

const userStore = useUserStore();

const userError = computed(() => userStore.error);

const activeNotifications = ref([]);

const onClose = id => {
  const idx = activeNotifications.value.findIndex(n => n.id === id);
  if (idx === -1) return;
  clearTimeout(activeNotifications.value[idx].timeout);
  activeNotifications.value.splice(idx, 1);
};

watchEffect(() => {
  if (userError.value && typeof userError.value === "string") {
    const id = useId();
    activeNotifications.value.push({
      id,
      type: "error",
      message: userError.value,
      timeout: setTimeout(() => onClose(id), 3000)
    });
  }
});
</script>

<template>
  <div class="notification-pool">
    <GNotification
      v-for="(notification, i) in activeNotifications"
      :key="i"
      :type="notification.type"
      class="notification-pool__notification"
      @click="() => onClose(notification.id)"
    >
      {{ notification.message }}
    </GNotification>
  </div>
</template>

<style scoped lang="css">
.notification-pool {
  position: fixed;
  bottom: 0;
  left: 50%;
  padding: 4px 4px;
  width: 0;
  overflow: visible;
  z-index: 999;
  display: grid;
  gap: 4px;
}

.notification-pool__notification {
  transform: translate(-50%);
}

@media screen and (max-width: 576px) {
  .notification-pool {
    min-width: 100%;
    width: 100%;

    left: 0;
  }

  .notification-pool__notification {
    transform: unset;
  }
}
</style>
