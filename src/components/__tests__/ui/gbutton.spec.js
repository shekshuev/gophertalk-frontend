import GButton from "@/components/ui/GButton.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

describe("YourComponent", () => {
  it("renders the button with the correct variant class", () => {
    const wrapper = mount(GButton, {
      props: {
        variant: "primary"
      }
    });

    const button = wrapper.find("button");
    expect(button.classes()).toContain("g-button_primary");
  });

  it("renders the button with the secondary variant class", () => {
    const wrapper = mount(GButton, {
      props: {
        variant: "secondary"
      }
    });

    const button = wrapper.find("button");
    expect(button.classes()).toContain("g-button_secondary");
  });

  it("renders the button with the rounded variant class", () => {
    const wrapper = mount(GButton, {
      props: {
        variant: "rounded"
      }
    });

    const button = wrapper.find("button");
    expect(button.classes()).toContain("g-button_rounded");
  });

  it("applies the disabled state correctly", () => {
    const wrapper = mount(GButton, {
      props: {
        disabled: true
      }
    });

    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeDefined();
    expect(button.classes()).toContain("disabled");
  });

  it("renders default slot content", () => {
    const wrapper = mount(GButton, {
      slots: {
        default: "Click Me"
      }
    });

    const button = wrapper.find("button");
    expect(button.text()).toBe("Click Me");
  });

  it("validates the variant prop correctly", () => {
    const validVariants = ["primary", "secondary", "rounded"];
    validVariants.forEach(variant => {
      const wrapper = mount(GButton, {
        props: {
          variant
        }
      });
      expect(wrapper.props("variant")).toBe(variant);
    });

    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    mount(GButton, {
      props: {
        variant: "invalid-variant"
      }
    });
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
