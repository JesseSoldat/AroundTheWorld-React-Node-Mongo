import React from "react";

const RadioInput = ({ input, label, type }) => {
  return (
    <span className="mt-1">
      <input
        style={{ verticalAlign: "middle", marginTop: "2px" }}
        className="mx-2"
        {...input}
        type={type}
      />
      <label className="mr-2">
        <small>{label}</small>
      </label>
    </span>
  );
};

export default RadioInput;
