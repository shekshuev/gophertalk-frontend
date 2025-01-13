<script setup>
import { defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
    validator: value =>
      [
        "add",
        "alert",
        "bookmark",
        "check",
        "chevron-left",
        "comment",
        "email",
        "google",
        "grid",
        "home",
        "inbox",
        "info",
        "like",
        "media",
        "more",
        "notification",
        "paper",
        "search",
        "send",
        "settings",
        "upload",
        "user",
        "write",
        "x"
      ].includes(value)
  }
});

const icon = defineAsyncComponent(() => import(`@/assets/icons/${props.name}.svg`));
</script>

<template>
  <component :is="icon" class="fill-current" />
</template>
