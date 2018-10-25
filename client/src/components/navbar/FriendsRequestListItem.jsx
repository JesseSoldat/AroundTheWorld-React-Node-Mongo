import React from "react";

const FriendsRequestListItem = ({
  numberOfRequests,
  viewFriends,
  acceptFriendRequest,
  viewProfile
}) => {
  const liClass = numberOfRequests
    ? "cursorAllowed"
    : "text-muted cursorNotAllowed";
  const spanClass = numberOfRequests ? "badge-danger" : "badge-info";
  const disabled = numberOfRequests ? false : true;

  return [
    <li
      key="friendRequest"
      className={`nav-item ${liClass} py-2 mt-2`}
      disabled={disabled}
      onClick={disabled ? () => {} : acceptFriendRequest}
    >
      <span className="cursorAllowed">
        <i className="fas fa-user-plus mr-2" />
        <span>Friend Request</span>
        <span className={`badge badge-pill ml-2 ${spanClass}`}>
          {numberOfRequests}
        </span>
      </span>
    </li>,
    <li key="viewFriends" className="nav-item py-2" onClick={viewFriends}>
      <span className="cursorAllowed">
        <i className="fas fa-user-friends mr-2" />
        <span>View Friends</span>{" "}
      </span>
    </li>,

    <li key="updateProfile" className="nav-item py-2" onClick={viewProfile}>
      <span className="cursorAllowed">
        <i className="fas fa-user-circle mr-2" />
        <span>Profile</span>{" "}
      </span>
    </li>
  ];
};

export default FriendsRequestListItem;
