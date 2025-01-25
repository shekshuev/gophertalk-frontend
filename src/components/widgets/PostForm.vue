<script setup lang="js">
import { usePostStore } from "@/stores/post";
import { useUserStore } from "@/stores/user";
import { useForm } from "vee-validate";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { object, string } from "yup";

const { post, replyToId } = defineProps({
  post: {
    type: Object,
    required: false
  },
  replyToId: {
    type: Number,
    required: false
  }
});

const { t } = useI18n();

const userStore = useUserStore();
const postStore = usePostStore();

const nested = computed(() => replyToId > 0);

const { errors, handleSubmit, defineField, resetForm } = useForm({
  initialValues: {
    text: ""
  },
  validationSchema: object({
    text: string()
      .max(280, t("widgets.postForm.maxLength"))
      .required(t("widgets.postForm.required"))
  })
});

const [text, textAttrs] = defineField("text");

const onSubmit = handleSubmit(values => {
  postStore.post({ ...values, replyToId }, post).then(() => resetForm());
});
</script>

<template>
  <form class="post-form" :class="{ 'post-form_nested': nested }" @submit.prevent="onSubmit">
    <div class="post-form__body">
      <div class="post-form__avatar">{{ userStore.initials }}</div>
      <GTextArea
        :with-label="false"
        :label="nested ? t('widgets.postForm.replyText') : t('widgets.postForm.text')"
        v-model="text"
        v-bind="textAttrs"
        :error="errors.text"
      />
    </div>
    <div class="post-form__actions">
      <GButton type="submit" variant="rounded">
        {{ nested ? t("widgets.postForm.reply") : t("widgets.postForm.post") }}
      </GButton>
    </div>
  </form>
</template>

<style scoped>
.post-form {
  border-radius: 8px;
  border: 1px solid var(--neutral-white-300);
  background: var(--neutral-white-900);
  display: grid;
  gap: 16px;
  padding: 24px 32px;
  max-height: min-content;
}

.post-form_nested {
  padding: 0;
  padding-top: 2px;
  border: none;
}

.post-form__body {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
}

.post-form__actions {
  display: flex;
  justify-content: flex-end;
}

.post-form__actions button {
  max-width: max-content;
}

.post-form__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--neutral-white-300);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--neutral-white-100);
}

@media screen and (max-width: 576px) {
  .post-form {
    border-radius: 0;
    border: none;
  }
}
</style>
