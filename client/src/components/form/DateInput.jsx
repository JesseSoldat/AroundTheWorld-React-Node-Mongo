import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import moment from "moment";
import "./DateInput.css";

const DateInput = ({
  input: { value, onChange, onBlur, ...restInput },
  label,
  placeholder,
  resetInputValue,
  ...rest
}) => {
  value = value ? moment(value).format("YYYY-MM-DD") : null;

  return (
    <div className="mb-1">
      <label className="p-0 m-0 pl-1">
        <small>{label}</small>
      </label>
      <div className="d-flex">
        <DatePicker
          className="form-control"
          {...rest}
          placeholderText={placeholder}
          selected={value ? moment(value) : null}
          onChange={onChange}
          {...restInput}
        />
        <button
          onClick={resetInputValue}
          type="button"
          className="btn btn-danger ml-2"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default DateInput;
