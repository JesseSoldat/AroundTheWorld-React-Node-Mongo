import React from "react";

const SendFriendRequest = ({ cb }) => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <p className="pr-3">
        You must be friends to view this user's photos. Send a friends request?
      </p>
      <button onClick={cb} className="btn btn-primary">
        Send Friends Request
      </button>
    </div>
  );
};

export default SendFriendRequest;
