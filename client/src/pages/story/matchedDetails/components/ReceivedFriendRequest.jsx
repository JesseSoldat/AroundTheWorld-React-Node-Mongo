import React from "react";
// common components
import IconBtn from "../../../../components/buttons/IconBtn";

const ReceivedFriendRequest = ({ cb }) => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <p className="pr-3">
        You received a friends request. If you accept this request you will be
        able to view this user's photos.
      </p>
      <IconBtn
        btnClass="btn-secondary"
        iconClass="fas fa-arrow-alt-circle-left"
        text="Accept Friends Request"
        cb={cb}
      />
    </div>
  );
};

export default ReceivedFriendRequest;
