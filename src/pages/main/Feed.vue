<script setup lang="js">
import Loader from "@/components/widgets/Loader.vue";
import PostCard from "@/components/widgets/PostCard.vue";
import PostForm from "@/components/widgets/PostForm.vue";
import { usePostStore } from "@/stores/post";
import { useInfiniteScroll } from "@vueuse/core";
import { computed, useTemplateRef } from "vue";

const postsEl = useTemplateRef("posts");
const postStore = usePostStore();

const posts = computed(() => postStore.posts);

useInfiniteScroll(postsEl, postStore.loadPosts, {
  distance: 10,
  canLoadMore: () => postStore.canLoadPosts && !postStore.loading
});
</script>

<template>
  <div class="posts" ref="posts">
    <PostForm />
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @like="postStore.like($event)"
      @dislike="postStore.dislike($event)"
      @view="postStore.view($event)"
      @load-replies="postStore.loadReplies($event)"
    />
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

@media screen and (max-width: 936px) {
  .posts {
    padding: 10px 0;
  }
}
</style>
