import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// modals
import MatchUsersModal from "./MatchUsersModal";
import ViewImageModal from "./ViewImageModal";
import FriendRequestModal from "./FriendRequestModal";
// common components
import withStorage from "../components/hoc/withStorage";
// actions
import { closeModal } from "../actions/modalActions";
import { startDeleteImageFromStory } from "../actions/imageActions";
import { startAcceptFriendRequest } from "../actions/friendActions";

// Modal Manager
const ComponentNeedingStorage = ({
  modalType,
  data,
  closeModal,
  startDeleteImageFromStory,
  startAcceptFriendRequest,
  history,
  save
}) => {
  // matchUser
  const viewUser = matched => {
    save("matchedUser", JSON.stringify(matched));
    history.push(`/matchedList/${matched._id}`);
    closeModal();
  };

  // viewPhoto
  const deleteImgFromStory = img => {
    closeModal();
    startDeleteImageFromStory(img);
  };

  // friend request
  const viewRequestersProfile = friendId => {
    history.push(`/friend/${friendId}`);
    closeModal();
  };

  const acceptRequest = request => {
    // console.log("accept", request);
    const { recipient, requester } = request;
    startAcceptFriendRequest(recipient._id, requester._id);
    closeModal();
  };

  const denyRequest = request => {
    console.log("deny", request);
    closeModal();
  };

  return (
    <span>
      {modalType === "matchUser" && (
        <MatchUsersModal data={data} onHide={closeModal} viewUser={viewUser} />
      )}
      {modalType === "viewPhoto" && (
        <ViewImageModal
          data={data}
          onHide={closeModal}
          deleteImgFromStory={deleteImgFromStory}
        />
      )}
      {modalType === "viewOthersPhoto" && (
        <ViewImageModal data={data} onHide={closeModal} />
      )}
      {modalType === "friendRequests" && (
        <FriendRequestModal
          data={data}
          onHide={closeModal}
          viewRequestersProfile={viewRequestersProfile}
          acceptRequest={acceptRequest}
          denyRequest={denyRequest}
        />
      )}
    </span>
  );
};

const ModalManager = withStorage(ComponentNeedingStorage);

const mapStateToProps = ({ modal }) => ({
  modalType: modal.modalType,
  data: modal.data
});

export default connect(
  mapStateToProps,
  { closeModal, startDeleteImageFromStory, startAcceptFriendRequest }
)(withRouter(ModalManager));
