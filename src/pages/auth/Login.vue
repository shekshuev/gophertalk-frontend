<script lang="js" setup>
import { useUserStore } from "@/stores/user";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { object, string } from "yup";

const { t } = useI18n();

const userStore = useUserStore();

const { errors, handleSubmit, defineField } = useForm({
  initialValues: {
    userName: "",
    password: ""
  },
  validationSchema: object({
    userName: string().required(t("pages.auth.errors.userNameIsRequired")),
    password: string().required(t("pages.auth.errors.passwordIsRequired"))
  })
});

const [userName, userNameAttrs] = defineField("userName");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit(values => {
  userStore.login(values);
});
</script>

<template>
  <form class="card" @submit.prevent="onSubmit">
    <GTextInput
      class="mb-4"
      :label="t('pages.auth.userName')"
      v-model="userName"
      v-bind="userNameAttrs"
      :error="errors.userName"
    />
    <GTextInput
      class="mb-9"
      type="password"
      :label="t('pages.auth.password')"
      v-model="password"
      v-bind="passwordAttrs"
      :error="errors.password"
    />
    <GButton type="submit">{{ t("pages.auth.login") }}</GButton>
    <div class="no-account text-regular mt-7">
      {{ t("pages.auth.noAccount") }}
      <router-link :to="{ name: 'register' }" class="text-medium">{{
        t("pages.auth.signUp")
      }}</router-link>
    </div>
  </form>
</template>

<style lang="css" scoped>
.card {
  border: 1px solid var(--neutral-white-300);
  background: var(--neutral-white-900);
  padding: 64px 32px;
  border-radius: 8px;
  max-height: max-content;
}

.no-account {
  color: var(--neutral-black-600);
}

.no-account a {
  color: var(--neutral-black-800);
  text-decoration: none;
  cursor: pointer;
}
</style>
