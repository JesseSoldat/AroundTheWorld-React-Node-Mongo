import React from "react";
import "./OverylaySpinner.css";

const OverlaySpinner = ({ showOverlay = null }) => {
  return showOverlay ? (
    <div className="loading-overlay">
      <div className="loading-overlay-container">
        <div className="text-center loading-overlay-spinner-container">
          <i className="fas fa-spinner fa-7x fa-spin mt-4 loading-overlay-spinner" />
        </div>
      </div>
    </div>
  ) : null;
};

export default OverlaySpinner;
