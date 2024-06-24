import React from "react";
import "../../styles/components/UI/Select.css";

const SelectComponent = ({ label, value, onChange, options }) => {
  return (
    <div className="select-component">
      {label && <label>{label}</label>}
      <select value={value} onChange={onChange} className="select-field">
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
