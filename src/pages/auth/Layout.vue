<template>
  <div class="container">
    <div class="router-view-wrapper">
      <div class="logo-wrapper">
        <Logo :width="48" :height="48" />
        <h4 class="h4">Gopher Talk</h4>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100dvh;
  max-height: 100dvh;
  overflow: hidden;
}
.router-view-wrapper {
  grid-column: 5 / span 4;
  display: grid;
  grid-template-rows: 200px 1fr;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

@media screen and (min-width: 577px) and (max-width: 936px) {
  .router-view-wrapper {
    grid-column: 2 / span 6;
  }
}

@media screen and (max-width: 576px) {
  .router-view-wrapper {
    grid-column: 1 / span 12;
  }
}
</style>
