import React from "react";
// custom components
import SideBarBtn from "./SideBarBtn";
// data
import buttonFields from "./buttonFields";

const SideBar = ({ currentForm, changeCurrentForm }) => {
  // render dom
  const renderSideBar = () =>
    buttonFields.map((field, i) => (
      <SideBarBtn
        key={i}
        btnText={field.btnText}
        formType={field.formType}
        currentForm={currentForm}
        changeCurrentForm={changeCurrentForm}
      />
    ));

  return (
    <div className="col-xs-12 col-md-4 mx-auto mb-2">
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            <li className="list-group-item bg-secondary text-light">
              <i className="fas fa-cogs mr-2" />
              Profile
            </li>
            {renderSideBar()}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
