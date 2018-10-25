import React from "react";
// common components
import IconBtn from "../../../../components/buttons/IconBtn";

const SendFriendRequest = ({ cb }) => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <p className="pr-3">
        You must be friends to view this user's photos. Send a friends request?
      </p>
      <IconBtn
        btnClass="btn-secondary"
        iconClass="fas fa-arrow-alt-circle-right"
        text="Send Friends Request"
        cb={cb}
      />
    </div>
  );
};

export default SendFriendRequest;
