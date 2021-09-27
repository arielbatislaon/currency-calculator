import React from "react";
import Select, { components } from "react-select";
import  CurrencyOptions from "../currency-options";

function CurrencySelector(props) {
    const { label, options, value, onChange } = props;
    
    const CustomComponent = (Comp) => (props) => {
        return (
          <Comp {...props}>
            <CurrencyOptions {...props.data} />
          </Comp>
        );
      };
    const onSelectChange = (selectedOption) => {
    onChange(selectedOption);
    };

    return (
        <label id={label}>
        {label && <div aria-labelledby={label} className="label">{`${label}:`}</div>}
        <Select
          className="react-select-container"
          aria-labelledby={label}
          isClearable={true}
          value={value}
          onChange={onSelectChange}
          options={options}
          isOptionDisabled={(option) => { 
              if(option.isdisabled) {
                  console.log('disabled label', option.label);
                  return true
              } else {
                  return false
              }
          }}
          components={{
            Option: CustomComponent(components.Option),
            SingleValue: CustomComponent(components.SingleValue),
          }}
        
        />
      </label>
    
    )
}

export default CurrencySelector
