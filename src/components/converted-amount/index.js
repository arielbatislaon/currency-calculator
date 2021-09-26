import React from 'react'

function ConvertedAmount(props) {

  const {value} = props;
  return (
    <label className="result">
      <div className="label">Result:</div>
      <input type="text" value={value} disabled={true} />
    </label>
  );
}

export default ConvertedAmount
