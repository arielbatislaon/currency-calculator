const  currencyCalculator = require('./currency-calculator.js');

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
  
  const { rates, base } = mockData;
 const convertAmount = currencyCalculator.convertAmount;
describe("convertAmount", () => {
    it("should return 0 when amount is not valid", () => {
      const amount = {
        error: "The amount is required",
        value: undefined,
      };
      const resp = convertAmount(amount.value, "EUR", "USD", rates, base);
      expect(resp.calculatedAmount).toEqual(0);
    });

    it("should return 0 when 'from' is not set", () => {
      const amount = {
        error: undefined,
        value: "1",
      };
      const resp = convertAmount(amount.value, undefined, "USD", rates, base);
      expect(resp.calculatedAmount).toEqual(0);
    });

    it("should return 0 when 'to' is not set", () => {
      const amount = {
        error: undefined,
        value: "1",
      };
      const resp = convertAmount(amount.value, "USD", undefined, rates, base);
      expect(resp.calculatedAmount).toEqual(0);
    });

    it("should return converted amount", () => {
      const amount = {
        error: undefined,
        value: 100,
      };
      const resp = convertAmount(amount.value, "EUR", "USD", rates, base)
      expect(resp.calculatedAmount).toEqual(rates["USD"] * 100
      );
    }); 
  });