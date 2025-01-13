import IconComponent from "@/components/ui/Icon.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

describe("IconComponent", () => {
  it("renders the correct SVG icon based on the name prop", async () => {
    const wrapper = mount(IconComponent, {
      props: {
        name: "add"
      }
    });

    await vi.dynamicImportSettled();

    expect(wrapper.html()).toContain("<svg");
  });
});
