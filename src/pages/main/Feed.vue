<script setup lang="js">
import PostCard from "@/components/widgets/PostCard.vue";
import { usePostStore } from "@/stores/post";
import { useInfiniteScroll } from "@vueuse/core";
import { computed, useTemplateRef } from "vue";

const postsEl = useTemplateRef("posts");
const postStore = usePostStore();

const posts = computed(() => postStore.posts);

useInfiniteScroll(postsEl, postStore.loadPosts, {
  distance: 10,
  canLoadMore: () => postStore.canLoadPosts
});
</script>

<template>
  <div class="posts" ref="posts">
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @like="postStore.like($event)"
      @dislike="postStore.dislike($event)"
      @view="postStore.view($event)"
      @load-replies="postStore.loadReplies($event)"
    />
  </div>
</template>

<style scoped>
.posts {
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: grid;
  gap: 32px;
}
</style>
