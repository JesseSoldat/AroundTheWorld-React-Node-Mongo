import React from "react";
import { connect } from "react-redux";

const FriendsRequestBtnGroup = () => {
  const friendRequest = () => {
    console.log("friend");
  };

  const viewFriends = () => {};

  const logout = () => {};

  const getRequestBtn = () => {
    const requestLength = 2;

    const btnClass = requestLength ? "haveFriendsRequest" : "noFriendsRequest";
    const spanClass = requestLength ? "badge-danger" : "badge-info";
    const disabled = requestLength ? false : true;

    const requestBtn = (
      <button
        className={`${btnClass} dropdown-item d-flex`}
        disabled={disabled}
        type="button"
        onClick={friendRequest}
      >
        <span>Friend Request</span>
        <span
          className={`friendRequestMenuBadge ml-2 badge badge-pill ${spanClass}`}
        >
          0
        </span>
      </button>
    );

    return requestBtn;
  };

  return (
    <div className="friendBtnGroup d-sm-none d-md-block">
      <div className="btn-group mx-3">
        <button
          className="btn btn-light btn-sm dropdown-toggle d-flex align-items-center"
          data-toggle="dropdown"
        >
          <i className="fas fa-user-friends" />
          <span className="badge badge-pill badge-danger ml-2">2</span>
        </button>

        <div className="dropdown-menu dropdown-menu-right">
          {getRequestBtn()}
          <button className="dropdown-item" type="button" onClick={viewFriends}>
            View Friends
          </button>
          <div className="dropdown-divider" />
          <button className="dropdown-item" type="button" onClick={logout}>
            Logout{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth._id,
  userId: auth._id
});

export default connect(
  mapStateToProps,
  {}
)(FriendsRequestBtnGroup);
