import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// modals
import MatchUsersModal from "./MatchUsersModal";
// common components
import withStorage from "../components/hoc/withStorage";
// actions
import { closeModal } from "../actions/modalActions";

// Modal Manager
const ComponentNeedingStorage = ({
  modalType,
  data,
  closeModal,
  history,
  save
}) => {
  const viewUser = matched => {
    save("matchedUser", JSON.stringify(matched));
    history.push("/matchedList");
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

const ModalManager = withStorage(ComponentNeedingStorage);

const mapStateToProps = ({ modal }) => ({
  modalType: modal.modalType,
  data: modal.data
});

export default connect(
  mapStateToProps,
  { closeModal }
)(withRouter(ModalManager));
