import { dislikePost, getAllPosts, likePost, viewPost } from "@/services/post";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "./user";

export const usePostStore = defineStore("post", () => {
  const userStore = useUserStore();
  const params = ref({
    limit: 10,
    offset: 0,
    replyToId: undefined,
    search: undefined
  });

  const posts = ref([]);

  const canLoadPosts = ref(true);

  function loadPosts() {
    if (canLoadPosts.value) {
      getAllPosts(params.value, userStore.accessToken).then(result => {
        if (result.length === 0) {
          canLoadPosts.value = false;
        } else {
          posts.value.push(...result);
          params.value.offset += params.value.limit;
        }
      });
    }
  }

  function like(id) {
    likePost(id, userStore.accessToken);
  }

  function dislike(id) {
    dislikePost(id, userStore.accessToken);
  }

  function view(id) {
    viewPost(id, userStore.accessToken);
  }

  return { posts, canLoadPosts, loadPosts, like, dislike, view };
});
