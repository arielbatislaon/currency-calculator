import React from 'react'
import PropTypes from 'prop-types';

function CurrencyAmount(props) {
    const {error, value, onChange, labels} = props;
    return (
    <label id="amountLabel" className={error ? "has-error" : ""}>
      <div className="label" aria-labelledby="amountLabel">{labels.amountText}</div>
      <input
        type="text"
        aria-labelledby="amountLabel"
        placeholder={labels.placeHolderText}
        value={value}
        onChange={onChange}
      />
      {error && <div className="error-hint" aria-labelledby="amountLabel">{error}</div>}
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
    value: 1,
    onChange: null,
    labels: {
        amountText: 'Amount to convert:',
        placeHolderText: 'Enter Amount',
    }
   };
export default CurrencyAmount
