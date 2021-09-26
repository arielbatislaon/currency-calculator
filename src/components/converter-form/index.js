import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import CurrencyAmount from '../currency-amount'
import CurrencySelector from '../currency-selector'
import ConvertedAmount from '../converted-amount'
import { LoadingSpinner } from '../loading-spinner';
import { getCurrencyOptions, getCalculatedRateFromAPI, validateAmount } from '../../utils'
import {CURRENCY_LIST, CURRENCY_CALCULATOR_API_URL} from '../../config'

function ConverterForm(props) {
   const {labels} = props;
   const [error, setError] = useState('');
   const [amountValue, setAmountValue] = useState(1.0);
   const [from, setFrom] = useState(null);
   const [to, setTo] = useState(null);
   const [resultValue, setResultValue] = useState(null);
   const [loading, setLoading] = useState(false);
   const [calculate, setCalculate] = useState(false);
   
   
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
        const url = `${CURRENCY_CALCULATOR_API_URL}/calculate-currency/?fromCurrency=${from.label}&toCurrency=${to.label}&amount=${amountValue}`;
        getCalculatedRateFromAPI(url).then(response => {
            console.log(response);
            setResultValue(response.data.calculatedAmount);
            setCalculate(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
          });
       }
  
   }, [calculate])
 
    return (
  
            <form onSubmit={submitForm}>
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
            <button type="submit">{labels.calculateButtonText}</button>
            {calculate && <LoadingSpinner /> } 
            <ConvertedAmount value={resultValue} />
        </form>
       
    )
}
ConverterForm.propTypes = {
    labels: PropTypes.shape({
        calculateButtonText: PropTypes.string,
    }),
}

ConverterForm.defaultProps = {
    labels: {
        calculateButtonText: 'Calculate Desired Currency',
    }
   };


export default ConverterForm

