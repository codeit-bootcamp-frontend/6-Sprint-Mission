import React from "react";
import "./InputItem.css";

const InputItem = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  textArea,
  onKeyDown,
}) => {
  return (
    <div>
      <div className="Label">{label}</div>
      {textArea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="textStyle"
        />
      ) : (
        <input
          id={id}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="InputStyle"
        />
      )}
    </div>
  );
};

export default InputItem;
