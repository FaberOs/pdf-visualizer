import React from "react";
import "../../styles/components/UI/Input.css";

const InputComponent = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="input-component">
      {label && <label>{label}</label>}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
};

export default InputComponent;
