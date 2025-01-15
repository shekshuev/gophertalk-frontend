<script setup>
import { iconValidator } from "@/helpers/validators";
import { useId } from "vue";

const id = useId();

defineProps({
  prependIcon: {
    type: String,
    required: false,
    validator: iconValidator
  },
  appendIcon: {
    type: String,
    required: false,
    validator: iconValidator
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false,
    default: "text"
  },
  error: {
    type: String,
    required: false
  },
  class: {
    type: [String, Object],
    required: false,
    default: ""
  },
  modelValue: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="g-text-input__wrapper" :class="class">
    <GLabel :for="id" :label="label" />
    <div class="g-text-input">
      <input
        class="g-text-input__input"
        :class="{
          'g-text-input__input_error': error
        }"
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="label"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <span class="g-text-input__error label-medium mt-1">{{ error }}</span>
  </div>
</template>
<style lang="css" scoped>
.g-text-input__wrapper {
  max-height: fit-content;
  display: block;
}

.g-text-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.g-text-input__input {
  height: 44px;
  border-radius: 6px;
  border: 1px solid var(--neutral-white-400);
  padding: 9px 24px;
  outline: none;
  width: 100%;
}

.g-text-input__input_error {
  outline: 2px solid var(--semantic-red-900);
}

.g-text-input__input:focus {
  outline: 2px solid var(--neutral-black-400);
}

.g-text-input__error {
  color: var(--semantic-red-900);
}
</style>
