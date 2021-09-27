import React from 'react'
import PropTypes from 'prop-types';

function ConvertedAmount(props) {

  const {value, labels} = props;
  return (
    <label id="result" className="result">
      <div className="label" aria-labelledby="result">{labels.convertedAmountText}</div>
      <input type="text" value={value} disabled={true} aria-labelledby="result" />
    </label>
  );
}

ConvertedAmount.propTypes = {
    labels: PropTypes.shape({
        convertedAmountText: PropTypes.string,
    }),
}

ConvertedAmount.defaultProps = {
    labels: {
        convertedAmountText: 'Converted Amount:',
    }
   };


export default ConvertedAmount
