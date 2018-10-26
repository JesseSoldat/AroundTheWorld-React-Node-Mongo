import React, { Component } from "react";
// custom components
import SendFriendRequest from "./SendFriendRequest";
import ReceivedFriendRequest from "./ReceivedFriendRequest";
import ImageList from "./ImageList";

class MatchedUserImages extends Component {
  renderFriendImages = () => {
    const { images, viewLargePhotoModal } = this.props;

    if (!images.length)
      return <p>This story does not have any photos associated with it.</p>;

    return (
      <ImageList images={images} viewLargePhotoModal={viewLargePhotoModal} />
    );
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
            <p>Waiting for user to accept the friend request.</p>
          </div>
        );
        break;

      case "received":
        content = <ReceivedFriendRequest cb={acceptRequest} />;
        break;

      case "rejected":
        content = <ReceivedFriendRequest cb={acceptRequest} rejected={true} />;
        break;

      case "isFriend":
        content = this.renderFriendImages();
        break;

      default:
        console.log("Friend status is unknown");
        break;
    }

    return <div>{content}</div>;
  }
}

export default MatchedUserImages;
