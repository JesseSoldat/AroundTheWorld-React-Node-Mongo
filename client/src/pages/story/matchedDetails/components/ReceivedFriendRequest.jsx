import React from "react";
// common components
import IconBtn from "../../../../components/buttons/IconBtn";

const receivedText = "You received a friend request. ";

const rejectedText = "You reject this friend request. ";

const ReceivedFriendRequest = ({ cb, rejected = false }) => {
  const text = rejected ? rejectedText : receivedText;
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <p className="pr-3">{text} Click accept to view this user's photos.</p>
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
