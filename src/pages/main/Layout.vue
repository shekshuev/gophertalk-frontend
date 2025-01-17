<script setup lang="js">
import Header from "@/components/widgets/Header.vue";
import Sidebar from "@/components/widgets/Sidebar.vue";
</script>

<template>
  <Header />
  <div class="container">
    <div class="sidebar-wrapper">
      <Sidebar />
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="css" scoped>
.container {
  padding: 40px 0;
}
.sidebar-wrapper {
  grid-column: span 3;
}
</style>
