import React from "react";
import { shallow } from "enzyme";
import Input from "./Input";

describe("Input", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Input value="val" onChange={jest.fn()} leftText="Left">
        <div />
      </Input>
    );
  });

  it("should render a <div /> with class name form-group", () => {
    expect(wrapper.find("div.form-group").length).toBe(1);
  });

  it("should render a <span /> as a children", () => {
    expect(wrapper.find("div").find("span").length).toBe(1);
  });

  it("should render a <input /> as a children", () => {
    expect(wrapper.find("div").find("input").length).toBe(1);
  });

  it("should span have text", () => {
    expect(wrapper.find("div").find("span").text()).toEqual("Left");
  });
});
