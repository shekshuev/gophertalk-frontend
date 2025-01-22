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
  },
  withLabel: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <div class="g-textarea__wrapper" :class="class">
    <GLabel v-if="withLabel" :for="id" :label="label" />
    <div class="g-textarea">
      <textarea
        class="g-textarea__textarea"
        :class="{
          'g-textarea__textarea_error': error
        }"
        :id="id"
        :value="modelValue"
        :placeholder="label"
        rows="4"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <span class="g-textarea__error label-medium mt-1">{{ error }}</span>
  </div>
</template>
<style lang="css" scoped>
.g-textarea__wrapper {
  max-height: fit-content;
  display: block;
}

.g-textarea {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.g-textarea__textarea {
  height: 84px;
  resize: none;
  border-radius: 6px;
  border: 1px solid var(--neutral-white-400);
  padding: 9px 24px;
  outline: none;
  width: 100%;
}

.g-textarea__textarea_error {
  outline: 2px solid var(--semantic-red-900);
}

.g-textarea__textarea:focus {
  outline: 2px solid var(--neutral-black-400);
}

.g-textarea__error {
  color: var(--semantic-red-900);
}
</style>
