<script lang="js" setup>
import { useForm } from "vee-validate";
import { object, string } from "yup";

const { errors, handleSubmit, defineField } = useForm({
  initialValues: {
    username: "",
    password: ""
  },
  validationSchema: object({
    username: string().required("Username is required"),
    password: string().required("Password is required")
  })
});

const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
});
</script>

<template>
  <form class="card" @submit.prevent="onSubmit">
    <GTextInput
      class="mb-4"
      :label="$t('pages.auth.username')"
      v-model="username"
      v-bind="usernameAttrs"
      :error="errors.username"
    />
    <GTextInput
      class="mb-9"
      type="password"
      :label="$t('pages.auth.password')"
      v-model="password"
      v-bind="passwordAttrs"
      :error="errors.password"
    />
    <GButton type="submit" :disabled="true">{{ $t("pages.auth.login") }}</GButton>
    <div class="no-account text-regular mt-7">
      {{ $t("pages.auth.noAccount") }}
      <router-link :to="{ name: 'register' }" class="text-medium">{{
        $t("pages.auth.signUp")
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
