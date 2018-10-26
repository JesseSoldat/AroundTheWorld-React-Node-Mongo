import React from "react";

const getCss = (size, type = "block") => {
  const show = {
    xs: `d-${type} d-sm-none d-md-none d-lg-none d-xl-none`,
    sm: `d-${type} d-sm-${type} d-md-none d-lg-none d-xl-none`,
    "xs-md": `d-${type} d-sm-${type} d-md-${type} d-lg-none d-xl-none`,
    "sm-xl": `d-none d-sm-${type} d-md-${type} d-lg-${type} d-xl-${type}`,
    md: `d-none d-md-${type} d-lg-${type} d-xl-${type}`,
    lg: `d-none d-md-none d-lg-${type} d-xl-${type}`,
    xl: `d-none d-xl-${type}`
  };

  return show[size];
};

const ShowHide = ({ size, children, type }) => (
  <span className={getCss(size, type)}>{children}</span>
);

export default ShowHide;
