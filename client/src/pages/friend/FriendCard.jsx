import React from "react";
// common components
import IconBtn from "../../components/buttons/IconBtn";
// utils
import capitalizeFirstLetter from "../../utils/stringManipulation/capitalizeFirstLetter";
// images
import UserAvatar from "../../_images/userdefault.png";

const FriendCard = ({ friend, viewDetails, viewStories }) => {
  let { username, avatar = null } = friend;

  username = capitalizeFirstLetter(username);
  const defaultAvatar = avatar ? avatar : UserAvatar;

  const viewFriendDetails = () => viewDetails(friend._id);

  const viewFriendStories = () => viewStories(friend._id);

  return (
    <div className="card my-4">
      <div className="card-body">
        <div className="row d-flex flex-column justify-content-around align-items-center">
          <img
            style={{ maxHeight: "250px" }}
            className="img-fluid img-thumbnail"
            src={defaultAvatar}
            alt="user"
          />

          <h3 className="card-title mt-4">{username}</h3>

          <div className="btn-group mt-4">
            <IconBtn
              btnClass="btn btn-secondary btn-sm mr-2"
              iconClass="fas fa-info-circle"
              text="View Details"
              cb={viewFriendDetails}
            />

            <IconBtn
              btnClass="btn btn-primary btn-sm"
              iconClass="fas fa-atlas"
              text="View Stories"
              cb={viewFriendStories}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
