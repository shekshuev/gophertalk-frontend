<script setup lang="js">
defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: value => ["primary", "secondary", "rounded", "link"].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

defineEmits(["click"]);
</script>

<template>
  <button
    :class="{
      'g-button': true,
      'g-button_primary': variant === 'primary',
      'g-button_secondary': variant === 'secondary',
      'g-button_rounded': variant === 'rounded',
      'g-button_link': variant === 'link',
      disabled: disabled
    }"
    @click="$emit('click')"
    v-bind="$attrs"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.g-button {
  cursor: pointer;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 175%;
  border-radius: 6px;
  width: 100%;
  height: 44px;
  padding: 0 24px;
  transition: all 0.2s ease;
}

.g-button_primary {
  border: none;
  background: var(--neutral-black-900);
  color: var(--neutral-white-900);
}

.g-button_primary:hover {
  background: var(--neutral-black-800);
}

.g-button_primary:active {
  background: var(--neutral-black-900);
}

.g-button_primary.disabled,
.g-button_primary.disabled:hover,
.g-button_primary.disabled:active {
  cursor: not-allowed;
  background: var(--neutral-black-600);
}

.g-button_secondary {
  background: var(--neutral-white-900);
  border: 1px solid var(--neutral-black-900);
  color: var(--neutral-black-900);
}

.g-button_secondary:hover {
  border: 1px solid var(--neutral-black-400);
  color: var(--neutral-black-400);
}

.g-button_secondary:active {
  border: 1px solid var(--neutral-black-900);
  color: var(--neutral-black-900);
}

.g-button_secondary.disabled,
.g-button_secondary.disabled:hover,
.g-button_secondary.disabled:active {
  cursor: not-allowed;
  background: var(--neutral-white-900);
  color: var(--neutral-black-100);
  border: 1px solid var(--neutral-black-100);
}

.g-button_rounded {
  height: 32px;
  padding: 1px 20px;
  border-radius: 100px;
  border: none;
  background: var(--primary-900);
  color: var(--neutral-white-900);
}

.g-button_rounded:hover {
  background: var(--primary-800);
}

.g-button_rounded:active {
  background: var(--primary-900);
}

.g-button_rounded.disabled,
.g-button_rounded.disabled:hover,
.g-button_rounded.disabled:active {
  cursor: not-allowed;
  background: var(--primary-600);
}

.g-button_link {
  border: none;
  background: none;
  color: var(--neutral-black-900);
}

.g-button_link:hover {
  text-decoration: underline;
}

.g-button_link:active {
  text-decoration: underline;
}

.g-button_link.disabled,
.g-button_link.disabled:hover,
.g-button_link.disabled:active {
  cursor: not-allowed;
  color: var(--neutral-black-600);
}
</style>
