import { dislikePost, getAllPosts, likePost, makePost, viewPost } from "@/services/post";
import { debounce } from "lodash";
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

  const loadReplies = debounce(id => {
    const post = posts.value.find(p => p.id === id);
    if (post) {
      if (post.canLoadPosts === undefined) {
        post.canLoadPosts = true;
        post.replies = [];
        post.params = {
          limit: 10,
          offset: 0,
          replyToId: id
        };
      }
      if (post.canLoadPosts) {
        getAllPosts(post.params, userStore.accessToken).then(result => {
          if (result.length === 0) {
            post.canLoadPosts = false;
          } else {
            post.replies.push(...result);
            post.params.offset += post.params.limit;
          }
        });
      }
    }
  }, 500);

  function like(id) {
    likePost(id, userStore.accessToken);
  }

  function dislike(id) {
    dislikePost(id, userStore.accessToken);
  }

  function view(id) {
    viewPost(id, userStore.accessToken);
  }

  async function post(params) {
    try {
      const response = await makePost(params, userStore.accessToken);
      posts.value.unshift({
        ...response,
        user: {
          id: userStore.me.id,
          first_name: userStore.me.first_name,
          last_name: userStore.me.last_name,
          user_name: userStore.me.user_name
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  return {
    posts,
    canLoadPosts,
    loadPosts,
    like,
    dislike,
    view,
    loadReplies,
    post
  };
});
