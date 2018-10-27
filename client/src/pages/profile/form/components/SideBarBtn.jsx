import React from "react";

const SideBarBtn = ({ btnText, formType, currentForm, changeCurrentForm }) => {
  // cbs & events
  const changeForm = () => changeCurrentForm(formType);

  return (
    <button
      onClick={changeForm}
      style={{
        background: currentForm === formType && "#f2f2f2"
      }}
      type="button"
      className="list-group-item list-group-item-action"
    >
      {btnText}
    </button>
  );
};

export default SideBarBtn;
