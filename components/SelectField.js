import Select from 'react-select';
import React from 'react';
//import {useField, ErrorMessage} from 'formik';
import {useField} from 'formik';

const SelectField = (props) => {
  //const [field, meta, helpers] = useField(name);
  //console.log(props);
  //const [field, state, { setValue, setTouched }] = useField(props.name);
  const [field, state, { setValue, setTouched }] = useField(props.name);
  return (
    <>
      <Select
      defaultValue={props.defaultValueArray}
      placeholder={props.placeholder||"Type to search"}      
      isMulti={props.isMulti}
      isClearable={props.isClearable}
      isSearchable={props.isSearchable}
        name={props.name}
        /*value={field.value}*/        
        value={state?.value} 
        onChange={(value) => setValue(value)}
        options={props.options}
        onBlur={() => setTouched(true)}
      />
     {/*  <ErrorMessage name={name} /> */}
    </>
  );

};



export default SelectField;