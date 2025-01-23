<script setup lang="js">
import BottomNavigation from "@/components/widgets/BottomNavigation.vue";
import Header from "@/components/widgets/Header.vue";
import Sidebar from "@/components/widgets/Sidebar.vue";
</script>

<template>
  <div class="header">
    <Header />
  </div>

  <main class="container">
    <div class="sidebar-wrapper">
      <Sidebar />
    </div>
    <div class="router-view__wrapper">
      <router-view></router-view>
    </div>
  </main>
  <div class="bottom-navigation__wrapper">
    <BottomNavigation />
  </div>
</template>

<style lang="css" scoped>
.header {
  border-bottom: 1px solid var(--neutral-white-300);
  background: var(--neutral-white-900);
  height: 80px;
}
main.container {
  padding: 40px 0;
}

.sidebar-wrapper {
  grid-column: span 3;
}

.router-view__wrapper {
  grid-column: span 9;
  max-height: calc(100vh - 80px - 80px);
  height: calc(100vh - 80px - 80px);
}

.bottom-navigation__wrapper {
  height: 72px;
  display: none;
}

@media screen and (max-width: 936px) {
  .sidebar-wrapper {
    display: none;
  }
  .bottom-navigation__wrapper {
    display: block;
  }

  .router-view__wrapper {
    grid-column: span 9;
    max-height: calc(100vh - 80px - 20px - 72px);
    height: calc(100vh - 80px - 20px - 72px);
  }

  main.container {
    padding: 10px 0;
  }
}
</style>
