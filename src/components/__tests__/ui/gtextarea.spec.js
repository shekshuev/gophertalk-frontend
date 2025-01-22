import GLabel from "@/components/ui/GLabel.vue";
import GTextArea from "@/components/ui/GTextArea.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("GTextArea", () => {
  it("renders the label correctly", () => {
    const wrapper = mount(GTextArea, {
      props: {
        label: "Test Label",
        modelValue: ""
      },
      global: {
        components: {
          GLabel
        }
      }
    });

    const label = wrapper.findComponent({ name: "GLabel" });
    expect(label.exists()).toBe(true);
    expect(label.props("label")).toBe("Test Label");
  });

  it("renders without label", () => {
    const wrapper = mount(GTextArea, {
      props: {
        label: "Test Label",
        modelValue: "",
        withLabel: false
      },
      global: {
        components: {
          GLabel
        }
      }
    });

    const label = wrapper.findComponent({ name: "GLabel" });
    expect(label.exists()).toBe(false);
    const textarea = wrapper.find("textarea");
    expect(textarea.attributes("placeholder")).toBe("Test Label");
  });

  it("emits an update when textarea value changes", async () => {
    const wrapper = mount(GTextArea, {
      props: {
        label: "Test Label",
        modelValue: ""
      },
      global: {
        components: {
          GLabel
        }
      }
    });

    const textarea = wrapper.find("textarea");
    await textarea.setValue("New Value");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["New Value"]);
  });

  it("applies error class and shows error message when error is present", () => {
    const wrapper = mount(GTextArea, {
      props: {
        label: "Test Label",
        modelValue: "",
        error: "This is an error"
      },
      global: {
        components: {
          GLabel
        }
      }
    });

    const textarea = wrapper.find("textarea");
    expect(textarea.classes()).toContain("g-textarea__textarea_error");

    const errorMessage = wrapper.find(".g-textarea__error");
    expect(errorMessage.text()).toBe("This is an error");
  });

  it("renders custom class on wrapper", () => {
    const wrapper = mount(GTextArea, {
      props: {
        label: "Test Label",
        modelValue: "",
        class: "custom-class"
      },
      global: {
        components: {
          GLabel
        }
      }
    });

    const wrapperDiv = wrapper.find(".g-textarea__wrapper");
    expect(wrapperDiv.classes()).toContain("custom-class");
  });
});
