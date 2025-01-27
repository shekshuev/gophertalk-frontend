<template>
  <div class="loader">
    <GIcon name="loader" class="loader__spinner" />
  </div>
</template>

<style lang="css" scoped>
.loader {
  display: grid;
  place-items: center;
  width: 100%;
}

.loader__spinner {
  animation: 1s linear 0s normal none infinite running rot;
}

@keyframes rot {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
