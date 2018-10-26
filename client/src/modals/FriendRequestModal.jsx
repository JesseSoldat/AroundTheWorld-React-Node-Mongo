import React from "react";
import Modal from "react-bootstrap4-modal";
// common components
import IconBtn from "../components/buttons/IconBtn";
// utils
import capitalizeFirstLetter from "../utils/stringManipulation/capitalizeFirstLetter";

const FriendRequestModal = ({
  data,
  onHide,
  viewRequestersProfile,
  acceptRequest,
  denyRequest
}) => {
  return (
    <Modal visible={true} onClickBackdrop={onHide} dialogClassName="modal-lg">
      <div className="modal-header">
        {data && (
          <div>
            <h5 className="modal-title">
              You Have {data.length} Friend Requests
            </h5>
          </div>
        )}
        <button type="button" className="close" onClick={onHide}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body">
        {data && (
          <ul className="list-group list-group-flush">
            {data.length > 0 &&
              data.map((request, i) => {
                return (
                  <li
                    key={i}
                    className="list-group-item d-flex justify-content-between flex-wrap"
                  >
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() =>
                        viewRequestersProfile(request.requester._id)
                      }
                    >
                      {capitalizeFirstLetter(request.requester.username)}{" "}
                    </span>

                    <div className="btn-group">
                      <IconBtn
                        btnClass="cursorAllowed btn btn-danger mr-2"
                        iconClass="fas fa-user-times"
                        text="Deny"
                        cb={() => denyRequest(request)}
                      />

                      <IconBtn
                        btnClass="cursorAllowed btn btn-secondary"
                        iconClass="fas fa-user-plus"
                        text="Accept"
                        cb={() => acceptRequest(request)}
                      />
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default FriendRequestModal;
