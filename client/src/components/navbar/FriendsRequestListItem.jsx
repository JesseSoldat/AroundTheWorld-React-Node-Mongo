import React from "react";

const FriendsRequestListItem = ({
  numberOfRequests,
  viewFriends,
  acceptFriendRequest
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
      <a>
        <i className="fas fa-user-plus mr-2" />
        <span>Friend Request</span>
        <span className={`badge badge-pill ml-2 ${spanClass}`}>
          {numberOfRequests}
        </span>
      </a>
    </li>,
    <li key="viewFriends" className="nav-item py-2" onClick={viewFriends}>
      <a>
        <i className="fas fa-user-friends mr-2" />
        <span>View Friends</span>{" "}
      </a>
    </li>
  ];
};

export default FriendsRequestListItem;
