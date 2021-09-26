import React, { useState } from 'react'
import PropTypes from 'prop-types';
import CurrencyAmount from '../currency-amount'
import CurrencySelector from '../currency-selector'
import ConvertedAmount from '../converted-amount'
import { getCurrencyOptions, getCalculatedRateFromAPI, validateAmount } from '../../utils'
import {CURRENCY_LIST, CURRENCY_CALCULATOR_API_URL} from '../../config'

function ConverterForm(props) {
    const {labels} = props;
   const [error, setError] = useState(null);
   const [amountValue, setAmountValue] = useState(null);
   const [from, setFrom] = useState(null);
   const [to, setTo] = useState(null);
   const [resultValue, setResultValue] = useState(null);
   
   
   const submitForm = () => {
    const url = `${CURRENCY_CALCULATOR_API_URL}/calculate-currency/?fromCurrency=${from}&toCurrency=${to}&amount=${amountValue}`;
    getCalculatedRateFromAPI(url)
            .then(response => {
                console.log(response);
                setResultValue(response.calculatedAmount);
            })
            .catch(err => {
                console.log(err);
              })
   }

   const onAmountChange = (e) => {
    const { value } = e.target;
    setError(validateAmount(value));
    setAmountValue(value);
   }
  
   const onFromChange = (fromValue) => {
    setFrom(fromValue);
    setTo(null);;
   } 
 
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
            <input className="button" type="submit" value={labels.calculateButtonText} />

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

