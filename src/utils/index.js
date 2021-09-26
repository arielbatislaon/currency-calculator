import axios from 'axios';


const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

export const validateAmount = (value) => {
  return value
    ? isNumeric(value)
      ? value <= 0
        ? "The amount must be bigger than 0"
        : null
      : "The amount must be a number"
    : "The amount is required";
};

export const getCalculatedRateFromAPI = (url) => {
  return  axios.get(url);
}
  
export const getCurrencyOptions = (currencies, optionToDisable) => {
  const sortedCurrencies = currencies && currencies.length >0 ? currencies.sort() : [];
  const result = sortedCurrencies.map((s) => {
    return { 
      label: s,
      value: s.toLowerCase() , 
      isdisabled: optionToDisable ? s === optionToDisable.label : false
    }
  })
  return result;
};