<script setup>
import { iconValidator } from "@/helpers/validators";
import { defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
    validator: iconValidator
  }
});

const icon = defineAsyncComponent(() => import(`@/assets/icons/${props.name}.svg`));
</script>

<template>
  <component :is="icon" />
</template>
