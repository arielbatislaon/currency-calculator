import React from 'react'
import './index.css'
import PropTypes from 'prop-types';

function CurrencyAmount(props) {
    const {error, value, onChange, labels} = props;
    return (
    <label className={error ? "has-error" : ""}>
      <div className="label">{labels.amountText}</div>
      <input
        type="text"
        placeholder={labels.placeHolderText}
        value={value}
        onChange={onChange}
      />
      {error && <div className="error-hint">{error}</div>}
    </label>
    )
}
CurrencyAmount.propTypes = {
    error: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
    labels: PropTypes.shape({
        amountText: PropTypes.string,
        placeHolderText: PropTypes.string,
    }),
  };
  
CurrencyAmount.defaultProps = {
    error: '',
    value: 0.0,
    onChange: null,
    labels: {
        amountText: 'Amount to calculate:',
        placeHolderText: 'Enter Amount',
    }
   };
export default CurrencyAmount
