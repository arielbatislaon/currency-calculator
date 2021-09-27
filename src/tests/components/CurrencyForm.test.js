import React from "react";
import { shallow } from "enzyme";
import { validateAmount, getCurrencyOptions, getCalculatedRateFromAPI } from "../../utils";
import ConverterForm from "../../components/converter-form";
import CurrencyAmount from "../../components/currency-amount";
import CurrencySelector from "../../components/currency-selector";
import ConvertedAmount from "../../components/converted-amount";
import { CURRENCY_CALCULATOR_API_URL, DEFAULT_TO_CURRENCY, DEFAULT_FROM_CURRENCY } from "../../config";
import { CURRENCY_LIST } from "../../config";
import axios from "axios";

const mockData = {
  success: true,
  timestamp: 1619432343,
  base: "EUR",
  date: "2021-04-26",
  rates: {
    EUR: 1,
    GBP: 0.9012,
    USD: 1.1224,
  }
};

const { rates } = mockData;
const currencyOptions = [
  { label: "EUR", value: "eur" },
  { label: "GBP", value: "gbp" },
  { label: "USD", value: "usd" },
];

describe("ConverterForm", () => {
  const getComp = (noData) => shallow(
    <ConverterForm/>
  );

  it("should not explode when no given props", () => {
    const comp = getComp(true);
    expect(comp.exists()).toBe(true);
    expect(comp.type()).toBe("form");
  });

  it("should render currency selectors ", () => {
    const comp = getComp(true);
    const currencySelectors = comp.find(CurrencySelector);
    expect(currencySelectors.length).toEqual(2);
    currencySelectors.forEach(selector => {
      expect(selector.prop("options").length).toEqual(CURRENCY_LIST.length);
    });
  });

  it("should render Amount component by default", () => {
    const comp = getComp();
    const amount = comp.find(CurrencyAmount);
    expect(amount.exists()).toBe(true);
    expect(amount.prop("error")).toEqual('');
    expect(amount.prop("value")).toEqual(1);
  });

  it("should render 2 currency selectors when by default", () => {
    const comp = getComp();

    const currencySelectors = comp.find(CurrencySelector);
    expect(currencySelectors.length).toEqual(2);

    const fromSelector = currencySelectors.filter({ label: "From" });
    expect(fromSelector.exists()).toBe(true);
    expect(fromSelector.prop("options").length).toEqual(CURRENCY_LIST.length);
    expect(fromSelector.prop("value")).toEqual(DEFAULT_FROM_CURRENCY);

    const toSelector = currencySelectors.filter({ label: "To" });
    expect(toSelector.exists()).toBe(true);
    expect(toSelector.prop("options").length).toEqual(CURRENCY_LIST.length);
    expect(toSelector.prop("value")).toEqual(DEFAULT_TO_CURRENCY);
  });

   it("should render submit button by default", () => {
    const comp = getComp();
    expect(comp.find("button[type='submit']").exists()).toBe(true);
  });

  it("should render Result component by default", () => {
    const comp = getComp();
    expect(comp.find(ConvertedAmount).prop("value")).toEqual(null);
  });

  it("should deal with amount change", () => {
    const comp = getComp();
    const amount = comp.find(CurrencyAmount);
    amount.invoke("onChange")({ target: { value: 100 } });
    expect(comp.find(CurrencyAmount).prop("value")).toEqual(100);
  });

  it("should deal with currency 'from' change", () => {
    const comp = getComp();
    const fromSelector = comp.find(CurrencySelector).filter({ label: "From" });

    const from = { label: "GBP", value: "gbp" };
    fromSelector.invoke("onChange")(from);

    expect(comp.find(CurrencySelector).filter({ label: "From" }).prop("value"))
      .toEqual(from);
  });

  it("should deal with currency 'to' change", () => {
    const comp = getComp();
    const toSelector = comp.find(CurrencySelector).filter({ label: "To" });

    const to = { label: "USD", value: "usd" };
    toSelector.invoke("onChange")(to);

    expect(comp.find(CurrencySelector).last().prop("value")).toEqual(to);
  });

  });

describe("CurrencyForm functions", () => {
  describe("getCurrencyOptions", () => {
    it("should return currency options all enabled when  optionToDisable is empty ", () => {
      const disabledOptions = getCurrencyOptions(CURRENCY_LIST).filter(item => item.isdisabled);
      expect(disabledOptions.length).toEqual(0);
    });

    it("should return currency options with one given disabledOption", () => {
      const disabledOptions = getCurrencyOptions(CURRENCY_LIST, {value: "eur"}).filter(item => item.isdisabled);
      expect(disabledOptions.length).toEqual(1);
      expect(disabledOptions[0].value).toEqual('eur');
    });
  });

   describe("getAmountError", () => {
    it("should return error message for undefined value", () => {
      expect(validateAmount()).toEqual("The amount is required");
    });

    it("should return error message for non numeric value", () => {
      expect(validateAmount("abc")).toEqual("The amount must be a number");
    });

    it("should return error message for value smaller than 0", () => {
      expect(validateAmount("-1")).toEqual("The amount must be bigger than 0");
    });

    it("should return error message for value equal 0", () => {
      expect(validateAmount("0")).toEqual("The amount must be bigger than 0");
    });

    it("should return undefined for valid value", () => {
      expect(validateAmount("100")).toEqual(null);
    });
  });

  describe("getCalculatedRateFromAPI", () => {
    jest.mock("axios");
    it("should return mock response", async () => {
    const mockResponse = { type: "success"};
    axios.get = jest.fn().mockResolvedValue(mockResponse);
    const result = await getCalculatedRateFromAPI(`${CURRENCY_CALCULATOR_API_URL}/calculate-currency`);
    expect(axios.get).toHaveBeenCalledWith(`${CURRENCY_CALCULATOR_API_URL}/calculate-currency`);
      expect(result).toEqual(mockResponse);
    });
   });
  
});
