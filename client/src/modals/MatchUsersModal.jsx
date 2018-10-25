import React from "react";
import Modal from "react-bootstrap4-modal";
// utils
import capitalizeFirstLetter from "../utils/stringManipulation/capitalizeFirstLetter";

const MatchUsersModal = ({ data, onHide, viewUser }) => {
  return (
    <Modal visible={true} onClickBackdrop={onHide} dialogClassName="modal-lg">
      <div className="modal-header">
        {data && (
          <h5 className="modal-title">You Matched {data.length} Users</h5>
        )}
        <button type="button" className="close" onClick={onHide}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body">
        {data && (
          <ul className="list-group list-group-flush">
            {data.length > 0 ? (
              data.map((match, i) => {
                return (
                  <li key={i} className="list-group-item">
                    <span>
                      {capitalizeFirstLetter(match.userInfo[0].username)} has{" "}
                      <b>{match.length}</b>{" "}
                      {match.length === 1 ? "story " : "stories "} found near
                      your location.{" "}
                    </span>
                    <br />
                    <span
                      className="cursorAllowed"
                      style={{ color: "blue" }}
                      onClick={() => viewUser(match)}
                    >
                      Check out their stories.
                    </span>
                  </li>
                );
              })
            ) : (
              <p>
                No matches found. Try increasing the distance from your story.
              </p>
            )}
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

export default MatchUsersModal;
