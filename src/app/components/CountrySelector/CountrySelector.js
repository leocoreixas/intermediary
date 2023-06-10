import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function CountrySelector({ value, onChange }) {
    const options = useMemo(() => countryList().getData(), []);
    const [selectedOption, setSelectedOption] = useState(value);

  
    const changeHandler = selectedOption => {
      onChange(selectedOption.label);
      setSelectedOption(selectedOption);
    };
    return <Select options={options} value={selectedOption} onChange={changeHandler} />;
  }
  
  export default CountrySelector;