import React from "react";
import { connect } from "react-redux";
// Modals
import MatchUsersModal from "./MatchUsersModal";

const modalLookup = {
  MatchesModal: MatchUsersModal
};

const ModalManager = ({ modalType, data }) => {
  let renderedModal;

  if (modalType) {
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent data={data} />;
  }
  return <span>{renderedModal}</span>;
};

const mapStateToProps = ({ modal }) => ({
  modalType: modal.modalType,
  data: modal.data
});

export default connect(mapStateToProps)(ModalManager);
