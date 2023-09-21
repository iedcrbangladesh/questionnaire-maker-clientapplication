import React from "react";
const Checkbox = ({ field, type, checked, label, value, onChange }) => {
  return (
    <label>
      <input {...field} type={type} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

export default Checkbox;
