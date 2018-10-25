import React from "react";
import { connect } from "react-redux";
import "./OverylaySpinner.css";

const OverlaySpinner = ({
  authOverlay,
  friendOverlay,
  imageOverlay,
  profileOverlay,
  storyOverlay
}) => {
  let showOverlay = false;

  if (authOverlay) showOverlay = true;
  else if (friendOverlay) showOverlay = true;
  else if (imageOverlay) showOverlay = true;
  else if (profileOverlay) showOverlay = true;
  else if (storyOverlay) showOverlay = true;
  // No Overlay
  else {
    showOverlay = false;
  }

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

const mapStateToProps = ({ auth, friend, image, profile, story }) => {
  return {
    authOverlay: auth.overlay,
    friendOverlay: friend.overlay,
    imageOverlay: image.overlay,
    profileOverlay: profile.overlay,
    storyOverlay: story.overlay
  };
};

export default connect(mapStateToProps)(OverlaySpinner);
