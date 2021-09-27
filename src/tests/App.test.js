import React from "react";
import { shallow } from "enzyme";
import App, {CurrencyCalculatorContext} from "App";
import ConverterForm from "../components/converter-form";

describe("App", () => {
  const comp = shallow(<App />);

  it ("should render without crashing", () => {
    const currencyCalculatorContext = comp.find(CurrencyCalculatorContext.Provider);
    expect(comp.exists()).toBe(true);
    expect(currencyCalculatorContext.exists()).toBe(true);
    expect(comp.hasClass("app")).toBe(true);
  });

  it ("should render header", () => {
    const header = comp.find(".app-header");
    expect(header.exists()).toBe(true);
    expect(header.text()).toEqual("Currency Calculator");
  });
});
