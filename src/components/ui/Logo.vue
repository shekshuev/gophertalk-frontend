<!--
Source: https://codepen.io/gmoonchild/pen/QGVONe
Автор: Giulia @gmoonchild
-->

<script setup>
defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <svg viewBox="0 0 153.34 153.34" :width="width" :height="height">
    <defs>
      <clipPath id="clipPath">
        <circle id="backgroundCircle" cx="76.67" cy="76.67" r="76.67" />
      </clipPath>
    </defs>
    <circle class="cls-1" cx="76.67" cy="76.67" r="76.67" />
    <g class="gopher-wrapper" clip-path="url(#clipPath)">
      <g class="gopher">
        <path
          class="cls-2"
          d="M124.53 136.53c.33-14.69-2.52-30.71-1.71-39.42 1-10.27 1.78-20.71.53-27.73-.68-3.86 12.2-4.78 7.95-13.53-3.65-7.52-12.56-.88-14.82-3.22-11.5-11.88-25.44-14.82-36.41-15.36h-6c-11 .27-24.91 3.48-36.41 15.36-2.27 2.34-11.17-4.3-14.82 3.22-4.25 8.75 8.63 9.67 7.95 13.53-1.24 7-.42 17.46.53 27.73.78 8.42-1.86 25.77-1.73 40 0 0 17.19 16.24 47.12 16.24 30.05-.01 47.82-16.82 47.82-16.82z"
        />
        <path
          class="cls-3"
          d="M96.17 61.18c-18.32 2.13-15.85 21.26-8.78 27.44 13.17 11.53 26.89 0 25.38-11.66-1.44-11.19-10.91-16.44-16.6-15.78z"
        />
        <g class="eye">
          <circle class="cls-4" cx="97.38" cy="77.64" r="6.28" />
          <circle class="cls-5" cx="95.73" cy="74.98" r="1.98" />
        </g>
        <path
          class="cls-6"
          d="M77.12 90.12c-8.77 1.3-11.9 3.83-11.23 7.81 1.09 6.48 21.82 5.75 22.43.33.52-4.68-7.79-8.65-11.2-8.14z"
        />
        <path
          class="cls-7 nose"
          d="M71.44 92.73c-1.49 5.4 11.91 4.58 11.58 1.1-.19-2-2-4.63-6.75-4.48-1.86.07-4.14.86-4.83 3.38z"
        />
        <path
          class="cls-3"
          d="M71.86 101.48c-.48.21-1.3 5.58 1.19 5.85 1.7.19 6.36.72 7.46 0 2.14-1.37 1.9-4.69.71-5.49-1.99-1.31-8.79-.62-9.36-.36zM57.96 61.18c18.32 2.13 15.85 21.26 8.78 27.44-13.17 11.53-26.89 0-25.38-11.66 1.45-11.19 10.91-16.44 16.6-15.78z"
        />
        <g class="eye">
          <circle class="cls-4" cx="56.75" cy="77.64" r="6.28" />
          <circle class="cls-5" cx="58.4" cy="74.98" r="1.98" />
        </g>
        <path
          class="cls-6"
          d="M123.8 133.87c6.06.05 3.05-12.88-.67-10.32-1.83 1.26-2.12 4.18-2.12 6.62-.01 1.4 1.08 3.7 2.79 3.7zM30.34 133.87c-6.06.05-3.05-12.88.67-10.32 1.83 1.26 2.12 4.18 2.12 6.62 0 1.4-1.09 3.7-2.79 3.7z"
        />
        <path
          class="cls-8"
          d="M121.05 57.18c-.32 1.17 1.17 1 1.73 4.54.2 1.29 4.92-1.91 3-4.29-1.57-1.95-4.42-1.4-4.73-.25zM33.08 57.18c.32 1.17-1.17 1-1.73 4.54-.2 1.29-4.92-1.91-3-4.29 1.57-1.95 4.42-1.4 4.73-.25z"
        />
      </g>
    </g>
  </svg>
</template>

<style scoped>
.container {
  width: 30%;
  margin: 20px auto;
}

.cls-1 {
  fill: #11485e;
}
.cls-2 {
  fill: #7fc2e2;
}
.cls-3 {
  fill: #d8d5d5;
}
.cls-4 {
  fill: #131413;
}
.cls-5 {
  fill: #fff;
}
.cls-6 {
  fill: #b28f82;
}
.cls-7 {
  fill: #231f20;
}
.cls-8 {
  fill: #418cbd;
}

.eye {
  animation: squeeze 2.4s infinite;
}
.nose {
  animation: nose 2s infinite ease;
}
.gopher {
  transform: translateY(120px);
  animation: start 0.8s forwards ease-in-out;
}

@keyframes start {
  100% {
    transform: translateY(0);
  }
}
@keyframes nose {
  80% {
    transform: none;
  }
  83% {
    transform: translateX(7.5px) scaleX(0.9);
  }
  90% {
    transform: none;
  }
  93% {
    transform: translateX(7.5px) scaleX(0.9);
  }
  100% {
    transform: none;
  }
}
@keyframes squeeze {
  90% {
    transform: none;
    animation-timing-function: ease-in;
  }
  93% {
    transform: translateY(70px) scaleY(0.1);
  }
  100% {
    animation-timing-function: ease-out;
  }
}
</style>
