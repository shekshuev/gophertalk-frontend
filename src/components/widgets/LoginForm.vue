<script lang="js" setup>
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { object, string } from "yup";

const emit = defineEmits(["submit"]);

const { t } = useI18n();

const { errors, handleSubmit, defineField } = useForm({
  initialValues: {
    userName: "",
    password: ""
  },
  validationSchema: object({
    userName: string().required(t("errors.userNameIsRequired")),
    password: string().required(t("errors.passwordIsRequired"))
  })
});

const [userName, userNameAttrs] = defineField("userName");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit(values => {
  emit("submit", values);
});
</script>

<template>
  <form class="login__wrapper" @submit.prevent="onSubmit">
    <GTextInput
      :label="t('widgets.loginForm.userName')"
      v-model="userName"
      v-bind="userNameAttrs"
      :error="errors.userName"
    />
    <GTextInput
      type="password"
      :label="t('widgets.loginForm.password')"
      v-model="password"
      v-bind="passwordAttrs"
      :error="errors.password"
    />
    <GButton type="submit">{{ t("widgets.loginForm.login") }}</GButton>
  </form>
</template>

<style lang="css" scoped>
.login__wrapper {
  display: grid;
  gap: 24px;
}
</style>
