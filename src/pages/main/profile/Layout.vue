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
  padding: 20px 0;
}

@media screen and (max-width: 936px) {
  .profile__wrapper {
    padding: 10px 0;
  }
}
</style>
