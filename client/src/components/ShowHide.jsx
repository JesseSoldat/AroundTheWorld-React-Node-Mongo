import React from "react";

const getCss = (size, type = "block") => {
  const show = {
    xs: `d-${type} d-sm-none d-md-none d-lg-none d-xl-none`,
    sm: `d-${type} d-sm-${type} d-md-none d-lg-none d-xl-none`,
    md: `d-none d-md-${type} d-lg-${type} d-xl-${type}`,
    lg: `d-none d-lg-${type} d-xl-${type}`,
    xl: `d-none d-xl-${type}`
  };

  return show[size];
};

const ShowHide = ({ size, children, type }) => (
  <div className={getCss(size, type)}>{children}</div>
);

export default ShowHide;
