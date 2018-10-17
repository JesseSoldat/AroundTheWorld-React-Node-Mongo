import React, { Component } from "react";
// custom components
import SendFriendRequest from "./SendFriendRequest";
import ReceivedFriendRequest from "./ReceivedFriendRequest";

class MatchedUserImages extends Component {
  render() {
    const { status, sendRequest, acceptRequest } = this.props;
    let content;

    switch (status) {
      case "unknown":
        content = <SendFriendRequest cb={sendRequest} />;
        break;

      case "requested":
        content = (
          <div>
            <p>You must be friends to view this user's images.</p>
            <p>You have sent this user a request. Now it is up to them.</p>
          </div>
        );
        break;

      case "received":
        content = <ReceivedFriendRequest cb={acceptRequest} />;
        break;

      case "isFriend":
        content = <p>You are friends!</p>;
        break;

      default:
        content = <p>Unknown</p>;
        break;
    }

    return <div>{content}</div>;
  }
}

export default MatchedUserImages;
