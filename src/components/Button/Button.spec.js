import React from "react";
import { shallow } from "enzyme";
import Button from "./Button";

describe("Button", () => {
  let wrapper;
  let iconWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Button className="any" onClick={jest.fn()} isIcon={false}>
        <div />
      </Button>
    );

    iconWrapper = shallow(<Button onClick={jest.fn()} isIcon={true} />);
  });

  it("should render a <div /> with class name box-button", () => {
    expect(wrapper.find("div.box-button").length).toBe(1);
  });

  it("should render a <div /> with class name any", () => {
    expect(wrapper.find("div.any").length).toBe(1);
  });

  it("should render children", () => {
    expect(wrapper.find("div").find("a").find("div").length).toBe(1);
  });

  it("should render a <a /> with class name box-button in <div /> ", () => {
    expect(wrapper.find("div.box-button").find("a.btn").length).toBe(1);
  });

  it("should render a <a /> with class name icon-btn in <div /> ", () => {
    expect(iconWrapper.find("div.box-button").find("a.icon-btn").length).toBe(
      1
    );
  });
});
