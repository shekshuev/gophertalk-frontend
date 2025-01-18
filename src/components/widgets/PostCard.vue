<script setup lang="js">
import { shortenNumber } from "@/helpers/transformers";
import { computed, onMounted, watch } from "vue";

const { post } = defineProps({
  post: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["like", "dislike", "view"]);

const initials = computed(() => {
  if (post?.user) {
    return post.user.first_name[0].toUpperCase() + post.user.last_name[0].toUpperCase();
  } else {
    return "";
  }
});

const likes = computed(() => shortenNumber(post.likes_count));
const views = computed(() => shortenNumber(post.views_count));

function switchLike() {
  post.user_liked = !post.user_liked;
  post.likes_count += post.user_liked ? 1 : -1;
}

watch(
  () => post.likes_count,
  (newVal, oldVal) => {
    if (newVal > oldVal) {
      emit("like");
    } else if (newVal < oldVal) {
      emit("dislike");
    }
  }
);

onMounted(() => {
  emit("view");
});
</script>

<template>
  <div class="post-card">
    <div class="post-card__header">
      <div class="post-card__avatar h4">{{ initials }}</div>
      <div>
        <p class="text-medium">
          {{ post.user ? post.user.first_name + " " + post.user.last_name : "" }}
        </p>
        <p class="label-regular">{{ post.user ? post.user.user_name : "" }}</p>
      </div>
    </div>
    <div class="post-card__body text-regular">{{ post.text }}</div>
    <div class="post-card__footer">
      <span class="post-card__views"><GIcon name="eye" />{{ views }}</span>
      <span
        class="post-card__likes"
        :class="{ 'post-card__likes_liked': post.user_liked }"
        @click="switchLike"
      >
        <GIcon name="like" />{{ likes }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.post-card {
  border-radius: 8px;
  border: 1px solid var(--neutral-white-300);
  background: var(--neutral-white-900);
  display: grid;
}

.post-card__header {
  display: grid;
  grid-template-columns: 56px 1fr;
  align-items: center;
  padding: 24px 32px;
  gap: 16px;
  border: none;
  border-bottom: 1px solid var(--neutral-white-300);
}

.post-card__avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid var(--neutral-white-300);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--neutral-white-100);
}

.post-card__body {
  padding: 24px 32px;
}

.post-card__footer {
  padding: 24px 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
}

.post-card__likes,
.post-card__views {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--neutral-black-500);
  transition: color 0.2s ease;
}

.post-card__likes {
  cursor: pointer;
}

.post-card__likes_liked {
  color: var(--primary-700);
}

.post-card__likes_liked:hover,
.post-card__likes_liked:active {
  color: var(--primary-900) !important;
}

.post-card__likes:hover,
.post-card__likes:active {
  color: var(--neutral-black-700);
}
</style>
