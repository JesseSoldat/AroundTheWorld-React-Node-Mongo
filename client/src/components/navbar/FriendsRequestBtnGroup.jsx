import React from "react";

const FriendsRequestBtnGroup = ({
  numberOfRequests,
  viewFriends,
  viewProfile,
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

        {numberOfRequests && (
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
          className={`friendRequestMenuBadge mx-2 badge badge-pill ${spanClass}`}
        >
          {numberOfRequests}
        </span>
      </button>
    );
  };

  return (
    <div className="friendBtnGroup mr-5">
      <div className="btn-group">
        {getMenuBtn()}
        <div className="dropdown-menu">
          {getMenuLinkBtn()}
          <button
            className="dropdown-item cursorAllowed"
            type="button"
            onClick={viewFriends}
          >
            View Friends
          </button>
          <button
            className="dropdown-item cursorAllowed"
            type="button"
            onClick={viewProfile}
          >
            Profile
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
