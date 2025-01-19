import PostCard from "@/components/widgets/PostCard.vue";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { inject } from "vue";

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

  it("renders as reply post card correctly", () => {
    const wrapper = mount(PostCard, {
      props: { post: { ...post, reply_to_id: 1 } }
    });

    expect(wrapper.classes()).toContain("post-card_reply");
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
});
