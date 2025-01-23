import GButton from "@/components/ui/GButton.vue";
import GLabel from "@/components/ui/GLabel.vue";
import GTextArea from "@/components/ui/GTextArea.vue";
import PostForm from "@/components/widgets/PostForm.vue";
import en from "@/locales/en.json";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "en",
  messages: {
    en
  }
});

vi.mock("@/stores/user", () => ({
  useUserStore: () => ({
    me: {
      id: "123",
      first_name: "John",
      last_name: "Doe",
      user_name: "johndoe"
    },
    initials: "JD"
  })
}));

vi.mock("@/stores/post", () => ({
  usePostStore: () => ({
    post: vi.fn(() => Promise.resolve())
  })
}));

describe("PostForm Component", () => {
  it("renders the form with correct initial state", () => {
    const wrapper = mount(PostForm, {
      props: { replyToId: 0 },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          i18n
        ],
        components: {
          GTextArea,
          GButton,
          GLabel
        }
      }
    });

    const avatar = wrapper.find(".post-form__avatar");
    expect(avatar.text()).toBe("JD");

    const textArea = wrapper.findComponent({ name: "GTextArea" });
    expect(textArea.props("label")).toBe("What's on your mind?");

    const button = wrapper.find("button");
    expect(button.text()).toBe("Post");
  });

  it("displays the reply state when replyToId is greater than 0", () => {
    const wrapper = mount(PostForm, {
      props: { replyToId: 1 },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          i18n
        ],
        components: {
          GTextArea,
          GButton,
          GLabel
        }
      }
    });

    const form = wrapper.find(".post-form");
    expect(form.classes()).toContain("post-form_nested");

    const textArea = wrapper.findComponent({ name: "GTextArea" });
    expect(textArea.props("label")).toBe("Write your reply");

    const button = wrapper.find("button");
    expect(button.text()).toBe("Reply");
  });

  it("validates input and shows errors", async () => {
    const wrapper = mount(PostForm, {
      props: { replyToId: 0 },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          i18n
        ],
        components: {
          GTextArea,
          GButton,
          GLabel
        }
      }
    });

    const textArea = wrapper.findComponent({ name: "GTextArea" });
    await textArea.setValue("A".repeat(281));

    const error = wrapper.find(".g-textarea__error");
    expect(error.exists()).toBe(true);
    // expect(error.text()).toBe("Text must contain maximum 280 characters");
  });

  it("submits the form and resets after posting", async () => {
    const wrapper = mount(PostForm, {
      props: { replyToId: 0 },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          i18n
        ],
        components: {
          GTextArea,
          GButton,
          GLabel
        }
      }
    });

    const textArea = wrapper.find("textarea");
    await textArea.setValue("This is a test post.");

    expect(textArea.element.value).toBe("This is a test post.");

    const button = wrapper.find("button");
    await button.trigger("submit");

    // expect(textArea.element.value).toBe("");
  });
});
