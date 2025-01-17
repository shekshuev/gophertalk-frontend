import GIcon from "@/components/ui/GIcon.vue";
import Sidebar from "@/components/widgets/Sidebar.vue";
import en from "@/locales/en.json";
import { createTestingPinia } from "@pinia/testing";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const i18n = createI18n({
  locale: "en",
  messages: {
    en
  }
});

vi.mock("vue-router");

vi.mock("@/stores/user", () => ({
  useUserStore: () => ({
    me: {
      id: "123",
      first_name: "John",
      last_name: "Doe",
      user_name: "johndoe"
    }
  })
}));

describe("Sidebar Component", () => {
  vi.mocked(useRouter).mockReturnValue({
    push: vi.fn()
  });

  vi.mocked(useRoute).mockReturnValue({
    name: "feed"
  });

  beforeEach(() => {
    vi.mocked(useRouter().push).mockReset();
  });

  it("renders user initials correctly", () => {
    const wrapper = mount(Sidebar, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          i18n
        ],
        components: {
          GIcon
        },
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const avatar = wrapper.find(".sidebar__avatar");
    expect(avatar.text()).toBe("JD");
  });

  it("renders user full name and username", () => {
    const wrapper = mount(Sidebar, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          i18n
        ],
        components: {
          GIcon
        },
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const fullName = wrapper.find(".sidebar__content p.text-medium");
    expect(fullName.text()).toBe("John Doe");

    const userName = wrapper.find(".sidebar__content p.label-regular");
    expect(userName.text()).toBe("johndoe");
  });

  it("renders menu items with correct titles and links", () => {
    const wrapper = mount(Sidebar, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          i18n
        ],
        components: {
          GIcon
        },
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });
    const menuItems = wrapper.findAllComponents(RouterLinkStub);
    expect(menuItems).toHaveLength(2);

    expect(menuItems[0].text()).toContain("Home");
    expect(menuItems[0].props().to).toEqual({ name: "feed" });

    expect(menuItems[1].text()).toContain("Profile");
    expect(menuItems[1].props().to).toEqual({ name: "profile", params: { id: "123" } });
  });

  it("applies correct class for the active menu item", () => {
    const wrapper = mount(Sidebar, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          i18n
        ],
        stubs: {
          RouterLink: RouterLinkStub
        },
        components: {
          GIcon
        }
      }
    });

    const activeMenuItem = wrapper.find(".sidebar__menu-item_current");
    expect(activeMenuItem.exists()).toBe(true);
    expect(activeMenuItem.text()).toContain("Home");
  });
});
