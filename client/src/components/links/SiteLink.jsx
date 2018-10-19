import React from "react";
import { Link } from "react-router-dom";
// helpers
import getLinkUrls from "./linkUrls";

const SiteLink = ({ text, url = null, linkCss = null, icon = null }) => {
  const linkUrl = url ? url : getLinkUrls(text);
  const createIcon = () => <i className={`${icon} mr-2`} />;

  return (
    <Link className={linkCss} to={linkUrl} style={{ color: "black" }}>
      {icon && createIcon()}
      {text}
    </Link>
  );
};

export default SiteLink;
