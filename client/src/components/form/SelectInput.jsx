import React from "react";

const SelectInput = ({ input, options, label, defaultValue = null }) => {
  return (
    <div className="form-group mr-3">
      <label>{label}</label>
      <select
        className="form-control"
        onChange={e => input.onChange(e)}
        name="distance"
      >
        {defaultValue && <option value={""}>{defaultValue}</option>}
        {options &&
          options.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectInput;
