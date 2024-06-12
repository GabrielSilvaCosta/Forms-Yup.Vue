import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Form from "../Components/Form.vue";

describe("Form", () => {
  it("should render correctly", () => {
    const wrapper = mount(Form);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should submit the form", async () => {
    const wrapper = mount(Form);
    const button = wrapper.get("button");
    await button.trigger("click");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should display errors", async () => {
    const wrapper = mount(Form);
    await wrapper.setData({ name: "Teste", email: "teste@teste" });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render an error message if the name is empty", async () => {
    const wrapper = mount(Form);
    await wrapper.setData({ name: "", email: "teste@teste" });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
