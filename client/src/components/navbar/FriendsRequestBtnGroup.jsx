import React from "react";

const FriendsRequestBtnGroup = ({
  numberOfRequests,
  viewFriends,
  acceptFriendRequest,
  logout
}) => {
  const btnClass = numberOfRequests ? "cursorAllowed" : "cursorNotAllowed";
  const spanClass = numberOfRequests ? "badge-danger" : "badge-info";
  const disabled = numberOfRequests ? false : true;

  const getMenuBtn = () => {
    return (
      <button
        className="btn btn-light btn-sm dropdown-toggle d-flex align-items-center"
        data-toggle="dropdown"
      >
        <i className="fas fa-user-friends" />

        {numberOfRequests.length && (
          <span className="badge badge-pill badge-danger ml-2">
            {numberOfRequests}
          </span>
        )}
      </button>
    );
  };

  const getMenuLinkBtn = () => {
    return (
      <button
        className={`${btnClass} dropdown-item d-flex`}
        disabled={disabled}
        type="button"
        onClick={acceptFriendRequest}
      >
        <span>Friend Request</span>
        <span
          className={`friendRequestMenuBadge ml-2 badge badge-pill ${spanClass}`}
        >
          {numberOfRequests}
        </span>
      </button>
    );
  };

  return (
    <div className="friendBtnGroup">
      <div className="btn-group mr-3">
        {getMenuBtn()}
        <div className="dropdown-menu dropdown-menu-right">
          {getMenuLinkBtn()}
          <button
            className="dropdown-item cursorAllowed"
            type="button"
            onClick={viewFriends}
          >
            View Friends
          </button>
          <div className="dropdown-divider" />
          <button
            className="dropdown-item cursorAllowed"
            type="button"
            onClick={logout}
          >
            Logout{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendsRequestBtnGroup;
