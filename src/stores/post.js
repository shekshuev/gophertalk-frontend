import { getAllPosts } from "@/services/post";
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
          posts.value = [...posts.value, ...result];
          params.value.offset += params.value.limit;
        }
      });
    }
  }

  return { posts, canLoadPosts, loadPosts };
});
