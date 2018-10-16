import React from "react";
import { connect } from "react-redux";
// modals
import MatchUsersModal from "./MatchUsersModal";
// actions
import { closeModal } from "../actions/modalActions";

const ModalManager = ({ modalType, data, closeModal }) => {
  const viewUser = match => {
    console.log(match);
    closeModal();
  };

  return (
    <span>
      {modalType === "matchUser" && (
        <MatchUsersModal data={data} onHide={closeModal} viewUser={viewUser} />
      )}
    </span>
  );
};

const mapStateToProps = ({ modal }) => ({
  modalType: modal.modalType,
  data: modal.data
});

export default connect(
  mapStateToProps,
  { closeModal }
)(ModalManager);
