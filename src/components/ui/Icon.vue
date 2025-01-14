<script setup>
import { defineAsyncComponent } from "vue";
import { iconValidator } from "@/helpers/validators";

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
  <component :is="icon" class="fill-current" />
</template>
