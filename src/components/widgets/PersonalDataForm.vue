<script lang="js" setup>
import { useUserStore } from "@/stores/user";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { object, ref, string } from "yup";

const { submitButtonText } = defineProps({
  submitButtonText: {
    type: String,
    required: true
  }
});

const emit = defineEmits(["submit"]);

const { t } = useI18n();

const userStore = useUserStore();

const MIN_USERNAME_LENGTH = 5;
const MAX_USERNAME_LENGTH = 30;
const MIN_FIRST_NAME_LENGTH = 1;
const MAX_FIRST_NAME_LENGTH = 30;
const MIN_LAST_NAME_LENGTH = 1;
const MAX_LAST_NAME_LENGTH = 30;

const { errors, handleSubmit, defineField } = useForm({
  initialValues: {
    userName: userStore.me?.user_name || "",
    password: "",
    passwordConfirm: "",
    firstName: userStore.me?.first_name || "",
    lastName: userStore.me?.last_name || ""
  },
  validationSchema: object({
    userName: string()
      .required(t("errors.userNameIsRequired"))
      .min(
        MIN_USERNAME_LENGTH,
        t("errors.nameLength", {
          min: MIN_USERNAME_LENGTH,
          max: MAX_USERNAME_LENGTH
        })
      )
      .max(
        MAX_USERNAME_LENGTH,
        t("errors.nameLength", {
          min: MIN_USERNAME_LENGTH,
          max: MAX_USERNAME_LENGTH
        })
      )
      .matches(/^[a-zA-Z0-9_]+$/, t("errors.userNameAlphaNumericUnderscore"))
      .matches(/^[^0-9]/, t("errors.userNameStartsWithAlpha")),
    password: string()
      .required(t("errors.passwordIsRequired"))
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,30}$/,
        t("errors.passwordRule")
      ),
    passwordConfirm: string()
      .required(t("errors.userNameIsRequired"))
      .oneOf([ref("password")], t("errors.passwordMustMatch")),
    firstName: string()
      .required(t("errors.firstNameIsRequired"))
      .min(
        MIN_FIRST_NAME_LENGTH,
        t("errors.nameLength", {
          min: MIN_FIRST_NAME_LENGTH,
          max: MAX_FIRST_NAME_LENGTH
        })
      )
      .max(
        MAX_FIRST_NAME_LENGTH,
        t("errors.nameLength", {
          min: MIN_FIRST_NAME_LENGTH,
          max: MAX_FIRST_NAME_LENGTH
        })
      )
      .matches(/[\p{Letter}\p{Mark}]+/gu, t("errors.onlyUnicode")),
    lastName: string()
      .required(t("errors.lastNameIsRequired"))
      .min(
        MIN_LAST_NAME_LENGTH,
        t("errors.nameLength", {
          min: MIN_LAST_NAME_LENGTH,
          max: MAX_LAST_NAME_LENGTH
        })
      )
      .max(
        MAX_LAST_NAME_LENGTH,
        t("errors.nameLength", {
          min: MIN_LAST_NAME_LENGTH,
          max: MAX_LAST_NAME_LENGTH
        })
      )
      .matches(/[\p{Letter}\p{Mark}]+/gu, t("errors.onlyUnicode"))
  })
});

const [userName, userNameAttrs] = defineField("userName");
const [password, passwordAttrs] = defineField("password");
const [passwordConfirm, passwordConfirmAttrs] = defineField("passwordConfirm");
const [firstName, firstNameAttrs] = defineField("firstName");
const [lastName, lastNameAttrs] = defineField("lastName");

const onSubmit = handleSubmit(values => {
  emit("submit", values);
});
</script>

<template>
  <form class="presonal-data__wrapper" @submit.prevent="onSubmit">
    <GTextInput
      :label="t('widgets.personalDataForm.userName')"
      v-model="userName"
      v-bind="userNameAttrs"
      :error="errors.userName"
    />
    <GTextInput
      type="password"
      :label="t('widgets.personalDataForm.password')"
      v-model="password"
      v-bind="passwordAttrs"
      :error="errors.password"
    />
    <GTextInput
      type="password"
      :label="t('widgets.personalDataForm.passwordConfirm')"
      v-model="passwordConfirm"
      v-bind="passwordConfirmAttrs"
      :error="errors.passwordConfirm"
    />
    <GTextInput
      :label="t('widgets.personalDataForm.firstName')"
      v-model="firstName"
      v-bind="firstNameAttrs"
      :error="errors.firstName"
    />
    <GTextInput
      :label="t('widgets.personalDataForm.lastName')"
      v-model="lastName"
      v-bind="lastNameAttrs"
      :error="errors.lastName"
    />
    <GButton type="submit">{{ submitButtonText }}</GButton>
  </form>
</template>

<style lang="css" scoped>
.presonal-data__wrapper {
  display: grid;
  gap: 24px;
}
</style>
