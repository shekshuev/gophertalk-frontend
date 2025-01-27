<script setup lang="js">
import { usePostStore } from "@/stores/post";
import { useInfiniteScroll } from "@vueuse/core";
import { computed, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const postsEl = useTemplateRef("posts");
const postStore = usePostStore();

const posts = computed(() => postStore.myPosts);

useInfiniteScroll(postsEl, postStore.loadMyPosts, {
  distance: 10,
  canLoadMore: () => postStore.canLoadMyPosts && !postStore.loading
});
</script>

<template>
  <div class="posts" ref="posts">
    <template v-if="posts?.length > 0">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @like="postStore.like($event)"
        @dislike="postStore.dislike($event)"
        @view="postStore.view($event)"
        @load-replies="postStore.loadReplies($event)"
      />
    </template>
    <template v-else>
      <p class="text-medium empty-message">{{ t("pages.myPosts.empty") }}</p>
    </template>
    <Loader v-if="postStore.loading" />
  </div>
</template>

<style scoped>
.posts {
  width: 100%;
  padding: 20px 0;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.empty-message {
  text-align: center;
  color: var(--neutral-black-800);
}

@media screen and (max-width: 936px) {
  .posts {
    padding: 10px 0;
  }
}
</style>
