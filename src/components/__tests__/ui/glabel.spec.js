import GLabel from "@/components/ui/GLabel.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("Label", () => {
  it("renders the label with the correct text", () => {
    const wrapper = mount(GLabel, {
      props: {
        for: "test-id",
        label: "Test Label"
      }
    });

    const label = wrapper.find("label");
    expect(label.text()).toBe("Test Label");
  });

  it("assigns the correct `for` attribute to the label", () => {
    const wrapper = mount(GLabel, {
      props: {
        for: "test-id",
        label: "Test Label"
      }
    });

    const label = wrapper.find("label");
    expect(label.attributes("for")).toBe("test-id");
  });

  it("applies the correct CSS class to the label", () => {
    const wrapper = mount(GLabel, {
      props: {
        for: "test-id",
        label: "Test Label"
      }
    });

    const label = wrapper.find("label");
    expect(label.classes()).toContain("g-label");
  });
});
