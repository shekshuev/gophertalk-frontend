import GIcon from "@/components/ui/GIcon.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

describe("IconComponent", () => {
  it("renders the correct SVG icon based on the name prop", async () => {
    const wrapper = mount(GIcon, {
      props: {
        name: "add"
      }
    });

    await vi.dynamicImportSettled();

    expect(wrapper.html()).toContain("<svg");
  });
});
