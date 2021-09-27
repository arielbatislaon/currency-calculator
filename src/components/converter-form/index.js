import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types';
import CurrencyAmount from '../currency-amount'
import CurrencySelector from '../currency-selector'
import ConvertedAmount from '../converted-amount'
import LoadingSpinner  from '../loading-spinner';
import { CurrencyCalculatorContext } from '../../App';
import { getCurrencyOptions, getCalculatedRateFromAPI, validateAmount } from '../../utils'
import {CURRENCY_LIST, CURRENCY_CALCULATOR_API_URL, DISPATCH_ACTION, DEFAULT_FROM_CURRENCY, DEFAULT_TO_CURRENCY} from '../../config'

function ConverterForm(props) {
   const {labels, fromCurrency, toCurrency, defaultAmount} = props;
   const [error, setError] = useState('');
   const [amountValue, setAmountValue] = useState(defaultAmount);
   const [from, setFrom] = useState(fromCurrency);
   const [to, setTo] = useState(toCurrency);
   const [resultValue, setResultValue] = useState(null);
   const [calculate, setCalculate] = useState(true);
   const currencyCalculatorContext = useContext(CurrencyCalculatorContext);
   
   
   const submitForm = (e) => {
    e.preventDefault();
    setCalculate(true)
   }

   const onAmountChange = (e) => {
    const { value } = e.target;
    setError(validateAmount(value));
    setAmountValue(Number(value));
   }
  
   const onFromChange = (fromValue) => {
    setFrom(fromValue);
    setTo(null);;
   } 
   useEffect(() => {
       if(calculate) {
        const url = `${CURRENCY_CALCULATOR_API_URL}/calculate-currency/?fromCurrency=${from.value.toUpperCase()}&toCurrency=${to.value.toUpperCase()}&amount=${amountValue}`;
        getCalculatedRateFromAPI(url).then(response => {
            console.log(response);
            setResultValue(response.data.calculatedAmount);
            setCalculate(false);
        })
        .catch(err => {
            console.log(err);
            setCalculate(false);
            currencyCalculatorContext.calculatorDispatch({type: DISPATCH_ACTION.DISPLAY_ERROR, payload: err });
          });
       }
  
   }, [calculate])
 
    return (
  
            <form id ="currencyForm" onSubmit={submitForm}>
            <CurrencyAmount
            error={error}
            value={amountValue}
            onChange={onAmountChange}
            />
            <CurrencySelector
            label="From"
            options={getCurrencyOptions(CURRENCY_LIST)}
            value={from}
            onChange={onFromChange}
            />
            <CurrencySelector
            label="To"
            options={getCurrencyOptions(CURRENCY_LIST, from)}
            value={to}
            onChange={toValue => setTo(toValue)}
            />
            <button type="submit"  disabled={!to} aria-labelledby="currencyForm">{labels.calculateButtonText} </button>
            {calculate && <LoadingSpinner /> } 
            <ConvertedAmount value={resultValue} />
        </form>
       
    )
}
ConverterForm.propTypes = {
    fromCurrency :PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
    }),
    toCurrency :PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
    }),
    defaultAmount:PropTypes.number,
    labels: PropTypes.shape({
        calculateButtonText: PropTypes.string,
    }),
}

ConverterForm.defaultProps = {
    fromCurrency: DEFAULT_FROM_CURRENCY,
    toCurrency: DEFAULT_TO_CURRENCY,
    defaultAmount: 1,
    labels: {
        calculateButtonText: 'Convert',
    }
   };


export default ConverterForm

