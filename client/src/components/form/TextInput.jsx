import React from "react";

const TextInput = ({ fieldObj, input, type, meta: { touched, error } }) => {
  const { label, placeholder, required, index, info, disabled } = fieldObj;

  const inputClass =
    error && touched
      ? "form-control form-control mb-2 is-invalid"
      : "form-control form-control mb-2";

  return (
    <div>
      {label && (
        <label className="p-0 m-0 pl-1">
          <small>{label}</small>
        </label>
      )}
      {required &&
        index === "0" && (
          <small className="d-block float-right">
            <strong>* = required fields</strong>
          </small>
        )}
      <input
        {...input}
        className={inputClass}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextInput;
