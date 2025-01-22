<script setup lang="js">
import { shortenNumber } from "@/helpers/transformers";
import { useInfiniteScroll } from "@vueuse/core";
import { computed, inject, onMounted, ref, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import PostForm from "./PostForm.vue";

const { post } = defineProps({
  post: {
    type: Object,
    required: true
  }
});

const { t } = useI18n();

const emit = defineEmits(["like", "dislike", "view", "load-replies"]);

const dayjs = inject("dayjs");
const timeSinceCreated = dayjs(post.created_at).fromNow();

const initials = computed(() => {
  if (post?.user) {
    return post.user.first_name[0].toUpperCase() + post.user.last_name[0].toUpperCase();
  } else {
    return "";
  }
});

const likes = computed(() => shortenNumber(post.likes_count));
const views = computed(() => shortenNumber(post.views_count));

const showReplies = ref(false);

function switchLike() {
  post.user_liked = !post.user_liked;
  post.likes_count += post.user_liked ? 1 : -1;
}
const postsEl = useTemplateRef("replies", post.id);

watch(
  () => post.likes_count,
  (newVal, oldVal) => {
    if (newVal > oldVal) {
      emit("like", post.id);
    } else if (newVal < oldVal) {
      emit("dislike", post.id);
    }
  }
);

watch(showReplies, newVal => {
  if (newVal) {
    emit("load-replies", post.id);
    useInfiniteScroll(postsEl, () => emit("load-replies", post.id), {
      canLoadMore: () => post.canLoadPosts
    });
  }
});

onMounted(() => {
  if (!post.user_viewed) {
    emit("view", post.id);
  }
});
</script>

<template>
  <div class="post-card">
    <div class="post-card__header">
      <div class="post-card__avatar h4">{{ initials }}</div>
      <div class="post-card__header-content">
        <div>
          <p class="text-medium">
            {{ post.user ? post.user.first_name + " " + post.user.last_name : "" }}
          </p>
          <p class="label-regular">{{ post.user ? post.user.user_name : "" }}</p>
        </div>
        <p class="label-regular post-card__date">{{ timeSinceCreated }}</p>
      </div>
    </div>
    <div class="post-card__body text-regular">{{ post.text }}</div>
    <div class="post-card__footer">
      <span @click="showReplies = true" class="post-card__replies">
        <GIcon name="comment" />
      </span>
      <span class="post-card__views"><GIcon name="eye" />{{ views }}</span>
      <span
        class="post-card__likes"
        :class="{ 'post-card__likes_liked': post.user_liked }"
        @click="switchLike"
      >
        <GIcon name="like" />{{ likes }}
      </span>
    </div>
    <div v-if="showReplies" class="post-card__replies-wrapper" ref="replies">
      <PostForm :reply-to-id="post.id" />
      <template v-if="Array.isArray(post.replies)">
        <PostCard
          v-for="reply in post.replies"
          :key="reply.id"
          :post="reply"
          @like="$emit('like', reply.id)"
          @dislike="$emit('dislike', reply.id)"
          @view="$emit('view', reply.id)"
        />
      </template>
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

.post-card__header-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.post-card__date {
  color: var(--neutral-black-500);
}

.post-card__body {
  padding: 24px 32px;
  white-space: pre-line;
}

.post-card__footer {
  padding: 24px 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
}

.post-card__likes,
.post-card__views,
.post-card__replies {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--neutral-black-500);
  transition: color 0.2s ease;
  text-decoration: none;
}

.post-card__likes,
.post-card__replies {
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
.post-card__likes:active,
.post-card__replies:hover,
.post-card__replies:active {
  color: var(--neutral-black-700);
}

.post-card__replies-wrapper {
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: grid;
  gap: 32px;
  padding: 0 32px 32px 32px;
  max-height: 350px;
}
</style>
