import React from "react";
// utils
import capitalizeFirstLetter from "../../utils/stringManipulation/capitalizeFirstLetter";
// images
import UserAvatar from "../../_images/userdefault.png";

const FriendCard = ({ friend }) => {
  let { username, email, avatar = null } = friend;

  username = capitalizeFirstLetter(username);

  const defaultAvatar = avatar ? avatar : UserAvatar;

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
            <h3 className="card-title">{username}</h3>
            <p className="card-text">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
