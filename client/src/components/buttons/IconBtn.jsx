import React from "react";

const IconBtn = ({
  btnClass,
  iconClass,
  text,
  cb = () => {},
  disabled = false,
  type = "button"
}) => {
  return (
    <button
      className={`btn ${btnClass} btn-sm`}
      onClick={cb}
      disabled={disabled}
      type={type}
    >
      <i className={iconClass} /> {text}
    </button>
  );
};

export default IconBtn;
