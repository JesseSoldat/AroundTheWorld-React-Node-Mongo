import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap4-modal";
// common components
import IconBtn from "../components/buttons/IconBtn";
// utils
import capitalizeFirstLetter from "../utils/stringManipulation/capitalizeFirstLetter";

const FriendRequestModal = ({ data, onHide, acceptRequest, denyRequest }) => {
  console.log(data);

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
                    <span>
                      <Link to={`/profile/${request.requester._id}`}>
                        <span style={{ color: "blue" }}>
                          {capitalizeFirstLetter(request.requester.username)}{" "}
                        </span>
                      </Link>
                      would like to be your friend
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
