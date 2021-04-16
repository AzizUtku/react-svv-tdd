import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import LocationFinder from "../LocationFinder/LocationFinder";

describe("App", () => {
  let container;

  beforeEach(() => (container = shallow(<App />)));

  it("should render a <div />", () => {
    expect(container.find("div").length).toEqual(1);
  });

  it("should render the LocationFinder component", () => {
    expect(container.containsMatchingElement(<LocationFinder />)).toEqual(true);
  });
});
