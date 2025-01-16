import GButton from "@/components/ui/GButton.vue";
import GLabel from "@/components/ui/GLabel.vue";
import GTextInput from "@/components/ui/GTextInput.vue";
import Header from "@/components/widgets/Header.vue";
import en from "@/locales/en.json";
import { useUserStore } from "@/stores/user";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const i18n = createI18n({
  locale: "en",
  messages: {
    en
  }
});

vi.mock("vue-router");

describe("Header Component", () => {
  vi.mocked(useRouter).mockReturnValue({
    push: vi.fn()
  });

  beforeEach(() => {
    vi.mocked(useRouter().push).mockReset();
  });

  it("renders logo and title correctly", () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          i18n
        ]
      }
    });

    const logoWrapper = wrapper.find(".logo-wrapper");
    expect(logoWrapper.exists()).toBe(true);
    expect(logoWrapper.text()).toContain("Gopher Talk");
  });

  it("renders the search input correctly", () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          i18n
        ],
        components: {
          GLabel,
          GTextInput
        }
      }
    });

    const searchInput = wrapper.findComponent({ name: "GTextInput" });
    expect(searchInput.exists()).toBe(true);
    expect(searchInput.props("type")).toBe("text");
  });

  it("calls logout when logout button is clicked", async () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          i18n
        ],
        components: {
          GButton
        }
      }
    });
    const userStore = useUserStore();
    const logoutButton = wrapper.findComponent({ name: "GButton" });
    await logoutButton.trigger("click");
    expect(userStore.logout).toHaveBeenCalled();
  });

  it("redirects to auth page when user is not logged in", () => {
    const userStore = useUserStore();
    userStore.isLoggedIn = false;

    mount(Header, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          i18n
        ]
      }
    });
    const router = useRouter();
    expect(router.push).toHaveBeenCalledWith({ name: "auth" });
  });
});
