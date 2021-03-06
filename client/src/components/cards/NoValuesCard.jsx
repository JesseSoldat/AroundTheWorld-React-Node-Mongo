import React from "react";

const NoValuesCard = ({ title, text, btnIcon, btnText, cb }) => {
  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto">
        <div className="card text-center py-4 px-0">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{text}</p>
            <button onClick={cb} className="btn btn-secondary mt-2">
              {btnIcon && <i className={btnIcon} />}
              {btnText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoValuesCard;
