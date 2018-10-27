import React from "react";
// common components
import ShowHide from "./ShowHide";
import TopRowBtns from "./buttons/TopRowBtns";
import BottomRowBtns from "./buttons/BottomRowBtns";
// utils
import capitalizeEachWordOfString from "../utils/stringManipulation/capitalizeEachWordOfString";

const Heading = ({
  title = null,
  btn0Cb,
  btn1Cb,
  btn2Cb,
  bt1Disable,
  btn2Disable
}) => {
  const upperTitle = title && capitalizeEachWordOfString(title);
  return (
    <div className="mt-3">
      <ShowHide size="sm-xl">
        <TopRowBtns
          btn0Cb={btn0Cb}
          btn1Cb={btn1Cb}
          btn2Cb={btn2Cb}
          bt1Disable={bt1Disable}
          btn2Disable={btn2Disable}
        />
      </ShowHide>

      {title && (
        <div className="row">
          <div className="col-12 text-center">
            <h1
              className="pb-2 d-block d-sm-none"
              style={{ fontWeight: "lighter" }}
            >
              {upperTitle}
            </h1>
            <h1 className="display-4 pb-2 d-none d-sm-block">{upperTitle}</h1>
          </div>
        </div>
      )}

      {!title && <div className="spacer60" />}

      <ShowHide size="xs">
        <BottomRowBtns
          btn0Cb={btn0Cb}
          btn1Cb={btn1Cb}
          btn2Cb={btn2Cb}
          bt1Disable={bt1Disable}
          btn2Disable={btn2Disable}
        />
      </ShowHide>
    </div>
  );
};

export default Heading;
