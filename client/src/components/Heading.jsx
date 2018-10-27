import React from "react";
// utils
import capitalizeEachWordOfString from "../utils/stringManipulation/capitalizeEachWordOfString";

const Heading = ({ title = null, children }) => {
  const upperTitle = title && capitalizeEachWordOfString(title);
  return (
    <div className="mt-3">
      {children}

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
    </div>
  );
};

export default Heading;
