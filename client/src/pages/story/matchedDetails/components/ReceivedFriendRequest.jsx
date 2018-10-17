import React from "react";

const ReceivedFriendRequest = ({ cb }) => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <p className="pr-3">
        You received a friends request. If you accept this request you will be
        able to view this user's photos.
      </p>
      <button onClick={cb} className="btn btn-primary">
        Accept
      </button>
    </div>
  );
};

export default ReceivedFriendRequest;
