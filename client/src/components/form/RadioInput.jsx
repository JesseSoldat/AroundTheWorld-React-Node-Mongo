import React from "react";

const RadioInput = ({ input, label, type }) => {
  return (
    <span>
      <input className="mr-2" {...input} type={type} />
      <label className="mr-4">{label}</label>
    </span>
  );
};

export default RadioInput;
