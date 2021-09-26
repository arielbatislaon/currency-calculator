import React from 'react'

function CurrencyOptions(props) {
    const { label, value, isdisabled } = props;
  return (
    <div className={`currency-option ${isdisabled ? 'disabled' : ''}`}>
      {value ? <i className={`currency-flag currency-flag-${value}`} /> : null}
      {label ?? ""}
    </div>
  );
}

export default CurrencyOptions
