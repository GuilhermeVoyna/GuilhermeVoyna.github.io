import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function CountrySelector({ onChange = () => {} }) { // Define onChange com uma função padrão
  const [value, setValue] = useState('')

  const options = useMemo(() => countryList().getData(), [])


  const changeHandler = (e) => {
    setValue(e)
    onChange(e)
  }
  

  return <Select options={options}  value={value} onChange={changeHandler} /> 

}

export default CountrySelector