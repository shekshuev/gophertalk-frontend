import PostCard from "@/components/widgets/PostCard.vue";
import PostForm from "@/components/widgets/PostForm.vue";
import en from "@/locales/en.json";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { inject } from "vue";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "en",
  messages: {
    en
  }
});

vi.mock("vue", async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    inject: vi.fn()
  };
});

describe("PostCard Component", () => {
  let mockDayjs;

  beforeEach(() => {
    mockDayjs = vi.fn(() => ({
      fromNow: vi.fn(() => "2 hours ago")
    }));
    vi.mocked(inject).mockImplementation(key => {
      if (key === "dayjs") return mockDayjs;
    });
  });

  const post = {
    user: {
      first_name: "John",
      last_name: "Doe",
      user_name: "johndoe"
    },
    text: "This is a test post.",
    created_at: "2025-01-14T12:00:00Z",
    likes_count: 10,
    views_count: 200,
    user_liked: false
  };

  it("renders user initials correctly", () => {
    const wrapper = mount(PostCard, {
      props: { post }
    });

    const avatar = wrapper.find(".post-card__avatar");
    expect(avatar.text()).toBe("JD");
  });

  it("renders post text correctly", () => {
    const wrapper = mount(PostCard, {
      props: { post }
    });

    const body = wrapper.find(".post-card__body");
    expect(body.text()).toBe("This is a test post.");
  });

  it("renders time since post creation", () => {
    const wrapper = mount(PostCard, {
      props: { post }
    });

    const date = wrapper.find(".post-card__date");
    expect(date.text()).toBe("2 hours ago");
  });

  it("renders likes and views count correctly", () => {
    const wrapper = mount(PostCard, {
      props: { post }
    });

    const likes = wrapper.find(".post-card__likes");
    const views = wrapper.find(".post-card__views");

    expect(likes.text()).toContain("10");
    expect(views.text()).toContain("200");
  });

  it("emits like and dislike events correctly", async () => {
    const wrapper = mount(PostCard, {
      props: { post }
    });

    const likes = wrapper.find(".post-card__likes");

    await likes.trigger("click");
    expect(wrapper.emitted("like")).toBeTruthy();

    await likes.trigger("click");
    expect(wrapper.emitted("dislike")).toBeTruthy();
  });

  it("emits view event on mount", () => {
    const wrapper = mount(PostCard, {
      props: { post }
    });

    expect(wrapper.emitted("view")).toBeTruthy();
  });

  it("toggles showReplies correctly and emits 'load-replies' event", async () => {
    const wrapper = mount(PostCard, {
      props: { post },
      global: {
        components: {
          PostForm
        },
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          i18n
        ]
      }
    });

    const repliesToggle = wrapper.find(".post-card__replies");

    await repliesToggle.trigger("click");
    expect(wrapper.vm.showReplies).toBe(true);
    expect(wrapper.emitted("load-replies")).toBeTruthy();
    expect(wrapper.emitted("load-replies")[0]).toEqual([post.id]);
  });

  it("handles like button state changes correctly", async () => {
    const wrapper = mount(PostCard, {
      props: { post }
    });

    const likeButton = wrapper.find(".post-card__likes");

    await likeButton.trigger("click");
    expect(post.user_liked).toBe(true);
    expect(post.likes_count).toBe(11);
    expect(wrapper.emitted("like")).toBeTruthy();

    await likeButton.trigger("click");
    expect(post.user_liked).toBe(false);
    expect(post.likes_count).toBe(10);
    expect(wrapper.emitted("dislike")).toBeTruthy();
  });

  it("renders nested replies correctly", async () => {
    const postWithReplies = {
      ...post,
      replies: [
        {
          id: 1,
          user: {
            first_name: "Alice",
            last_name: "Smith",
            user_name: "alice_smith"
          },
          text: "This is a reply.",
          created_at: "2025-01-14T13:00:00Z",
          likes_count: 5,
          views_count: 50,
          user_liked: false
        }
      ]
    };

    const wrapper = mount(PostCard, {
      props: { post: postWithReplies },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          i18n
        ]
      }
    });

    const replyButton = wrapper.find(".post-card__replies");
    await replyButton.trigger("click");

    const reply = wrapper.findAllComponents(PostCard)[0];
    expect(reply.exists()).toBe(true);
    expect(reply.props("post")).toEqual(postWithReplies.replies[0]);
  });

  it("emits 'view' event only if user has not viewed the post", () => {
    const wrapper = mount(PostCard, {
      props: { post }
    });

    expect(wrapper.emitted("view")).toBeTruthy();

    const alreadyViewedPost = { ...post, user_viewed: true };
    const newWrapper = mount(PostCard, {
      props: { post: alreadyViewedPost }
    });

    expect(newWrapper.emitted("view")).toBeFalsy();
  });
});
