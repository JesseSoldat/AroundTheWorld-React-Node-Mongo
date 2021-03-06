import React from "react";
import IconBtn from "./IconBtn";

const TopRowBtns = ({
  bt1Disable = false,
  btn2Disable = false,
  btn0Cb = null,
  btn1Cb = null,
  btn2Cb = null
}) => {
  return (
    <div className="row" style={{ margin: "-5px 2px 0 2px" }}>
      <div className="col-12">
        {btn0Cb && (
          <div className="float-left">
            <IconBtn
              btnClass="btn-secondary mr-1"
              iconClass="fas fa-chevron-left"
              text="Go Back"
              cb={btn0Cb}
            />
          </div>
        )}

        <div className="float-right">
          {btn1Cb && (
            <IconBtn
              btnClass="btn-danger mr-1"
              iconClass="fas fa-trash-alt"
              text="Delete"
              cb={btn1Cb}
              disabled={bt1Disable}
            />
          )}
          {btn2Cb && (
            <IconBtn
              btnClass="btn-secondary"
              iconClass="fas fa-edit"
              text="Edit"
              cb={btn2Cb}
              disabled={btn2Disable}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopRowBtns;
