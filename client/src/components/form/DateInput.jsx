import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import moment from "moment";
import "./DateInput.css";

const DateInput = ({
  input: { value, onChange, onBlur, ...restInput },
  label,
  placeholder,
  ...rest
}) => {
  value = moment(value).format("YYYY-MM-DD");

  return (
    <div className="mb-1">
      <label className="p-0 m-0 pl-1">
        <small>{label}</small>
      </label>
      <DatePicker
        className="form-control"
        {...rest}
        placeholderText={placeholder}
        selected={value ? moment(value) : null}
        onChange={onChange}
        {...restInput}
      />
    </div>
  );
};

export default DateInput;
