import GLabel from "@/components/ui/GLabel.vue";
import GTextInput from "@/components/ui/GTextInput.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("GTextInput", () => {
  it("renders the label correctly", () => {
    const wrapper = mount(GTextInput, {
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

  it("renders the input with correct type and value", () => {
    const wrapper = mount(GTextInput, {
      props: {
        label: "Test Label",
        modelValue: "Test Value",
        type: "password"
      }
    });

    const input = wrapper.find("input");
    expect(input.attributes("type")).toBe("password");
    expect(input.element.value).toBe("Test Value");
  });

  it("emits an update when input value changes", async () => {
    const wrapper = mount(GTextInput, {
      props: {
        label: "Test Label",
        modelValue: ""
      }
    });

    const input = wrapper.find("input");
    await input.setValue("New Value");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["New Value"]);
  });

  it("applies error class and shows error message when error is present", () => {
    const wrapper = mount(GTextInput, {
      props: {
        label: "Test Label",
        modelValue: "",
        error: "This is an error"
      }
    });

    const input = wrapper.find("input");
    expect(input.classes()).toContain("g-text-input__input_error");

    const errorMessage = wrapper.find(".g-text-input__error");
    expect(errorMessage.text()).toBe("This is an error");
  });

  it("renders custom class on wrapper", () => {
    const wrapper = mount(GTextInput, {
      props: {
        label: "Test Label",
        modelValue: "",
        class: "custom-class"
      }
    });

    const wrapperDiv = wrapper.find(".g-text-input__wrapper");
    expect(wrapperDiv.classes()).toContain("custom-class");
  });
});
