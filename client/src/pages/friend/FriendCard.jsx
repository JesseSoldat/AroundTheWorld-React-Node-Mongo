import React from "react";
// utils
import capitalizeFirstLetter from "../../utils/stringManipulation/capitalizeFirstLetter";
// images
import UserAvatar from "../../_images/userdefault.png";

const FriendCard = ({ friend, viewDetails, viewStories }) => {
  let { username, email, location = null, avatar = null } = friend;

  username = capitalizeFirstLetter(username);
  const defaultLocation = location ? location : "Unknown";
  const defaultAvatar = avatar ? avatar : UserAvatar;

  const viewFriendDetails = () => viewDetails(friend._id);

  const viewFriendStories = () => viewStories(friend._id);

  return (
    <div className="card my-4">
      <div className="card-body">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <img
              className="img-fluid img-thumbnail"
              src={defaultAvatar}
              alt="user"
            />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-7 col-lg-8">
            <h3 className="card-title mt-2">{username}</h3>
            <p className="card-text">
              <b>email:</b> {email}
            </p>
            <p className="card-text">
              <b>location:</b> {defaultLocation}
            </p>
            <button
              onClick={viewFriendDetails}
              className="btn btn-secondary mr-2"
            >
              View Details
            </button>
            <button onClick={viewFriendStories} className="btn btn-primary">
              View Stories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
