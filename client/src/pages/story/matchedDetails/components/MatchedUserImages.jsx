import React from "react";
// custom components
import SendFriendRequest from "./SendFriendRequest";
import ReceivedFriendRequest from "./ReceivedFriendRequest";
import ImageList from "./ImageList";

const MatchedUserImages = ({
  status,
  images,
  sendRequest,
  acceptRequest,
  viewLargePhotoModal
}) => {
  // render dom
  const renderFriendImages = () => {
    if (!images.length)
      return <p>This story does not have any photos associated with it.</p>;

    return (
      <ImageList images={images} viewLargePhotoModal={viewLargePhotoModal} />
    );
  };

  const renderContent = () => {
    switch (status) {
      case "unknown":
        return <SendFriendRequest cb={sendRequest} />;

      case "requested":
        return (
          <div>
            <p>Waiting for user to accept the friend request.</p>
          </div>
        );

      case "received":
        return <ReceivedFriendRequest cb={acceptRequest} />;

      case "rejected":
        return <ReceivedFriendRequest cb={acceptRequest} rejected={true} />;

      case "isFriend":
        return renderFriendImages();

      default:
        console.log("Friend status is unknown");
        break;
    }
  };

  return <div>{renderContent()}</div>;
};

export default MatchedUserImages;
