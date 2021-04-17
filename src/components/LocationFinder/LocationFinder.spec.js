import React from "react";
import { shallow, mount } from "enzyme";
import LocationFinder from "./LocationFinder";
import Button from "../Button/Button";
import Input from "../Input/Input";

describe("LocationFinder", () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<LocationFinder />)));
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  it("should render a <div />", () => {
    expect(wrapper.find("div").length).toBeGreaterThanOrEqual(1);
  });

  it("should render 2 instances of the Button component", () => {
    expect(wrapper.find(Button).length).toEqual(2);
  });

  it("should render 2 instances of the Input component", () => {
    expect(wrapper.find(Input).length).toEqual(2);
  });
});

describe("mounted LocationFinder", () => {
  let wrapper;

  beforeEach(() => (wrapper = mount(<LocationFinder />)));

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  it("invokes handleProcess when the Process button is clicked", () => {
    const spy = jest.spyOn(wrapper.instance(), "handleProcess");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find(".process").first().simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("invokes handleLocate when the Locate button is clicked", () => {
    const spy = jest.spyOn(wrapper.instance(), "handleLocate");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find(".locate").first().simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should change latitude and longitude state when the Locate button is clicked", async () => {
    wrapper.instance().forceUpdate();
    wrapper.find(".locate").first().simulate("click");

    await new Promise((res) => setTimeout(res, 1000));

    expect(wrapper.instance().state.latitude).not.toEqual("");
    expect(wrapper.instance().state.longitude).not.toEqual("");
  });

  it("should give error if the entered latitude and longitude is not proper after Process button is clicked", async () => {
    wrapper.instance().forceUpdate();
    wrapper.instance().setState({ latitude: "3a", longitude: "3b" });
    wrapper.find(".process").first().simulate("click");
    expect(wrapper.find(".mdc-snackbar").length).toBe(1);
  });

  it("should change states (currentCity, distanceToEarthCenter, nearestCityCenter, nearestCityDistance, nearestCityCoordinates) properly when the Process button is clicked", async () => {
    wrapper.instance().forceUpdate();
    wrapper.instance().setState({ latitude: "39", longitude: "31" });
    wrapper.find(".process").first().simulate("click");

    await new Promise((res) => setTimeout(res, 5000));

    expect(wrapper.instance().state.currentCity).toEqual("Afyonkarahisar");
    expect(wrapper.instance().state.distanceToEarthCenter).toEqual(6369.711);
    expect(wrapper.instance().state.nearestCityCenter).toEqual(
      "Bayat, Afyonkarahisar Province"
    );
    expect(wrapper.instance().state.nearestCityDistance).toEqual(7.445);
    expect(wrapper.instance().state.nearestCityCoordinates).toEqual({
      latitude: 38.983333333,
      longitude: 30.916666666,
    });
  });

  it("should not give current city information if coordinates are not in city boundaries when the Process button is clicked", async () => {
    wrapper.instance().forceUpdate();
    wrapper.instance().setState({ latitude: "36.63", longitude: "30.86" });
    wrapper.find(".process").first().simulate("click");

    await new Promise((res) => setTimeout(res, 5000));

    expect(wrapper.instance().state.currentCity).toEqual(undefined);
  });
});
