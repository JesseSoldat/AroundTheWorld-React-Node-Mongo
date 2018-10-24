import React, { Component } from "react";
// custom components
import SendFriendRequest from "./SendFriendRequest";
import ReceivedFriendRequest from "./ReceivedFriendRequest";
import ImageList from "./ImageList";

class MatchedUserImages extends Component {
  renderFriendImages = () => {
    const { images } = this.props;
    if (!images.length)
      return <p>This story does not have any photos associated with it.</p>;

    return <ImageList images={images} />;
  };

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
            <p>Waiting for user to accept friend request.</p>
          </div>
        );
        break;

      case "received":
        content = <ReceivedFriendRequest cb={acceptRequest} />;
        break;

      case "isFriend":
        content = this.renderFriendImages();
        break;

      default:
        content = (
          <div
            className="text-center"
            style={{ width: "50px", margin: "auto" }}
          >
            <i className="fas fa-spinner fa-7x fa-spin mt-4" />
          </div>
        );
        break;
    }

    return <div>{content}</div>;
  }
}

export default MatchedUserImages;
