import { dislikePost, getAllPosts, likePost, makePost, viewPost } from "@/services/post";
import { debounce } from "lodash";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useUserStore } from "./user";

export const usePostStore = defineStore("post", () => {
  const userStore = useUserStore();
  const params = ref({
    limit: 10,
    offset: 0,
    replyToId: undefined,
    search: undefined
  });

  const needReset = ref(false);

  const posts = ref([]);

  const canLoadPosts = ref(true);

  const myPosts = ref([]);
  const canLoadMyPosts = ref(true);
  const myParams = ref({
    limit: 10,
    offset: 0,
    ownerId: userStore.me?.id
  });

  function setSearch(search) {
    if (search) {
      if (params.value.search) {
        params.value.search = search;
      } else {
        params.value = {
          limit: 10,
          offset: 0,
          replyToId: undefined,
          search: search
        };
      }
    } else {
      params.value = {
        limit: 10,
        offset: 0,
        replyToId: undefined,
        search: undefined
      };
    }
  }

  watch(
    () => params.value.search,
    () => {
      needReset.value = true;
      loadPosts();
    }
  );

  function loadPosts() {
    if (canLoadPosts.value) {
      getAllPosts(params.value, userStore.accessToken).then(result => {
        if (needReset.value) {
          posts.value = result;
          needReset.value = false;
        } else {
          if (result.length === 0) {
            canLoadPosts.value = false;
          } else {
            posts.value.push(...result);
            params.value.offset += params.value.limit;
          }
        }
      });
    }
  }

  function loadMyPosts() {
    if (canLoadMyPosts.value && userStore.me?.id > 0) {
      getAllPosts(myParams.value, userStore.accessToken).then(result => {
        if (needReset.value) {
          myPosts.value = result;
        } else {
          if (result.length === 0) {
            canLoadMyPosts.value = false;
          } else {
            myPosts.value.push(...result);
            myParams.value.offset += myParams.value.limit;
          }
        }
      });
    }
  }

  const loadReplies = debounce(post => {
    if (post) {
      if (post.canLoadPosts === undefined) {
        post.canLoadPosts = true;
        post.replies = [];
        post.params = {
          limit: 10,
          offset: 0,
          replyToId: post.id
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

  async function post(params, post) {
    try {
      const response = await makePost(params, userStore.accessToken);
      if (params.replyToId > 0 && post) {
        if (Array.isArray(post.replies)) {
          post.replies.push({
            ...response,
            user: {
              id: userStore.me.id,
              first_name: userStore.me.first_name,
              last_name: userStore.me.last_name,
              user_name: userStore.me.user_name
            }
          });
        } else {
          post.replies = [
            {
              ...response,
              user: {
                id: userStore.me.id,
                first_name: userStore.me.first_name,
                last_name: userStore.me.last_name,
                user_name: userStore.me.user_name
              }
            }
          ];
        }
        post.replies_count++;
      } else {
        posts.value.unshift({
          ...response,
          user: {
            id: userStore.me.id,
            first_name: userStore.me.first_name,
            last_name: userStore.me.last_name,
            user_name: userStore.me.user_name
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  return {
    posts,
    myPosts,
    canLoadPosts,
    canLoadMyPosts,
    loadPosts,
    loadMyPosts,
    like,
    dislike,
    view,
    loadReplies,
    post,
    setSearch
  };
});
