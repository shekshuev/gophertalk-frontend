<script lang="js" setup>
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { object, ref, string } from "yup";

const { t } = useI18n();

const MIN_USERNAME_LENGTH = 5;
const MAX_USERNAME_LENGTH = 30;
const MIN_FIRST_NAME_LENGTH = 1;
const MAX_FIRST_NAME_LENGTH = 30;
const MIN_LAST_NAME_LENGTH = 1;
const MAX_LAST_NAME_LENGTH = 30;

const { errors, handleSubmit, defineField } = useForm({
  initialValues: {
    userName: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: ""
  },
  validationSchema: object({
    userName: string()
      .required(t("pages.auth.errors.userNameIsRequired"))
      .min(
        MIN_USERNAME_LENGTH,
        t("pages.auth.errors.nameLength", {
          min: MIN_USERNAME_LENGTH,
          max: MAX_USERNAME_LENGTH
        })
      )
      .max(
        MAX_USERNAME_LENGTH,
        t("pages.auth.errors.nameLength", {
          min: MIN_USERNAME_LENGTH,
          max: MAX_USERNAME_LENGTH
        })
      )
      .matches(/^[a-zA-Z0-9_]+$/, t("pages.auth.errors.userNameAlphaNumericUnderscore"))
      .matches(/^[^0-9]/, t("pages.auth.errors.userNameStartsWithAlpha")),
    password: string()
      .required(t("pages.auth.errors.passwordIsRequired"))
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,30}$/,
        t("pages.auth.errors.passwordRule")
      ),
    passwordConfirm: string()
      .required(t("pages.auth.errors.userNameIsRequired"))
      .oneOf([ref("password")], t("pages.auth.errors.passwordMustMatch")),
    firstName: string()
      .required(t("pages.auth.errors.firstNameIsRequired"))
      .min(
        MIN_FIRST_NAME_LENGTH,
        t("pages.auth.errors.nameLength", {
          min: MIN_FIRST_NAME_LENGTH,
          max: MAX_FIRST_NAME_LENGTH
        })
      )
      .max(
        MAX_FIRST_NAME_LENGTH,
        t("pages.auth.errors.nameLength", {
          min: MIN_FIRST_NAME_LENGTH,
          max: MAX_FIRST_NAME_LENGTH
        })
      )
      .matches(/[\p{Letter}\p{Mark}]+/gu, t("pages.auth.errors.onlyUnicode")),
    lastName: string()
      .required(t("pages.auth.errors.lastNameIsRequired"))
      .min(
        MIN_LAST_NAME_LENGTH,
        t("pages.auth.errors.nameLength", {
          min: MIN_LAST_NAME_LENGTH,
          max: MAX_LAST_NAME_LENGTH
        })
      )
      .max(
        MAX_LAST_NAME_LENGTH,
        t("pages.auth.errors.nameLength", {
          min: MIN_LAST_NAME_LENGTH,
          max: MAX_LAST_NAME_LENGTH
        })
      )
      .matches(/[\p{Letter}\p{Mark}]+/gu, t("pages.auth.errors.onlyUnicode"))
  })
});

const [userName, userNameAttrs] = defineField("userName");
const [password, passwordAttrs] = defineField("password");
const [passwordConfirm, passwordConfirmAttrs] = defineField("passwordConfirm");
const [firstName, firstNameAttrs] = defineField("firstName");
const [lastName, lastNameAttrs] = defineField("lastName");

const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
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
      class="mb-4"
      type="password"
      :label="t('pages.auth.password')"
      v-model="password"
      v-bind="passwordAttrs"
      :error="errors.password"
    />
    <GTextInput
      class="mb-4"
      type="password"
      :label="t('pages.auth.passwordConfirm')"
      v-model="passwordConfirm"
      v-bind="passwordConfirmAttrs"
      :error="errors.passwordConfirm"
    />
    <GTextInput
      class="mb-4"
      :label="t('pages.auth.firstName')"
      v-model="firstName"
      v-bind="firstNameAttrs"
      :error="errors.firstName"
    />
    <GTextInput
      class="mb-4"
      :label="t('pages.auth.lastName')"
      v-model="lastName"
      v-bind="lastNameAttrs"
      :error="errors.lastName"
    />
    <GButton type="submit">{{ t("pages.auth.signUp") }}</GButton>
    <div class="no-account text-regular mt-7">
      {{ t("pages.auth.hasAccount") }}
      <router-link :to="{ name: 'login' }" class="text-medium">{{
        t("pages.auth.login")
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
