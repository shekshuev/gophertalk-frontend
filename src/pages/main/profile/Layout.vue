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
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow-y: auto;
  height: 100%;
}
</style>
