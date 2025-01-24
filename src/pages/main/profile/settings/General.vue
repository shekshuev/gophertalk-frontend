<script setup lang="js">
import PersonalDataForm from "@/components/widgets/PersonalDataForm.vue";
import { useUserStore } from "@/stores/user";
import { useI18n } from "vue-i18n";

const userStore = useUserStore();

const { t } = useI18n();

const onSubmit = values => {
  userStore.update(values);
};
</script>

<template>
  <PersonalDataForm :submit-button-text="t('pages.general.saveChanges')" @submit="onSubmit" />
</template>
