<script setup lang="js">
import ProfileHeader from "@/components/widgets/ProfileHeader.vue";
</script>

<template>
  <div class="profile__wrapper">
    <ProfileHeader />
    <router-view></router-view>
  </div>
</template>

<style lang="css" scoped>
.profile__wrapper {
  display: grid;
  gap: 32px;
}
</style>
