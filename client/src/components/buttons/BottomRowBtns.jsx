import React from "react";
// common components
import IconBtn from "./IconBtn";

const BottomRowBtns = ({
  bt1Disable = false,
  btn2Disable = false,
  btn0Cb = null,
  btn1Cb = null,
  btn2Cb = null
}) => {
  return (
    <div className="row mb-3">
      <div className="col-11 mx-auto">
        {btn0Cb && (
          <IconBtn
            btnClass="btn-secondary btn-block"
            iconClass="fas fa-chevron-left"
            text="Go Back"
            cb={btn0Cb}
          />
        )}

        {btn1Cb && (
          <IconBtn
            btnClass="btn-danger btn-block"
            iconClass="fas fa-trash-alt"
            text="Delete"
            cb={btn1Cb}
            disabled={bt1Disable}
          />
        )}
        {btn2Cb && (
          <IconBtn
            btnClass="btn-secondary btn-block"
            iconClass="fas fa-edit"
            text="Edit"
            cb={btn2Cb}
            disabled={btn2Disable}
          />
        )}
      </div>
    </div>
  );
};

export default BottomRowBtns;
